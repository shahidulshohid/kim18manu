import React from "react";
import CustomerLayout from "@/components/dashboard/customer/CustomerLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Dashboard | PropertiQU.AI",
  description:
    "AI-Powered property discovery and transaction dashboard for buyers and investors.",
};

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomerLayout>{children}</CustomerLayout>;
}
