import React, { useRef, useState, useEffect, useCallback } from "react";
import { Handle, Position } from "reactflow";
import Edit from "../assets/SVG/edit";
import Save from "../assets/SVG/Save";
import Delete from "../assets/SVG/Delete";

export default function Element({
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
  const [defaultFormatCopy, setDefaultFormatCopy] = useState(format);

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

  const handleEditTitle = useCallback(
    (index, newTitle) => {
      setDefaultFormatCopy((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, title: newTitle, id: `${newTitle}_${typeFormat}` }
            : item
        )
      );
    },
    [typeFormat]
  );

  const handleEvent = () => {
    setIsEditing(true);
    const newElementIndex = defaultFormat.length; // Get the index of the new element
    const newElement = {
      id: `${Math.random() * 10000}_${typeFormat}`,
      title: "",
      type: "source",
    };

    setDefaultFormatCopy((prev) => [...prev, newElement]);
    setDefaultFormat((prev) => [...prev, newElement]);

    setTimeout(() => {
      if (inputRefs.current[newElementIndex]) {
        inputRefs.current[newElementIndex].focus();
      }
    }, 100);
  };

  const handleInputBlur = (index) => {
    if (inputRefs.current[index]) {
      const newTitle = inputRefs.current[index].value;
      handleEditTitle(index, newTitle);
    }
  };

  const handleInputChange = (index, value) => {
    handleEditTitle(index, value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };
  
  const deleteElement = (id) => {
    // Update both states in one call
    setDefaultFormat((prev) => {
      const updatedFormat = prev.filter((item) => item.id !== id);
      setDefaultFormatCopy(updatedFormat);
      return updatedFormat;
    });
  };

  return (
    <div className="w-48 rounded-md overflow-hidden border-solid border-[#e5e7eb] border-[1.5px] h-auto bg-white shadow-md">
      <div className="p-2 h-10 bg-[#fbf8f6] z-10 text-[#0f172a] border-b-[1.5px] border-[#e5e7eb] font-bold">
        <h1 className="float-left">{title}</h1>

        {!isEditing ? (
          <Edit className="float-right mt-[6px]" onClick={handleEditClick} />
        ) : (
          <Save
            className="float-right mt-[6px] text-blue-400 hover:text-blue-500"
            onClick={handleEditClick}
          />
        )}
      </div>
      <div className="p-3">
        {defaultFormat.map((list, index) => (
          <div
            key={defaultFormatCopy[index].id}
            className="flex flex-row justify-between py-1 bg-white"
          >
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={defaultFormatCopy[index].title}
              readOnly={!isEditing}
              className={`flex-1 transition-all h-7 px-[3px] ${
                isEditing ? "bg-[#fbf8f6] border-[1.75px] border-[#ffe2ce]" : ""
              } w-[calc(100%-20px)] outline-none`}
              onBlur={() => handleInputBlur(index)}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <div
              onClick={() => deleteElement(defaultFormatCopy[index].id)}
              className={`w-5 h-7 transition-all flex items-center justify-center ${
                isEditing
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } cursor-pointer`}
            >
              <Delete />
            </div>
            <Handle
              type={defaultFormatCopy[index].type}
              position={position}
              id={defaultFormatCopy[index].id}
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
