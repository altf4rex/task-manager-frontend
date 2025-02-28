"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, Typography } from "@mui/material";
import { Task } from "./TaskBoard";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
    cursor: "grab",
  };

  // Цвет бейджа статуса (примерно)
  const statusColor = {
    "Not Started": "bg-gray-500",
    "In Progress": "bg-blue-600",
    "Blocked": "bg-red-600",
    "Done": "bg-green-600",
  }[task.status] || "bg-gray-500";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#1f2937", // bg-neutral-800
          color: "#fff",
          borderColor: "#374151",     // border-neutral-700
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {task.title}
          </Typography>
          <div className="flex items-center justify-between">
            <Typography variant="body2" color="#9ca3af">
              {task.dueDate}
            </Typography>
            <div
              className={`px-2 py-1 text-xs rounded ${statusColor}`}
            >
              {task.status}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

