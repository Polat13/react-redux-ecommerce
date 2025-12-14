import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../Navbar";
import { selectThemeSummary } from "../store/selector";

export function MainLayout() {
  const { mode } = useSelector(selectThemeSummary);

  useEffect(() => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;