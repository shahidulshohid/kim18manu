"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Menu,
  Plus,
  Command,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  Building2,
  UserPlus,
  FilePlus,
  AlertTriangle,
  X,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface SuperAdminHeaderProps {
  onMenuClick?: () => void;
  onQuickAdd?: () => void;
}

export default function SuperAdminHeader({
  onMenuClick,
  onQuickAdd,
}: SuperAdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenQuickAdd = () => {
    if (onQuickAdd) {
      onQuickAdd();
    } else {
      setShowQuickAddModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 transition-all">
        {/* Left: Mobile hamburger & Titles */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-none">
              Dashboard
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              PropertyAI Platform
            </p>
          </div>
        </div>

        {/* Center: Search input matching screenshot */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-2xs"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none text-slate-300">
              <Command className="h-3 w-3" />
              <span className="text-[10px] font-semibold">K</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Add, Bell, Status pill & Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Quick Add Button */}
          <button
            type="button"
            onClick={handleOpenQuickAdd}
            className="h-10 px-3.5 sm:px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-150 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span className="hidden xs:inline">Quick Add</span>
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setIsProfileOpen(false);
              }}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">
                    System Alerts & Approvals (2)
                  </span>
                  <Link
                    href="/dashboard/super-admin/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] text-blue-600 font-medium hover:underline cursor-pointer"
                  >
                    View all
                  </Link>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-xs">
                    <p className="font-semibold text-slate-900">
                      2 Agent applications pending
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Hendra Wijaya & Tono Susanto require license verification.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100/60 text-xs">
                    <p className="font-semibold text-slate-900">
                      Platform GMV Target Surpassed
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      October gross revenue reached IDR 310M (+8%).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Super Admin Status Pill matching screenshot */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Super Admin</span>
          </div>

          {/* User Avatar Circle & Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setShowNotifications(false);
              }}
              className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center shadow-xs transition-all cursor-pointer ring-2 ring-transparent hover:ring-blue-100 active:scale-95 select-none"
              aria-label="User profile menu"
            >
              SA
            </button>

            {/* Profile Dropdown Card */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2.5 w-64 rounded-2xl bg-white p-3 shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 leading-tight">
                      Super Admin
                    </span>
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">
                      Root
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                    admin@propertyai.id
                  </p>
                </div>

                <div className="my-2 h-px bg-slate-100" />

                {/* Portal Switcher */}
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Switch Portal
                </p>
                <div className="space-y-1 mb-2">
                  <Link
                    href="/dashboard/agent"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-blue-600" />
                      Agent Dashboard
                    </span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </Link>
                  <Link
                    href="/dashboard/customer"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-purple-600" />
                      Customer Portal
                    </span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </Link>
                </div>

                <div className="my-2 h-px bg-slate-100" />

                {/* Account Settings */}
                <Link
                  href="/dashboard/super-admin/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-slate-500" />
                  <span>Platform Settings</span>
                </Link>

                {/* Log Out */}
                <Link
                  href="/login"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-1"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span>Log Out</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Quick Add Modal */}
      {showQuickAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setShowQuickAddModal(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Super Admin Quick Action
              </h3>
              <button
                onClick={() => setShowQuickAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Select an administrative task to perform across the platform:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  alert("Opening User Provisioning modal...");
                  setShowQuickAddModal(false);
                }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 transition-all text-center group cursor-pointer"
              >
                <UserPlus className="h-6 w-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-800">Add User</span>
                <span className="text-[10px] text-slate-400">Agent, Admin, Lead</span>
              </button>

              <button
                onClick={() => {
                  alert("Opening Global Property Registry...");
                  setShowQuickAddModal(false);
                }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 transition-all text-center group cursor-pointer"
              >
                <FilePlus className="h-6 w-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-800">Add Property</span>
                <span className="text-[10px] text-slate-400">Direct platform listing</span>
              </button>

              <button
                onClick={() => {
                  alert("Opening Broadcast Notice dialog...");
                  setShowQuickAddModal(false);
                }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all text-center group cursor-pointer"
              >
                <AlertTriangle className="h-6 w-6 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-800">System Alert</span>
                <span className="text-[10px] text-slate-400">Broadcast banner</span>
              </button>

              <button
                onClick={() => {
                  alert("Exporting Platform Audit Logs...");
                  setShowQuickAddModal(false);
                }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-center group cursor-pointer"
              >
                <ShieldCheck className="h-6 w-6 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-800">Audit Export</span>
                <span className="text-[10px] text-slate-400">CSV & Compliance</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
