import React, { useState } from "react";
import axios from "../../../../api/axios";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../../notifications/notifications";
import { useAuth } from "../../../../context/authContext";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const AddCourse = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    categoryId: "",
    description: "",
    price: "",
    level: "",
    skillgained: [],
    instructorId: user.userId,
    file: null, // State to hold the file object
    filePreview: null, // State to hold the file preview URL
  });

  console.log(courseDetails.file);

  const [skillInput, setSkillInput] = useState(""); // State for temporary skill input

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      const filePreview = URL.createObjectURL(file); // Create preview URL
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        [name]: file,
        filePreview,
      }));
    } else {
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
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
      courseDetails.skillgained.length === 0 ||
      !courseDetails.file
    ) {
      ErrorNotification("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("courseName", courseDetails.courseName);
      formData.append("categoryId", courseDetails.categoryId);
      formData.append("description", courseDetails.description);
      formData.append("price", courseDetails.price);
      formData.append("level", courseDetails.level);
      formData.append("instructorId", courseDetails.instructorId);
      formData.append("file", courseDetails.file);
      courseDetails.skillgained.forEach((skill, index) => {
        formData.append(`skillgained[${index}]`, skill);
      });

      // Send form data to the API
      await axios.post("course-controller", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
        instructorId: user.userId,
        file: null,
      });
    } catch (error) {
      console.error("Error adding course:", error);
      ErrorNotification("Error adding course. Please try again later.");
    } finally {
      setLoading(false);
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
              Price in $
            </label>
            <input
              type="text"
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
            <label htmlFor="file" className="font-semibold">
              File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {courseDetails.filePreview && (
              <img
                src={courseDetails.filePreview}
                alt="File Preview"
                className="mt-2 max-w-full"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!user}
        >
          Submit
        </button>
        {loading && <LoadingSpinner />}
      </form>
    </div>
  );
};

export default AddCourse;
