"use client";

import React, { useState } from "react";
import {
  Wallet,
  Download,
  CheckCircle2,
  X,
  FileText,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TransactionItem {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  status: "Active" | "Completed" | "Cancelled";
  invoiceNumber?: string;
  paymentMethod?: string;
}

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: "tx-1",
    title: "Modern Villa with Ocean View",
    subtitle: "Installment 1 of 12 · Bank Transfer",
    amount: "IDR 4,500,000,000",
    date: "2026-10-01",
    status: "Active",
    invoiceNumber: "INV-2026-1001",
    paymentMethod: "BCA Virtual Account",
  },
  {
    id: "tx-2",
    title: "Spacious Family House (Rent)",
    subtitle: "Annual Rent Payment · E-Wallet",
    amount: "IDR 144,000,000",
    date: "2026-09-20",
    status: "Completed",
    invoiceNumber: "INV-2026-0920",
    paymentMethod: "GoPay / QRIS",
  },
  {
    id: "tx-3",
    title: "Property Search Premium Plan",
    subtitle: "Subscription · Credit Card",
    amount: "IDR 299,000",
    date: "2026-09-01",
    status: "Completed",
    invoiceNumber: "INV-2026-0901",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "tx-4",
    title: "Cozy Apartment SCBD",
    subtitle: "Purchase (Cancelled) · Bank Transfer",
    amount: "IDR 850,000,000",
    date: "2026-08-15",
    status: "Cancelled",
    invoiceNumber: "INV-2026-0815",
    paymentMethod: "Mandiri Virtual Account",
  },
];

export default function TransactionsView() {
  const [transactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Completed" | "Cancelled">("all");
  const [selectedTx, setSelectedTx] = useState<TransactionItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleExport = () => {
    showToast("Exporting transaction history statement (PDF/CSV)...");
  };

  const handleDownloadInvoice = (tx: TransactionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Downloading invoice for ${tx.title}...`);
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (statusFilter === "all") return true;
    return tx.status === statusFilter;
  });

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
          Transactions
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track all your payments and financial activity.
        </p>
      </div>

      {/* 2. Top Metric Cards (4 cards in a row matching screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {/* Card 1: Total Paid */}
        <div
          onClick={() => setStatusFilter("all")}
          className={cn(
            "bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-center transition-all cursor-pointer active:scale-98 hover:shadow-md",
            statusFilter === "all"
              ? "border-blue-500 ring-2 ring-blue-500/10"
              : "border-slate-100 hover:border-blue-100"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-[#2563eb] leading-tight">
            IDR 145.3M
          </span>
          <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Total Paid
          </span>
        </div>

        {/* Card 2: Active */}
        <div
          onClick={() =>
            setStatusFilter((prev) => (prev === "Active" ? "all" : "Active"))
          }
          className={cn(
            "bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-center transition-all cursor-pointer active:scale-98 hover:shadow-md",
            statusFilter === "Active"
              ? "border-[#2563eb] ring-2 ring-blue-500/20"
              : "border-slate-100 hover:border-blue-100"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-[#2563eb] leading-tight">
            1
          </span>
          <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Active
          </span>
        </div>

        {/* Card 3: Completed */}
        <div
          onClick={() =>
            setStatusFilter((prev) => (prev === "Completed" ? "all" : "Completed"))
          }
          className={cn(
            "bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-center transition-all cursor-pointer active:scale-98 hover:shadow-md",
            statusFilter === "Completed"
              ? "border-[#16a34a] ring-2 ring-emerald-500/20"
              : "border-slate-100 hover:border-emerald-100"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-[#16a34a] leading-tight">
            2
          </span>
          <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Completed
          </span>
        </div>

        {/* Card 4: Cancelled */}
        <div
          onClick={() =>
            setStatusFilter((prev) => (prev === "Cancelled" ? "all" : "Cancelled"))
          }
          className={cn(
            "bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-center transition-all cursor-pointer active:scale-98 hover:shadow-md",
            statusFilter === "Cancelled"
              ? "border-slate-400 ring-2 ring-slate-400/20"
              : "border-slate-100 hover:border-slate-200"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-slate-700 leading-tight">
            1
          </span>
          <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Cancelled
          </span>
        </div>
      </div>

      {/* 3. Filter Reset Indicator (if active) */}
      {statusFilter !== "all" && (
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Showing: <strong className="text-slate-800">{statusFilter}</strong> transactions
          </span>
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className="text-xs text-[#2563eb] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Show all transactions
          </button>
        </div>
      )}

      {/* 4. Transaction History Card matching screenshot */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 sm:p-7">
        {/* Card Header: Title + Export Button */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <h2 className="text-base sm:text-[17px] font-bold text-slate-900">
            Transaction History
          </h2>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2563eb] hover:underline cursor-pointer transition-colors"
          >
            <Download className="h-4 w-4 stroke-[2.2]" />
            <span>Export</span>
          </button>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-slate-50">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => setSelectedTx(tx)}
              className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50/50 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-2xl transition-colors cursor-pointer"
            >
              {/* Left Side: Wallet Icon Box + Title + Subtitle */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                  <Wallet className="h-5 w-5 stroke-[1.8]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug truncate">
                    {tx.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {tx.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Side: Amount + Date + Status Badge + Download Icon */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pl-14 sm:pl-0">
                <div className="text-left sm:text-right">
                  <div className="text-sm sm:text-[15px] font-bold text-slate-900">
                    {tx.amount}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {tx.date}
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {tx.status === "Active" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eff6ff] text-[#2563eb] border border-blue-200">
                      Active
                    </span>
                  )}
                  {tx.status === "Completed" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
                      Completed
                    </span>
                  )}
                  {tx.status === "Cancelled" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f1f5f9] text-slate-500 border border-slate-200">
                      Cancelled
                    </span>
                  )}
                </div>

                {/* Download Receipt Icon Button */}
                <button
                  type="button"
                  onClick={(e) => handleDownloadInvoice(tx, e)}
                  title="Download receipt"
                  className="text-slate-300 hover:text-[#2563eb] transition-colors p-1 cursor-pointer active:scale-90"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 6. Transaction Details Modal */}
      {selectedTx && (
        <div
          onClick={() => setSelectedTx(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setSelectedTx(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Transaction Receipt
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedTx.invoiceNumber || "INV-2026-0001"}
                </p>
              </div>
            </div>

            {/* Details Box */}
            <div className="bg-[#f8fafc] rounded-2xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm my-4 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Property / Item:</span>
                <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                  {selectedTx.title}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Description:</span>
                <span className="font-medium text-slate-700 text-right">
                  {selectedTx.subtitle}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="font-medium text-slate-700">
                  {selectedTx.date}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Payment Method:</span>
                <span className="font-medium text-slate-700">
                  {selectedTx.paymentMethod || "Bank Transfer"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <span
                  className={cn(
                    "font-bold text-xs px-2.5 py-0.5 rounded-full",
                    selectedTx.status === "Active" && "bg-blue-50 text-blue-600",
                    selectedTx.status === "Completed" && "bg-emerald-50 text-emerald-600",
                    selectedTx.status === "Cancelled" && "bg-slate-100 text-slate-600"
                  )}
                >
                  {selectedTx.status}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm sm:text-base">
                <span className="font-bold text-slate-800">Total Amount:</span>
                <span className="font-black text-[#2563eb]">
                  {selectedTx.amount}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={(e) => {
                  handleDownloadInvoice(selectedTx, e);
                  setSelectedTx(null);
                }}
                className="flex-1 h-10 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
