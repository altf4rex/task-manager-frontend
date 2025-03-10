"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Task } from "@/store/taskStore";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const statusColor: Record<string, string> = {
    "false": "#3B82F6", // если задача не выполнена
    "true": "#10B981",  // если выполнена
  };

  return (
    <Card variant="outlined" sx={{ mb: 2, "&:hover": { boxShadow: 4 } }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {task.description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {new Date(task.scheduledAt).toLocaleString()}
          </Typography>
          <Box
            sx={{
              px: 1,
              py: 0.5,
              fontSize: "0.75rem",
              borderRadius: 1,
              color: "#fff",
              backgroundColor: statusColor[String(task.isCompleted)] || "#3B82F6",
            }}
          >
            {task.isCompleted ? "Completed" : "Pending"}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Link href={`/tasks/${task.id}`} style={{ color: "inherit" }}>
            <IconButton size="small" color="primary">
              <InfoIcon />
            </IconButton>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
