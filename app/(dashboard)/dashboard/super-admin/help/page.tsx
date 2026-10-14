"use client";

import React from "react";
import { HelpCircle, BookOpen, MessageSquare, ShieldAlert, Mail } from "lucide-react";
import Link from "next/link";

export default function SuperAdminHelpPage() {
  return (
    <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Super Admin Help & Support Desk
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Operational documentation, emergency runbooks, and direct developer escalation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs space-y-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Platform Runbooks</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Standard operating procedures for KYC/AML audits, agent licensing verifications, and escrow dispute resolutions.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs space-y-3">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Incident Management</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Severity-1 outage escalation protocols, webhook dead-letter queue replaying, and database failover steps.
          </p>
        </div>
      </div>
    </div>
  );
}
