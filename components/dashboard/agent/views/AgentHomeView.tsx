"use client";

import React, { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  Wallet,
  Zap,
  ChevronRight,
  Plus,
  UserCheck,
  BarChart3,
  Flag,
  Receipt,
  Sparkles,
  User,
  CheckCircle2,
  X,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  agentMetrics,
  hotLeadsData,
  recentActivitiesData,
  quickActionsData,
  leadPipelineData,
} from "../data";
import { HotLeadItem } from "../types";

export default function AgentHomeView() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddListingModal, setShowAddListingModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<HotLeadItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleQuickAction = (action: string) => {
    if (action === "openAddListing") {
      setShowAddListingModal(true);
    } else if (action === "viewLeads") {
      showToast("Filtering all active CRM leads...");
    } else if (action === "scheduleVisit") {
      showToast("Opening site visit scheduling calendar...");
    } else if (action === "reviewApps") {
      showToast("Loading agent partner applications...");
    } else if (action === "viewReports") {
      showToast("Generating monthly revenue & lead report...");
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 px-4 sm:px-6 lg:px-[32px] pt-6 sm:pt-8 pb-12">
      {/* 1. Header Section: Greeting & Top Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-xs sm:text-sm font-normal text-slate-400">
            Good morning,
          </p>
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-snug mt-0.5">
            Admin Dashboard 👋
          </h1>
        </div>

        {/* Action Buttons matching screenshot */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowAddListingModal(true)}
            className="h-10 px-4.5 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-150 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>Add Listing</span>
          </button>

          <button
            type="button"
            onClick={() => showToast("Navigating to full Leads CRM view...")}
            className="h-10 px-4.5 rounded-xl border border-blue-200/90 bg-white hover:bg-blue-50/70 text-[#2563eb] font-semibold text-xs sm:text-sm shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer"
          >
            View Leads
          </button>
        </div>
      </div>

      {/* 2. Top 4 Stats/Metric Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-7">
        {agentMetrics.map((item) => {
          let IconComponent = Home;
          let iconBg = "bg-blue-50 text-blue-600";

          if (item.id === "leads") {
            IconComponent = Users;
            iconBg = "bg-purple-50 text-purple-600";
          } else if (item.id === "visits") {
            IconComponent = Calendar;
            iconBg = "bg-emerald-50 text-emerald-600";
          } else if (item.id === "revenue") {
            IconComponent = Wallet;
            iconBg = "bg-amber-50 text-amber-600";
          }

          return (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                    iconBg
                  )}
                >
                  <IconComponent className="h-5 w-5 stroke-[2.2]" />
                </div>

                {/* Green badge on top right */}
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {item.change}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-none">
                  {item.value}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mt-2">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
                  {item.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Hot Lead Alerts Banner Card strictly matching screenshot */}
      <div className="rounded-3xl border border-blue-100/90 bg-white p-5 sm:p-6 shadow-[0_2px_16px_rgba(37,99,235,0.03)] mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4 pb-1">
          <div className="flex items-center gap-2">
            <Zap className="h-4.5 w-4.5 text-blue-600 fill-blue-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Hot Lead Alerts
            </h2>
          </div>
          <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
            2
          </span>
        </div>

        <div className="space-y-3">
          {hotLeadsData.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/50 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Circle Initials Avatar */}
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {lead.initials}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900 leading-tight">
                      {lead.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[11px] font-semibold border border-blue-100/80">
                      {lead.source}
                    </span>
                    {lead.isHot && (
                      <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[11px] font-semibold border border-orange-100/80 flex items-center gap-1">
                        <span>🔥</span>
                        <span>HOT</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-1 leading-normal truncate">
                    {lead.property} — {lead.location} · Agent: {lead.agent} ·{" "}
                    {lead.date}
                  </p>
                </div>
              </div>

              {/* View Lead Button */}
              <button
                type="button"
                onClick={() => setSelectedLead(lead)}
                className="h-8.5 px-3.5 rounded-xl border border-blue-200 text-[#2563eb] hover:bg-blue-50/80 text-xs font-semibold bg-white transition-all self-start sm:self-center shrink-0 cursor-pointer active:scale-95"
              >
                View Lead
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Grid: Recent Activity (2/3) & Quick Actions + Pipeline (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
        {/* Left Column: Recent Activity matching screenshot */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
          <h2 className="text-base font-bold text-slate-900 mb-5 tracking-tight">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {recentActivitiesData.map((act) => {
              let Icon = Flag;
              let iconStyle = "bg-blue-50 text-blue-600";

              if (act.icon === "calendar") {
                Icon = Calendar;
                iconStyle = "bg-emerald-50 text-emerald-600";
              } else if (act.icon === "home") {
                Icon = Home;
                iconStyle = "bg-blue-50 text-blue-600";
              } else if (act.icon === "receipt") {
                Icon = Receipt;
                iconStyle = "bg-emerald-50 text-emerald-600";
              } else if (act.icon === "user") {
                Icon = User;
                iconStyle = "bg-amber-50 text-amber-600";
              } else if (act.icon === "sparkles") {
                Icon = Sparkles;
                iconStyle = "bg-purple-50 text-purple-600";
              }

              return (
                <div
                  key={act.id}
                  className="flex items-center gap-3.5 pb-3.5 border-b border-slate-50 last:border-b-0 last:pb-0"
                >
                  <div
                    className={cn(
                      "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
                      iconStyle
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {act.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quick Actions & Lead Pipeline */}
        <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
          <h2 className="text-base font-bold text-slate-900 mb-4 tracking-tight">
            Quick Actions
          </h2>

          {/* Quick Action Rows with chevron */}
          <div className="space-y-2">
            {quickActionsData.map((action) => {
              let Icon = Plus;
              let iconColor = "bg-blue-50 text-blue-600";

              if (action.icon === "users") {
                Icon = Users;
                iconColor = "bg-blue-50 text-blue-600";
              } else if (action.icon === "calendar") {
                Icon = Calendar;
                iconColor = "bg-emerald-50 text-emerald-600";
              } else if (action.icon === "userCheck") {
                Icon = UserCheck;
                iconColor = "bg-amber-50 text-amber-600";
              } else if (action.icon === "barChart") {
                Icon = BarChart3;
                iconColor = "bg-purple-50 text-purple-600";
              }

              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleQuickAction(action.action)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50/80 transition-all group text-left cursor-pointer border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-8.5 w-8.5 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                        iconColor
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {action.label}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>

          {/* Lead Pipeline Subsection */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              LEAD PIPELINE
            </h3>

            <div className="space-y-2.5">
              {leadPipelineData.map((stage) => (
                <div
                  key={stage.label}
                  className="flex items-center justify-between text-xs gap-3"
                >
                  <span className="text-slate-500 w-24 shrink-0 font-medium text-[11px] sm:text-xs">
                    {stage.label}
                  </span>

                  {/* Horizontal progress bar */}
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${stage.percentage}%`,
                        backgroundColor: stage.color,
                      }}
                    />
                  </div>

                  <span className="text-slate-800 font-bold w-6 text-right shrink-0 text-xs">
                    {stage.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Listing Modal */}
      {showAddListingModal && (
        <div
          onClick={() => setShowAddListingModal(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                + Add New Property Listing
              </h3>
              <button
                onClick={() => setShowAddListingModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddListingModal(false);
                showToast("New property listing published successfully!");
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Property Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luxury Cliffside Villa Jimbaran"
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Price (IDR)
                  </label>
                  <input
                    type="text"
                    placeholder="4,850,000,000"
                    required
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Property Type
                  </label>
                  <select className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600">
                    <option value="Villa">Villa</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Location / Area
                </label>
                <input
                  type="text"
                  placeholder="Jimbaran, South Kuta, Bali"
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddListingModal(false)}
                  className="h-10 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer active:scale-95"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selected Lead Modal */}
      {selectedLead && (
        <div
          onClick={() => setSelectedLead(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {selectedLead.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {selectedLead.name}
                  </h3>
                  <p className="text-xs text-blue-600 font-medium">
                    {selectedLead.source} • 🔥 Hot Lead
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Interested Property
                </span>
                <span className="font-semibold text-slate-800 text-sm">
                  {selectedLead.property} — {selectedLead.location}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Assigned Agent
                  </span>
                  <span className="font-semibold text-slate-800">
                    {selectedLead.agent}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Logged At
                  </span>
                  <span className="font-semibold text-slate-800">
                    {selectedLead.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedLead(null);
                  showToast(`Calling ${selectedLead.name} via AI Voice assistant...`);
                }}
                className="flex-1 h-10 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Lead</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLead(null);
                  showToast(`SMS / WhatsApp sent to ${selectedLead.name}`);
                }}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
