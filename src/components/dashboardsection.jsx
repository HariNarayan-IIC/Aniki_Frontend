import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Card } from "./ui/card";

const Dashboardsection = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-lime-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg h-full duration-300`}
      >
        <div className="p-4">
          <FaBars
            onClick={toggleSidebar}
            className="cursor-pointer text-xl mb-4"
          />
          {sidebarOpen && <h2 className="text-lg font-semibold">Aniki</h2>}
        </div>
        <div className="mt-4 space-y-4">
          {sidebarOpen ? (
            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-100 rounded">My Courses</li>
              <li className="p-2 hover:bg-gray-100 rounded">Roadmaps</li>
              <li className="p-2 hover:bg-gray-100 rounded">Chatrooms</li>
              <li className="p-2 hover:bg-gray-100 rounded">Progress</li>
              <li className="p-2 hover:bg-gray-100 rounded">Resources</li>
              <li className="p-2 hover:bg-gray-100 rounded">Schedule</li>
            </ul>
          ) : (
            <div className="space-y-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome back, User</h1>
        <p className="mb-8">Continue your learning journey</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Course Cards */}
          <Card className="p-6 bg-green-100">
            <h3 className="font-bold">Introduction to Machine Learning</h3>
            <p className="text-sm mt-2">Learn the fundamentals of Data Science</p>
            <div className="mt-4">
              <p className="text-sm font-semibold">Progress: 65%</p>
              <div className="bg-gray-300 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-green-100">
            <h3 className="font-bold">Advanced Web Development</h3>
            <p className="text-sm mt-2">Master modern web development techniques</p>
            <div className="mt-4">
              <p className="text-sm font-semibold">Progress: 42%</p>
              <div className="bg-gray-300 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-black text-white">
            <h3 className="font-bold">Data Science Chatroom</h3>
            <p className="text-sm">28 participants</p>
            <p className="text-sm mt-4">Jun 7, 02:23 PM</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboardsection;
