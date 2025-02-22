import { createBrowserRouter } from "react-router";
import React from "react";
import Layout from "./Layout";
import Home from "./pages/home";
import ToDo from "./pages/to-do";
import Projects from "./pages/projects";
import Quote from "./pages/quote";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "quotes",
        element: <Quote />,
      },
    ],
  },
]);
