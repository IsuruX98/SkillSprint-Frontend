import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import axios from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("course-controller/all-approved/");
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        // Handle error, show error notification, etc.
      }
    };

    fetchCourses();
  }, []);

  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCourse = currentPage * pageSize;
  const indexOfFirstCourse = indexOfLastCourse - pageSize;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const trimDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const handleDetailsNavigation = (course) => {
    navigate("/details", { state: { course } });
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="lg:px-32 px-12 py-8">
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="mt-2">Explore our range of courses</p>
          </div>
          <div className="lg:px-32 px-12 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4">
              {currentCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
                  onClick={() => handleDetailsNavigation(course)}
                >
                  <img
                    src={course.coverImgUrl}
                    alt={course.courseName}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {course.courseName}
                    </h2>
                    <p className="text-gray-700">
                      {trimDescription(course.description, 150)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(courses.length / pageSize)}
              onPageChange={paginate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
