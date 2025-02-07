
import { Handle, Position } from "reactflow";

export default function PluginElement({ data }) {
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
      <Handle
        type="source"
        position={Position.Top}
        id="plugin-error-1"
        style={{ top: -5 }}
        className="w-[10px] h-[10px] bg-red-600"
      />
       <Handle
        type="source"
        position={Position.Bottom}
        id="plugin-error-2"
        style={{ bottom: -6 }}
        className="w-[10px] h-[10px] bg-red-600"
      />
    </div>
  );
}
