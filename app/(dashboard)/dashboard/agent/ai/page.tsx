import React from "react";
import AISystemView from "@/components/dashboard/agent/views/AISystemView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI System Studio | PropertyAI Admin Portal",
  description: "AI-powered property extraction, media enhancement, and predictive analytics.",
};

export default function AISystemPage() {
  return <AISystemView />;
}
