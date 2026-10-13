import React from "react";
import SiteVisitManagementView from "@/components/dashboard/agent/views/SiteVisitManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI System | PropertyAI Admin Portal",
  description: "AI-powered property and site visit management system.",
};

export default function AISystemPage() {
  return <SiteVisitManagementView />;
}
