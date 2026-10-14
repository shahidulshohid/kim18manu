import React from "react";
import SuperAdminNotificationsView from "@/components/dashboard/super-admin/SuperAdminNotificationsView";
import { superAdminNotificationsList } from "@/components/dashboard/super-admin/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | Super Admin | PropertyAI",
  description: "Global system alerts, audit notifications, and pending approvals.",
};

export default function SuperAdminNotificationsPage() {
  return <SuperAdminNotificationsView notifications={superAdminNotificationsList} />;
}

