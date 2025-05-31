import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { initialNodes, initialEdges } from '../pages/RoadmapEditorPage';
import { authFetch } from '../utils/authFetch';


const RoadmapCreator = ({ onCreateRoadmap }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const createRoadmap = async ()=> {
  try {
        // This assumes authFetch is available globally or you'll need to import it
        const response = await authFetch('/api/v1/roadmap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            description,
            nodes: initialNodes,
            edges: initialEdges,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const roadmapId = data._id;
          navigate(`/roadmapEditor/${roadmapId}`)
        } else {
          throw new Error('Failed to save roadmap');
        }
      } catch (error) {
        console.error('Error saving roadmap:', error);
        alert(`Error creating roadmap: ${error}`)
      }
}

  const handleCreate = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Store the roadmap details for the editor
      localStorage.setItem('currentRoadmapTitle', name);
      localStorage.setItem('currentRoadmapDescription', description);
      
      if (onCreateRoadmap) {
        onCreateRoadmap({ name, description });
      }
      
      navigate('/roadmapEditor');
    }
  };

  return (
  <div className="min-h-screen bg-[#101828] flex items-center justify-center p-4">
    <div className="bg-[#1D2939] rounded-xl shadow-2xl p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[#32D46C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="text-[#32D46C]" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Create New Roadmap</h1>
        <p className="text-gray-400">
          Give your roadmap a name and description to get started
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Roadmap Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-[#2A3445] border border-[#3E4C5E] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32D46C]"
            placeholder="e.g., Frontend Developer Path"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-[#2A3445] border border-[#3E4C5E] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32D46C] resize-none"
            placeholder="Describe what this roadmap is about..."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-4 py-2 border border-[#3E4C5E] text-gray-300 rounded-md hover:bg-[#2A3445] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={createRoadmap}
            className="flex-1 px-4 py-2 bg-[#32D46C] text-[#101828] font-semibold rounded-md hover:bg-[#2FB95C] transition-colors"
          >
            Create Roadmap
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default RoadmapCreator;