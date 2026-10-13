import {
  AgentNavItem,
  MetricCardData,
  HotLeadItem,
  ActivityItem,
  QuickActionItem,
  PipelineStage,
} from "./types";

export const agentNavItems: AgentNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard/agent",
    iconName: "Home",
  },
  {
    id: "properties",
    label: "Property Management",
    href: "/dashboard/agent/properties",
    iconName: "Building2",
  },
  {
    id: "leads",
    label: "Lead & CRM",
    href: "/dashboard/agent/leads",
    iconName: "Users",
  },
  {
    id: "ai-system",
    label: "AI System",
    href: "/dashboard/agent/ai",
    iconName: "Sparkles",
    hasSubmenu: true,
  },
  {
    id: "partners",
    label: "Partner Ecosystem",
    href: "/dashboard/agent/partners",
    iconName: "Handshake",
    hasSubmenu: true,
  },
  {
    id: "site-visits",
    label: "Site Visits",
    href: "/dashboard/agent/site-visits",
    iconName: "Calendar",
  },
  {
    id: "transactions",
    label: "Transactions",
    href: "/dashboard/agent/transactions",
    iconName: "Shield",
  },
  {
    id: "notifications",
    label: "Notifications",
    href: "/dashboard/agent/notifications",
    iconName: "Bell",
    badge: 2,
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    href: "/dashboard/agent/reports",
    iconName: "BarChart3",
    hasSubmenu: true,
  },
  {
    id: "team",
    label: "Team & Users",
    href: "/dashboard/agent/team",
    iconName: "UserCog",
    hasSubmenu: true,
  },
];

export const agentMetrics: MetricCardData[] = [
  {
    id: "listings",
    title: "Total Listings",
    value: "62",
    change: "+ 4",
    subtext: "This month",
    icon: "Home",
    color: "blue",
  },
  {
    id: "leads",
    title: "Total Leads",
    value: "74",
    change: "+ 12",
    subtext: "This month",
    icon: "Users",
    color: "purple",
  },
  {
    id: "visits",
    title: "Site Visits",
    value: "23",
    change: "+ 3",
    subtext: "Upcoming",
    icon: "Calendar",
    color: "emerald",
  },
  {
    id: "revenue",
    title: "Revenue (Oct)",
    value: "IDR 290M",
    change: "+ 8%",
    subtext: "Month to date",
    icon: "Wallet",
    color: "amber",
  },
];

export const hotLeadsData: HotLeadItem[] = [
  {
    id: "lead-1",
    initials: "AF",
    name: "Ahmad Fauzi",
    source: "Voice Inbound",
    isHot: true,
    property: "Modern Villa",
    location: "Jimbaran",
    agent: "Budi Santoso",
    date: "2026-10-01 09:32",
  },
  {
    id: "lead-2",
    initials: "RW",
    name: "Rina Wulandari",
    source: "Direct",
    isHot: true,
    property: "Family House",
    location: "Dago",
    agent: "Rizki Pratama",
    date: "2026-09-30 11:05",
  },
];

export const recentActivitiesData: ActivityItem[] = [
  {
    id: "act-1",
    title: "New hot lead: Ahmad Fauzi via Voice Inbound",
    timestamp: "2 min ago",
    icon: "flag",
    color: "blue",
  },
  {
    id: "act-2",
    title: "Site visit confirmed — Modern Villa, Oct 5",
    timestamp: "18 min ago",
    icon: "calendar",
    color: "emerald",
  },
  {
    id: "act-3",
    title: 'Listing "Seminyak Shophouse" submitted for review',
    timestamp: "1 hr ago",
    icon: "home",
    color: "blue",
  },
  {
    id: "act-4",
    title: "Transaction TRX-001 completed — IDR 144M",
    timestamp: "2 hr ago",
    icon: "receipt",
    color: "emerald",
  },
  {
    id: "act-5",
    title: "New agent application: Hendra Wijaya",
    timestamp: "3 hr ago",
    icon: "user",
    color: "amber",
  },
  {
    id: "act-6",
    title: "AI Voice extracted 3 new leads from inbound calls",
    timestamp: "4 hr ago",
    icon: "sparkles",
    color: "purple",
  },
];

export const quickActionsData: QuickActionItem[] = [
  {
    id: "add-listing",
    label: "Add Listing",
    icon: "plus",
    color: "blue",
    action: "openAddListing",
  },
  {
    id: "all-leads",
    label: "View All Leads",
    icon: "users",
    color: "blue",
    action: "viewLeads",
  },
  {
    id: "schedule-visit",
    label: "Schedule Visit",
    icon: "calendar",
    color: "emerald",
    action: "scheduleVisit",
  },
  {
    id: "review-applications",
    label: "Review Applications",
    icon: "userCheck",
    color: "amber",
    action: "reviewApps",
  },
  {
    id: "view-reports",
    label: "View Reports",
    icon: "barChart",
    color: "purple",
    action: "viewReports",
  },
];

export const leadPipelineData: PipelineStage[] = [
  {
    label: "New",
    count: 12,
    color: "#2563eb",
    percentage: 60,
  },
  {
    label: "Contacted",
    count: 18,
    color: "#1e3a8a",
    percentage: 90,
  },
  {
    label: "Qualified",
    count: 9,
    color: "#d97706",
    percentage: 45,
  },
  {
    label: "Visit Sched.",
    count: 6,
    color: "#059669",
    percentage: 30,
  },
  {
    label: "Closed",
    count: 5,
    color: "#334155",
    percentage: 25,
  },
];
