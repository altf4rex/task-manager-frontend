"use client";

import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useStore } from "@/store/taskStore";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const priorities = ["DAY", "WEEK", "MONTH"];

export default function TaskBoard() {
  const { tasks, fetchTasks } = useStore();
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ display: "flex", gap: 16 }}>
        {priorities.map((p) => {
          // Фильтруем задачи по приоритету
          const columnTasks = tasks.filter((task) => task.priority === p);
          return (
            <div
              key={p}
              style={{
                flex: 1,
                padding: 16,
                borderRight: "1px solid #ccc",
                minWidth: 300,
              }}
            >
              <h2 style={{ marginBottom: 16, color: "#0EA5E9" }}>{p}</h2>
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          );
        })}
      </div>
      {/* Кнопка "плюс" для создания новой задачи */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => router.push("/tasks/create")}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
