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

  // Если задачи ещё не загружены, вызываем fetchTasks
  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [tasks, fetchTasks]);

  const task = tasks.find((t) => t.id === taskId);

  const handleClose = () => {
    router.push("/");
  };

  if (!task) {
    return <Box>Loading...</Box>;
  }

  return (
    <TaskModal open={true} task={task} onClose={handleClose} />
  );
}
