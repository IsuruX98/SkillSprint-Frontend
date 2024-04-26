import React from "react";
import {
  FiCode,
  FiLayout,
  FiBriefcase,
  FiGlobe,
  FiBookOpen,
  FiSmile,
} from "react-icons/fi";

const categories = [
  {
    name: "Programming",
    icon: <FiCode />,
    description:
      "Learn programming languages and frameworks with expert instructors.",
  },
  {
    name: "Design",
    icon: <FiLayout />,
    description:
      "Unlock your creativity with courses on graphic design, UX/UI, and more.",
  },
  {
    name: "Business",
    icon: <FiBriefcase />,
    description:
      "Master essential business skills such as marketing, finance, and management.",
  },
  {
    name: "Language",
    icon: <FiGlobe />,
    description:
      "Explore new cultures and communicate fluently in foreign languages.",
  },
  {
    name: "Personal Development",
    icon: <FiBookOpen />,
    description:
      "Enhance your personal and professional growth with self-improvement courses.",
  },
  {
    name: "Lifestyle",
    icon: <FiSmile />,
    description:
      "Discover hobbies, fitness routines, and lifestyle tips to live your best life.",
  },
];

const Services = () => {
  return (
    <div className="pb-20 pt-32 lg:px-32 px-12 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-blue-500 text-lg font-semibold mb-2 block">
            Our Services
          </span>
          <h2 className="text-dark text-3xl font-bold mb-4 sm:text-4xl md:text-5xl">
            Explore Our Courses
          </h2>
          <p className="text-body-color text-base">
            Choose from our range of courses tailored to meet your learning
            goals.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full">
                  {category.icon}
                </div>
                <h4 className="text-dark text-lg font-semibold">
                  {category.name}
                </h4>
              </div>
              <p className="text-body-color text-center">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
