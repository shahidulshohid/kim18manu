"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  User,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  Building2,
  FileText,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface SiteVisitItem {
  id: string;
  property: string;
  status:
    | "Pending Confirmation"
    | "Confirmed"
    | "Completed"
    | "Rescheduled"
    | "Cancelled";
  customer: string;
  agent: string;
  dateTime: string;
  notes?: string;
  outcome?: string;
}

const initialVisits: SiteVisitItem[] = [
  {
    id: "SV-001",
    property: "Modern Villa — Jimbaran",
    status: "Confirmed",
    customer: "Ahmad Fauzi",
    agent: "Budi Santoso",
    dateTime: "2026-10-05 · 10:00 WIB",
    notes: "Client requesting ocean-facing master bedroom tour.",
  },
  {
    id: "SV-002",
    property: "SCBD Apartment 2BR",
    status: "Pending Confirmation",
    customer: "Lina Kusuma",
    agent: "Sari Dewi",
    dateTime: "2026-10-08 · 14:00 WIB",
    notes: "Requires building access pass before arrival.",
  },
  {
    id: "SV-003",
    property: "Seminyak Shophouse",
    status: "Rescheduled",
    customer: "David Tan",
    agent: "Budi Santoso",
    dateTime: "2026-10-03 · 11:00 WIB",
    notes: "Rescheduled from Oct 1 due to customer flight schedule.",
  },
  {
    id: "SV-004",
    property: "Family House — Dago",
    status: "Completed",
    customer: "Siti Rahayu",
    agent: "Rizki Pratama",
    dateTime: "2026-09-30 · 09:00 WIB",
    notes: "Tour completed. Family loved the private backyard garden.",
  },
  {
    id: "SV-005",
    property: "BSD Studio Apartment",
    status: "Cancelled",
    customer: "Tono Wijaya",
    agent: "Dewi Hartati",
    dateTime: "2026-09-28 · 15:00 WIB",
    notes: "Client decided to explore rental options instead.",
  },
];

