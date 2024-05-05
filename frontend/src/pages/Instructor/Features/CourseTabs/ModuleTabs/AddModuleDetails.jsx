import React, { useState } from "react";

const AddModuleDetails = () => {
  // Dummy course names
  const courses = ["Course A", "Course B", "Course C"];

  // State variables for form inputs
  const [course, setCourse] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log("Form submitted with:", {
      course,
      moduleName,
      moduleDescription,
    });
    // Reset form fields
    setCourse("");
    setModuleName("");
    setModuleDescription("");
  };

  return (
    <div className="p-10 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Add Module Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Course
          </label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">Select a course</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="moduleName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Module Name
          </label>
          <input
            type="text"
            id="moduleName"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label
            htmlFor="moduleDescription"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Module Description
          </label>
          <textarea
            id="moduleDescription"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
            rows="3"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="py-3 mt-8 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Module
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModuleDetails;
