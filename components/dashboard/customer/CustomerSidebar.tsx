"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Sparkles,
  Bot,
  Bookmark,
  Calendar,
  MessageSquare,
  ArrowLeftRight,
  Wrench,
  Bell,
  UserCog,
  Settings,
  X,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { customerNavItems, currentUser } from "./data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CustomerSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Home,
  Compass,
  Sparkles,
  Bot,
  Bookmark,
  Calendar,
  MessageSquare,
  ArrowLeftRight,
  Wrench,
  Bell,
  UserCog,
};

export default function CustomerSidebar({
  isOpen = false,
  onClose,
}: CustomerSidebarProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard/customer") {
      return pathname === "/dashboard/customer" || pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex h-full flex-col bg-white px-3.5 py-4 select-none overflow-hidden">
      {/* Top Header / Brand Logo */}
      <div className="flex items-center justify-between pb-4 px-2 shrink-0">
        <Link
          href="/dashboard/customer"
          className="flex items-center gap-3 group transition-transform active:scale-95"
          onClick={onClose}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors shrink-0">
            <Building className="h-4.5 w-4.5 fill-white/20 stroke-white stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
              PropertyAI
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Customer Portal
            </span>
          </div>
        </Link>

        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation List - Flex scrollable container */}
      <nav className="space-y-0.5 flex-1 min-h-0 overflow-y-auto pr-0.5 custom-scrollbar">
        {customerNavItems.map((item) => {
          const Icon = iconMap[item.iconName] || Home;
          const active = isLinkActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-blue-50/80 text-blue-600 font-semibold shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    active
                      ? "text-blue-600 stroke-[2.2]"
                      : "text-slate-400 group-hover:text-slate-700"
                  )}
                />
                <span className="text-[13px] truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={cn(
                    "flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[10.5px] font-semibold transition-colors shrink-0",
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white shadow-xs"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Profile Section */}
      <div className="border-t border-slate-100 pt-3 mt-2 px-1 shrink-0">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <Link
            href="/dashboard/customer/settings"
            onClick={onClose}
            className="flex items-center gap-3 min-w-0 flex-1"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
                {currentUser.avatarLetter}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-800 truncate">
                {currentUser.name}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentUser.role}
              </span>
            </div>
          </Link>

          <Link
            href="/dashboard/customer/settings"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-100/90 bg-white min-h-screen fixed top-0 left-0 bottom-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
