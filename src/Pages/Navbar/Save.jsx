import React, { useEffect, useState } from "react";
import Axios from "../../Database/Axios";
import { useFlowContext } from "../../context/FlowContext";

export default function Save() {
  const { nodes, edges } = useFlowContext();
  const [localNodes, setLocalNodes] = useState(nodes);
  const [localEdges, setLocalEdges] = useState(edges);

  useEffect(() => {
    setLocalNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    setLocalEdges(edges);
  }, [edges]);

  const getBFSMapping = (nodes, edges) => {
    const adjacencyList = new Map();

    edges.forEach((edge) => {
      if (!adjacencyList.has(edge.source)) {
        adjacencyList.set(edge.source, []);
      }
      adjacencyList.get(edge.source).push(edge.target);
    });

    const startNodes = nodes.filter((n) => n.type === "Input").map((n) => n.id);
    const visited = new Set();
    const order = [];
    const queue = [...startNodes];
    let mapNo = 1;

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

    nodes.forEach((n) => {
      if (!visited.has(n.id)) {
        order.push({ nodeId: n.id, mapNo: mapNo++ });
      }
    });

    return order;
  };

  const transformHandle = (node, handle) => {
    if (!node) return handle;
    if (node.type === "Plugin") {
      const structureNodes = node.data.structure?.nodes || [];
      const found = structureNodes.find((item) => item.id === handle);
      if (found) {
        if (found.handleType === "target") return "plugin_input";
        if (found.handleType === "source") return "plugin_output";
        if (found.handleType === "error") return "plugin_error";
      }
      return handle;
    } else if (node.type === "Input" || node.type === "Output") {
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

    const bfsMapping = getBFSMapping(localNodes, localEdges);

    const mappingDict = {};
    bfsMapping.forEach((item) => {
      mappingDict[item.nodeId] = item.mapNo;
    });

    const elements = localNodes
      .map((node) => {
        if (node.type === "Plugin") {
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

    const transformedEdges = localEdges.map((edge, index) => {
      const sourceNode = localNodes.find((n) => n.id === edge.source);
      const targetNode = localNodes.find((n) => n.id === edge.target);
      return {
        edge_id: `edge_id_${index + 1}`,
        source_id: edge.source,
        target_id: edge.target,
        source_node_id: transformHandle(sourceNode, edge.sourceHandle),
        target_node_id: transformHandle(targetNode, edge.targetHandle),
        map_no: index + 1,
      };
    });

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
