// src/store/useStore.ts
import { create } from "zustand";
import { getAllTasks, createTask, updateTask, deleteTask } from "@/utils/tasksAPI";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "@/utils/categoriesAPI";
import { login, register } from "@/utils/authAPI";

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: "Not Started" | "In Progress" | "Blocked" | "Done"; // Добавляем status
  priority: "DAY" | "WEEK" | "MONTH";
  isCompleted: boolean;
  isDaily: boolean;
  scheduledAt: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  name: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  email: string;
  name?: string;
};

interface StoreState {
  user: User | null;
  tasks: Task[];
  categories: Category[];
  taskFilter: "day" | "week" | "month";
  setTaskFilter: (filter: "day" | "week" | "month") => void;
  setUser: (user: User | null) => void;
  setTasks: (tasks: Task[]) => void;
  setCategories: (categories: Category[]) => void;
  fetchTasks: (params?: { filter?: string; categoryId?: number }) => Promise<void>;
  createTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateTask: (id: number, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createCategory: (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateCategory: (id: number, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  loginUser: (credentials: { email: string; password: string }) => Promise<void>;
  registerUser: (data: { email: string; password: string; name?: string }) => Promise<void>;
  logout: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  user: null,
  tasks: [],
  categories: [],
  taskFilter: "day",
  setUser: (user) => set({ user }),
  setTaskFilter: (filter) => set({ taskFilter: filter }),
  setTasks: (tasks) => set({ tasks }),
  setCategories: (categories) => set({ categories }),

  fetchTasks: async (params = {}) => {
    try {
      const filter = params.filter ?? get().taskFilter;
      const data = await getAllTasks({ ...params, filter });
      set({ tasks: data });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  },

  createTask: async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      set({ tasks: [...get().tasks, newTask] });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      set({ tasks: get().tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)) });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },

  deleteTask: async (id) => {
    try {
      await deleteTask(id);
      set({ tasks: get().tasks.filter((t) => t.id !== id) });
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },

  fetchCategories: async () => {
    try {
      const data = await getAllCategories();
      set({ categories: data });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  createCategory: async (categoryData) => {
    try {
      const newCategory = await createCategory(categoryData);
      set({ categories: [...get().categories, newCategory] });
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const updatedCategory = await updateCategory(id, categoryData);
      set({ categories: get().categories.map((c) => (c.id === id ? { ...c, ...updatedCategory } : c)) });
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  },

  deleteCategory: async (id) => {
    try {
      await deleteCategory(id);
      set({ categories: get().categories.filter((c) => c.id !== id) });
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  },

  loginUser: async (credentials) => {
    try {
      const data = await login(credentials);
      set({ user: data.user });
    } catch (error) {
      console.error("Failed to login:", error);
    }
  },

  registerUser: async (data) => {
    try {
      const response = await register(data);
      set({ user: response.user });
    } catch (error) {
      console.error("Failed to register:", error);
    }
  },

  logout: () => set({ user: null, tasks: [], categories: [] }),
}));
