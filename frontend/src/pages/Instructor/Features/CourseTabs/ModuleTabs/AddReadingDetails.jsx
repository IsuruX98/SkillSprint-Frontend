import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../../../../../context/authContext";
import axios from "../../../../../api/axios";
import LoadingSpinner from "../../../../../components/LoadingSpinner/LoadingSpinner";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../../../notifications/notifications";

const AddReadingDetails = () => {
  const { user } = useAuth();
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [moduleOptions, setModuleOptions] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");

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

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (selectedCourse) {
          const response = await axios.get(
            `module-controller/${selectedCourse}`
          );

          if (Array.isArray(response.data)) {
            setModuleOptions(
              response.data.map((module) => ({
                id: module.id,
                name: module.moduleName,
              }))
            );
          } else {
            setModuleOptions([]);
          }
        } else {
          setModuleOptions([]);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [selectedCourse]);

  // State variables for form inputs
  const [module, setModule] = useState("");
  const [readingTitle, setReadingTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  console.log(description);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log("Form submitted with:", {
      module,
      readingTitle,
      description,
      duration,
    });
    // Reset form fields
    setModule("");
    setReadingTitle("");
    setDescription("");
    setDuration("");
  };

  return (
    <div className="p-10 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Add Reading Details
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
            htmlFor="module"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select a Module
          </label>
          <select
            id="module"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">Select a module</option>
            {moduleOptions.length === 0 ? (
              <option disabled>No modules available for selected course</option>
            ) : (
              moduleOptions.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label
            htmlFor="readingTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Reading Title
          </label>
          <input
            type="text"
            id="readingTitle"
            value={readingTitle}
            onChange={(e) => setReadingTitle(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <ReactQuill
            id="description"
            value={description}
            onChange={setDescription}
            className="border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Duration (in minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
        </div>
        <div>
          <button
            type="submit"
            className="py-3 mt-8 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Reading
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReadingDetails;
