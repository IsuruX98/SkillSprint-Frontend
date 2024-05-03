import React, { useState } from "react";

const AddCourse = () => {
  const [courseDetails, setCourseDetails] = useState({
    id: 0,
    title: "",
    description: "",
    rating: 0,
    level: "",
    price: 0,
    duration: "",
    skillsGained: [],
    modules: [],
  });

  const [newModule, setNewModule] = useState({
    id: 0,
    title: "",
    videos: [],
    readings: [],
    quizzes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleLevelChange = (e) => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      level: e.target.value,
    }));
  };

  const handleModuleChange = (e) => {
    const { name, value } = e.target;
    setNewModule((prevModule) => ({
      ...prevModule,
      [name]: value,
    }));
  };

  const addModule = () => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      modules: [
        ...prevDetails.modules,
        { ...newModule, id: prevDetails.modules.length + 1 },
      ],
    }));
    setNewModule({
      id: 0,
      title: "",
      videos: [],
      readings: [],
      quizzes: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log("Submitted:", courseDetails);
    // Reset form fields
    setCourseDetails({
      id: 0,
      title: "",
      description: "",
      rating: 0,
      level: "",
      price: 0,
      duration: "",
      skillsGained: [],
      modules: [],
    });
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={courseDetails.title}
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
            <label htmlFor="rating" className="font-semibold">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={courseDetails.rating}
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
              onChange={handleLevelChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
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
            <label htmlFor="duration" className="font-semibold">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={courseDetails.duration}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
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
        <div className="flex flex-col">
          <label htmlFor="modules" className="font-semibold">
            Modules
          </label>
          <div className="space-y-2">
            {courseDetails.modules.map((module) => (
              <div key={module.id} className="bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-semibold">{module.title}</h3>
                {/* Add input fields for module details */}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-2">Add New Module</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Module Title"
                name="title"
                value={newModule.title}
                onChange={handleModuleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addModule}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
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
