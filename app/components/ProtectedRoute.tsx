"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/apiClient";
import { useStore } from "@/store/taskStore";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await apiClient.get("/api/v1/auth/me");
        // Если сервер вернул данные пользователя, сохраняем их в store
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    }

    // Если пользователь отсутствует в store, проверяем сессию на сервере
    if (!user) {
      checkSession();
    } else {
      setLoading(false);
    }
  }, [user, setUser, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) return null;

  return <>{children}</>;
}
