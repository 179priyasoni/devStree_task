import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex relative">
        <button
          className="lg:hidden absolute top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>

        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        <div className={`w-full lg:w-[calc(100%-18rem)] transition-all`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
