import React from "react";
import TeamManagementView from "@/components/dashboard/agent/views/TeamManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team & User Management | PropertyAI Admin Portal",
  description: "Manage staff accounts, roles, permissions, and activity logs.",
};

export default function UsersAliasPage() {
  return <TeamManagementView />;
}
