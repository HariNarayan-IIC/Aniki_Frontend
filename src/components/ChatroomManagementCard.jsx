import React, { useState } from 'react';
import { MessageSquare, Plus, Users as UsersIcon, X } from 'lucide-react';

export const ChatroomManagementCard = ({ chatrooms, onAddChatroom }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRoomName.trim() && newRoomDescription.trim()) {
      onAddChatroom(newRoomName.trim(), newRoomDescription.trim());
      setNewRoomName('');
      setNewRoomDescription('');
      setShowAddForm(false);
    }
  };

  const totalFollowers = chatrooms.reduce((sum, room) => sum + room.followers, 0);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Chatroom Management</h3>
            <p className="text-gray-400 text-sm">{chatrooms.length} rooms • {totalFollowers.toLocaleString()} total followers</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg text-white hover:from-orange-500 hover:to-red-600 transition-all"
        >
          {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Chatroom name..."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              placeholder="Description..."
              value={newRoomDescription}
              onChange={(e) => setNewRoomDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-500 hover:to-red-600 transition-all"
            >
              Create Chatroom
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {chatrooms.map((room) => (
          <div key={room.id} className="p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-all">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-white font-medium">{room.name}</h4>
              <div className="flex items-center space-x-1 text-gray-400">
                <UsersIcon className="w-4 h-4" />
                <span className="text-sm">{room.followers.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{room.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
