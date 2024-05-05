import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log("Submitted:", courseDetails);
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
            <input
              type="text"
              id="skillsGained"
              name="skillsGained"
              value={courseDetails.skillsGained}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
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
