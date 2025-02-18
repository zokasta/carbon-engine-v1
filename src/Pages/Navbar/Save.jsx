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

  // NEW: BFS function to assign a mapping number (map_no) to nodes
  const getBFSMapping = (nodes, edges) => {
    const adjacencyList = new Map();

    // Create an adjacency list from edges
    edges.forEach((edge) => {
      if (!adjacencyList.has(edge.source)) {
        adjacencyList.set(edge.source, []);
      }
      adjacencyList.get(edge.source).push(edge.target);
    });

    // Start with all Input nodes
    const startNodes = nodes.filter((n) => n.type === "Input").map((n) => n.id);
    const visited = new Set();
    const order = [];
    const queue = [...startNodes];
    let mapNo = 1;

    // Standard BFS: assign map_no as we traverse
    while (queue.length > 0) {
      const current = queue.shift();
      if (!visited.has(current)) {
        visited.add(current);
        order.push({ nodeId: current, mapNo: mapNo++ });
        const neighbors = adjacencyList.get(current) || [];
        neighbors.forEach((nbr) => {
          if (!visited.has(nbr)) {
            queue.push(nbr);
          }
        });
      }
    }

    // For nodes that were not reached via BFS (disconnected nodes)
    nodes.forEach((n) => {
      if (!visited.has(n.id)) {
        order.push({ nodeId: n.id, mapNo: mapNo++ });
      }
    });

    return order;
  };

  // Helper to transform a handle from a node into our desired node_id format
  const transformHandle = (node, handle) => {
    if (!node) return handle;
    if (node.type === "Plugin") {
      // For Plugin nodes, look up the structure's node to decide the mapping
      const structureNodes = node.data.structure?.nodes || [];
      const found = structureNodes.find((item) => item.id === handle);
      if (found) {
        if (found.handleType === "target") return "plugin_input";
        if (found.handleType === "source") return "plugin_output";
        if (found.handleType === "error") return "plugin_error";
      }
      return handle;
    } else if (node.type === "Input" || node.type === "Output") {
      // For Input/Output nodes, use the node's inner fields (data.nodes)
      const fields = node.data.nodes || [];
      const field = fields.find((f) => f.id === handle);
      if (field) {
        const suffix = node.type === "Input" ? "input_node" : "output_node";
        return `${field.title.toLowerCase()}_${suffix}`;
      }
    }
    return `${handle}_node`;
  };

  const showData = async () => {
    console.log("Nodes:", JSON.stringify(localNodes, null, 2));
    console.log("Edges:", JSON.stringify(localEdges, null, 2));

    // Generate BFS mapping for nodes
    const bfsMapping = getBFSMapping(localNodes, localEdges);
    // Create a quick lookup for mapping numbers by node id
    const mappingDict = {};
    bfsMapping.forEach((item) => {
      mappingDict[item.nodeId] = item.mapNo;
    });

    // Transform each node from context into the API "elements" format.
    const elements = localNodes
      .map((node) => {
        if (node.type === "Plugin") {
          // For Plugin nodes, use the provided structure
          const pluginNodes =
            node.data.structure?.nodes?.map((item) => ({
              handel: item.handleType,
              node_id: item.id,
            })) || [];
          return {
            element_id: node.data.name.toLowerCase().replace(/\s+/g, "_"),
            name: node.data.name,
            type: "plugin",
            nodes: pluginNodes,
            map_no: mappingDict[node.id] || null,
          };
        } else if (node.type === "Input" || node.type === "Output") {
          // For Input/Output nodes, map the inner fields (node.data.nodes)
          const suffix = node.type === "Input" ? "input_node" : "output_node";
          const fields = (node.data.nodes || []).map((field) => ({
            node_id: `${field.title.toLowerCase()}_${suffix}`,
            display_name: field.title,
          }));
          return {
            element_id: node.id,
            name: node.data.title,
            type: suffix,
            nodes: fields,
            map_no: mappingDict[node.id] || null,
          };
        }
        return null;
      })
      .filter((element) => element !== null);

    // Transform edges into the API "edges" format and assign a sequential map_no
    const transformedEdges = localEdges.map((edge, index) => {
      const sourceNode = localNodes.find((n) => n.id === edge.source);
      const targetNode = localNodes.find((n) => n.id === edge.target);
      return {
        edge_id: `edge_id_${index + 1}`,
        source_id: edge.source,
        target_id: edge.target,
        source_node_id: transformHandle(sourceNode, edge.sourceHandle),
        target_node_id: transformHandle(targetNode, edge.targetHandle),
        map_no: index + 1, // Sequential mapping number for edges
      };
    });

    // Final formatted data for the API.
    const formattedData = {
      api_id: "this is api id",
      filename: "makegame",
      type: "post",
      elements,
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
