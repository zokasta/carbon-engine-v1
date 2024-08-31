import React from "react";
import Axios from "../../Database/Axiso";

export default function Navbar({ nodes = [], edges = [] }) {
  const showData = async () => {
    let ans = nodes.map((node) => {
      let nodeStructure = {
        id: node.id,
        structure: {},
      };

      // Filter edges where the current node is the source
      edges
        .filter((edge) => edge.source === node.id)
        .forEach((edge) => {
          const sourceField = edge.sourceHandle.replace("_input", ""); // Extract field name
          const targetField = edge.targetHandle.replace("_output", ""); // Extract field name

          nodeStructure.structure[sourceField] = {
            target: edge.target,
            location: targetField,
          };
        });

      // If the node is an output node or has no outgoing edges, default to "none"
      if (Object.keys(nodeStructure.structure).length === 0) {
        nodeStructure.structure = {
          email: { target: "none", location: "none" },
          password: { target: "none", location: "none" },
        };
      }

      return nodeStructure;
    });

    console.log("Processed Structure:");
    ans = { file: "makegame", format: ans };
    console.log(JSON.stringify(ans, null, 2));
    const response = await Axios.post('/generate-api/',ans)
    console.log(response.data);
  };

  return (
    <div className="w-screen z-20 h-10 absolute top-0 left-0 bg-[#660479]">
      <button
        className="m-1 h-8 flex items-center justify-center w-20 bg-[#ffe4a9] hover:bg-[#ffdc8f] rounded-md shadow-md text-[#660479] font-semibold float-right"
        onClick={showData}
      >
        Save
      </button>
    </div>
  );
}
