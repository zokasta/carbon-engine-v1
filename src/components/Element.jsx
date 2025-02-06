import React, { useRef, useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import Edit from "../assets/SVG/Edit";
import Save from "../assets/SVG/Save";
import Delete from "../assets/SVG/Delete";

export default function Element({
  data = {
    handleType: "source",
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
    positionHandel: Position.Right,
  },
  typeFormat = "input",
}) {
  const [defaultFormat, setDefaultFormat] = useState(data.fields || []); // Ensure fields is always an array
  const [isEditing, setIsEditing] = useState(false);
  const inputRefs = useRef([]);
  const items = data?.items || [];

  // Handle keydown events for Ctrl + S
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEditTitle = (index, newTitle) => {
    setDefaultFormat((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, title: newTitle, handle: `${newTitle}_${typeFormat}` } : item
      )
    );
  };

  const handleEvent = () => {
    setIsEditing(true);
    const newElementIndex = defaultFormat.length;
    const newElement = {
      id: Math.random(),
      handle: `${'new'+Math.random()  }_${typeFormat}`,
      title: "",
      type: data.handleType,
    };
    setDefaultFormat((prev) => [...prev, newElement]);

    setTimeout(() => {
      inputRefs.current[newElementIndex]?.focus();
    }, 100);
  };

  const handleInputBlur = (index) => {
    if (inputRefs.current[index]) {
      const newTitle = inputRefs.current[index].value;
      handleEditTitle(index, newTitle);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const deleteElement = (id) => {
    setDefaultFormat((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-48 rounded-md overflow-hidden border-solid border-[#e5e7eb] border-[1.5px] h-auto bg-white shadow-md">
      <div className="p-2 h-10 bg-[#fbf8f6] z-10 text-[#0f172a] border-b-[1.5px] border-[#e5e7eb] font-bold">
        <h1 className="float-left">{data.title}</h1>

        {!isEditing ? (
          <Edit className="float-right mt-[6px]" onClick={handleEditClick} />
        ) : (
          <Save className="float-right mt-[6px] text-blue-400 hover:text-blue-500" onClick={handleEditClick} />
        )}
      </div>
      <div className="p-3">
        {defaultFormat?.map((list, index) => (
          <div key={list.id} className="flex flex-row justify-between py-1 bg-white">
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={list.title}
              readOnly={!isEditing}
              className={`flex-1 transition-all h-7 px-[3px] ${isEditing ? "bg-[#fbf8f6] border-[1.75px] border-[#ffe2ce]" : ""} w-[calc(100%-20px)] outline-none`}
              onBlur={() => handleInputBlur(index)}
              onChange={(e) => handleEditTitle(index, e.currentTarget.value)}
            />
            <div
              onClick={() => deleteElement(list.id)}
              className={`w-5 h-7 transition-all flex items-center justify-center ${isEditing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} cursor-pointer`}
            >
              <Delete />
            </div>
            <Handle
              type={list.type}
              position={data.positionHandel}
              id={list.handle}
              style={{ top: 74 + 36 * index }}
              className="w-[10px] h-[10px] bg-black"
            />
          </div>
        ))}
        <button
          className="w-full h-10 bg-[#660479] text-white rounded-md shadow-md mt-3"
          onClick={handleEvent}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
