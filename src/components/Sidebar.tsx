import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-40"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`sidebar-container fixed lg:relative top-0 left-0 h-screen bg-white flex flex-col gap-3 p-4 transition-transform duration-300 border-r-[1px] border-r-blue-500 z-50
        ${
          isOpen
            ? "translate-x-0 w-full lg:w-64"
            : "-translate-x-full lg:translate-x-0 w-64"
        }
        `}
      >
        <button
          onClick={closeSidebar}
          className="lg:!hidden !self-end !text-xl !px-2 !text-black !bg-white"
        >
          X
        </button>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/projects"
            className="text-black p-2 rounded hover:bg-gray-200"
            onClick={closeSidebar}
          >
            Projects
          </NavLink>
          <NavLink
            to="/quotes"
            className="text-black p-2 rounded hover:bg-gray-200"
            onClick={closeSidebar}
          >
            Quotes
          </NavLink>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
