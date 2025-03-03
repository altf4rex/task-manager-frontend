// components/CustomToolbarActions.tsx
'use client';

import React, { useState } from 'react';
import { Button, ButtonGroup, IconButton, styled } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorScheme } from '@mui/material/styles';

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  borderRadius: '8px!important',
  overflow: 'hidden',
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(14, 165, 233, 0.15)'
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

export default function CustomToolbarActions() {
  const [filter, setFilter] = useState('day');
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </div>
  );
}
