"use client";

import React, { useState } from "react";
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
import { useStore } from "@/store/taskStore"; // Обратите внимание: импорт изменён на useStore
import { useRouter } from "next/navigation";

const priorities = ["DAY", "WEEK", "MONTH"];
const dailyOptions = ["Daily", "Not Daily"];

export default function CreateTaskModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [daily, setDaily] = useState<"Daily" | "Not Daily">("Daily");
  const [priority, setPriority] = useState<"DAY" | "WEEK" | "MONTH">("DAY");
  const [scheduledAt, setScheduledAt] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const { createTask, fetchTasks, categories, createCategory } = useStore();
  const router = useRouter();

  const handleSave = async () => {
    if (!title || !scheduledAt || !categoryName) {
      console.log(title, scheduledAt, categoryName, "handleSave");
      return;
    }
    try {
      let categoryId: number;
      const existingCategory = categories.find(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      );

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        // Если категории нет, создаём новую и получаем её id
        const newCategory = await createCategory({ name: categoryName });
        categoryId = newCategory.id;
      }

      await createTask({
        title,
        description,
        priority,
        scheduledAt,
        categoryId,
        isCompleted: false,
        isDaily: daily === "Daily",
      });
      await fetchTasks();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
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
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        Create New Task
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
          InputLabelProps={{ shrink: true }}
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
