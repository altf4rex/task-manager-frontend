"use client";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-neutral-900 text-white">
      {/* Sidebar слева */}
      <Sidebar />

      {/* Основной контент */}
      <div className="flex flex-col flex-1">
        {/* Header сверху */}
        <Header />
        {/* TaskBoard занимает остальное пространство */}
        <TaskBoard />
      </div>
    </div>
  );
}
