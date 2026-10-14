import React from "react";
import LeadManagementView from "@/components/dashboard/agent/views/LeadManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead & CRM Management | Super Admin | PropertyAI",
  description: "Global CRM pipeline and hot lead tracking across the ecosystem.",
};

export default function SuperAdminLeadsPage() {
  return <LeadManagementView />;
}
