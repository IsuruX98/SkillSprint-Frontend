import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import { useAuth } from "../../../context/authContext";
import axios from "../../../api/axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../notifications/notifications";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("users/getAllUsers");
        setUsers(response.data); // Assuming response.data is an array of user objects
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
        // Handle error, show error notification, etc.
      }
    };

    fetchUsers();
  }, []);

  // Pagination logic to slice the users array based on current page
  useEffect(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    setDisplayedUsers(currentUsers);
  }, [currentPage, users, usersPerPage]);

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to delete a user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.userId !== id));
  };

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <div className="flex justify-between items-center mb-4 ">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-xl mr-2 w-full"
        />
        
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user.userId} className="border-t">
                  <td className="p-3">{user.userName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.contactNo}</td>
                  <td className="p-3">{user.userType}</td>
                  <td className="p-3 flex justify-center">
                    <button
                      onClick={() => deleteUser(user.userId)}
                      className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserManagement;
