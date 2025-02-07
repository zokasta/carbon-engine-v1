import { useState } from "react";
import Input from "../../components/Input/Input";
import Axios from "../../Database/Axios";

export default function UpdateDatabase({ db = "carbon" }) {
  const [database, setDatabase] = useState(db);

  const callFunctions = async () => {
    const jsonData = {
      database_name: database,
    };
    try {
      const response = await Axios.post("/update-database/", jsonData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response.data.message || "An error occurred");
      } else if (error.request) {
        console.log("No response received from server");
      } else {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="grid grid-cols-[1fr_120px] gap-4">
      <Input defaultValue={db} onChange={(e) => setDatabase(e.target.value)} />
      <button
        className="rounded-md text-white text-xl font-bold bg-[#660479] shadow-md hover:bg-[#711883] focus-visible:ring-2 focus-visible:ring-offset-2 ring-orange-500 outline-none focus-visible:bg-orange-500"
        onClick={callFunctions}
      >
        Save
      </button>
    </div>
  );
}
