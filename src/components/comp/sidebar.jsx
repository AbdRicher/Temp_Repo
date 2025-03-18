import { useState } from "react";
import { Search, Plus, Menu } from "lucide-react"; // Icons
// import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
       <div className="relative">
      {/* Sidebar Toggle Button */}
      <button
        className={`fixed top-4 left-4 z-50 p-2 rounded-md md:hidden ${
          isOpen ? "absolute top-4 right-4 text-white" : "text-black"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-72 md:flex md:flex-col p-4`}
      >
       

        {/* Search Input */}
        <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-2 mt-10">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search chat history..."
            className="bg-transparent outline-none text-white w-full placeholder-gray-400"
          />
        </div>

        {/* New Chat Button */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition w-full py-2 px-4 mt-4 rounded-lg">
          <Plus size={18} />
          New Chat
        </button>

        {/* Chat History (Dynamic) */}
        <div className="mt-6">
          <h4 className="text-gray-300 font-semibold">Chat History</h4>
          <ul id="chatList" className="space-y-2 mt-2">
            {/* Dynamically Insert Chat Items Here */}
            <li className="p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
              Chat 1
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
