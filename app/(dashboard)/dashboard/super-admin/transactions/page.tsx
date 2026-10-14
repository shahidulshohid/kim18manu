import React from "react";
import TransactionsView from "@/components/dashboard/agent/views/TransactionsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions & Accounting | Super Admin | PropertyAI",
  description: "Platform transactions, escrow records, and commission settlements.",
};

export default function SuperAdminTransactionsPage() {
  return <TransactionsView />;
}
