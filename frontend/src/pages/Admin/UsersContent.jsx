import React, { useState } from "react";

const UserContent = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      mobile: "1234567890",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      role: "User",
      mobile: "9876543210",
    },
    // Add more user data as needed
  ]);

  const deleteUser = (userId) => {
    // Here you can prompt a confirmation modal before deletion
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="py-8 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Users</h2>
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        {/* Search bar */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search users"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Search
          </button>
        </div>
        {/* Action buttons */}
        <div className="mt-4 md:mt-0">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2 md:mb-0 hover:bg-blue-600 transition duration-300">
            Add User
          </button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300">
            Export
          </button>
        </div>
      </div>
      {/* User table */}
      <div className="overflow-x-auto">
        <table className="bg-white rounded-lg shadow w-full">
          <thead className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Mobile</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="py-3 px-6 text-left">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.role}</td>
                <td className="py-3 px-6 text-left">{user.mobile}</td>
                <td className="py-3 px-6 text-left">
                  {/* Update button */}
                  <button className="text-blue-500 mr-2 hover:text-blue-700 transition duration-300">
                    Update
                  </button>
                  {/* Delete button */}
                  <button
                    className="text-red-500 hover:text-red-700 transition duration-300"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserContent;
