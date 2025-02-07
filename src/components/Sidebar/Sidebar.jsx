import { useMemo, useCallback, useRef, useState } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import { useFlowContext } from "../../context/FlowContext";
import { useAppContext } from "../../context/Context";
import "reactflow/dist/style.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomEdge from "../../components/CustomEdge";
import Element from "../../components/Element";
// import Output from "./components/Output";
import Navbar from "../../Pages/Navbar/Navbar";
import Plugin from "../../assets/SVG/PluginIcon";
import Sidebar from "../../Pages/Sidebar/Sidebar";
import PluginElement from "../../components/PluginElement";
import ElementIcons from "../../assets/SVG/ElementIcon";
import PluginIcon from "../../assets/SVG/PluginIcon";
import APIIcon from "../../assets/SVG/APIIcon";
import DatabaseIcon from "../../assets/SVG/DatabaseIcon";
import SettingIcon from "../../assets/SVG/SettingIcon";

export default function Sidebar() {
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

  const nodeTypes = useMemo(
    () => ({
      Input: Element,
      Output: Element,
      Plugin: PluginElement,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: state.plugin ? "170px 1fr" : "0px 1fr",
  };

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const handleDeleteEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

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
            title:'this is title',
            position,
            data: { ...nodeData, items: nodeData.items || [] }, // Ensure items exists
          };

          setNodes((nds) => [...nds, newNode]);
        }
      }
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const sidebarList = [
    { title: "Elements", icon: ElementIcons },
    { title: "Plugins", icon: PluginIcon },
    { title: "APIs", icon: APIIcon },
    { title: "Models", icon: APIIcon },
    { title: "Database", icon: DatabaseIcon },
    { title: "Settings", icon: SettingIcon },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Navbar nodes={nodes} edges={edges} />
      <div className="h-[calc(100vh-40px)]">
        <div className="w-12 z-[2] h-full bg-[#fbf8f6] float-left border-r-[1.75px] border-[#eee5db]">
          <ul>
            {sidebarList.map((list,index) => (
              <li className="flex items-center justify-center">
                <Plugin
                  className={`w-full h-12 py-2 cursor-pointer ${
                    state.plugin ? "bg-[#660479] text-white" : "text-[#660479]"
                  }`}
                  onClick={() =>
                    dispatch({
                      type: "plugin",
                      payload: { plugin: !state.plugin },
                    })
                  }
                />
              </li>
            ))}
            <li className="flex items-center justify-center">
              <Plugin
                className={`w-full h-12 py-2 cursor-pointer ${
                  state.plugin ? "bg-[#660479] text-white" : "text-[#660479]"
                }`}
                onClick={() =>
                  dispatch({
                    type: "plugin",
                    payload: { plugin: !state.plugin },
                  })
                }
              />
            </li>
            <li className="flex items-center justify-center">
              <Plugin
                className={`w-full h-12 py-2 cursor-pointer ${
                  state.plugin ? "bg-[#660479] text-white" : "text-[#660479]"
                }`}
                onClick={() =>
                  dispatch({
                    type: "plugin",
                    payload: { plugin: !state.plugin },
                  })
                }
              />
            </li>
          </ul>
        </div>
        <div
          className="w-[100vw-48px] duration-200 h-[calc(100vh-40px)]"
          style={gridStyles}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Sidebar />
          <div ref={reactFlowWrapper} style={{ height: "100%" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges.map((edge) => ({
                ...edge,
                type: "custom",
                data: { onDeleteEdge: handleDeleteEdge },
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
              onInit={setReactFlowInstance} // Set the reactFlowInstance here
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
    </div>
  );
}
