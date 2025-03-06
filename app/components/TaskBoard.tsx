"use client";

import React, { useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { useStore } from "@/store/taskStore";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const priorities = ["DAY", "WEEK", "MONTH"];

export default function TaskBoard() {
  const { tasks, fetchTasks, setTasks, taskFilter } = useStore();
  const router = useRouter();

  useEffect(() => {
    // При изменении фильтра обновляем задачи
    fetchTasks();
  }, [fetchTasks, taskFilter]);

  const handleDragEnd = (event: DragEndEvent, priority: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const columnTasks = tasks.filter((t) => t.priority === priority);
    const activeIndex = columnTasks.findIndex(
      (t) => t.id.toString() === active.id
    );
    const overIndex = columnTasks.findIndex(
      (t) => t.id.toString() === over.id
    );
    if (activeIndex === -1 || overIndex === -1) return;
    const newColumnTasks = arrayMove(columnTasks, activeIndex, overIndex);
    const otherTasks = tasks.filter((t) => t.priority !== priority);
    const newTasks = [...otherTasks, ...newColumnTasks];
    setTasks(newTasks);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
                borderLeft: index === 0 ? "none" : "1px solid #93C5FD",
              }}
            >
              <h2 style={{ marginBottom: 16, color: "#0EA5E9" }}>{p}</h2>
              <DndContext onDragEnd={(e) => handleDragEnd(e, p)}>
                <SortableContext
                  items={columnTasks.map((t) => t.id.toString())}
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
      {/* Кнопка "плюс" для создания задачи */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => router.push("/tasks/create")}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
