import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Pagination from "../Pagination/Pagination";

const NotificationModal = ({ notifications, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const markAsRead = (notificationId) => {
    // Implement logic to mark the notification as read
    console.log(`Notification with ID ${notificationId} marked as read.`);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh] mx-10">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-black" />
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {currentNotifications.map((notification) => (
            <li key={notification.id} className="py-3">
              <div className="flex justify-between gap-10 items-center">
                <span className="text-sm break-words">
                  {notification.message}
                </span>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  Mark as Read
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(notifications.length / notificationsPerPage)}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default NotificationModal;
