// utils/categoriesAPI.ts
import apiClient from "./apiClient";

// Получить все категории
export const getAllCategories = async () => {
  const response = await apiClient.get("/categories");
  return response.data;
};

// Получить задачи для определённой категории по ID категории
export const getCategoryTasksById = async (id: number) => {
  const response = await apiClient.get(`/api/v1/categories/${id}`);
  return response.data;
};

// Создать новую категорию
export const createCategory = async (category: { name: string; color?: string }) => {
  const response = await apiClient.post("/api/v1/categories", category);
  return response.data;
};

// Обновить категорию по ID
export const updateCategory = async (id: number, category: Partial<{ name: string; color: string }>) => {
  const response = await apiClient.patch(`/api/v1/categories/${id}`, category);
  return response.data;
};

// Удалить категорию по ID
export const deleteCategory = async (id: number) => {
  const response = await apiClient.delete(`/api/v1/categories/${id}`);
  return response.data;
};
