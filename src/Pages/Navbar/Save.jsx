import React, { useEffect, useState } from "react";
import Axios from "../../Database/Axios";
import { useFlowContext } from "../../context/FlowContext";

export default function Save() {
  const { nodes, edges } = useFlowContext();
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

    // Helper function to transform a handle based on node type.
    const transformHandle = (node, handle) => {
      if (node && node.type === "Plugin") {
        // For Plugin nodes, map handles "h1" and "h2" to our fixed plugin node ids.
        if (handle === "h1") return "plugin_input";
        if (handle === "h2") return "plugin_output";
      }
      // For other node types, simply append _node.
      return `${handle}_node`;
    };

    // Transform nodes into the API's "elements" format.
    const elements = localNodes.map((node) => {
      // For Plugin nodes, use a fixed structure.
      if (node.type === "Plugin") {
        return {
          element_id: node.data.name.toLowerCase().replace(/\s+/g, "_"),
          name: node.data.name,
          type: "plugin",
          nodes: [
            { node_id: "plugin_input" },
            { node_id: "plugin_output" },
          ],
        };
      } else {
        // For Input and Output nodes.
        return {
          element_id: node.id, // Adjust this if you want a different id format (e.g., append "_1")
          name: node.data.title,
          type: node.typeFormat + "_node", // e.g., "input_node" or "output_node"
          nodes: node.data.fields.map((field) => ({
            node_id: `${field.handle}_node`,
            display_name: field.title,
          })),
        };
      }
    });

    // Transform edges into the API's "edges" format.
    const transformedEdges = localEdges.map((edge, index) => {
      const sourceNode = localNodes.find((n) => n.id === edge.source);
      const targetNode = localNodes.find((n) => n.id === edge.target);
      return {
        edge_id: `edge_id_${index + 1}`,
        source_id: edge.source,
        target_id: edge.target,
        source_node_id: transformHandle(sourceNode, edge.sourceHandle),
        target_node_id: transformHandle(targetNode, edge.targetHandle),
      };
    });

    // Final formatted data for the API.
    let formattedData = {
      api_id: "this is api id",
      filename: "makegame",
      type: "post",
      elements: elements,
      edges: transformedEdges,
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
