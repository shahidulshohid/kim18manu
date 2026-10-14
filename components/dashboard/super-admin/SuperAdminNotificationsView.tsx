"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Bell,
  Clock,
  Sparkles,
  ExternalLink,
  X,
  Filter,
  Check,
  Shield,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { superAdminNotificationsList } from "./data";
import { SuperAdminNotificationItem } from "./types";

const fallbackNotifications: SuperAdminNotificationItem[] = [
  {
    id: "notif-1",
    title: "🔥 Hot Lead — Ahmad Fauzi",
    description: "Voice inbound inquiry for Jimbaran villa. Assigned to Budi Santoso.",
    timeAgo: "2 min ago",
    timestamp: "2026-10-01 12:45 WIB",
    category: "lead assigned",
    borderVariant: "blue",
    isUnread: true,
    linkHref: "/dashboard/super-admin/leads",
    details: {
      entityId: "lead-2",
      entityName: "Ahmad Fauzi",
      actor: "Inbound Voice AI",
      metrics: "Budget IDR 4.5B • High Intent",
      actionLabel: "View in CRM Pipeline",
    },
  },
  {
    id: "notif-2",
    title: "New Agent Application",
    description: "Hendra Wijaya submitted an application. Experience: 5 years, Area: Bali.",
    timeAgo: "3 hr ago",
    timestamp: "2026-10-01 09:30 WIB",
    category: "new partner application",
    borderVariant: "amber",
    isUnread: true,
    linkHref: "/dashboard/super-admin/partners",
    details: {
      entityId: "app-1",
      entityName: "Hendra Wijaya",
      actor: "AREBI Portal Submission",
      metrics: "3 Verified Documents Attached",
      actionLabel: "Review Partner Application",
    },
  },
  {
    id: "notif-3",
    title: "Transaction Completed",
    description: "TRX-001 — IDR 144M confirmed. Commission IDR 7.2M processed.",
    timeAgo: "5 hr ago",
    timestamp: "2026-10-01 07:15 WIB",
    category: "transaction",
    borderVariant: "gray",
    isUnread: false,
    linkHref: "/dashboard/super-admin/transactions",
    details: {
      entityId: "TRX-001",
      entityName: "Family House — Kemang",
      actor: "BCA Escrow Settlement",
      metrics: "IDR 144M Gross • IDR 7.2M Commission Disbursed",
      actionLabel: "View Settlement Receipt",
    },
  },
  {
    id: "notif-4",
    title: "Listing Pending Review",
    description: "Seminyak Shophouse (L004) submitted by Budi Santoso awaits review.",
    timeAgo: "1 day ago",
    timestamp: "2026-09-30 14:20 WIB",
    category: "listing status change",
    borderVariant: "amber",
    isUnread: false,
    linkHref: "/dashboard/super-admin/properties",
    details: {
      entityId: "prop-4",
      entityName: "Seminyak Shophouse (L004)",
      actor: "Budi Santoso (Broker)",
      metrics: "Commercial • IDR 18.0B Asking",
      actionLabel: "Review Property Listing",
    },
  },
  {
    id: "notif-5",
    title: "AI Voice: 3 leads captured",
    description: "Inbound Voice AI processed 3 new leads between 08:00–12:00 WIB.",
    timeAgo: "1 day ago",
    timestamp: "2026-09-30 12:00 WIB",
    category: "system",
    borderVariant: "gray",
    isUnread: false,
    linkHref: "/dashboard/super-admin/leads",
    details: {
      entityId: "voice-ai-batch-202",
      entityName: "Voice Pipeline Autonomous Ingestion",
      actor: "Twilio / Deepgram Speech Engine",
      metrics: "3 Leads Qualified • 98.4% Audio Transcription Score",
      actionLabel: "Inspect Ingested Leads",
    },
  },
  {
    id: "notif-6",
    title: "AI Model Response Latency Alert",
    description: "web_chatbot average latency exceeded 3s for 12 minutes at 22:15 WIB.",
    timeAgo: "2 days ago",
    timestamp: "2026-09-29 22:15 WIB",
    category: "system",
    borderVariant: "blue",
    isUnread: false,
    linkHref: "/dashboard/super-admin/ai-system",
    details: {
      entityId: "alert-lat-9902",
      entityName: "Gemini 2.5 Inference Endpoint",
      actor: "Prometheus Monitoring Service",
      metrics: "Peak Latency: 3.42s • Recovered to 0.48s",
      actionLabel: "Inspect AI System Diagnostics",
    },
  },
];

