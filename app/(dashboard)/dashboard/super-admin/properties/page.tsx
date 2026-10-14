import React from "react";
import SuperAdminPropertiesView from "@/components/dashboard/super-admin/SuperAdminPropertiesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Management | Super Admin | PropertyAI",
  description: "Global property inventory and listing moderation for PropertyAI.",
};

export default function SuperAdminPropertiesPage() {
  return <SuperAdminPropertiesView />;
}
