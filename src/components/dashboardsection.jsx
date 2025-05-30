import React, { useState } from 'react';
import { FaBars, FaTimes, FaMap, FaComments, FaBookOpen, FaUser, FaPlus, FaSignOutAlt, FaEdit, FaCheck } from 'react-icons/fa';

// Helper for consistent pastel color
function getRandomColor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 55%)`;
}

const DashboardSection = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [profileData, setProfileData] = useState({
    username: 'Vaibhav',
    firstName: 'Vaibhav',
    lastName: 'Kumar',
    email: 'vaibhav.kumar2023@iic.ac.in',
  });
  const [editing, setEditing] = useState(false);
  const [editFields, setEditFields] = useState(profileData);

  const navItems = [
    { name: 'Dashboard', icon: <FaBookOpen /> },
    { name: 'Roadmaps', icon: <FaMap /> },
    { name: 'Chatrooms', icon: <FaComments /> },
    { name: 'Resources', icon: <FaBookOpen /> },
    { name: 'Profile', icon: <FaUser /> },
  ];

  const handleInputChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    setProfileData(editFields);
    setEditing(false);
  };

  // Profile Popup styled like the second image
  const ProfilePopup = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(230, 255, 237, 0.7)' }}>
      <div className="relative bg-white rounded-2xl shadow-xl max-w-xs w-full p-8 flex flex-col items-center"
           style={{ borderRadius: '24px' }}>
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={() => setActiveTab('Dashboard')}
        >
          <FaTimes size={22} />
        </button>
        {/* Edit Button Top-Right */}
        <button
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-700"
          onClick={() => { setEditing(true); setEditFields(profileData); }}
          title="Edit"
        >
          <FaEdit size={20} />
        </button>
        {/* Email */}
        
        {/* Avatar (clickable) */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold mb-3 cursor-pointer relative"
          style={{ background: getRandomColor(profileData.username), color: "white", border: "4px solid #e6ffe3" }}
          onClick={() => alert('Avatar clicked! Implement upload/change logic here.')}
          title="Change avatar"
        >
          {profileData.username.charAt(0)}
          {/* Optionally show the uploaded image if you want */}
          {/* <img src="profile.jpg" alt="Profile" className="absolute top-0 left-0 w-20 h-20 rounded-full object-cover" /> */}
        </div>
        {/* Greeting */}
        <div className="text-xl font-semibold mb-4">Hi, {profileData.username}!</div>
        {/* User Details */}
        <div className="w-full bg-[#f5f7fa] rounded-lg p-4 mb-4 shadow flex flex-col gap-2">
          {!editing ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Username:</span>
                <span className="font-medium">{profileData.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">First Name:</span>
                <span className="font-medium">{profileData.firstName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Name:</span>
                <span className="font-medium">{profileData.lastName}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Username:</span>
                <input
                  name="username"
                  value={editFields.username}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">First Name:</span>
                <input
                  name="firstName"
                  value={editFields.firstName}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Name:</span>
                <input
                  name="lastName"
                  value={editFields.lastName}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm"
                />
              </div>
              <button
                className="absolute top-4 left-14 text-green-500 hover:text-green-700"
                onClick={handleEditSave}
                title="Save"
              >
                <FaCheck size={20} />
              </button>
            </>
          )}
        </div>
        {/* Buttons: stacked vertically */}
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-full py-2 px-4 mb-2 font-medium hover:bg-green-50 transition w-full">
          <FaPlus className="text-green-600" /> Add account
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-full py-2 px-4 font-medium hover:bg-green-50 transition w-full">
          <FaSignOutAlt className="text-green-600" /> Sign out
        </button>
        {/* Footer links */}
        
      </div>
    </div>
  );

  // Main content rendering
  const renderContent = () => {
    // Show popup only for Profile tab
    if (activeTab === 'Profile') {
      return <ProfilePopup />;
    }
    // All other tabs (Dashboard, etc)
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
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-4 aspect-square w-full max-w-[280px] flex flex-col justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-gray-600">{course.category}</p>
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.desc}</p>
              </div>
              <div className="mt-2 bg-gray-200 h-2 rounded">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${course.progress}%` }}
                ></div>
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
          {navItems.map(({ name, icon }) => (
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
