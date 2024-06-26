import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineBell,
} from "react-icons/ai";
import AuthModal from "../AuthModel/AuthModel";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import UserProfileModal from "../UserProfileModal/UserProfileModal";
import NotificationModal from "../NotificationModal/NotificationModal";

const dummyNotifications = [
  {
    id: 1,
    message:
      "New message from John Doe: Hi there! I have a question about the course material. Can we discuss it sometime today?",
  },
  {
    id: 2,
    message:
      "Reminder: Your weekly quiz for 'Introduction to Data Science' is due tomorrow. Don't forget to complete it!",
  },
  {
    id: 3,
    message:
      "You have successfully completed the 'Python Programming for Beginners' course! Congratulations on your achievement!",
  },
  {
    id: 4,
    message:
      "Special Offer: Enroll now in our new course 'Machine Learning Fundamentals' and get 20% off!",
  },
  {
    id: 5,
    message:
      "Feedback Request: Please take a moment to share your thoughts on the course 'Web Development Essentials'. Your feedback helps us improve!",
  },
  {
    id: 6,
    message:
      "New Announcement: Join us for a live webinar on 'Advanced Algorithms' this Friday at 3:00 PM. Reserve your spot now!",
  },
  {
    id: 7,
    message:
      "Important Update: The deadline for project submissions in 'Data Analysis with Python' has been extended to next Monday. Take advantage of the extra time!",
  },
  {
    id: 8,
    message:
      "Upcoming Event: Don't miss the virtual career fair for IT professionals happening next week. Explore job opportunities with top companies!",
  },
  {
    id: 9,
    message:
      "Course Recommendation: Based on your interests, we suggest enrolling in the course 'Artificial Intelligence: Principles and Techniques'. Check it out now!",
  },
  {
    id: 10,
    message:
      "New Certificate Earned: Congratulations! You've earned a certificate in 'Machine Learning Foundations'. Share your achievement on LinkedIn!",
  },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin"; // Check if the current path is '/admin'
  const isInstructor = location.pathname === "/instructor"; // Check if the current path is '/instructor'
  const [nav, setNav] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Define the admin-specific dropdown menu items
  const adminDropdownItems = [
    { path: "/user-management", label: "User Management" },
    { path: "/course-management", label: "Course Management" },
    { path: "/notification-management", label: "Notification Management" },
    { path: "/payment-management", label: "Payment Management" },
    { path: "/enrollment-management", label: "Enrollment Management" },
  ];

  const instructorDropdownItems = [
    { path: "/course-management", label: "Course Management" },
    { path: "/enrollment-management", label: "Enrollment Management" },
    {
      path: "/learners-progress-management",
      label: "Learners Progress Management",
    },
  ];

  const defaultDropdownItems = [
    { path: "/courses", label: "Explore courses" },
    { path: "#", label: "Explore Degrees" },
    // Add any additional default dropdown items here
  ];

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLoginModal = () => {
    setShowLogin(true);
    setShowRegister(false); // Ensure register modal is closed
  };

  const handleRegisterModal = () => {
    setShowRegister(true);
    setShowLogin(false); // Ensure login modal is closed
  };

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowProfileModal(false);
    setShowNotificationModal(false);
  };

  return (
    <nav className="flex justify-between w-full shadow-sm py-4 lg:px-32 px-4 sticky top-0 z-[999] bg-white">
      {/* Logo */}
      <div className="cursor-pointer lg:hidden">
        <h1 className="text-2xl  text-black font-extrabold">
          {isAdmin ? "SkillSprint Admin" : "SkillSprint"}
        </h1>
      </div>

      {/* Main Navigation Links */}
      <div className="items-center hidden lg:flex text-black">
        <div className="flex items-center">
          <h3 className="font-extrabold text-black">
            <Link to="/" spy={true} smooth={true} duration={500}>
              <div className="cursor-pointer text-2xl">
                {isInstructor
                  ? "SkillSprint Instructor"
                  : isAdmin
                  ? "SkillSprint Admin"
                  : "SkillSprint"}
              </div>
            </Link>
          </h3>
        </div>
        <div className="flex-grow mx-4">
          {/* Search input */}
          {!(isInstructor || isAdmin) && (
            <div className="flex-grow mx-4">
              <input
                type="text"
                placeholder="What do you want to learn..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-1 border rounded-xl focus:outline-none focus:border-blue-500 w-64"
              />
            </div>
          )}
        </div>
        {!(isInstructor || isAdmin) && (
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              type="button"
              className="inline-flex justify-center w-full rounded-xl px-4 py-2 text-sm border font-medium focus:border-blue-500 lg:w-auto"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {isAdmin ? "Features" : "Explore more"}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div
                className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="py-1" role="none">
                  {defaultDropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Auth Links or User Profile Button */}
      <div className="items-center hidden gap-8 lg:flex text-white">
        {user ? (
          <>
            <button
              onClick={() => setShowProfileModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-500 shadow-sm border transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <AiOutlineUser />
              {user.user_Name}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLoginModal}
              className="flex items-center justify-center text-black"
            >
              Login
            </button>
            <button
              onClick={handleRegisterModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Join for Free
            </button>
          </>
        )}
      </div>

      {/* Login Modal */}
      <AuthModal isOpen={showLogin} onClose={handleCloseModal} mode="login" />

      {/* Register Modal */}
      <AuthModal
        isOpen={showRegister}
        onClose={handleCloseModal}
        mode="register"
      />

      {/* User Profile Modal */}
      {showProfileModal && (
        <UserProfileModal
          user={user}
          onClose={handleCloseModal}
          logout={logout}
        />
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setShowNotificationModal(false)}
        />
      )}

      {/* Mobile Navigation */}
      <div
        onClick={handleNav}
        className="flex items-center justify-center lg:hidden text-black"
      >
        <div className="">
          {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>
      </div>

      {/* Mobile Navigation Content */}
      <div
        className={
          !nav
            ? "fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray bg-white ease-in-out duration-500 lg:hidden"
            : "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray ease-in-out bg-white duration-500 lg:hidden"
        }
      >
        <h1 className="font-bold m-8 text-black">
          <Link
            to="home"
            onClick={() => {
              setNav(false);
            }}
            spy={true}
            smooth={true}
            duration={500}
          >
            <h1 className="text-2xl font-bold">
              {isAdmin ? "SkillSprint Admin" : "SkillSprint"}
            </h1>
          </Link>
        </h1>
        <ul className="p-4 mt-20">
          {/* Render the same navigation links as in large screen */}
          {(isAdmin
            ? adminDropdownItems
            : isInstructor
            ? instructorDropdownItems
            : defaultDropdownItems
          ).map((item) => (
            <li
              key={item.path}
              className="p-4 hover:bg-gray-100 hover:text-blue-500"
            >
              <Link
                to={item.path}
                onClick={() => {
                  setNav(false);
                }}
              >
                <div className="cursor-pointer">{item.label}</div>
              </Link>
            </li>
          ))}
        </ul>
        {/* Sign In and Sign Up buttons */}
        <div className="flex flex-col mx-5">
          {user ? (
            <button
              onClick={() => setShowProfileModal(true)}
              className="inline-flex mt-8 items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-500 border shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <AiOutlineUser />
              {user.user_Name}
            </button>
          ) : (
            <>
              <button
                onClick={handleLoginModal}
                className="mt-4 py-2 px-4 border rounded-md text-sm font-medium text-blue-500 hover:bg-blue-100 hover:text-blue-700"
              >
                Sign In
              </button>
              <button
                onClick={handleRegisterModal}
                className="mt-4 py-2 px-4 border rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
              >
                Sign Up for Free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
