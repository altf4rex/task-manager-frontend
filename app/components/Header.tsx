"use client";

import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  styled,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useStore } from "@/store/taskStore";

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  borderRadius: "8px!important",
  overflow: "hidden",
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(14, 165, 233, 0.15)"
      : "rgba(14, 165, 233, 0.25)",
}));

const CompletionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  padding: "6px 20px",
  color: theme.palette.text.primary,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(14, 165, 233, 0.3)"
        : "rgba(14, 165, 233, 0.45)",
  },
}));

export default function CustomToolbarActions() {
  // Получаем список категорий и функции из глобального состояния
  const { categories, fetchTasks, fetchCategories } = useStore();
  // Локальное состояние для выбранной категории: либо конкретный id, либо "all"
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  // Фильтр по выполненности задач: "all", "done" или "not-done"
  const [completionFilter, setCompletionFilter] = useState<"all" | "done" | "not-done">("all");
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // При первоначальной загрузке – загружаем категории (если они еще не загружены)
  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  // При изменении выбранной категории или фильтра выполненности вызываем fetchTasks с соответствующими параметрами
  useEffect(() => {
    const params: any = {};

    // Если выбрана конкретная категория, добавляем ее id
    if (selectedCategory !== "all") {
      params.categoryId = selectedCategory;
    }

    // Если фильтр по выполненности: если "done" – передаем completed: true, если "not-done" – completed: false
    if (completionFilter === "done") {
      params.completed = true;
    } else if (completionFilter === "not-done") {
      params.completed = false;
    }

    // Вызываем fetchTasks с заданными параметрами
    fetchTasks(params);
  }, [selectedCategory, completionFilter, fetchTasks]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* Выпадающий список для выбора категории */}
      <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as number | "all")
          }
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Фильтр по выполненности задач */}
      <StyledButtonGroup variant="contained">
        <CompletionButton
          onClick={() => setCompletionFilter("all")}
          style={{
            backgroundColor: completionFilter === "all" ? "#0EA5E9" : "transparent",
            color: completionFilter === "all" ? "#fff" : undefined,
          }}
        >
          All
        </CompletionButton>
        <CompletionButton
          onClick={() => setCompletionFilter("done")}
          style={{
            backgroundColor: completionFilter === "done" ? "#0EA5E9" : "transparent",
            color: completionFilter === "done" ? "#fff" : undefined,
          }}
        >
          Done
        </CompletionButton>
        <CompletionButton
          onClick={() => setCompletionFilter("not-done")}
          style={{
            backgroundColor:
              completionFilter === "not-done" ? "#0EA5E9" : "transparent",
            color: completionFilter === "not-done" ? "#fff" : undefined,
          }}
        >
          Not Done
        </CompletionButton>
      </StyledButtonGroup>

      <ThemeSwitcher />
    </div>
  );
}
