"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Download,
  Search,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Check,
  CheckCircle2,
  X,
  Building2,
  Home,
  Store,
  Warehouse,
  MapPin,
  Calendar,
  User,
  DollarSign,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { superAdminPropertiesList } from "./data";
import { SuperAdminProperty } from "./types";

const fallbackProperties: SuperAdminProperty[] = [
  {
    id: "L001",
    title: "Modern Villa — Jimbaran",
    type: "Villa",
    category: "Residential",
    listingType: "Sale",
    location: "Jimbaran, Bali",
    price: "IDR 4.5B",
    priceRaw: 4500000000,
    agent: "Budi Santoso",
    status: "Active",
    date: "2026-09-28",
    bedrooms: 4,
    bathrooms: 4,
    area: "420 m²",
  },
  {
    id: "L002",
    title: "SCBD Apartment 2BR",
    type: "Apartment",
    category: "Residential",
    listingType: "Sale",
    location: "SCBD, Jakarta",
    price: "IDR 850M",
    priceRaw: 850000000,
    agent: "Sari Dewi",
    status: "Active",
    date: "2026-09-25",
    bedrooms: 2,
    bathrooms: 2,
    area: "88 m²",
  },
  {
    id: "L003",
    title: "Family House — Dago",
    type: "House",
    category: "Residential",
    listingType: "Rent",
    location: "Dago, Bandung",
    price: "IDR 12M/mo",
    priceRaw: 12000000,
    agent: "Rizki Pratama",
    status: "Under Offer",
    date: "2026-09-20",
    bedrooms: 3,
    bathrooms: 2,
    area: "165 m²",
  },
  {
    id: "L004",
    title: "Seminyak Shophouse",
    type: "Ruko",
    category: "Commercial",
    listingType: "Rent",
    location: "Seminyak, Bali",
    price: "IDR 25M/mo",
    priceRaw: 25000000,
    agent: "Budi Santoso",
    status: "Pending Review",
    date: "2026-09-18",
    bedrooms: 0,
    bathrooms: 2,
    area: "210 m²",
  },
  {
    id: "L005",
    title: "BSD Studio Apartment",
    type: "Apartment",
    category: "Residential",
    listingType: "Rent",
    location: "BSD, Tangerang",
    price: "IDR 4.5M/mo",
    priceRaw: 4500000,
    agent: "Sari Dewi",
    status: "Draft",
    date: "2026-09-15",
    bedrooms: 1,
    bathrooms: 1,
    area: "36 m²",
  },
  {
    id: "L006",
    title: "MM2100 Warehouse",
    type: "Warehouse",
    category: "Industrial",
    listingType: "Sale",
    location: "Cikarang, Bekasi",
    price: "IDR 7.2B",
    priceRaw: 7200000000,
    agent: "Rizki Pratama",
    status: "Closed",
    date: "2026-09-10",
    bedrooms: 0,
    bathrooms: 3,
    area: "1,850 m²",
  },
];

type FilterTab = "all" | "pending" | "active" | "under_offer" | "closed" | "archived";

