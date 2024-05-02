import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import ModuleDetails from "../components/ModuleDetails/ModuleDetails";

const CourseDetail = () => {
  const [course] = useState({
    id: 1,
    title: "Learn to Program: The Fundamentals",
    description:
      "Build a strong foundation in programming with this comprehensive course. Learn the fundamental concepts of programming, including variables, data types, control flow, and more.",
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    enrolledCount: Math.ceil(Math.random() * (8500 - 5500) + 5500),
    isEnrolled: Math.random() < 0.5,
    level: "Beginner",
    duration: "Approximately 12 weeks",
    skillsGained: [
      "Problem-solving",
      "Programming logic",
      "Algorithmic thinking",
    ],
    modules: [
      {
        id: 1,
        title: "Module 1: Introduction to Programming",
        videos: [
          "Welcome to LTP - 0 minutes - Preview module",
          "Installing Python - 2 minutes",
          // Add more video details as needed
        ],
        readings: [
          "Syllabus - 10 minutes",
          "Course Logistics - 10 minutes",
          // Add more reading details as needed
        ],
        quizzes: [
          "Python, Variables, and Functions - 30 minutes",
          // Add more quiz details as needed
        ],
      },
      {
        id: 2,
        title: "Module 2: Variables and Data Types",
        videos: [
          "Introduction to Variables - 5 minutes",
          "Data Types in Python - 10 minutes",
          // Add more video details as needed
        ],
        readings: [
          "Variables and Memory Allocation - 15 minutes",
          "Primitive and Non-Primitive Data Types - 20 minutes",
          // Add more reading details as needed
        ],
        quizzes: [
          "Variables Quiz - 20 minutes",
          // Add more quiz details as needed
        ],
      },
      {
        id: 3,
        title: "Module 3: Control Flow",
        videos: [
          "Conditional Statements - 8 minutes",
          "Loops in Python - 12 minutes",
          // Add more video details as needed
        ],
        readings: [
          "If-else Statements - 10 minutes",
          "For and While Loops - 15 minutes",
          // Add more reading details as needed
        ],
        quizzes: [
          "Control Flow Quiz - 25 minutes",
          // Add more quiz details as needed
        ],
      },
      // Add more modules as needed
    ],
  });

  return (
    <div className="py-8 bg-gray-100">
      <div className="lg:px-32 lg:py-12 px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://source.unsplash.com/random/800x600/?programming"
              alt="course-logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white shadow-md rounded-lg px-6 py-8">
            <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="flex items-center mb-4">
              <BsFillStarFill className="text-yellow-500 mr-1" />
              <p className="text-gray-700 mr-2">{course.rating}</p>
              <p className="text-gray-700 mr-2">
                ({course.enrolledCount} ratings)
              </p>
              <FaUserAlt className="text-gray-700 mr-1" />
              <p className="text-gray-700">{course.level}</p>
            </div>

            <div className="mb-4">
              <button
                className={`w-full py-2 rounded-md text-white ${
                  course.isEnrolled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {course.isEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>
            </div>

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
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration}
                </li>
                <li>
                  <span className="font-semibold">Skills Gained:</span>{" "}
                  {course.skillsGained.join(", ")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg px-6 py-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">Modules</h2>
          {course.modules.map((module) => (
            <ModuleDetails key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
