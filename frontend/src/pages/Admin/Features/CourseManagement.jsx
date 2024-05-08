import React, { useState } from "react";
import Courses from "./CourseTabs/Courses";
import CourseDetails from "./CourseTabs/CourseDetails";

const CourseManagement = () => {
  const [activeTab, setActiveTab] = useState("View Courses");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleTabChange = (label) => {
    setActiveTab(label);
  };

  const tabs = [{ label: "View Courses" }, { label: "Course Details" }];

  const renderTabs = () => {
    return tabs.map((tab) => (
      <button
        key={tab.label}
        onClick={() => handleTabChange(tab.label)}
        className={`${
          activeTab === tab.label
            ? "bg-blue-500 text-white"
            : " hover:bg-gray-100 hover:text-blue-500"
        } px-4 py-2 rounded-lg border`}
      >
        {tab.label}
      </button>
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "View Courses":
        return (
          <Courses
            handleTabChange={handleTabChange}
            setSelectedCourse={setSelectedCourse}
          />
        );
      case "Course Details":
        return <CourseDetails course={selectedCourse} />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap justify-center">
        <div className="grid md:grid-cols-2 gap-2 w-full">{renderTabs()}</div>
      </div>
      <div className="py-5">{renderContent()}</div>
    </div>
  );
};

export default CourseManagement;
