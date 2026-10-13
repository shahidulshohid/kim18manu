"use client";

import React, { useState, useMemo } from "react";
import {
  Handshake,
  Building2,
  Landmark,
  Scale,
  ClipboardCheck,
  Paintbrush,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Search,
  Filter,
  Plus,
  Eye,
  Share2,
  Phone,
  Mail,
  Globe,
  Star,
  Check,
  X,
  ChevronRight,
  Coins,
  TrendingUp,
  Sparkles,
  RefreshCw,
  FileText,
  Send,
  SlidersHorizontal,
  LayoutGrid,
  List,
  AlertCircle,
  Activity,
  Zap,
  ExternalLink,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type PartnerCategory =
  | "Banking & Mortgage"
  | "Legal & Notary"
  | "Valuation & Inspection"
  | "Interior & Fit-Out"
  | "Insurance & Escrow";

export type PartnerTier = "Strategic" | "Platinum" | "Gold" | "Silver";

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  tier: PartnerTier;
  rating: number;
  reviewCount: number;
  dealsCompleted: number;
  activeReferrals: number;
  commissionRate: string;
  turnaroundTime: string;
  contactPerson: string;
  role: string;
  email: string;
  phone: string;
  website: string;
  status: "Active" | "Verified" | "Under Review";
  services: string[];
  logoBg: string;
  logoText: string;
  description: string;
}

export interface ReferralDeal {
  id: string;
  clientName: string;
  clientPhone: string;
  property: string;
  partnerId: string;
  partnerName: string;
  category: PartnerCategory;
  serviceType: string;
  dealValue: string;
  estCommission: string;
  date: string;
  status: "Submitted" | "In Review" | "Approved" | "Closed & Paid" | "Cancelled";
  slaStatus: "On Track" | "Needs Attention" | "Completed";
}

export interface WebhookIntegration {
  id: string;
  name: string;
  partner: string;
  category: string;
  status: "Connected" | "Syncing" | "Degraded";
  lastSync: string;
  latency: string;
  uptime: string;
  endpoint: string;
}

