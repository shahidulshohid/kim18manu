export interface SuperAdminNavItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badge?: number;
  section?: "main" | "analytics" | "system";
}

export interface SuperAdminMetric {
  id: string;
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  subtext?: string;
  icon: string;
  color: "blue" | "purple" | "amber" | "emerald" | "sky" | "slate";
}

export interface RevenueMonthPoint {
  month: string;
  revenue: number; // in Millions IDR
  transactions: number;
}

export interface PropertyStatusItem {
  id: string;
  label: string;
  count: number;
  color: string;
  hex: string;
}

export interface LeadVolumeMonthPoint {
  month: string;
  newLeads: number;
  closedLeads: number;
}

export interface HotLeadItem {
  id: string;
  name: string;
  initials: string;
  property: string;
  location: string;
  channel: "Voice" | "Direct" | "WhatsApp" | "Web";
}

export interface PendingAgentApproval {
  id: string;
  name: string;
  initials: string;
  city: string;
  experience: string;
  phone?: string;
  email?: string;
  appliedDate?: string;
}

export interface SuperAdminActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  module: string;
}

export interface SuperAdminUser {
  id: string;
  name: string;
  initials: string;
  role: "customer" | "agent";
  email: string;
  status: "Active" | "Approved" | "Pending Review" | "Suspended";
  activity: string;
  joined: string;
  lastActive: string;
  phone?: string;
}

export interface SuperAdminProperty {
  id: string; // e.g. "L001"
  title: string;
  type: string; // "Villa", "Apartment", "House", "Ruko", "Warehouse"
  category: "Residential" | "Commercial" | "Industrial";
  listingType: "Sale" | "Rent";
  location: string;
  price: string;
  priceRaw: number;
  agent: string;
  status: "Active" | "Pending Review" | "Under Offer" | "Draft" | "Closed" | "Archived";
  date: string;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
}

export interface SuperAdminCrmLead {
  id: string;
  name: string;
  isHot?: boolean;
  property: string;
  channel: "Direct" | "WhatsApp" | "Voice" | "Web";
  agent: string;
  stage: "NEW" | "CONTACTED" | "QUALIFIED" | "SITE VISIT SCHEDULED" | "CLOSED" | "LOST";
  email?: string;
  phone?: string;
  budget?: string;
  createdDate?: string;
  notes?: string;
}

export interface SuperAdminPartnerApplicant {
  id: string;
  initials: string;
  name: string;
  email: string;
  applied: string;
  experience: string;
  area: string;
  docs: string;
  status: "Pending Review" | "Approved" | "Rejected" | "Suspended";
  phone?: string;
  agency?: string;
  licenseNumber?: string;
  files?: string[];
}

export interface SuperAdminTransaction {
  id: string;
  property: string;
  propertyFull?: string;
  customer: string;
  agent: string;
  amount: string;
  amountRaw?: number;
  method: "Bank Transfer" | "Credit Card" | "Virtual Account" | "Escrow";
  commission: string;
  date: string;
  status: "Completed" | "Active" | "Pending Payment" | "Cancelled";
  receiptUrl?: string;
  invoiceNumber?: string;
}






