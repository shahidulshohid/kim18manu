import React from "react";
import AgentLayout from "@/components/dashboard/agent/AgentLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent / Admin Dashboard | PropertyAI",
  description: "Agent and Admin portal for real estate management, leads, CRM, and transactions.",
};

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AgentLayout>{children}</AgentLayout>;
}
