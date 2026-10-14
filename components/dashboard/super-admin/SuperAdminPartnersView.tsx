"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Eye,
  Check,
  X,
  CheckCircle2,
  FileText,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  ShieldCheck,
  Award,
  Building,
  Scale,
  Users,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { superAdminPartnerApplicantsList } from "./data";
import { SuperAdminPartnerApplicant } from "./types";

const fallbackApplicants: SuperAdminPartnerApplicant[] = [
  {
    id: "app-1",
    initials: "HW",
    name: "Hendra Wijaya",
    email: "hendra@email.com",
    applied: "2026-10-01",
    experience: "5 years",
    area: "Bali",
    docs: "3 files",
    status: "Pending Review",
    phone: "+62 812-3456-7890",
    agency: "Apex Realty Bali",
    licenseNumber: "AREBI-BALI-2021-9982",
    files: ["AREBI_License_2026.pdf", "Tax_NPWP_Hendra.pdf", "Broker_ID_Card.png"],
  },
  {
    id: "app-2",
    initials: "MP",
    name: "Maya Putri",
    email: "maya@email.com",
    applied: "2026-09-28",
    experience: "8 years",
    area: "Jakarta",
    docs: "3 files",
    status: "Approved",
    phone: "+62 811-2345-6789",
    agency: "Metro Capital Properties",
    licenseNumber: "AREBI-DKI-2018-4421",
    files: ["AREBI_Certification.pdf", "ID_KTP.pdf", "Listing_Portfolio.pdf"],
  },
  {
    id: "app-3",
    initials: "TS",
    name: "Tono Susanto",
    email: "tono@email.com",
    applied: "2026-09-25",
    experience: "3 years",
    area: "Bandung",
    docs: "2 files",
    status: "Pending Review",
    phone: "+62 813-9876-5432",
    agency: "Bandung Prime Realty",
    licenseNumber: "AREBI-JBR-2023-1088",
    files: ["AREBI_Associate_Cert.pdf", "ID_Card.png"],
  },
  {
    id: "app-4",
    initials: "DP",
    name: "Diah Permata",
    email: "diah@email.com",
    applied: "2026-09-20",
    experience: "1 year",
    area: "Surabaya",
    docs: "1 files",
    status: "Rejected",
    phone: "+62 819-8765-4321",
    agency: "Surabaya Horizon Living",
    licenseNumber: "PENDING-SUR-2026",
    files: ["Application_Letter.pdf"],
  },
];

type PartnerTab = "agent_applications" | "notary_legal" | "other_partners";

