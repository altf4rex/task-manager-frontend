// app/(dashboard)/layout.tsx
"use client";
import React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import CustomAppTitle from "../components/CustomAppTitle";
import Header from "../components/Header"; // Header с фильтрами и переключателем темы
import SidebarFooterAccountPopover from "../components/SidebarFooterAccountPopover";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardSectionLayout({
  children,
  taskModal,
}: {
  children: React.ReactNode;
  taskModal: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: Header,
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccountPopover,
        }}
        slotProps={{
          appTitle: {
            branding: {
              logo: (
                <img
                  src="/favicon.ico"
                  alt="Logo"
                  style={{ height: 24 }}
                />
              ),
              title: "Dashboard",
              homeUrl: "/",
            },
          },
        }}
      >
        {children}
        {taskModal}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
