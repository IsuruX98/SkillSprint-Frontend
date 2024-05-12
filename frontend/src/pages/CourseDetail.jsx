import React, { useEffect, useState } from "react";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import ModuleDetails from "../components/ModuleDetails/ModuleDetails";
import Payment from "../components/Payment/Payment";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const CourseDetail = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Introduce loading state
  const [incomingCourse, setIncomingCourse] = useState(location.state.course);
  const [course, setCourse] = useState(null); // Rename state to 'course'

  console.log(course);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          "course-controller/all-courses/66408230e885811075ea61e1"
        );
        const data = await response.data;
        setCourse(data); // Set course data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleEnroll = () => {
    setShowPayment(true);
  };

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while fetching data
  }

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
                <p className="text-gray-700">19.99</p>
              </div>
            </div>

            <div className="mb-4">
              <button
                className={`w-full py-2 rounded-md text-white ${
                  isEnrolled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={handleEnroll}
              >
                {course.isEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>
            </div>
            {showPayment && (
              <Payment data={course} onClose={() => setShowPayment(false)} />
            )}

            <div className="text-gray-600 mb-4">
              <strong>{course.enrolledCount}</strong> Already Enrolled
            </div>

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
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
              <div className="relative bg-gray-300 h-8 w-full rounded-lg overflow-hidden">
                {/* Progress Bar */}
                <div
                  className="absolute top-0 left-0 bg-blue-500 h-full rounded-lg transition-all"
                  style={{ width: "50%" }} // Example: 50% completion
                ></div>
                {/* Insights on Hover */}
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white text-sm font-bold transition-opacity">
                  50% Completed
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg px-6 py-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">Modules</h2>
          {course.moduleResponseDTOList.map((module) => (
            <ModuleDetails key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
