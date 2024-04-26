import React from "react";

const courses = [
  {
    title: "Course Title 1",
    description: "Learn about Subject 1",
    imageUrl: "https://source.unsplash.com/random/800x600?course1",
    alt: "Course Image 1",
  },
  {
    title: "Course Title 2",
    description: "Explore Subject 2",
    imageUrl: "https://source.unsplash.com/random/800x600?course2",
    alt: "Course Image 2",
  },
  {
    title: "Course Title 3",
    description: "Master Subject 3",
    imageUrl: "https://source.unsplash.com/random/800x600?course3",
    alt: "Course Image 3",
  },
  {
    title: "Course Title 4",
    description: "Advance in Subject 4",
    imageUrl: "https://source.unsplash.com/random/800x600?course4",
    alt: "Course Image 4",
  },
  {
    title: "Course Title 5",
    description: "Specialize in Subject 5",
    imageUrl: "https://source.unsplash.com/random/800x600?course5",
    alt: "Course Image 5",
  },
  {
    title: "Course Title 6",
    description: "Dive deep into Subject 6",
    imageUrl: "https://source.unsplash.com/random/800x600?course6",
    alt: "Course Image 6",
  },
];

const FeaturedCourses = () => {
  return (
    <div id="Featured" className="px-4 py-8 lg:px-24 lg:py-12">
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
