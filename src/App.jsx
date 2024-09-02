import React, { useMemo } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowContext } from './context/FlowContext';
import CustomEdge from './components/CustomEdge';
import Element from './components/Element';
import Output from './components/Output';
import Navbar from './Pages/Navbar/Navbar';

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setEdges } = useFlowContext();

  // Memoize nodeTypes and edgeTypes
  const nodeTypes = useMemo(
    () => ({
      Element: Element,
      Output: Output,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  // Function to handle edge deletion
  const handleDeleteEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Navbar nodes={nodes} edges={edges} />
      <div className="h-[calc(100vh-40px)]">
        <div className="w-14 h-full bg-[#fbf8f6] float-left border-r-[1.75px] border-[#eee5db]"></div>
        <div className="w-[calc(100%-56px)] h-full float-right">
          <ReactFlow
            nodes={nodes}
            edges={edges.map((edge) => ({
              ...edge,
              type: 'custom', // Ensure all edges are using the custom edge
              data: { onDeleteEdge: handleDeleteEdge },
            }))}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={(params) =>
              onConnect({ ...params, type: 'custom', data: { onDeleteEdge: handleDeleteEdge } })
            }
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            <Controls />
            <Background variant="dots" gap={25} size={2} className="bg-[#fbf8f6] h-20" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
