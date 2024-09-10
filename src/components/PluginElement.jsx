import React, { useRef, useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import Edit from "../assets/SVG/edit";
import Save from "../assets/SVG/Save";
import Delete from "../assets/SVG/Delete";

export default function PluginElement({
  data,
  position = Position.Right,
  format = [
    { id: "username_input", title: "username", type: "source" },
    { id: "password_input", title: "password", type: "source" },
  ],
  title = "Input",
  typeFormat = "input",
}) {
  const [defaultFormat, setDefaultFormat] = useState(format);

  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const inputRefs = useRef([]); // Ref to manage multiple input elements

  // Handle keydown events for Ctrl + S
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent the default browser save action
        setIsEditing(false); // Set editing mode to false
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEditTitle = (index, newTitle) => {
    setDefaultFormat((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, title: newTitle, id: `${newTitle}_${typeFormat}` }
          : item
      )
    );

    console.log(defaultFormat);
    console.log(typeFormat);
  };

  const handleEvent = () => {
    setIsEditing(true);
    const newElementIndex = defaultFormat.length; // Get the index of the new element
    const newElement = {
      id: `${""}_${typeFormat}`,
      title: "",
      type: "source",
    };
    setDefaultFormat((prev) => [...prev, newElement]);
    // inputRefs.current[newElementIndex] &&

    setTimeout(() => {
      inputRefs.current[newElementIndex].focus();
    }, 100);
  };

  const handleInputBlur = (index) => {
    if (inputRefs.current[index]) {
      const newTitle = inputRefs.current[index].value;
      handleEditTitle(index, newTitle);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const deleteElement = (id) => {
    setDefaultFormat(
      (prev) => prev.filter((item) => item.id !== id) // Filter out the element with the matching id
    );
  };

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