interface SuperAdminNotificationsViewProps {
  notifications?: SuperAdminNotificationItem[];
}

export default function SuperAdminNotificationsView({
  notifications = superAdminNotificationsList,
}: SuperAdminNotificationsViewProps) {
  const router = useRouter();

  // Defensive source list
  const initialList =
    Array.isArray(notifications) && notifications.length > 0
      ? notifications
      : fallbackNotifications;

  // Local state for list to allow live marking read/unread
  const [items, setItems] = useState<SuperAdminNotificationItem[]>(initialList);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedNotification, setSelectedNotification] = useState<SuperAdminNotificationItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Dynamic unread count
  const unreadCount = useMemo(() => {
    return items.filter((n) => n.isUnread).length;
  }, [items]);

  // Mark all as read
  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isUnread: false })));
    showToast("All notifications marked as read");
  };

  // Mark single as read when clicking view/card
  const handleItemClick = (item: SuperAdminNotificationItem) => {
    if (item.isUnread) {
      setItems((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, isUnread: false } : n))
      );
    }
    setSelectedNotification(item);
  };

  // Filtered by Category
  const filteredNotifications = useMemo(() => {
    if (selectedCategory === "All Categories") {
      return items;
    }
    return items.filter((n) => n.category === selectedCategory);
  }, [items, selectedCategory]);

  // Unique categories for select filter
  const categoryOptions = useMemo(() => {
    const cats = Array.from(new Set(initialList.map((n) => n.category)));
    return ["All Categories", ...cats];
  }, [initialList]);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>

        {/* Right Controls: Mark all read + Category Filter */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-700 disabled:opacity-40 disabled:hover:text-slate-400 transition-colors cursor-pointer"
          >
            Mark all read
          </button>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-slate-200/90 rounded-lg pl-3.5 pr-8 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-2xs transition-colors"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All Categories"
                    ? "All Categories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* NOTIFICATION CARDS LIST */}
      <div className="space-y-3.5">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2 stroke-[1.5]" />
            <p className="text-sm font-semibold text-slate-700">No notifications in this category</p>
            <p className="text-xs text-slate-400 mt-1">
              Select another category to view notifications
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => {
            // Border classes matching design
            const borderClasses =
              item.borderVariant === "blue"
                ? "border-[1.5px] border-blue-400/90"
                : item.borderVariant === "amber"
                ? "border-[1.5px] border-amber-300/95"
                : "border border-slate-200/90";

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "bg-white rounded-2xl p-5 sm:p-5.5 shadow-2xs hover:shadow-xs transition-all relative cursor-pointer group",
                  borderClasses
                )}
              >
                {/* Title Row */}
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.isUnread && (
                    <span
                      className="w-2 h-2 rounded-full bg-blue-600 shrink-0 inline-block"
                      title="Unread notification"
                    />
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom Row */}
                <div className="flex items-center justify-between mt-3.5 pt-0.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-slate-400 font-normal">
                      {item.timeAgo}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60 lowercase">
                      {item.category}
                    </span>
                  </div>

                  {/* View Link */}
                  <div className="flex items-center">
                    <span className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* NOTIFICATION DETAIL MODAL */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "p-2 rounded-xl text-white",
                    selectedNotification.borderVariant === "blue"
                      ? "bg-blue-600"
                      : selectedNotification.borderVariant === "amber"
                      ? "bg-amber-500"
                      : "bg-slate-700"
                  )}
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Notification Details
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {selectedNotification.timestamp || selectedNotification.timeAgo}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              {/* Category & Status */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {selectedNotification.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  ID: {selectedNotification.id}
                </span>
              </div>

              {/* Title & Body */}
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {selectedNotification.title}
                </h4>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedNotification.description}
                </p>
              </div>

              {/* Extra Details if present */}
              {selectedNotification.details && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 mt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Context Metadata
                  </div>
                  {selectedNotification.details.entityName && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Related Target:</span>
                      <span className="font-semibold text-slate-900">
                        {selectedNotification.details.entityName}
                      </span>
                    </div>
                  )}
                  {selectedNotification.details.actor && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Trigger Source:</span>
                      <span className="font-semibold text-slate-900">
                        {selectedNotification.details.actor}
                      </span>
                    </div>
                  )}
                  {selectedNotification.details.metrics && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Telemetry:</span>
                      <span className="font-semibold text-slate-900">
                        {selectedNotification.details.metrics}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const targetHref = selectedNotification.linkHref;
                  setSelectedNotification(null);
                  router.push(targetHref);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>
                  {selectedNotification.details?.actionLabel || "Go to Destination"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
