import React, { useEffect, useState } from 'react';
import Delete from '../../assets/SVG/Delete';
import Axios from '../../Database/Axiso';
import { useFlowContext } from '../../context/FlowContext'; // Adjust the import path

export default function Navbar() {
  const { nodes, edges, updateNode } = useFlowContext();
  const [localNodes, setLocalNodes] = useState(nodes);
  const [localEdges, setLocalEdges] = useState(edges);

  // Sync local state with context state when they change
  useEffect(() => {
    setLocalNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    setLocalEdges(edges);
  }, [edges]);

  const showData = async () => {
    console.log("Nodes:", JSON.stringify(localNodes, null, 2));
    console.log("Edges:", JSON.stringify(localEdges, null, 2));

    // Dynamically sort nodes
    const sortedNodes = [...localNodes].sort((a, b) => {
      if (a.type === 'Input' && b.type === 'Output') return -1;
      if (a.type === 'Output' && b.type === 'Input') return 1;
      return 0;
    });

    // Process nodes and edges
    let ans = sortedNodes.map((node) => {
      let nodeStructure = {
        id: node.id,
        type: node.type,
        structure: {},
      };

      localEdges
        .filter((edge) => edge.source === node.id)
        .forEach((edge) => {
          const sourceField = edge.sourceHandle?.replace("_input", "") || "";
          const targetField = edge.targetHandle?.replace("_output", "") || "";

          if (!nodeStructure.structure[sourceField]) {
            nodeStructure.structure[sourceField] = { fields: [] };
          }

          nodeStructure.structure[sourceField].fields.push({
            target: edge.target,
            location: targetField,
          });
        });

      if (Object.keys(nodeStructure.structure).length === 0) {
        nodeStructure.structure = {
          email: { fields: [{ target: "none", location: "none" }] },
          password: { fields: [{ target: "none", location: "none" }] },
        };
      }

      return nodeStructure;
    });

    // Format for the API request
    ans = { file: "makegame", format: ans };
    console.log("Processed Structure:", JSON.stringify(ans, null, 2));

    // Make API request
    try {
      const response = await Axios.post("/generate-api/", ans);
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Function to delete data from localStorage
  const deleteData = () => {
    localStorage.removeItem("edges");
    localStorage.removeItem("nodes");
    console.log("Edges and Nodes removed from localStorage");
  };

  return (
    <div className="w-screen z-20 h-10 bg-[#660479]">
      <button
        className="m-1 h-8 flex items-center justify-center w-20 bg-[#ffe4a9] hover:bg-[#ffdc8f] rounded-md shadow-md text-[#660479] font-semibold float-right"
        onClick={showData}
      >
        Save
      </button>
      <Delete className="float-right w-6 m-2 h-6" onClick={deleteData} />
    </div>
  );
}
