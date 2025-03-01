"use client";

import React, { useState, useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string; // High | Medium | Low | No Priority
  status: string;   // Not Started | In Progress | Blocked | Done
  dueDate?: string;
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Team billing UI",
    description: "Implement new UI for team billing",
    priority: "High",
    status: "In Progress",
    dueDate: "Due: 21 May",
  },
  {
    id: "2",
    title: "Make text size smaller on event details",
    description: "Adjust text sizing in the event detail page",
    priority: "High",
    status: "Blocked",
    dueDate: "Due: 10 May",
  },
  {
    id: "3",
    title: "Copy for marketing ads",
    description: "Create new copy for marketing campaigns",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Due: 15 May",
  },
  {
    id: "4",
    title: "Refactor feature",
    description: "Refactor old codebase for better performance",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Due: 22 May",
  },
  {
    id: "5",
    title: "Calendar date bug",
    description: "Fix bug with date parsing in calendar",
    priority: "Low",
    status: "Not Started",
    dueDate: "No due date",
  },
  {
    id: "6",
    title: "Landing page redesign",
    description: "Update landing page layout and styling",
    priority: "Low",
    status: "Not Started",
    dueDate: "No due date",
  },
  {
    id: "7",
    title: "Responsive bug",
    description: "Fix responsive issues on mobile",
    priority: "No Priority",
    status: "Done",
    dueDate: "No due date",
  },
  {
    id: "8",
    title: "Onboarding Flow UI",
    description: "Improve the onboarding flow design",
    priority: "No Priority",
    status: "Not Started",
    dueDate: "No due date",
  },
];

const priorities = ["High", "Medium", "Low", "No Priority"];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  // Функция сортировки внутри колонки
  const handleDragEnd = (event: DragEndEvent, priority: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Получаем все задачи этой колонки
    const columnTasks = tasks.filter((t) => t.priority === priority);
    const activeIndex = columnTasks.findIndex((t) => t.id === active.id);
    const overIndex = columnTasks.findIndex((t) => t.id === over.id);

    const newColumnTasks = arrayMove(columnTasks, activeIndex, overIndex);
    // Обновляем задачи, сохраняя порядок для данной колонки
    const otherTasks = tasks.filter((t) => t.priority !== priority);
    const newTasks = [...otherTasks, ...newColumnTasks];
    setTasks(newTasks);
  };

  return (
    <div className="flex flex-1 overflow-x-auto p-4 space-x-4 bg-neutral-900">
      {priorities.map((p) => {
        const columnTasks = tasks.filter((task) => task.priority === p);

        return (
          <div
            key={p}
            className="min-w-[300px] bg-neutral-800 p-4 rounded-lg shadow border border-neutral-700"
          >
            <h2 className="text-lg font-semibold mb-4">{p}</h2>
            <DndContext onDragEnd={(e) => handleDragEnd(e, p)}>
              <SortableContext
                items={columnTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        );
      })}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updatedTask) => {
            // При обновлении title/description/status
            setTasks((prev) =>
              prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            );
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
