"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Calendar,
  User,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  X,
  Plus,
  Filter,
  ArrowRight,
  MessageSquare,
  FileText,
  DollarSign,
  ChevronDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: "Voice Inbound" | "WhatsApp" | "Web Chat" | "Direct" | "Voice Outbound";
  propertyInterest: string;
  agent: string;
  status: "Qualified" | "Contacted" | "Visit Scheduled" | "New" | "Closed";
  isHot: boolean;
  created: string;
  budget?: string;
  notes?: string;
}

const initialLeads: LeadItem[] = [
  {
    id: "LEAD-001",
    name: "Ahmad Fauzi",
    phone: "+62 812-1111-2222",
    email: "ahmad.fauzi@example.com",
    source: "Voice Inbound",
    propertyInterest: "Modern Villa — Jimbaran",
    agent: "Budi Santoso",
    status: "Qualified",
    isHot: true,
    created: "2026-10-01 09:32",
    budget: "IDR 4,500,000,000",
    notes: "High intent buyer. Looking for 3-4 bedroom luxury villa with ocean view.",
  },
  {
    id: "LEAD-002",
    name: "Lina Kusuma",
    phone: "+62 813-3333-4444",
    email: "lina.kusuma@example.com",
    source: "WhatsApp",
    propertyInterest: "SCBD Apartment 2BR",
    agent: "Sari Dewi",
    status: "Contacted",
    isHot: false,
    created: "2026-10-01 08:15",
    budget: "IDR 3,200,000,000",
    notes: "Requested floor plan and monthly maintenance breakdown.",
  },
  {
    id: "LEAD-003",
    name: "David Tan",
    phone: "+62 878-5555-6666",
    email: "david.tan@example.com",
    source: "Web Chat",
    propertyInterest: "Seminyak Shophouse",
    agent: "Budi Santoso",
    status: "Visit Scheduled",
    isHot: false,
    created: "2026-09-30 14:22",
    budget: "IDR 4,800,000,000",
    notes: "Site visit confirmed for upcoming Saturday at 10:30 AM.",
  },
  {
    id: "LEAD-004",
    name: "Rina Wulandari",
    phone: "+62 821-7777-8888",
    email: "rina.wulandari@example.com",
    source: "Direct",
    propertyInterest: "Family House — Dago",
    agent: "Rizki Pratama",
    status: "New",
    isHot: true,
    created: "2026-09-30 11:05",
    budget: "IDR 2,500,000,000",
    notes: "Ready cash purchaser looking for immediate move-in option.",
  },
  {
    id: "LEAD-005",
    name: "James Kwon",
    phone: "+62 856-9999-0000",
    email: "james.kwon@example.com",
    source: "Voice Outbound",
    propertyInterest: "BSD Studio Apartment",
    agent: "Dewi Hartati",
    status: "Closed",
    isHot: false,
    created: "2026-09-28 16:45",
    budget: "IDR 950,000,000",
    notes: "Contract signed, deposit paid, keys handover scheduled.",
  },
];

export interface FollowUpItem {
  id: string;
  lead: string;
  task: string;
  dueTime: string;
  agent: string;
  isDone: boolean;
}

const initialFollowups: FollowUpItem[] = [
  {
    id: "FU-01",
    lead: "Ahmad Fauzi",
    task: "Call back about Jimbaran villa pricing",
    dueTime: "2026-10-03 10:00",
    agent: "Budi Santoso",
    isDone: false,
  },
  {
    id: "FU-02",
    lead: "Lina Kusuma",
    task: "Send additional photos of SCBD apartment",
    dueTime: "2026-10-04 14:00",
    agent: "Sari Dewi",
    isDone: false,
  },
  {
    id: "FU-03",
    lead: "David Tan",
    task: "Confirm site visit rescheduling",
    dueTime: "2026-10-02 09:00",
    agent: "Budi Santoso",
    isDone: true,
  },
];

