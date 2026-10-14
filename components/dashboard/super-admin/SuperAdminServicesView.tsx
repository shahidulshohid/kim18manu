"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Eye,
  Edit,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  User,
  Wrench,
  Scale,
  Sparkles,
  Landmark,
  Palette,
  Clock,
  DollarSign,
  AlertCircle,
  SquarePen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  superAdminServiceRequestsList,
  superAdminServiceCategoriesList,
} from "./data";
import {
  SuperAdminServiceRequest,
  SuperAdminServiceCategory,
} from "./types";

const fallbackRequests: SuperAdminServiceRequest[] = [
  {
    id: "SR001",
    customer: "Ahmad Fauzi",
    customerPhone: "+62 812-4455-8899",
    customerEmail: "ahmad.fauzi@gmail.com",
    serviceType: "Notary / Legal",
    assignedPartner: "Notaris Budiman, SH & Rekan",
    partnerContact: "+62 811-9988-7711",
    status: "In Progress",
    submitted: "2026-10-01",
    completion: "2026-10-10",
    property: "Modern Villa — Jimbaran, Bali",
    priceQuote: "IDR 15,000,000",
    notes: "Deed of sale drafting and land certificate verification at BPN Bali.",
  },
  {
    id: "SR002",
    customer: "Lina Kusuma",
    customerPhone: "+62 813-1122-3344",
    customerEmail: "lina.kusuma@outlook.com",
    serviceType: "Cleaning",
    assignedPartner: "CleanPro Services",
    partnerContact: "+62 812-3344-5566",
    status: "Assigned",
    submitted: "2026-10-01",
    completion: "2026-10-03",
    property: "SCBD Apartment Tower 2, Jakarta",
    priceQuote: "IDR 2,400,000",
    notes: "Deep cleaning before tenant handover scheduled for 2026-10-03.",
  },
  {
    id: "SR003",
    customer: "Bimo Santoso",
    customerPhone: "+62 817-5566-7788",
    customerEmail: "bimo.s@techgroup.co.id",
    serviceType: "AC Service",
    assignedPartner: "CoolTech HVAC",
    partnerContact: "+62 818-7788-9900",
    status: "Completed",
    submitted: "2026-09-18",
    completion: "2026-09-18",
    property: "Family House — Kemang, Jakarta",
    priceQuote: "IDR 1,200,000",
    notes: "Filter wash and freon recharge across 5 split units completed with warranty.",
  },
  {
    id: "SR004",
    customer: "James Kwon",
    customerPhone: "+62 819-0011-2233",
    customerEmail: "james.kwon@investasia.com",
    serviceType: "Bank / Mortgage",
    assignedPartner: "BNI Mortgage Div.",
    partnerContact: "+62 811-2233-4455",
    status: "Pending",
    submitted: "2026-09-28",
    completion: "TBD",
    property: "Menteng Heritage Mansion, Jakarta",
    priceQuote: "IDR 35,000,000 (Origination)",
    notes: "KPR premium appraisal and income documentation under review.",
  },
];

type MainTab = "Service Requests" | "Service Categories";

interface SuperAdminServicesViewProps {
  initialRequests?: SuperAdminServiceRequest[];
  categories?: SuperAdminServiceCategory[];
}

