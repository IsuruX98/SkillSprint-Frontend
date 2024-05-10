import React, { useState } from "react";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import ModuleDetails from "../components/ModuleDetails/ModuleDetails";
import Payment from "../components/Payment/Payment";
import { useLocation } from "react-router-dom";

// {
//   "id": "663cd157d19b336b0b8d5b93",
//   "courseName": "Introduction to Cybersecurity",
//   "categoryId": "CYB101",
//   "description": "This course provides an overview of fundamental concepts and principles in cybersecurity, including threats, vulnerabilities, and risk management strategies.",
//   "price": 99,
//   "level": "Beginner",
//   "skillgained": [
//       "Understanding of cybersecurity fundamentals",
//       "threat landscape analysis",
//       "risk assessment techniques"
//   ],
//   "status": "PENDING",
//   "instructorId": "6637a6492041772eca45cdc3",
//   "coverImgUrl": "http://res.cloudinary.com/dvmgc2jjh/image/upload/v1715261783/vlezr013q4aczlhtpaqx.jpg"
// }

const CourseDetail = () => {
  const location = useLocation();
  const [incomingCourse, setIncomingCourse] = useState(location.state.course);
  console.log(incomingCourse);
  const [course] = useState({
    id: incomingCourse.id,
    title: incomingCourse.courseName,
    description: incomingCourse.description,
    rating: 4.7,
    enrolledCount: 4500,
    level: incomingCourse.level,
    price: incomingCourse.price,
    duration: "Approximately 8 weeks",
    skillsGained: incomingCourse.skillgained,
    modules: [
      {
        id: 1,
        title: "Module 1: Object-oriented Programming",
        videos: [
          {
            title: "Introduction to OOP",
            duration: "10 minutes",
            description:
              "Understand the principles of object-oriented programming. This video covers the basics of classes, objects, and inheritance.",
            link: "https://res.cloudinary.com/dpgelkpd4/video/upload/v1697576226/upload/juvlunodv5dldz3ipjas.mp4",
          },
          {
            title: "Classes and Objects",
            duration: "15 minutes",
            description:
              "Learn how to define classes and create objects in Python. This video explains the concepts of classes, attributes, and methods.",
            link: "https://res.cloudinary.com/dpgelkpd4/video/upload/v1697576226/upload/juvlunodv5dldz3ipjas.mp4",
          },
        ],
        readings: [
          {
            title: "Inheritance and Polymorphism",
            duration: "20 minutes",
            description:
              "Explore inheritance and polymorphism in object-oriented programming. This reading material delves into the concepts of inheritance, method overriding, and polymorphic behavior.",
          },
          {
            title: "Encapsulation and Abstraction",
            duration: "15 minutes",
            description:
              "Understand encapsulation and abstraction concepts. This reading material explains how encapsulation and abstraction help in designing robust and maintainable software systems.",
          },
        ],
        quizzes: [
          {
            title: "OOP Quiz",
            duration: "25 minutes",
            description:
              "Test your understanding of object-oriented programming concepts. This quiz covers topics such as inheritance, encapsulation, polymorphism, and class design principles.",
            quiz: {
              questions: [
                {
                  question:
                    "What is inheritance in object-oriented programming?",
                  options: ["A", "B", "C", "D"],
                  correct_answer: "A",
                },
                {
                  question: "What is encapsulation?",
                  options: ["A", "B", "C", "D"],
                  correct_answer: "B",
                },
              ],
            },
          },
        ],
      },
      {
        id: 2,
        title: "Module 2: Data Structures",
        videos: [
          {
            title: "Introduction to Data Structures",
            duration: "12 minutes",
            description:
              "Learn about common data structures in Python. This video provides an overview of data structures such as arrays, linked lists, stacks, queues, trees, and graphs.",
            link: "https://res.cloudinary.com/dpgelkpd4/video/upload/v1697576226/upload/juvlunodv5dldz3ipjas.mp4",
          },
          {
            title: "Arrays and Linked Lists",
            duration: "20 minutes",
            description:
              "Explore arrays and linked lists. This video discusses the implementation, advantages, and use cases of arrays and linked lists in Python.",
            link: "https://res.cloudinary.com/dpgelkpd4/video/upload/v1697576226/upload/juvlunodv5dldz3ipjas.mp4",
          },
        ],
        readings: [
          {
            title: "Stacks and Queues",
            duration: "15 minutes",
            description:
              "Stacks and queues are fundamental data structures used in computer science and software engineering. In this reading material, you will delve deep into understanding the principles, operations, and applications of stacks and queues. You will learn how stacks follow the Last In, First Out (LIFO) principle, making them suitable for tasks like expression evaluation, backtracking, and memory management. Similarly, queues adhere to the First In, First Out (FIFO) principle, making them ideal for implementing algorithms such as breadth-first search and job scheduling. By the end of this reading, you will have a solid grasp of how stacks and queues work and how they are applied in various real-world scenarios.",
          },
          {
            title: "Trees and Graphs",
            duration: "25 minutes",
            description:
              "Trees and graphs are essential data structures used to represent hierarchical relationships and complex networks, respectively. This reading material provides an in-depth exploration of trees and graphs, starting with the hierarchical structure of trees. You will learn about different types of trees, such as binary trees, binary search trees, and balanced trees, and understand their properties and operations. Additionally, the reading covers graph theory, which deals with the interconnected nature of graphs. You will explore different types of graphs, including directed and undirected graphs, and learn about important concepts like paths, cycles, and connectivity. By the end of this reading, you will have a comprehensive understanding of trees and graphs, enabling you to solve problems involving hierarchical data and complex networks with confidence.",
          },
        ],
        quizzes: [
          {
            title: "Data Structures Quiz",
            duration: "30 minutes",
            description:
              "Test your understanding of data structures in Python. This quiz evaluates your knowledge of arrays, linked lists, stacks, queues, trees, and graphs.",
            quiz: {
              questions: [
                {
                  question: "What is a stack?",
                  options: ["A", "B", "C", "D"],
                  correct_answer: "A",
                },
                {
                  question: "What is a graph?",
                  options: ["A", "B", "C", "D"],
                  correct_answer: "B",
                },
              ],
            },
          },
        ],
      },
    ],
  });

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleEnroll = () => {
    setShowPayment(true);
  };

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
            <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center">
                <p className="text-gray-700 mr-2">{course.rating}</p>
                <p className="text-gray-700 mr-2">
                  ({course.enrolledCount} ratings)
                </p>
                <BsFillStarFill className="text-yellow-500 mr-1" />
                <BsFillStarFill className="text-yellow-500 mr-1" />
                <BsFillStarFill className="text-yellow-500 mr-1" />
                <BsFillStarFill className="text-yellow-500 mr-1" />
              </div>
              <div className="flex items-center">
                <FaUserAlt className="text-gray-700 mr-1" />
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
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration}
                </li>
                <li>
                  <span className="font-semibold">Skills Gained:</span>{" "}
                  {course.skillsGained.join(", ")}
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
          {course.modules.map((module) => (
            <ModuleDetails key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
