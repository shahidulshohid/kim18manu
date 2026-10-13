"use client";

import React, { useState } from "react";
import {
  Shield,
  Wallet,
  Wrench,
  Zap,
  Sparkles,
  Wind,
  Calendar,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ElementType;
}

export interface ServiceRequest {
  id: string;
  category: string;
  status: "Assigned" | "Submitted" | "Completed" | "Cancelled";
  vendorName: string;
  property: string;
  date: string;
  price: string;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: "cat-1", name: "Notary / Legal", icon: Shield },
  { id: "cat-2", name: "Bank / Mortgage", icon: Wallet },
  { id: "cat-3", name: "Insurance", icon: Shield },
  { id: "cat-4", name: "Contractor / Renovation", icon: Wrench },
  { id: "cat-5", name: "AC Service", icon: Wind },
  { id: "cat-6", name: "Electrical", icon: Zap },
  { id: "cat-7", name: "Plumbing", icon: Wrench },
  { id: "cat-8", name: "Cleaning", icon: Sparkles },
  { id: "cat-9", name: "Other", icon: Wrench },
];

const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: "sr-1",
    category: "Cleaning",
    status: "Assigned",
    vendorName: "CleanPro Services",
    property: "Spacious Family House",
    date: "2026-10-03",
    price: "IDR 350,000",
  },
  {
    id: "sr-2",
    category: "Notary / Legal",
    status: "Submitted",
    vendorName: "Notaris Budiman & Associates",
    property: "Modern Villa with Ocean View",
    date: "2026-10-10",
    price: "IDR 5,000,000",
  },
  {
    id: "sr-3",
    category: "AC Service",
    status: "Completed",
    vendorName: "CoolTech HVAC",
    property: "Spacious Family House",
    date: "2026-09-18",
    price: "IDR 250,000",
  },
];

export default function ServicesView() {
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  // Form states for new service modal
  const [selectedProperty, setSelectedProperty] = useState("Modern Villa with Ocean View");
  const [reqDate, setReqDate] = useState("");
  const [notes, setNotes] = useState("");

  // Cancel Confirmation Modal State
  const [cancelTarget, setCancelTarget] = useState<ServiceRequest | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    const newReq: ServiceRequest = {
      id: `sr-${Date.now()}`,
      category: selectedCategory.name,
      status: "Submitted",
      vendorName: `${selectedCategory.name} Partner`,
      property: selectedProperty,
      date: reqDate || new Date().toISOString().split("T")[0],
      price: "Estimate upon review",
    };

    setRequests((prev) => [newReq, ...prev]);
    showToast(`Service request for ${selectedCategory.name} submitted successfully!`);
    setSelectedCategory(null);
    setReqDate("");
    setNotes("");
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;

    setRequests((prev) => prev.filter((r) => r.id !== cancelTarget.id));
    showToast(`Service request for ${cancelTarget.vendorName} has been cancelled.`);
    setCancelTarget(null);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
          Services
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Request and manage property-related services.
        </p>
      </div>

      {/* 2. REQUEST A SERVICE Section */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 sm:mb-4">
          REQUEST A SERVICE
        </h2>

        {/* 9 Service Categories Grid (5 columns on desktop matching screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md hover:border-blue-100 transition-all group active:scale-95 min-h-[105px]"
              >
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center mb-2 sm:mb-2.5 group-hover:bg-[#2563eb] group-hover:text-white transition-colors shrink-0">
                  <Icon className="h-5 w-5 stroke-[1.8]" />
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-slate-700 group-hover:text-[#2563eb] transition-colors leading-tight">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. MY SERVICE REQUESTS Section */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 sm:mb-4">
          MY SERVICE REQUESTS
        </h2>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 sm:p-6 transition-all hover:shadow-md"
            >
              {/* Row 1: Badges & Cancel Button */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Pill */}
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eff6ff] text-[#2563eb] border border-blue-200">
                    {req.category}
                  </span>

                  {/* Status Pill */}
                  {req.status === "Assigned" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#faf5ff] text-[#9333ea] border border-purple-200">
                      Assigned
                    </span>
                  )}
                  {req.status === "Submitted" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eff6ff] text-[#0284c7] border border-sky-200">
                      Submitted
                    </span>
                  )}
                  {req.status === "Completed" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
                      Completed
                    </span>
                  )}
                </div>

                {/* Cancel Button (Only for non-completed) */}
                {req.status !== "Completed" && (
                  <button
                    type="button"
                    onClick={() => setCancelTarget(req)}
                    className="border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer active:scale-95 shrink-0"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Row 2: Title (Vendor Name) */}
              <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-snug mt-2.5">
                {req.vendorName}
              </h3>

              {/* Row 3: Property Name */}
              <p className="text-xs text-slate-400 mt-0.5 font-normal">
                {req.property}
              </p>

              {/* Row 4: Date & Price */}
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{req.date}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-slate-800">{req.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 5. Request New Service Modal */}
      {selectedCategory && (
        <div
          onClick={() => setSelectedCategory(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Request {selectedCategory.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select your property and schedule a certified service partner.
            </p>

            <form onSubmit={handleCreateRequest} className="space-y-4 mt-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Select Property
                </label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                >
                  <option value="Modern Villa with Ocean View">
                    Modern Villa with Ocean View (Jimbaran)
                  </option>
                  <option value="Spacious Family House">
                    Spacious Family House (Dago, Bandung)
                  </option>
                  <option value="Cozy Apartment in SCBD">
                    Cozy Apartment in SCBD (Jakarta)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={reqDate}
                  onChange={(e) => setReqDate(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Notes / Requirements
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail any specific requirements or instructions..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="flex-1 h-10 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Cancel Service Confirmation Modal */}
      {cancelTarget && (
        <div
          onClick={() => setCancelTarget(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 text-center animate-in zoom-in-95 duration-200"
          >
            <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="h-6 w-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Cancel Service Request?
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Are you sure you want to cancel the request for{" "}
              <strong className="text-slate-800">{cancelTarget.vendorName}</strong>?
            </p>

            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Keep Request
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
