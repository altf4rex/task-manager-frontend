"use client";

import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { useStore, Task } from "@/store/taskStore";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const priorities = ["DAY", "WEEK", "MONTH"];

export default function TaskBoard() {
  const { tasks, fetchTasks } = useStore();
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
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
                <h2 style={{ marginBottom: 16, color: "#0EA5E9" }}>{priority}</h2>
              </Box>
              {columnTasks.map((task) => (
                // При клике на карточку открываем модальное окно редактирования
                <Box key={task.id} onClick={() => setSelectedTask(task)} sx={{ cursor: "pointer" }}>
                  <TaskCard task={task} />
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>
      {/* Кнопка "плюс" для создания новой задачи */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => router.push("/tasks/create")}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      {/* Модальное окно редактирования, открывается при клике на задачу */}
      {selectedTask && (
        <TaskModal
          open={!!selectedTask}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updatedTask) => {
            // Здесь можно вызвать updateTask из store, если требуется
            // updateTask(updatedTask.id, updatedTask);
            setSelectedTask(null);
          }}
        />
      )}
    </Box>
  );
}
