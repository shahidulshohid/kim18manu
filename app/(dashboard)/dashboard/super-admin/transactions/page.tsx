import React from "react";
import SuperAdminTransactionsView from "@/components/dashboard/super-admin/SuperAdminTransactionsView";
import { superAdminTransactionsList } from "@/components/dashboard/super-admin/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions & Accounting | Super Admin | PropertyAI",
  description: "Platform transactions, escrow records, and commission settlements.",
};

export default function SuperAdminTransactionsPage() {
  return <SuperAdminTransactionsView transactions={superAdminTransactionsList} />;
}

