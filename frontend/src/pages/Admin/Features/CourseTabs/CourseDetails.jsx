import React, { useState, useEffect } from "react";
import axios from "../../../../api/axios"; // Import axios for API requests

const CourseDetails = ({ course }) => {
  const [approvalStatus, setApprovalStatus] = useState("Pending");
  const [modules, setModules] = useState([]); // State to store modules data

  // Function to fetch modules for the selected course
  useEffect(() => {
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
  }, [course.id]); // Fetch modules whenever the course ID changes

  const handleApprove = () => {
    // Logic to approve the course (you can implement your own approval mechanism here)
    setApprovalStatus("Approved");
  };

  const handleDecline = () => {
    // Logic to decline the course
    setApprovalStatus("Declined");
  };

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
            <p className="mr-2 text-lg font-semibold">Status:</p>
            <p className="text-base">{approvalStatus}</p>
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors duration-300 mr-2"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors duration-300"
              onClick={handleDecline}
            >
              Decline
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please select a course to view details.</p>
      )}
    </div>
  );
};

export default CourseDetails;
