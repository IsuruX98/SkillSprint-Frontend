import React, { useState, useEffect } from "react";
import Pagination from "../../../../components/Pagination/Pagination";

const ViewCourses = () => {
  const initialCourses = [
    {
      id: 1,
      title: "Introduction to React",
      level: "Beginner",
      price: 2500.0,
      duration: "Approximately 6 weeks",
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      level: "Intermediate",
      price: 3500.0,
      duration: "Approximately 8 weeks",
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      level: "Intermediate",
      price: 4000.0,
      duration: "Approximately 10 weeks",
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      level: "Advanced",
      price: 5000.0,
      duration: "Approximately 12 weeks",
    },
    {
      id: 5,
      title: "Data Science with Python",
      level: "Intermediate",
      price: 3800.0,
      duration: "Approximately 10 weeks",
    },
    {
      id: 6,
      title: "iOS App Development",
      level: "Advanced",
      price: 4500.0,
      duration: "Approximately 8 weeks",
    },
    {
      id: 7,
      title: "Java Programming Masterclass",
      level: "Advanced",
      price: 4800.0,
      duration: "Approximately 10 weeks",
    },
    {
      id: 8,
      title: "Graphic Design Fundamentals",
      level: "Beginner",
      price: 3000.0,
      duration: "Approximately 8 weeks",
    },
    {
      id: 9,
      title: "Artificial Intelligence Basics",
      level: "Intermediate",
      price: 3800.0,
      duration: "Approximately 10 weeks",
    },
    {
      id: 10,
      title: "Cybersecurity Essentials",
      level: "Intermediate",
      price: 4000.0,
      duration: "Approximately 8 weeks",
    },
    // Add more courses as needed
  ];

  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5); // Number of courses per page
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter courses based on search term
  const filterCourses = (term) => {
    const filteredCourses = initialCourses.filter((course) =>
      course.title.toLowerCase().includes(term.toLowerCase())
    );
    setCourses(filteredCourses);
    setCurrentPage(1); // Reset current page when search term changes
  };

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
    filterCourses(term);
  };

  // Set initial courses and display initial courses on the first page
  useEffect(() => {
    filterCourses(searchTerm);
  }, [searchTerm]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(courses.length / coursesPerPage);

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
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Level</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedCourses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="p-3">{course.id}</td>
                <td className="p-3">{course.title}</td>
                <td className="p-3">{course.level}</td>
                <td className="p-3">{course.price}</td>
                <td className="p-3">{course.duration}</td>
                <td className="p-3 flex justify-center">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ViewCourses;
