import React from 'react';
import {
  X, Link, Book,
  FileText,
  GraduationCap,
  Video,
  File,
  Globe,
  Library,
  Youtube,
  Newspaper
} from 'lucide-react';
import { authFetch } from '../utils/authFetch';


const resourceIcons = {
  Blog: <Newspaper size={16} />,
  Article: <FileText size={16} />,
  Book: <Book size={16} />,
  Video: <Video size={16} />,
  Paper: <FileText size={16} />,
  Course: <GraduationCap size={16} />,
  Channel: <Youtube size={16} />,
  Website: <Globe size={16} />,
  Playlist: <Library size={16} />,
};

const normalizeUrl = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};


const DetailsPanel = ({ node, id, onClose }) => {
  const { label, description, resources = [], status = 'pending' } = node.data;

  const handleStatusChange = async (e) => {

    console.log('New Status:', e.target.value);
    try {
      const response = await authFetch(`/api/v1/followed-roadmaps/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "milestoneId": node._id,
          "status": e.target.value
        }),
      });

      if (response.ok) {
        alert("Milestone status updated!");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error updating milestone:', error);
      alert(`Failed to update: ${error}`);
    }

  };

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 shadow-lg h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{label}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded transition-colors text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Description */}
      <div className="p-4 text-sm text-gray-300 border-b border-gray-700">
        <h3 className="text-white font-medium mb-1">Description</h3>
        <p>{description || "No description available."}</p>
      </div>

      {/* Status Dropdown */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-white font-medium mb-1">Status</h3>
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
          <option value="skipped">Skipped</option>
        </select>
      </div>

      {/* Resources */}
      <div className="p-4">
        <h3 className="text-white font-medium mb-2">Resources</h3>
        {resources.length > 0 ? (
          <ul className="space-y-2">
            {resources.map((res, idx) => (
              <li key={idx} className="flex items-center space-x-2 hover:underline text-blue-400">
                {resourceIcons[res.resourceType] || <Link size={16} />}
                <a href={normalizeUrl(res.resourceURL)} target="_blank" rel="noopener noreferrer">
                  {res.resourceLabel || res.resourceURL}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No resources added yet.</p>
        )}
      </div>
    </div>
  );
};

export default DetailsPanel;
