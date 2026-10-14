"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Download,
  Plus,
  Flame,
  ArrowLeft,
  CheckCircle2,
  X,
  Phone,
  Mail,
  User,
  Home,
  Calendar,
  MessageSquare,
  Bot,
  Search,
  Filter,
  DollarSign,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { superAdminCrmLeadsList } from "./data";
import { SuperAdminCrmLead } from "./types";

const fallbackLeads: SuperAdminCrmLead[] = [
  {
    id: "lead-1",
    name: "Rina Wulandari",
    isHot: true,
    property: "Family House — Dago",
    channel: "Direct",
    agent: "Rizki",
    stage: "NEW",
    email: "rina@email.com",
    phone: "+62 812-4567-8901",
    budget: "IDR 12M/mo",
    createdDate: "2026-10-01",
    notes: "Inquired about long-term lease for family residence in Dago area.",
  },
  {
    id: "lead-2",
    name: "Lina Kusuma",
    isHot: false,
    property: "SCBD Apartment 2BR",
    channel: "WhatsApp",
    agent: "Sari",
    stage: "CONTACTED",
    email: "lina@email.com",
    phone: "+62 813-2345-6789",
    budget: "IDR 850M",
    createdDate: "2026-09-29",
    notes: "WhatsApp consultation regarding floor plan and payment installment plan.",
  },
  {
    id: "lead-3",
    name: "Ahmad Fauzi",
    isHot: true,
    property: "Modern Villa — Jimbaran",
    channel: "Voice",
    agent: "Budi",
    stage: "QUALIFIED",
    email: "ahmad@email.com",
    phone: "+62 812-3456-7890",
    budget: "IDR 4.5B",
    createdDate: "2026-09-28",
    notes: "AI voice call qualified high buying intent, cash buyer for Bali luxury villa.",
  },
  {
    id: "lead-4",
    name: "David Tan",
    isHot: false,
    property: "Seminyak Shophouse",
    channel: "Web",
    agent: "Budi",
    stage: "SITE VISIT SCHEDULED",
    email: "david.tan@sginvest.com",
    phone: "+62 811-3456-7890",
    budget: "IDR 25M/mo",
    createdDate: "2026-09-25",
    notes: "Scheduled in-person inspection for commercial shophouse on Oct 5th.",
  },
  {
    id: "lead-5",
    name: "James Kwon",
    isHot: false,
    property: "BSD Studio Apt",
    channel: "Voice",
    agent: "Sari",
    stage: "CLOSED",
    email: "james@email.com",
    phone: "+62 818-6789-0123",
    budget: "IDR 4.5M/mo",
    createdDate: "2026-09-20",
    notes: "Deposit received, lease contract executed via digital signing.",
  },
  {
    id: "lead-6",
    name: "Maya Putri",
    isHot: false,
    property: "SCBD Apartment",
    channel: "Voice",
    agent: "Rizki",
    stage: "LOST",
    email: "maya.p@domain.id",
    phone: "+62 817-8901-2345",
    budget: "IDR 800M",
    createdDate: "2026-09-15",
    notes: "Lead decided to postpone property acquisition until next fiscal year.",
  },
];

const PIPELINE_STAGES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "SITE VISIT SCHEDULED",
  "CLOSED",
  "LOST",
] as const;

type ActiveTab = "pipeline" | "all_leads" | "call_history" | "ai_conversations";

