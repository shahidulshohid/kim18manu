import React from "react";
import TransactionsView from "@/components/dashboard/agent/views/TransactionsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions & Accounting | PropertyAI Admin Portal",
  description: "Manage transactions, commission, bookkeeping, and invoices.",
};

export default function AccountingAliasPage() {
  return <TransactionsView />;
}
