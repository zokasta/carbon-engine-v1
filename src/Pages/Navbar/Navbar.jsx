import React from "react";
import Axios from "../../Database/Axiso";
import Delete from "../../assets/SVG/Delete";

export default function Navbar({ nodes = [], edges = [] }) {
  const showData = async () => {
    let ans = nodes.map((node) => {
      console.log(JSON.stringify(edges,null,2));
      console.log(JSON.stringify(nodes, null, 2));

      let nodeStructure = {
        id: node.id,
        structure: {},
      };

      // Filter edges where the current node is the source
      edges
        .filter((edge) => edge.source === node.id)
        .forEach((edge) => {
          const sourceField = edge.sourceHandle?.replace("_input", "") || ""; // Extract field name
          const targetField = edge.targetHandle?.replace("_output", "") || ""; // Extract field name

          if (!nodeStructure.structure[sourceField]) {
            nodeStructure.structure[sourceField] = { fields: [] };
          }

          nodeStructure.structure[sourceField].fields.push({
            target: edge.target,
            location: targetField,
          });
        });

      // If the node is an output node or has no outgoing edges, default to "none"
      if (Object.keys(nodeStructure.structure).length === 0) {
        nodeStructure.structure = {
          email: { fields: [{ target: "none", location: "none" }] },
          password: { fields: [{ target: "none", location: "none" }] },
        };
      }

      return nodeStructure;
    });

    console.log("Processed Structure:");
    ans = { file: "makegame", format: ans };
    console.log(JSON.stringify(ans, null, 2));

    try {
      const response = await Axios.post("/generate-api/", ans);
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const deleteData = () => {
    const key = "edges"; // Replace 'yourKey' with the actual key you want to delete
    localStorage.removeItem("edges");
    localStorage.removeItem("nodes");
    console.log(`${key} removed from localStorage`);
    // Optionally, update the state or UI after deletion
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
