import { Position } from "reactflow";
import { createContext, useContext, useCallback, useEffect } from "react";
import { useNodesState, useEdgesState, addEdge } from "reactflow";

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
    loadFromLocalStorage("nodes", [
      {
        id: `input-${new Date().getTime()}`,
        position: { x: 200, y: 200 },
        type: "Input",
        title: "Input Node",
        typeFormat: "input",
        handleType: "source",
        positionHandel: Position.Right,
        data: {
          hint: "this is hint",
          title: "Input Node",
          type: "Input",
          handleType: "source",
          positionHandel: Position.Right,
          nodes: [
            {
              id: `node-out-${new Date().getTime()}`,
              title: "email",
              type: "source",
              handleType: "out", // out, in, error
              hint: "This is hint",
            },
            {
              id: `node-out-${new Date().getTime()+1}`,
              title: "password",
              type: "source",
              handleType: "out",
              hint: "This is hint",
            },
          ],
        },
      },
    ])
  );

  // if we want to add default edges then we can add on [] brackets to get default edges

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    loadFromLocalStorage("edges", [])
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Save nodes and edges to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem("edges", JSON.stringify(edges));
  }, [edges]);

  // Function to update node content by id
  const updateNode = (updatedNode) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === updatedNode.id ? { ...node, data: updatedNode.data } : node
      )
    );
  };

  const values = {
    nodes,
    edges,
    setNodes, // Include setNodes in the context
    setEdges, // Include setEdges in the context
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNode, // Add this line
  };

  return <FlowContext.Provider value={values}>{children}</FlowContext.Provider>;
}