const initialPartners: Partner[] = [
  {
    id: "part-1",
    name: "Bank Central Asia (BCA)",
    category: "Banking & Mortgage",
    tier: "Strategic",
    rating: 4.9,
    reviewCount: 92,
    dealsCompleted: 154,
    activeReferrals: 18,
    commissionRate: "0.75% per loan disbursed",
    turnaroundTime: "24 - 48 Hours",
    contactPerson: "Rendy Kurniawan",
    role: "Senior Mortgage Partnership Manager",
    email: "kpr.partners@bca.co.id",
    phone: "+62 21 2358 8000",
    website: "https://bca.co.id/kpr",
    status: "Active",
    services: ["KPR Fixed 3-5 Years", "Refinancing Loan", "Commercial Property Loan", "Foreign National KPR"],
    logoBg: "bg-blue-600",
    logoText: "BCA",
    description: "Indonesia's largest private bank offering prioritized KPR appraisal, exclusive agent referral incentives, and real-time loan underwriting API.",
  },
  {
    id: "part-2",
    name: "Bank Mandiri — Smart KPR",
    category: "Banking & Mortgage",
    tier: "Strategic",
    rating: 4.8,
    reviewCount: 78,
    dealsCompleted: 132,
    activeReferrals: 14,
    commissionRate: "0.70% per loan disbursed",
    turnaroundTime: "24 - 72 Hours",
    contactPerson: "Dian Sastrowardoyo",
    role: "Mortgage Alliance Lead",
    email: "mandiri.kpr@bankmandiri.co.id",
    phone: "+62 21 526 5045",
    website: "https://bankmandiri.co.id",
    status: "Active",
    services: ["Mandiri KPR Milenial", "Green Property Mortgage", "Sharia Flexi KPR", "Express Approval"],
    logoBg: "bg-amber-600",
    logoText: "MDR",
    description: "State-owned premier lender with specialized high-ticket mortgage limits up to IDR 25 Billion and instant pre-qualification for PropertyAI users.",
  },
  {
    id: "part-3",
    name: "Notaris & PPAT Dewi Sartika, S.H.",
    category: "Legal & Notary",
    tier: "Platinum",
    rating: 5.0,
    reviewCount: 134,
    dealsCompleted: 248,
    activeReferrals: 22,
    commissionRate: "10% service fee split",
    turnaroundTime: "12 Hours Initial Review",
    contactPerson: "Dewi Sartika, S.H., M.Kn.",
    role: "Managing Notary Partner",
    email: "notaris.dewi@legalpro.id",
    phone: "+62 21 720 9182",
    website: "https://notarisdewisartika.id",
    status: "Active",
    services: ["AJB Signing & Escrow", "BPN Land Certificate Validation", "SKMHT / APHT Mortgage Deeds", "Corporate Title Transfer"],
    logoBg: "bg-indigo-600",
    logoText: "DS",
    description: "Licensed PPAT covering Greater Jakarta & Bandung. Digital title verification direct with national BPN office and insured escrow custody.",
  },
  {
    id: "part-4",
    name: "KJPP Rinaldi, Taufik & Rekan",
    category: "Valuation & Inspection",
    tier: "Gold",
    rating: 4.8,
    reviewCount: 64,
    dealsCompleted: 98,
    activeReferrals: 8,
    commissionRate: "IDR 750,000 / appraisal",
    turnaroundTime: "2 - 3 Days",
    contactPerson: "Ir. Rinaldi Basuki",
    role: "Principal Certified Appraiser (MAPPI)",
    email: "appraisal@kjpp-rtr.com",
    phone: "+62 21 8370 2490",
    website: "https://kjpp-rtr.com",
    status: "Active",
    services: ["Bank-Compliant Property Appraisal", "Structural Integrity Audit", "Market Fair Value Assessment", "Zoning Compliance Report"],
    logoBg: "bg-emerald-600",
    logoText: "KJPP",
    description: "MAPPI-certified appraisal firm trusted by major Indonesian banks for residential, commercial luxury villas, and industrial land appraisals.",
  },
  {
    id: "part-5",
    name: "Studio Arkana Interior & Fit-Out",
    category: "Interior & Fit-Out",
    tier: "Platinum",
    rating: 4.9,
    reviewCount: 41,
    dealsCompleted: 67,
    activeReferrals: 11,
    commissionRate: "5.0% turnkey contract value",
    turnaroundTime: "24 Hours 3D Concept",
    contactPerson: "Faye Simanjuntak",
    role: "Design & Project Director",
    email: "faye@arkana-design.id",
    phone: "+62 811 982 4432",
    website: "https://arkana-design.id",
    status: "Active",
    services: ["Turnkey Luxury Villa Staging", "Smart Home Automation", "Commercial Office Fit-Out", "Full Custom Furniture"],
    logoBg: "bg-purple-600",
    logoText: "SA",
    description: "Award-winning interior architecture studio specializing in staging properties for quick sale and high-yield short-term rental optimization.",
  },
  {
    id: "part-6",
    name: "CIMB Niaga — X-Tra KPR",
    category: "Banking & Mortgage",
    tier: "Gold",
    rating: 4.7,
    reviewCount: 49,
    dealsCompleted: 88,
    activeReferrals: 9,
    commissionRate: "0.65% per loan disbursed",
    turnaroundTime: "48 Hours",
    contactPerson: "Farhan Alkatiri",
    role: "Branch Priority Relationship Mgr",
    email: "cimb.kpr@cimbniaga.co.id",
    phone: "+62 21 250 5151",
    website: "https://cimbniaga.co.id",
    status: "Active",
    services: ["KPR Flexi Floating", "KPR Syariah Berkah", "Secondary Home Financing", "VIP Priority Lounge Access"],
    logoBg: "bg-red-600",
    logoText: "CIMB",
    description: "Modern banking partner offering flexible interest loan structures linked to savings balances and attractive promotional fixed rates.",
  },
  {
    id: "part-7",
    name: "Bali Legal Haven & Escrow",
    category: "Legal & Notary",
    tier: "Platinum",
    rating: 4.9,
    reviewCount: 88,
    dealsCompleted: 142,
    activeReferrals: 16,
    commissionRate: "12% legal fee split",
    turnaroundTime: "Same Day Verification",
    contactPerson: "I Wayan Sudarma, S.H.",
    role: "Senior Legal Counsel",
    email: "bali.legal@havenpartners.com",
    phone: "+62 361 738 901",
    website: "https://balilegalhaven.com",
    status: "Active",
    services: ["PT PMA Foreign Investment Structuring", "Hak Pakai & Leasehold Due Diligence", "Notarized Escrow Accounts", "Building Permit (PBG/SLF) Audit"],
    logoBg: "bg-teal-600",
    logoText: "BLH",
    description: "Bali's leading property legal consultancy for foreign and domestic investors, safeguarding leasehold rights and notarized transactions.",
  },
  {
    id: "part-8",
    name: "HomeInspect ID — Tech Inspections",
    category: "Valuation & Inspection",
    tier: "Gold",
    rating: 4.8,
    reviewCount: 53,
    dealsCompleted: 79,
    activeReferrals: 7,
    commissionRate: "15% booking commission",
    turnaroundTime: "24 Hours Delivery",
    contactPerson: "Bambang Pratama, S.T.",
    role: "Chief Inspection Engineer",
    email: "report@homeinspect.id",
    phone: "+62 812 3456 7890",
    website: "https://homeinspect.id",
    status: "Active",
    services: ["Thermal Infrared Leak Detection", "Drone Roof & Foundation Scan", "Electrical & Plumbing Safety Test", "Termite & Moisture Audit"],
    logoBg: "bg-cyan-600",
    logoText: "HI",
    description: "Tech-enabled building inspection service delivering interactive digital 3D inspection reports before buyer closing.",
  },
];

