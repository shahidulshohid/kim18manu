"use client";

import React, { useState } from "react";
import {
  User,
  MapPin,
  Globe,
  Bell,
  Shield,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsTab =
  | "personal"
  | "preferences"
  | "language"
  | "notifications"
  | "security";

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("personal");

  // Personal Information form state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Anisa Rahma",
    email: "anisa@email.com",
    phone: "+62 812 3456 7890",
    dob: "",
  });

  // Property Preferences state
  const [preferences, setPreferences] = useState({
    locations: "Jimbaran (Bali), SCBD (Jakarta), Dago (Bandung)",
    propertyTypes: "Villa, Residential, Luxury Apartment",
    budgetMin: "IDR 800,000,000",
    budgetMax: "IDR 5,000,000,000",
    beds: "3+ Beds",
  });

  // UI Language state
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("IDR");

  // Notification Settings state
  const [notifSettings, setNotifSettings] = useState({
    emailPriceDrops: true,
    emailNewMatches: true,
    whatsappVisits: true,
    marketingUpdates: false,
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: true,
  });

  // Logout confirmation modal state
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Personal information updated successfully!");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Property preferences saved successfully!");
  };

  const handleSaveLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Display language and locale preferences updated!");
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Notification channels saved!");
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Security settings updated!");
    setSecurityData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactor: securityData.twoFactor,
    });
  };

  const handleChangePhoto = () => {
    showToast("Photo upload feature ready. Select image to update avatar.");
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    showToast("Logging out of Customer Portal...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
          Profile & Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account, preferences, and security settings.
        </p>
      </div>

      {/* 2. Main Layout (Left Profile & Tabs + Right Settings Panel) */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
        {/* Left Column */}
        <div className="w-full lg:w-[270px] shrink-0 flex flex-col">
          {/* Profile Card matching screenshot */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 flex flex-col items-center justify-center text-center mb-5">
            {/* Blue Circle Avatar with 'A' */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-md shadow-blue-500/20 mb-3 select-none">
              A
            </div>

            <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
              {personalInfo.fullName}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {personalInfo.email}
            </p>

            <button
              type="button"
              onClick={handleChangePhoto}
              className="text-[#2563eb] text-xs font-semibold hover:underline mt-2.5 cursor-pointer transition-colors"
            >
              Change photo
            </button>
          </div>

          {/* Navigation Menu List matching screenshot */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("personal")}
              className={cn(
                "w-full rounded-xl sm:rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left",
                activeTab === "personal"
                  ? "bg-[#eff6ff] text-[#2563eb]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
              )}
            >
              <User className="h-4 w-4 shrink-0 stroke-[2]" />
              <span>Personal Information</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preferences")}
              className={cn(
                "w-full rounded-xl sm:rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm transition-all cursor-pointer text-left",
                activeTab === "preferences"
                  ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
              )}
            >
              <MapPin className="h-4 w-4 shrink-0 stroke-[2]" />
              <span>Property Preferences</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("language")}
              className={cn(
                "w-full rounded-xl sm:rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm transition-all cursor-pointer text-left",
                activeTab === "language"
                  ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
              )}
            >
              <Globe className="h-4 w-4 shrink-0 stroke-[2]" />
              <span>UI Display Language</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("notifications")}
              className={cn(
                "w-full rounded-xl sm:rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm transition-all cursor-pointer text-left",
                activeTab === "notifications"
                  ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
              )}
            >
              <Bell className="h-4 w-4 shrink-0 stroke-[2]" />
              <span>Notification Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={cn(
                "w-full rounded-xl sm:rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm transition-all cursor-pointer text-left",
                activeTab === "security"
                  ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
              )}
            >
              <Shield className="h-4 w-4 shrink-0 stroke-[2]" />
              <span>Privacy & Security</span>
            </button>

            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="w-full rounded-xl sm:rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 font-medium transition-all cursor-pointer text-left mt-2"
            >
              <LogOut className="h-4 w-4 shrink-0 stroke-[2]" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Right Column: Settings Panel */}
        <div className="flex-1 w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 min-w-0">
          {/* Tab 1: Personal Information (matches screenshot) */}
          {activeTab === "personal" && (
            <form onSubmit={handleSavePersonal}>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* FULL NAME */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>

                {/* EMAIL ADDRESS */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, email: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>

                {/* PHONE NUMBER */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, phone: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>

                {/* DATE OF BIRTH */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    DATE OF BIRTH
                  </label>
                  <input
                    type="date"
                    value={personalInfo.dob}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, dob: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Save Changes Button matching screenshot */}
              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Save Changes
              </button>
            </form>
          )}

          {/* Tab 2: Property Preferences */}
          {activeTab === "preferences" && (
            <form onSubmit={handleSavePreferences}>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                Property Preferences
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Target Search Locations
                  </label>
                  <input
                    type="text"
                    value={preferences.locations}
                    onChange={(e) =>
                      setPreferences({ ...preferences, locations: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Preferred Types
                  </label>
                  <input
                    type="text"
                    value={preferences.propertyTypes}
                    onChange={(e) =>
                      setPreferences({ ...preferences, propertyTypes: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Budget Min
                    </label>
                    <input
                      type="text"
                      value={preferences.budgetMin}
                      onChange={(e) =>
                        setPreferences({ ...preferences, budgetMin: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Budget Max
                    </label>
                    <input
                      type="text"
                      value={preferences.budgetMax}
                      onChange={(e) =>
                        setPreferences({ ...preferences, budgetMax: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Save Preferences
              </button>
            </form>
          )}

          {/* Tab 3: UI Display Language */}
          {activeTab === "language" && (
            <form onSubmit={handleSaveLanguage}>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                UI Display Language & Locale
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Portal Interface Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="en">English (United States)</option>
                    <option value="id">Bahasa Indonesia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Currency Notation
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="IDR">IDR (Indonesian Rupiah)</option>
                    <option value="USD">USD ($ United States Dollar)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Save Language Settings
              </button>
            </form>
          )}

          {/* Tab 4: Notification Settings */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSaveNotifications}>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                Notification Channels & Alerts
              </h2>

              <div className="space-y-4 mb-6">
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                      Price Drop Alerts
                    </span>
                    <span className="text-xs text-slate-400">
                      Receive email when saved properties drop in price.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSettings.emailPriceDrops}
                    onChange={(e) =>
                      setNotifSettings({
                        ...notifSettings,
                        emailPriceDrops: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                      New Matching Listings
                    </span>
                    <span className="text-xs text-slate-400">
                      Instant notifications when new villas/apartments match your saved searches.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSettings.emailNewMatches}
                    onChange={(e) =>
                      setNotifSettings({
                        ...notifSettings,
                        emailNewMatches: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                      WhatsApp Site Visit Reminders
                    </span>
                    <span className="text-xs text-slate-400">
                      Receive WhatsApp confirmations 2 hours prior to scheduled tours.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSettings.whatsappVisits}
                    onChange={(e) =>
                      setNotifSettings({
                        ...notifSettings,
                        whatsappVisits: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Save Notification Settings
              </button>
            </form>
          )}

          {/* Tab 5: Privacy & Security */}
          {activeTab === "security" && (
            <form onSubmit={handleSaveSecurity}>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                Privacy & Security
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={securityData.currentPassword}
                    onChange={(e) =>
                      setSecurityData({
                        ...securityData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={securityData.newPassword}
                    onChange={(e) =>
                      setSecurityData({
                        ...securityData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors mt-4">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                      Two-Factor Authentication (2FA)
                    </span>
                    <span className="text-xs text-slate-400">
                      Require OTP verification code when logging in from new devices.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={securityData.twoFactor}
                    onChange={(e) =>
                      setSecurityData({
                        ...securityData,
                        twoFactor: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Update Security Settings
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4. Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          onClick={() => setShowLogoutModal(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 text-center animate-in zoom-in-95 duration-200"
          >
            <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="h-6 w-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Log out of your account?
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Are you sure you want to log out of PropertyAI Customer Portal?
            </p>

            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer active:scale-95"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
