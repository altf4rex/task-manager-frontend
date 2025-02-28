"use client";

import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function Header() {
  const [filter, setFilter] = useState("day");

  return (
    <header className="p-4 flex items-center justify-between bg-neutral-800 border-b border-neutral-700">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Projects / Kanban</h1>
        <div className="bg-neutral-700 px-2 py-1 rounded text-sm opacity-80">
          12 tasks
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-2 bg-neutral-700 px-3 py-2 rounded">
          <FilterAltIcon fontSize="small" />
          <span className="text-sm">Sort by: Priority</span>
        </div>

        <ButtonGroup variant="contained" color="primary">
          <Button
            onClick={() => setFilter("day")}
            style={{ backgroundColor: filter === "day" ? "#2563eb" : "#374151" }}
          >
            Day
          </Button>
          <Button
            onClick={() => setFilter("week")}
            style={{ backgroundColor: filter === "week" ? "#2563eb" : "#374151" }}
          >
            Week
          </Button>
          <Button
            onClick={() => setFilter("month")}
            style={{ backgroundColor: filter === "month" ? "#2563eb" : "#374151" }}
          >
            Month
          </Button>
        </ButtonGroup>
      </div>
    </header>
  );
}

