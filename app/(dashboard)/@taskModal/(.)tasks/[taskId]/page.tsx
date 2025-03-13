"use client";

import { useRouter, useParams } from "next/navigation";
import TaskModal from "../../../../components/TaskModal";
import { useStore } from "@/store/taskStore";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = Number(params.id);
  const { tasks, fetchTasks } = useStore();

  // Ищем задачу по id в store
  const task = tasks.find((t) => t.id === taskId);

  // Если задача не найдена, пытаемся загрузить её
  useEffect(() => {
    if (!task) {
      fetchTasks();
    }
  }, [task, fetchTasks]);

  const handleClose = () => {
    router.push("/");
  };

  if (!task) {
    return <Box>Loading...</Box>;
  }

  return (
    <TaskModal
      open={true}
      task={task}
      onClose={handleClose}
    />
  );
}
