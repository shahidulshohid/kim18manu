"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Home,
  UserSquare,
  Handshake,
  Shield,
  Sparkles,
  Bell,
  BarChart3,
  Wrench,
  UserCog,
  HelpCircle,
  Settings,
  LogOut,
  X,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { superAdminMainNav, superAdminAnalyticsNav } from "./data";

interface SuperAdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  Users,
  Home,
  UserSquare,
  Handshake,
  Shield,
  Sparkles,
  Bell,
  BarChart3,
  Wrench,
  UserCog,
};

export default function SuperAdminSidebar({
  isOpen = false,
  onClose,
}: SuperAdminSidebarProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard/super-admin") {
      return pathname === "/dashboard/super-admin";
    }
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex h-full flex-col bg-white px-3.5 py-4 select-none overflow-hidden border-r border-slate-100">
      {/* Top Header / Brand Logo */}
      <div className="flex items-center justify-between pb-4 px-2 shrink-0">
        <Link
          href="/dashboard/super-admin"
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
              Super Admin
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
      <div className="flex-1 min-h-0 overflow-y-auto pr-0.5 space-y-4 custom-scrollbar mt-1">
        {/* MAIN SECTION */}
        <div>
          <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
            MAIN
          </p>
          <nav className="space-y-1">
            {superAdminMainNav.map((item) => {
              const Icon = iconMap[item.iconName] || LayoutGrid;
              const active = isLinkActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-blue-50/90 text-blue-600 font-semibold shadow-2xs"
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

                  {item.badge !== undefined && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-bold text-white shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ANALYTICS & CONTROL SECTION */}
        <div>
          <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
            ANALYTICS & CONTROL
          </p>
          <nav className="space-y-1">
            {superAdminAnalyticsNav.map((item) => {
              const Icon = iconMap[item.iconName] || BarChart3;
              const active = isLinkActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-blue-50/90 text-blue-600 font-semibold shadow-2xs"
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

                  {item.badge !== undefined && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-bold text-white shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* HELP & SETTINGS SECTION */}
        <div className="pt-2 border-t border-slate-100/80 space-y-1">
          <Link
            href="/dashboard/super-admin/help"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            <HelpCircle className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <span>Help / Support</span>
          </Link>
          <Link
            href="/dashboard/super-admin/settings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            <Settings className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Bottom Profile section matching screenshot */}
      <div className="pt-3 border-t border-slate-100 mt-auto shrink-0 px-1">
        <div className="flex items-center justify-between rounded-xl p-2 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              SA
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-tight">
                Super Admin
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                admin@propertyai.id
              </span>
            </div>
          </div>
          <Link
            href="/login"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-30 h-screen w-64 flex-col bg-white shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
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
