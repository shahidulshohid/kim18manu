"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Wallet,
  Clock,
  Check,
  Star,
  Search,
  ChevronDown,
  Download,
  ArrowDownToLine,
  RefreshCw,
  ArrowLeft,
  X,
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Building,
  User,
  CreditCard,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { superAdminTransactionsList } from "./data";
import { SuperAdminTransaction } from "./types";

const fallbackTransactions: SuperAdminTransaction[] = [
  {
    id: "TRX-001",
    property: "Family House — Kemang",
    propertyFull: "Family House — Kemang, South Jakarta",
    customer: "Bimo Santoso",
    agent: "Rizki Pratama",
    amount: "IDR 144M",
    amountRaw: 144000000,
    method: "Bank Transfer",
    commission: "IDR 7.2M",
    date: "2026-10-01",
    status: "Completed",
    invoiceNumber: "INV-2026-10-001",
  },
  {
    id: "TRX-002",
    property: "Modern Villa — Jimbaran",
    propertyFull: "Modern Villa — Jimbaran, Bali",
    customer: "Ahmad Fauzi",
    agent: "Budi Santoso",
    amount: "IDR 4.5B",
    amountRaw: 4500000000,
    method: "Bank Transfer",
    commission: "IDR 225M",
    date: "2026-09-28",
    status: "Active",
    invoiceNumber: "INV-2026-09-042",
  },
  {
    id: "TRX-003",
    property: "SCBD Apartment Tower 2",
    propertyFull: "SCBD Apartment Tower 2 — Sudirman, South Jakarta",
    customer: "Lina Kusuma",
    agent: "Sari Dewi",
    amount: "IDR 850M",
    amountRaw: 850000000,
    method: "Credit Card",
    commission: "IDR 42.5M",
    date: "2026-09-20",
    status: "Pending Payment",
    invoiceNumber: "INV-2026-09-031",
  },
  {
    id: "TRX-004",
    property: "MM2100 Warehouse Hub",
    propertyFull: "MM2100 Warehouse Logistics Hub — Cikarang",
    customer: "PT Logistik Jaya",
    agent: "Rizki Pratama",
    amount: "IDR 7.2B",
    amountRaw: 7200000000,
    method: "Bank Transfer",
    commission: "IDR 360M",
    date: "2026-09-10",
    status: "Completed",
    invoiceNumber: "INV-2026-09-015",
  },
];

type FilterTab = "All" | "Pending Payment" | "Active" | "Completed" | "Cancelled";

interface SuperAdminTransactionsViewProps {
  transactions?: SuperAdminTransaction[];
}

