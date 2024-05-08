import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ModuleDetails = ({ module }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToLearnModule = () => {
    // Pass module data through location state
    navigate("/learn-module", { state: { module: module } });
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full p-4 text-lg font-medium text-left focus:outline-none"
      >
        <span className="md:text-lg text-sm">{module.title}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 transform ${
            isOpen ? "rotate-90" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium">Videos</h3>
              <ul className="mt-2 space-y-1">
                {module.videos.map((video, index) => (
                  <li key={index}>
                    <a href={video.link} className="hover:underline">
                      {video.title} ({video.duration})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Readings</h3>
              <ul className="mt-2 space-y-1">
                {module.readings.map((reading, index) => (
                  <li key={index}>
                    <span>
                      {reading.title} ({reading.duration})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Quizzes</h3>
              <ul className="mt-2 space-y-1">
                {module.quizzes.map((quiz, index) => (
                  <li key={index}>
                    <span>
                      {quiz.title} ({quiz.duration})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={navigateToLearnModule}
            className="mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md block md:w-auto w-full"
          >
            Learn Module
          </button>
        </div>
      )}
    </div>
  );
};

export default ModuleDetails;
