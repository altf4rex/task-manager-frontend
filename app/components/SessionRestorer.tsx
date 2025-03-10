// // Пример в app/layout.tsx или в специальном компоненте SessionRestorer.tsx
// "use client";

// import React, { useEffect } from "react";
// import apiClient from "@/utils/apiClient";
// import { useStore } from "@/store/taskStore";

// export default function SessionRestorer({ children }: { children: React.ReactNode }) {
//   const setUser = useStore((state) => state.setUser);

//   useEffect(() => {
//     async function restoreSession() {
//       try {
//         const response = await apiClient.get("/api/v1/auth/me");
//         // Обновляем глобальное состояние пользователя, если запрос успешен
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Session restoration failed:", error);
//         // Если неудачно, оставляем пользователя неавторизованным
//       }
//     }
//     restoreSession();
//   }, [setUser]);

//   return <>{children}</>;
// }