const initialReferrals: ReferralDeal[] = [
  {
    id: "REF-2026-081",
    clientName: "Hendra Wijaya",
    clientPhone: "+62 812 9011 2233",
    property: "Modern Villa — Jimbaran",
    partnerId: "part-1",
    partnerName: "Bank Central Asia (BCA)",
    category: "Banking & Mortgage",
    serviceType: "KPR Pre-Approval (IDR 3.5B)",
    dealValue: "IDR 4,500,000,000",
    estCommission: "IDR 26,250,000",
    date: "2026-10-11",
    status: "In Review",
    slaStatus: "On Track",
  },
  {
    id: "REF-2026-080",
    clientName: "Budi Santoso",
    clientPhone: "+62 813 4567 8901",
    property: "Family House — Dago",
    partnerId: "part-3",
    partnerName: "Notaris & PPAT Dewi Sartika, S.H.",
    category: "Legal & Notary",
    serviceType: "AJB Deed Transfer & BPN Check",
    dealValue: "IDR 1,440,000,000",
    estCommission: "IDR 7,200,000",
    date: "2026-10-09",
    status: "Approved",
    slaStatus: "Completed",
  },
  {
    id: "REF-2026-079",
    clientName: "Lina Kusuma",
    clientPhone: "+62 811 2233 4455",
    property: "SCBD Apartment 2BR",
    partnerId: "part-5",
    partnerName: "Studio Arkana Interior & Fit-Out",
    category: "Interior & Fit-Out",
    serviceType: "Luxury Furnishing Package",
    dealValue: "IDR 450,000,000",
    estCommission: "IDR 22,500,000",
    date: "2026-10-08",
    status: "Closed & Paid",
    slaStatus: "Completed",
  },
  {
    id: "REF-2026-078",
    clientName: "PT Logistik Jaya",
    clientPhone: "+62 21 8900 1200",
    property: "MM2100 Industrial Warehouse",
    partnerId: "part-4",
    partnerName: "KJPP Rinaldi, Taufik & Rekan",
    category: "Valuation & Inspection",
    serviceType: "Commercial Asset Valuation",
    dealValue: "IDR 7,200,000,000",
    estCommission: "IDR 1,500,000",
    date: "2026-10-05",
    status: "Closed & Paid",
    slaStatus: "Completed",
  },
  {
    id: "REF-2026-077",
    clientName: "David Robertson",
    clientPhone: "+62 821 7890 1234",
    property: "Sunset Cliff Villa — Uluwatu",
    partnerId: "part-7",
    partnerName: "Bali Legal Haven & Escrow",
    category: "Legal & Notary",
    serviceType: "PMA 30-Year Leasehold Due Diligence",
    dealValue: "IDR 9,800,000,000",
    estCommission: "IDR 29,400,000",
    date: "2026-10-03",
    status: "In Review",
    slaStatus: "On Track",
  },
  {
    id: "REF-2026-076",
    clientName: "Siti Rahma",
    clientPhone: "+62 815 6789 0123",
    property: "Cipete Green Residence",
    partnerId: "part-2",
    partnerName: "Bank Mandiri — Smart KPR",
    category: "Banking & Mortgage",
    serviceType: "Mandiri KPR Milenial (IDR 1.2B)",
    dealValue: "IDR 1,850,000,000",
    estCommission: "IDR 8,400,000",
    date: "2026-09-29",
    status: "Submitted",
    slaStatus: "Needs Attention",
  },
];

