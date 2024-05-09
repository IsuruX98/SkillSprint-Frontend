import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../../../context/authContext";
import axios from "../../../../../api/axios";
import LoadingSpinner from "../../../../../components/LoadingSpinner/LoadingSpinner";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../../../notifications/notifications";

const AddVideoDetails = () => {
  const { user } = useAuth();
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [moduleOptions, setModuleOptions] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);

  console.log(videoFile);

  // Ref for video element
  const videoRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("title", title);
      formData.append("moduleId", selectedModule);

      await axios.post("content-controller/videos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
    } catch (error) {
      console.error("Error adding video:", error);
      setError("Error adding video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle video selection and duration retrieval
  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    setVideoFile(file);

    // Load video metadata
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function () {
      // Retrieve video duration
      const duration = video.duration;
      setVideoDuration(formatDuration(duration));
    };
    video.src = URL.createObjectURL(file);

    // Set video details
    setVideoDetails({
      name: file.name,
      type: file.type,
      size: file.size,
    });
  };

  // Function to format duration into minutes and seconds
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes} minutes and ${seconds} seconds`;
  };

  return (
    <div className="p-10 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Add Video Details
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
            htmlFor="title" // Added label for title input
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Video Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
        </div>

        <div>
          <label
            htmlFor="videoFile"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Video File
          </label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleVideoChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
        </div>
        {videoDetails && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Video Details</h3>
            <p className="text-gray-700 mb-1">Name: {videoDetails.name}</p>
            <p className="text-gray-700 mb-1">Type: {videoDetails.type}</p>
            <p className="text-gray-700 mb-1">
              Size: {videoDetails.size} bytes
            </p>
            <p className="text-gray-700 mb-1">Duration: {videoDuration}</p>
          </div>
        )}
        {videoFile && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Video Preview</h3>
            <video ref={videoRef} controls className="w-full rounded-md">
              <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div>
          <button
            type="submit"
            disabled={!videoFile || loading}
            className={`py-3 mt-8 px-4 bg-blue-600 ${
              (!videoFile || loading) && "opacity-50 cursor-not-allowed"
            } hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Add Video
          </button>
          {loading && <LoadingSpinner />}
        </div>
      </form>
    </div>
  );
};

export default AddVideoDetails;
