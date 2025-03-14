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
import { useStore, Task } from "@/store/taskStore";

const priorities = ["DAY", "WEEK", "MONTH"];
const dailyOptions = ["Daily", "Not Daily"];

// Преобразование даты для input[type="datetime-local"]
const formatDateTime = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 16);
};

interface TaskModalProps {
  open: boolean;
  task: Task;
  onClose: () => void;
}

export default function TaskModal({ open, task, onClose }: TaskModalProps) {
  // Подключаем функции для работы с задачами и категориями
  const {
    categories,
    updateTask,
    deleteTask,
    createCategory,
    deleteCategory,
  } = useStore();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [daily, setDaily] = useState<"Daily" | "Not Daily">(task.isDaily ? "Daily" : "Not Daily");
  const [priority, setPriority] = useState<"DAY" | "WEEK" | "MONTH">(task.priority);
  const [scheduledAt, setScheduledAt] = useState(formatDateTime(task.scheduledAt));
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setDaily(task.isDaily ? "Daily" : "Not Daily");
    setPriority(task.priority);
    setScheduledAt(formatDateTime(task.scheduledAt));
    // Ищем текущую категорию по id задачи
    const currentCategory = categories.find((cat) => cat.id === task.categoryId);
    setCategoryName(currentCategory ? currentCategory.name : "");
  }, [task, categories]);

  const handleSave = async () => {
    const oldCategoryId = task.categoryId;
    let updatedCategoryId = task.categoryId;

    // Ищем категорию с введённым именем (без учета регистра)
    const existingCategory = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (existingCategory) {
      updatedCategoryId = existingCategory.id;
    } else {
      // Если такой категории нет, создаём новую
      const newCategory = await createCategory({ name: categoryName });
      updatedCategoryId = newCategory.id;
    }

    const updatedData = {
      title,
      description,
      isDaily: daily === "Daily",
      priority,
      scheduledAt: new Date(scheduledAt).toISOString(),
      categoryId: updatedCategoryId,
    };

    try {
      await updateTask(task.id, updatedData);
      onClose();

      // Если категория изменилась, проверяем, используется ли старая категория
      if (oldCategoryId !== updatedCategoryId) {
        const allTasks = useStore.getState().tasks;
        const tasksUsingOldCategory = allTasks.filter((t) => t.categoryId === oldCategoryId);
        if (tasksUsingOldCategory.length === 0) {
          await deleteCategory(oldCategoryId);
        }
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const onDelete = async () => {
    const oldCategoryId = task.categoryId;
    try {
      await deleteTask(task.id);
      onClose();

      // После удаления задачи проверяем, не используется ли старая категория другими задачами
      const allTasks = useStore.getState().tasks;
      const tasksUsingOldCategory = allTasks.filter((t) => t.categoryId === oldCategoryId);
      if (tasksUsingOldCategory.length === 0) {
        await deleteCategory(oldCategoryId);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
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
          sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
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
          <InputLabel>Daily (if not completed, move to the next day)</InputLabel>
          <Select
            label="Daily (if not completed, move to the next day)"
            value={daily}
            onChange={(e) => setDaily(e.target.value as "Daily" | "Not Daily")}
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
            onChange={(e) => setPriority(e.target.value as "DAY" | "WEEK" | "MONTH")}
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
              maxLength: 16,
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
        <Button onClick={onDelete} variant="outlined" color="error">
          Delete
        </Button>
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
