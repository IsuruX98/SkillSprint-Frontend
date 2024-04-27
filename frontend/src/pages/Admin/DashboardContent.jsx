import React from "react";
import {
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiBell,
  FiActivity,
} from "react-icons/fi";
import Chart from "react-apexcharts";

const DashboardContent = () => {
  const userCount = 1000;
  const courseCount = 50;
  const enrollmentCount = 2000;
  const activeUsers = 750;

  const donationChartData = {
    series: [500, 200, 300],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Donation A", "Donation B", "Donation C"],
    },
  };

  const sitePerformanceData = {
    series: [
      {
        name: "Performance",
        data: [90, 85, 95, 80, 70],
      },
    ],
    options: {
      chart: {
        height: 250,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
      yaxis: {
        title: {
          text: "Performance (%)",
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8 px-4 md:px-10">
      <div className="bg-white rounded-lg shadow-md p-4">
        <FiUsers className="text-blue-500 mb-2" size={24} />
        <h3 className="text-lg font-semibold mb-2">Users</h3>
        <p className="text-gray-600">{userCount}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <FiBookOpen className="text-green-500 mb-2" size={24} />
        <h3 className="text-lg font-semibold mb-2">Courses</h3>
        <p className="text-gray-600">{courseCount}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <FiDollarSign className="text-yellow-500 mb-2" size={24} />
        <h3 className="text-lg font-semibold mb-2">Enrollments</h3>
        <p className="text-gray-600">{enrollmentCount}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <FiActivity className="text-purple-500 mb-2" size={24} />
        <h3 className="text-lg font-semibold mb-2">Active Users</h3>
        <p className="text-gray-600">{activeUsers}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 col-span-full lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Donation Chart</h2>
        <Chart
          options={donationChartData.options}
          series={donationChartData.series}
          type="donut"
          height={250}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 col-span-full lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Site Performance</h2>
        <Chart
          options={sitePerformanceData.options}
          series={sitePerformanceData.series}
          type="line"
          height={250}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 col-span-full">
        <FiBell className="text-red-500 mb-2" size={24} />
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <ul className="divide-y divide-gray-200">
          <li className="py-2">
            <p className="text-sm text-gray-600">You have a new message</p>
          </li>
          <li className="py-2">
            <p className="text-sm text-gray-600">New user registered</p>
          </li>
          <li className="py-2">
            <p className="text-sm text-gray-600">Course enrollment updated</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardContent;
