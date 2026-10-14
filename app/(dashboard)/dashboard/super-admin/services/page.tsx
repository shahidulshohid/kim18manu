"use client";

import React, { useState } from "react";
import {
  Server,
  Database,
  Cpu,
  Globe,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  HardDrive,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function SuperAdminServicesPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const services = [
    {
      name: "PropertyAI LLM Gateway",
      type: "AI Inference Engine",
      status: "Operational",
      uptime: "99.98%",
      latency: "142ms",
      load: "28%",
      icon: Cpu,
    },
    {
      name: "Primary Database Cluster (PostgreSQL)",
      type: "Managed Aurora Multi-AZ",
      status: "Operational",
      uptime: "99.99%",
      latency: "12ms",
      load: "41%",
      icon: Database,
    },
    {
      name: "Voice Inbound Pipeline (SIP / WebRTC)",
      type: "Real-time Audio Stream",
      status: "Operational",
      uptime: "99.95%",
      latency: "85ms",
      load: "34%",
      icon: Zap,
    },
    {
      name: "S3 / Cloudflare CDN Media Storage",
      type: "Object Storage & Images",
      status: "Operational",
      uptime: "100.0%",
      latency: "18ms",
      load: "52%",
      icon: HardDrive,
    },
    {
      name: "Escrow & Payment Webhooks",
      type: "Transaction Dispatcher",
      status: "Operational",
      uptime: "99.99%",
      latency: "32ms",
      load: "19%",
      icon: ShieldCheck,
    },
    {
      name: "Edge API & Load Balancer",
      type: "Global Traffic Director",
      status: "Operational",
      uptime: "100.0%",
      latency: "8ms",
      load: "23%",
      icon: Globe,
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Platform Services & Infrastructure
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry, service health checks, and cluster operations.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="h-9 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 text-slate-500 ${
              isRefreshing ? "animate-spin text-blue-600" : ""
            }`}
          />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.name}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs hover:shadow-xs transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {svc.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {svc.type}
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {svc.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-50 text-center">
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="block text-[10px] text-slate-400 font-medium">
                    Uptime
                  </span>
                  <span className="block text-xs font-bold text-slate-800 mt-0.5">
                    {svc.uptime}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="block text-[10px] text-slate-400 font-medium">
                    Latency
                  </span>
                  <span className="block text-xs font-bold text-slate-800 mt-0.5">
                    {svc.latency}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="block text-[10px] text-slate-400 font-medium">
                    Load
                  </span>
                  <span className="block text-xs font-bold text-slate-800 mt-0.5">
                    {svc.load}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
