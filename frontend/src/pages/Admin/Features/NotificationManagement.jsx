import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination/Pagination";

const NotificationManagement = () => {
  const initialNotifications = [
    {
      id: 1,
      title: "New Course Available",
      content:
        "A new course on 'Machine Learning Basics' is now available. Enroll now!",
      read: false,
    },
    {
      id: 2,
      title: "Webinar Reminder",
      content:
        "Don't forget about the live webinar on 'Introduction to Data Science' tomorrow.",
      read: true,
    },
    {
      id: 3,
      title: "Upgrade Your Skills",
      content:
        "Enhance your programming skills with our latest course 'Advanced JavaScript'.",
      read: false,
    },
    {
      id: 4,
      title: "Feedback Request",
      content:
        "Please take a moment to provide feedback on your recent course experience.",
      read: false,
    },
    {
      id: 5,
      title: "Special Offer",
      content: "Limited time offer! Get 50% off on all courses this weekend.",
      read: true,
    },
    {
      id: 6,
      title: "New Course: Python for Beginners",
      content:
        "Explore the fundamentals of Python programming with our new course!",
      read: false,
    },
    {
      id: 7,
      title: "Weekly Newsletter",
      content:
        "Check out our weekly newsletter for the latest updates and insights.",
      read: true,
    },
    {
      id: 8,
      title: "Data Science Bootcamp",
      content:
        "Join our intensive Data Science Bootcamp and kickstart your career!",
      read: false,
    },
    {
      id: 9,
      title: "Job Opportunities",
      content:
        "Discover new job opportunities in the tech industry. Apply now!",
      read: false,
    },
    {
      id: 10,
      title: "React Workshop",
      content:
        "Join our React Workshop to learn advanced techniques and best practices.",
      read: true,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5); // Number of notifications per page
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset current page when search term changes
  };

  // Filter notifications based on search term in title or content
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm) ||
      notification.content.toLowerCase().includes(searchTerm)
  );

  // Calculate total pages for pagination
  const totalPages = Math.ceil(
    filteredNotifications.length / notificationsPerPage
  );

  // Pagination logic to slice the filtered notifications array based on current page
  useEffect(() => {
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification =
      indexOfLastNotification - notificationsPerPage;
    const currentNotifications = filteredNotifications.slice(
      indexOfFirstNotification,
      indexOfLastNotification
    );
    setDisplayedNotifications(currentNotifications);
  }, [currentPage, filteredNotifications, notificationsPerPage]);

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Notification Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or content"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl"
        />
      </div>
      <div>
        {displayedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl shadow-md mb-4 p-4 ${
              notification.read ? "opacity-50" : ""
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{notification.title}</h3>
            <p className="text-gray-700">{notification.content}</p>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="mt-4"
      />
    </div>
  );
};

export default NotificationManagement;
