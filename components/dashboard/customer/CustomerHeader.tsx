"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  Check,
  User,
  Settings,
  LogOut,
  Building,
  ArrowRight,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "./data";
import { cn } from "@/lib/utils";

interface CustomerHeaderProps {
  onMenuClick?: () => void;
}

export default function CustomerHeader({ onMenuClick }: CustomerHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/dashboard/customer/discover?q=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-100/90 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Left: Mobile menu toggle + optional brand for mobile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Small brand for mobile only */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
            <Building className="h-4 w-4" />
          </div>
          <span className="font-bold text-slate-800 text-sm">PropertyAI</span>
        </div>
      </div>

      {/* Center: Search input matching mockup */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 min-w-0 max-w-xl mx-2 sm:mx-6"
      >
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties, areas, or ask AI..."
            className="w-full h-10 pl-10 pr-12 rounded-full border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs min-w-0"
          />
          <button
            type="submit"
            className="absolute inset-y-1.5 right-1.5 px-2.5 bg-transparent hover:bg-blue-50 text-blue-600 rounded-full text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Sparkles className="h-3 w-3 text-blue-600" />
            <span className="hidden sm:inline">AI</span>
          </button>
        </div>
      </form>

      {/* Right: Notifications Bell & Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {/* Active notification indicator dot */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-sm sm:w-96 rounded-2xl bg-white p-3 shadow-xl border border-slate-100 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-slate-900">
                    Notifications
                  </h4>
                  <span className="bg-blue-100 text-blue-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    2 New
                  </span>
                </div>
                <Link
                  href="/dashboard/customer/notifications"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  View all
                </Link>
              </div>

              <div className="py-2 divide-y divide-slate-50">
                <div className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex gap-3">
                    <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        Price drop on Modern Villa in Jimbaran
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Reduced by IDR 200,000,000. Matching your Bali criteria!
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        15 minutes ago
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex gap-3">
                    <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        Site Visit confirmed for tomorrow
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Agent Budi Santoso confirmed meeting at SCBD Suite at
                        10:00 AM.
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        2 hours ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <Link
                  href="/dashboard/customer/notifications"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-slate-600 hover:text-blue-600 font-medium inline-flex items-center gap-1"
                >
                  Go to notification center
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center rounded-full ring-2 ring-transparent hover:ring-blue-100 transition-all p-0.5"
            aria-label="User profile menu"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                {currentUser.avatarLetter}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-slate-100 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-400 font-medium truncate">
                  {currentUser.email}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/customer/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <User className="h-3.5 w-3.5" />
                  My Profile
                </Link>
                <Link
                  href="/dashboard/customer/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Account Settings
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <Link
                  href="/signin"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Log Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
