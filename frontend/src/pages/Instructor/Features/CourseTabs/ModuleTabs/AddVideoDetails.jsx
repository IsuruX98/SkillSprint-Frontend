import React, { useState, useRef } from "react";

const AddVideoDetails = () => {
  // Dummy module names
  const modules = ["Module X", "Module Y", "Module Z"];

  // State variables for form inputs
  const [module, setModule] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);

  // Ref for video element
  const videoRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log("Form submitted with:", {
      module,
      videoFile,
      videoDuration,
      videoDetails,
    });
    // Reset form fields
    setModule("");
    setVideoFile(null);
    setVideoDuration("");
    setVideoDetails(null);
    // Reset video element
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
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
            htmlFor="module"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select a Module
          </label>
          <select
            id="module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">Select a module</option>
            {modules.map((module, index) => (
              <option key={index} value={module}>
                {module}
              </option>
            ))}
          </select>
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
        <div>
          <button
            type="submit"
            disabled={!videoFile}
            className={`py-3 mt-8 px-4 bg-blue-600 ${
              !videoFile && "opacity-50 cursor-not-allowed"
            } hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Add Video
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideoDetails;
