import React from 'react';
import { Plus, Circle, Square, Diamond } from 'lucide-react';

const EditorToolbar = ({ onAddNode, vertical = false }) => {
  const nodeTemplates = [
    {
      name: 'Milestone',
      icon: Square,
      style: {
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        borderColor: '#1d4ed8',
        borderWidth: 2,
        borderRadius: 8,
        width: 240,
        height: 120,
        shape: 'rectange',
      },
    },
    {
      name: 'Task',
      icon: Square,
      style: {
        backgroundColor: '#10b981',
        textColor: '#ffffff',
        borderColor: '#047857',
        borderWidth: 2,
        borderRadius: 8,
        width: 200,
        height: 100,
        shape: 'rectangle',
      },
    },
    {
      name: 'Decision',
      icon: Diamond,
      style: {
        backgroundColor: '#f59e0b',
        textColor: '#ffffff',
        borderColor: '#d97706',
        borderWidth: 2,
        borderRadius: 8,
        width: 100,
        height: 100,
        shape: 'diamond',
      },
    },
    {
      name: 'Phase',
      icon: Circle,
      style: {
        backgroundColor: '#8b5cf6',
        textColor: '#ffffff',
        borderColor: '#7c3aed',
        borderWidth: 3,
        borderRadius: 12,
        width: 250,
        height: 120,
        shape: 'circle',
      },
    },
  ];

  const containerClass = vertical 
    ? "flex flex-col space-y-2" 
    : "bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2";
    
  const itemsClass = vertical 
    ? "space-y-1" 
    : "space-y-1 ";

  return (
    <div className={containerClass}>
      {!vertical && <div className="text-xs font-medium text-gray-100  mr-2">Add Node:</div>}
      <div className={itemsClass}>
        {nodeTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <button
              key={template.name}
              onClick={() => onAddNode('roadmap', template.style)}
              className={`${'w-full flex items-center p-3 hover:bg-gray-700 rounded transition-colors text-left' }`}
              title={template.name}
            >
              { (
                <>
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center mr-3"
                    style={{ backgroundColor: template.style.backgroundColor }}
                  >
                    <IconComponent size={16} color={template.style.textColor} />
                  </div>
                  <span className="text-white text-sm">{template.name}</span>
                </>
              ) }
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EditorToolbar;