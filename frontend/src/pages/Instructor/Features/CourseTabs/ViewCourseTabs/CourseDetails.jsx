import React, { useState } from "react";

const CourseDetails = ({ course }) => {
  const [approvalStatus, setApprovalStatus] = useState("Pending");

  const handleApprove = () => {
    // Logic to approve the course (you can implement your own approval mechanism here)
    setApprovalStatus("Approved");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Course Details</h2>
      {course ? (
        <div>
          <p className="text-lg mb-2">
            <strong>Title:</strong> {course.title}
          </p>
          <p className="text-base mb-2">
            <strong>Level:</strong> {course.level}
          </p>
          <p className="text-base mb-2">
            <strong>Price:</strong> ${course.price}
          </p>
          <p className="text-base mb-4">
            <strong>Duration:</strong> {course.duration}
          </p>
          {/* Add more details here if needed */}
          <div className="flex items-center">
            <p className="mr-2 text-base">Status: {approvalStatus}</p>
            {approvalStatus === "Pending" && (
              <button
                className="bg-blue-500 text-white px-4 text-sm py-1 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={handleApprove}
              >
                Approve
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
