import React, { useState } from 'react';
import { FaBars, FaTimes, FaMap, FaComments, FaBookOpen, FaUser, FaPlus, FaSignOutAlt } from 'react-icons/fa';

// Helper for consistent pastel color
function getRandomColor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 55%)`;
}

// Dummy data for cards
const communitiesJoined = [
  { name: "Data Science Enthusiasts", members: 120, desc: "A place for DS lovers" },
  { name: "Web Dev Masters", members: 80, desc: "Advanced web dev discussions" },
  { name: "Cybersecurity Learners", members: 50, desc: "Learn and share about security" },
];

const roadmapsFollowed = [
  { title: "Data Science Path", desc: "Your journey to mastering Data Science", level: "Intermediate", duration: "6 months" },
  { title: "Full Stack Web Development", desc: "From HTML to advanced backend", level: "Beginner to Pro", duration: "8 months" },
  { title: "Cybersecurity Essentials", desc: "Start your cybersecurity career", level: "Beginner", duration: "4 months" },
];

const resourcesViewed = [
  { title: "Python for Beginners", type: "Course", desc: "Kickstart your Python journey", duration: "12 hours", author: "John Doe" },
  { title: "React Documentation", type: "Docs", desc: "Official React docs", duration: "Ongoing", author: "Meta Team" },
  { title: "Linux Command Cheat Sheet", type: "Guide", desc: "Handy Linux commands", duration: "Quick Reference", author: "CLI Masters" },
];

const DashboardSection = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [profileData] = useState({
    username: 'Vaibhav',
    firstName: 'Vaibhav',
    lastName: 'Kumar',
    email: 'vaibhav.kumar2023@iic.ac.in',
  });

  const ProfilePopup = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(246,248,252,0.85)' }}>
      <div className="relative bg-white rounded-2xl shadow-xl max-w-xs w-full px-6 pt-6 pb-4 flex flex-col items-center" style={{ borderRadius: '24px', minWidth: 340 }}>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setActiveTab('Dashboard')}>
          <FaTimes size={22} />
        </button>

        <div
  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold mb-3 cursor-pointer relative"
  style={{ background: getRandomColor(profileData.username), color: "white", border: "4px solid #f6f8fc" }}
  onClick={() => alert('Avatar clicked! Implement upload/change logic here.')}
  title="Change avatar"
>
  {profileData.username.charAt(0)}
  <img
    src="https://pplx-res.cloudinary.com/image/private/user_uploads/44363456/de85aa3c-72bb-4525-bd42-5098b8462f62/profile.jpg"
    alt="Profile"
    className="absolute top-0 left-0 w-20 h-20 rounded-full object-cover opacity-0"
    style={{ pointerEvents: 'none' }}
  />
</div>

        <div className="text-xl font-semibold mb-4">Hi, {profileData.username}!</div>
        <button className="w-full border border-gray-300 rounded-full py-2 mb-4 text-[#1967d2] font-medium hover:bg-blue-50 transition">
          Manage your Aniki Account
        </button>

        <div className="flex flex-col w-full gap-2 mb-2">
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-full py-2 font-medium hover:bg-green-50 transition">
            <FaPlus className="text-green-600" /> Add account
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-full py-2 font-medium hover:bg-green-50 transition">
            <FaSignOutAlt className="text-green-600" /> Sign out
          </button>
        </div>

        
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'Profile') {
      return <ProfilePopup />;
    }
    if (activeTab === 'Roadmaps') {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Roadmaps Followed</h2>
          <div className="flex flex-wrap gap-8">
            {roadmapsFollowed.map((roadmap, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 aspect-square w-full max-w-[250px] flex flex-col justify-between">
                <div>
                  <p className="text-lg font-bold">{roadmap.title}</p>
                  <p className="text-sm text-gray-500">{roadmap.desc}</p>
                  <p className="text-sm text-gray-400 mt-2">Level: {roadmap.level}</p>
                  <p className="text-sm text-gray-400">Duration: {roadmap.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (activeTab === 'Chatrooms') {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Communities Joined</h2>
          <div className="flex flex-wrap gap-8">
            {communitiesJoined.map((community, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 aspect-square w-full max-w-[250px] flex flex-col justify-between">
                <div>
                  <p className="text-lg font-bold">{community.name}</p>
                  <p className="text-sm text-gray-500">{community.desc}</p>
                </div>
                <div className="mt-2 text-green-700 font-semibold">{community.members} members</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (activeTab === 'Resources') {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Resources Viewed</h2>
          <div className="flex flex-wrap gap-8">
            {resourcesViewed.map((resource, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 aspect-square w-full max-w-[250px] flex flex-col justify-between">
                <div>
                  <p className="text-lg font-bold">{resource.title}</p>
                  <p className="text-sm text-gray-500">{resource.type}</p>
                  <p className="text-sm text-gray-400">{resource.desc}</p>
                  <p className="text-sm text-gray-400 mt-2">Author: {resource.author}</p>
                  <p className="text-sm text-gray-400">Duration: {resource.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-6">
        <h2 className="text-2xl font-semibold">Continue Learning</h2>
        <div className="flex flex-col md:flex-row justify-start gap-8 w-full">
          {[
            {
              title: 'Introduction to Machine Learning',
              category: 'Data Science',
              desc: 'Learn the fundamentals of Data Science',
              progress: 65,
            },
            {
              title: 'Advanced Web Development',
              category: 'Web Development',
              desc: 'Master modern web development techniques',
              progress: 42,
            },
          ].map((course, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4 aspect-square w-full max-w-[280px] flex flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">{course.category}</p>
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.desc}</p>
              </div>
              <div className="mt-2 bg-gray-200 h-2 rounded">
                <div className="bg-green-500 h-2 rounded" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#e6ffe3]">
      {/* Sidebar */}
      <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white shadow-md transition-all duration-300`}>
        <div className="flex justify-between items-center p-4">
          {!collapsed && <span className="text-green-600 font-bold text-lg">Aniki</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500">
            {collapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          {[
            { name: 'Dashboard', icon: <FaBookOpen /> },
            { name: 'Roadmaps', icon: <FaMap /> },
            { name: 'Chatrooms', icon: <FaComments /> },
            { name: 'Resources', icon: <FaBookOpen /> },
            { name: 'Profile', icon: <FaUser /> },
          ].map(({ name, icon }) => (
            <button
              key={name}
              className={`flex items-center w-full px-4 py-2 hover:bg-green-100 transition ${
                activeTab === name ? 'bg-green-200 font-semibold' : ''
              }`}
              onClick={() => setActiveTab(name)}
            >
              <span className="text-xl">{icon}</span>
              {!collapsed && <span className="ml-3">{name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
    </div>
  );
};

export default DashboardSection;
