import React, { useState, useEffect } from "react";
import axios from "../../../../api/axios"; // Import axios for API requests
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../notifications/notifications";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const CourseDetails = ({ course }) => {
  const [modules, setModules] = useState([]); // State to store modules data
  const [loading, setLoading] = useState(false); // State to track loading status
  const [approvalStatus, setApprovalStatus] = useState(
    course ? course.status : null
  );

  // Function to fetch modules for the selected course
  useEffect(() => {
    // Check if course is provided
    if (course) {
      const fetchModules = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
          const response = await axios.get(`module-controller/${course.id}`);
          setModules(response.data); // Set modules data from the response
        } catch (error) {
          console.error("Error fetching modules:", error);
          // Handle error, show error notification, etc.
        } finally {
          setLoading(false); // Set loading to false when data fetching is complete
        }
      };

      fetchModules();
    }
  }, [course, approvalStatus]); // Fetch modules whenever the course ID changes

  const handleApprove = async () => {
    try {
      // Send a POST request to update course status to "APPROVED"
      await axios.put(`course-controller/approve/${course.id}`);
      SuccessNotification("Course Approved");
      setApprovalStatus("APPROVED");
    } catch (error) {
      console.error("Error approving course:", error);
      // Handle error, show error notification, etc.
    }
  };

  const handleDecline = async () => {
    try {
      // Send a POST request to update course status to "DECLINED"
      await axios.put(`course-controller/decline/${course.id}`);
      SuccessNotification("Course Declined");
      setApprovalStatus("DECLINED");
    } catch (error) {
      console.error("Error declining course:", error);
    }
  };

  if (!course) {
    return (
      <div>
        <p className="text-gray-500">Please select a course to view details.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Course Details</h2>
      {loading ? ( // Display loading spinner if data is being fetched
        <LoadingSpinner />
      ) : course ? (
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
            <span
              className={`inline-block px-2 py-1 rounded ${
                approvalStatus === "PENDING"
                  ? "bg-yellow-500 text-white"
                  : approvalStatus === "APPROVED"
                  ? "bg-green-500 text-white"
                  : approvalStatus === "DECLINED"
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              Course is currently in {approvalStatus}
            </span>
          </div>
          <div className="mb-4">
            {approvalStatus === "PENDING" && (
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors duration-300 mr-2"
                onClick={handleApprove}
              >
                Approve
              </button>
            )}
            {approvalStatus === "PENDING" && (
              <button
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                onClick={handleDecline}
              >
                Decline
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please select a course to view details.</p>
      )}
    </div>
  );
};

export default CourseDetails;
