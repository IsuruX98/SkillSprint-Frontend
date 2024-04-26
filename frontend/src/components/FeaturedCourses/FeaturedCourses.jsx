import React from "react";

const courses = [
  {
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development.",
    imageUrl: "https://source.unsplash.com/random/800x600/?web-development",
    alt: "Course Image 1",
  },
  {
    title: "Python Programming Masterclass",
    description: "Master Python programming from scratch.",
    imageUrl: "https://source.unsplash.com/random/800x600/?python",
    alt: "Course Image 2",
  },
  {
    title: "Data Science Essentials",
    description: "Explore the essentials of data science.",
    imageUrl: "https://source.unsplash.com/random/800x600/?data-science",
    alt: "Course Image 3",
  },
  {
    title: "Machine Learning Basics",
    description: "Get started with the basics of machine learning.",
    imageUrl: "https://source.unsplash.com/random/800x600/?machine-learning",
    alt: "Course Image 4",
  },
  {
    title: "JavaScript for Beginners",
    description: "Begin your journey into JavaScript.",
    imageUrl: "https://source.unsplash.com/random/800x600/?javascript",
    alt: "Course Image 5",
  },
  {
    title: "React.js Crash Course",
    description: "Learn React.js in a single crash course.",
    imageUrl: "https://source.unsplash.com/random/800x600/?react",
    alt: "Course Image 6",
  },
];

const FeaturedCourses = () => {
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
            >
              <img
                src={course.imageUrl}
                alt={course.alt}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h4 className="text-dark text-lg font-semibold mb-2">
                {course.title}
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
