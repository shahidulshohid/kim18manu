import React from "react";
import LeadManagementView from "@/components/dashboard/agent/views/LeadManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead & CRM Management | PropertyAI Admin Portal",
  description: "Track, qualify, and convert leads across all channels.",
};

export default function CrmPage() {
  return <LeadManagementView />;
}
