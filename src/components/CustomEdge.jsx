import React, { useRef, useEffect, useState } from 'react';
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
  // 1) Compute the path string via reactflow's getBezierPath
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // 2) We'll measure the path after it renders to find the true midpoint
  const pathRef = useRef(null);
  const [midPos, setMidPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (pathRef.current) {
      // a) Get the total length of the rendered path
      const length = pathRef.current.getTotalLength();
      // b) Get the coordinates at half that length
      const midpoint = pathRef.current.getPointAtLength(length / 2);
      // c) Store them in state so we can render the cross at the correct position
      setMidPos({ x: midpoint.x, y: midpoint.y });
    }
  }, [edgePath, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition]);

  const handleDelete = () => {
    if (data?.onDeleteEdge) {
      data.onDeleteEdge(id);
    }
  };

  return (
    <>
      {/* 3) Render the path, attaching a ref so we can measure it in the effect */}
      <path
        ref={pathRef}
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />

      {/* 4) Render the cross at the midpoint coordinates */}
      <g transform={`translate(${midPos.x}, ${midPos.y})`}>
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
