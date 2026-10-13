"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Download,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BarMonthData {
  month: string;
  leadVolume: number;
  closedDeals: number;
}

const barChartData: BarMonthData[] = [
  { month: "May", leadVolume: 42, closedDeals: 8 },
  { month: "Jun", leadVolume: 58, closedDeals: 12 },
  { month: "Jul", leadVolume: 51, closedDeals: 10 },
  { month: "Aug", leadVolume: 68, closedDeals: 15 },
  { month: "Sep", leadVolume: 76, closedDeals: 18 },
  { month: "Oct", leadVolume: 29, closedDeals: 6 },
];

interface PipelineStageData {
  name: string;
  count: number;
  color: string;
}

const pipelineData: PipelineStageData[] = [
  { name: "New", count: 12, color: "#3B82F6" },
  { name: "Contacted", count: 18, color: "#1D4ED8" },
  { name: "Qualified", count: 9, color: "#C29D59" },
  { name: "Visit Sched.", count: 6, color: "#10B981" },
  { name: "Closed", count: 5, color: "#64748B" },
];

interface LeadSourceData {
  name: string;
  count: number;
  percentage: string;
  barPercent: number;
}

const leadSourcesData: LeadSourceData[] = [
  { name: "Voice Inbound", count: 28, percentage: "38%", barPercent: 62 },
  { name: "WhatsApp Chat", count: 22, percentage: "30%", barPercent: 48 },
  { name: "Web Chat", count: 14, percentage: "19%", barPercent: 30 },
  { name: "Direct Inquiry", count: 7, percentage: "9%", barPercent: 15 },
  { name: "Voice Outbound", count: 3, percentage: "4%", barPercent: 7 },
];

