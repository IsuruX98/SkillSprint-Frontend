import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import axios from "../../api/axios"; // Commented out for dummy data
import {
  SuccessNotification,
  ErrorNotification,
} from "../../notifications/notifications";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const UserProfileModal = ({ onClose, logout }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("John Doe"); // Dummy user data
  const [email, setEmail] = useState("john.doe@example.com"); // Dummy user data
  const [mobile, setMobile] = useState("1234567890"); // Dummy user data
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(3); // Display 3 courses per page
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  useEffect(() => {
    // Fetch enrolled courses when the component mounts
    // Dummy data, no actual API call
    fetchEnrolledCourses();
  }, []);

  // Dummy fetchEnrolledCourses function
  const fetchEnrolledCourses = async () => {
    // Dummy array of enrolled courses (replace with actual API call)
    const dummyCourses = [
      { id: 1, name: "HTML Fundamentals" },
      { id: 2, name: "CSS Basics" },
      { id: 3, name: "JavaScript Essentials" },
      { id: 4, name: "Responsive Web Design" },
      { id: 5, name: "Introduction to Web Development" },
      { id: 6, name: "Web Development for Beginners" },
      { id: 7, name: "Introduction to Frontend Development" },
    ];
    setEnrolledCourses(dummyCourses);
  };

  const handleUpdate = async () => {
    // Validate fields before updating
    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      // Dummy API call, no actual update
      // const response = await axios.put(`user/profile/${user._id}`, {
      //   name,
      //   email,
      //   mobile,
      // });
      // console.log("User updated successfully:", response.data);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4 text-black">User Profile</h2>
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
                disabled={!editable}
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
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Enrolled Courses</h3>
              {currentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between mb-2"
                >
                  <span>{course.name}</span>
                  <button
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() => console.log(`View ${course.name}`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              {enrolledCourses.length > coursesPerPage && (
                <ul className="flex">
                  {Array.from({
                    length: Math.ceil(enrolledCourses.length / coursesPerPage),
                  }).map((_, index) => (
                    <li key={index} className="mx-1">
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        } px-3 py-1 rounded-lg`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

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
