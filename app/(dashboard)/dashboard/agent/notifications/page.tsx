import React from "react";
import NotificationsView from "@/components/dashboard/agent/views/NotificationsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | PropertyAI Admin Portal",
  description: "View and manage all real-time notifications, matches, and alerts.",
};

export default function NotificationsPage() {
  return <NotificationsView />;
}
