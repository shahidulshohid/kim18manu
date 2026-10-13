import React from "react";
import AgentLayout from "@/components/dashboard/agent/AgentLayout";
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
  return <AgentLayout>{children}</AgentLayout>;
}