export default function SuperAdminLeadsView() {
  const [leads, setLeads] = useState<SuperAdminCrmLead[]>(() =>
    Array.isArray(superAdminCrmLeadsList) && superAdminCrmLeadsList.length > 0
      ? superAdminCrmLeadsList
      : fallbackLeads
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>("pipeline");
  const [selectedLead, setSelectedLead] = useState<SuperAdminCrmLead | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTableQuery, setSearchTableQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Lead form state
  const [newLead, setNewLead] = useState<Partial<SuperAdminCrmLead>>({
    name: "",
    property: "",
    channel: "Voice",
    agent: "Budi",
    stage: "NEW",
    isHot: false,
    phone: "",
    email: "",
    budget: "",
    notes: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const safeLeads = Array.isArray(leads) ? leads : fallbackLeads;

  // Handle export CSV
  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Hot,Property,Channel,Agent,Stage,Phone,Email,Budget,Date\n" +
      safeLeads
        .map(
          (l) =>
            `${l.id},"${l.name}",${l.isHot ? "Yes" : "No"},"${l.property}",${l.channel},${l.agent},"${l.stage}",${l.phone || ""},${l.email || ""},"${l.budget || ""}",${l.createdDate || ""}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `propertyai_leads_pipeline_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`✓ Exported ${safeLeads.length} leads to CSV.`);
  };

  // Move stage
  const handleUpdateLeadStage = (leadId: string, newStage: SuperAdminCrmLead["stage"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, stage: newStage } : null));
    }
    showToast(`✓ Updated stage to "${newStage}".`);
  };

  // Add lead submit
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.property) return;

    const newLeadItem: SuperAdminCrmLead = {
      id: `lead-${Date.now()}`,
      name: newLead.name,
      property: newLead.property,
      channel: (newLead.channel as SuperAdminCrmLead["channel"]) || "Voice",
      agent: newLead.agent || "Budi",
      stage: (newLead.stage as SuperAdminCrmLead["stage"]) || "NEW",
      isHot: Boolean(newLead.isHot),
      phone: newLead.phone || "+62 812-XXXX-XXXX",
      email: newLead.email || `${newLead.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      budget: newLead.budget || "IDR 1B - 3B",
      createdDate: new Date().toISOString().slice(0, 10),
      notes: newLead.notes || "Inbound inquiry received.",
    };

    setLeads((prev) => [newLeadItem, ...prev]);
    setShowAddModal(false);
    showToast(`✓ Added lead "${newLeadItem.name}" to ${newLeadItem.stage}.`);
    setNewLead({
      name: "",
      property: "",
      channel: "Voice",
      agent: "Budi",
      stage: "NEW",
      isHot: false,
      phone: "",
      email: "",
      budget: "",
      notes: "",
    });
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            Lead & CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            Full pipeline management across all channels
          </p>
        </div>

        {/* Right Action Buttons matching screenshot */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-10 px-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Download className="h-4 w-4 text-slate-500" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* 2. Top 6 Metric Cards matching screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
        {/* Card 1: Total Leads */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-blue-600 leading-tight block">
            1,204
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Total Leads
          </span>
        </div>

        {/* Card 2: New */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-blue-600 leading-tight block">
            31
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            New
          </span>
        </div>

        {/* Card 3: Qualified */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-slate-800 leading-tight block">
            18
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Qualified
          </span>
        </div>

        {/* Card 4: Site Visits */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-blue-600 leading-tight block">
            9
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Site Visits
          </span>
        </div>

        {/* Card 5: Closed */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-emerald-500 leading-tight block">
            7
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Closed
          </span>
        </div>

        {/* Card 6: Hot */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-2xs">
          <span className="text-2xl sm:text-[28px] font-bold text-slate-800 leading-tight block">
            2
          </span>
          <span className="text-xs font-semibold text-amber-500 mt-1.5 flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>Hot</span>
          </span>
        </div>
      </div>

      {/* 3. Navigation Tabs matching screenshot */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-100 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("pipeline")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "pipeline"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Pipeline
          {activeTab === "pipeline" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("all_leads")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "all_leads"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          All Leads
          {activeTab === "all_leads" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("call_history")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "call_history"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Call History
          {activeTab === "call_history" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("ai_conversations")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "ai_conversations"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          AI Conversations
          {activeTab === "ai_conversations" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* 4. Tab Views */}
      {activeTab === "pipeline" && (
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
          <div className="grid grid-cols-6 gap-3.5 min-w-[1080px]">
            {PIPELINE_STAGES.map((stage) => {
              const stageLeads = safeLeads.filter((l) => l.stage === stage);

              return (
                <div key={stage} className="flex flex-col space-y-3">
                  {/* Column Header matching screenshot */}
                  <div className="flex items-center justify-between px-1 py-1 text-slate-400 select-none">
                    <span className="text-[11px] font-bold tracking-wider uppercase truncate">
                      {stage}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Column Cards Container */}
                  <div className="space-y-3 min-h-[300px]">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="bg-white rounded-xl border border-slate-100 p-3.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group hover:border-slate-200"
                      >
                        {/* Top row: Name & Flame icon */}
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {lead.name}
                          </h4>
                          {lead.isHot && (
                            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 shrink-0" />
                          )}
                        </div>

                        {/* Property subtitle */}
                        <p className="text-[11px] text-slate-400 truncate mb-3">
                          {lead.property}
                        </p>

                        {/* Bottom row: Channel pill & Agent name */}
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-50">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200/50">
                            {lead.channel}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {lead.agent}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: All Leads Table Tab */}
      {activeTab === "all_leads" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTableQuery}
                onChange={(e) => setSearchTableQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              />
            </div>
            <span className="text-xs text-slate-400">
              Showing {safeLeads.length} leads
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/50 text-[11px] text-slate-400 uppercase tracking-wider font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Lead</th>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Agent</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {safeLeads
                  .filter(
                    (l) =>
                      l.name.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
                      l.property.toLowerCase().includes(searchTableQuery.toLowerCase())
                  )
                  .map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span>{lead.name}</span>
                          {lead.isHot && <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{lead.property}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600">
                          {lead.stage}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{lead.channel}</td>
                      <td className="py-3 px-4 text-slate-600">{lead.agent}</td>
                      <td className="py-3 px-4 text-slate-500">{lead.phone}</td>
                      <td className="py-3 px-4 text-slate-400">{lead.createdDate}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 text-xs font-semibold cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: Call History Tab */}
      {activeTab === "call_history" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Voice Inbound Call Records
              </h3>
              <p className="text-xs text-slate-400">
                Real-time telephony recordings, transcripts, and intent classification
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium">3 Recorded Calls</span>
          </div>

          <div className="space-y-3">
            {[
              {
                caller: "Ahmad Fauzi",
                phone: "+62 812-3456-7890",
                duration: "3m 42s",
                time: "2 hours ago",
                outcome: "Qualified Intent (Modern Villa)",
                sentiment: "High Interest",
              },
              {
                caller: "James Kwon",
                phone: "+62 818-6789-0123",
                duration: "1m 15s",
                time: "Yesterday",
                outcome: "Lease Deposit Confirmation",
                sentiment: "Positive",
              },
              {
                caller: "Maya Putri",
                phone: "+62 817-8901-2345",
                duration: "4m 20s",
                time: "3 days ago",
                outcome: "Postponed purchase decision",
                sentiment: "Neutral",
              },
            ].map((call, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {call.caller} ({call.phone})
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {call.outcome} • Duration: {call.duration}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                    {call.sentiment}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{call.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 4: AI Conversations Tab */}
      {activeTab === "ai_conversations" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Voice & Web Assistant Transcripts
              </h3>
              <p className="text-xs text-slate-400">
                Automated lead qualification powered by PropertyAI LLM Engine
              </p>
            </div>
            <span className="flex items-center gap-1 text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              99.2% Accuracy
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                lead: "Ahmad Fauzi",
                snippet: "AI: 'Welcome to PropertyAI! Are you interested in buying or renting in Bali?' -> Ahmad: 'Looking to purchase a luxury villa in Jimbaran around 4-5 Billion IDR.'",
                extracted: "Budget: IDR 4.5B | Location: Jimbaran | Type: Villa",
                confidence: "98%",
              },
              {
                lead: "David Tan",
                snippet: "AI: 'I can schedule a walkthrough with agent Budi Santoso for Seminyak Shophouse.' -> David: 'Great, October 5th afternoon works for me.'",
                extracted: "Action: Schedule Visit | Target: Seminyak Shophouse",
                confidence: "96%",
              },
            ].map((convo, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{convo.lead}</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    Confidence: {convo.confidence}
                  </span>
                </div>
                <p className="text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-100 text-[11px]">
                  {convo.snippet}
                </p>
                <p className="text-[11px] text-blue-600 font-medium">
                  <strong>Extracted Entities:</strong> {convo.extracted}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal 1: Lead Details & Stage Mover */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedLead(null)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {selectedLead.name}
                </h3>
                {selectedLead.isHot && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                    <Flame className="h-3 w-3 fill-amber-500" /> Hot Lead
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Interested In:</strong> {selectedLead.property}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Assigned Agent:</strong> {selectedLead.agent}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Budget / Price Point:</strong> {selectedLead.budget || "IDR 2B"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Phone:</strong> {selectedLead.phone || "+62 812-XXXX-XXXX"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Email:</strong> {selectedLead.email}
                </span>
              </div>
              {selectedLead.notes && (
                <div className="p-3 bg-slate-50 rounded-xl text-slate-700 text-[11px] leading-relaxed">
                  <strong>CRM Notes:</strong> {selectedLead.notes}
                </div>
              )}

              {/* Stage Switcher */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Change Pipeline Stage
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PIPELINE_STAGES.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateLeadStage(selectedLead.id, st)}
                      className={cn(
                        "p-2 rounded-xl text-[10px] font-semibold border transition-all text-center",
                        selectedLead.stage === st
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Add New Lead */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setShowAddModal(false)}
          />
          <form
            onSubmit={handleCreateLead}
            className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Add New CRM Lead
                </h3>
                <p className="text-xs text-slate-400">Record a new buyer or tenant inquiry</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs mb-6">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Lead Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Faisal Rahman"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Target Property *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern Villa — Jimbaran"
                  value={newLead.property}
                  onChange={(e) => setNewLead({ ...newLead, property: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Channel Source
                  </label>
                  <select
                    value={newLead.channel}
                    onChange={(e) =>
                      setNewLead({
                        ...newLead,
                        channel: e.target.value as SuperAdminCrmLead["channel"],
                      })
                    }
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    <option value="Voice">Voice</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Direct">Direct</option>
                    <option value="Web">Web</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Assigned Agent
                  </label>
                  <select
                    value={newLead.agent}
                    onChange={(e) => setNewLead({ ...newLead, agent: e.target.value })}
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    <option value="Budi">Budi Santoso</option>
                    <option value="Sari">Sari Dewi</option>
                    <option value="Rizki">Rizki Pratama</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Initial Stage
                  </label>
                  <select
                    value={newLead.stage}
                    onChange={(e) =>
                      setNewLead({
                        ...newLead,
                        stage: e.target.value as SuperAdminCrmLead["stage"],
                      })
                    }
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    {PIPELINE_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Mark as Hot Lead?
                  </label>
                  <div className="flex items-center gap-2 h-9">
                    <input
                      type="checkbox"
                      id="isHotLead"
                      checked={Boolean(newLead.isHot)}
                      onChange={(e) => setNewLead({ ...newLead, isHot: e.target.checked })}
                      className="h-4 w-4 text-amber-500 rounded cursor-pointer"
                    />
                    <label htmlFor="isHotLead" className="text-xs text-slate-700 cursor-pointer">
                      🔥 High Intent Buyer
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  placeholder="Inquiry requirements..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Create Lead
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
