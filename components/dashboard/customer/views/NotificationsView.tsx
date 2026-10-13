"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCheck,
  TrendingDown,
  Calendar,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NotificationItem {
  id: string;
  type: "price" | "visit" | "message" | "security";
  title: string;
  message: string;
  time: string;
  unread: boolean;
  actionUrl?: string;
}

export default function NotificationsView() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n-1",
      type: "price",
      title: "Price drop alert: Modern Villa with Ocean View",
      message: "The seller reduced the listing price by IDR 200,000,000. Now priced at IDR 4,500,000,000.",
      time: "15 minutes ago",
      unread: true,
      actionUrl: "/dashboard/customer",
    },
    {
      id: "n-2",
      type: "visit",
      title: "Site visit confirmed for tomorrow",
      message: "Agent Budi Santoso confirmed meeting you at Jimbaran, Bali at 10:00 AM.",
      time: "2 hours ago",
      unread: true,
      actionUrl: "/dashboard/customer/site-visits",
    },
    {
      id: "n-3",
      type: "message",
      title: "New message from Agent Siti Rahayu",
      message: "Siti sent you updated furnishing options for the SCBD Business District Apartment.",
      time: "Yesterday at 4:20 PM",
      unread: false,
      actionUrl: "/dashboard/customer/messages",
    },
    {
      id: "n-4",
      type: "security",
      title: "Title verification complete",
      message: "Cadastral check for Modern Villa completed with no legal encumbrances detected.",
      time: "Oct 10, 2026",
      unread: false,
      actionUrl: "/dashboard/customer/transactions",
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const iconMap = {
    price: TrendingDown,
    visit: Calendar,
    message: MessageSquare,
    security: ShieldAlert,
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Notification Center
            </h1>
            <Badge variant="blue" className="bg-blue-100 text-blue-700">
              {notifications.filter((n) => n.unread).length} Unread
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time updates regarding your property inquiries, visits, and market alerts
          </p>
        </div>

        <Button
          onClick={markAllRead}
          variant="outline"
          size="sm"
          className="text-xs font-semibold flex items-center gap-1.5"
        >
          <CheckCheck className="h-4 w-4 text-blue-600" />
          Mark all as read
        </Button>
      </div>

      {/* List */}
      <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden divide-y divide-slate-100">
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <div
              key={n.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                n.unread ? "bg-blue-50/40" : "hover:bg-slate-50/70"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  n.type === "price"
                    ? "bg-emerald-50 text-emerald-600"
                    : n.type === "visit"
                    ? "bg-blue-50 text-blue-600"
                    : n.type === "message"
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {n.title}
                  </h4>
                  {n.unread && (
                    <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                <div className="flex items-center justify-between mt-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">{n.time}</span>
                  {n.actionUrl && (
                    <Link
                      href={n.actionUrl}
                      className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
