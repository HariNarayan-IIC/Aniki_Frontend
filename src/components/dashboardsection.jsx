import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaRoute, FaComments, FaChartLine, FaBook, FaCalendarAlt } from 'react-icons/fa';

const items = [
  { id: 'dashboard', name: 'Dashboard', icon: <FaTachometerAlt />, content: 'Welcome to the Dashboard!' },
  { id: 'roadmaps', name: 'Roadmaps', icon: <FaRoute />, content: 'Explore your learning roadmap.' },
  { id: 'chatrooms', name: 'Chatrooms', icon: <FaComments />, content: 'Join the conversation in chatrooms.' },
  { id: 'progress', name: 'Progress', icon: <FaChartLine />, content: 'Track your progress here.' },
  { id: 'resources', name: 'Resources', icon: <FaBook />, content: 'Access your learning resources.' },
  { id: 'schedule', name: 'Schedule', icon: <FaCalendarAlt />, content: 'View your schedule and deadlines.' },
];

const cardData = {
  dashboard: [
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis'],
    ['Overview', 'Summary of key metrics'],
    ['Performance', 'Track your daily performance'],
    ['Analytics', 'Detailed data analysis']
  ],
  roadmaps: [
    ['Frontend', 'Learn HTML, CSS, and JS'],
    ['Backend', 'Master Node.js and APIs'],
    ['DevOps', 'Understand CI/CD pipelines'],
  ],
  chatrooms: [
    ['General', 'Open discussion forum'],
    ['Tech Support', 'Get help with your queries'],
    ['Off-Topic', 'Casual conversations'],
  ],
  progress: [
    ['Daily Goals', 'Track daily achievements'],
    ['Weekly Review', 'Analyze weekly results'],
    ['Milestones', 'Set and complete milestones'],
  ],
  resources: [
    ['E-books', 'Explore recommended e-books'],
    ['Tutorials', 'Hands-on video tutorials'],
    ['Cheat Sheets', 'Quick reference guides'],
  ],
  schedule: [
    ['Upcoming Events', 'Check out upcoming activities'],
    ['Deadlines', 'Manage your task deadlines'],
    ['Reminders', 'Never miss an important date'],
  ],
};

const Dashboardsection = () => {
  const [selected, setSelected] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectedItem = items.find((item) => item.id === selected);
  const selectedCards = cardData[selected] || [];

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} min-h-[calc(100vh-74px)] bg-[#f3ffd8]`}> 
      <div
        className={`${
          isMobile ? 'flex justify-around w-full border-b bg-white border-gray-300' : 'w-64 border-r border-gray-300 flex flex-col p-4 bg-white min-h-[calc(100vh-74px)] overflow-y-auto'
        }`}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center cursor-pointer p-3 mb-2 rounded-lg transition ${
              selected === item.id ? 'bg-[#a7e9af] font-bold' : 'hover:bg-gray-200'
            } ${isMobile ? 'justify-center' : ''}`}
            onClick={() => setSelected(item.id)}
          >
            <span className="text-lg mr-2">{item.icon}</span>
            {!isMobile && <span>{item.name}</span>}
          </div>
        ))}
      </div>

      <div className="flex-1 p-6 min-h-[calc(100vh-74px)] overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">{selectedItem?.name}</h2>
        <p className="text-gray-600 mb-6">{selectedItem?.content}</p>

        <div className="h-[calc(100vh-244px)] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedCards.map(([title, description], index) => (
              <div
                className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
                key={index}
              >
                <h3 className="text-lg font-bold text-black mb-2 bg-white p-2 rounded-md">{title}</h3>
                <p className="text-white bg-[#1db954] p-2 rounded-md">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardsection;
