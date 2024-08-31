import React from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { useFlowContext } from "./context/FlowContext";
// import { Output } from "./components/Output";
// import RotationNode from "./components/Rotation";
// import ScaleNode from "./components/Scale";
import Element from "./components/Element";
import Navbar from "./Pages/Navbar/Navbar";
import Output from "./components/Output";
const nodeTypes = {
  Element: Element,
  Output: Output,
};

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowContext();


  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Navbar nodes={nodes} edges={edges} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background variant="dots" gap={25} size={2} className="bg-[#fbf8f6]" />
      </ReactFlow>
    </div>
  );
}
