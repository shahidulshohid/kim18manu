import React from "react";
import PartnerEcosystemView from "@/components/dashboard/agent/views/PartnerEcosystemView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Ecosystem | PropertyAI Admin Portal",
  description: "Collaborate with mortgage banks, notaries, and valuation firms.",
};

export default function PartnersPage() {
  return <PartnerEcosystemView />;
}
