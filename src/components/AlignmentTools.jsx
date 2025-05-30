import React from 'react';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignVerticalSpaceAround,
  AlignHorizontalSpaceAround 
} from 'lucide-react';

const AlignmentTools = ({ onAlign, selectedCount, vertical = false }) => {
  if (selectedCount < 2) return null;

  const alignmentOptions = [
    { type: 'left', icon: AlignLeft, label: 'Align Left' },
    { type: 'center', icon: AlignCenter, label: 'Align Center' },
    { type: 'right', icon: AlignRight, label: 'Align Right' },
    { type: 'top', icon: AlignVerticalSpaceAround, label: 'Align Top' },
    { type: 'middle', icon: AlignHorizontalSpaceAround, label: 'Align Middle' },
    { type: 'bottom', icon: AlignVerticalSpaceAround, label: 'Align Bottom' },
  ];

  const containerClass = vertical 
    ? "space-y-1" 
    : "bg-white border border-gray-200 rounded-lg shadow-lg p-2";
    
  const itemsClass = vertical 
    ? "space-y-1" 
    : "flex items-center space-x-1";

  return (
    <div className={containerClass}>
      {!vertical && (
        <div className="text-xs font-medium text-gray-600 mr-2">
          Align {selectedCount} nodes:
        </div>
      )}
      <div className={itemsClass}>
        {alignmentOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.type}
              onClick={() => onAlign(option.type)}
              className={`${vertical ? 'w-full flex items-center p-2 hover:bg-gray-700 rounded transition-colors text-left' : 'p-2 hover:bg-gray-50 rounded transition-colors'}`}
              title={option.label}
            >
              {vertical ? (
                <>
                  <IconComponent size={16} className="text-gray-300 mr-2" />
                  <span className="text-white text-sm">{option.label}</span>
                </>
              ) : (
                <IconComponent size={16} className="text-gray-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AlignmentTools;