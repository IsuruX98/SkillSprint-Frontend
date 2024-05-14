import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
  const [loading, setLoading] = useState(false);

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
        const userDetails = [];
        for (const enrollment of enrollments) {
          const userResponse = await axios.get(
            `users/getUser/${enrollment.userId}`
          );
          const courseResponse = await axios.get(
            `course-controller/${enrollment.courseId}`
          );
          userDetails.push({
            id: enrollment.id,
            userName: userResponse.data.userName,
            email: userResponse.data.email,
            mobile: userResponse.data.contactNo,
            courseName: courseResponse.data.courseName,
          });
        }
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

  const sendMessage = (userName) => {
    // Logic to send a message to a user
    console.log(`Sending message to ${userName}...`);
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
                      onClick={() => sendMessage(enrollment.userName)}
                    >
                      Send Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrollmentManagement;
