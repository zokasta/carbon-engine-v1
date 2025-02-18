import { Handle, Position } from "reactflow";

export default function PluginElement({
  data = {
    name: "default Name",
    className: "h-10",
    structure: {
      nodes: [
        {
          id: Math.random(),
          className: "",
          style: { top: 22 },
          positionHandel: Position.Left,
          handleType: "target",
        },
        {
          id: Math.random(),
          className: "",
          style: { top: 22 },
          positionHandel: Position.Right,
          handleType: "source",
        },
        {
          id: Math.random(),
          className: "",
          style: { top: -5 },
          positionHandel: Position.Top,
          handleType: "source",
        },
        {
          id: Math.random(),
          className: "",
          style: { bottom: -5 },
          positionHandel: Position.Bottom,
          handleType: "source",
        },
      ],
    },
  },
}) {
  return (
    <div
      className={`rounded-md flex items-center overflow-hidden border-solid border-[#e5e7eb] border-[1.5px] bg-white shadow-md pr-5 ${data.className}`}
    >
      <div className="p-2 bg-white z-10 text-[#0f172a] font-bold">
        <h1 className="">{data.name}</h1>
      </div>
      {data.structure.nodes.map((list) => (
        <Handle
          key={list.id} // Add key here!
          type={list.handleType}
          position={list.positionHandel}
          id={list.id}
          style={list.style}
          className={`w-[10px] h-[10px] bg-black ${list.className}`}
        />
      ))}
    </div>
  );
}