export default function SiteVisitManagementView() {
  const [visits, setVisits] = useState<SiteVisitItem[]>(initialVisits);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Interactive Modals & Toast
  const [rescheduleTarget, setRescheduleTarget] = useState<SiteVisitItem | null>(null);
  const [outcomeTarget, setOutcomeTarget] = useState<SiteVisitItem | null>(null);
  const [newDateTime, setNewDateTime] = useState("");
  const [outcomeNotes, setOutcomeNotes] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Status Counts
  const counts = useMemo(() => {
    return {
      pending: visits.filter((v) => v.status === "Pending Confirmation").length,
      confirmed: visits.filter((v) => v.status === "Confirmed").length,
      completed: visits.filter((v) => v.status === "Completed").length,
      rescheduled: visits.filter((v) => v.status === "Rescheduled").length,
      cancelled: visits.filter((v) => v.status === "Cancelled").length,
    };
  }, [visits]);

  // Filtered Visits
  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesProp = visit.property.toLowerCase().includes(query);
        const matchesCustomer = visit.customer.toLowerCase().includes(query);
        const matchesAgent = visit.agent.toLowerCase().includes(query);
        if (!matchesProp && !matchesCustomer && !matchesAgent) return false;
      }

      // Status filter
      if (statusFilter !== "All" && visit.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [visits, searchQuery, statusFilter]);

  // Actions
  const handleConfirmVisit = (id: string, propertyName: string) => {
    setVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Confirmed" } : v))
    );
    showToast(`Site visit for ${propertyName} confirmed successfully!`);
  };

  const handleSaveReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleTarget || !newDateTime.trim()) return;
    setVisits((prev) =>
      prev.map((v) =>
        v.id === rescheduleTarget.id
          ? { ...v, status: "Rescheduled", dateTime: newDateTime }
          : v
      )
    );
    showToast(`Site visit for ${rescheduleTarget.property} rescheduled to ${newDateTime}`);
    setRescheduleTarget(null);
    setNewDateTime("");
  };

  const handleSaveOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcomeTarget) return;
    setVisits((prev) =>
      prev.map((v) =>
        v.id === outcomeTarget.id ? { ...v, outcome: outcomeNotes } : v
      )
    );
    showToast(`Outcome recorded for ${outcomeTarget.property}!`);
    setOutcomeTarget(null);
    setOutcomeNotes("");
  };

  // Helper for status badge matching screenshot
  const renderStatusBadge = (status: SiteVisitItem["status"]) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            Confirmed
          </span>
        );
      case "Pending Confirmation":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            Pending Confirmation
          </span>
        );
      case "Rescheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200/60">
            Rescheduled
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200/60">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
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

      {/* Header section matching screenshot */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Site Visit Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          All scheduled site visits. Visits auto-assign to the listing agent.
        </p>
      </div>

      {/* Top 5 Metric Cards matching screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* 1. Pending Confirmation */}
        <div
          onClick={() =>
            setStatusFilter(
              statusFilter === "Pending Confirmation" ? "All" : "Pending Confirmation"
            )
          }
          className={cn(
            "bg-white rounded-2xl border shadow-2xs py-4 px-3 sm:px-4 text-center flex flex-col items-center justify-center cursor-pointer transition-all",
            statusFilter === "Pending Confirmation"
              ? "border-amber-400 ring-2 ring-amber-100"
              : "border-slate-100 hover:border-slate-200"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-amber-500">
            {counts.pending}
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
            Pending Confirmation
          </span>
        </div>

        {/* 2. Confirmed */}
        <div
          onClick={() =>
            setStatusFilter(statusFilter === "Confirmed" ? "All" : "Confirmed")
          }
          className={cn(
            "bg-white rounded-2xl border shadow-2xs py-4 px-3 sm:px-4 text-center flex flex-col items-center justify-center cursor-pointer transition-all",
            statusFilter === "Confirmed"
              ? "border-emerald-400 ring-2 ring-emerald-100"
              : "border-slate-100 hover:border-slate-200"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-emerald-500">
            {counts.confirmed}
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
            Confirmed
          </span>
        </div>

        {/* 3. Completed */}
        <div
          onClick={() =>
            setStatusFilter(statusFilter === "Completed" ? "All" : "Completed")
          }
          className={cn(
            "bg-white rounded-2xl border shadow-2xs py-4 px-3 sm:px-4 text-center flex flex-col items-center justify-center cursor-pointer transition-all",
            statusFilter === "Completed"
              ? "border-emerald-400 ring-2 ring-emerald-100"
              : "border-slate-100 hover:border-slate-200"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-emerald-500">
            {counts.completed}
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
            Completed
          </span>
        </div>

        {/* 4. Rescheduled */}
        <div
          onClick={() =>
            setStatusFilter(
              statusFilter === "Rescheduled" ? "All" : "Rescheduled"
            )
          }
          className={cn(
            "bg-white rounded-2xl border shadow-2xs py-4 px-3 sm:px-4 text-center flex flex-col items-center justify-center cursor-pointer transition-all",
            statusFilter === "Rescheduled"
              ? "border-blue-400 ring-2 ring-blue-100"
              : "border-slate-100 hover:border-slate-200"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-slate-700">
            {counts.rescheduled}
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
            Rescheduled
          </span>
        </div>

        {/* 5. Cancelled */}
        <div
          onClick={() =>
            setStatusFilter(statusFilter === "Cancelled" ? "All" : "Cancelled")
          }
          className={cn(
            "bg-white rounded-2xl border shadow-2xs py-4 px-3 sm:px-4 text-center flex flex-col items-center justify-center cursor-pointer transition-all",
            statusFilter === "Cancelled"
              ? "border-slate-400 ring-2 ring-slate-100"
              : "border-slate-100 hover:border-slate-200"
          )}
        >
          <span className="text-xl sm:text-2xl font-bold text-slate-700">
            {counts.cancelled}
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">
            Cancelled
          </span>
        </div>
      </div>

      {/* Search & Status Filter Row matching screenshot */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by property or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
        </div>

        {/* Status Dropdown */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 sm:w-48 h-10 rounded-xl bg-white border-slate-200 text-xs sm:text-sm font-medium">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Pending Confirmation">Pending Confirmation</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Rescheduled">Rescheduled</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Site Visit Cards List strictly matching screenshot */}
      <div className="space-y-3.5">
        {filteredVisits.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
            No site visits found matching your filter.
          </div>
        ) : (
          filteredVisits.map((visit) => (
            <div
              key={visit.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200 transition-all"
            >
              {/* Left Side: Property Name, Status Badge, Details */}
              <div className="space-y-2">
                {/* Top Row: Property Title & Status Badge */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {visit.property}
                  </h3>
                  {renderStatusBadge(visit.status)}
                </div>

                {/* Bottom Row: Customer, Agent, Date Time */}
                <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap text-xs text-slate-500 font-normal">
                  {/* Customer */}
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>{visit.customer}</span>
                  </span>

                  {/* Agent */}
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span>Agent: {visit.agent}</span>
                  </span>

                  {/* Date & Time */}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{visit.dateTime}</span>
                  </span>
                </div>
              </div>

              {/* Right Side: Action Buttons matching screenshot */}
              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                {/* 1. If Pending Confirmation: Show Confirm + Reschedule */}
                {visit.status === "Pending Confirmation" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleConfirmVisit(visit.id, visit.property)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRescheduleTarget(visit);
                        setNewDateTime(visit.dateTime);
                      }}
                      className="px-3.5 py-1.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Reschedule
                    </button>
                  </>
                )}

                {/* 2. If Confirmed: Show Reschedule */}
                {visit.status === "Confirmed" && (
                  <button
                    type="button"
                    onClick={() => {
                      setRescheduleTarget(visit);
                      setNewDateTime(visit.dateTime);
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reschedule
                  </button>
                )}

                {/* 3. If Completed: Show Add Outcome */}
                {visit.status === "Completed" && (
                  <button
                    type="button"
                    onClick={() => {
                      setOutcomeTarget(visit);
                      setOutcomeNotes(visit.outcome || "");
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Add Outcome
                  </button>
                )}

                {/* 4. Rescheduled or Cancelled: No buttons in screenshot */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL 1: RESCHEDULE SITE VISIT */}
      {rescheduleTarget && (
        <div
          onClick={() => setRescheduleTarget(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Reschedule Site Visit
              </h3>
              <button
                type="button"
                onClick={() => setRescheduleTarget(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReschedule} className="py-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 text-xs">
                <span className="text-slate-400 block text-[11px] uppercase font-bold">Property</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{rescheduleTarget.property}</span>
                <span className="text-slate-500 mt-1 block">Customer: {rescheduleTarget.customer} · Agent: {rescheduleTarget.agent}</span>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  New Date & Time (WIB) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026-10-10 · 11:00 WIB"
                  value={newDateTime}
                  onChange={(e) => setNewDateTime(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRescheduleTarget(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD OUTCOME */}
      {outcomeTarget && (
        <div
          onClick={() => setOutcomeTarget(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Record Visit Outcome
              </h3>
              <button
                type="button"
                onClick={() => setOutcomeTarget(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveOutcome} className="py-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 text-xs">
                <span className="text-slate-400 block text-[11px] uppercase font-bold">Property</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{outcomeTarget.property}</span>
                <span className="text-slate-500 mt-1 block">Customer: {outcomeTarget.customer} · Completed: {outcomeTarget.dateTime}</span>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Visit Outcome / Client Feedback
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Client loved the property and submitted a formal offer of IDR 2.4B..."
                  value={outcomeNotes}
                  onChange={(e) => setOutcomeNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOutcomeTarget(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Outcome
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
