import React from "react";
import ReportsAnalyticsView from "@/components/dashboard/agent/views/ReportsAnalyticsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Analytics | PropertyAI Admin Portal",
  description: "Data insights across leads, properties, AI, and revenue.",
};

export default function ReportsPage() {
  return <ReportsAnalyticsView />;
}
