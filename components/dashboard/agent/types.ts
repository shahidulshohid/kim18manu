import React from "react";

export interface AgentNavItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badge?: number | string;
  hasSubmenu?: boolean;
}

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  subtext: string;
  icon: string;
  color: "blue" | "purple" | "emerald" | "amber";
}

export interface HotLeadItem {
  id: string;
  initials: string;
  name: string;
  source: string;
  isHot: boolean;
  property: string;
  location: string;
  agent: string;
  date: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  icon: "flag" | "calendar" | "home" | "receipt" | "user" | "sparkles";
  color: "blue" | "emerald" | "purple" | "amber";
}

export interface QuickActionItem {
  id: string;
  label: string;
  icon: "plus" | "users" | "calendar" | "userCheck" | "barChart";
  color: "blue" | "emerald" | "amber" | "purple";
  action: string;
}

export interface PipelineStage {
  label: string;
  count: number;
  color: string;
  percentage: number;
}
