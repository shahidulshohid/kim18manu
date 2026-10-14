import React from "react";
import ReportsAnalyticsView from "@/components/dashboard/agent/views/ReportsAnalyticsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Analytics | Super Admin | PropertyAI",
  description: "Ecosystem reports, lead analytics, and revenue trends.",
};

export default function SuperAdminReportsPage() {
  return <ReportsAnalyticsView />;
}
