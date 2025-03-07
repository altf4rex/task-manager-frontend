// components/ProtectedRoute.tsx
"use client";

import React, { useEffect } from "react";
import { useStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);

  if (!user) return null;
  return <>{children}</>;
}
