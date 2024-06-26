import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import axios from "../../api/axios"; // Commented out for dummy data
import {
  SuccessNotification,
  ErrorNotification,
} from "../../notifications/notifications";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "../../api/axios";

const UserProfileModal = ({ onClose, logout }) => {
  const { user } = useAuth();
  console.log(user.username);
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(user.user_Name || "");
  const [email, setEmail] = useState(user.email || "");
  const [mobile, setMobile] = useState(user.contactNo || "");
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(3); // Display 3 courses per page
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const location = useLocation();
  const isAdmin = location.pathname === "/admin"; // Check if the current path is '/admin'
  const isInstructor = location.pathname === "/instructor"; // Check if the current path is '/instructor'

  console.log("enrolledCourses", enrolledCourses);

  useEffect(() => {
    // Fetch enrolled courses when the component mounts
    fetchEnrolledCourses();
  }, []);

  // Fetch enrolled courses from API
  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get("course-enrollment/user-courses");
      const courseIds = response.data.map((enrollment) => enrollment.courseId);
      const coursesData = await Promise.all(
        courseIds.map((courseId) =>
          axios.get(`course-controller/all-courses/${courseId}`)
        )
      );
      const enrolledCourses = coursesData.map((course) => course.data);
      setEnrolledCourses(enrolledCourses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      // Handle error fetching enrolled courses
    }
  };

  const handleUpdate = async () => {
    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`users/${user.userId}`, {
        userName: name,
        contactNo: mobile,
      });
      console.log("User updated successfully:", response.data);
      SuccessNotification("User updated successfully, Please login back.");
      logout();
      setEditable(false);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error.response.data);
      ErrorNotification("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      logout();
      SuccessNotification("Logout successful");
      onClose();
    } catch (error) {
      console.error("Error logging out:", error.response.data);
      ErrorNotification("Error logging out");
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    let isValid = true;

    // Dummy validation logic
    // Validate name
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    // Dummy email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Dummy mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setMobileError("Invalid mobile number (10 digits only)");
      isValid = false;
    } else {
      setMobileError("");
    }

    return isValid;
  };

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = enrolledCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDetailsNavigation = (course) => {
    navigate("/details", { state: { course } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4 text-black">
              {isAdmin ? "Admin Profile" : "User Profile"}
            </h2>
            <button onClick={onClose}>
              <AiOutlineClose className="text-black" />
            </button>
          </div>
          <div>
            {/* Profile details inputs */}
            <div className="mb-4">
              <label htmlFor="name" className="text-black block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`rounded-md p-2 w-full ${
                  editable ? "ring-2 ring-blue-500" : "ring-gray-800"
                } text-black bg-gray-100`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editable}
              />
              {nameError && <p className="text-red-500">{nameError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-black block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`rounded-md p-2 w-full ${
                  editable ? "ring-2 ring-blue-500" : "ring-gray-800"
                } text-black bg-gray-100`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="text-black block mb-1">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                className={`rounded-md p-2 w-full ${
                  editable ? "ring-2 ring-blue-500" : "ring-gray-800"
                } text-black bg-gray-100`}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={!editable}
              />
              {mobileError && <p className="text-red-500">{mobileError}</p>}
            </div>

            {/* Enrolled courses section */}
            {!(isAdmin || isInstructor) && currentCourses.length > 0 ? (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Enrolled Courses
                  </h3>
                  {currentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between mb-2"
                    >
                      <span>{course.courseName}</span>
                      <button
                        className="text-blue-500 underline cursor-pointer"
                        onClick={() => handleDetailsNavigation(course)}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    enrolledCourses.length / coursesPerPage
                  )}
                  onPageChange={paginate}
                />
              </>
            ) : (
              <div>No enrolled courses</div>
            )}

            {/* Buttons for update and logout */}
            <div className="flex justify-between mt-5">
              {/* Update button */}
              {!editable ? (
                <button
                  onClick={() => setEditable(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {loading ? <LoadingSpinner /> : "Submit Update"}
                </button>
              )}

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
