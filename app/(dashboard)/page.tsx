'use client'
import dynamic from "next/dynamic";

const TaskBoard = dynamic(() => import("../components/TaskBoard"), {
  ssr: false, // отключаем серверный рендеринг для TaskBoard
});

export default function DashboardPage() {
  return <TaskBoard />;
}