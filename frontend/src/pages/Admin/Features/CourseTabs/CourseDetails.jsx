import React from "react";

const CourseDetails = ({ course }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Course Details</h2>
      {course ? (
        <div>
          <p className="mb-2">
            <strong>Title:</strong> {course.title}
          </p>
          <p className="mb-2">
            <strong>Level:</strong> {course.level}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> ${course.price}
          </p>
          <p className="mb-2">
            <strong>Duration:</strong> {course.duration}
          </p>
          {/* Add more details here if needed */}
        </div>
      ) : (
        <p className="text-gray-500">Please select a course to view details.</p>
      )}
    </div>
  );
};

export default CourseDetails;