export default function SuperAdminServicesView({
  initialRequests = superAdminServiceRequestsList,
  categories = superAdminServiceCategoriesList,
}: SuperAdminServicesViewProps) {
  // Defensive fallback data
  const safeInitial =
    Array.isArray(initialRequests) && initialRequests.length > 0
      ? initialRequests
      : fallbackRequests;

  const [activeTab, setActiveTab] = useState<MainTab>("Service Requests");
  const [requests, setRequests] = useState<SuperAdminServiceRequest[]>(safeInitial);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Modals & toasts
  const [selectedRequest, setSelectedRequest] = useState<SuperAdminServiceRequest | null>(null);
  const [editingRequest, setEditingRequest] = useState<SuperAdminServiceRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Status badge style helper
  const getStatusBadge = (status: SuperAdminServiceRequest["status"]) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-50 text-blue-600 border-blue-200/80";
      case "Assigned":
        return "bg-indigo-50 text-indigo-600 border-indigo-200/80";
      case "Completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/80";
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-200/80";
      case "Cancelled":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  // Filtered requests list
  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      // Type filter
      if (selectedType !== "All Types" && item.serviceType !== selectedType) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "All Statuses" && item.status !== selectedStatus) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesCustomer = item.customer.toLowerCase().includes(q);
        const matchesType = item.serviceType.toLowerCase().includes(q);
        const matchesPartner = item.assignedPartner.toLowerCase().includes(q);
        if (!matchesId && !matchesCustomer && !matchesType && !matchesPartner) {
          return false;
        }
      }

      return true;
    });
  }, [requests, selectedType, selectedStatus, searchQuery]);

  // Unique service types for dropdown
  const serviceTypeOptions = useMemo(() => {
    const list = Array.from(new Set(safeInitial.map((r) => r.serviceType)));
    return ["All Types", ...list];
  }, [safeInitial]);

  // Unique statuses for dropdown
  const statusOptions = useMemo(() => {
    const list = Array.from(new Set(safeInitial.map((r) => r.status)));
    return ["All Statuses", ...list];
  }, [safeInitial]);

  // Handle Edit Save
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;
    setRequests((prev) =>
      prev.map((r) => (r.id === editingRequest.id ? editingRequest : r))
    );
    showToast(`Updated request ${editingRequest.id} successfully!`);
    setEditingRequest(null);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24 text-slate-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 backdrop-blur px-4 py-3 text-xs font-medium text-white shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="pt-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Services Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
          Service requests, partner assignments, and status workflow
        </p>
      </div>

      {/* TABS ROW */}
      <div className="border-b border-slate-200">
        <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {(["Service Requests", "Service Categories"] as MainTab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative pb-3 text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer",
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-slate-400 hover:text-slate-700 font-medium"
                )}
              >
                <span>{tab}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === "Service Requests" ? (
        <>
          {/* WORKFLOW PIPELINE STATUS PILLS */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
            {/* 1. Submitted */}
            <button
              onClick={() => setSelectedStatus(selectedStatus === "Pending" ? "All Statuses" : "Pending")}
              className="px-3.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all shrink-0 cursor-pointer"
            >
              Submitted
            </button>

            <span className="text-slate-300 text-xs">→</span>

            {/* 2. Assigned to Partner */}
            <button
              onClick={() => setSelectedStatus(selectedStatus === "Assigned" ? "All Statuses" : "Assigned")}
              className="px-3.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all shrink-0 cursor-pointer"
            >
              Assigned to Partner
            </button>

            <span className="text-slate-300 text-xs">→</span>

            {/* 3. In Progress (Blue) */}
            <button
              onClick={() => setSelectedStatus(selectedStatus === "In Progress" ? "All Statuses" : "In Progress")}
              className="px-3.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200/80 hover:bg-blue-100/70 rounded-full transition-all shrink-0 cursor-pointer"
            >
              In Progress
            </button>

            <span className="text-slate-300 text-xs">→</span>

            {/* 4. Completed (Green) */}
            <button
              onClick={() => setSelectedStatus(selectedStatus === "Completed" ? "All Statuses" : "Completed")}
              className="px-3.5 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/70 rounded-full transition-all shrink-0 cursor-pointer"
            >
              Completed
            </button>

            <span className="text-slate-300 text-xs">→</span>

            {/* 5. Cancelled */}
            <button
              onClick={() => setSelectedStatus(selectedStatus === "Cancelled" ? "All Statuses" : "Cancelled")}
              className="px-3.5 py-1 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all shrink-0 cursor-pointer"
            >
              Cancelled
            </button>
          </div>

          {/* MAIN TABLE CONTAINER */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            {/* FILTER TOOLBAR */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-b border-slate-100">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
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

              {/* Service Type Dropdown */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full sm:w-auto appearance-none pl-3 pr-8 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-colors shadow-2xs"
                >
                  {serviceTypeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full sm:w-auto appearance-none pl-3 pr-8 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-colors shadow-2xs"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                    <th className="py-3.5 px-4 sm:px-6">ID</th>
                    <th className="py-3.5 px-4 sm:px-6">Customer</th>
                    <th className="py-3.5 px-4 sm:px-6">Service Type</th>
                    <th className="py-3.5 px-4 sm:px-6">Assigned Partner</th>
                    <th className="py-3.5 px-4 sm:px-6">Status</th>
                    <th className="py-3.5 px-4 sm:px-6">Submitted</th>
                    <th className="py-3.5 px-4 sm:px-6">Completion</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        <p className="text-sm font-medium">No service requests found</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Try adjusting search query or filters
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => {
                      return (
                        <tr
                          key={req.id}
                          className="hover:bg-slate-50/70 transition-colors group"
                        >
                          {/* ID */}
                          <td className="py-4 px-4 sm:px-6 font-mono text-[11px] font-medium text-slate-500 whitespace-nowrap">
                            {req.id}
                          </td>

                          {/* CUSTOMER */}
                          <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">
                            {req.customer}
                          </td>

                          {/* SERVICE TYPE: Blue Pill */}
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200/80">
                              {req.serviceType}
                            </span>
                          </td>

                          {/* ASSIGNED PARTNER */}
                          <td className="py-4 px-4 sm:px-6 text-slate-700 whitespace-nowrap">
                            <span
                              title={req.assignedPartner}
                              className="font-normal"
                            >
                              {req.assignedPartner.length > 17
                                ? `${req.assignedPartner.substring(0, 15)}...`
                                : req.assignedPartner}
                            </span>
                          </td>

                          {/* STATUS */}
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                            <span
                              className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                                getStatusBadge(req.status)
                              )}
                            >
                              {req.status}
                            </span>
                          </td>

                          {/* SUBMITTED */}
                          <td className="py-4 px-4 sm:px-6 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                            {req.submitted}
                          </td>

                          {/* COMPLETION */}
                          <td className="py-4 px-4 sm:px-6 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                            {req.completion}
                          </td>

                          {/* ACTIONS */}
                          <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              {/* Preview / Eye */}
                              <button
                                onClick={() => setSelectedRequest(req)}
                                title="View details"
                                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4 stroke-[1.8]" />
                              </button>

                              {/* Edit / Pencil */}
                              <button
                                onClick={() => setEditingRequest(req)}
                                title="Edit request status & partner"
                                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              >
                                <SquarePen className="w-4 h-4 stroke-[1.8]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* SERVICE CATEGORIES TAB */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Wrench className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  {cat.activePartners} Partners Active
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-50 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Avg Turnaround
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {cat.avgTurnaround}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Pricing Model
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">
                    {cat.pricingModel}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Service Request Details
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {selectedRequest.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                  {selectedRequest.serviceType}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                    getStatusBadge(selectedRequest.status)
                  )}
                >
                  {selectedRequest.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Customer Name
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {selectedRequest.customer}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Contact Phone
                  </span>
                  <p className="font-semibold text-slate-700 mt-0.5 font-mono">
                    {selectedRequest.customerPhone || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Assigned Partner
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {selectedRequest.assignedPartner}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Est. Completion
                  </span>
                  <p className="font-semibold text-slate-700 mt-0.5 font-mono">
                    {selectedRequest.completion}
                  </p>
                </div>
              </div>

              {selectedRequest.property && (
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-blue-700">
                    Associated Property
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {selectedRequest.property}
                  </p>
                </div>
              )}

              {selectedRequest.notes && (
                <div>
                  <span className="text-[11px] font-bold text-slate-600">
                    Workflow & Service Scope Notes:
                  </span>
                  <p className="text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {selectedRequest.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEditingRequest(selectedRequest);
                  setSelectedRequest(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <SquarePen className="w-3.5 h-3.5" />
                <span>Edit Request</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT REQUEST MODAL */}
      {editingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <form
            onSubmit={handleSaveEdit}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900">
                Update Service Request: {editingRequest.id}
              </h3>
              <button
                type="button"
                onClick={() => setEditingRequest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Status
                </label>
                <select
                  value={editingRequest.status}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      status: e.target.value as SuperAdminServiceRequest["status"],
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Pending">Pending</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Assigned Partner
                </label>
                <input
                  type="text"
                  value={editingRequest.assignedPartner}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      assignedPartner: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Target Completion Date
                </label>
                <input
                  type="text"
                  value={editingRequest.completion}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      completion: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setEditingRequest(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
