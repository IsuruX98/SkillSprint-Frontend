import React, { useState, useEffect } from "react";
import axios from "../../../../../api/axios";
import { useAuth } from "../../../../../context/authContext";
import LoadingSpinner from "../../../../../components/LoadingSpinner/LoadingSpinner";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../../../notifications/notifications";

const AddModuleDetails = () => {
  const { user } = useAuth();
  // State variables for form inputs
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleCode, setModuleCode] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `course-controller/instructor/${user.userId}`
        );
        setCourseOptions(
          response.data.map((course) => ({
            id: course.id,
            name: course.courseName,
          }))
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation checks
    if (!moduleName || !moduleCode || !selectedCourse) {
      ErrorNotification("Please fill in all fields.");
      return;
    }
    setLoading(true);

    const data = {
      moduleName,
      moduleCode,
      courseId: selectedCourse,
    };

    try {
      const response = await axios.post("module-controller", data);
      if (response) {
        SuccessNotification("Module added successfully");
        setSelectedCourse("");
        setModuleName("");
        setModuleCode("");
      }
    } catch (error) {
      console.error("Error adding module:", error);
      ErrorNotification("Error adding module. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Add Module Details
      </h2>
      {loading && <LoadingSpinner />}
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
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">Select a course</option>
            {courseOptions.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
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
            htmlFor="moduleCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Module Code
          </label>
          <input
            type="text"
            id="moduleCode"
            value={moduleCode}
            onChange={(e) => setModuleCode(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
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
