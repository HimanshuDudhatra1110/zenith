import React from "react";
import * as ROUTES from "../constants/routes.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  House,
  ListCheck,
  NotebookPen,
  NotepadText,
} from "lucide-react";

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: ROUTES.DASHBOARD, icon: House, label: "Home", exact: true },
    { path: ROUTES.NOTES, icon: NotepadText, label: "Notes", exact: true },
    { path: ROUTES.DIARY, icon: NotebookPen, label: "Diary" },
    { path: ROUTES.HABIT, icon: ListCheck, label: "Habit Tracking" },
  ];
  return (
    <div
      className={`h-screen hz-bg-cyan-700 text-white transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      } fixed left-0 top-0`}
    >
      <div className="p-4 flex justify-between items-center">
        {isExpanded && <h1 className="text-2xl font-bold">Zenith</h1>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded cursor-pointer hover:bg-gray-700"
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>
      <nav className="mt-6 p-1 space-y-2">
        {navItems.map(({ path, icon: Icon, label, exact }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center p-2 mr-2 hover:bg-gray-700 hover:scale-105 transition-transform
 rounded ${!isExpanded && "justify-center"} ${
              isActive(path, exact) ? "hz-bg-cyan-600 py-4" : ""
            }`}
          >
            <Icon className="h-6 w-6" />
            {isExpanded && <span className="ml-2">{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
