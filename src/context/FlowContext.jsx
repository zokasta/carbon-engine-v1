import { createContext, useContext, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';

const FlowContext = createContext({});

export function useFlowContext() {
  return useContext(FlowContext);
}

// Load initial state from localStorage if available
const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export function FlowProvider({ children }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    loadFromLocalStorage('nodes', [
      { id: 'input_node', position: { x: 200, y: 200 }, type: 'Element', data: { id: '1' } },
      { id: 'output_node_1', position: { x: 800, y: 100 }, type: 'Output', data: { id: '2' } },
      { id: 'output_node_2', position: { x: 800, y: 300 }, type: 'Output', data: { id: '3' } },
    ])
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(loadFromLocalStorage('edges', []));

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Save nodes and edges to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('nodes', JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('edges', JSON.stringify(edges));
  }, [edges]);

  const values = {
    nodes,
    edges,
    setNodes,  // Include setNodes in the context
    setEdges,  // Include setEdges in the context
    onNodesChange,
    onEdgesChange,
    onConnect,
  };

  return <FlowContext.Provider value={values}>{children}</FlowContext.Provider>;
}
