"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Task } from "./TaskBoard";

interface TaskModalProps {
  open: boolean;
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

const statuses = ["Not Started", "In Progress", "Blocked", "Done"];

export default function TaskModal({
  open,
  task,
  onClose,
  onUpdate,
}: TaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  const handleSave = () => {
    onUpdate({ ...task, title, description, status });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            p: 2,
            borderRadius: 2,
            // Используем значение из темы для поддержки светлой/тёмной темы:
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: 24,
          },
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        Task Details
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          margin="dense"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