export default function SuperAdminPropertiesView() {
  const [properties, setProperties] = useState<SuperAdminProperty[]>(() =>
    Array.isArray(superAdminPropertiesList) && superAdminPropertiesList.length > 0
      ? superAdminPropertiesList
      : fallbackProperties
  );

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [sortOption, setSortOption] = useState("Sort: Newest");
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [viewingProperty, setViewingProperty] = useState<SuperAdminProperty | null>(null);
  const [editingProperty, setEditingProperty] = useState<SuperAdminProperty | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<SuperAdminProperty | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New property form state
  const [newProp, setNewProp] = useState<Partial<SuperAdminProperty>>({
    title: "",
    type: "Villa",
    category: "Residential",
    listingType: "Sale",
    location: "",
    price: "",
    agent: "Budi Santoso",
    status: "Active",
    bedrooms: 3,
    bathrooms: 2,
    area: "150 m²",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Safe array
  const safeProps = Array.isArray(properties) ? properties : fallbackProperties;

  // Counts for tabs
  const countAll = safeProps.length;
  const countPending = safeProps.filter((p) => p.status === "Pending Review").length;
  const countActive = safeProps.filter((p) => p.status === "Active").length;
  const countUnderOffer = safeProps.filter((p) => p.status === "Under Offer").length;
  const countClosed = safeProps.filter((p) => p.status === "Closed").length;
  const countArchived = safeProps.filter((p) => p.status === "Archived").length;

  // Filter & sort
  const filteredProperties = useMemo(() => {
    return safeProps
      .filter((item) => {
        // Tab filtering
        if (activeTab === "pending" && item.status !== "Pending Review") return false;
        if (activeTab === "active" && item.status !== "Active") return false;
        if (activeTab === "under_offer" && item.status !== "Under Offer") return false;
        if (activeTab === "closed" && item.status !== "Closed") return false;
        if (activeTab === "archived" && item.status !== "Archived") return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchId = item.id.toLowerCase().includes(q);
          const matchLocation = item.location.toLowerCase().includes(q);
          const matchAgent = item.agent.toLowerCase().includes(q);
          if (!matchTitle && !matchId && !matchLocation && !matchAgent) return false;
        }

        // Class dropdown
        if (classFilter !== "All Classes" && item.category !== classFilter) return false;

        // Type dropdown
        if (typeFilter !== "All Types" && item.type !== typeFilter) return false;

        // Agent dropdown
        if (agentFilter !== "All Agents" && item.agent !== agentFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOption === "Sort: Newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortOption === "Sort: Oldest") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortOption === "Sort: Price High-Low") {
          return b.priceRaw - a.priceRaw;
        }
        if (sortOption === "Sort: Price Low-High") {
          return a.priceRaw - b.priceRaw;
        }
        return 0;
      });
  }, [safeProps, activeTab, searchQuery, classFilter, typeFilter, agentFilter, sortOption]);

  // Checkbox handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPropertyIds(filteredProperties.map((p) => p.id));
    } else {
      setSelectedPropertyIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    filteredProperties.length > 0 &&
    filteredProperties.every((p) => selectedPropertyIds.includes(p.id));

  // Quick Approve for Pending Review
  const handleApproveProperty = (id: string, title: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Active" } : p))
    );
    showToast(`✓ Listing "${title}" approved and published as Active.`);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Title,Type,Category,ListingType,Location,Price,Agent,Status,Date\n" +
      filteredProperties
        .map(
          (p) =>
            `${p.id},"${p.title}",${p.type},${p.category},${p.listingType},"${p.location}","${p.price}","${p.agent}",${p.status},${p.date}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `propertyai_properties_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`✓ Exported ${filteredProperties.length} listings to CSV.`);
  };

  // Add Listing submit
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.title || !newProp.price || !newProp.location) return;

    const nextId = `L00${safeProps.length + 1}`;
    const newPropertyItem: SuperAdminProperty = {
      id: nextId,
      title: newProp.title,
      type: newProp.type || "Apartment",
      category: newProp.category || "Residential",
      listingType: (newProp.listingType as "Sale" | "Rent") || "Sale",
      location: newProp.location,
      price: newProp.price,
      priceRaw: 1000000000,
      agent: newProp.agent || "Budi Santoso",
      status: (newProp.status as SuperAdminProperty["status"]) || "Active",
      date: new Date().toISOString().slice(0, 10),
      bedrooms: Number(newProp.bedrooms) || 2,
      bathrooms: Number(newProp.bathrooms) || 2,
      area: newProp.area || "120 m²",
    };

    setProperties((prev) => [newPropertyItem, ...prev]);
    setShowAddModal(false);
    showToast(`✓ Created new property "${newPropertyItem.title}" (${nextId}).`);
    setNewProp({
      title: "",
      type: "Villa",
      category: "Residential",
      listingType: "Sale",
      location: "",
      price: "",
      agent: "Budi Santoso",
      status: "Active",
      bedrooms: 3,
      bathrooms: 2,
      area: "150 m²",
    });
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;
    setProperties((prev) =>
      prev.map((p) => (p.id === editingProperty.id ? editingProperty : p))
    );
    showToast(`✓ Listing "${editingProperty.title}" updated.`);
    setEditingProperty(null);
  };

  // Delete
  const handleConfirmDelete = () => {
    if (!deletingProperty) return;
    setProperties((prev) => prev.filter((p) => p.id !== deletingProperty.id));
    setSelectedPropertyIds((prev) => prev.filter((id) => id !== deletingProperty.id));
    showToast(`✕ Removed listing ${deletingProperty.id}.`);
    setDeletingProperty(null);
  };

  // Helper for thumbnail icon
  const getPropertyIcon = (type: string) => {
    if (type === "Villa") return Home;
    if (type === "Apartment") return Building2;
    if (type === "House") return Home;
    if (type === "Ruko") return Store;
    if (type === "Warehouse") return Warehouse;
    return Building2;
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            Property Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            Manage all listings across the platform
          </p>
        </div>

        {/* Right: + Add Listing Button matching screenshot */}
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Listing</span>
        </button>
      </div>

      {/* 2. Filter Tabs Row matching screenshot */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-100 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "all"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          All Listings ({countAll})
          {activeTab === "all" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("pending")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "pending"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Pending Review ({countPending})
          {activeTab === "pending" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("active")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "active"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Active ({countActive})
          {activeTab === "active" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("under_offer")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "under_offer"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Under Offer ({countUnderOffer})
          {activeTab === "under_offer" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("closed")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "closed"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Closed ({countClosed})
          {activeTab === "closed" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("archived")}
          className={cn(
            "pb-3 text-xs sm:text-sm font-semibold transition-all relative shrink-0 cursor-pointer",
            activeTab === "archived"
              ? "text-blue-600 font-bold"
              : "text-slate-400 hover:text-slate-700 font-medium"
          )}
        >
          Archived ({countArchived})
          {activeTab === "archived" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* 3. Table Card Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        {/* Top Controls Toolbar matching screenshot */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-1">
            {/* Search input with search icon */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-2xs"
              />
            </div>

            {/* Dropdown 1: All Classes */}
            <div className="relative">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <option>All Classes</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 2: All Types */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <option>All Types</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Ruko</option>
                <option>Warehouse</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 3: All Agents */}
            <div className="relative">
              <select
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
                className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <option>All Agents</option>
                <option>Budi Santoso</option>
                <option>Sari Dewi</option>
                <option>Rizki Pratama</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 4: Sort: Newest */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                <option>Sort: Newest</option>
                <option>Sort: Oldest</option>
                <option>Sort: Price High-Low</option>
                <option>Sort: Price Low-High</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Right: Export Button matching screenshot */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer self-start xl:self-auto"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export</span>
          </button>
        </div>

        {/* 4. Table matching screenshot columns and styling */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">PROPERTY</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">LISTING</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">PRICE</th>
                <th className="py-3 px-4">AGENT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    No listings match the current filters.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((prop) => {
                  const isChecked = selectedPropertyIds.includes(prop.id);
                  const Icon = getPropertyIcon(prop.type);

                  // Status badge styling matching screenshot
                  let statusBadge = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
                  if (prop.status === "Pending Review") {
                    statusBadge = "bg-amber-50 text-amber-700 border-amber-200/60";
                  } else if (prop.status === "Under Offer") {
                    statusBadge = "bg-sky-50 text-sky-600 border-sky-200/60";
                  } else if (prop.status === "Draft" || prop.status === "Closed" || prop.status === "Archived") {
                    statusBadge = "bg-slate-100 text-slate-600 border-slate-200/50";
                  }

                  // Listing pill styling matching screenshot
                  const isSale = prop.listingType === "Sale";
                  const listingPill = isSale
                    ? "bg-blue-50 text-blue-600 border-blue-200/60"
                    : "bg-indigo-50 text-indigo-600 border-indigo-200/60";

                  return (
                    <tr
                      key={prop.id}
                      className={cn(
                        "hover:bg-slate-50/80 transition-colors group",
                        isChecked ? "bg-blue-50/30" : ""
                      )}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRow(prop.id)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* PROPERTY: Thumbnail + Title + ID */}
                      <td className="py-3.5 px-4 font-medium text-slate-900 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center shrink-0 shadow-2xs text-slate-600 group-hover:scale-105 transition-transform">
                            <Icon className="h-4.5 w-4.5 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm block truncate">
                              {prop.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              {prop.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* TYPE: Type + Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-800 text-xs sm:text-sm mr-1.5">
                          {prop.type}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {prop.category}
                        </span>
                      </td>

                      {/* LISTING: Sale or Rent pill */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border inline-block",
                            listingPill
                          )}
                        >
                          {prop.listingType}
                        </span>
                      </td>

                      {/* LOCATION */}
                      <td className="py-3.5 px-4 text-slate-600 text-xs whitespace-nowrap">
                        {prop.location}
                      </td>

                      {/* PRICE in bold */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-xs sm:text-sm whitespace-nowrap">
                        {prop.price}
                      </td>

                      {/* AGENT */}
                      <td className="py-3.5 px-4 text-slate-600 text-xs whitespace-nowrap">
                        {prop.agent}
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border inline-block",
                            statusBadge
                          )}
                        >
                          {prop.status}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                        {prop.date}
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setViewingProperty(prop)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="View Property"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingProperty(prop)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit Listing"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          {/* Quick Approve checkmark for Pending Review matching screenshot */}
                          {prop.status === "Pending Review" && (
                            <button
                              type="button"
                              onClick={() => handleApproveProperty(prop.id, prop.title)}
                              className="p-1.5 rounded-lg text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                              title="Approve Listing"
                            >
                              <Check className="h-4 w-4 stroke-[2.5]" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setDeletingProperty(prop)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Delete Listing"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination matching screenshot */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-medium">
            Showing {filteredProperties.length} of {safeProps.length}
          </span>

          <div className="flex items-center gap-1.5 self-end sm:self-auto select-none">
            <button
              type="button"
              className="px-2 py-1 text-slate-400 hover:text-slate-700 font-medium cursor-pointer"
            >
              Prev
            </button>
            <button
              type="button"
              className="h-7 w-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center shadow-xs"
            >
              1
            </button>
            <button
              type="button"
              className="h-7 w-7 rounded-lg text-slate-500 hover:bg-slate-100 font-medium flex items-center justify-center cursor-pointer transition-colors"
            >
              2
            </button>
            <button
              type="button"
              className="px-2 py-1 text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal 1: Add New Listing */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setShowAddModal(false)}
          />
          <form
            onSubmit={handleCreateListing}
            className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Add New Listing
                </h3>
                <p className="text-xs text-slate-400">Publish a direct platform property</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs mb-6">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Canggu Modern Villa 4BR"
                  value={newProp.title}
                  onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Property Type
                  </label>
                  <select
                    value={newProp.type}
                    onChange={(e) => setNewProp({ ...newProp, type: e.target.value })}
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Ruko">Ruko</option>
                    <option value="Warehouse">Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Listing Type
                  </label>
                  <select
                    value={newProp.listingType}
                    onChange={(e) =>
                      setNewProp({ ...newProp, listingType: e.target.value as "Sale" | "Rent" })
                    }
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    <option value="Sale">Sale</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Price Tag *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IDR 3.8B or IDR 15M/mo"
                    value={newProp.price}
                    onChange={(e) => setNewProp({ ...newProp, price: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Uluwatu, Bali"
                    value={newProp.location}
                    onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Assigned Agent
                  </label>
                  <select
                    value={newProp.agent}
                    onChange={(e) => setNewProp({ ...newProp, agent: e.target.value })}
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    <option value="Budi Santoso">Budi Santoso</option>
                    <option value="Sari Dewi">Sari Dewi</option>
                    <option value="Rizki Pratama">Rizki Pratama</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newProp.status}
                    onChange={(e) =>
                      setNewProp({
                        ...newProp,
                        status: e.target.value as SuperAdminProperty["status"],
                      })
                    }
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Create Listing
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal 2: View Property Details */}
      {viewingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setViewingProperty(null)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold">
                  {viewingProperty.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight mt-1">
                  {viewingProperty.title}
                </h3>
              </div>
              <button
                onClick={() => setViewingProperty(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Location:</strong> {viewingProperty.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Price:</strong> {viewingProperty.price} ({viewingProperty.listingType})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Type & Category:</strong> {viewingProperty.type} • {viewingProperty.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Listing Agent:</strong> {viewingProperty.agent}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Listed Date:</strong> {viewingProperty.date}
                </span>
              </div>
              {viewingProperty.area && (
                <div className="p-3 bg-slate-50 rounded-xl text-slate-700 text-[11px] leading-relaxed">
                  <strong>Specifications:</strong> {viewingProperty.area} | {viewingProperty.bedrooms} Bedrooms | {viewingProperty.bathrooms} Bathrooms
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500">
                Status: <strong className="text-slate-900">{viewingProperty.status}</strong>
              </span>
              <div className="flex gap-2">
                {viewingProperty.status === "Pending Review" && (
                  <button
                    type="button"
                    onClick={() => {
                      handleApproveProperty(viewingProperty.id, viewingProperty.title);
                      setViewingProperty(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    Approve Listing
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const toEdit = viewingProperty;
                    setViewingProperty(null);
                    setEditingProperty(toEdit);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  Edit Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Edit Property */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setEditingProperty(null)}
          />
          <form
            onSubmit={handleSaveEdit}
            className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Edit Listing ({editingProperty.id})
              </h3>
              <button
                type="button"
                onClick={() => setEditingProperty(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Listing Title
                </label>
                <input
                  type="text"
                  value={editingProperty.title}
                  onChange={(e) =>
                    setEditingProperty({ ...editingProperty, title: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={editingProperty.price}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, price: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingProperty.location}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, location: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Status
                  </label>
                  <select
                    value={editingProperty.status}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        status: e.target.value as SuperAdminProperty["status"],
                      })
                    }
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Offer">Under Offer</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Agent
                  </label>
                  <select
                    value={editingProperty.agent}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, agent: e.target.value })
                    }
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 text-slate-800 bg-white"
                  >
                    <option value="Budi Santoso">Budi Santoso</option>
                    <option value="Sari Dewi">Sari Dewi</option>
                    <option value="Rizki Pratama">Rizki Pratama</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingProperty(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal 4: Delete Confirmation */}
      {deletingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDeletingProperty(null)}
          />
          <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-base font-bold text-slate-900">
                Delete Property Listing?
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to permanently remove <strong>{deletingProperty.title}</strong> (
              {deletingProperty.id})? This listing will be taken off all public feeds.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingProperty(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
