// utils/authAPI.ts
import apiClient from "./apiClient";

// Регистрация нового пользователя
export const register = async (data: { email: string; password: string; name?: string }) => {
  const response = await apiClient.post("/api/v1/auth/register", data);
  return response.data;
};

// Вход пользователя
export const login = async (data: { email: string; password: string }) => {
  const response = await apiClient.post("/api/v1/auth/login", data);
  return response.data;
};

