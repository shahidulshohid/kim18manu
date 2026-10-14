import React from "react";
import TeamManagementView from "@/components/dashboard/agent/views/TeamManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team & Access Control | Super Admin | PropertyAI",
  description: "Roles, permissions, and team member governance.",
};

export default function SuperAdminTeamPage() {
  return <TeamManagementView />;
}
