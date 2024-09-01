import "reactflow/dist/style.css";
import ReactFlow, { Controls, Background } from "reactflow";
import { useFlowContext } from "./context/FlowContext";
import React, { useMemo } from "react";
import Element from "./components/Element";
import Navbar from "./Pages/Navbar/Navbar";
import Output from "./components/Output";
import CustomEdge from "./components/CustomEdge";

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlowContext();

  // Memoize nodeTypes and edgeTypes
  const nodeTypes = useMemo(() => ({
    Element: Element,
    Output: Output,
  }), []);

  const edgeTypes = useMemo(() => ({
    custom: CustomEdge,
  }), []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Navbar nodes={nodes} edges={edges} />
      <div className="h-[calc(100vh-40px)]">
        <div className="w-14 h-full bg-[#fbf8f6] float-left border-r-[1.75px] border-[#eee5db]"></div>
        <div className="w-[calc(100%-56px)] h-full float-right">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            <Controls />
            <Background
              variant="dots"
              gap={25}
              size={2}
              className="bg-[#fbf8f6] h-20"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
