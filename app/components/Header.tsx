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

interface CompletionButtonProps {
  active?: boolean;
}

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  borderRadius: "8px!important",
  overflow: "hidden",
  backgroundColor: "transparent",
}));

const CompletionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<CompletionButtonProps>(({ active, theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  padding: "6px 20px",
  backgroundColor: active ? "#EA7C69" : "transparent",
  color: "#fff",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: active ? "#EA7C69" : "transparent",
    opacity: 0.9,
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

  // Загружаем категории, если они ещё не загружены
  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  // При изменении выбранной категории или фильтра выполненности вызываем fetchTasks с соответствующими параметрами
  useEffect(() => {
    const params: any = {};

    if (selectedCategory !== "all") {
      params.categoryId = selectedCategory;
    }

    if (completionFilter === "done") {
      params.completed = true;
    } else if (completionFilter === "not-done") {
      params.completed = false;
    }

    fetchTasks(params);
  }, [selectedCategory, completionFilter, fetchTasks]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16,}}>
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
      <StyledButtonGroup variant="contained" style={  {border: "1px solid rgb(105 97 97)"} }>
        <CompletionButton
          active={completionFilter === "all"}
          onClick={() => setCompletionFilter("all")}
        >
          All
        </CompletionButton>
        <CompletionButton
          active={completionFilter === "done"}
          onClick={() => setCompletionFilter("done")}
        >
          Done
        </CompletionButton>
        <CompletionButton
          active={completionFilter === "not-done"}
          onClick={() => setCompletionFilter("not-done")}
        >
          Not Done
        </CompletionButton>
      </StyledButtonGroup>

      <ThemeSwitcher />
    </div>
  );
}
