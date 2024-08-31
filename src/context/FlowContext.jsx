
import { createContext, useContext,useCallback, useEffect} from 'react';
import {
    useNodesState,
    useEdgesState,
    addEdge,
  } from 'reactflow';



const FlowContext = createContext({});

export function useFlowContext() {
    return useContext(FlowContext);
}


const initialNodes = [
    { id: 'input_node', position: { x: 200, y: 200 },type:'Element', data: { id:'1' } },
    { id: 'output_node_1', position: { x: 800, y:200 },type:'Output', data: { id:'2' } },
  ];
  const initialEdges = []
    // { id: 'e1-2', source: '1', target: '2' }



export function FlowProvider ({ children }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    const values = {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect
    }
return (
    <FlowContext.Provider value={values}>
        {children}
    </FlowContext.Provider>
    )
};
