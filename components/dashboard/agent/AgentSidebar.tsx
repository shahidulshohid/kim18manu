"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  Users,
  Sparkles,
  Handshake,
  Calendar,
  Receipt,
  Shield,
  Bell,
  BarChart3,
  UserCog,
  ChevronRight,
  Settings,
  X,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { agentNavItems } from "./data";

interface AgentSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Home,
  Building2,
  Users,
  Sparkles,
  Handshake,
  Calendar,
  Receipt,
  Shield,
  Bell,
  BarChart3,
  UserCog,
};

export default function AgentSidebar({
  isOpen = false,
  onClose,
}: AgentSidebarProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard/agent") {
      return (
        pathname === "/dashboard/agent" ||
        pathname === "/dashboard/admin" ||
        pathname === "/dashboard/super-admin"
      );
    }
    if (href === "/dashboard/agent/properties") {
      return (
        pathname === "/dashboard/agent/properties" ||
        pathname === "/dashboard/agent/property-management"
      );
    }
    if (href === "/dashboard/agent/leads") {
      return (
        pathname === "/dashboard/agent/leads" ||
        pathname === "/dashboard/agent/lead-and-crm" ||
        pathname === "/dashboard/agent/crm" ||
        pathname === "/dashboard/agent/lead-crm"
      );
    }
    if (href === "/dashboard/agent/ai") {
      return (
        pathname === "/dashboard/agent/ai" ||
        pathname === "/dashboard/agent/ai-system" ||
        pathname === "/dashboard/agent/ai/system" ||
        pathname.startsWith("/dashboard/agent/ai/")
      );
    }
    if (href === "/dashboard/agent/site-visits") {
      return (
        pathname === "/dashboard/agent/site-visits" ||
        pathname === "/dashboard/agent/site-visit" ||
        pathname === "/dashboard/agent/visits"
      );
    }
    if (href === "/dashboard/agent/transactions") {
      return (
        pathname === "/dashboard/agent/transactions" ||
        pathname === "/dashboard/agent/transaction" ||
        pathname === "/dashboard/agent/accounting"
      );
    }
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex h-full flex-col bg-white px-3.5 py-4 select-none overflow-hidden">
      {/* Top Header / Brand Logo */}
      <div className="flex items-center justify-between pb-4 px-2 shrink-0">
        <Link
          href="/dashboard/agent"
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
              Admin Portal
            </span>
          </div>
        </Link>

        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="space-y-1 flex-1 min-h-0 overflow-y-auto pr-0.5 custom-scrollbar mt-2">
        {agentNavItems.map((item) => {
          const Icon = iconMap[item.iconName] || Home;
          const active = isLinkActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium transition-all duration-150",
                active
                  ? "bg-blue-50/80 text-blue-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={cn(
                    "h-4.5 w-4.5 shrink-0 transition-colors",
                    active
                      ? "text-blue-600 stroke-[2.2]"
                      : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {/* Right badge or chevron */}
              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge !== undefined && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-bold text-white shadow-xs">
                    {item.badge}
                  </span>
                )}
                {item.hasSubmenu && (
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 transition-transform text-slate-400",
                      active ? "text-blue-600" : "group-hover:text-slate-600"
                    )}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile section */}
      <div className="pt-3 border-t border-slate-100 mt-auto shrink-0 px-1">
        <div className="flex items-center justify-between rounded-xl p-2 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
              AD
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-tight">
                Admin User
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                Admin
              </span>
            </div>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-30 h-screen w-64 flex-col border-r border-slate-100 bg-white shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
        {navContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={onClose}
          />
          {/* Drawer content */}
          <div className="relative z-10 flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