export default function LeadManagementView() {
  const [leads, setListings] = useState<LeadItem[]>(initialLeads);
  const [activeTab, setActiveTab] = useState<"all" | "pipeline" | "calls" | "followups">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  // Follow-ups state strictly matching screenshot
  const [followups, setFollowups] = useState<FollowUpItem[]>(initialFollowups);
  const [showAddFollowupModal, setShowAddFollowupModal] = useState(false);
  const [newFollowup, setNewFollowup] = useState({
    lead: "",
    task: "",
    dueTime: "2026-10-05 10:00",
    agent: "Budi Santoso",
  });

  // Modals & toast
  const [viewingLead, setViewingLead] = useState<LeadItem | null>(null);
  const [editingLead, setEditingLead] = useState<LeadItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LeadItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleFollowup = (id: string) => {
    setFollowups((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
    const target = followups.find((f) => f.id === id);
    if (target && !target.isDone) {
      showToast(`Follow-up for ${target.lead} marked as done!`);
    }
  };

  const handleAddFollowup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFollowup.lead || !newFollowup.task) return;
    const newItem: FollowUpItem = {
      id: `FU-0${followups.length + 1}`,
      lead: newFollowup.lead,
      task: newFollowup.task,
      dueTime: newFollowup.dueTime || "2026-10-05 10:00",
      agent: newFollowup.agent || "Budi Santoso",
      isDone: false,
    };
    setFollowups([...followups, newItem]);
    setShowAddFollowupModal(false);
    setNewFollowup({
      lead: "",
      task: "",
      dueTime: "2026-10-05 10:00",
      agent: "Budi Santoso",
    });
    showToast(`New follow-up for ${newItem.lead} added successfully!`);
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = lead.name.toLowerCase().includes(query);
        const matchesPhone = lead.phone.includes(query);
        const matchesProperty = lead.propertyInterest.toLowerCase().includes(query);
        const matchesAgent = lead.agent.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesProperty && !matchesAgent) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== "All" && lead.status !== statusFilter) {
        return false;
      }

      // Source filter
      if (sourceFilter !== "All" && lead.source !== sourceFilter) {
        return false;
      }

      return true;
    });
  }, [leads, searchQuery, statusFilter, sourceFilter]);

  const handleDeleteLead = (id: string) => {
    setListings(leads.filter((l) => l.id !== id));
    setDeleteTarget(null);
    showToast("Lead deleted successfully.");
  };

  const handleUpdateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    setListings(leads.map((l) => (l.id === editingLead.id ? editingLead : l)));
    setEditingLead(null);
    showToast(`Lead ${editingLead.name} updated successfully.`);
  };

  // Helper function to render status pill matching screenshot
  const renderStatusBadge = (status: LeadItem["status"]) => {
    switch (status) {
      case "Qualified":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#fef9c3] text-[#854d0e] border border-[#fef08a]">
            Qualified
          </span>
        );
      case "Contacted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ede9fe] text-[#6d28d9] border border-[#ddd6fe]">
            Contacted
          </span>
        );
      case "Visit Scheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]">
            Visit Scheduled
          </span>
        );
      case "New":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]">
            New
          </span>
        );
      case "Closed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
            Closed
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Lead & CRM Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track, qualify, and convert leads across all channels.
          </p>
        </div>
      </div>

      {/* Tabs matching screenshot */}
      <div className="flex items-center gap-7 border-b border-slate-200/80 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={cn(
            "pb-3 font-semibold transition-colors relative cursor-pointer",
            activeTab === "all"
              ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
              : "text-slate-500 hover:text-slate-800"
          )}
        >
          All Leads
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pipeline")}
          className={cn(
            "pb-3 font-medium transition-colors relative cursor-pointer",
            activeTab === "pipeline"
              ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
              : "text-slate-500 hover:text-slate-800"
          )}
        >
          Pipeline
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("calls")}
          className={cn(
            "pb-3 font-medium transition-colors relative cursor-pointer",
            activeTab === "calls"
              ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
              : "text-slate-500 hover:text-slate-800"
          )}
        >
          Call History
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("followups")}
          className={cn(
            "pb-3 font-medium transition-colors relative cursor-pointer",
            activeTab === "followups"
              ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
              : "text-slate-500 hover:text-slate-800"
          )}
        >
          Follow-ups
        </button>
      </div>

      {/* TAB 1: ALL LEADS (Main View strictly matching screenshot) */}
      {activeTab === "all" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Search & Filter Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Leads */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Filter Dropdowns on the right */}
            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 sm:w-44 h-10 rounded-xl bg-white border-slate-200 text-xs sm:text-sm font-medium">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Visit Scheduled">Visit Scheduled</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              {/* Source Filter */}
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-36 sm:w-40 h-10 rounded-xl bg-white border-slate-200 text-xs sm:text-sm font-medium">
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Sources</SelectItem>
                  <SelectItem value="Voice Inbound">Voice Inbound</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Web Chat">Web Chat</SelectItem>
                  <SelectItem value="Direct">Direct</SelectItem>
                  <SelectItem value="Voice Outbound">Voice Outbound</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl bg-white border border-slate-100 shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-transparent text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">LEAD</th>
                  <th className="py-3.5 px-4 font-semibold">SOURCE</th>
                  <th className="py-3.5 px-4 font-semibold">PROPERTY INTEREST</th>
                  <th className="py-3.5 px-4 font-semibold">AGENT</th>
                  <th className="py-3.5 px-4 font-semibold">STATUS</th>
                  <th className="py-3.5 px-4 font-semibold">HOT</th>
                  <th className="py-3.5 px-4 font-semibold">CREATED</th>
                  <th className="py-3.5 px-4 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No leads found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* 1. LEAD: Name & Phone */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 text-xs sm:text-[13px] leading-tight">
                            {lead.name}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-tight mt-0.5">
                            {lead.phone}
                          </span>
                        </div>
                      </td>

                      {/* 2. SOURCE: Pill */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-normal text-slate-600 bg-[#f1f5f9]">
                          {lead.source}
                        </span>
                      </td>

                      {/* 3. PROPERTY INTEREST */}
                      <td className="py-3.5 px-4 text-xs sm:text-[13px] text-slate-700 font-medium">
                        {lead.propertyInterest}
                      </td>

                      {/* 4. AGENT */}
                      <td className="py-3.5 px-4 text-xs sm:text-[13px] text-slate-700">
                        {lead.agent}
                      </td>

                      {/* 5. STATUS Pill */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {renderStatusBadge(lead.status)}
                      </td>

                      {/* 6. HOT */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {lead.isHot ? (
                          <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                            🔥 Hot
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300 font-normal">
                            —
                          </span>
                        )}
                      </td>

                      {/* 7. CREATED Date */}
                      <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap font-normal">
                        {lead.created}
                      </td>

                      {/* 8. ACTIONS */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 text-slate-300">
                          <button
                            type="button"
                            onClick={() => setViewingLead(lead)}
                            className="p-1 hover:text-blue-600 transition-colors cursor-pointer"
                            title="View Lead Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingLead(lead)}
                            className="p-1 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Edit Lead"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(lead)}
                            className="p-1 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PIPELINE KANBAN VIEW strictly matching screenshot */}
      {activeTab === "pipeline" && (
        <div className="overflow-x-auto pb-4 pt-1 animate-in fade-in duration-150">
          <div className="grid grid-cols-6 gap-3.5 min-w-[1020px] items-start">
            {[
              { id: "new", label: "NEW", status: "New", count: 1 },
              { id: "contacted", label: "CONTACTED", status: "Contacted", count: 1 },
              { id: "qualified", label: "QUALIFIED", status: "Qualified", count: 1 },
              {
                id: "site_visit",
                label: "SITE VISIT SCHEDULED",
                status: "Visit Scheduled",
                count: 1,
              },
              { id: "closed", label: "CLOSED", status: "Closed", count: 1 },
              { id: "lost", label: "LOST", status: "Lost", count: null },
            ].map((col) => {
              const colLeads = leads.filter((l) => l.status === col.status);
              const isLost = col.id === "lost";

              return (
                <div key={col.id} className="flex flex-col">
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 px-1">
                    <span
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-wider",
                        isLost ? "text-slate-300" : "text-slate-500"
                      )}
                    >
                      {col.label}
                    </span>
                    {col.count !== null && (
                      <span className="text-[12px] font-bold text-slate-400">
                        {colLeads.length || col.count}
                      </span>
                    )}
                  </div>

                  {/* Cards container */}
                  <div className="space-y-3">
                    {colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setViewingLead(lead)}
                        className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-3.5 sm:p-4 hover:shadow-md transition-all cursor-pointer group"
                      >
                        {/* Row 1: Name and Hot Icon */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {lead.name}
                          </span>
                          {lead.isHot && (
                            <span className="text-xs select-none" title="Hot Lead">
                              🔥
                            </span>
                          )}
                        </div>

                        {/* Row 2: Property Interest */}
                        <p className="text-xs text-slate-400 mt-1 truncate font-normal">
                          {lead.propertyInterest}
                        </p>

                        {/* Row 3: Source Pill & Agent Name */}
                        <div className="mt-3.5 flex items-center justify-between">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-normal text-slate-600 bg-[#f1f5f9]">
                            {lead.source}
                          </span>
                          <span className="text-[11px] text-slate-300 font-normal">
                            {lead.agent.split(" ")[0]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer note: — Lost leads excluded — */}
                  {!isLost && (
                    <p className="text-[10px] text-slate-300 tracking-wide text-center mt-3 select-none">
                      — Lost leads excluded —
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CALL HISTORY strictly matching screenshot */}
      {activeTab === "calls" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 sm:p-6 animate-in fade-in duration-150">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            Call History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3 font-semibold">LEAD</th>
                  <th className="py-3 px-3 font-semibold">DIRECTION</th>
                  <th className="py-3 px-3 font-semibold">AGENT</th>
                  <th className="py-3 px-3 font-semibold">DURATION</th>
                  <th className="py-3 px-3 font-semibold">TIMESTAMP</th>
                  <th className="py-3 px-3 font-semibold">RECORDING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {[
                  {
                    lead: "Ahmad Fauzi",
                    direction: "Inbound" as const,
                    agent: "Budi Santoso",
                    duration: "4m 32s",
                    timestamp: "2026-10-01 09:28",
                    hasRecording: true,
                  },
                  {
                    lead: "Rina Wulandari",
                    direction: "Outbound" as const,
                    agent: "Rizki Pratama",
                    duration: "2m 15s",
                    timestamp: "2026-09-30 11:00",
                    hasRecording: true,
                  },
                  {
                    lead: "Lina Kusuma",
                    direction: "Inbound" as const,
                    agent: "Sari Dewi",
                    duration: "7m 48s",
                    timestamp: "2026-09-29 14:20",
                    hasRecording: true,
                  },
                  {
                    lead: "James Kwon",
                    direction: "Outbound" as const,
                    agent: "Dewi Hartati",
                    duration: "1m 05s",
                    timestamp: "2026-09-28 16:40",
                    hasRecording: false,
                  },
                ].map((call, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* LEAD */}
                    <td className="py-3.5 px-3 font-semibold text-slate-800 text-xs sm:text-[13px]">
                      {call.lead}
                    </td>

                    {/* DIRECTION */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {call.direction === "Inbound" ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e0f2fe] text-[#0284c7]">
                          Inbound
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ede9fe] text-[#7c3aed]">
                          Outbound
                        </span>
                      )}
                    </td>

                    {/* AGENT */}
                    <td className="py-3.5 px-3 text-slate-600 text-xs sm:text-[13px]">
                      {call.agent}
                    </td>

                    {/* DURATION */}
                    <td className="py-3.5 px-3 text-slate-600 text-xs sm:text-[13px]">
                      {call.duration}
                    </td>

                    {/* TIMESTAMP */}
                    <td className="py-3.5 px-3 text-slate-500 text-xs sm:text-[13px] whitespace-nowrap">
                      {call.timestamp}
                    </td>

                    {/* RECORDING */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {call.hasRecording ? (
                        <button
                          type="button"
                          onClick={() =>
                            showToast(
                              `Playing audio recording for ${call.lead} (${call.duration})...`
                            )
                          }
                          className="text-xs sm:text-[13px] font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                        >
                          Play
                        </button>
                      ) : (
                        <span className="text-xs sm:text-[13px] text-slate-300 font-normal">
                          No recording
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: FOLLOW-UPS strictly matching screenshot */}
      {activeTab === "followups" && (
        <div className="space-y-3.5 pt-1 animate-in fade-in duration-150">
          {followups.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-5 flex items-center justify-between hover:border-slate-200 transition-colors"
            >
              {/* Left side: Checkbox + Content */}
              <div className="flex items-start sm:items-center gap-3.5">
                {/* Circle status toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleFollowup(item.id)}
                  className="mt-0.5 sm:mt-0 transition-transform active:scale-95 cursor-pointer shrink-0"
                  aria-label={item.isDone ? "Mark as pending" : "Mark as done"}
                >
                  {item.isDone ? (
                    <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-slate-300 hover:border-slate-400 bg-white" />
                  )}
                </button>

                {/* Details */}
                <div>
                  <h4
                    className={cn(
                      "font-bold text-xs sm:text-[13px] leading-tight",
                      item.isDone ? "text-slate-700" : "text-slate-900"
                    )}
                  >
                    {item.lead}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal font-normal">
                    {item.task}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400 font-normal">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{item.dueTime}</span>
                    </span>
                    <span>{item.agent}</span>
                  </div>
                </div>
              </div>

              {/* Right side: Mark Done button (only if not completed) */}
              {!item.isDone && (
                <button
                  type="button"
                  onClick={() => handleToggleFollowup(item.id)}
                  className="px-3.5 py-1.5 rounded-xl border border-emerald-300 text-emerald-600 hover:bg-emerald-50 text-xs font-semibold transition-colors cursor-pointer active:scale-95 shrink-0"
                >
                  Mark Done
                </button>
              )}
            </div>
          ))}

          {/* + Add Follow-up button matching screenshot */}
          <button
            type="button"
            onClick={() => setShowAddFollowupModal(true)}
            className="w-full py-4 rounded-2xl border border-dashed border-slate-200 hover:border-slate-300 text-slate-400 hover:text-slate-600 text-xs sm:text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-white/40 hover:bg-white"
          >
            <Plus className="h-4 w-4" />
            <span>Add Follow-up</span>
          </button>
        </div>
      )}

      {/* MODAL: ADD FOLLOW-UP */}
      {showAddFollowupModal && (
        <div
          onClick={() => setShowAddFollowupModal(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add New Follow-up</h3>
              <button
                type="button"
                onClick={() => setShowAddFollowupModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddFollowup} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Lead Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmad Fauzi"
                  value={newFollowup.lead}
                  onChange={(e) =>
                    setNewFollowup({ ...newFollowup, lead: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Task / Follow-up Note <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call back about property pricing"
                  value={newFollowup.task}
                  onChange={(e) =>
                    setNewFollowup({ ...newFollowup, task: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                    Due Date & Time
                  </label>
                  <input
                    type="text"
                    placeholder="2026-10-05 10:00"
                    value={newFollowup.dueTime}
                    onChange={(e) =>
                      setNewFollowup({ ...newFollowup, dueTime: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                    Assigned Agent
                  </label>
                  <input
                    type="text"
                    value={newFollowup.agent}
                    onChange={(e) =>
                      setNewFollowup({ ...newFollowup, agent: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddFollowupModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Follow-up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1: VIEW LEAD DETAILS */}
      {viewingLead && (
        <div
          onClick={() => setViewingLead(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {viewingLead.id}
                </span>
                <h3 className="text-base font-bold text-slate-900">{viewingLead.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingLead(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 text-[11px] uppercase font-bold block">Status</span>
                  <div className="mt-1">{renderStatusBadge(viewingLead.status)}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] uppercase font-bold block">Source</span>
                  <span className="font-medium text-slate-800 mt-1 block">{viewingLead.source}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] uppercase font-bold block">Phone</span>
                  <span className="font-medium text-slate-800 mt-1 block">{viewingLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] uppercase font-bold block">Assigned Agent</span>
                  <span className="font-medium text-slate-800 mt-1 block">{viewingLead.agent}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] uppercase font-bold block">Property Interest</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{viewingLead.propertyInterest}</span>
              </div>

              {viewingLead.budget && (
                <div>
                  <span className="text-slate-400 text-[11px] uppercase font-bold block">Budget Estimate</span>
                  <span className="font-semibold text-emerald-600 text-sm mt-0.5 block">{viewingLead.budget}</span>
                </div>
              )}

              {viewingLead.notes && (
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/60">
                  <span className="text-blue-600 font-bold text-[11px] uppercase block">AI & Agent Notes</span>
                  <p className="text-slate-700 mt-1 leading-relaxed">{viewingLead.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewingLead(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingLead(viewingLead);
                  setViewingLead(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Edit Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT LEAD */}
      {editingLead && (
        <div
          onClick={() => setEditingLead(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Lead</h3>
              <button
                type="button"
                onClick={() => setEditingLead(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateLead} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">Lead Name</label>
                <input
                  type="text"
                  required
                  value={editingLead.name}
                  onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">Phone</label>
                <input
                  type="text"
                  required
                  value={editingLead.phone}
                  onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">Status</label>
                <Select
                  value={editingLead.status}
                  onValueChange={(val) =>
                    setEditingLead({ ...editingLead, status: val as LeadItem["status"] })
                  }
                >
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Visit Scheduled">Visit Scheduled</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">Assigned Agent</label>
                <input
                  type="text"
                  value={editingLead.agent}
                  onChange={(e) => setEditingLead({ ...editingLead, agent: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isHotLead"
                  checked={editingLead.isHot}
                  onChange={(e) => setEditingLead({ ...editingLead, isHot: e.target.checked })}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isHotLead" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Mark as 🔥 Hot Lead
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE CONFIRMATION */}
      {deleteTarget && (
        <div
          onClick={() => setDeleteTarget(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 animate-in zoom-in-95 duration-150 text-center"
          >
            <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Lead?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure you want to remove <strong className="text-slate-800">{deleteTarget.name}</strong> from your CRM? This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteLead(deleteTarget.id)}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors cursor-pointer"
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
