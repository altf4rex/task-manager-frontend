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
import { useStore, Task } from "@/store/taskStore"; // Импортируем из useStore
import { useRouter } from "next/navigation";

const priorities = ["DAY", "WEEK", "MONTH"];
const dailyOptions = ["Daily", "Not Daily"];

interface TaskModalProps {
  open: boolean;
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

export default function TaskModal({ open, task, onClose, onUpdate }: TaskModalProps) {
  const { categories } = useStore();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [daily, setDaily] = useState<"Daily" | "Not Daily">(task.isDaily ? "Daily" : "Not Daily");
  const [priority, setPriority] = useState<"DAY" | "WEEK" | "MONTH">(task.priority);
  const [scheduledAt, setScheduledAt] = useState(task.scheduledAt);
  const [categoryName, setCategoryName] = useState("");

  // При открытии или изменении задачи обновляем состояния
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setDaily(task.isDaily ? "Daily" : "Not Daily");
    setPriority(task.priority);
    setScheduledAt(task.scheduledAt);
    const currentCategory = categories.find(cat => cat.id === task.categoryId);
    setCategoryName(currentCategory ? currentCategory.name : "");
  }, [task, categories]);

  const handleSave = () => {
    let updatedCategoryId = task.categoryId;
    // Если имя категории изменилось, пытаемся найти уже существующую категорию
    const existingCategory = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (existingCategory) {
      updatedCategoryId = existingCategory.id;
    }
    // Формируем обновлённую задачу
    const updatedTask: Task = {
      ...task,
      title,
      description,
      isDaily: daily === "Daily",
      priority,
      scheduledAt,
      categoryId: updatedCategoryId,
    };
    onUpdate(updatedTask);
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
        Edit Task
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
          <InputLabel>
            Daily (if not completed, move to the next day)
          </InputLabel>
          <Select
            label="Daily (if not completed, move to the next day)"
            value={daily}
            onChange={(e) =>
              setDaily(e.target.value as "Daily" | "Not Daily")
            }
          >
            {dailyOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "DAY" | "WEEK" | "MONTH")
            }
          >
            {priorities.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
  label="Scheduled At"
  type="datetime-local"
  fullWidth
  margin="dense"
  variant="outlined"
  slotProps={{
    inputLabel: { shrink: true },
    htmlInput: {
      pattern: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}",
      title: "Please enter a date in the format YYYY-MM-DDTHH:mm",
      maxLength: 16, // Ограничение на 16 символов, что соответствует формату
    },
  }}
  value={scheduledAt}
  onChange={(e) => setScheduledAt(e.target.value)}
/>

        <TextField
          label="Category"
          fullWidth
          margin="dense"
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
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
