"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Wallet,
  TrendingUp,
  Lightbulb,
  Download,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart3,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { reportsRevenueTrendData, reportsLeadSourceData } from "./data";
import { RevenueMonthPoint, LeadSourceDistributionItem } from "./types";

type ReportTab =
  | "Platform Overview"
  | "User Analytics"
  | "Property Performance"
  | "Lead Analytics"
  | "Revenue"
  | "AI Performance";

interface SuperAdminReportsViewProps {
  revenueTrend?: RevenueMonthPoint[];
  leadSources?: LeadSourceDistributionItem[];
}

export default function SuperAdminReportsView({
  revenueTrend = reportsRevenueTrendData,
  leadSources = reportsLeadSourceData,
}: SuperAdminReportsViewProps) {
  const [activeTab, setActiveTab] = useState<ReportTab>("Platform Overview");
  const [timeRange, setTimeRange] = useState("Last 30 days");
  const [hoveredPoint, setHoveredPoint] = useState<RevenueMonthPoint | null>(null);
  const [hoveredSource, setHoveredSource] = useState<LeadSourceDistributionItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Month,Revenue (Million IDR),Transactions\n" +
      revenueTrend.map((d) => `${d.month},${d.revenue},${d.transactions}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PropertyAI_Analytics_Report_${timeRange.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`✓ Exported ${timeRange} reports & analytics data as CSV!`);
  };

  // SVG Spline Math for Revenue Trend Curve
  const svgWidth = 560;
  const svgHeight = 220;
  const paddingLeft = 45;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;
  const chartW = svgWidth - paddingLeft - paddingRight;
  const chartH = svgHeight - paddingTop - paddingBottom;
  const maxRevenue = 800;

  const points = revenueTrend.map((d, i) => {
    const x = paddingLeft + (i / (revenueTrend.length - 1)) * chartW;
    const y = paddingTop + chartH - (d.revenue / maxRevenue) * chartH;
    return { x, y, ...d };
  });

  const curvePath = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cpX1 = prev.x + (point.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (point.x - prev.x) / 2;
    const cpY2 = point.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${point.x} ${point.y}`;
  }, "");

  // Donut SVG Calculations for Lead Source Distribution
  const donutSize = 180;
  const donutStrokeWidth = 34;
  const donutRadius = (donutSize - donutStrokeWidth) / 2;
  const donutCircumference = 2 * Math.PI * donutRadius;
  let accumulatedPercent = 0;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24 text-slate-800 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 backdrop-blur px-4 py-3 text-xs font-medium text-white shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Reports & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            Platform-wide performance and business intelligence
          </p>
        </div>

        {/* Right Controls: Time Range Dropdown + Export */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => {
                setTimeRange(e.target.value);
                showToast(`Filter updated to ${e.target.value}`);
              }}
              className="appearance-none bg-white border border-slate-200/90 rounded-lg pl-3 pr-8 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-2xs transition-colors"
            >
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>
              <option value="This Year (YTD)">This Year (YTD)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 stroke-[2.2]" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* TABS ROW */}
      <div className="border-b border-slate-200">
        <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          {[
            "Platform Overview",
            "User Analytics",
            "Property Performance",
            "Lead Analytics",
            "Revenue",
            "AI Performance",
          ].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as ReportTab)}
                className={cn(
                  "relative pb-3 text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer",
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-slate-400 hover:text-slate-700 font-medium"
                )}
              >
                <span>{tab}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* TOP 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: Total Users */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Users className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50/90 px-2 py-0.5 rounded-full border border-emerald-100/60">
              <span className="text-[10px]">↑</span>
              +124
            </span>
          </div>
          <div className="mt-3.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              3,842
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Total Users
            </p>
          </div>
        </div>

        {/* CARD 2: Revenue YTD */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
              <Wallet className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50/90 px-2 py-0.5 rounded-full border border-emerald-100/60">
              <span className="text-[10px]">↑</span>
              +14%
            </span>
          </div>
          <div className="mt-3.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              IDR 12.8B
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Revenue YTD
            </p>
          </div>
        </div>

        {/* CARD 3: Conversion Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50/90 px-2 py-0.5 rounded-full border border-emerald-100/60">
              <span className="text-[10px]">↑</span>
              +2%
            </span>
          </div>
          <div className="mt-3.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              24%
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Conversion Rate
            </p>
          </div>
        </div>

        {/* CARD 4: AI Lead Capture */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Lightbulb className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50/90 px-2 py-0.5 rounded-full border border-emerald-100/60">
              <span className="text-[10px]">↑</span>
              +8
            </span>
          </div>
          <div className="mt-3.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              31
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              AI Lead Capture
            </p>
          </div>
        </div>
      </div>

      {/* CHARTS ROW: Revenue Trend & Lead Source Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* CHART 1: REVENUE TREND */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Revenue Trend
                </h3>
                <p className="text-xs text-slate-400 font-normal mt-0.5">
                  Monthly IDR (millions)
                </p>
              </div>

              {hoveredPoint && (
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-600">
                    IDR {hoveredPoint.revenue}M
                  </span>
                  <p className="text-[10px] text-slate-400">
                    {hoveredPoint.transactions} deals ({hoveredPoint.month})
                  </p>
                </div>
              )}
            </div>

            {/* SVG Chart Canvas */}
            <div className="mt-4 relative w-full overflow-hidden">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto overflow-visible select-none"
              >
                {/* Horizontal reference grid lines */}
                {[800, 600, 400, 200, 0].map((val) => {
                  const y = paddingTop + chartH - (val / maxRevenue) * chartH;
                  return (
                    <g key={val}>
                      <text
                        x={paddingLeft - 12}
                        y={y + 4}
                        textAnchor="end"
                        className="text-[10px] fill-slate-400 font-normal font-sans"
                      >
                        {val}
                      </text>
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={svgWidth - paddingRight}
                        y2={y}
                        stroke="#f1f5f9"
                        strokeDasharray={val === 0 ? "none" : "3 3"}
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}

                {/* Smooth Curve Path (Amber / Warm Gold) */}
                <path
                  d={curvePath}
                  fill="none"
                  stroke="#c59b27"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Circular Nodes on curve */}
                {points.map((p, i) => {
                  const isHovered = hoveredPoint?.month === p.month;
                  return (
                    <g
                      key={p.month}
                      onMouseEnter={() => setHoveredPoint(p)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 6 : 4}
                        fill="#c59b27"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition-all duration-150"
                      />
                      {/* X-Axis Month Label */}
                      <text
                        x={p.x}
                        y={svgHeight - 12}
                        textAnchor="middle"
                        className={cn(
                          "text-[11px] font-sans transition-colors",
                          isHovered
                            ? "fill-slate-900 font-bold"
                            : "fill-slate-400 font-medium"
                        )}
                      >
                        {p.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* CHART 2: LEAD SOURCE DISTRIBUTION */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Lead Source Distribution
            </h3>

            {/* Donut Chart & Legend Row */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Donut Chart Canvas */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg
                  width={donutSize}
                  height={donutSize}
                  viewBox={`0 0 ${donutSize} ${donutSize}`}
                  className="-rotate-90"
                >
                  {leadSources.map((item) => {
                    const strokeDasharray = `${
                      (item.percentage / 100) * donutCircumference
                    } ${donutCircumference}`;
                    const strokeDashoffset = -(
                      (accumulatedPercent / 100) *
                      donutCircumference
                    );
                    accumulatedPercent += item.percentage;
                    const isHovered = hoveredSource?.id === item.id;

                    return (
                      <circle
                        key={item.id}
                        cx={donutSize / 2}
                        cy={donutSize / 2}
                        r={donutRadius}
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth={isHovered ? donutStrokeWidth + 4 : donutStrokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={() => setHoveredSource(item)}
                        onMouseLeave={() => setHoveredSource(null)}
                      />
                    );
                  })}
                </svg>

                {/* Center Hover Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  {hoveredSource ? (
                    <>
                      <span className="text-xs font-bold text-slate-900">
                        {hoveredSource.percentage}%
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {hoveredSource.label}
                      </span>
                    </>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400">
                      Sources
                    </span>
                  )}
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 w-full space-y-2.5">
                {leadSources.map((item) => {
                  const isHovered = hoveredSource?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredSource(item)}
                      onMouseLeave={() => setHoveredSource(null)}
                      className={cn(
                        "flex items-center justify-between px-2 py-1 rounded-lg transition-colors cursor-pointer",
                        isHovered && "bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span
                          className={cn(
                            "text-xs transition-colors",
                            isHovered
                              ? "font-semibold text-slate-900"
                              : "text-slate-500 font-medium"
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {item.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION: Back to Portal Select */}
      <div className="flex justify-center pt-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back to Portal Select</span>
        </Link>
      </div>
    </div>
  );
}
