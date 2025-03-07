// utils/tasksAPI.ts
import apiClient from "./apiClient";

enum Priority {
  DAY,
  WEEK,
  MONTH,
}

// Получить все задачи (опционально можно передавать фильтры, например, по дню или по категории)
export const getAllTasks = async (params?: { filter?: string; categoryId?: number }) => {
  const response = await apiClient.get("/tasks", { params });
  return response.data;
};

// Получить задачу по ID
export const getTaskById = async (id: number) => {
  const response = await apiClient.get(`/tasks/${id}`);
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
}) => {
  const response = await apiClient.post("/tasks", task);
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
) => {
  const response = await apiClient.patch(`/tasks/${id}`, task);
  return response.data;
};

// Удалить задачу по ID
export const deleteTask = async (id: number) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
};