export default function SuperAdminTransactionsView({
  transactions = superAdminTransactionsList,
}: SuperAdminTransactionsViewProps) {
  // Defensive guard against undefined/null
  const safeTransactions =
    Array.isArray(transactions) && transactions.length > 0
      ? transactions
      : fallbackTransactions;

  // Local state
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedAgent, setSelectedAgent] = useState("All");

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<SuperAdminTransaction | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState("2026-10-01 12:05 WIB");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
        now.getDate()
      ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")} WIB`;
      setLastSyncTime(timeStr);
      setIsSyncing(false);
      showToast("Bookkeeping successfully synchronized with platform ledger!");
    }, 1000);
  };

  // Export CSV handler
  const handleExport = (reportName: string = "Transactions_Report") => {
    const csvHeader = "Transaction ID,Property,Customer,Agent,Amount,Method,Commission,Date,Status\n";
    const csvRows = filteredTransactions
      .map(
        (t) =>
          `"${t.id}","${t.property}","${t.customer}","${t.agent}","${t.amount}","${t.method}","${t.commission}","${t.date}","${t.status}"`
      )
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${reportName}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredTransactions.length} transactions as CSV!`);
  };

  // Tab counts
  const allCount = safeTransactions.length;
  const pendingCount = safeTransactions.filter((t) => t.status === "Pending Payment").length;
  const activeCount = safeTransactions.filter((t) => t.status === "Active").length;
  const completedCount = safeTransactions.filter((t) => t.status === "Completed").length;
  const cancelledCount = safeTransactions.filter((t) => t.status === "Cancelled").length;

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return safeTransactions.filter((item) => {
      // Tab filter
      if (activeTab === "Pending Payment" && item.status !== "Pending Payment") return false;
      if (activeTab === "Active" && item.status !== "Active") return false;
      if (activeTab === "Completed" && item.status !== "Completed") return false;
      if (activeTab === "Cancelled" && item.status !== "Cancelled") return false;

      // Method filter
      if (selectedMethod !== "All" && item.method !== selectedMethod) return false;

      // Agent filter
      if (selectedAgent !== "All" && item.agent !== selectedAgent) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesProp = item.property.toLowerCase().includes(q);
        const matchesCustomer = item.customer.toLowerCase().includes(q);
        const matchesAgent = item.agent.toLowerCase().includes(q);
        const matchesAmount = item.amount.toLowerCase().includes(q);
        if (!matchesId && !matchesProp && !matchesCustomer && !matchesAgent && !matchesAmount) {
          return false;
        }
      }

      return true;
    });
  }, [safeTransactions, activeTab, selectedMethod, selectedAgent, searchQuery]);

  // Extract unique agents for filter
  const agentOptions = useMemo(() => {
    const list = Array.from(new Set(safeTransactions.map((t) => t.agent)));
    return list;
  }, [safeTransactions]);

  // Extract unique methods for filter
  const methodOptions = useMemo(() => {
    const list = Array.from(new Set(safeTransactions.map((t) => t.method)));
    return list;
  }, [safeTransactions]);

  return (
    <div className="relative space-y-6 pb-20 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 backdrop-blur px-4 py-3 text-xs font-medium text-white shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Transactions & Accounting
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Financial management, commissions, invoices
          </p>
        </div>

        {/* Top Right Action: Export Report */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport("Financial_Accounting_Report")}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-lg hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600 stroke-[2.2]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* TOP 4 KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: Total Revenue YTD */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-500 shrink-0">
              <Wallet className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50/90 px-2 py-0.5 rounded-full border border-emerald-100/60">
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
              +14%
            </span>
          </div>
          <div className="mt-3.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              IDR 12.8B
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Total Revenue YTD
            </p>
          </div>
        </div>

        {/* CARD 2: Pending Payments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-500 shrink-0">
              <Clock className="w-5 h-5 stroke-[2]" />
            </div>
          </div>
          <div className="mt-3.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              IDR 850M
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Pending Payments
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              1 transaction
            </p>
          </div>
        </div>

        {/* CARD 3: Completed (Oct) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600 shrink-0">
              <Check className="w-5 h-5 stroke-[2.4]" />
            </div>
          </div>
          <div className="mt-3.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              2
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Completed (Oct)
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              IDR 4.64B
            </p>
          </div>
        </div>

        {/* CARD 4: Commission YTD */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-500 shrink-0">
              <Star className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50/90 px-2 py-0.5 rounded-full border border-emerald-100/60">
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
              +11%
            </span>
          </div>
          <div className="mt-3.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              IDR 634M
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Commission YTD
            </p>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="border-b border-slate-200">
        <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          {[
            { label: "All", count: allCount },
            { label: "Pending Payment", count: pendingCount },
            { label: "Active", count: activeCount },
            { label: "Completed", count: completedCount },
            { label: "Cancelled", count: cancelledCount },
          ].map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label as FilterTab)}
                className={cn(
                  "relative pb-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer",
                  isActive
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-900 font-medium"
                )}
              >
                <span>
                  {tab.label} ({tab.count})
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* MAIN TRANSACTIONS TABLE CARD */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        {/* TOOLBAR */}
        <div className="p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 text-xs bg-slate-50/70 border border-slate-200/90 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Methods Select */}
            <div className="relative">
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-full sm:w-auto appearance-none pl-3 pr-8 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-colors"
              >
                <option value="All">All Methods</option>
                {methodOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Agents Select */}
            <div className="relative">
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full sm:w-auto appearance-none pl-3 pr-8 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-colors"
              >
                <option value="All">All Agents</option>
                {agentOptions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Export Button */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => handleExport("Transactions_Export")}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                <th className="py-3.5 px-4 sm:px-6">Transaction ID</th>
                <th className="py-3.5 px-4 sm:px-6">Property</th>
                <th className="py-3.5 px-4 sm:px-6">Customer</th>
                <th className="py-3.5 px-4 sm:px-6">Agent</th>
                <th className="py-3.5 px-4 sm:px-6">Amount</th>
                <th className="py-3.5 px-4 sm:px-6">Method</th>
                <th className="py-3.5 px-4 sm:px-6">Commission</th>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">No transactions found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try clearing search filters or switching tabs
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((trx) => {
                  const isCompleted = trx.status === "Completed";
                  const isActive = trx.status === "Active";
                  const isPending = trx.status === "Pending Payment";

                  // Status badge format
                  let badgeClass = "bg-slate-50 text-slate-600 border-slate-200";
                  let statusDisplay: string = trx.status;

                  if (isCompleted) {
                    badgeClass = "bg-emerald-50 text-emerald-600 border-emerald-200/80";
                    statusDisplay = "Completed";
                  } else if (isActive) {
                    badgeClass = "bg-emerald-50 text-emerald-600 border-emerald-200/80";
                    statusDisplay = "Active";
                  } else if (isPending) {
                    badgeClass = "bg-amber-50 text-amber-600 border-amber-200/80";
                    statusDisplay = "Pending Pay.";
                  }

                  return (
                    <tr
                      key={trx.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* TRANSACTION ID */}
                      <td className="py-4 px-4 sm:px-6 font-mono text-[11px] font-medium text-slate-500 whitespace-nowrap">
                        {trx.id}
                      </td>

                      {/* PROPERTY */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">
                        <span
                          title={trx.propertyFull || trx.property}
                          className="hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          {trx.property.length > 17
                            ? `${trx.property.substring(0, 16)}...`
                            : trx.property}
                        </span>
                      </td>

                      {/* CUSTOMER */}
                      <td className="py-4 px-4 sm:px-6 font-medium text-slate-700 whitespace-nowrap">
                        {trx.customer}
                      </td>

                      {/* AGENT */}
                      <td className="py-4 px-4 sm:px-6 font-medium text-slate-700 whitespace-nowrap">
                        {trx.agent}
                      </td>

                      {/* AMOUNT: Amber / Warm Gold Color Matching Design */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-amber-600 whitespace-nowrap">
                        {trx.amount}
                      </td>

                      {/* METHOD */}
                      <td className="py-4 px-4 sm:px-6 font-normal text-slate-600 whitespace-nowrap">
                        {trx.method}
                      </td>

                      {/* COMMISSION */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">
                        {trx.commission}
                      </td>

                      {/* DATE */}
                      <td className="py-4 px-4 sm:px-6 font-normal text-slate-600 whitespace-nowrap font-mono text-[11px]">
                        {trx.date}
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                            badgeClass
                          )}
                        >
                          {statusDisplay}
                        </span>
                      </td>

                      {/* RECEIPT LINK: Blue download icon & PDF */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedReceipt(trx)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 stroke-[2.2]" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOOKKEEPING SYNC CARD */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <RefreshCw
              className={cn(
                "w-4.5 h-4.5 stroke-[2.2] transition-transform duration-700",
                isSyncing && "animate-spin"
              )}
            />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Bookkeeping Sync
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 font-normal">
              Automatic sync · Last updated {lastSyncTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/80 hover:bg-emerald-100/70 transition-all cursor-pointer disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{isSyncing ? "Syncing..." : "Synced"}</span>
          </button>
        </div>
      </div>

      {/* FLOATING ACTION: Back to Portal Select */}
      <div className="flex justify-center pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back to Portal Select</span>
        </Link>
      </div>

      {/* RECEIPT / INVOICE PREVIEW MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Official Transaction Receipt
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {selectedReceipt.invoiceNumber || selectedReceipt.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Body: Receipt Document */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
              {/* Receipt Top Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      P
                    </div>
                    <span className="font-bold text-sm text-slate-900">
                      PropertyAI Escrow & Settlements
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Authorized AREBI Escrow Agent #ID-9821
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    {selectedReceipt.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    {selectedReceipt.date}
                  </p>
                </div>
              </div>

              {/* Transaction Key Details */}
              <div className="grid grid-cols-2 gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Transaction ID
                  </span>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">
                    {selectedReceipt.id}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Payment Method
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {selectedReceipt.method}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Customer / Buyer
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {selectedReceipt.customer}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Listing Agent
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {selectedReceipt.agent}
                  </p>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/70">
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                  Associated Property
                </span>
                <p className="font-bold text-slate-900 mt-0.5 text-xs">
                  {selectedReceipt.propertyFull || selectedReceipt.property}
                </p>
              </div>

              {/* Settlement Line Items */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Transaction Value</span>
                  <span className="font-bold text-amber-600 font-mono">
                    {selectedReceipt.amount}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Agent Broker Commission (Earned)</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {selectedReceipt.commission}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Platform Processing & Escrow (0.5%)</span>
                  <span>Included in Settlement</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>PPh Final Tax (AREBI Withholding)</span>
                  <span>Compliant & Reported</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                  <span>Total Amount Settled</span>
                  <span className="text-amber-600">{selectedReceipt.amount}</span>
                </div>
              </div>

              {/* Verified Stamp Note */}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/70 text-emerald-800 border border-emerald-100 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Cryptographically verified on PropertyAI Ledger. All escrow requirements fulfilled.
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleExport(`Receipt_${selectedReceipt.id}`);
                    setSelectedReceipt(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
