"use client";

import React, { useState } from "react";
import { Search, Bell, Menu, Check } from "lucide-react";
import Link from "next/link";

interface AgentHeaderProps {
  onMenuClick?: () => void;
}

export default function AgentHeader({ onMenuClick }: AgentHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

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

        {/* Search input matching screenshot */}
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

      {/* Right: Live pill, Bell, and Avatar */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Live Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* Notification dropdown preview */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notifications (2)</span>
                <span className="text-[11px] text-blue-600 font-medium cursor-pointer">Mark all read</span>
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

        {/* User Avatar */}
        <Link
          href="/dashboard/agent"
          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
        >
          <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm ring-2 ring-blue-100">
            AD
          </div>
        </Link>
      </div>
    </header>
  );
}
