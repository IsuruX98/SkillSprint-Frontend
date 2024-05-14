import React, { useEffect, useState } from "react";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import ModuleDetails from "../components/ModuleDetails/ModuleDetails";
import Payment from "../components/Payment/Payment";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../context/authContext";
import {
  ErrorNotification,
  SuccessNotification,
} from "../notifications/notifications";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
      ErrorNotification("Please log in to access");
    }
  }, [authLoading, user, navigate]);

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [incomingCourse, setIncomingCourse] = useState(location.state.course);
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [progressId, setProgressId] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);

  console.log("incomingCourse", incomingCourse);
  console.log("progress", progressId && progressId.id);
  console.log(user);

  // Update incomingCourse whenever a new course is received
  useEffect(() => {
    setIncomingCourse(location.state.course);
  }, [location.state.course]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `course-controller/all-courses/${incomingCourse.id}`
        );
        const data = await response.data;
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [incomingCourse]);

  useEffect(() => {
    if (user && incomingCourse) {
      const fetchProgressData = async () => {
        try {
          const response = await axios.get(
            `progress/${user.userId}/${incomingCourse.id}`
          );
          const progressData = await response.data;

          setProgressId(progressData);
          setProgress(progressData.percentage);

          console.log("Progress data:", progressData);
        } catch (error) {
          console.error("Error fetching progress data:", error);
        }
      };

      fetchProgressData();
    }
  }, [user, incomingCourse]);

  useEffect(() => {
    // Check if the current course ID is present in enrolledCourses
    setIsEnrolled(
      enrolledCourses.some((course) => course.courseId === incomingCourse.id)
    );
  }, [enrolledCourses, incomingCourse.id]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get("course-enrollment/user-courses");
        const enrolledCoursesData = await response.data;
        setEnrolledCourses(enrolledCoursesData);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, [showPayment, paymentSuccess]); // Fetch enrolled courses whenever showPayment or paymentSuccess changes

  const handleEnroll = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      setPaymentSuccess(true);
      setIsEnrolled(true);
      // Update local storage to reflect enrollment status
      localStorage.setItem("enrollmentStatus", "enrolled");

      // Post user progress
      const response = await axios.post(`progress`, {
        userId: user.userId, // Assuming user.id is available from your authentication context
        courseId: course.id,
        noOfModules: course.moduleResponseDTOList.length,
        percentage: 0,
        isDone: Array(course.moduleResponseDTOList.length).fill(false),
      });
    } catch (error) {
      console.error("Error posting user progress:", error);
      ErrorNotification("Progress Tracking Failed");
    }
  };

  useEffect(() => {
    const enrollUser = async () => {
      try {
        if (paymentSuccess && isEnrolled) {
          // Perform enrollment
          const response = await axios.post(
            `course-enrollment/${course.id}?courseName=${course.courseName}`
          );
          // Handle enrollment success
          SuccessNotification("Enrollment Successful");

          // Refresh the page after successful enrollment
          window.location.reload();
        }
      } catch (error) {
        console.error("Error enrolling user:", error);
        ErrorNotification("Enrollment Failed");
      }
    };

    enrollUser();
  }, [paymentSuccess, isEnrolled]);

  const handleUnenroll = async () => {
    try {
      // Ensure that enrollmentId is not null before attempting to unenroll
      if (enrollmentId) {
        // Unenroll the user
        await axios.delete(`course-enrollment/unenroll/${enrollmentId}`);

        // After successful unenrollment, delete the progress
        await axios.delete(`progress/${progressId.id}`);

        // After successful unenrollment, update the enrolledCourses state
        const updatedEnrolledCourses = enrolledCourses.filter(
          (course) => course.id !== enrollmentId
        );
        setEnrolledCourses(updatedEnrolledCourses);
        setIsEnrolled(false);
        SuccessNotification("Unenrollment Successful");
        // Remove enrollment status from local storage
        localStorage.removeItem("enrollmentStatus");
      } else {
        // Handle the case where enrollmentId is null
        ErrorNotification("Enrollment ID not found");
      }
    } catch (error) {
      console.error("Error unenrolling user:", error);
      ErrorNotification("Unenrollment Failed");
    }
  };

  // Find the relevant enrollment ID for the current course
  useEffect(() => {
    const relevantEnrollment = enrolledCourses.find(
      (course) => course.courseId === incomingCourse.id
    );
    if (relevantEnrollment) {
      setEnrollmentId(relevantEnrollment.id);
    }
  }, [enrolledCourses, incomingCourse.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const confirmUnenroll = () => {
    confirmAlert({
      title: "Confirm Unenrollment",
      message: "Are you sure you want to unenroll from this course?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleUnenroll(),
        },
        {
          label: "No",
          onClick: () => {
            /* Do nothing on cancel */
          },
        },
      ],
    });
  };

  return (
    <div className="py-8 bg-gray-100">
      <div className="lg:px-32 lg:py-12 px-12 py-12">
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={incomingCourse.coverImgUrl}
              alt="course-logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white shadow-md rounded-lg px-6 py-8">
            <h1 className="text-3xl font-semibold mb-4">{course.courseName}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center">
                <p className="text-gray-700 mr-2">5.2</p>
                <p className="text-gray-700 mr-2">2563 ratings</p>
                <BsFillStarFill className="text-yellow-500 mr-1" />
                <BsFillStarFill className="text-yellow-500 mr-1" />
                <BsFillStarFill className="text-yellow-500 mr-1" />
                <BsFillStarFill className="text-yellow-500 mr-1" />
              </div>
              <div className="flex items-center">
                <FaUserAlt className="text-gray-700 mr-2" />
                <p className="text-gray-700">{course.level}</p>
              </div>
              <div className="flex items-center">
                <FaDollarSign className="text-green-500 mr-1" />{" "}
                <p className="text-gray-700">{course.price}</p>
              </div>
            </div>

            {!isEnrolled ? (
              <div className="mb-4">
                <button
                  className={`w-full py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600`}
                  onClick={handleEnroll}
                >
                  Enroll Now
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <button
                  className={`w-full py-2 rounded-md text-white bg-red-500 hover:bg-red-600`}
                  onClick={confirmUnenroll}
                >
                  Unenroll
                </button>
                <p className="text-sm text-red-600 mt-1">
                  Warning: No refunds upon unenrollment.
                </p>
              </div>
            )}

            {showPayment && (
              <Payment
                data={course}
                onSuccess={handlePaymentSuccess}
                onClose={() => setShowPayment(false)}
              />
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Course Details</h2>

              <ul className="list-disc list-inside text-gray-700">
                <li>
                  <span className="font-semibold">Level:</span> {course.level}
                </li>
                <li>
                  <span className="font-semibold">Duration:</span> 12 weeks
                </li>
                <li>
                  <span className="font-semibold">Skills Gained:</span>{" "}
                  {course.skillgained.join(", ")}
                </li>
              </ul>
            </div>
            {isEnrolled && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
                <div className="relative bg-gray-300 h-8 w-full rounded-lg overflow-hidden">
                  {/* Progress Bar */}
                  <div
                    className="absolute top-0 left-0 bg-blue-500 h-full rounded-lg transition-all"
                    style={{ width: `${progress}%` }} // Example: 50% completion
                  ></div>
                  {/* Insights on Hover */}
                  <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white text-sm font-bold transition-opacity">
                    {progress}% Completed
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg px-6 py-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">Modules</h2>
          {course.moduleResponseDTOList ? (
            course.moduleResponseDTOList.map((module, index) => (
              <ModuleDetails
                key={module.id}
                module={module}
                index={index}
                isEnrolled={isEnrolled}
              />
            ))
          ) : (
            <p>No modules available for this course.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
