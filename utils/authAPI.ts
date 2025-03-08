// utils/authAPI.ts
import apiClient from "./apiClient";

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

// Регистрация нового пользователя
export const register = async (data: { email: string; password: string; name?: string }): Promise<AuthResponse> => {
  const response = await apiClient.post("/api/v1/auth/register", data);
  return response.data;
};

// Вход пользователя
export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await apiClient.post("/api/v1/auth/login", data);
  return response.data;
};
