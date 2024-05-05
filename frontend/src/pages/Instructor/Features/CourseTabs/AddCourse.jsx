import React, { useState } from "react";
import axios from "../../../../api/axios";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../../notifications/notifications";

const AddCourse = () => {
  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    categoryId: "",
    description: "",
    price: 0,
    level: "",
    skillgained: [],
    instructorId: "77654467898654579", // Static instructor ID
  });

  const [skillInput, setSkillInput] = useState(""); // State for temporary skill input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        skillgained: [...prevDetails.skillgained, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !courseDetails.courseName ||
      !courseDetails.description ||
      !courseDetails.price ||
      !courseDetails.level ||
      courseDetails.skillgained.length === 0
    ) {
      ErrorNotification("Please fill in all fields.");
      return;
    }

    try {
      // Send form data to the API
      await axios.post("course-controller", courseDetails);
      SuccessNotification("Course added successfully!");
      console.log("Course added successfully!");
      // Reset form fields
      setCourseDetails({
        courseName: "",
        categoryId: "",
        description: "",
        price: 0,
        level: "",
        skillgained: [],
        instructorId: "77654467898654579",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      ErrorNotification("Error adding course. Please try again later.");
    }
  };

  const handleRemoveSkill = (index) => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      skillgained: prevDetails.skillgained.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="courseName" className="font-semibold">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={courseDetails.courseName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={courseDetails.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="font-semibold">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={courseDetails.price}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="level" className="font-semibold">
              Level
            </label>
            <select
              id="level"
              name="level"
              value={courseDetails.level}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="skillsGained" className="font-semibold">
              Skills Gained
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="skillsGained"
                name="skillsGained"
                value={skillInput}
                onChange={handleSkillInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 flex-grow mr-2"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {courseDetails.skillgained.map((skill, index) => (
                <li key={index}>
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <label htmlFor="courseName" className="font-semibold">
              Category ID
            </label>
            <input
              type="text"
              id="categoryId"
              name="categoryId"
              value={courseDetails.categoryId}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
          onSubmit={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
