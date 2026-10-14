import React from "react";
import SuperAdminLayout from "@/components/dashboard/super-admin/SuperAdminLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin Dashboard | PropertyAI",
  description: "Super Admin dashboard for system governance, platform metrics, and ecosystem control.",
};

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminLayout>{children}</SuperAdminLayout>;
}
