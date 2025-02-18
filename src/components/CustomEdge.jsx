import React, { useRef, useEffect, useState, useMemo } from "react";
import { getBezierPath } from "reactflow";

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
  // Check that all coordinates are valid numbers.
  const validCoordinates = [sourceX, sourceY, targetX, targetY].every(
    (coord) => typeof coord === "number" && !isNaN(coord)
  );

  // Memoize the edge path; if coordinates are invalid, return an empty string.
  const edgePath = useMemo(() => {
    if (!validCoordinates) {
      console.warn("Invalid coordinates for edge", { id, sourceX, sourceY, targetX, targetY });
      return "";
    }
    return getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
    });
  }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, validCoordinates]);

  const pathRef = useRef(null);
  const [midPos, setMidPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (pathRef.current && edgePath) {
      try {
        const length = pathRef.current.getTotalLength();
        if (!isNaN(length) && length > 0) {
          const midpoint = pathRef.current.getPointAtLength(length / 2);
          setMidPos({ x: midpoint.x, y: midpoint.y });
        }
      } catch (error) {
        console.error("Error calculating edge midpoint:", error);
      }
    }
  }, [edgePath]);

  const handleDelete = () => {
    if (data?.onDeleteEdge) {
      data.onDeleteEdge(id);
    }
  };

  // Only render the edge if we have a valid path.
  if (!edgePath) {
    return null;
  }

  return (
    <>
      <path
        ref={pathRef}
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />

      <g transform={`translate(${midPos.x}, ${midPos.y})`}>
        <rect
          x="-10"
          y="-10"
          width="20"
          height="20"
          fill="#fbf8f6"
          rx="5"
          ry="5"
        />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          style={{ fontSize: 12, cursor: "pointer", userSelect: "none" }}
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
