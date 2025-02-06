import { useState } from "react";
import Eye from '../../Assets/SVG/Eye'
import EyeSlash from '../../Assets/SVG/EyeSlash'
export default function PasswordInput({
  active = false,
  defaultValue = "",
  onChange = () => {},
}) {
  const [eye, setEye] = useState(active);
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="group relative">
      <input
        type={eye ? "password" : "text"}
        className="h-10 w-full rounded-s-sm bg-[#f4f6f8] border-gray-300 focus:border-[1.75px] border-[1px]  outline-none px-2 focus-within:border-orange-500 group-focus:border-orange-500 float-left"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
      />
      <div
        className="absolute right-[0%] w-10 h-10 hover:border-[1.5px] border-l-0 flex items-center justify-center hover:border-orange-500 hover:border-l-[2px] group-focus:border-orange-500 rounded-e-sm"
        onClick={() => setEye(!eye)}
      >
        {!eye && <Eye />}
        {eye && <EyeSlash />}
      </div>
    </div>
  );
}
