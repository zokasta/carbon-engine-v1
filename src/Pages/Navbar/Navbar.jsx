import React, { useEffect, useState } from "react";
import Delete from "../../assets/SVG/Delete";
import Axios from "../../Database/Axiso";
import { useFlowContext } from "../../context/FlowContext"; // Adjust the import path
import Save from "./Save";

export default function Navbar() {

  // Function to delete data from localStorage
  const deleteData = () => {
    localStorage.removeItem("edges");
    localStorage.removeItem("nodes");
    console.log("Edges and Nodes removed from localStorage");
  };

  return (
    <div className="w-screen z-20 h-10 bg-[#660479]">
      <Save />
      <Delete className="float-right w-6 m-2 h-6" onClick={deleteData} />
    </div>
  );
}
