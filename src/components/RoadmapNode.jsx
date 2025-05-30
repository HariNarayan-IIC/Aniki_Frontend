import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const RoadmapNode = memo(({ data, selected }) => {
  const style = data.style || {};
  const shape = style.shape || 'rectangle';
  
  const getNodeStyle = () => {
    const baseStyle = {
      backgroundColor: style.backgroundColor || '#3b82f6',
      borderColor: style.borderColor || '#1d4ed8',
      borderWidth: style.borderWidth || 2,
      width: style.width || 200,
      height: style.height || 100,
      color: style.textColor || '#ffffff',
    };

    if (shape === 'diamond') {
      return {
        ...baseStyle,
        transform: 'rotate(45deg)',
        borderRadius: '8px',
      };
    } else if (shape === 'circle') {
      return {
        ...baseStyle,
        borderRadius: '50%',
      };
    } else {
      return {
        ...baseStyle,
        borderRadius: style.borderRadius || 8,
      };
    }
  };

  const getContentStyle = () => {
    if (shape === 'diamond') {
      return {
        transform: 'rotate(-45deg)',
        width: '70%',
        height: '70%',
      };
    }
    return {};
  };

  return (
    <div
      className={`relative border-2 transition-all duration-200 ${
        selected ? 'ring-2 ring-blue-400 ring-offset-2' : ''
      }`}
      style={getNodeStyle()}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border-2 border-gray-300 rounded-full"
      />
      
      <div className="p-3 h-full flex flex-col justify-center items-center" style={getContentStyle()}>
        <h3 className="font-semibold text-sm mb-1 truncate text-center">
          {data.title}
        </h3>
        <p className="text-xs opacity-90 line-clamp-2 text-center">
          {data.description}
        </p>
        {data.resources && data.resources.length > 0 && (
          <div className="mt-1 text-xs opacity-75 text-center">
            {data.resources.length} resource{data.resources.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border-2 border-gray-300 rounded-full"
      />
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';

export default RoadmapNode;
