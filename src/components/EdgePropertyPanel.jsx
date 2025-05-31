import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EdgePropertyPanel = ({ edge, onUpdateEdge, onClose }) => {
  const [edgeType, setEdgeType] = useState(edge.type || 'smoothstep');
  const [strokeColor, setStrokeColor] = useState(edge.style?.stroke || '#64748b');
  const [strokeWidth, setStrokeWidth] = useState(edge.style?.strokeWidth || 2);
  const [animated, setAnimated] = useState(edge.animated || false);
  const [markerEnd, setMarkerEnd] = useState(edge.markerEnd?.type || 'none');

  useEffect(() => {
    const updatedEdge = {
      type: edgeType,
      animated,
      style: {
        ...edge.style,
        stroke: strokeColor,
        strokeWidth,
      },
    };

    if (markerEnd !== 'none') {
      updatedEdge.markerEnd = { type: markerEnd };
    } else {
      updatedEdge.markerEnd = undefined;
    }

    onUpdateEdge(edge.id, updatedEdge);
  }, [edgeType, strokeColor, strokeWidth, animated, markerEnd, edge.id, edge.style, onUpdateEdge]);

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 shadow-lg h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Edge Properties</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded transition-colors text-white"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Edge Type */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Edge Type</h3>
          <select
            value={edgeType}
            onChange={(e) => setEdgeType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          >
            <option value="default">Default</option>
            <option value="straight">Straight</option>
            <option value="step">Step</option>
            <option value="smoothstep">Smooth Step</option>
            <option value="bezier">Bezier</option>
          </select>
        </div>

        {/* Arrow Type */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Arrow Type</h3>
          <select
            value={markerEnd}
            onChange={(e) => setMarkerEnd(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          >
            <option value="none">None</option>
            <option value="arrow">Arrow</option>
            <option value="arrowclosed">Arrow Closed</option>
          </select>
        </div>

        {/* Style */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Style</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Color
              </label>
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="w-full h-8 border border-gray-600 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Width
              </label>
              <input
                type="number"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                min="1"
                max="10"
                className="w-full px-2 py-1 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="animated"
                checked={animated}
                onChange={(e) => setAnimated(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="animated" className="text-xs font-medium text-gray-400">
                Animated
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgePropertyPanel;
