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

  //console.log("hi", user.userId);

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
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-3 text-left">Image</th>

                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category ID</th>
                <th className="p-3 text-left">Level</th>
                <th className="p-3 text-left">Price</th>

                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedCourses.map((course) => (
                <tr key={course.id} className="border-t">
                  <td className="p-3">
                    <img
                      src={course.coverImgUrl}
                      alt={course.courseName}
                      className="w-24 h-16"
                    />
                  </td>
                  <td className="p-3">{course.courseName}</td>
                  <td className="p-3">{course.categoryId}</td>
                  <td className="p-3">{course.level}</td>
                  <td className="p-3">$ {course.price}</td>

                  <td className="p-3 flex justify-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                      onClick={() => handleViewDetails(course)}
                    >
                      View
                    </button>
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
