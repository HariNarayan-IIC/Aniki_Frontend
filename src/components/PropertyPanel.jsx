import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Link } from 'lucide-react';

const PropertyPanel = ({ node, onUpdateNode, onClose }) => {
  const [label, setLabel] = useState(node.data.label);
  const [description, setDescription] = useState(node.data.description);
  const [resources, setResources] = useState(node.data.resources || []);
  const [backgroundColor, setBackgroundColor] = useState(node.data.style?.backgroundColor || '#3b82f6');
  const [textColor, setTextColor] = useState(node.data.style?.textColor || '#ffffff');
  const [borderColor, setBorderColor] = useState(node.data.style?.borderColor || '#1d4ed8');
  const [width, setWidth] = useState(node.data.style?.width || 200);
  const [height, setHeight] = useState(node.data.style?.height || 100);
  const [shape, setShape] = useState(node.data.style?.shape || 'rectangle');

  useEffect(() => {
    setLabel(node.data.label);
    setDescription(node.data.description);
    setResources(node.data.resources || []);
    setBackgroundColor(node.data.style?.backgroundColor || '#3b82f6');
    setTextColor(node.data.style?.textColor || '#ffffff');
    setBorderColor(node.data.style?.borderColor || '#1d4ed8');
    setWidth(node.data.style?.width || 200);
    setHeight(node.data.style?.height || 100);
    setShape(node.data.style?.shape || 'rectangle');
  }, [node.id]);

  useEffect(() => {
    const updatedData = {
      label,
      description,
      resources,
      style: {
        ...node.data.style,
        backgroundColor,
        textColor,
        borderColor,
        width,
        height,
        shape,
      },
    };
    onUpdateNode(node.id, updatedData);
  }, [label, description, resources, backgroundColor, textColor, borderColor, width, height, shape, onUpdateNode, node.data.style]);

  const addResource = () => {
    const newResource = {
      id: Date.now().toString(),
      resourceLabel: 'New Resource',
      resourceURL: '',
      resourceType: 'Blog',
    };
    setResources([...resources, newResource]);
  };

  const updateResource = (id, field, value) => {
    setResources(resources.map(resource =>
      resource.id === id ? { ...resource, [field]: value } : resource
    ));
  };

  const removeResource = (id) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const colorPresets = [
    { bg: '#3b82f6', text: '#ffffff', border: '#1d4ed8', name: 'Blue' },
    { bg: '#10b981', text: '#ffffff', border: '#047857', name: 'Green' },
    { bg: '#f59e0b', text: '#ffffff', border: '#d97706', name: 'Orange' },
    { bg: '#ef4444', text: '#ffffff', border: '#dc2626', name: 'Red' },
    { bg: '#8b5cf6', text: '#ffffff', border: '#7c3aed', name: 'Purple' },
    { bg: '#06b6d4', text: '#ffffff', border: '#0891b2', name: 'Cyan' },
    { bg: '#ffffff', text: '#1f2937', border: '#d1d5db', name: 'White' },
    { bg: '#1f2937', text: '#ffffff', border: '#374151', name: 'Dark' },
  ];

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 shadow-lg h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Node Properties</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded transition-colors text-white"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Title
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                placeholder="Node title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                placeholder="Node description"
              />
            </div>
          </div>
        </div>

        {/* Shape Selection */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Shape</h3>
          <div className="grid grid-cols-3 gap-2">
            {['rectangle', 'circle', 'diamond'].map((shapeOption) => (
              <button
                key={shapeOption}
                onClick={() => setShape(shapeOption)}
                className={`p-2 border rounded text-xs capitalize ${shape === shapeOption
                  ? 'border-blue-500 bg-blue-600 text-white'
                  : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                {shapeOption}
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-300">Resources</h3>
            <button
              onClick={addResource}
              className="flex items-center px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Plus size={14} className="mr-1" />
              Add
            </button>
          </div>
          <div className="space-y-2">
            {resources.map((resource) => (
              <div key={resource.id} className="p-2 border border-gray-600 rounded-md bg-gray-700 space-y-2">
                {/* Title + Remove */}
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={resource.resourceLabel}
                    onChange={(e) => updateResource(resource.id, 'resourceLabel', e.target.value)}
                    className="flex-1 text-xs border-none focus:outline-none font-medium bg-transparent text-white"
                    placeholder="Resource title"
                  />
                  <button
                    onClick={() => removeResource(resource.id)}
                    className="p-1 text-red-400 hover:bg-red-900 rounded"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                {/* URL */}
                <div className="flex items-center">
                  <Link size={12} className="text-gray-400 mr-1" />
                  <input
                    type="url"
                    value={resource.resourceURL}
                    onChange={(e) => updateResource(resource.id, 'resourceURL', e.target.value)}
                    className="flex-1 text-xs border-none focus:outline-none text-gray-300 bg-transparent"
                    placeholder="https://..."
                  />
                </div>

                {/* Type Dropdown */}
                <div>
                  <select
                    value={resource.resourceType}
                    onChange={(e) => updateResource(resource.id, 'resourceType', e.target.value)}
                    className="w-full text-xs text-white bg-gray-800 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Blog">Blog</option>
                    <option value="Article">Article</option>
                    <option value="Book">Book</option>
                    <option value="Video">Video</option>
                    <option value="Paper">Paper</option>
                    <option value="Course">Course</option>
                    <option value="Website">Website</option>
                    <option value="Channel">Channel</option>
                    <option value="Playlist">Playlist</option>
                  </select>
                </div>
              </div>
            ))}
            {resources.length === 0 && (
              <p className="text-xs text-gray-500 italic">No resources added yet</p>
            )}
          </div>
        </div>


        {/* Style */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Style</h3>

          {/* Color Presets */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Color Presets
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setBackgroundColor(preset.bg);
                    setTextColor(preset.text);
                    setBorderColor(preset.border);
                  }}
                  className="w-full h-8 rounded border-2 border-gray-600 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: preset.bg }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Background
              </label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full h-8 border border-gray-600 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Text Color
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-8 border border-gray-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Size */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Width
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min="100"
                max="400"
                className="w-full px-2 py-1 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Height
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min="60"
                max="200"
                className="w-full px-2 py-1 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;