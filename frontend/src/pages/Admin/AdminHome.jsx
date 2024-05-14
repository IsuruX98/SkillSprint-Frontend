import React, { useEffect, useState } from "react";
import UserManagement from "./Features/UserManagement";
import CourseManagement from "./Features/CourseManagement";
import PaymentManagement from "./Features/PaymentManagement";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { ErrorNotification } from "../../notifications/notifications";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState("Course Management");
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
      ErrorNotification("Please log in to access Admin Dashboard.");
    }
  }, [authLoading, user, navigate]);

  const handleTabChange = (label) => {
    setActiveTab(label);
  };

  const tabs = ["Course Management", "Payment Management", "User Management"];

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
      case "Course Management":
        return <CourseManagement />;
      case "Payment Management":
        return <PaymentManagement />;
      case "User Management":
        return <UserManagement />;
      default:
        return null;
    }
  };

  // if (authLoading || !user) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="lg:px-32 px-4 py-8 min-h-screen">
      <div className="flex flex-wrap justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {renderTabs()}
        </div>
      </div>
      <div className="py-5">{renderContent()}</div>
    </div>
  );
};

export default AdminHome;
