import React from 'react';
import { Users, MessageSquare, BarChart3, Settings } from 'lucide-react';

export const AdminHeader = () => {
  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage your roadmap platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">1,247 Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">24 Chatrooms</span>
              </div>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
