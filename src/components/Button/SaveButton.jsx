export default function SaveButton({callFunction=()=>{}}) {
  return (
    <button
      className="py-2 mt-4 rounded-md text-white text-xl font-bold px-10 bg-orange-500 shadow-md hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-offset-2 ring-orange-500 outline-none focus-visible:bg-orange-500"
      onClick={callFunction}
    >
      Save
    </button>
  );
}
