"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Key,
  Globe,
  Bell,
  Sliders,
  CheckCircle2,
  Database,
  Lock,
} from "lucide-react";

export default function SuperAdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [require2FA, setRequire2FA] = useState(true);
  const [autoVerifyAgents, setAutoVerifyAgents] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Super Admin Platform Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Root configuration, authentication policies, and ecosystem controls.
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold p-4 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Platform configuration updated successfully.</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">Security & Access</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage global security policies for all admins, agents, and users.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Enforce Two-Factor Authentication (2FA)
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Mandatory for all Super Admin and Agent partner accounts.
              </p>
            </div>
            <input
              type="checkbox"
              checked={require2FA}
              onChange={(e) => setRequire2FA(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Platform Maintenance Mode
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Temporarily pause public portal access for scheduled upgrades.
              </p>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Auto-Verify Licensed Agents
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Instantly provision access if AREBI registry matches without manual review.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoVerifyAgents}
              onChange={(e) => setAutoVerifyAgents(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
