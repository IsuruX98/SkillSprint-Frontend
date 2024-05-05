import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddReadingDetails = () => {
  // Dummy module names
  const modules = ["Module X", "Module Y", "Module Z"];

  // State variables for form inputs
  const [module, setModule] = useState("");
  const [readingTitle, setReadingTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

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
