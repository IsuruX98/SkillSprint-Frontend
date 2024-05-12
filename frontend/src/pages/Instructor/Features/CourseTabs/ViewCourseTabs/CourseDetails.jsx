import React, { useState, useEffect } from "react";
import axios from "../../../../../api/axios"; // Import axios for API requests

const CourseDetails = ({ course }) => {
  const [modules, setModules] = useState([]); // State to store modules data

  // Function to fetch modules for the selected course
  useEffect(() => {
    // Check if course is provided
    if (course) {
      const fetchModules = async () => {
        try {
          const response = await axios.get(`module-controller/${course.id}`);
          setModules(response.data); // Set modules data from the response
        } catch (error) {
          console.error("Error fetching modules:", error);
          // Handle error, show error notification, etc.
        }
      };

      fetchModules();
    }
  }, [course]); // Fetch modules whenever the course ID changes

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Course Details</h2>
      {course ? (
        <div>
          <div className="mb-4">
            <img
              src={course.coverImgUrl}
              alt={course.courseName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Title:</p>
            <p className="text-base">{course.courseName}</p>
          </div>
          {/* Render modules */}
          {modules ? (
            <div className="mb-4">
              <p className="text-lg font-semibold">Modules:</p>
              <ul className="list-disc list-inside">
                {modules.map((module) => (
                  <li key={module.id} className="text-base">
                    <strong>{module.moduleCode}:</strong> {module.moduleName}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No Modules for this course</p>
          )}

          {/* Other course details */}
          <div className="mb-4">
            <p className="text-lg font-semibold">Level:</p>
            <p className="text-base">{course.level}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Price:</p>
            <p className="text-base">${course.price}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Description:</p>
            <p className="text-base">{course.description}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Skills Gained:</p>
            <ul className="list-disc list-inside">
              {course.skillgained.map((skill, index) => (
                <li key={index} className="text-base">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <div>
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
                Course is still {course.status}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please select a course to view details.</p>
      )}
    </div>
  );
};

export default CourseDetails;
