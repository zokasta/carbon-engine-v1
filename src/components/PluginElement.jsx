import React, { useRef, useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

export default function PluginElement({
  data,
}) {

  return (
    <div className=" rounded-md overflow-hidden border-solid border-[#e5e7eb] border-[1.5px] bg-white shadow-md pr-5">
      <div className="p-2 h-10 bg-white z-10 text-[#0f172a] font-bold">
        <h1 className="">{data.name}</h1>
      
      </div>
      <Handle
          type="target"
          position={Position.Left}
          id="h1"
          style={{ top: 22 }}
          className="w-[10px] h-[10px] bg-black"
        />
         <Handle
          type="source"
          position={Position.Right}
          id="h2"
          style={{ top: 22 }}
          className="w-[10px] h-[10px] bg-black"
        />
    </div>
  );
}
