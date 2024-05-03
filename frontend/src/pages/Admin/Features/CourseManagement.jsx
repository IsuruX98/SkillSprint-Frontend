import React, { useState } from "react";
import ViewCourses from "./CourseTabs/ViewCourses";
import AddCourse from "./CourseTabs/AddCourse";

const CourseManagement = () => {
  const [activeTab, setActiveTab] = useState("View Courses");

  const handleTabChange = (label) => {
    setActiveTab(label);
  };

  const tabs = [{ label: "View Courses" }, { label: "Add Course" }];

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
        return <ViewCourses />;
      case "Add Course":
        return <AddCourse />;
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
