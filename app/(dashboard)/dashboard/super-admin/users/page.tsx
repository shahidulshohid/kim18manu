import React from "react";
import SuperAdminUsersView from "@/components/dashboard/super-admin/SuperAdminUsersView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management | Super Admin | PropertyAI",
  description: "Global user management and directory for PropertyAI platform.",
};

export default function SuperAdminUsersPage() {
  return <SuperAdminUsersView />;
}
