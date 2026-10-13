"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";

interface AgentHeaderProps {
  onMenuClick?: () => void;
}

export default function AgentHeader({ onMenuClick }: AgentHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
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

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-[32px] transition-all">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search input */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search listings, leads, agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Right: Live pill, Bell, and Avatar with Profile Dropdown */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Live Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live</span>
        </div>

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

          {/* Notification dropdown preview */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notifications (2)</span>
                <Link
                  href="/dashboard/agent/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-blue-600 font-medium hover:underline cursor-pointer"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100/50 text-xs">
                  <p className="font-semibold text-slate-800">New hot lead assigned</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Ahmad Fauzi via Voice Inbound</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 text-xs">
                  <p className="font-semibold text-slate-800">Site visit confirmed</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Modern Villa for Oct 5</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Dropdown matching Screenshot */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setShowNotifications(false);
            }}
            className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center shadow-xs transition-all cursor-pointer ring-2 ring-transparent hover:ring-blue-100 active:scale-95 select-none"
            aria-label="User profile menu"
          >
            A
          </button>

          {/* Profile Dropdown Card */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white p-2.5 shadow-xl border border-slate-100/90 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
              {/* User Name & Email */}
              <div className="px-3 py-2">
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  Anisa Rahma
                </p>
                <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                  anisa.rahma@example.com
                </p>
              </div>

              {/* Top Divider */}
              <div className="my-1.5 h-px bg-slate-100" />

              {/* Menu Links */}
              <div className="space-y-0.5">
                <Link
                  href="/dashboard/agent/team"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
                >
                  <User className="h-4 w-4 text-slate-500 stroke-[1.8]" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/dashboard/agent/team"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-slate-500 stroke-[1.8]" />
                  <span>Account Settings</span>
                </Link>
              </div>

              {/* Bottom Divider */}
              <div className="my-1.5 h-px bg-slate-100" />

              {/* Log Out */}
              <Link
                href="/login"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-red-500 stroke-[1.8]" />
                <span>Log Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
