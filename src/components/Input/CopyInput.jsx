import { useState } from "react";
import Check from "../../Assets/SVG/Check";
import Copy from "../../Assets/SVG/Copy";

export default function CopyInput({
  active = false,
  defaultValue = "",
}) {
  const [eye, setEye] = useState(active);

  // Function to copy text to clipboard and trigger the check icon
  const callFunction = () => {
    if (defaultValue) {
      // Copy the value to the clipboard
      navigator.clipboard.writeText(defaultValue).then(() => {
        // After successfully copying, show the check icon for 2 seconds
        setEye(true);
        setTimeout(() => {
          setEye(false);
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
  };

  return (
    <div className="group relative">
      <input
        type="text"
        className="h-10 w-full rounded-s-sm bg-[#f4f6f8] border-gray-300 focus:border-[1.75px] border-[1px]  outline-none px-2 focus-within:border-orange-500 group-focus:border-orange-500 float-left"
        value={defaultValue}
      />
      <div
        className="absolute right-[0%] w-10 h-10 hover:border-[1.5px] border-l-0 flex items-center justify-center hover:border-orange-500 hover:border-l-[2px] group-focus:border-orange-500 rounded-e-sm bg-[#f4f6f8] scale-[96%] "
        onClick={callFunction}
      >
        {!eye && <Copy />}
        {eye && <Check />}
      </div>
    </div>
  );
}
