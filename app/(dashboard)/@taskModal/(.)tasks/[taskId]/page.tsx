"use client";

import { useRouter, useParams } from "next/navigation";
import TaskModal from "../../../../components/TaskModal";
import { useStore } from "@/store/taskStore";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getAllTasks} from "../../../../../utils/tasksAPI"

export default function EditTaskPage(){
  const router = useRouter();
  const params = useParams();
  const taskId = Number(params.taskId);
  const { tasks, fetchTasks, isLoading } = useStore();

  // Если список задач пуст, вызываем fetchTasks
  useEffect(() =>  {
    fetchTasks()
    
      console.log("this is store", tasks)
      console.log("this is api", getAllTasks())
  }, []);

  // Ищем задачу по id
  const task = tasks.find((t) => t.id === taskId);

  const handleClose = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!task) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography>Task not found</Typography>
      </Box>
    );
  }

  return <TaskModal open={true} task={task}  onClose={() => router.back()} />;
}
