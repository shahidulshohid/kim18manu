import React from "react";
import AISystemView from "@/components/dashboard/agent/views/AISystemView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI System Studio | Super Admin | PropertyAI",
  description: "AI Studio, token consumption, voice inbound agents, and model configuration.",
};

export default function SuperAdminAISystemPage() {
  return <AISystemView />;
}
