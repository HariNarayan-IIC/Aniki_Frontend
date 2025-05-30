import React, { useState } from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { CreateRoadmapCard } from '../components/CreateRoadmapCard';
import { UserManagementCard } from '../components/UserManagementCard';
import { ChatroomManagementCard } from '../components/ChatroomManagementCard';
import { AnalyticsCard } from '../components/AnalyticsCard';

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active', joinDate: '2024-02-01' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'inactive', joinDate: '2024-01-20' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'user', status: 'active', joinDate: '2024-03-05' },
  ]);

  const [chatrooms, setChatrooms] = useState([
    { id: 1, name: 'Frontend Development', followers: 1250, description: 'React, Vue, Angular discussions' },
    { id: 2, name: 'Backend Engineering', followers: 890, description: 'Node.js, Python, Java backend topics' },
    { id: 3, name: 'DevOps & Cloud', followers: 675, description: 'AWS, Docker, Kubernetes discussions' },
    { id: 4, name: 'Mobile Development', followers: 432, description: 'React Native, Flutter, Swift' },
  ]);

  const handleCreateRoadmap = () => {
    console.log('Creating new roadmap...');
  };

  const handleRoleToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
        : user
    ));
  };

  const handleAddChatroom = (name, description) => {
    const newChatroom = {
      id: chatrooms.length + 1,
      name,
      followers: 0,
      description
    };
    setChatrooms([...chatrooms, newChatroom]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-violet-900 to-black">
      <AdminHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <CreateRoadmapCard onCreate={handleCreateRoadmap} />
          <UserManagementCard users={users} onRoleToggle={handleRoleToggle} />
          <ChatroomManagementCard 
            chatrooms={chatrooms} 
            onAddChatroom={handleAddChatroom}
          />
        </div>
        
        <div className="w-full">
          <AnalyticsCard />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;