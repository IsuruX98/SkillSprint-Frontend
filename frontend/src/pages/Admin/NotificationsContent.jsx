import React, { useState } from "react";

const NotificationsContent = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Notification",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus mauris euismod diam dictum, id dapibus mi dignissim.",
      read: false,
    },
    {
      id: 2,
      title: "Another Notification",
      content:
        "Sed sit amet nulla vel ipsum feugiat consectetur. Nulla facilisi. Integer ut eros id enim efficitur consectetur vel eget arcu.",
      read: false,
    },
    // Add more notifications as needed
  ]);

  const dismissNotification = (notificationId) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== notificationId)
    );
  };

  const markAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <div className="py-8 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Notifications</h2>
      {/* Notification list */}
      <div className="grid gap-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-md p-4 ${
              notification.read ? "opacity-50" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {notification.title}
            </h3>
            <p className="text-gray-600">{notification.content}</p>
            <div className="flex justify-end mt-2">
              {!notification.read && (
                <button
                  className="text-green-500 mr-2 hover:text-green-700 transition duration-300"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              )}
              <button
                className="text-red-500 hover:text-red-700 transition duration-300"
                onClick={() => dismissNotification(notification.id)}
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsContent;
