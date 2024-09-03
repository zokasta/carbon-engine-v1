

export default function ReactFlow(){
    return(
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
    )
}