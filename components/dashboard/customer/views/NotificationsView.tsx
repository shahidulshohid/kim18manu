"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  MessageSquare,
  Shield,
  Wrench,
  Star,
  Info,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  icon: React.ElementType;
  iconBoxBg: string;
  iconColor: string;
  targetUrl?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New property match",
    description: "4 new villas in Bali match your saved search.",
    time: "2 hours ago",
    unread: true,
    icon: MapPin,
    iconBoxBg: "bg-[#eff6ff]",
    iconColor: "text-[#2563eb]",
    targetUrl: "/dashboard/customer/saved",
  },
  {
    id: "notif-2",
    title: "Visit confirmed",
    description: "Your site visit for Modern Villa on Oct 5 has been confirmed by Budi Santoso.",
    time: "5 hours ago",
    unread: true,
    icon: Calendar,
    iconBoxBg: "bg-[#f0fdf4]",
    iconColor: "text-[#16a34a]",
    targetUrl: "/dashboard/customer/site-visits",
  },
  {
    id: "notif-3",
    title: "New message from Sari Dewi",
    description: "Please let me know if you need more photos of the SCBD apartment.",
    time: "Yesterday",
    unread: false,
    icon: MessageSquare,
    iconBoxBg: "bg-[#eff6ff]",
    iconColor: "text-[#2563eb]",
    targetUrl: "/dashboard/customer/messages",
  },
  {
    id: "notif-4",
    title: "Payment received",
    description: "Your annual rent payment of IDR 144M has been confirmed.",
    time: "2 days ago",
    unread: false,
    icon: Shield,
    iconBoxBg: "bg-[#f0fdf4]",
    iconColor: "text-[#16a34a]",
    targetUrl: "/dashboard/customer/transactions",
  },
  {
    id: "notif-5",
    title: "Service assigned",
    description: "CleanPro Services has been assigned to your cleaning request.",
    time: "3 days ago",
    unread: false,
    icon: Wrench,
    iconBoxBg: "bg-[#eff6ff]",
    iconColor: "text-[#2563eb]",
    targetUrl: "/dashboard/customer/services",
  },
  {
    id: "notif-6",
    title: "Review reminder",
    description: "Share your experience with CoolTech HVAC after your AC service.",
    time: "4 days ago",
    unread: false,
    icon: Star,
    iconBoxBg: "bg-[#fffbeb]",
    iconColor: "text-[#d97706]",
  },
  {
    id: "notif-7",
    title: "Profile updated",
    description: "Your property preferences have been saved successfully.",
    time: "1 week ago",
    unread: false,
    icon: Info,
    iconBoxBg: "bg-[#f8fafc] border border-slate-100",
    iconColor: "text-slate-400",
    targetUrl: "/dashboard/customer/settings",
  },
];

export default function NotificationsView() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("All notifications marked as read.");
  };

  const handleNotificationClick = (item: NotificationItem) => {
    // Mark clicked notification as read
    if (item.unread) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
      );
    }
    if (item.targetUrl) {
      router.push(item.targetUrl);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "0 unread notifications"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:underline self-start sm:self-auto cursor-pointer transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* 2. Notifications List */}
      <div className="space-y-3 sm:space-y-3.5">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all hover:shadow-md hover:border-blue-100 cursor-pointer group"
            >
              {/* Left Side: Icon Box + Title + Description */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                <div
                  className={cn(
                    "h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0",
                    item.iconBoxBg,
                    item.iconColor
                  )}
                >
                  <Icon className="h-5 w-5 stroke-[1.8]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors leading-snug truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed truncate">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right Side: Timestamp + Unread Dot */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start sm:self-auto mt-0.5 sm:mt-0">
                <span className="text-xs text-slate-400 font-medium">
                  {item.time}
                </span>

                {item.unread && (
                  <span className="h-2 w-2 rounded-full bg-[#2563eb] shrink-0" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
