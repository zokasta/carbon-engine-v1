import React from "react";
import { useDnD } from "../../context/DnDContext";
import { Position } from "reactflow";

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (e, nodeType, nodeData) => {
    e.dataTransfer.setData("nodeType", nodeType);
    e.dataTransfer.setData("nodeData", JSON.stringify(nodeData));
    e.dataTransfer.effectAllowed = "move";
    setType(nodeType);
  };

  const elements = [
    {
      name: "Email Validator",
      type: "Plugin",
      structure: {
        nodes: [
          {
            id:`node-in-${new Date().getTime()}`,
            className: "",
            style: { top: 22 },
            positionHandel: Position.Left,
            handleType: "target",
          },
          {
            id:`node-out-${new Date().getTime()}`,
            className: "",
            style: { top: 22 },
            positionHandel: Position.Right,
            handleType: "source",
          },
          {
            id:`node-out-error-${new Date().getTime()}`,
            className: "bg-red-500",
            style: { top: -5 },
            positionHandel: Position.Top,
            handleType: "source",
          },
          {
            id:`node-out-error-${new Date().getTime()+1}`,
            className: "bg-red-500",
            style: { bottom: -5 },
            positionHandel: Position.Bottom,
            handleType: "source",
          },
        ],
      },
    },
    {
      name: "Password Validator",
      type: "Plugin",
      structure: {
        nodes: [
          {
            id:`node-in-${new Date().getTime()}`,
            className: "",
            style: { top: 22 },
            positionHandel: Position.Left,
            handleType: "target",
          },
          {
            id:`node-out-${new Date().getTime()}`,
            className: "",
            style: { top: 22 },
            positionHandel: Position.Right,
            handleType: "source",
          },
          {
            id:`node-out-error-${new Date().getTime()}`,
            className: "bg-red-500",
            style: { top: -5 },
            positionHandel: Position.Top,
            handleType: "source",
          },
          {
            id:`node-out-error-${new Date().getTime()+1}`,
            className: "bg-red-500",
            style: { bottom: -5 },
            positionHandel: Position.Bottom,
            handleType: "source",
          },
        ],
      },
    },
    {
      name: "Message",
      type: "Plugin",
      structure: {
        nodes: [
          {
            id:`node-in-${new Date().getTime()}`,
            className: "",
            style: { top: 22 },
            positionHandel: Position.Left,
            handleType: "target",
          },
          {
            id:`node-out-${new Date().getTime()}`,
            className: "",
            style: { top: 22 },
            positionHandel: Position.Right,
            handleType: "source",
          },
        ],
      },
    },
    {
      name: "Selector",
      type: "Plugin",
      className:"h-20",
      structure: {
        nodes: [
          {
            id:`node-in-${new Date().getTime()}`,
            className: "",
            style: { top: 22 },
            positionHandel: Position.Left,
            handleType: "target",
          },
          {
            id:`node-in-${new Date().getTime()+1}`,
            className: "",
            style: { top: 66 },
            positionHandel: Position.Left,
            handleType: "target",
          },
          {
            id:`node-out-${new Date().getTime()}`,
            className: "",
            style: { top: 40 },
            positionHandel: Position.Right,
            handleType: "source",
          },  
          {
            id:`node-out-error-${new Date().getTime()}`,
            className: "bg-red-500",
            style: { top: -5 },
            positionHandel: Position.Top,
            handleType: "source",
          },
          {
            id:`node-out-error-${new Date().getTime()+1}`,
            className: "bg-red-500",
            style: { bottom: -5 },
            positionHandel: Position.Bottom,
            handleType: "source",
          },
        ],
      },
    },
    {
      id:`node-in-${new Date().getTime()}`,
      title: "Output Node",
      name: "Output Node",
      type: "Output",
      value: 42,
      handleType: "target",
      positionHandel: Position.Left,
    },
    {
      id:`node-out-${new Date().getTime()}`,
      title: "Input Node",
      name: "Input Node",
      type: "Input",
      value: 42,
      handleType: "source",
      positionHandel: Position.Right,
    },
  ];

  return (
    <div className="min-w-[170px] bg-[#fbf8f6] float-left border-r-[1.75px] border-[#eee5db] grid-cols-1 p-1 overflow-hidden">
      {elements.map((list) => (
        <div
          className="border-[1.75px] bg-white border-[#eee5db] h-10 mb-2 cursor-pointer flex items-center justify-center"
          draggable={true}
          onDragStart={(e) =>
            onDragStart(e, list.type,list)
          }
        >
          {list.name}
        </div>
      ))}
      {/* Add more draggable items as needed */}
    </div>
  );
}
