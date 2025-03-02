// components/Header.tsx
'use client';

import React, { useState } from 'react';
import { Button, ButtonGroup, Chip, IconButton, styled } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  toggleSidebar: () => void;
}

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  borderRadius: '8px!important',
  overflow: 'hidden',
  // Для светлой темы — полупрозрачный голубой, для тёмной — затемняем
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(14, 165, 233, 0.15)' // #0EA5E9, но полупрозрачный
      : 'rgba(14, 165, 233, 0.25)',
}));

const PeriodButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  padding: '6px 20px',
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(14, 165, 233, 0.3)'
        : 'rgba(14, 165, 233, 0.45)',
  },
}));

export default function Header({ toggleSidebar }: HeaderProps) {
  const [filter, setFilter] = useState('day');
  const [sortBy, setSortBy] = useState('priority');

  return (
    <header
      className={`
        flex items-center justify-between px-4 h-16
        border-b
        ${
          // Пример смешения Tailwind и MUI-темы (можно убрать):
          // Для светлой темы - голубая граница, для тёмной - более тёмная
          'border-blue-200 dark:border-blue-900 bg-opacity-90'
        }
      `}
      style={{
        backdropFilter: 'blur(6px)',
      }}
    >
      <div className="flex items-center space-x-4">
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold">
            Projects / Kanban
          </h1>
          <Chip
            label="12 tasks"
            variant="filled"
            color="primary"
            sx={{ fontWeight: 500, fontFamily: 'inherit', height: '28px' }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
          onClick={() => console.log('Open sort menu')}
        >
          <FilterAltIcon fontSize="small" />
          <span className="text-sm">
            Sort by: <span className="text-blue-500">{sortBy}</span>
          </span>
        </div>

        <StyledButtonGroup variant="contained">
          <PeriodButton
            onClick={() => setFilter('day')}
            style={{
              backgroundColor: filter === 'day' ? '#0EA5E9' : 'transparent',
              color: filter === 'day' ? '#fff' : undefined,
            }}
          >
            Day
          </PeriodButton>
          <PeriodButton
            onClick={() => setFilter('week')}
            style={{
              backgroundColor: filter === 'week' ? '#0EA5E9' : 'transparent',
              color: filter === 'week' ? '#fff' : undefined,
            }}
          >
            Week
          </PeriodButton>
          <PeriodButton
            onClick={() => setFilter('month')}
            style={{
              backgroundColor: filter === 'month' ? '#0EA5E9' : 'transparent',
              color: filter === 'month' ? '#fff' : undefined,
            }}
          >
            Month
          </PeriodButton>
        </StyledButtonGroup>
      </div>
    </header>
  );
}
