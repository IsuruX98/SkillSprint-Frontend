import React, { useState } from "react";

const ModuleDetails = ({ moduleName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full p-4 text-lg font-medium text-left focus:outline-none"
      >
        <span>{moduleName}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 transform ${
            isOpen ? "rotate-90" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.293 6.293a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L10 10.586l4.293-4.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          {/* Include your module details here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium">8 videos</h3>
              <ul className="mt-2 space-y-1">
                <li>Welcome to LTP - 0 minutes - Preview module</li>
                <li>Installing Python - 2 minutes</li>
                {/* Add more video details */}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">10 readings</h3>
              <ul className="mt-2 space-y-1">
                <li>Syllabus - 10 minutes</li>
                <li>Course Logistics - 10 minutes</li>
                {/* Add more reading details */}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">1 quiz</h3>
              <ul className="mt-2 space-y-1">
                <li>Python, Variables, and Functions - 30 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleDetails;
