import React from "react";
import SuperAdminTeamView from "@/components/dashboard/super-admin/SuperAdminTeamView";
import { superAdminStaffList } from "@/components/dashboard/super-admin/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team & Access Control | Super Admin | PropertyAI",
  description: "Roles, permissions, and team member governance.",
};

export default function SuperAdminTeamPage() {
  return <SuperAdminTeamView initialStaff={superAdminStaffList} />;
}

