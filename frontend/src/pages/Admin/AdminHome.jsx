import React, { useState } from "react";
import UserManagement from "./Features/UserManagement";
import CourseManagement from "./Features/CourseManagement";
import NotificationManagement from "./Features/NotificationManagement";
import PaymentManagement from "./Features/PaymentManagement";

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState("User Management");

  const handleTabChange = (label) => {
    setActiveTab(label);
  };

  const tabs = [
    "User Management",
    "Course Management",
    "Notification Management",
    "Payment Management",
  ];

  const renderTabs = () => {
    return tabs.map((label) => (
      <button
        key={label}
        onClick={() => handleTabChange(label)}
        className={`${
          activeTab === label
            ? "bg-blue-500 text-white"
            : " hover:bg-gray-100 hover:text-blue-500"
        } px-4 py-2 rounded-lg border`}
      >
        {label}
      </button>
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "User Management":
        return <UserManagement />;
      case "Course Management":
        return <CourseManagement />;
      case "Notification Management":
        return <NotificationManagement />;
      case "Payment Management":
        return <PaymentManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="lg:px-32 px-4 py-8 min-h-screen">
      <div className="flex flex-wrap justify-center">
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-2 w-full">
          {renderTabs()}
        </div>
      </div>
      <div className="py-5">{renderContent()}</div>
    </div>
  );
};

export default AdminHome;
