"use client";

import React, { useState, useMemo } from "react";
import {
  Download,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  CreditCard,
  Building,
  Receipt,
  DollarSign,
  FileText,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TransactionItem {
  id: string;
  property: string;
  customer: string;
  amount: string;
  method: string;
  date: string;
  status: "Completed" | "Active" | "Pending Payment" | "Cancelled";
}

interface CommissionItem {
  transaction: string;
  property: string;
  agent: string;
  saleAmount: string;
  commission: string;
  status: "Paid" | "Pending";
}

interface BookkeepingEntry {
  id: string;
  description: string;
  category: "Revenue" | "Marketing" | "Legal & Notary" | "Platform Fee" | "Operations";
  type: "inflow" | "outflow";
  amount: string;
  date: string;
  account: string;
}

interface InvoiceItem {
  id: string;
  invoiceNo: string;
  property: string;
  billedTo: string;
  amount: string;
  issueDate: string;
  dueDate: string;
  status: "Paid" | "Unpaid" | "Overdue";
}

const initialTransactions: TransactionItem[] = [
  {
    id: "TRX-001",
    property: "Family House — Dago",
    customer: "Bimo Santoso",
    amount: "IDR 144M",
    method: "Bank Transfer",
    date: "2026-10-01",
    status: "Completed",
  },
  {
    id: "TRX-002",
    property: "Modern Villa — Jimbaran",
    customer: "Ahmad Fauzi",
    amount: "IDR 4.5B",
    method: "Bank Transfer",
    date: "2026-09-28",
    status: "Active",
  },
  {
    id: "TRX-003",
    property: "SCBD Apartment 2BR",
    customer: "Lina Kusuma",
    amount: "IDR 850M",
    method: "Credit Card",
    date: "2026-09-20",
    status: "Pending Payment",
  },
  {
    id: "TRX-004",
    property: "MM2100 Warehouse",
    customer: "PT Logistik Jaya",
    amount: "IDR 7.2B",
    method: "Bank Transfer",
    date: "2026-09-10",
    status: "Completed",
  },
];

const initialCommissions: CommissionItem[] = [
  {
    transaction: "TRX-001",
    property: "Family House — Dago",
    agent: "Budi Santoso",
    saleAmount: "IDR 144M",
    commission: "IDR 7.2M",
    status: "Paid",
  },
  {
    transaction: "TRX-004",
    property: "MM2100 Warehouse",
    agent: "Budi Santoso",
    saleAmount: "IDR 7.2B",
    commission: "IDR 360M",
    status: "Paid",
  },
];

const initialBookkeeping: BookkeepingEntry[] = [
  {
    id: "BK-001",
    description: "Commission Payout - Family House Dago",
    category: "Revenue",
    type: "inflow",
    amount: "IDR 4.32M",
    date: "2026-10-01",
    account: "BCA Escrow Account",
  },
  {
    id: "BK-002",
    description: "Property Portal Premium Featured Ads",
    category: "Marketing",
    type: "outflow",
    amount: "IDR 3.50M",
    date: "2026-09-29",
    account: "Mandiri Corporate",
  },
  {
    id: "BK-003",
    description: "Notary & Deed of Sale (AJB) Filing Fee",
    category: "Legal & Notary",
    type: "outflow",
    amount: "IDR 8.20M",
    date: "2026-09-25",
    account: "BCA Escrow Account",
  },
  {
    id: "BK-004",
    description: "Commercial Lease Down Payment Deposit",
    category: "Revenue",
    type: "inflow",
    amount: "IDR 72.0M",
    date: "2026-09-12",
    account: "BCA Escrow Account",
  },
];

const initialInvoices: InvoiceItem[] = [
  {
    id: "INV-01",
    invoiceNo: "INV-2026-0091",
    property: "Modern Villa — Jimbaran",
    billedTo: "Ahmad Fauzi",
    amount: "IDR 450.0M",
    issueDate: "2026-09-28",
    dueDate: "2026-10-12",
    status: "Paid",
  },
  {
    id: "INV-02",
    invoiceNo: "INV-2026-0092",
    property: "SCBD Apartment 2BR",
    billedTo: "Lina Kusuma",
    amount: "IDR 85.0M",
    issueDate: "2026-09-20",
    dueDate: "2026-10-04",
    status: "Unpaid",
  },
  {
    id: "INV-03",
    invoiceNo: "INV-2026-0088",
    property: "Family House — Dago",
    billedTo: "Bimo Santoso",
    amount: "IDR 14.4M",
    issueDate: "2026-09-15",
    dueDate: "2026-09-30",
    status: "Paid",
  },
];

export default function TransactionsView() {
  const [activeTab, setActiveTab] = useState<
    "Transactions" | "Commission" | "Bookkeeping" | "Invoices & Receipts"
  >("Transactions");

  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);
  const [commissions, setCommissions] = useState<CommissionItem[]>(initialCommissions);
  const [bookkeeping, setBookkeeping] = useState<BookkeepingEntry[]>(initialBookkeeping);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices);

  // Modals & toast states
  const [viewTarget, setViewTarget] = useState<TransactionItem | null>(null);
  const [editTarget, setEditTarget] = useState<TransactionItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TransactionItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Metrics for Transactions tab
  const counts = useMemo(() => {
    return {
      active: transactions.filter((t) => t.status === "Active").length,
      completed: transactions.filter((t) => t.status === "Completed").length,
      pending: transactions.filter((t) => t.status === "Pending Payment").length,
    };
  }, [transactions]);

  // Actions
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setTransactions((prev) =>
      prev.map((t) => (t.id === editTarget.id ? editTarget : t))
    );
    showToast(`Transaction ${editTarget.id} updated successfully!`);
    setEditTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setTransactions((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    showToast(`Transaction ${deleteTarget.id} removed.`);
    setDeleteTarget(null);
  };

  const handleExport = () => {
    showToast("Exporting transactions to CSV/Excel...");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-[32px] py-6 sm:py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Transactions & Accounting
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage transactions, commission, bookkeeping, and invoices.
        </p>
      </div>

      {/* Tabs navigation matching screenshot */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-100 overflow-x-auto custom-scrollbar pt-1">
        {(["Transactions", "Commission", "Bookkeeping", "Invoices & Receipts"] as const).map(
          (tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-slate-500 hover:text-slate-800 font-medium"
                )}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          }
        )}
      </div>

      {/* TAB 1: TRANSACTIONS (Matches Screenshot) */}
      {activeTab === "Transactions" && (
        <div className="space-y-6">
          {/* Top 4 Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {/* 1. Total Revenue */}
            <div className="bg-white rounded-2xl border border-slate-100 py-5 px-5 sm:px-6 shadow-2xs">
              <span className="text-xl sm:text-2xl font-bold text-amber-500 block">
                IDR 4.85B
              </span>
              <span className="text-xs text-slate-400 font-medium mt-1.5 block">
                Total Revenue
              </span>
            </div>

            {/* 2. Active */}
            <div className="bg-white rounded-2xl border border-slate-100 py-5 px-5 sm:px-6 shadow-2xs">
              <span className="text-xl sm:text-2xl font-bold text-blue-600 block">
                {counts.active}
              </span>
              <span className="text-xs text-slate-400 font-medium mt-1.5 block">
                Active
              </span>
            </div>

            {/* 3. Completed */}
            <div className="bg-white rounded-2xl border border-slate-100 py-5 px-5 sm:px-6 shadow-2xs">
              <span className="text-xl sm:text-2xl font-bold text-emerald-500 block">
                {counts.completed}
              </span>
              <span className="text-xs text-slate-400 font-medium mt-1.5 block">
                Completed
              </span>
            </div>

            {/* 4. Pending Payment */}
            <div className="bg-white rounded-2xl border border-slate-100 py-5 px-5 sm:px-6 shadow-2xs">
              <span className="text-xl sm:text-2xl font-bold text-amber-500 block">
                {counts.pending}
              </span>
              <span className="text-xs text-slate-400 font-medium mt-1.5 block">
                Pending Payment
              </span>
            </div>
          </div>

          {/* All Transactions Card with Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            {/* Card Header */}
            <div className="p-4 sm:px-6 sm:py-5 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                All Transactions
              </h2>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      TRANSACTION ID
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      PROPERTY
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      CUSTOMER
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      AMOUNT
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      METHOD
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      DATE
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      STATUS
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase text-right">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((trx) => (
                    <tr
                      key={trx.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* TRANSACTION ID */}
                      <td className="py-4 px-6 text-xs font-mono text-slate-300">
                        {trx.id}
                      </td>

                      {/* PROPERTY */}
                      <td className="py-4 px-6 text-xs sm:text-sm font-semibold text-slate-900">
                        {trx.property}
                      </td>

                      {/* CUSTOMER */}
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-600">
                        {trx.customer}
                      </td>

                      {/* AMOUNT */}
                      <td className="py-4 px-6 text-xs sm:text-sm font-bold text-amber-500">
                        {trx.amount}
                      </td>

                      {/* METHOD */}
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-600">
                        {trx.method}
                      </td>

                      {/* DATE */}
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-400 font-mono">
                        {trx.date}
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-6">
                        {trx.status === "Completed" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                            Completed
                          </span>
                        )}
                        {trx.status === "Active" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                            Active
                          </span>
                        )}
                        {trx.status === "Pending Payment" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
                            Pending Payment
                          </span>
                        )}
                        {trx.status === "Cancelled" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200/60">
                            Cancelled
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2.5 text-slate-300">
                          <button
                            type="button"
                            onClick={() => setViewTarget(trx)}
                            className="hover:text-blue-600 transition-colors p-1 cursor-pointer"
                            title="View Transaction"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditTarget(trx)}
                            className="hover:text-blue-600 transition-colors p-1 cursor-pointer"
                            title="Edit Transaction"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(trx)}
                            className="hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            title="Delete Transaction"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMMISSION (Matches Screenshot 100%) */}
      {activeTab === "Commission" && (
        <div className="space-y-6">
          {/* Commission Rule Alert Banner */}
          <div className="bg-[#FAF6EE] border border-[#F2E8D7] rounded-2xl p-4 sm:p-5 flex items-center gap-3 text-xs sm:text-sm text-slate-700 shadow-2xs">
            <Info className="h-4.5 w-4.5 text-amber-500 shrink-0" />
            <div className="text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900">Commission Rule:</span>{" "}
              Commission is calculated automatically only when both{" "}
              <code className="font-mono text-slate-700 font-medium bg-transparent">
                lead_status = closed
              </code>{" "}
              <strong className="font-bold text-slate-900">AND</strong>{" "}
              <code className="font-mono text-slate-700 font-medium bg-transparent">
                property_status = closed
              </code>
            </div>
          </div>

          {/* Commission Records Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            <div className="p-4 sm:px-6 sm:py-5 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Commission Records
              </h2>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      TRANSACTION
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      PROPERTY
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      AGENT
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      SALE AMOUNT
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      COMMISSION (5%)
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {commissions.map((comm) => (
                    <tr
                      key={comm.transaction}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* TRANSACTION */}
                      <td className="py-4 px-6 text-xs font-mono text-slate-300">
                        {comm.transaction}
                      </td>

                      {/* PROPERTY */}
                      <td className="py-4 px-6 text-xs sm:text-sm font-semibold text-slate-900">
                        {comm.property}
                      </td>

                      {/* AGENT */}
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-600">
                        {comm.agent}
                      </td>

                      {/* SALE AMOUNT */}
                      <td className="py-4 px-6 text-xs sm:text-sm font-bold text-slate-900">
                        {comm.saleAmount}
                      </td>

                      {/* COMMISSION (5%) */}
                      <td className="py-4 px-6 text-xs sm:text-sm font-bold text-amber-500">
                        {comm.commission}
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                          {comm.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKKEEPING */}
      {activeTab === "Bookkeeping" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Total Inflows</span>
                <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
                  IDR 76.32M
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ArrowDownRight className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Total Outflows</span>
                <p className="text-xl sm:text-2xl font-bold text-rose-500 mt-1">
                  IDR 11.70M
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Net Operating Cash</span>
                <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                  IDR 64.62M
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            <div className="p-4 sm:px-6 sm:py-5 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Operating Cash Flow Ledger
              </h2>
              <button
                onClick={() => showToast("Exporting ledger journal...")}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Export Ledger
              </button>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      DESCRIPTION
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      CATEGORY
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      ACCOUNT
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      DATE
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase text-right">
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookkeeping.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 text-xs sm:text-sm font-semibold text-slate-900">
                        {entry.description}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {entry.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-600">
                        {entry.account}
                      </td>
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-400 font-mono">
                        {entry.date}
                      </td>
                      <td
                        className={cn(
                          "py-4 px-6 text-xs sm:text-sm font-bold text-right",
                          entry.type === "inflow" ? "text-emerald-600" : "text-rose-600"
                        )}
                      >
                        {entry.type === "inflow" ? `+ ${entry.amount}` : `- ${entry.amount}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INVOICES & RECEIPTS */}
      {activeTab === "Invoices & Receipts" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            <div className="p-4 sm:px-6 sm:py-5 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Official Invoices & Tax Receipts
              </h2>
              <button
                onClick={() => showToast("Preparing new invoice drafting wizard...")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Create Invoice
              </button>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      INVOICE NO
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      PROPERTY / CLIENT
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      AMOUNT
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      ISSUE DATE
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      DUE DATE
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      STATUS
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase text-right">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 text-xs font-mono font-bold text-blue-600">
                        {inv.invoiceNo}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">
                          {inv.property}
                        </div>
                        <div className="text-[11px] text-slate-400">{inv.billedTo}</div>
                      </td>
                      <td className="py-4 px-6 text-xs sm:text-sm font-bold text-amber-500">
                        {inv.amount}
                      </td>
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-400 font-mono">
                        {inv.issueDate}
                      </td>
                      <td className="py-4 px-6 text-xs sm:text-sm text-slate-400 font-mono">
                        {inv.dueDate}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                            inv.status === "Paid"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                              : "bg-amber-50 text-amber-600 border border-amber-200/60"
                          )}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => showToast(`Downloading ${inv.invoiceNo}.pdf...`)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL (Eye Icon) */}
      {viewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Transaction Details
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {viewTarget.id}
                </span>
              </div>
              <button
                onClick={() => setViewTarget(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Property:</span>
                <span className="font-semibold text-slate-900">{viewTarget.property}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Customer:</span>
                <span className="font-medium text-slate-700">{viewTarget.customer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Amount:</span>
                <span className="font-bold text-amber-500">{viewTarget.amount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Payment Method:</span>
                <span className="text-slate-700">{viewTarget.method}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Date:</span>
                <span className="font-mono text-slate-600">{viewTarget.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-blue-600">{viewTarget.status}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL (Pencil Icon) */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Edit Transaction ({editTarget.id})
              </h3>
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  Status
                </label>
                <select
                  value={editTarget.status}
                  onChange={(e) =>
                    setEditTarget({
                      ...editTarget,
                      status: e.target.value as TransactionItem["status"],
                    })
                  }
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending Payment">Pending Payment</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  Payment Method
                </label>
                <input
                  type="text"
                  value={editTarget.method}
                  onChange={(e) =>
                    setEditTarget({ ...editTarget, method: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  value={editTarget.amount}
                  onChange={(e) =>
                    setEditTarget({ ...editTarget, amount: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm shadow-blue-500/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL (Trash Icon) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="font-bold text-slate-900 text-base">
              Delete Transaction?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Are you sure you want to delete transaction{" "}
              <strong className="text-slate-800">{deleteTarget.id}</strong> (
              {deleteTarget.property})? This action cannot be undone.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm shadow-rose-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
