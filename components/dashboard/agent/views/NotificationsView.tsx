"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Calendar,
  MessageSquare,
  Shield,
  Wrench,
  Star,
  Info,
  CheckCircle2,
  CheckCheck,
  Bell,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  iconType: "match" | "visit" | "message" | "payment" | "service" | "review" | "profile";
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    iconType: "match",
    title: "New property match",
    description: "4 new villas in Bali match your saved search.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "notif-2",
    iconType: "visit",
    title: "Visit confirmed",
    description: "Your site visit for Modern Villa on Oct 5 has been confirmed by Budi Santoso.",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: "notif-3",
    iconType: "message",
    title: "New message from Sari Dewi",
    description: "Please let me know if you need more photos of the SCBD apartment.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "notif-4",
    iconType: "payment",
    title: "Payment received",
    description: "Your annual rent payment of IDR 144M has been confirmed.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "notif-5",
    iconType: "service",
    title: "Service assigned",
    description: "CleanPro Services has been assigned to your cleaning request.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: "notif-6",
    iconType: "review",
    title: "Review reminder",
    description: "Share your experience with CoolTech HVAC after your AC service.",
    time: "4 days ago",
    unread: false,
  },
  {
    id: "notif-7",
    iconType: "profile",
    title: "Profile updated",
    description: "Your property preferences have been saved successfully.",
    time: "1 week ago",
    unread: false,
  },
];

export default function NotificationsView() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("All notifications marked as read!");
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const renderIcon = (type: NotificationItem["iconType"]) => {
    switch (type) {
      case "match":
        return (
          <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center justify-center shrink-0 text-slate-500">
            <MapPin className="h-4.5 w-4.5 stroke-[1.8]" />
          </div>
        );
      case "visit":
        return (
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center shrink-0 text-emerald-600">
            <Calendar className="h-4.5 w-4.5 stroke-[1.8]" />
          </div>
        );
      case "message":
        return (
          <div className="h-10 w-10 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center shrink-0 text-blue-600">
            <MessageSquare className="h-4.5 w-4.5 stroke-[1.8]" />
          </div>
        );
      case "payment":
        return (
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center shrink-0 text-emerald-600">
            <Shield className="h-4.5 w-4.5 stroke-[1.8]" />
          </div>
        );
      case "service":
        return (
          <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center justify-center shrink-0 text-slate-500">
            <Wrench className="h-4.5 w-4.5 stroke-[1.8]" />
          </div>
        );
      case "review":
        return (
          <div className="h-10 w-10 rounded-2xl bg-amber-50 border border-amber-100/80 flex items-center justify-center shrink-0 text-amber-500">
            <Star className="h-4.5 w-4.5 stroke-[1.8]" />
          </div>
        );
      case "profile":
        return (
          <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center justify-center shrink-0 text-slate-500">
            <Info className="h-4.5 w-4.5 stroke-[1.8]" />
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-500">
            <Bell className="h-4.5 w-4.5 stroke-[1.8]" />
          </div>
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
      <div className="flex items-center justify-between pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All notifications read"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List matching reference screenshot */}
      <div className="space-y-3.5">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggleRead(item.id)}
            className="group bg-white rounded-2xl border border-slate-100/90 hover:border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex items-start justify-between gap-4 cursor-pointer"
          >
            {/* Left Icon & Text Content */}
            <div className="flex items-start gap-4 min-w-0">
              {renderIcon(item.iconType)}

              <div className="min-w-0 pt-0.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Right Timestamp & Unread Dot */}
            <div className="flex items-center gap-2.5 shrink-0 pt-1 text-right">
              <span className="text-xs text-slate-400 font-normal">
                {item.time}
              </span>
              {item.unread && (
                <span
                  className="h-2 w-2 rounded-full bg-blue-600 shrink-0"
                  title="Unread notification"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
