import React from "react";
import PartnerEcosystemView from "@/components/dashboard/agent/views/PartnerEcosystemView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Management | Super Admin | PropertyAI",
  description: "Global partner ecosystem, brokerages, and verified network partners.",
};

export default function SuperAdminPartnersPage() {
  return <PartnerEcosystemView />;
}
