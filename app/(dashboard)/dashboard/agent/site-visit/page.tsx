import React from "react";
import SiteVisitManagementView from "@/components/dashboard/agent/views/SiteVisitManagementView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Visit Management | PropertyAI Admin Portal",
  description: "All scheduled site visits. Visits auto-assign to the listing agent.",
};

export default function SiteVisitAliasPage() {
  return <SiteVisitManagementView />;
}
