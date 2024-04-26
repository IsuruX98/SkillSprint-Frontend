import React, { useState } from "react";

const CoursePage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Course 1",
      description: "Description for Course 1",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Course 2",
      description: "Description for Course 2",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Course 3",
      description: "Description for Course 3",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Course 4",
      description: "Description for Course 4",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Course 5",
      description: "Description for Course 5",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      title: "Course 6",
      description: "Description for Course 6",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      title: "Course 7",
      description: "Description for Course 7",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      title: "Course 8",
      description: "Description for Course 8",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      title: "Course 9",
      description: "Description for Course 9",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 10,
      title: "Course 10",
      description: "Description for Course 10",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 11,
      title: "Course 11",
      description: "Description for Course 11",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 12,
      title: "Course 12",
      description: "Description for Course 12",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 13,
      title: "Course 13",
      description: "Description for Course 13",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 14,
      title: "Course 14",
      description: "Description for Course 14",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 15,
      title: "Course 15",
      description: "Description for Course 15",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 16,
      title: "Course 16",
      description: "Description for Course 16",
      imageUrl: "https://via.placeholder.com/150",
    },
  ]);

  const pageSize = 8; // Number of courses per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCourse = currentPage * pageSize;
  const indexOfFirstCourse = indexOfLastCourse - pageSize;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="bg-blue-500 text-white">
        <div className="lg:px-32 lg:py-12 px-12 py-12">
          <h1 className="text-3xl font-semibold">Courses</h1>
          <p className="mt-2">Explore our range of courses</p>
        </div>
      </div>
      <div className="lg:px-32 lg:py-12 px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-700">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {Array.from(
            { length: Math.ceil(courses.length / pageSize) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
