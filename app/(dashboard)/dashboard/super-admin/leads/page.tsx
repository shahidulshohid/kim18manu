import React from "react";
import SuperAdminLeadsView from "@/components/dashboard/super-admin/SuperAdminLeadsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead & CRM Management | Super Admin | PropertyAI",
  description: "Global CRM pipeline and hot lead tracking across the ecosystem.",
};

export default function SuperAdminLeadsPage() {
  return <SuperAdminLeadsView />;
}
