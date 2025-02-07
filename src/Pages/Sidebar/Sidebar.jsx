import React from 'react';
import { useDnD } from '../../context/DnDContext';

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (e, nodeType, nodeData) => {
    e.dataTransfer.setData('nodeType', nodeType);
    e.dataTransfer.setData('nodeData', JSON.stringify(nodeData));
    e.dataTransfer.effectAllowed = 'move';
    setType(nodeType);
  };

  return (
    <div className="min-w-[170px] bg-[#fbf8f6] float-left border-r-[1.75px] border-[#eee5db] grid-cols-1 p-1 overflow-hidden">
      <div
        className="border-[1.75px] bg-white border-[#eee5db] h-10 mb-2 cursor-pointer flex items-center justify-center"
        draggable={true}
        onDragStart={(e) => onDragStart(e, 'Plugin', { name: 'Email Validator',id: Math.random()})}
      >
        Email Validator
      </div>
      <div
        className="border-[1.75px] border-[#eee5db] h-10 mb-2 cursor-pointer flex items-center justify-center"
        draggable={true}
        onDragStart={(e) => onDragStart(e, 'Output', { label: 'Output Node', value: 42 })}
      >
        Output Node
      </div>
      <div
        className="border-[1.75px] border-[#eee5db] h-10 mb-2 cursor-pointer flex items-center justify-center"
        draggable={true}
        onDragStart={(e) => onDragStart(e, 'Input', { label: 'Output Node', value: 42 })}
      >
        Input
      </div>
      {/* Add more draggable items as needed */}
    </div>
  );
}
