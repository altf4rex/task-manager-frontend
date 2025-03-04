"use client";

import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string; // "High" | "Medium" | "Low" | "No Priority"
  status: string;   // "Not Started" | "In Progress" | "Blocked" | "Done"
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
  // ... добавьте другие задачи
];

const priorities = ["High", "Medium", "Low", "No Priority"];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Обработка перетаскивания внутри одной колонки
  const handleDragEnd = (event: DragEndEvent, priority: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const columnTasks = tasks.filter((t) => t.priority === priority);
    const activeIndex = columnTasks.findIndex((t) => t.id === active.id);
    const overIndex = columnTasks.findIndex((t) => t.id === over.id);

    const newColumnTasks = arrayMove(columnTasks, activeIndex, overIndex);
    const otherTasks = tasks.filter((t) => t.priority !== priority);
    const newTasks = [...otherTasks, ...newColumnTasks];
    setTasks(newTasks);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
      }}
    >
      {priorities.map((p, index) => {
        const columnTasks = tasks.filter((task) => task.priority === p);

        return (
          <div
            key={p}
            style={{
              minWidth: 300,
              padding: 16,
              borderLeft: index === 0 ? "none" : "1px solid #93C5FD", // голубая линия
            }}
          >
            <h2 style={{ marginBottom: 16, color: "#0EA5E9" }}>{p}</h2>
            <DndContext onDragEnd={(e) => handleDragEnd(e, p)}>
              <SortableContext
                items={columnTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        );
      })}
    </div>
  );
}
