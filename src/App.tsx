import React, { createContext, useContext, useState } from "react";
import MyComponent from "./components/Sidebar";
import { Router } from "react-router-dom";
import { RouterProvider } from "react-router";
import { routes } from "./routes";

type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

export const useGetTheme = () => useContext(ThemeContext);

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    // <ThemeContext.Provider value={theme}>
    //   <MyComponent />
    // </ThemeContext.Provider>
    <RouterProvider router={routes} />
  );
}
