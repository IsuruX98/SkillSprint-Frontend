import React, { useState, useEffect } from "react";
import Pagination from "../../../../../components/Pagination/Pagination";
import axios from "../../../../../api/axios";
import LoadingSpinner from "../../../../../components/LoadingSpinner/LoadingSpinner";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../../../notifications/notifications";
import { useAuth } from "../../../../../context/authContext";

const Courses = ({ handleTabChange, setSelectedCourse }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5); // Number of courses per page
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `course-controller/instructor/${user.userId}`
        );
        setCourses(response.data); // Assuming response.data is an array of course objects
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        // Handle error, show error notification, etc.
      }
    };

    fetchCourses();
  }, []);

  // Pagination logic to slice the courses array based on current page
  useEffect(() => {
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    setDisplayedCourses(currentCourses);
  }, [currentPage, courses, coursesPerPage]);

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Filter courses based on search term
    const filteredCourses = courses.filter((course) =>
      course.courseName.toLowerCase().includes(term.toLowerCase())
    );
    setDisplayedCourses(filteredCourses);
    setCurrentPage(1); // Reset current page when search term changes
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    // Change active tab to "Course Details"
    handleTabChange("Course Details");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border w-full border-gray-300 rounded-xl mr-2"
        />
        {/* Add view button here if needed */}
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full shadow-md rounded-xl">
            <thead>
              <tr className="text-center">
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category ID</th>
                <th className="p-3">Level</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th> {/* Add status header */}
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedCourses.map((course) => (
                <tr key={course.id} className="border-t hover:bg-gray-100">
                  <td className="p-3 flex justify-center">
                    <img
                      src={course.coverImgUrl}
                      alt={course.courseName}
                      className="w-24 h-16 object-cover"
                    />
                  </td>
                  <td className="p-3 text-center">{course.courseName}</td>
                  <td className="p-3 text-center">{course.categoryId}</td>
                  <td className="p-3 text-center">{course.level}</td>
                  <td className="p-3 text-center">$ {course.price}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded ${
                        course.status === "PENDING"
                          ? "bg-yellow-500 text-white"
                          : course.status === "APPROVED"
                          ? "bg-green-500 text-white"
                          : course.status === "DECLINED"
                          ? "bg-red-500 text-white"
                          : ""
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110"
                      onClick={() => handleViewDetails(course)}
                    >
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Courses;
