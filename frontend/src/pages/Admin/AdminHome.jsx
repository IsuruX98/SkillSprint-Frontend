import React, { useState } from "react";
import UserManagement from "./Features/UserManagement";
import CourseManagement from "./Features/CourseManagement";
import NotificationManagement from "./Features/NotificationManagement";
import PaymentManagement from "./Features/PaymentManagement";
import EnrollmentManagement from "./Features/EnrollmentManagement";

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState("User Management");

  const handleTabChange = (label) => {
    setActiveTab(label);
  };

  const adminDropdownItems = [
    { path: "/user-management", label: "User Management" },
    { path: "/course-management", label: "Course Management" },
    { path: "/notification-management", label: "Notification Management" },
    { path: "/payment-management", label: "Payment Management" },
    { path: "/enrollment-management", label: "Enrollment Management" },
  ];

  const renderTabs = () => {
    return adminDropdownItems.map((item) => (
      <button
        key={item.label}
        onClick={() => handleTabChange(item.label)}
        className={`${
          activeTab === item.label
            ? "bg-blue-500 text-white"
            : " hover:bg-gray-100 hover:text-blue-500"
        } px-4 py-2 rounded-lg border`}
      >
        {item.label}
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
      case "Enrollment Management":
        return <EnrollmentManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="lg:px-32 px-4 py-8 min-h-screen">
      <div className="flex flex-wrap justify-center">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 w-full">
          {renderTabs()}
        </div>
      </div>
      <div className="p-4">{renderContent()}</div>
    </div>
  );
};

export default AdminHome;
