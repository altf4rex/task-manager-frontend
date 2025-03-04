"use client";

import { useRouter } from "next/navigation";
import TaskModal from "../../../../components/TaskModal";
import { useState, useEffect } from "react";
import React from "react";

export default function TaskModalPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  // Разворачиваем params, чтобы получить объект с параметрами
  const resolvedParams = React.use(params);
  const { taskId } = resolvedParams;

  const router = useRouter();
  const [task, setTask] = useState<any | null>(null);

  useEffect(() => {
    // Имитация загрузки данных о задаче
    setTask({
      id: taskId,
      title: "Some Task Title",
      description: "Some description",
      status: "In Progress",
    });
  }, [taskId]);

  if (!task) {
    return null; // или компонент загрузки (Loader)
  }

  return (
    <TaskModal
      open={true}
      task={task}
      onClose={() => router.back()}
      onUpdate={(updatedTask: any) => {
        console.log("Updated task:", updatedTask);
        router.back();
      }}
    />
  );
}
