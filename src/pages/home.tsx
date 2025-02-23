import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="w-full text-blue-500 h-full flex items-center justify-center  p-5">
      Hello, Welcome to the Project managment tool please click on the{" "}
      <NavLink to="/projects" className="!text-green-500 p-2 rounded ">
        Projects
      </NavLink>
    </div>
  );
}

export default Home;
