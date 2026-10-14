import React from "react";
import SuperAdminServicesView from "@/components/dashboard/super-admin/SuperAdminServicesView";
import {
  superAdminServiceRequestsList,
  superAdminServiceCategoriesList,
} from "@/components/dashboard/super-admin/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Management | Super Admin | PropertyAI",
  description: "Service requests, partner assignments, and status workflow.",
};

export default function SuperAdminServicesPage() {
  return (
    <SuperAdminServicesView
      initialRequests={superAdminServiceRequestsList}
      categories={superAdminServiceCategoriesList}
    />
  );
}
