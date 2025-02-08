import { useMemo, useCallback, useRef, useState } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import { useFlowContext } from "../../context/FlowContext";
import { useAppContext } from "../../context/Context";
import "reactflow/dist/style.css";
import React from "react";

import CustomEdge from "../../components/CustomEdge";
import Element from "../../components/Element";
import Navbar from "../../Pages/Navbar/Navbar";
import Sidebar from "../../Pages/Sidebar/Sidebar";
import PluginElement from "../../components/PluginElement";
import ElementIcon from "../../assets/SVG/ElementIcon";
import DatabaseIcon from "../../assets/SVG/DatabaseIcon";
import SettingIcon from "../../assets/SVG/SettingIcon";
import SidebarMenu from "../Sidebar/SidebarMenu";
import SidebarSettings from "../Sidebar/SidebarSettings";
import SettingPage from "../Settings/SettingPage";

export default function Home() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
  } = useFlowContext();
  const { state, dispatch } = useAppContext();

  // Register node types
  const nodeTypes = useMemo(
    () => ({
      Input: Element,
      Output: Element,
      Plugin: PluginElement,
    }),
    []
  );

  // Register custom edge type
  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  // Adjust grid layout depending on plugin state
  const gridStyles = {
    display: "grid",
    gridTemplateColumns: state.plugin ? "170px 1fr" : "0px 1fr",
  };

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Function to delete an edge by id
  const handleDeleteEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  // Sidebar items list
  const sidebarList = [
    { title: "elements", target: "elements", icon: ElementIcon },
    { title: "database", target: "database", icon: DatabaseIcon },
    { title: "settings", target: "settings", icon: SettingIcon },
  ];

  // onDrop callback for drag and drop functionality
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("nodeType");
      const nodeData = JSON.parse(event.dataTransfer.getData("nodeData"));
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      if (reactFlowInstance) {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        if (nodeType) {
          const newNode = {
            id: `${nodeType}_${new Date().getTime()}`,
            type: nodeType,
            position,
            title: "this is ",
            data: { ...nodeData, items: nodeData.items || [] },
          };

          setNodes((nds) => [...nds, newNode]);
        }
      }
    },
    [reactFlowInstance, setNodes]
  );

  // onDragOver callback for drag and drop
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Navbar nodes={nodes} edges={edges} />
      <div className="h-[calc(100vh-40px)]">
        <div className="w-12 z-[2] h-full bg-[#fbf8f6] float-left border-r-[1.75px] border-[#eee5db]">
          <ul>
            {sidebarList.map((list, index) => (
              <li className="flex items-center justify-center" key={index}>
                <list.icon
                  className={`w-full h-12 py-2 cursor-pointer ${
                    state.plugin === list.target
                      ? "bg-[#660479] text-white"
                      : "text-[#660479]"
                  }`}
                  onClick={() =>
                    dispatch({
                      type: "plugin",
                      payload: { plugin: list.target },
                    })
                  }
                />
              </li>
            ))}
          </ul>
        </div>
        <div
          className="w-[100vw-48px] duration-200 h-[calc(100vh-40px)]"
          style={gridStyles}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {state.plugin === "database" && <SidebarMenu />}
          {state.plugin === "elements" && <Sidebar />}
          {state.plugin === "settings" && <SidebarSettings />}
          {state.plugin === "settings" && <SettingPage />}
          {state.plugin === "elements" && (
            <div ref={reactFlowWrapper} style={{ height: "100%" }}>
              <ReactFlow
                nodes={nodes}
                edges={edges.map((edge) => ({
                  ...edge,
                  type: "custom",
                  data: { onDeleteEdge: handleDeleteEdge },
                  // Normalize handle values to strings to avoid rendering issues
                  sourceHandle: String(edge.sourceHandle),
                  targetHandle: String(edge.targetHandle),
                }))}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={(params) =>
                  onConnect({
                    ...params,
                    type: "custom",
                    data: { onDeleteEdge: handleDeleteEdge },
                  })
                }
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onInit={setReactFlowInstance}
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
          )}
        </div>
      </div>
    </div>
  );
}
