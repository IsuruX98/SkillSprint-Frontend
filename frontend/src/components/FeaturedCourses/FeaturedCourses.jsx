import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  console.log(courses);

  // Function to fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("course-controller/all-approved/");
        setCourses(response.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        // Handle error, show error notification, etc.
      }
    };

    fetchCourses();
  }, []);

  // Function to handle navigation to details page
  const handleDetailsNavigation = (course) => {
    navigate("/details", { state: { course } }); // Navigate to details page with course object
  };

  return (
    <div id="Featured" className="pb-20 pt-32 lg:px-32 px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-blue-500 text-lg font-semibold mb-2 block">
            Featured Courses
          </span>
          <h2 className="text-dark text-3xl font-bold mb-4 sm:text-4xl md:text-5xl">
            Enhance Your Skills with Our Courses
          </h2>
          <p className="text-body-color text-base">
            Explore our featured courses tailored to meet your learning needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
              onClick={() => handleDetailsNavigation(course)}
            >
              <img
                src={course.coverImgUrl}
                alt={course.alt}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h4 className="text-dark text-lg font-semibold mb-2">
                {course.courseName}
              </h4>
              <p className="text-body-color">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
