import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("course-enrollment/getAll");
        setEnrollments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setLoading(false);
        // Handle error
      }
    };

    fetchEnrollments();
  }, []);

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      try {
        setLoading(true);

        const userPromises = enrollments.map(async (enrollment) => {
          const userResponse = await axios.get(
            `users/getUser/${enrollment.userId}`
          );
          return {
            userId: enrollment.userId,
            userName: userResponse.data.userName,
            email: userResponse.data.email,
            mobile: userResponse.data.contactNo,
          };
        });
        const usersData = await Promise.all(userPromises);

        const coursePromises = enrollments.map(async (enrollment) => {
          const courseResponse = await axios.get(
            `course-controller/${enrollment.courseId}`
          );
          return {
            courseId: enrollment.courseId,
            courseName: courseResponse.data.courseName,
          };
        });
        const coursesData = await Promise.all(coursePromises);

        const userDetails = [];
        enrollments.forEach((enrollment, index) => {
          const userData = usersData.find(
            (user) => user.userId === enrollment.userId
          );
          const courseData = coursesData.find(
            (course) => course.courseId === enrollment.courseId
          );
          userDetails.push({
            id: enrollment.id,
            userName: userData.userName,
            email: userData.email,
            mobile: userData.mobile,
            courseName: courseData.courseName,
          });
        });

        setEnrollmentDetails(userDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enrollment details:", error);
        setLoading(false);
        // Handle error
      }
    };

    fetchEnrollmentDetails();
  }, [enrollments]);

  const openModal = (email) => {
    setSelectedUser(email);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sendMessage = () => {
    const subject = document.getElementById("emailSubject").value;
    const body = document.getElementById("emailBody").value;
    const mailtoLink = `mailto:${selectedUser}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    closeModal(); // Close modal after sending email
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">Enrollment Management</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full shadow-md rounded-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Course Name</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {enrollmentDetails.map((enrollment) => (
                <tr
                  key={enrollment.id}
                  className="border-t hover:bg-gray-100  text-center"
                >
                  <td className="p-3">{enrollment.userName}</td>
                  <td className="p-3">{enrollment.email}</td>
                  <td className="p-3">{enrollment.mobile}</td>
                  <td className="p-3">{enrollment.courseName}</td>
                  <td className="p-3 flex justify-center">
                    <button
                      className="bg-blue-500 text-sm text-white px-2 py-2 rounded-md shadow-md hover:bg-blue-600"
                      onClick={() => openModal(enrollment.email)}
                    >
                      Send a Mail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Compose Email
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="emailSubject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="emailSubject"
                  id="emailSubject"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 px-3 py-2"
                  placeholder="Enter subject..."
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="emailBody"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body
                </label>
                <textarea
                  id="emailBody"
                  name="emailBody"
                  rows="3"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-50 px-3 py-2"
                  placeholder="Enter message..."
                ></textarea>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row justify-end">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2 sm:mb-0 sm:mr-3"
                onClick={sendMessage}
              >
                Send
              </button>
              <button
                type="button"
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentManagement;
