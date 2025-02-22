import React from "react";
import { useGetTheme } from "../App";
import { NavLink, Router, useRoutes } from "react-router";
// import devstreeLogo from "../assets/devstreeLogo.jpg";

function Sidebar({ isOpen, closeSidebar }) {
  const theme = useGetTheme();

  return (
    <div
      className={`fixed md:relative top-0 left-0 h-screen bg-white flex flex-col gap-3 p-4 transition-transform duration-300  border-r-[1px] border-r-blue-500
      ${
        isOpen
          ? "translate-x-0 w-full md:w-72"
          : "-translate-x-full md:translate-x-0 w-full md:w-72"
      } `}
    >
      {/* Close button for mobile */}
      <button
        onClick={closeSidebar}
        className="md:hidden self-end text-xl px-2 text-black"
      >
        ✖
      </button>
      {/* <div className="flex">
        <img src={devstreeLogo} alt="" className="w-8 h-8 shrink-1" />
      </div> */}
      <div className="text-black">
        <NavLink
          to="/projects"
          className="text-black p-2 rounded hover:bg-gray-200"
        >
          Projects
        </NavLink>
      </div>
      <div className="text-black">
        {" "}
        <NavLink
          to="/quotes"
          className="text-black p-2 rounded hover:bg-gray-200"
        >
          Quote
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
