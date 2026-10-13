"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Mic,
  Image as ImageIcon,
  Zap,
  TrendingUp,
  CheckCircle2,
  Cpu,
  Flame,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIModule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  status: "Active" | "Optimized" | "Ready";
  metrics: string;
}

export default function AISystemView() {
  const [activeTab, setActiveTab] = useState<"overview" | "models" | "activity">("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const aiModules: AIModule[] = [
    {
      id: "voice-ai",
      title: "Voice AI Listing Extraction",
      description: "Extract structured property details, pricing, and amenities directly from natural speech & audio memos.",
      icon: Mic,
      badge: "Real-time Whisper v3",
      status: "Active",
      metrics: "99.2% Accuracy",
    },
    {
      id: "photo-ai",
      title: "Photo & Video AI Enhancement",
      description: "Auto HDR tone mapping, sky replacement, perspective correction, and virtual staging rendering.",
      icon: ImageIcon,
      badge: "Diffusion Pipeline",
      status: "Active",
      metrics: "1.4s Avg Latency",
    },
    {
      id: "matching-ai",
      title: "Smart Buyer Match Engine",
      description: "Automatically matches newly listed properties to hot CRM leads based on budget, location, and intent scoring.",
      icon: Zap,
      badge: "Vector Embedding",
      status: "Optimized",
      metrics: "94% Match Rate",
    },
    {
      id: "valuation-ai",
      title: "Automated Valuation Model (AVM)",
      description: "Calculates fair market values, rental yields, and price per sqm using regional transactional comp data.",
      icon: TrendingUp,
      badge: "Predictive Regressor",
      status: "Ready",
      metrics: "±3.2% Error Margin",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-[32px] py-6 sm:py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              AI System Studio
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              v2.4 Neural
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Core AI engine powering property extraction, computer vision enhancement, and predictive CRM intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("AI Engine cache refreshed and synced!")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
            Sync AI Cache
          </button>
        </div>
      </div>

      {/* Metric summary counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Models</span>
            <Cpu className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">4 / 4</p>
          <span className="text-[11px] text-emerald-600 font-medium">100% Operational</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Media Enhanced</span>
            <ImageIcon className="h-4 w-4 text-violet-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">1,248</p>
          <span className="text-[11px] text-slate-400 font-medium">+18 today</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Voice Transcripts</span>
            <Mic className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">386</p>
          <span className="text-[11px] text-emerald-600 font-medium">99.2% Accuracy</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Lead Match Rate</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">94.8%</p>
          <span className="text-[11px] text-slate-400 font-medium">Instant notification</span>
        </div>
      </div>

      {/* AI Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiModules.map((module) => {
          const Icon = module.icon;
          return (
            <div
              key={module.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                        {module.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {module.badge}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {module.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 mt-3.5 leading-relaxed">
                  {module.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{module.metrics}</span>
                <button
                  onClick={() => showToast(`${module.title} test run initiated!`)}
                  className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Run Benchmark
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Engine Health Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold">PropertyAI Neural Subsystem Status</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              All inference nodes are running at nominal temperatures with automatic fallback to secondary GPU clusters.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-slate-400 block">Current Latency</span>
              <span className="text-sm font-bold text-emerald-400">42ms global</span>
            </div>
            <button
              onClick={() => showToast("Diagnostic report generated and sent to logs.")}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
            >
              System Diagnostics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