const initialIntegrations: WebhookIntegration[] = [
  {
    id: "int-1",
    name: "BCA KPR Instant Bridge API",
    partner: "Bank Central Asia (BCA)",
    category: "Mortgage Banking",
    status: "Connected",
    lastSync: "Just now (Auto)",
    latency: "142 ms",
    uptime: "99.98%",
    endpoint: "https://api.propertyai.id/v1/partners/bca/webhook",
  },
  {
    id: "int-2",
    name: "BPN National Land Registry Sync",
    partner: "Notaris & PPAT Dewi Sartika, S.H.",
    category: "Legal Escrow",
    status: "Connected",
    lastSync: "3 mins ago",
    latency: "285 ms",
    uptime: "99.94%",
    endpoint: "https://api.propertyai.id/v1/partners/bpn-notary/status",
  },
  {
    id: "int-3",
    name: "Mandiri Smart Underwriting Webhook",
    partner: "Bank Mandiri — Smart KPR",
    category: "Mortgage Banking",
    status: "Connected",
    lastSync: "12 mins ago",
    latency: "198 ms",
    uptime: "99.91%",
    endpoint: "https://api.propertyai.id/v1/partners/mandiri/kpr-events",
  },
  {
    id: "int-4",
    name: "KJPP Automated Valuation Exchange",
    partner: "KJPP Rinaldi, Taufik & Rekan",
    category: "Appraisal Data",
    status: "Syncing",
    lastSync: "45 mins ago",
    latency: "310 ms",
    uptime: "99.80%",
    endpoint: "https://api.propertyai.id/v1/partners/kjpp/appraisals",
  },
];

