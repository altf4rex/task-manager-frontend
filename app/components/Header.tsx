"use client";

import React from "react";
import { Button, ButtonGroup, styled } from "@mui/material";
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

const PeriodButton = styled(Button)(({ theme }) => ({
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
  // Используем глобальное состояние для фильтра
  const { taskFilter, setTaskFilter } = useStore();
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <StyledButtonGroup variant="contained">
        <PeriodButton
          onClick={() => setTaskFilter("day")}
          style={{
            backgroundColor: taskFilter === "day" ? "#0EA5E9" : "transparent",
            color: taskFilter === "day" ? "#fff" : undefined,
          }}
        >
          Day
        </PeriodButton>
        <PeriodButton
          onClick={() => setTaskFilter("week")}
          style={{
            backgroundColor: taskFilter === "week" ? "#0EA5E9" : "transparent",
            color: taskFilter === "week" ? "#fff" : undefined,
          }}
        >
          Week
        </PeriodButton>
        <PeriodButton
          onClick={() => setTaskFilter("month")}
          style={{
            backgroundColor: taskFilter === "month" ? "#0EA5E9" : "transparent",
            color: taskFilter === "month" ? "#fff" : undefined,
          }}
        >
          Month
        </PeriodButton>
      </StyledButtonGroup>
      <ThemeSwitcher />
    </div>
  );
}
