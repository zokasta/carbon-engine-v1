import React, { useEffect, useState } from "react";
import Delete from "../../assets/SVG/Delete";
import Axios from "../../Database/Axios";
import { useFlowContext } from "../../context/FlowContext"; // Adjust the import path


export default function Save() {
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

    let elements = localNodes.map((node) => {
      return {
        element_id: node.id,
        name: node.data.title,
        type: node.typeFormat + "_node", // Making it 'input_node' or 'output_node'
        nodes: node.data.fields.map((field) => ({
          node_id: `${field.handle}_node`,
          display_name: field.title,
        })),
      };
    });

    let edges = localEdges.map((edge, index) => {
      return {
        edge_id: `edge_id_${index + 1}`,
        source_id: edge.source,
        target_id: edge.target,
        source_node_id: `${edge.sourceHandle}_node`,
        target_node_id: `${edge.targetHandle}_node`,
      };
    });

    let formattedData = {
      api_id: "this is api id",
      filename: "makegame",
      type: "post",
      elements: elements,
      edges: edges,
    };

    console.log("Processed Structure:", JSON.stringify(formattedData, null, 2));

    try {
      const response = await Axios.post("/generate-api/", formattedData);
      console.log("API Response:", response);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <button
      className="m-1 h-8 flex items-center justify-center w-20 bg-[#ffe4a9] hover:bg-[#ffdc8f] rounded-md shadow-md text-[#660479] font-semibold float-right"
      onClick={showData}
    >
      Save
    </button>
  );
}
