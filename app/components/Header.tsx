// Header.tsx
"use client";

import React, { useState } from "react";
import { Button, ButtonGroup, Chip, IconButton, styled } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuIcon from '@mui/icons-material/Menu';
import { indigo } from "@mui/material/colors";

interface HeaderProps {
  toggleSidebar: () => void;
}

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
  borderRadius: '8px!important',
  overflow: 'hidden',
  backdropFilter: 'blur(4px)',
  backgroundColor: 'rgba(17, 24, 39, 0.8)',
}));

const PeriodButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  padding: '6px 20px',
  border: 'none!important',
  color: '#E5E7EB',
}));

export default function Header({ toggleSidebar }: HeaderProps) {
  const [filter, setFilter] = useState("day");
  const [sortBy, setSortBy] = useState("priority");

  return (
    <header className="sticky top-0 z-10 p-4 flex items-center justify-between bg-neutral-900/80 border-b border-neutral-800 backdrop-blur-sm shadow-xl">
      <div className="flex items-center space-x-4">
        <IconButton
          onClick={toggleSidebar}
          sx={{ 
            color: indigo[300],
            '&:hover': { backgroundColor: 'rgba(79, 70, 229, 0.1)' }
          }}
        >
          <MenuIcon />
        </IconButton>
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Projects / Kanban
          </h1>
          <Chip 
            label="12 tasks"
            variant="filled"
            sx={{
              bgcolor: indigo[800],
              color: 'white',
              fontWeight: 500,
              fontFamily: 'inherit',
              height: '28px',
              '& .MuiChip-label': { padding: '0 10px' }
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div 
          className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors hover:bg-neutral-800 group"
          onClick={() => console.log('Open sort menu')}
        >
          <FilterAltIcon 
            fontSize="small" 
            sx={{ color: indigo[400], transition: 'color 0.2s' }} 
          />
          <span className="text-sm text-neutral-300 group-hover:text-white">
            Sort by: <span className="text-indigo-400">{sortBy}</span>
          </span>
        </div>

        <StyledButtonGroup variant="contained">
          <PeriodButton
            onClick={() => setFilter("day")}
            sx={{ 
              bgcolor: filter === "day" ? indigo[600] : 'transparent',
              '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.3)' }
            }}
          >
            Day
          </PeriodButton>
          <PeriodButton
            onClick={() => setFilter("week")}
            sx={{ 
              bgcolor: filter === "week" ? indigo[600] : 'transparent',
              '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.3)' }
            }}
          >
            Week
          </PeriodButton>
          <PeriodButton
            onClick={() => setFilter("month")}
            sx={{ 
              bgcolor: filter === "month" ? indigo[600] : 'transparent',
              '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.3)' }
            }}
          >
            Month
          </PeriodButton>
        </StyledButtonGroup>
      </div>
    </header>
  );
}