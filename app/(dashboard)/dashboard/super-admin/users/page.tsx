import React from "react";
import TeamManagementView from "@/components/dashboard/agent/views/TeamManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management | Super Admin | PropertyAI",
  description: "Global user management and directory for PropertyAI platform.",
};

export default function SuperAdminUsersPage() {
  return <TeamManagementView />;
}
