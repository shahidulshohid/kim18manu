"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Home,
  User,
  Flag,
  Wallet,
  Shield,
  Download,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  superAdminMetrics,
  revenueChartData,
  propertyStatusData,
  leadVolumeData,
  hotLeadsData,
  pendingAgentApprovals,
  superAdminActivities,
} from "./data";
import { PendingAgentApproval, HotLeadItem } from "./types";

const metricIconMap: Record<string, React.ElementType> = {
  Users,
  Home,
  User,
  Flag,
  Wallet,
  Shield,
};

export default function SuperAdminHomeView() {
  const [timeRange, setTimeRange] = useState("Last 6 months");
  const [hoveredRevenuePoint, setHoveredRevenuePoint] = useState<(typeof revenueChartData)[0] | null>(null);
  const [hoveredLeadBar, setHoveredLeadBar] = useState<(typeof leadVolumeData)[0] | null>(null);
  const [reviewingAgent, setReviewingAgent] = useState<PendingAgentApproval | null>(null);
  const [selectedLead, setSelectedLead] = useState<HotLeadItem | null>(null);
  const [approvalsList, setApprovalsList] = useState(pendingAgentApprovals);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleApproveAgent = (id: string, name: string) => {
    setApprovalsList((prev) => prev.filter((a) => a.id !== id));
    setReviewingAgent(null);
    showToast(`✓ Agent application for ${name} has been approved.`);
  };

  const handleRejectAgent = (id: string, name: string) => {
    setApprovalsList((prev) => prev.filter((a) => a.id !== id));
    setReviewingAgent(null);
    showToast(`✕ Application for ${name} has been rejected.`);
  };

  const handleExportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Month,Revenue (Million IDR),Transactions\n" +
      revenueChartData
        .map((d) => `${d.month},${d.revenue},${d.transactions}`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `propertyai_superadmin_revenue_${timeRange.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("✓ Monthly overview CSV exported successfully.");
  };

  // SVG Spline Calculation for Revenue Chart
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;
  const maxRevenue = 800;

  const points = revenueChartData.map((d, i) => {
    const x = paddingX + (i / (revenueChartData.length - 1)) * chartW;
    const y = paddingY + chartH - (d.revenue / maxRevenue) * chartH;
    return { x, y, ...d };
  });

  // Generate smooth SVG curve path
  const curvePath = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cpX1 = prev.x + (point.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (point.x - prev.x) / 2;
    const cpY2 = point.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${point.x} ${point.y}`;
  }, "");

  const areaPath = `${curvePath} L ${points[points.length - 1].x} ${
    paddingY + chartH
  } L ${points[0].x} ${paddingY + chartH} Z`;

  // SVG Donut calculation for Property Status
  const totalPropertiesCount = propertyStatusData.reduce(
    (acc, curr) => acc + curr.count,
    0
  );
  const donutRadius = 45;
  const donutCircumference = 2 * Math.PI * donutRadius;
  let accumulatedStrokePercent = 0;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP 6 METRIC CARDS matching screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
        {superAdminMetrics.map((item) => {
          const Icon = metricIconMap[item.icon] || Home;

          let iconBg = "bg-blue-50 text-blue-600";
          if (item.color === "purple") iconBg = "bg-purple-50 text-purple-600";
          if (item.color === "amber") iconBg = "bg-amber-50 text-amber-600";
          if (item.color === "emerald") iconBg = "bg-emerald-50 text-emerald-600";

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              {/* Top row: Icon and trend badge */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={cn(
                    "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
                    iconBg
                  )}
                >
                  <Icon className="h-4.5 w-4.5 stroke-[2.2]" />
                </div>

                {item.change && (
                  <span className="text-xs font-semibold text-emerald-500 flex items-center">
                    ↑ {item.change}
                  </span>
                )}
              </div>

              {/* Middle & Bottom row: Big number and label */}
              <div>
                <span className="text-2xl sm:text-[26px] font-bold text-slate-900 leading-none tracking-tight block">
                  {item.value}
                </span>

                <div className="mt-1.5 flex items-center justify-between gap-1">
                  <span className="text-xs text-slate-400 font-medium truncate">
                    {item.title}
                  </span>
                  {item.subtext && (
                    <span className="text-[11px] text-slate-400 font-normal shrink-0">
                      {item.subtext}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. MIDDLE ROW: Revenue & Transactions (Left) + Property Status (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Revenue & Transactions Card (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Revenue & Transactions
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Monthly overview</p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none h-8 pl-3 pr-7 rounded-lg border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
                >
                  <option>Last 6 months</option>
                  <option>Last 3 months</option>
                  <option>Year to date</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              <button
                type="button"
                onClick={handleExportData}
                className="h-8 px-3 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 text-slate-500" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Spline Line Chart Area */}
          <div className="relative w-full pt-2">
            {/* Tooltip Hover display */}
            {hoveredRevenuePoint && (
              <div className="absolute top-0 right-4 z-10 bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-md animate-in fade-in duration-100">
                {hoveredRevenuePoint.month}: IDR {hoveredRevenuePoint.revenue}M (
                {hoveredRevenuePoint.transactions} deals)
              </div>
            )}

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-52 sm:h-56 overflow-visible"
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Y-Axis Grid Lines & Numbers */}
              {[800, 600, 400, 200, 0].map((val) => {
                const y = paddingY + chartH - (val / maxRevenue) * chartH;
                return (
                  <g key={val}>
                    <text
                      x={paddingX - 10}
                      y={y + 3}
                      textAnchor="end"
                      className="text-[10px] fill-slate-400 font-medium"
                    >
                      {val}
                    </text>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                      strokeDasharray={val === 0 ? "none" : "3 3"}
                    />
                  </g>
                );
              })}

              {/* Smooth Area fill */}
              <path d={areaPath} fill="url(#revenueGrad)" />

              {/* Smooth Line curve */}
              <path
                d={curvePath}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Interactive Dots on curve */}
              {points.map((pt) => {
                const isHovered = hoveredRevenuePoint?.month === pt.month;
                return (
                  <g
                    key={pt.month}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredRevenuePoint(pt)}
                    onMouseLeave={() => setHoveredRevenuePoint(null)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 5 : 3.5}
                      fill="#ffffff"
                      stroke="#2563eb"
                      strokeWidth={isHovered ? 3 : 2}
                      className="transition-all"
                    />
                    {/* Invisible larger hover target */}
                    <circle cx={pt.x} cy={pt.y} r={14} fill="transparent" />
                  </g>
                );
              })}

              {/* X-Axis Month labels */}
              {points.map((pt) => (
                <text
                  key={pt.month}
                  x={pt.x}
                  y={svgHeight - 4}
                  textAnchor="middle"
                  className="text-[11px] fill-slate-400 font-medium"
                >
                  {pt.month}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Right: Property Status Card (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Property Status
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">All listings</p>
          </div>

          <div className="flex flex-row items-center justify-around gap-4 my-auto py-4">
            {/* SVG Donut Chart matching screenshot */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                {propertyStatusData.map((item) => {
                  const strokePercent = item.count / totalPropertiesCount;
                  const strokeDasharray = `${
                    strokePercent * donutCircumference
                  } ${donutCircumference}`;
                  const strokeDashoffset = -(
                    accumulatedStrokePercent * donutCircumference
                  );
                  accumulatedStrokePercent += strokePercent;

                  return (
                    <circle
                      key={item.id}
                      cx="60"
                      cy="60"
                      r={donutRadius}
                      fill="transparent"
                      stroke={item.hex}
                      strokeWidth="14"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500 hover:opacity-85"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Legend List on Right matching screenshot */}
            <div className="space-y-2.5">
              {propertyStatusData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-6 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-slate-600 font-medium">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. THIRD ROW: Lead Volume (Left) + Hot Leads & Pending Approvals (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Lead Volume Card (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xs flex flex-col justify-between relative">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Lead Volume
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">New vs Closed</p>
            </div>

            <Link
              href="/dashboard/super-admin/leads"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <span>View CRM</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Grouped Bar Chart Area */}
          <div className="relative pt-4 pb-6">
            {/* Tooltip summary if hovered */}
            {hoveredLeadBar && (
              <div className="absolute top-0 right-2 z-10 bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-md animate-in fade-in duration-100">
                {hoveredLeadBar.month}: New {hoveredLeadBar.newLeads} | Closed{" "}
                {hoveredLeadBar.closedLeads}
              </div>
            )}

            {/* Y-Axis Grid Lines & Numbers */}
            <div className="relative h-44 w-full flex flex-col justify-between">
              {[80, 60, 40, 20, 0].map((num) => (
                <div key={num} className="flex items-center w-full gap-2.5">
                  <span className="text-[10px] font-medium text-slate-400 w-4 text-right shrink-0">
                    {num}
                  </span>
                  <div className="h-[1px] w-full bg-slate-100" />
                </div>
              ))}

              {/* Bar Columns Container positioned over grid lines */}
              <div className="absolute inset-x-0 bottom-0 top-0 left-7 flex items-end justify-around pr-2">
                {leadVolumeData.map((d) => {
                  const newHeight = (d.newLeads / 80) * 100;
                  const closedHeight = (d.closedLeads / 80) * 100;

                  return (
                    <div
                      key={d.month}
                      onMouseEnter={() => setHoveredLeadBar(d)}
                      onMouseLeave={() => setHoveredLeadBar(null)}
                      className="flex items-end gap-1 sm:gap-1.5 h-full group cursor-pointer"
                    >
                      {/* Bar 1: New Leads (Light blue translucent outline) */}
                      <div
                        style={{ height: `${newHeight}%` }}
                        className="w-4 sm:w-5 bg-blue-100/70 border border-blue-400/60 rounded-t-sm transition-all duration-300 group-hover:bg-blue-200/90"
                      />

                      {/* Bar 2: Closed Leads (Solid vibrant blue) */}
                      <div
                        style={{ height: `${closedHeight}%` }}
                        className="w-4 sm:w-5 bg-blue-600 rounded-t-sm transition-all duration-300 group-hover:bg-blue-700"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-Axis Months Labels */}
            <div className="flex items-center justify-around pl-7 pr-2 pt-2">
              {leadVolumeData.map((d) => (
                <span
                  key={d.month}
                  className="text-xs font-medium text-slate-500 w-10 text-center"
                >
                  {d.month}
                </span>
              ))}
            </div>
          </div>

          {/* Floating 'Back to Portal Select' Button matching screenshot */}
          <div className="flex justify-center mt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm hover:shadow hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Portal Select</span>
            </Link>
          </div>
        </div>

        {/* Right: Hot Leads & Pending Approvals stacked (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Top: Hot Leads Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  Hot Leads
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">2 active</p>
              </div>
              <Link
                href="/dashboard/super-admin/leads"
                className="text-xs font-semibold text-slate-400 hover:text-blue-600 flex items-center gap-0.5 transition-colors"
              >
                <span>All</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {hotLeadsData.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {lead.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-tight">
                        {lead.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {lead.property} — {lead.location}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-600 text-[11px] font-semibold">
                    {lead.channel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Pending Approvals Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  Pending Approvals
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {approvalsList.length} agents
                </p>
              </div>
              <Link
                href="/dashboard/super-admin/partners"
                className="text-xs font-semibold text-slate-400 hover:text-blue-600 flex items-center gap-0.5 transition-colors"
              >
                <span>All</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {approvalsList.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-400">
                  All pending approvals reviewed!
                </div>
              ) : (
                approvalsList.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {agent.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-tight">
                          {agent.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {agent.city} • {agent.experience}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setReviewingAgent(agent)}
                      className="shrink-0 h-7 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOURTH ROW: Recent Activity (Full Width) matching screenshot */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {superAdminActivities.map((act) => (
            <div key={act.id} className="flex items-start gap-3">
              {/* Blue bullet dot */}
              <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />

              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-slate-800 leading-snug">
                  <span className="font-bold text-slate-900">{act.actor}</span>{" "}
                  - {act.action} ·{" "}
                  <span className="text-slate-500">{act.target}</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {act.timestamp} · {act.module}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Review Agent Application */}
      {reviewingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setReviewingAgent(null)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center shrink-0">
                  {reviewingAgent.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {reviewingAgent.name}
                  </h3>
                  <p className="text-xs text-slate-400">Agent Application Review</p>
                </div>
              </div>
              <button
                onClick={() => setReviewingAgent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Operating Region:</strong> {reviewingAgent.city},{" "}
                  Indonesia
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Experience:</strong> {reviewingAgent.experience} in
                  luxury real estate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Email:</strong> {reviewingAgent.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Phone:</strong> {reviewingAgent.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Applied Date:</strong> {reviewingAgent.appliedDate}
                </span>
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200/50 rounded-xl text-emerald-800 text-[11px] leading-relaxed">
                <strong>License Check:</strong> AREBI Brokerage certification
                verified automatically via National Real Estate Registry API.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() =>
                  handleRejectAgent(reviewingAgent.id, reviewingAgent.name)
                }
                className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                Reject Application
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApproveAgent(reviewingAgent.id, reviewingAgent.name)
                }
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Approve & Issue Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Hot Lead Details */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedLead(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {selectedLead.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {selectedLead.name}
                  </h3>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold border border-blue-200/60">
                    {selectedLead.channel} Channel
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 mb-6">
              <p>
                <strong>Target Property:</strong> {selectedLead.property}
              </p>
              <p>
                <strong>Location:</strong> {selectedLead.location}
              </p>
              <p>
                <strong>Status:</strong> Qualified Inbound Buyer (High Intent)
              </p>
              <p>
                <strong>Assigned Agent:</strong> Budi Santoso
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Link
                href="/dashboard/super-admin/leads"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Open in CRM
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
