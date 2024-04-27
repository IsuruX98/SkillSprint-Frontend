import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BiHome,
  BiUser,
  BiBell,
  BiLogOut,
  BiBook,
  BiMenu,
} from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import UserContent from "./Admin/UsersContent";
import DashboardContent from "./Admin/DashboardContent";
import CoursesContent from "./Admin/CoursesContent";
import NotificationsContent from "./Admin/NotificationsContent";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    toggleMenu();
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "dashboard":
        return <DashboardContent />;
      case "users":
        return <UserContent />;
      case "courses":
        return <CoursesContent />;
      case "notifications":
        return <NotificationsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      {isMenuOpen && ( // Conditional rendering for mobile menu
        <div className="fixed inset-0 z-50 flex md:hidden bg-gray-600 bg-opacity-50">
          <div className="flex flex-col w-56 bg-white shadow-lg">
            <div className="flex justify-between px-4 py-8">
              <h1 className="text-xl font-bold text-blue-500">SkillSprint</h1>
              <button onClick={toggleMenu}>
                <AiOutlineClose className="text-black text-" />
              </button>
            </div>
            <ul className="flex flex-col py-4">
              <li>
                <Link
                  to="#"
                  className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                    selectedMenuItem === "dashboard" && "font-medium"
                  }`}
                  onClick={() => handleMenuItemClick("dashboard")}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                    <BiHome />
                  </span>
                  <span className="text-sm">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                    selectedMenuItem === "users" && "font-medium"
                  }`}
                  onClick={() => handleMenuItemClick("users")}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                    <BiUser />
                  </span>
                  <span className="text-sm">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                    selectedMenuItem === "courses" && "font-medium"
                  }`}
                  onClick={() => handleMenuItemClick("courses")}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                    <BiBook />
                  </span>
                  <span className="text-sm">Courses</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                    selectedMenuItem === "notifications" && "font-medium"
                  }`}
                  onClick={() => handleMenuItemClick("notifications")}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                    <BiBell />
                  </span>
                  <span className="text-sm">Notifications</span>
                  <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                    5
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                    selectedMenuItem === "logout" && "font-medium"
                  }`}
                  onClick={() => {
                    alert("logout...");
                  }}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                    <BiLogOut />
                  </span>
                  <span className="text-sm">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="md:flex flex-col w-56 bg-white shadow-lg hidden">
        <div className="flex items-center px-4 py-8">
          <h1 className="text-xl font-bold text-blue-500">SkillSprint</h1>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link
              to="#"
              className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                selectedMenuItem === "dashboard" && "font-medium"
              }`}
              onClick={() => handleMenuItemClick("dashboard")}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                <BiHome />
              </span>
              <span className="text-sm">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                selectedMenuItem === "users" && "font-medium"
              }`}
              onClick={() => handleMenuItemClick("users")}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                <BiUser />
              </span>
              <span className="text-sm">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                selectedMenuItem === "courses" && "font-medium"
              }`}
              onClick={() => handleMenuItemClick("courses")}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                <BiBook />
              </span>
              <span className="text-sm">Courses</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                selectedMenuItem === "notifications" && "font-medium"
              }`}
              onClick={() => handleMenuItemClick("notifications")}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                <BiBell />
              </span>
              <span className="text-sm">Notifications</span>
              <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                5
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={`flex flex-row items-center h-12 text-gray-700 hover:text-gray-900 hover:bg-gray-200 ${
                selectedMenuItem === "logout" && "font-medium"
              }`}
              onClick={() => {
                alert("logout...");
              }}
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-500">
                <BiLogOut />
              </span>
              <span className="text-sm">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1">{renderContent()}</div>
      {/* Floating Menu Button */}
      <div className="absolute top-4 right-4 md:hidden block">
        <button
          className="bg-gray-100 text-black rounded-full p-3 shadow-xl"
          onClick={toggleMenu}
        >
          <BiMenu size={24} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
