"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Sparkles,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "../data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SettingsView() {
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    location: currentUser.location,
    preferredCurrency: "IDR (Indonesian Rupiah)",
    targetBudget: "IDR 3,000,000,000 - 6,000,000,000",
  });

  const [notifications, setNotifications] = useState({
    emailPriceDrops: true,
    whatsappTours: true,
    aiRecommendations: true,
    newsletter: false,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Profile & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal information, AI preferences, and notification channels
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
                {currentUser.avatarLetter}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
              <p className="text-xs text-slate-400 font-medium">Customer Member since 2026</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                Verified Buyer Tier
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Phone Number (WhatsApp)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Primary Residence
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI & Search Preferences */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              AI Recommendation Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Target Budget Range
              </label>
              <input
                type="text"
                value={profile.targetBudget}
                onChange={(e) => setProfile({ ...profile, targetBudget: e.target.value })}
                className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Display Currency
              </label>
              <input
                type="text"
                value={profile.preferredCurrency}
                disabled
                className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications Checkboxes */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Communication & Notifications
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailPriceDrops}
                onChange={(e) =>
                  setNotifications({ ...notifications, emailPriceDrops: e.target.checked })
                }
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Send instant email alerts when bookmarked properties drop in price</span>
            </label>

            <label className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.whatsappTours}
                onChange={(e) =>
                  setNotifications({ ...notifications, whatsappTours: e.target.checked })
                }
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Send WhatsApp reminders 2 hours before scheduled site visits</span>
            </label>

            <label className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.aiRecommendations}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    aiRecommendations: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Weekly AI digest of highest yield investment properties matching criteria</span>
            </label>
          </div>
        </div>

        {/* Submit row */}
        <div className="flex items-center justify-between">
          {savedSuccess && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4" />
              <span>Settings saved successfully!</span>
            </div>
          )}
          {!savedSuccess && <div />}

          <Button
            type="submit"
            className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
