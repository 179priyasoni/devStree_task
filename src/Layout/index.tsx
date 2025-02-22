import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Content Area */}
        <div className={`w-full md:w-[calc(100%-18rem)] p-4 transition-all`}>
          <Outlet />
        </div>
      </div>

      {/* Overlay when Sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default Layout;
