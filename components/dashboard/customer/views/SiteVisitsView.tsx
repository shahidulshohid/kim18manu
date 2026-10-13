"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  X,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SiteVisit {
  id: string;
  title: string;
  status: "Confirmed" | "Pending Confirmation" | "Completed" | "Cancelled";
  location: string;
  date: string;
  time: string;
  agent: string;
  note?: string;
  rawDate?: string;
}

const INITIAL_VISITS: SiteVisit[] = [
  {
    id: "sv-1",
    title: "Modern Villa with Ocean View",
    status: "Confirmed",
    location: "Jimbaran, Bali",
    date: "5 October 2026",
    time: "10:00 WIB",
    agent: "Budi Santoso",
    note: "Please bring your ID and arrive 5 minutes early.",
  },
  {
    id: "sv-2",
    title: "Cozy Apartment in Business District",
    status: "Pending Confirmation",
    location: "SCBD, Jakarta Selatan",
    date: "12 October 2026",
    time: "14:00 WIB",
    agent: "Sari Dewi",
  },
  {
    id: "sv-3",
    title: "Spacious Family House with Garden",
    status: "Completed",
    location: "Dago, Bandung",
    date: "20 September 2026",
    time: "09:00 WIB",
    agent: "Rizki Pratama",
    note: "Great visit! Property as described.",
  },
  {
    id: "sv-4",
    title: "Minimalist Studio — BSD City",
    status: "Cancelled",
    location: "BSD City, Tangerang Selatan",
    date: "15 September 2026",
    time: "11:00 WIB",
    agent: "Dewi Hartati",
  },
];

