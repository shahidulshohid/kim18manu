import React from "react";
import PropertyManagementView from "@/components/dashboard/agent/views/PropertyManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Management | Super Admin | PropertyAI",
  description: "Global property inventory and listing moderation for PropertyAI.",
};

export default function SuperAdminPropertiesPage() {
  return <PropertyManagementView />;
}
