import React from 'react';
import { Plus, Map } from 'lucide-react';

export const CreateRoadmapCard = ({ onCreate }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <Map className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Create New Roadmap</h3>
          <p className="text-gray-400 text-sm">Build interactive career paths</p>
        </div>
      </div>
      
      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
        Start building a new interactive career roadmap with draggable nodes and connections. 
        Design learning paths for different technologies and skills.
      </p>
      
      <button 
        onClick={onCreate}
        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:from-green-500 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        <span>Create Roadmap</span>
      </button>
    </div>
  );
};