export default function SiteVisitsView() {
  const [visits, setVisits] = useState<SiteVisit[]>(INITIAL_VISITS);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  // Reschedule Modal State
  const [rescheduleItem, setRescheduleItem] = useState<SiteVisit | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Cancel Confirmation Modal State
  const [cancelTarget, setCancelTarget] = useState<SiteVisit | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Helper to format ISO date (YYYY-MM-DD) to "D MMMM YYYY"
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parts[0];
        const monthIdx = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        if (months[monthIdx]) {
          return `${day} ${months[monthIdx]} ${year}`;
        }
      }
    } catch {}
    return dateStr;
  };

  // Calculate counts based on status
  const upcomingCount = visits.filter(
    (v) => v.status === "Confirmed" || v.status === "Pending Confirmation"
  ).length;
  const completedCount = visits.filter((v) => v.status === "Completed").length;
  const cancelledCount = visits.filter((v) => v.status === "Cancelled").length;

  // Filtered visits
  const filteredVisits = visits.filter((visit) => {
    if (selectedFilter === "upcoming") {
      return visit.status === "Confirmed" || visit.status === "Pending Confirmation";
    }
    if (selectedFilter === "completed") {
      return visit.status === "Completed";
    }
    if (selectedFilter === "cancelled") {
      return visit.status === "Cancelled";
    }
    return true;
  });

  // Handle Reschedule submit
  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleItem) return;

    const formattedDate = newDate ? formatDateDisplay(newDate) : rescheduleItem.date;
    const chosenTime = newTime || rescheduleItem.time;

    setVisits((prev) =>
      prev.map((v) =>
        v.id === rescheduleItem.id
          ? {
              ...v,
              date: formattedDate,
              time: chosenTime,
              status: "Pending Confirmation",
              note: "Reschedule request submitted. Agent will confirm shortly.",
            }
          : v
      )
    );

    showToast(`Visit for "${rescheduleItem.title}" rescheduled successfully!`);
    setRescheduleItem(null);
    setNewDate("");
    setNewTime("");
  };

  // Handle Cancel confirmation
  const handleConfirmCancel = () => {
    if (!cancelTarget) return;

    setVisits((prev) =>
      prev.map((v) =>
        v.id === cancelTarget.id
          ? {
              ...v,
              status: "Cancelled",
              note: undefined,
            }
          : v
      )
    );

    showToast(`Visit for "${cancelTarget.title}" has been cancelled.`);
    setCancelTarget(null);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
          Site Visits
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your scheduled and past property visits.
        </p>
      </div>

      {/* 2. Top Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Upcoming Card */}
        <div
          onClick={() =>
            setSelectedFilter((prev) => (prev === "upcoming" ? "all" : "upcoming"))
          }
          className={cn(
            "bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center transition-all cursor-pointer active:scale-98 hover:shadow-md",
            selectedFilter === "upcoming"
              ? "border-[#2563eb] ring-2 ring-blue-500/20"
              : "border-slate-100 hover:border-blue-100"
          )}
        >
          <span className="text-2xl sm:text-3xl font-bold text-[#2563eb] leading-tight">
            {upcomingCount}
          </span>
          <span className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Upcoming
          </span>
        </div>

        {/* Completed Card */}
        <div
          onClick={() =>
            setSelectedFilter((prev) => (prev === "completed" ? "all" : "completed"))
          }
          className={cn(
            "bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center transition-all cursor-pointer active:scale-98 hover:shadow-md",
            selectedFilter === "completed"
              ? "border-[#16a34a] ring-2 ring-emerald-500/20"
              : "border-slate-100 hover:border-emerald-100"
          )}
        >
          <span className="text-2xl sm:text-3xl font-bold text-[#16a34a] leading-tight">
            {completedCount}
          </span>
          <span className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Completed
          </span>
        </div>

        {/* Cancelled Card */}
        <div
          onClick={() =>
            setSelectedFilter((prev) => (prev === "cancelled" ? "all" : "cancelled"))
          }
          className={cn(
            "bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center transition-all cursor-pointer active:scale-98 hover:shadow-md",
            selectedFilter === "cancelled"
              ? "border-slate-400 ring-2 ring-slate-400/20"
              : "border-slate-100 hover:border-slate-200"
          )}
        >
          <span className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
            {cancelledCount}
          </span>
          <span className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Cancelled
          </span>
        </div>
      </div>

      {/* 3. Filter Reset Indicator (if active) */}
      {selectedFilter !== "all" && (
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Showing: <strong className="text-slate-800">{selectedFilter}</strong> visits
          </span>
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className="text-xs text-[#2563eb] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Show all visits
          </button>
        </div>
      )}

      {/* 4. Visits List */}
      <div className="space-y-4">
        {filteredVisits.map((visit) => {
          const isUpcoming =
            visit.status === "Confirmed" || visit.status === "Pending Confirmation";

          return (
            <div
              key={visit.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 sm:p-6 transition-all hover:shadow-md hover:border-slate-200/80"
            >
              {/* Row 1: Title, Status Badge, and Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-snug">
                    {visit.title}
                  </h3>

                  {/* Status Badge */}
                  {visit.status === "Confirmed" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]">
                      Confirmed
                    </span>
                  )}

                  {visit.status === "Pending Confirmation" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                      Pending Confirmation
                    </span>
                  )}

                  {visit.status === "Completed" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]">
                      Completed
                    </span>
                  )}

                  {visit.status === "Cancelled" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f1f5f9] text-slate-500 border border-slate-200">
                      Cancelled
                    </span>
                  )}
                </div>

                {/* Action Buttons: Only show for upcoming visits */}
                {isUpcoming && (
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setRescheduleItem(visit);
                        setNewDate("");
                        setNewTime("");
                      }}
                      className="border border-[#2563eb] text-[#2563eb] hover:bg-blue-50 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer active:scale-95"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => setCancelTarget(visit)}
                      className="border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer active:scale-95"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Row 2: Location with Pin Icon */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mt-2 truncate">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{visit.location}</span>
              </div>

              {/* Row 3: Date, Time, Agent Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-500 mt-2.5 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{visit.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{visit.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{visit.agent}</span>
                </div>
              </div>

              {/* Row 4: Note Box (if present) */}
              {visit.note && (
                <div className="bg-[#f8fafc] rounded-xl sm:rounded-2xl px-4 py-2.5 text-xs text-slate-500 mt-4 leading-relaxed">
                  {visit.note}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 6. Reschedule Modal Exactly Matching Screenshot media_1791869693608.png */}
      {rescheduleItem && (
        <div
          onClick={() => setRescheduleItem(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
          >
            {/* Top Close Button (Clean X Icon) */}
            <button
              type="button"
              onClick={() => setRescheduleItem(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Title & Property Subtitle */}
            <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-tight">
              Reschedule Visit
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {rescheduleItem.title}
            </p>

            {/* Current schedule info box */}
            <div className="bg-[#f8fafc] rounded-xl px-4 py-3 text-xs text-slate-600 font-medium my-5">
              Current schedule: {rescheduleItem.date} at {rescheduleItem.time}
            </div>

            <form onSubmit={handleConfirmReschedule} className="space-y-4">
              {/* NEW DATE field */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  NEW DATE
                </label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                />
              </div>

              {/* NEW TIME field */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  NEW TIME
                </label>
                <div className="relative">
                  <select
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full h-10 px-3.5 pr-9 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-400">
                      Select time
                    </option>
                    <option value="09:00 WIB">09:00 WIB</option>
                    <option value="10:00 WIB">10:00 WIB</option>
                    <option value="11:00 WIB">11:00 WIB</option>
                    <option value="13:30 WIB">13:30 WIB</option>
                    <option value="14:00 WIB">14:00 WIB</option>
                    <option value="15:30 WIB">15:30 WIB</option>
                    <option value="16:30 WIB">16:30 WIB</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Bottom Action Buttons: Keep Current & Confirm Reschedule */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRescheduleItem(null)}
                  className="flex-1 h-10 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Keep Current
                </button>
                <button
                  type="submit"
                  className={cn(
                    "flex-1 h-10 rounded-xl text-xs sm:text-sm font-medium text-white shadow-xs transition-all cursor-pointer active:scale-98",
                    newDate && newTime
                      ? "bg-[#2563eb] hover:bg-blue-700"
                      : "bg-[#93b4fd] hover:bg-blue-500"
                  )}
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Cancel Confirmation Modal */}
      {cancelTarget && (
        <div
          onClick={() => setCancelTarget(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 text-center animate-in zoom-in-95 duration-200"
          >
            <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="h-6 w-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Cancel Site Visit?
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Are you sure you want to cancel your visit for{" "}
              <strong className="text-slate-800">{cancelTarget.title}</strong>? Agent{" "}
              <strong className="text-slate-800">{cancelTarget.agent}</strong> will be
              notified.
            </p>

            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Keep Visit
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer active:scale-95"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