export default function SuperAdminPartnersView() {
  const [applicants, setApplicants] = useState<SuperAdminPartnerApplicant[]>(() =>
    Array.isArray(superAdminPartnerApplicantsList) && superAdminPartnerApplicantsList.length > 0
      ? superAdminPartnerApplicantsList
      : fallbackApplicants
  );

  const [activeTab, setActiveTab] = useState<PartnerTab>("agent_applications");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [viewingApplicant, setViewingApplicant] = useState<SuperAdminPartnerApplicant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const safeApplicants = Array.isArray(applicants) ? applicants : fallbackApplicants;

  // Counts for KPI Cards
  const countPending = safeApplicants.filter((a) => a.status === "Pending Review").length;
  const countApproved = safeApplicants.filter((a) => a.status === "Approved").length;
  const countRejected = safeApplicants.filter((a) => a.status === "Rejected").length;
  const countSuspended = safeApplicants.filter((a) => a.status === "Suspended").length;

  // Filtered applicants
  const filteredApplicants = useMemo(() => {
    return safeApplicants.filter((app) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = app.name.toLowerCase().includes(q);
        const matchEmail = app.email.toLowerCase().includes(q);
        const matchArea = app.area.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchArea) return false;
      }

      if (statusFilter !== "All Statuses" && app.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [safeApplicants, searchQuery, statusFilter]);

  // Actions
  const handleApprove = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a))
    );
    if (viewingApplicant && viewingApplicant.id === id) {
      setViewingApplicant((prev) => (prev ? { ...prev, status: "Approved" } : null));
    }
    showToast(`✓ Approved partner application for ${name}.`);
  };

  const handleReject = (id: string, name: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a))
    );
    if (viewingApplicant && viewingApplicant.id === id) {
      setViewingApplicant((prev) => (prev ? { ...prev, status: "Rejected" } : null));
    }
    showToast(`✕ Application for ${name} marked as Rejected.`);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section matching screenshot */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
          Partner Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
          Agents, notaries, service partners, and applications
        </p>
      </div>

      {/* 2. Navigation Tabs Row matching screenshot */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-100 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("agent_applications")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "agent_applications"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Agent Applications
          {activeTab === "agent_applications" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("notary_legal")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "notary_legal"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Notary / Legal
          {activeTab === "notary_legal" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("other_partners")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "other_partners"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Other Partners
          {activeTab === "other_partners" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* 3. 4 Top KPI Metric Cards matching screenshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* 1. Pending */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-amber-500 leading-tight block">
            {countPending}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Pending
          </span>
        </div>

        {/* 2. Approved */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-emerald-500 leading-tight block">
            {countApproved}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Approved
          </span>
        </div>

        {/* 3. Rejected */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-red-500 leading-tight block">
            {countRejected}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Rejected
          </span>
        </div>

        {/* 4. Suspended */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-slate-400 leading-tight block">
            {countSuspended}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Suspended
          </span>
        </div>
      </div>

      {/* 4. Tab 1: Agent Applications (Default matching screenshot) */}
      {activeTab === "agent_applications" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
          {/* Filter Toolbar matching screenshot */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-2xs"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <option>All Statuses</option>
                <option>Pending Review</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Suspended</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Table matching screenshot columns and styling */}
          <div className="w-full overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                  <th className="py-3 px-5">APPLICANT</th>
                  <th className="py-3 px-5">CONTACT</th>
                  <th className="py-3 px-5">APPLIED</th>
                  <th className="py-3 px-5">EXPERIENCE</th>
                  <th className="py-3 px-5">AREA</th>
                  <th className="py-3 px-5">DOCS</th>
                  <th className="py-3 px-5">STATUS</th>
                  <th className="py-3 px-5 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No partner applicants match your search.
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map((app) => {
                    // Status pill styling
                    let statusBadge = "bg-amber-50 text-amber-700 border-amber-200/60";
                    if (app.status === "Approved") {
                      statusBadge = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
                    } else if (app.status === "Rejected") {
                      statusBadge = "bg-red-50 text-red-700 border-red-200/60";
                    } else if (app.status === "Suspended") {
                      statusBadge = "bg-slate-100 text-slate-600 border-slate-200/60";
                    }

                    return (
                      <tr
                        key={app.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* APPLICANT: Avatar + Name */}
                        <td className="py-3.5 px-5 font-medium text-slate-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {app.initials}
                            </div>
                            <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                              {app.name}
                            </span>
                          </div>
                        </td>

                        {/* CONTACT */}
                        <td className="py-3.5 px-5 text-slate-500 text-xs">
                          {app.email}
                        </td>

                        {/* APPLIED */}
                        <td className="py-3.5 px-5 text-slate-500 text-xs whitespace-nowrap">
                          {app.applied}
                        </td>

                        {/* EXPERIENCE */}
                        <td className="py-3.5 px-5 text-slate-700 text-xs whitespace-nowrap">
                          {app.experience}
                        </td>

                        {/* AREA */}
                        <td className="py-3.5 px-5 text-slate-700 text-xs whitespace-nowrap">
                          {app.area}
                        </td>

                        {/* DOCS */}
                        <td className="py-3.5 px-5 text-slate-500 text-xs whitespace-nowrap">
                          {app.docs}
                        </td>

                        {/* STATUS */}
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border inline-block",
                              statusBadge
                            )}
                          >
                            {app.status}
                          </span>
                        </td>

                        {/* ACTIONS matching screenshot */}
                        <td className="py-3.5 px-5 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Preview Eye */}
                            <button
                              type="button"
                              onClick={() => setViewingApplicant(app)}
                              className="p-1.5 rounded-lg text-slate-300 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Review Dossier"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            {/* Approve & Reject for Pending Review */}
                            {app.status === "Pending Review" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleApprove(app.id, app.name)}
                                  className="p-1.5 rounded-lg text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                                  title="Approve Applicant"
                                >
                                  <Check className="h-4 w-4 stroke-[2.5]" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleReject(app.id, app.name)}
                                  className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Reject Applicant"
                                >
                                  <X className="h-4 w-4 stroke-[2.5]" />
                                </button>
                              </>
                            )}
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
      )}

      {/* Tab 2: Notary / Legal */}
      {activeTab === "notary_legal" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Verified Notaries & Land Deed Officials (PPAT)
              </h3>
              <p className="text-xs text-slate-400">
                Accredited legal partners handling title transfers, escrow, and AJB deed notarization
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              4 Certified Notaries
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Kantor Notaris & PPAT Maria Siregar, S.H., M.Kn.",
                region: "Jakarta Selatan",
                specialty: "Strata Title & Commercial Escrow",
                activeContracts: "18 transactions",
              },
              {
                name: "Notaris I Wayan Darmada, S.H.",
                region: "Badung, Bali",
                specialty: "Hak Milik / PMA Foreign Investment Structuring",
                activeContracts: "24 transactions",
              },
            ].map((notary, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-slate-900">{notary.name}</span>
                </div>
                <p className="text-slate-500">
                  <strong>Jurisdiction:</strong> {notary.region}
                </p>
                <p className="text-slate-500">
                  <strong>Expertise:</strong> {notary.specialty}
                </p>
                <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                  {notary.activeContracts}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Other Partners */}
      {activeTab === "other_partners" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Ecosystem Vendor & Service Partners
              </h3>
              <p className="text-xs text-slate-400">
                Contractors, building inspectors, 3D virtual tour photographers, and mortgage banking partners
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              12 Ecosystem Partners
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
              <span className="font-bold text-slate-900 block">Bank Mandiri KPR</span>
              <p className="text-slate-500 text-[11px]">Primary mortgage financing integration</p>
              <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold">
                Banking Partner
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
              <span className="font-bold text-slate-900 block">InspectAsia Technical Audit</span>
              <p className="text-slate-500 text-[11px]">Structural engineering & MEP inspection</p>
              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold">
                Inspection Partner
              </span>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
              <span className="font-bold text-slate-900 block">Matterport Bali 3D VR</span>
              <p className="text-slate-500 text-[11px]">Virtual 3D digital twin photography</p>
              <span className="inline-block px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-semibold">
                Media Partner
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Floating 'Back to Portal Select' Button */}
      <div className="flex justify-center pt-2 pb-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm hover:shadow hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Portal Select</span>
        </Link>
      </div>

      {/* Modal: View Applicant Dossier */}
      {viewingApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setViewingApplicant(null)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center shrink-0">
                  {viewingApplicant.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {viewingApplicant.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {viewingApplicant.agency || "Independent Licensed Broker"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingApplicant(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Operating Area:</strong> {viewingApplicant.area}, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Experience:</strong> {viewingApplicant.experience} in real estate brokerage
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Email:</strong> {viewingApplicant.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Phone:</strong> {viewingApplicant.phone || "+62 812-XXXX-XXXX"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Applied Date:</strong> {viewingApplicant.applied}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>License Reference:</strong> {viewingApplicant.licenseNumber || "AREBI-VERIFIED-2026"}
                </span>
              </div>

              {viewingApplicant.files && viewingApplicant.files.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
                  <strong className="text-slate-800 block text-[11px]">
                    Uploaded Verification Files ({viewingApplicant.files.length})
                  </strong>
                  <div className="space-y-1">
                    {viewingApplicant.files.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-[11px] text-blue-600 bg-white p-1.5 rounded-lg border border-slate-100"
                      >
                        <span className="flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-slate-400" />
                          {f}
                        </span>
                        <span className="text-[10px] text-slate-400">PDF Document</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500">
                Status: <strong className="text-slate-900">{viewingApplicant.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                {viewingApplicant.status === "Pending Review" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleReject(viewingApplicant.id, viewingApplicant.name)}
                      className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(viewingApplicant.id, viewingApplicant.name)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
                    >
                      Approve Partner
                    </button>
                  </>
                )}
                {viewingApplicant.status !== "Pending Review" && (
                  <button
                    type="button"
                    onClick={() => setViewingApplicant(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
