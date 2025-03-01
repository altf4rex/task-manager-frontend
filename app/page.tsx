// Home.tsx
"use client";

import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen bg-neutral-900 text-white overflow-hidden">
      {/* Анимированный Sidebar */}
      <aside
        className={`transform transition-all duration-300 ease-in-out 
          fixed z-20 h-full w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </aside>

      {/* Анимированный основной контент */}
      <div
        className={`flex flex-1 flex-col transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-64" : "translate-x-0"}`}
      >
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <TaskBoard />
      </div>
    </div>
  );
}