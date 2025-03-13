import React, { useEffect, useCallback } from "react";
import TaskCard from "./TaskCard";
import { useStore, Task } from "@/store/taskStore";
import { Fab, Box, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const priorities = ["DAY", "WEEK", "MONTH"];

export default function TaskBoard() {
  const { tasks, fetchTasks, isLoading } = useStore();
  const router = useRouter();

  // Если fetchTasks не стабилизирована, можно использовать useCallback
  const loadTasks = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {isLoading ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : tasks.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Нет задач</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
          {priorities.map((priority) => {
            // Фильтруем задачи по приоритету
            const columnTasks = tasks.filter((task) => task.priority === priority);
            return (
              <Box
                key={priority}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRight: "1px solid #ccc",
                  minWidth: 300,
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <h2 style={{ marginBottom: 16, color: "#EA7C69" }}>{priority}</h2>
                </Box>
                {columnTasks.map((task: Task) => (
                  // При клике переходим на страницу редактирования задачи
                  <Box
                    key={task.id}
                    onClick={() => router.push(`/tasks/${task.id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TaskCard task={task} />
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>
      )}
      {/* Кнопка "плюс" для создания новой задачи */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => router.push("/tasks/create")}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
