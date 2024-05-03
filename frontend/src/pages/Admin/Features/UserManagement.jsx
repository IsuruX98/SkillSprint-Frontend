import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination/Pagination";

const UserManagement = () => {
  const initialUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      mobile: "1234567890",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      mobile: "0987654321",
      role: "User",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      mobile: "9876543210",
      role: "User",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      mobile: "4567890123",
      role: "User",
    },
    {
      id: 5,
      name: "Eva White",
      email: "eva@example.com",
      mobile: "7890123456",
      role: "User",
    },
    {
      id: 6,
      name: "Michael Clark",
      email: "michael@example.com",
      mobile: "5678901234",
      role: "User",
    },
    {
      id: 7,
      name: "Sarah Lee",
      email: "sarah@example.com",
      mobile: "2345678901",
      role: "User",
    },
    {
      id: 8,
      name: "David Wilson",
      email: "david@example.com",
      mobile: "9012345678",
      role: "User",
    },
    {
      id: 9,
      name: "Emily Taylor",
      email: "emily@example.com",
      mobile: "3456789012",
      role: "User",
    },
    {
      id: 10,
      name: "Chris Harris",
      email: "chris@example.com",
      mobile: "6789012345",
      role: "User",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate total pages for pagination
  const totalPages = Math.ceil(users.length / usersPerPage);

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
    setUsers(users.filter((user) => user.id !== id));
  };

  // Function to update user information (dummy function)
  const updateUser = (id) => {
    alert(`Update user with ID ${id}`);
  };

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-xl mr-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.mobile}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex justify-end">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateUser(user.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserManagement;
