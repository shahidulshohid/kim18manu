import React from "react";
import PropertyManagementView from "@/components/dashboard/agent/views/PropertyManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Management | PropertyAI Admin Portal",
  description: "Manage property listings, view statuses, and handle transactions across the platform.",
};

export default function PropertyManagementAliasPage() {
  return <PropertyManagementView />;
}
