
import UpdateDatabase from "./UpdateDatabase";
export default function SettingPage() {
  return (
    <div className="h-full bg-[#fbf8f6] p-4 gap-4 flex flex-col">
      <h1 className="text-4xl font-bold text-[#660479]">Settings</h1>
      <article className="bg-white border-[1.5px] p-4 rounded-md">
        Database Settings
        <UpdateDatabase />
      </article>
    </div>
  );
}
