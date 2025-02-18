import React from "react";
import Delete from "../../assets/SVG/Delete";
import Axios from "../../Database/Axios";
import { useFlowContext } from "../../context/FlowContext"; // Adjust if needed
import Save from "./Save";

export default function Navbar() {
  // Destructure setNodes and setEdges so we can clear them
  const { setNodes, setEdges } = useFlowContext();

  const deleteData = () => {
    // Clear the diagram
    setNodes([]);
    setEdges([]);

    // Also remove them from localStorage
    localStorage.removeItem("edges");
    localStorage.removeItem("nodes");
    console.log("Edges and Nodes removed from localStorage");
  };

  return (
    <div className="w-screen z-20 h-10 bg-[#660479]">
      <Save />
      <Delete className="float-right w-6 m-2 h-6" onClick={deleteData} />
    </div>
  );
}
