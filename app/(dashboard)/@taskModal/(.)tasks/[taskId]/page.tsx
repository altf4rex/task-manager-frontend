"use client";

import { useRouter, useParams } from "next/navigation";
import TaskModal from "../../../../components/TaskModal";
import { useStore } from "@/store/taskStore";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = Number(params.id);

  const task = useStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  );

  useEffect(() => {
    if (!task) {
    }
  }, [task]);

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