export default function ReportsAnalyticsView() {
  const [activeTab, setActiveTab] = useState<string>("Lead Analytics");
  const [hoveredBar, setHoveredBar] = useState<BarMonthData | null>(null);

  // SVG Donut Slices calculation
  const totalPipeline = pipelineData.reduce((acc, curr) => acc + curr.count, 0); // 50
  let cumulativeAngle = 0;

  const donutSlices = pipelineData.map((item) => {
    const sliceAngle = (item.count / totalPipeline) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += sliceAngle;
    return {
      ...item,
      startAngle,
      sliceAngle,
    };
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-[32px] py-6 sm:py-8 space-y-6">
      {/* Header section matching reference screenshot */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Reports & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Data insights across leads, properties, AI, and revenue.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-100 overflow-x-auto custom-scrollbar pt-1">
        {["Lead Analytics", "Property Analytics", "Revenue Analytics", "AI Insights"].map(
          (tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-slate-500 hover:text-slate-800 font-medium"
                )}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          }
        )}
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* 1. Total Leads (Oct) */}
        <div className="bg-white rounded-2xl border border-slate-100 py-5 px-5 sm:px-6 shadow-2xs">
          <span className="text-2xl sm:text-3xl font-bold text-blue-600 block leading-tight">
            29
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Total Leads (Oct)
          </span>
          <span className="text-xs font-semibold text-emerald-500 mt-1 block">
            +8%
          </span>
        </div>

        {/* 2. Conversion Rate */}
        <div className="bg-white rounded-2xl border border-slate-100 py-5 px-5 sm:px-6 shadow-2xs">
          <span className="text-2xl sm:text-3xl font-bold text-emerald-500 block leading-tight">
            24%
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Conversion Rate
          </span>
          <span className="text-xs font-semibold text-emerald-500 mt-1 block">
            +2%
          </span>
        </div>

        {/* 3. Avg Response Time */}
        <div className="bg-white rounded-2xl border border-slate-100 py-5 px-5 sm:px-6 shadow-2xs">
          <span className="text-2xl sm:text-3xl font-bold text-slate-800 block leading-tight">
            4.2 min
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Avg Response Time
          </span>
          <span className="text-xs font-semibold text-emerald-500 mt-1 block">
            -1.1
          </span>
        </div>

        {/* 4. Lost Leads */}
        <div className="bg-white rounded-2xl border border-slate-100 py-5 px-5 sm:px-6 shadow-2xs">
          <span className="text-2xl sm:text-3xl font-bold text-slate-800 block leading-tight">
            3
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1.5 block">
            Lost Leads
          </span>
          <span className="text-xs font-semibold text-emerald-500 mt-1 block">
            -2
          </span>
        </div>
      </div>

      {/* Middle Row: Lead Volume Chart & Pipeline Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Lead Volume vs Closed Deals (Col-span 7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Lead Volume vs Closed Deals
            </h2>
            {/* Tooltip summary if hovered */}
            {hoveredBar && (
              <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 animate-in fade-in">
                {hoveredBar.month}: Leads: {hoveredBar.leadVolume} | Closed:{" "}
                {hoveredBar.closedDeals}
              </span>
            )}
          </div>

          {/* Bar Chart Area */}
          <div className="relative pt-4 pb-2">
            {/* Y-Axis Grid Lines & Numbers */}
            <div className="relative h-48 w-full flex flex-col justify-between">
              {[80, 60, 40, 20, 0].map((num) => (
                <div key={num} className="flex items-center w-full gap-3">
                  <span className="text-[11px] font-medium text-slate-400 w-5 text-right shrink-0">
                    {num}
                  </span>
                  <div className="h-[1px] w-full bg-slate-100/90" />
                </div>
              ))}

              {/* Absolute Bar Columns Container aligned above grid */}
              <div className="absolute inset-x-0 bottom-0 top-0 left-9 flex items-end justify-around pr-2">
                {barChartData.map((d) => {
                  const leadHeightPercent = (d.leadVolume / 80) * 100;
                  const closedHeightPercent = (d.closedDeals / 80) * 100;

                  return (
                    <div
                      key={d.month}
                      onMouseEnter={() => setHoveredBar(d)}
                      onMouseLeave={() => setHoveredBar(null)}
                      className="flex items-end gap-1.5 h-full group cursor-pointer"
                    >
                      {/* Blue Bar: Lead Volume */}
                      <div
                        style={{ height: `${leadHeightPercent}%` }}
                        className="w-4 sm:w-5 bg-blue-600 rounded-t-sm transition-all duration-300 group-hover:bg-blue-700"
                        title={`${d.month} Leads: ${d.leadVolume}`}
                      />

                      {/* Green Bar: Closed Deals */}
                      <div
                        style={{ height: `${closedHeightPercent}%` }}
                        className="w-4 sm:w-5 bg-emerald-500 rounded-t-sm transition-all duration-300 group-hover:bg-emerald-600"
                        title={`${d.month} Closed: ${d.closedDeals}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-Axis Months Labels */}
            <div className="flex items-center justify-around pl-9 pr-2 pt-2.5">
              {barChartData.map((d) => (
                <span
                  key={d.month}
                  className="text-xs font-medium text-slate-500 w-10 text-center"
                >
                  {d.month}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Pipeline Distribution Donut (Col-span 5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            Pipeline Distribution
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto">
            {/* Donut Chart SVG */}
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {donutSlices.map((slice) => {
                  const strokeDasharray = `${(slice.count / totalPipeline) * 251.2} 251.2`;
                  const strokeDashoffset = -((slice.startAngle / 360) * 251.2);

                  return (
                    <circle
                      key={slice.name}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth="16"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500 hover:opacity-85"
                    />
                  );
                })}
              </svg>

              {/* Center hole whitespace for true donut ring */}
              <div className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full pointer-events-none" />
            </div>

            {/* Legend List matching screenshot */}
            <div className="space-y-2.5 w-full sm:w-auto min-w-[140px]">
              {pipelineData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-4 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ backgroundColor: item.color }}
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                    />
                    <span className="text-slate-600 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-800 font-mono">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Lead Sources Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
          Lead Sources Breakdown
        </h2>

        <div className="space-y-4">
          {leadSourcesData.map((source) => (
            <div
              key={source.name}
              className="flex items-center gap-4 text-xs sm:text-sm group"
            >
              {/* Source Label */}
              <span className="w-28 sm:w-36 text-slate-600 font-medium shrink-0 truncate">
                {source.name}
              </span>

              {/* Progress Bar Track */}
              <div className="flex-1 bg-slate-100/80 h-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${source.barPercent}%` }}
                  className="h-full bg-blue-600 rounded-full transition-all duration-500 group-hover:bg-blue-700"
                />
              </div>

              {/* Counts & Percentage */}
              <div className="flex items-center justify-end gap-2 w-16 shrink-0 text-right">
                <span className="font-bold text-slate-900">{source.count}</span>
                <span className="text-xs text-slate-400 font-normal">
                  {source.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
