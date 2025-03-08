// utils/tasksAPI.ts
import apiClient from "./apiClient";
import { Task } from "@/store/taskStore";

// (Если требуется, можно удалить enum, так как не используется)
// enum Priority {
//   DAY,
//   WEEK,
//   MONTH,
// }

// Получить все задачи (с возможными фильтрами)
export const getAllTasks = async (params?: { filter?: string; categoryId?: number }): Promise<Task[]> => {
  const response = await apiClient.get("/api/v1/tasks", { params });
  return response.data;
};

// Получить задачу по ID
export const getTaskById = async (id: number): Promise<Task> => {
  const response = await apiClient.get(`/api/v1/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: "DAY" | "WEEK" | "MONTH";
  isDaily?: boolean;
  scheduledAt: string;
  categoryId: number;
}): Promise<Task> => {
  const response = await apiClient.post("/api/v1/tasks", task);
  return response.data;
};

export const updateTask = async (
  id: number,
  task: Partial<{
    title: string;
    description: string;
    priority: "DAY" | "WEEK" | "MONTH";
    isCompleted: boolean;
    isDaily: boolean;
    scheduledAt: string;
    categoryId: number;
  }>
): Promise<Task> => {
  const response = await apiClient.patch(`/api/v1/tasks/${id}`, task);
  return response.data;
};

// Удалить задачу по ID
export const deleteTask = async (id: number): Promise<{ message: string }> => {
  const response = await apiClient.delete(`/api/v1/tasks/${id}`);
  return response.data;
};
