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
        id: "input_node",
        position: { x: 200, y: 200 },
        type: "Input", // Add type field here
        typeFormat: "input",
        data: {
          id: "1",
          title: "Input Node",
          type: "Input",
          handleType: "source",
          positionHandel: Position.Right,
          fields: [
            {
              id: Math.random(),
              handle: "email_input",
              title: "email",
              type: "source",
            },
            {
              id: Math.random(),
              handle: "password_input",
              title: "password",
              type: "source",
            },
          ],
        },
      },
      {
        id: "output_node_1",
        position: { x: 800, y: 200 },
        type: "Output", // Add type field here
        typeFormat: "output",
        data: {
          id: "2",
          title: "Output Node",
          type: "Output",
          handleType: "target",
          positionHandel: Position.Left,
          fields: [
            {
              id: Math.random(),
              handle: "email_output",
              title: "email",
              type: "target",
            },
            {
              id: Math.random(),
              handle: "password_output",
              title: "password",
              type: "target",
            },
          ],
        }, // Add title and type in the data field
      },
      // {
      //   id: "output_node_2",
      //   position: { x: 800, y: 200 },
      //   type: "Output", // Add type field here
      //   typeFormat: "output",
      //   data: {
      //     id: "3",
      //     title: "Output Node",
      //     type: "Output",
      //     handleType: "target",
      //     positionHandel: Position.Left,
      //     fields: [
      //       {
      //         id: Math.random(),
      //         handle: "email_output",
      //         title: "email",
      //         type: "target",
      //       },
      //       {
      //         id: Math.random(),
      //         handle: "password_output",
      //         title: "password",
      //         type: "target",
      //       },
      //     ],
      //   }, // Add title and type in the data field
      // },
      // {
      //   id: "plugin_node_1",
      //   position: { x: 800, y: 300 },
      //   type: "Plugin", // Add type field here
      //   data: { id: "3", title: "Email Validator", type: "Plugin" }, // Add title and type in the data field
      // },
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
