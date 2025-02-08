// CustomEdge.jsx
import React from 'react';
import { getBezierPath } from 'reactflow';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  // Debug logs for coordinate values
  console.log('CustomEdge coordinates:', { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition });
  
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  console.log('Computed edgePath:', edgePath);

  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  const handleDelete = () => {
    if (data?.onDeleteEdge) {
      data.onDeleteEdge(id);
    }
  };

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <g transform={`translate(${centerX}, ${centerY})`}>
        <rect x="-10" y="-10" width="20" height="20" fill="#fbf8f6" rx="5" ry="5" />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          style={{ fontSize: 12, cursor: 'pointer', userSelect: 'none' }}
          onClick={handleDelete}
          className="bg-transparent"
        >
          ✖
        </text>
      </g>
    </>
  );
};

export default CustomEdge;
