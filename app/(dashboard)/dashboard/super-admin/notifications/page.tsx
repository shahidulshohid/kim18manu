import React from "react";
import NotificationsView from "@/components/dashboard/agent/views/NotificationsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications & System Alerts | Super Admin | PropertyAI",
  description: "Global system alerts, audit notifications, and pending approvals.",
};

export default function SuperAdminNotificationsPage() {
  return <NotificationsView />;
}
