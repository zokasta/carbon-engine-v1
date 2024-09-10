
import Delete from '../../assets/SVG/Delete'
import Axios from '../../Database/Axiso'


export default function Navbar({ nodes = [], edges = [] }) {
  const showData = async () => {
    // Dynamically sort nodes: 'Input' types come first, 'Output' types come last
    const sortedNodes = [...nodes].sort((a, b) => {
      if (a.type === 'Input' && b.type === 'Output') return -1;
      if (a.type === 'Output' && b.type === 'Input') return 1;
      return 0;
    });

    // Dynamically process nodes and edges to form the structure
    let ans = sortedNodes.map((node) => {
      let nodeStructure = {
        id: node.id,
        type: node.type,  // Add the node type to the structure
        structure: {},
      };

      // For each node, check its outgoing connections (edges)
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

      // Handle cases where nodes have no outgoing edges (default to "none")
      if (Object.keys(nodeStructure.structure).length === 0) {
        nodeStructure.structure = {
          email: { fields: [{ target: "none", location: "none" }] },
          password: { fields: [{ target: "none", location: "none" }] },
        };
      }

      return nodeStructure;
    });

    // Final output format with file and dynamic structure
    console.log("Processed Structure:");
    ans = { file: "makegame", format: ans };
    console.log(JSON.stringify(ans, null, 2));

    // Make the dynamic API request
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
