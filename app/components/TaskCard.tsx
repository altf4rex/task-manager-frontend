'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography } from '@mui/material';
import { Task } from './TaskBoard';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '8px',
    cursor: 'grab',
  };

  const statusColor: Record<string, string> = {
    'Not Started': '#3B82F6', // синий
    'In Progress': '#F59E0B', // жёлтый/оранж
    Blocked: '#EF4444',      // красный
    Done: '#10B981',         // зелёный
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        onClick={onClick}
        sx={{
          borderColor: 'divider',
          '&:hover': { boxShadow: 4 },
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {task.description}
          </Typography>
          <div className="flex items-center justify-between mt-2">
            <Typography variant="body2" color="text.secondary">
              {task.dueDate}
            </Typography>
            <div
              className="px-2 py-1 text-xs rounded text-white"
              style={{ backgroundColor: statusColor[task.status] ?? '#3B82F6' }}
            >
              {task.status}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

