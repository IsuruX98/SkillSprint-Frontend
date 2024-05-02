import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";

const CoursePage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn the basics of web development.",
      imageUrl: "https://source.unsplash.com/random/800x600/?web-development",
    },
    {
      id: 2,
      title: "Python Programming Masterclass",
      description: "Master Python programming from scratch.",
      imageUrl: "https://source.unsplash.com/random/800x600/?python",
    },
    {
      id: 3,
      title: "Data Science Essentials",
      description: "Explore the essentials of data science.",
      imageUrl: "https://source.unsplash.com/random/800x600/?data-science",
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      description: "Get started with the basics of machine learning.",
      imageUrl: "https://source.unsplash.com/random/800x600/?machine-learning",
    },
    {
      id: 5,
      title: "JavaScript for Beginners",
      description: "Begin your journey into JavaScript.",
      imageUrl: "https://source.unsplash.com/random/800x600/?javascript",
    },
    {
      id: 6,
      title: "React.js Crash Course",
      description: "Learn React.js in a single crash course.",
      imageUrl: "https://source.unsplash.com/random/800x600/?react",
    },
    {
      id: 7,
      title: "Node.js Basics",
      description: "Understand the basics of Node.js.",
      imageUrl: "https://source.unsplash.com/random/800x600/?node-js",
    },
    {
      id: 8,
      title: "Full Stack Development Bootcamp",
      description: "Become a full stack developer in weeks.",
      imageUrl: "https://source.unsplash.com/random/800x600/?full-stack",
    },
    {
      id: 9,
      title: "Java Programming Masterclass",
      description: "Master Java programming language.",
      imageUrl: "https://source.unsplash.com/random/800x600/?java",
    },
    {
      id: 10,
      title: "Cybersecurity Fundamentals",
      description: "Learn the fundamentals of cybersecurity.",
      imageUrl: "https://source.unsplash.com/random/800x600/?cybersecurity",
    },
    {
      id: 11,
      title: "UX/UI Design Essentials",
      description: "Essential skills for UX/UI designers.",
      imageUrl: "https://source.unsplash.com/random/800x600/?ui-ux",
    },
    {
      id: 12,
      title: "Android App Development",
      description: "Build your own Android apps from scratch.",
      imageUrl:
        "https://source.unsplash.com/random/800x600/?android-development",
    },
    {
      id: 13,
      title: "iOS App Development",
      description: "Learn iOS app development with Swift.",
      imageUrl: "https://source.unsplash.com/random/800x600/?ios-development",
    },
    {
      id: 14,
      title: "Cloud Computing Basics",
      description: "Introduction to cloud computing concepts.",
      imageUrl: "https://source.unsplash.com/random/800x600/?cloud-computing",
    },
    {
      id: 15,
      title: "DevOps Essentials",
      description: "Essential practices for DevOps engineers.",
      imageUrl: "https://source.unsplash.com/random/800x600/?devops",
    },
    {
      id: 16,
      title: "Agile Methodology",
      description: "Understanding Agile principles and practices.",
      imageUrl: "https://source.unsplash.com/random/800x600/?agile",
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
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="mt-2">Explore our range of courses</p>
        </div>
      </div>
      <div className="lg:px-32 lg:py-12 px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentCourses.map((course) => (
            <Link
              to="/details"
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
            </Link>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(courses.length / pageSize)}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default CoursePage;
