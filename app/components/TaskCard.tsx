// components/TaskCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Task } from "./TaskBoard";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
    cursor: "grab",
  };

  const statusColor: Record<string, string> = {
    "Not Started": "#3B82F6",
    "In Progress": "#F59E0B",
    Blocked: "#EF4444",
    Done: "#10B981",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        variant="outlined"
        sx={{
          borderColor: "divider",
          "&:hover": { boxShadow: 4 },
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {task.description}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {task.dueDate}
            </Typography>
            <Box
              sx={{
                px: 1,
                py: 0.5,
                fontSize: "0.75rem",
                borderRadius: 1,
                color: "#fff",
                backgroundColor: statusColor[task.status] || "#3B82F6",
              }}
            >
              {task.status}
            </Box>
          </Box>
          {/* Вместо локального onClick => <Link> */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Link href={`/tasks/${task.id}`} style={{ color: "inherit" }}>
              <IconButton
                size="small"
                color="primary"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <InfoIcon />
              </IconButton>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
