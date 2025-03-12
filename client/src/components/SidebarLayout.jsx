import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";

const SidebarLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-coal-500">
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded ? "ml-64" : "ml-16"
        } w-full`}
      >
        <div className="w-full h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;