export default function PartnerEcosystemView() {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [referrals, setReferrals] = useState<ReferralDeal[]>(initialReferrals);
  const [integrations, setIntegrations] = useState<WebhookIntegration[]>(initialIntegrations);

  // Filter & Search states
  const [activeTab, setActiveTab] = useState<string>("All Partners");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Modal states
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);
  const [selectedPartnerDetails, setSelectedPartnerDetails] = useState<Partner | null>(null);

  // New Referral Form
  const [newReferral, setNewReferral] = useState({
    clientName: "",
    clientPhone: "",
    property: "Modern Villa — Jimbaran",
    partnerId: initialPartners[0].id,
    serviceType: "Mortgage Pre-Approval",
    dealValue: "",
    estCommission: "",
    notes: "",
  });

  // New Partner Form
  const [newPartner, setNewPartner] = useState({
    name: "",
    category: "Banking & Mortgage" as PartnerCategory,
    tier: "Gold" as PartnerTier,
    contactPerson: "",
    email: "",
    phone: "",
    commissionRate: "",
    turnaroundTime: "24 - 48 Hours",
    services: "",
    description: "",
  });

  // Filtered Partners
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      // Tab category filter
      if (activeTab === "Banking & Mortgage" && p.category !== "Banking & Mortgage") return false;
      if (activeTab === "Legal & Notary" && p.category !== "Legal & Notary") return false;
      if (activeTab === "Valuation & Inspection" && p.category !== "Valuation & Inspection") return false;
      if (activeTab === "Interior & Fit-Out" && p.category !== "Interior & Fit-Out") return false;

      // Tier filter
      if (selectedTier !== "all" && p.tier !== selectedTier) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesContact = p.contactPerson.toLowerCase().includes(query);
        const matchesServices = p.services.some((s) => s.toLowerCase().includes(query));
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesContact && !matchesServices && !matchesCat) return false;
      }

      return true;
    });
  }, [partners, activeTab, selectedTier, searchQuery]);

  // Handle Submit Referral
  const handleSubmitReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReferral.clientName.trim()) return;

    const partner = partners.find((p) => p.id === newReferral.partnerId) || partners[0];

    const createdReferral: ReferralDeal = {
      id: `REF-${Date.now().toString().slice(-4)}`,
      clientName: newReferral.clientName.trim(),
      clientPhone: newReferral.clientPhone.trim() || "+62 812 0000 1111",
      property: newReferral.property,
      partnerId: partner.id,
      partnerName: partner.name,
      category: partner.category,
      serviceType: newReferral.serviceType,
      dealValue: newReferral.dealValue.trim() || "IDR 2,500,000,000",
      estCommission: newReferral.estCommission.trim() || "IDR 15,000,000",
      date: new Date().toISOString().split("T")[0],
      status: "Submitted",
      slaStatus: "On Track",
    };

    setReferrals([createdReferral, ...referrals]);
    // increment partner's active referrals
    setPartners((prev) =>
      prev.map((p) => (p.id === partner.id ? { ...p, activeReferrals: p.activeReferrals + 1 } : p))
    );

    showToast(`Referral for ${createdReferral.clientName} sent to ${partner.name}!`);
    setIsReferModalOpen(false);
    setNewReferral({
      clientName: "",
      clientPhone: "",
      property: "Modern Villa — Jimbaran",
      partnerId: partners[0].id,
      serviceType: "Mortgage Pre-Approval",
      dealValue: "",
      estCommission: "",
      notes: "",
    });
  };

  // Handle Add Partner
  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.name.trim() || !newPartner.contactPerson.trim()) return;

    const initials = newPartner.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();

    const created: Partner = {
      id: `part-${Date.now()}`,
      name: newPartner.name.trim(),
      category: newPartner.category,
      tier: newPartner.tier,
      rating: 5.0,
      reviewCount: 1,
      dealsCompleted: 0,
      activeReferrals: 0,
      commissionRate: newPartner.commissionRate.trim() || "Referral Split Agreed",
      turnaroundTime: newPartner.turnaroundTime.trim() || "24 - 48 Hours",
      contactPerson: newPartner.contactPerson.trim(),
      role: "Partnership Representative",
      email: newPartner.email.trim() || "partner@propertyai.id",
      phone: newPartner.phone.trim() || "+62 21 0000 0000",
      website: "https://propertyai.id",
      status: "Verified",
      services: newPartner.services
        ? newPartner.services.split(",").map((s) => s.trim())
        : ["Real Estate Advisory", "Client Referral Support"],
      logoBg: "bg-blue-600",
      logoText: initials || "PT",
      description: newPartner.description.trim() || "Verified official partner in the PropertyAI ecosystem.",
    };

    setPartners([created, ...partners]);
    showToast(`Partner ${created.name} successfully onboarded!`);
    setIsAddPartnerModalOpen(false);
    setNewPartner({
      name: "",
      category: "Banking & Mortgage",
      tier: "Gold",
      contactPerson: "",
      email: "",
      phone: "",
      commissionRate: "",
      turnaroundTime: "24 - 48 Hours",
      services: "",
      description: "",
    });
  };

  // Helper badge renderers
  const getCategoryIcon = (category: PartnerCategory) => {
    switch (category) {
      case "Banking & Mortgage":
        return <Landmark className="h-3.5 w-3.5" />;
      case "Legal & Notary":
        return <Scale className="h-3.5 w-3.5" />;
      case "Valuation & Inspection":
        return <ClipboardCheck className="h-3.5 w-3.5" />;
      case "Interior & Fit-Out":
        return <Paintbrush className="h-3.5 w-3.5" />;
      default:
        return <Building2 className="h-3.5 w-3.5" />;
    }
  };

  const getTierBadge = (tier: PartnerTier) => {
    switch (tier) {
      case "Strategic":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
            Strategic
          </span>
        );
      case "Platinum":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <ShieldCheck className="h-3 w-3 text-indigo-500" />
            Platinum
          </span>
        );
      case "Gold":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            Gold
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
            {tier}
          </span>
        );
    }
  };

  const getReferralStatusBadge = (status: ReferralDeal["status"]) => {
    switch (status) {
      case "Closed & Paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            Closed & Paid
          </span>
        );
      case "Approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
            Approved
          </span>
        );
      case "In Review":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
            In Review
          </span>
        );
      case "Submitted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Submitted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-[32px] py-6 sm:py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Partner Ecosystem
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              38 Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Collaborate with banks, legal notaries, valuation firms, and fit-out partners to accelerate deals and earn verified referral commissions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsReferModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <Share2 className="h-4 w-4 text-blue-600" />
            Refer Client
          </button>
          <button
            type="button"
            onClick={() => setIsAddPartnerModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Partner
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Partner Network
            </span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Handshake className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {partners.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-semibold flex items-center">
                <ArrowUpRight className="h-3.5 w-3.5" /> +5
              </span>
              <span>onboarded this quarter</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Referrals
            </span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Coins className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {referrals.length} Deals
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-semibold flex items-center">
                <ArrowUpRight className="h-3.5 w-3.5" /> 84%
              </span>
              <span>conversion success rate</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Earned Commission
            </span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              IDR 385.4M
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-semibold flex items-center">
                <ArrowUpRight className="h-3.5 w-3.5" /> +22.8%
              </span>
              <span>YoY partner payouts</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Ecosystem SLA
            </span>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              98.4%
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="text-slate-700 font-semibold">Avg. 3.8h</span>
              <span>turnaround response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-100 overflow-x-auto custom-scrollbar pt-1">
        {[
          "All Partners",
          "Banking & Mortgage",
          "Legal & Notary",
          "Valuation & Inspection",
          "Interior & Fit-Out",
          "Client Referrals",
          "APIs & Webhooks",
        ].map((tab) => {
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
              {tab === "Client Referrals" && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-700 font-bold">
                  {referrals.length}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* SUB-VIEW 1: PARTNER DIRECTORY (Cards or Table) */}
      {activeTab !== "Client Referrals" && activeTab !== "APIs & Webhooks" && (
        <div className="space-y-4">
          {/* Controls: Search, Tier Filter, View Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs">
            <div className="flex flex-1 items-center gap-2 max-w-md">
              <div className="relative w-full">
                <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search partners by name, service, or contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200/80 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Tier Filter */}
              <div className="w-36">
                <Select value={selectedTier} onValueChange={(val) => setSelectedTier(val)}>
                  <SelectTrigger className="h-10 text-xs rounded-xl bg-slate-50 border-slate-200/80">
                    <SelectValue placeholder="All Tiers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="Strategic">Strategic Tier</SelectItem>
                    <SelectItem value="Platinum">Platinum Tier</SelectItem>
                    <SelectItem value="Gold">Gold Tier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Grid / Table Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                  title="Grid View"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    viewMode === "table"
                      ? "bg-white text-blue-600 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                  title="Table View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GRID VIEW */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-slate-200"
                >
                  <div className="p-5 space-y-4">
                    {/* Top Row: Logo, Name & Tier */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-xs text-sm shrink-0",
                            partner.logoBg
                          )}
                        >
                          {partner.logoText}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-600 transition-colors">
                            {partner.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
                            {getCategoryIcon(partner.category)}
                            <span>{partner.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0">{getTierBadge(partner.tier)}</div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Services Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {partner.services.slice(0, 3).map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-100"
                        >
                          {service}
                        </span>
                      ))}
                      {partner.services.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-lg text-[10px] font-medium bg-slate-50 text-slate-400">
                          +{partner.services.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats Metric Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-50 text-center bg-slate-50/50 rounded-xl px-2">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Rating</div>
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-0.5 mt-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {partner.rating}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Deals</div>
                        <div className="text-xs font-bold text-slate-800 mt-0.5">
                          {partner.dealsCompleted} closed
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Active Ref</div>
                        <div className="text-xs font-bold text-blue-600 mt-0.5">
                          {partner.activeReferrals} live
                        </div>
                      </div>
                    </div>

                    {/* Commission & SLA Terms */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400">Commission Share:</span>
                        <span className="font-semibold text-emerald-600">{partner.commissionRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-slate-400">Avg. Turnaround:</span>
                        <span className="font-medium text-slate-700">{partner.turnaroundTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPartnerDetails(partner)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5 text-slate-400" />
                      View Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewReferral((prev) => ({
                          ...prev,
                          partnerId: partner.id,
                        }));
                        setIsReferModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs shadow-blue-500/20 cursor-pointer"
                    >
                      <Share2 className="h-3 w-3" />
                      Refer Client
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[840px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-white">
                      <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        PARTNER COMPANY
                      </th>
                      <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        CATEGORY
                      </th>
                      <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        TIER
                      </th>
                      <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        COMMISSION / SPLIT
                      </th>
                      <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        PERFORMANCE
                      </th>
                      <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        PRIMARY CONTACT
                      </th>
                      <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase text-right">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredPartners.map((partner) => (
                      <tr key={partner.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-9 w-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0",
                                partner.logoBg
                              )}
                            >
                              {partner.logoText}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">{partner.name}</div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> SLA: {partner.turnaroundTime}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            {getCategoryIcon(partner.category)}
                            {partner.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">{getTierBadge(partner.tier)}</td>
                        <td className="py-4 px-6 font-semibold text-emerald-600">
                          {partner.commissionRate}
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <div className="font-medium text-slate-800 flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {partner.rating} ({partner.reviewCount})
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {partner.dealsCompleted} closed • {partner.activeReferrals} active
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-slate-800 font-medium">{partner.contactPerson}</div>
                          <div className="text-[11px] text-slate-400">{partner.email}</div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedPartnerDetails(partner)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="View Partner Profile"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setNewReferral((prev) => ({
                                  ...prev,
                                  partnerId: partner.id,
                                }));
                                setIsReferModalOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Refer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-VIEW 2: CLIENT REFERRALS TAB */}
      {activeTab === "Client Referrals" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Live Client Referrals</h2>
              <p className="text-xs text-slate-500">
                Track status, loan underwriting progress, and commission payouts for client introductions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsReferModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" />
              New Referral
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[880px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      REF ID / DATE
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      CLIENT
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      PROPERTY INVOLVED
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      PARTNER ASSIGNED
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      SERVICE / VALUE
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      COMMISSION DUE
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      STATUS
                    </th>
                    <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase text-right">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {referrals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-mono text-xs font-bold text-slate-900">{deal.id}</div>
                        <div className="text-[11px] text-slate-400">{deal.date}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{deal.clientName}</div>
                        <div className="text-[11px] text-slate-400">{deal.clientPhone}</div>
                      </td>
                      <td className="py-4 px-6 text-slate-700 font-medium">{deal.property}</td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-blue-600">{deal.partnerName}</div>
                        <div className="text-[11px] text-slate-400">{deal.category}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800">{deal.serviceType}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{deal.dealValue}</div>
                      </td>
                      <td className="py-4 px-6 font-bold text-emerald-600">{deal.estCommission}</td>
                      <td className="py-4 px-6">{getReferralStatusBadge(deal.status)}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => showToast(`Sync reminder sent to ${deal.partnerName}!`)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Ping Partner
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: APIS & WEBHOOKS TAB */}
      {activeTab === "APIs & Webhooks" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Partner System Integrations</h2>
              <p className="text-xs text-slate-500">
                Live REST API endpoints and webhooks synchronizing mortgage underwriting, title deeds, and inspections.
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast("All partner webhook endpoints verified healthy (100%)")}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5 text-blue-600" />
              Check Health
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((int) => (
              <div
                key={int.id}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="font-bold text-slate-900 text-sm">{int.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{int.partner}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {int.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2.5 bg-slate-50 rounded-xl px-3 text-center text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Latency</div>
                    <div className="font-bold text-slate-800">{int.latency}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Uptime</div>
                    <div className="font-bold text-emerald-600">{int.uptime}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Sync Status</div>
                    <div className="font-bold text-slate-700">{int.lastSync}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Webhook Endpoint
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-xs font-mono text-slate-700 border border-slate-200/60 overflow-x-auto">
                    <span className="truncate flex-1">{int.endpoint}</span>
                    <button
                      type="button"
                      onClick={() => showToast("Endpoint URL copied to clipboard!")}
                      className="text-[11px] text-blue-600 font-bold hover:underline shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => showToast(`Ping packet sent to ${int.name}: HTTP 200 OK (${int.latency})`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Test Ping
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: REFER CLIENT TO PARTNER */}
      {isReferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <form
            onSubmit={handleSubmitReferral}
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Refer Client to Partner</h3>
                <p className="text-xs text-slate-400">
                  Introduce a buyer/seller lead to our banking, legal, or staging partners.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReferModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Client Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                CLIENT NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Hendra Wijaya"
                value={newReferral.clientName}
                onChange={(e) => setNewReferral({ ...newReferral, clientName: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Client Phone */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                PHONE / WHATSAPP NUMBER
              </label>
              <input
                type="text"
                placeholder="+62 812 xxxx xxxx"
                value={newReferral.clientPhone}
                onChange={(e) => setNewReferral({ ...newReferral, clientPhone: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Partner Selection (Shadcn Select) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                SELECT ECOSYSTEM PARTNER <span className="text-red-500">*</span>
              </label>
              <Select
                value={newReferral.partnerId}
                onValueChange={(val) => setNewReferral({ ...newReferral, partnerId: val })}
              >
                <SelectTrigger className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-normal">
                  <SelectValue placeholder="Choose Partner" />
                </SelectTrigger>
                <SelectContent className="z-[70]">
                  {partners.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} — {p.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                SERVICE REQUIRED
              </label>
              <Select
                value={newReferral.serviceType}
                onValueChange={(val) => setNewReferral({ ...newReferral, serviceType: val })}
              >
                <SelectTrigger className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-normal">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent className="z-[70]">
                  <SelectItem value="Mortgage Pre-Approval">Mortgage Pre-Approval (KPR)</SelectItem>
                  <SelectItem value="AJB & Title Deed Transfer">AJB & Title Deed Transfer (PPAT)</SelectItem>
                  <SelectItem value="Building Safety & Defect Audit">Building Safety & Defect Audit</SelectItem>
                  <SelectItem value="Villa Staging & Furnishing">Villa Staging & Turnkey Furnishing</SelectItem>
                  <SelectItem value="Certified Property Appraisal">Certified Property Appraisal (KJPP)</SelectItem>
                  <SelectItem value="PMA Leasehold Due Diligence">PMA Foreign Leasehold Due Diligence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Deal Value & Projected Commission */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                  EST. PROPERTY VALUE
                </label>
                <input
                  type="text"
                  placeholder="IDR 3.5B"
                  value={newReferral.dealValue}
                  onChange={(e) => setNewReferral({ ...newReferral, dealValue: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                  PROJECTED COMMISSION
                </label>
                <input
                  type="text"
                  placeholder="IDR 26.25M"
                  value={newReferral.estCommission}
                  onChange={(e) => setNewReferral({ ...newReferral, estCommission: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsReferModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="h-4 w-4" />
                Submit Referral
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: ADD PARTNER */}
      {isAddPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <form
            onSubmit={handleAddPartner}
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Onboard New Partner</h3>
                <p className="text-xs text-slate-400">
                  Register a company to join the PropertyAI ecosystem directory.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPartnerModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                COMPANY / ENTITY NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bank BNI or Kantor Notaris..."
                value={newPartner.name}
                onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Category & Tier (Shadcn Select) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                  CATEGORY <span className="text-red-500">*</span>
                </label>
                <Select
                  value={newPartner.category}
                  onValueChange={(val) =>
                    setNewPartner({ ...newPartner, category: val as PartnerCategory })
                  }
                >
                  <SelectTrigger className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-normal">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="z-[70]">
                    <SelectItem value="Banking & Mortgage">Banking & Mortgage</SelectItem>
                    <SelectItem value="Legal & Notary">Legal & Notary</SelectItem>
                    <SelectItem value="Valuation & Inspection">Valuation & Inspection</SelectItem>
                    <SelectItem value="Interior & Fit-Out">Interior & Fit-Out</SelectItem>
                    <SelectItem value="Insurance & Escrow">Insurance & Escrow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                  PARTNER TIER
                </label>
                <Select
                  value={newPartner.tier}
                  onValueChange={(val) =>
                    setNewPartner({ ...newPartner, tier: val as PartnerTier })
                  }
                >
                  <SelectTrigger className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-normal">
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent className="z-[70]">
                    <SelectItem value="Strategic">Strategic Tier</SelectItem>
                    <SelectItem value="Platinum">Platinum Tier</SelectItem>
                    <SelectItem value="Gold">Gold Tier</SelectItem>
                    <SelectItem value="Silver">Silver Tier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Person */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                PRIMARY CONTACT PERSON <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Budi Gunawan (Partnership Head)"
                value={newPartner.contactPerson}
                onChange={(e) => setNewPartner({ ...newPartner, contactPerson: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="partner@domain.com"
                  value={newPartner.email}
                  onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                  PHONE
                </label>
                <input
                  type="text"
                  placeholder="+62 21 xxx xxxx"
                  value={newPartner.phone}
                  onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Commission Rate & SLA */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                  COMMISSION SPLIT
                </label>
                <input
                  type="text"
                  placeholder="e.g. 0.75% per loan"
                  value={newPartner.commissionRate}
                  onChange={(e) => setNewPartner({ ...newPartner, commissionRate: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                  SLA RESPONSE
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24 - 48 Hours"
                  value={newPartner.turnaroundTime}
                  onChange={(e) => setNewPartner({ ...newPartner, turnaroundTime: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Services Offered */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-700 uppercase block">
                KEY SERVICES (COMMA SEPARATED)
              </label>
              <input
                type="text"
                placeholder="e.g. Fixed Rate KPR, Fast Notary AJB, 3D Staging"
                value={newPartner.services}
                onChange={(e) => setNewPartner({ ...newPartner, services: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Footer Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddPartnerModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-all text-center cursor-pointer"
              >
                Onboard Partner
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: VIEW PARTNER PROFILE DETAILS */}
      {selectedPartnerDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-xs shrink-0",
                    selectedPartnerDetails.logoBg
                  )}
                >
                  {selectedPartnerDetails.logoText}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    {selectedPartnerDetails.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {getTierBadge(selectedPartnerDetails.tier)}
                    <span className="text-xs text-slate-500">
                      {selectedPartnerDetails.category}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPartnerDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedPartnerDetails.description}
            </p>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-xl px-3 text-center">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Rating</div>
                <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {selectedPartnerDetails.rating} ({selectedPartnerDetails.reviewCount})
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Closed Deals</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedPartnerDetails.dealsCompleted}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Active Pipelines</div>
                <div className="text-sm font-bold text-blue-600 mt-0.5">
                  {selectedPartnerDetails.activeReferrals} live
                </div>
              </div>
            </div>

            {/* Partner Details List */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Commission Share:</span>
                <span className="font-bold text-emerald-600">
                  {selectedPartnerDetails.commissionRate}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Turnaround SLA:</span>
                <span className="font-semibold text-slate-800">
                  {selectedPartnerDetails.turnaroundTime}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Key Contact:</span>
                <span className="font-semibold text-slate-800">
                  {selectedPartnerDetails.contactPerson} ({selectedPartnerDetails.role})
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Email:</span>
                <span className="font-mono text-slate-700">
                  {selectedPartnerDetails.email}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">Direct Line:</span>
                <span className="font-mono text-slate-700">
                  {selectedPartnerDetails.phone}
                </span>
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">
                Offered Services & Scope
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPartnerDetails.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    ✓ {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedPartnerDetails(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewReferral((prev) => ({
                    ...prev,
                    partnerId: selectedPartnerDetails.id,
                  }));
                  setSelectedPartnerDetails(null);
                  setIsReferModalOpen(true);
                }}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/20"
              >
                <Share2 className="h-3.5 w-3.5" />
                Refer Client to {selectedPartnerDetails.logoText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
