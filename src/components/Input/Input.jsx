import { useState } from "react";
import { Password } from "./Password";
import CopyInput from "./CopyInput";

export default function Input({
  id = "",
  defaultValue = "",
  type = "text",
  className = "",
  placeholder = "",
  valid = false,
  onChange = (e) => {},
  disable = false,
  name = "name",
  options = [],
  onEnter = () => {},
}) {
  const [value, setValue] = useState(defaultValue);
  return type === "password" ? (
    <Password
      onChange={onChange}
      className={className}
      defaultValue={defaultValue}
      placeholder={placeholder}
      name={name}
    />
  ) : type === "textarea" ? (
    <textarea
      className={`w-full min-h-10 h-10 bg-[#f4f6f8] border-[1px] border-gray-300 rounded-sm outline-none focus:border-orange-500 px-2 focus:border-[1.75px]  ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e);
      }}
    ></textarea>
  ) : type === "select" ? (
    <select
      id={id}
      className={`w-full h-10 bg-[#f4f6f8] border-[1px] border-gray-300 rounded-sm outline-none focus:border-orange-500 px-2 focus:border-[1.9px] ${className}`}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e);
      }}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </select>
  ) : type === "selectFromApi" ? (
    ""
  ) : type === "copy" ? (
    <CopyInput
      className={className}
      defaultValue={defaultValue}
      placeholder={placeholder}
      name={name}
    />
  ) : (
    <input
      id={id}
      type={type}
      className={`w-full h-10 bg-[#f4f6f8] border-[1px] ${
        valid ? "border-gray-300" : "border-gray-300"
      } rounded-sm outline-none focus:border-[#660479] px-2 focus:border-[1.9px] ${className}`}
      value={value}
      disabled={disable}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter(e);
        }
      }}
      placeholder={placeholder}
      name={name}
    />
  );
}
