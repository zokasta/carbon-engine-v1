import { useState } from "react";

export default function TextArea({
  className = "",
  placeholder = "",
  onChange = () => {},
  defaultValue = "",
}) {
    const [value,setValue]=useState(defaultValue)
  return (
    <textarea
      className={`w-full min-h-10 h-10 bg-[#f4f6f8] border-[1px] border-gray-300 rounded-sm outline-none focus:border-orange-500 px-2 focus:border-[1.75px]  ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={e=>{onChange(e);setValue(e.target.value)}}
    ></textarea>
  );
}
