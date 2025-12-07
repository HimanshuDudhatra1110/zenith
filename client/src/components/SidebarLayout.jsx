import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { useEffect, useState } from "react";

const SidebarLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsExpanded(false); // Auto close sidebar on mobile
      } else {
        setIsExpanded(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-coal-500">
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} isMobile />

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded ? "ml-64" : "ml-16"
        } w-full`}
      >
        <div className="bg-gray-100 w-full h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;
