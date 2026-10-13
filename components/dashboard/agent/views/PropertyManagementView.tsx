"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  ChevronDown,
  Eye,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  X,
  Building2,
  MapPin,
  Tag,
  Calendar,
  User,
  Filter,
  FileEdit,
  Mic,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ListingItem {
  id: string;
  name: string;
  isFeatured?: boolean;
  type: string;
  category: "Residential" | "Commercial" | "Industrial";
  listingType: "Sale" | "Rent";
  location: string;
  price: string;
  agent: string;
  status: "Active" | "Pending Review" | "Under Offer" | "Draft" | "Closed";
  updated: string;
}

const initialListings: ListingItem[] = [
  {
    id: "L001",
    name: "Modern Villa — Jimbaran",
    isFeatured: true,
    type: "Villa · Residential",
    category: "Residential",
    listingType: "Sale",
    location: "Jimbaran, Bali",
    price: "IDR 4.5B",
    agent: "Budi Santoso",
    status: "Active",
    updated: "2026-10-01",
  },
  {
    id: "L002",
    name: "SCBD Apartment 2BR",
    isFeatured: false,
    type: "Apartment · Residential",
    category: "Residential",
    listingType: "Sale",
    location: "SCBD, Jakarta Selatan",
    price: "IDR 850M",
    agent: "Sari Dewi",
    status: "Active",
    updated: "2026-09-28",
  },
  {
    id: "L003",
    name: "Family House — Dago",
    isFeatured: false,
    type: "House · Residential",
    category: "Residential",
    listingType: "Rent",
    location: "Dago, Bandung",
    price: "IDR 12M/mo",
    agent: "Rizki Pratama",
    status: "Under Offer",
    updated: "2026-09-25",
  },
  {
    id: "L004",
    name: "Seminyak Shophouse",
    isFeatured: true,
    type: "Ruko · Commercial",
    category: "Commercial",
    listingType: "Rent",
    location: "Seminyak, Bali",
    price: "IDR 25M/mo",
    agent: "Budi Santoso",
    status: "Pending Review",
    updated: "2026-09-20",
  },
  {
    id: "L005",
    name: "BSD Studio Apartment",
    isFeatured: false,
    type: "Apartment · Residential",
    category: "Residential",
    listingType: "Rent",
    location: "BSD, Tangerang Selatan",
    price: "IDR 4.5M/mo",
    agent: "Dewi Hartati",
    status: "Draft",
    updated: "2026-09-18",
  },
  {
    id: "L006",
    name: "MM2100 Warehouse",
    isFeatured: false,
    type: "Warehouse · Industrial",
    category: "Industrial",
    listingType: "Sale",
    location: "Cikarang, Bekasi",
    price: "IDR 7.2B",
    agent: "Sari Dewi",
    status: "Closed",
    updated: "2026-09-10",
  },
];

export default function PropertyManagementView() {
  const [listings, setListings] = useState<ListingItem[]>(initialListings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [classFilter, setClassFilter] = useState<string>("All");
  const [activeCounterFilter, setActiveCounterFilter] = useState<string>("Total");

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingListing, setViewingListing] = useState<ListingItem | null>(null);
  const [editingListing, setEditingListing] = useState<ListingItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ListingItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Listing Modal Form State strictly matching screenshot
  const [addMode, setAddMode] = useState<"manual" | "voice" | "media">("manual");
  const [titleSuggestionsOpen, setTitleSuggestionsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    listingType: "sale" as "sale" | "rent",
    propertyClass: "residential" as "residential" | "commercial" | "industrial",
    propertyType: "House",
    price: "",
    province: "",
    city: "",
    regency: "",
    district: "",
    area: "",
    bedrooms: "0",
    bathrooms: "0",
    size: "0",
    assignedAgent: "Budi Santoso",
    listingStatus: "Draft" as "Draft" | "Pending Review" | "Active",
    inputSource: "Manual",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveDraft = () => {
    const newId = `L00${listings.length + 1}`;
    const newListing: ListingItem = {
      id: newId,
      name: formData.title || "Untitled Property Listing",
      isFeatured: false,
      type: `${formData.propertyType} · ${formData.propertyClass === "residential" ? "Residential" : formData.propertyClass === "commercial" ? "Commercial" : "Industrial"}`,
      category:
        formData.propertyClass === "residential"
          ? "Residential"
          : formData.propertyClass === "commercial"
          ? "Commercial"
          : "Industrial",
      listingType: formData.listingType === "sale" ? "Sale" : "Rent",
      location: formData.city ? `${formData.city}, ${formData.province}` : formData.province || "Indonesia",
      price: formData.price ? (formData.price.startsWith("IDR") ? formData.price : `IDR ${formData.price}`) : "IDR 1.2B",
      agent: formData.assignedAgent,
      status: "Draft",
      updated: new Date().toISOString().split("T")[0],
    };
    setListings([newListing, ...listings]);
    setShowAddModal(false);
    showToast(`Listing ${newId} saved as Draft.`);
  };

  const handleSubmitForReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `L00${listings.length + 1}`;
    const newListing: ListingItem = {
      id: newId,
      name: formData.title || "Modern Villa with Ocean View",
      isFeatured: false,
      type: `${formData.propertyType} · ${formData.propertyClass === "residential" ? "Residential" : formData.propertyClass === "commercial" ? "Commercial" : "Industrial"}`,
      category:
        formData.propertyClass === "residential"
          ? "Residential"
          : formData.propertyClass === "commercial"
          ? "Commercial"
          : "Industrial",
      listingType: formData.listingType === "sale" ? "Sale" : "Rent",
      location: formData.city ? `${formData.city}, ${formData.province}` : formData.province || "Bali",
      price: formData.price ? (formData.price.startsWith("IDR") ? formData.price : `IDR ${formData.price}`) : "IDR 4.5B",
      agent: formData.assignedAgent,
      status: formData.listingStatus === "Draft" ? "Pending Review" : formData.listingStatus,
      updated: new Date().toISOString().split("T")[0],
    };
    setListings([newListing, ...listings]);
    setShowAddModal(false);
    showToast(`Listing ${newId} submitted for review successfully!`);
  };

  // Status Counts
  const counts = useMemo(() => {
    return {
      total: listings.length,
      active: listings.filter((l) => l.status === "Active").length,
      pending: listings.filter((l) => l.status === "Pending Review").length,
      underOffer: listings.filter((l) => l.status === "Under Offer").length,
      draft: listings.filter((l) => l.status === "Draft").length,
      closed: listings.filter((l) => l.status === "Closed").length,
    };
  }, [listings]);

  // Filtered Listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Counter card filter
      if (activeCounterFilter === "Active" && item.status !== "Active") return false;
      if (activeCounterFilter === "Pending" && item.status !== "Pending Review") return false;
      if (activeCounterFilter === "Under Offer" && item.status !== "Under Offer") return false;
      if (activeCounterFilter === "Draft" && item.status !== "Draft") return false;
      if (activeCounterFilter === "Closed" && item.status !== "Closed") return false;

      // Status dropdown
      if (statusFilter !== "All" && item.status !== statusFilter) return false;

      // Class dropdown
      if (classFilter !== "All" && item.category !== classFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesLocation = item.location.toLowerCase().includes(q);
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesAgent = item.agent.toLowerCase().includes(q);
        return matchesName || matchesLocation || matchesId || matchesAgent;
      }

      return true;
    });
  }, [listings, activeCounterFilter, statusFilter, classFilter, searchQuery]);

  const handleDeleteListing = () => {
    if (deleteTarget) {
      setListings((prev) => prev.filter((l) => l.id !== deleteTarget.id));
      showToast(`Listing ${deleteTarget.id} removed successfully.`);
      setDeleteTarget(null);
    }
  };

  const handleExport = () => {
    showToast("Exporting 6 property listings as CSV...");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 px-4 sm:px-6 lg:px-[32px] pt-6 sm:pt-8 pb-12">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-snug">
            Property Management
          </h1>
          <p className="text-xs sm:text-sm font-normal text-slate-400 mt-0.5">
            Manage all property listings across the platform.
          </p>
        </div>

        {/* Add Listing Button */}
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="h-10 px-4.5 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-150 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Listing</span>
        </button>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-5">
        {/* Search input matching screenshot */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10.5 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-2xs"
          />
        </div>

        {/* Filter Dropdowns & Export Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Status Dropdown (Shadcn UI) */}
          <div className="w-38 sm:w-40">
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
              <SelectTrigger className="h-10.5 rounded-xl border-slate-200">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Under Offer">Under Offer</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Class Dropdown (Shadcn UI) */}
          <div className="w-38 sm:w-40">
            <Select value={classFilter} onValueChange={(val) => setClassFilter(val)}>
              <SelectTrigger className="h-10.5 rounded-xl border-slate-200">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Classes</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={handleExport}
            className="h-10.5 px-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 3. Status Metric / Filter Cards matching screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
        {[
          { key: "Total", label: "Total", count: counts.total, color: "text-slate-900" },
          { key: "Active", label: "Active", count: counts.active, color: "text-emerald-600" },
          { key: "Pending", label: "Pending", count: counts.pending, color: "text-amber-500" },
          { key: "Under Offer", label: "Under Offer", count: counts.underOffer, color: "text-blue-600" },
          { key: "Draft", label: "Draft", count: counts.draft, color: "text-slate-600" },
          { key: "Closed", label: "Closed", count: counts.closed, color: "text-slate-600" },
        ].map((card) => {
          const isActive = activeCounterFilter === card.key;
          return (
            <div
              key={card.key}
              onClick={() => setActiveCounterFilter(card.key)}
              className={cn(
                "rounded-2xl border bg-white p-3.5 sm:p-4 text-center cursor-pointer transition-all duration-150 shadow-2xs hover:shadow-xs",
                isActive
                  ? "border-blue-500 ring-2 ring-blue-500/10 bg-blue-50/20"
                  : "border-slate-200/80 hover:border-slate-300"
              )}
            >
              <div className={cn("text-xl sm:text-2xl font-bold leading-none mb-1.5", card.color)}>
                {card.count}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {card.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Listings Table Container matching screenshot */}
      <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
        {/* Table Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="text-xs sm:text-sm font-bold text-slate-900">
            {filteredListings.length} listings
          </div>

          <button
            type="button"
            onClick={() => showToast("Bulk edit mode activated.")}
            className="h-8 px-3 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer"
          >
            Bulk Edit
          </button>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[920px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-3">ID</th>
                <th className="py-3.5 px-3">PROPERTY</th>
                <th className="py-3.5 px-3">TYPE</th>
                <th className="py-3.5 px-3">LISTING</th>
                <th className="py-3.5 px-3">LOCATION</th>
                <th className="py-3.5 px-3">PRICE</th>
                <th className="py-3.5 px-3">AGENT</th>
                <th className="py-3.5 px-3">STATUS</th>
                <th className="py-3.5 px-3">UPDATED</th>
                <th className="py-3.5 px-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredListings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    No listings match the current filters.
                  </td>
                </tr>
              ) : (
                filteredListings.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                    onClick={() => setViewingListing(item)}
                  >
                    {/* ID */}
                    <td className="py-4 px-3 font-mono text-slate-400 text-xs font-medium">
                      {item.id}
                    </td>

                    {/* PROPERTY */}
                    <td className="py-4 px-3 min-w-[200px]">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-xs sm:text-sm">
                        {item.name}
                      </div>
                      {item.isFeatured && (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 mt-0.5">
                          <span>★</span>
                          <span>Featured</span>
                        </div>
                      )}
                    </td>

                    {/* TYPE */}
                    <td className="py-4 px-3 text-slate-400 font-normal">
                      {item.type}
                    </td>

                    {/* LISTING TYPE (Sale / Rent) */}
                    <td className="py-4 px-3">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                        {item.listingType}
                      </span>
                    </td>

                    {/* LOCATION */}
                    <td className="py-4 px-3 text-slate-600 font-medium">
                      {item.location}
                    </td>

                    {/* PRICE */}
                    <td className="py-4 px-3 font-bold text-slate-900">
                      {item.price}
                    </td>

                    {/* AGENT */}
                    <td className="py-4 px-3 text-slate-600">
                      {item.agent}
                    </td>

                    {/* STATUS BADGE strictly matching screenshot */}
                    <td className="py-4 px-3">
                      {item.status === "Active" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600">
                          Active
                        </span>
                      )}
                      {item.status === "Under Offer" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600">
                          Under Offer
                        </span>
                      )}
                      {item.status === "Pending Review" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700">
                          Pending Review
                        </span>
                      )}
                      {item.status === "Draft" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                          Draft
                        </span>
                      )}
                      {item.status === "Closed" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                          Closed
                        </span>
                      )}
                    </td>

                    {/* UPDATED DATE */}
                    <td className="py-4 px-3 text-slate-400 font-mono text-[11px]">
                      {item.updated}
                    </td>

                    {/* ACTIONS */}
                    <td
                      className="py-4 px-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5 text-slate-300">
                        {/* View action */}
                        <button
                          type="button"
                          onClick={() => setViewingListing(item)}
                          className="p-1 rounded-md hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {/* Edit action */}
                        <button
                          type="button"
                          onClick={() => setEditingListing(item)}
                          className="p-1 rounded-md hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit Listing"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete action */}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1 rounded-md hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination matching screenshot */}
        <div className="flex items-center justify-between pt-5 mt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">
            Showing {filteredListings.length} of {listings.length} listings
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="h-8 px-3 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-lg bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center shadow-xs"
            >
              1
            </button>
            <button
              type="button"
              className="h-8 px-3 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 5. Add Listing Modal strictly matching screenshot */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[620px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 shrink-0">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Add New Listing
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto py-4 px-0.5 space-y-4 custom-scrollbar flex-1">
              {/* 3 Mode Tabs */}
              <div className="bg-slate-100/80 p-1 rounded-2xl flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setAddMode("manual")}
                  className={cn(
                    "flex-1 h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                    addMode === "manual"
                      ? "bg-white text-blue-600 shadow-xs border border-slate-200/50"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <FileEdit className="h-3.5 w-3.5" />
                  <span>Manual Input</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAddMode("voice");
                    showToast("Listening for Voice Inbound... Speak listing details.");
                  }}
                  className={cn(
                    "flex-1 h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                    addMode === "voice"
                      ? "bg-white text-blue-600 shadow-xs border border-slate-200/50"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <Mic className="h-3.5 w-3.5" />
                  <span>Voice → AI Extract</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAddMode("media");
                    showToast("Select images or video to extract property details.");
                  }}
                  className={cn(
                    "flex-1 h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                    addMode === "media"
                      ? "bg-white text-blue-600 shadow-xs border border-slate-200/50"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Photo / Video AI</span>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmitForReview} className="space-y-4">
                {/* 1. PROPERTY TITLE * */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    PROPERTY TITLE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern Villa with Ocean View"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    onFocus={() => setTitleSuggestionsOpen(true)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                  />

                  {/* Suggestions Popover matching snippet */}
                  {titleSuggestionsOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 text-xs animate-in fade-in duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                        <span>Select a property</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTitleSuggestionsOpen(false);
                          }}
                          className="text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      {[
                        "Modern Villa with Ocean View",
                        "Spacious Family House with Garden",
                        "Cozy Apartment in Business District",
                      ].map((item) => (
                        <div
                          key={item}
                          onClick={() => {
                            setFormData({ ...formData, title: item });
                            setTitleSuggestionsOpen(false);
                          }}
                          className="px-3.5 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-slate-700 transition-colors"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. LISTING TYPE * & PROPERTY CLASS * (2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      LISTING TYPE <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.listingType}
                      onValueChange={(val) =>
                        setFormData({
                          ...formData,
                          listingType: val as "sale" | "rent",
                        })
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">sale</SelectItem>
                        <SelectItem value="rent">rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      PROPERTY CLASS <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.propertyClass}
                      onValueChange={(val) =>
                        setFormData({
                          ...formData,
                          propertyClass: val as
                            | "residential"
                            | "commercial"
                            | "industrial",
                        })
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">residential</SelectItem>
                        <SelectItem value="commercial">commercial</SelectItem>
                        <SelectItem value="industrial">industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 3. PROPERTY TYPE * & PRICE (IDR) * (2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      PROPERTY TYPE <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(val) =>
                        setFormData({
                          ...formData,
                          propertyType: val,
                        })
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Ruko">Ruko</SelectItem>
                        <SelectItem value="Rukan">Rukan</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Warehouse">Warehouse</SelectItem>
                        <SelectItem value="Land">Land</SelectItem>
                        <SelectItem value="Factory">Factory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      PRICE (IDR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 4500000000"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 bg-white"
                    />
                  </div>
                </div>

                {/* Section Header: LOCATION HIERARCHY */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    LOCATION HIERARCHY
                  </span>
                </div>

                {/* 4. PROVINCE * & CITY * (2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      PROVINCE <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Province"
                      value={formData.province}
                      onChange={(e) =>
                        setFormData({ ...formData, province: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      CITY <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 bg-white"
                    />
                  </div>
                </div>

                {/* 5. REGENCY * & DISTRICT * (2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      REGENCY <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Regency"
                      value={formData.regency}
                      onChange={(e) =>
                        setFormData({ ...formData, regency: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      DISTRICT <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter District"
                      value={formData.district}
                      onChange={(e) =>
                        setFormData({ ...formData, district: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 bg-white"
                    />
                  </div>
                </div>

                {/* 6. AREA */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    AREA
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Area"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>

                {/* 7. BEDROOMS, BATHROOMS, SIZE (M²) (3 cols) */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      BEDROOMS
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.bedrooms}
                      onChange={(e) =>
                        setFormData({ ...formData, bedrooms: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      BATHROOMS
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.bathrooms}
                      onChange={(e) =>
                        setFormData({ ...formData, bathrooms: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      SIZE (M²)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData.size}
                      onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* 8. ASSIGNED AGENT * & LISTING STATUS (2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      ASSIGNED AGENT <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.assignedAgent}
                      onValueChange={(val) =>
                        setFormData({
                          ...formData,
                          assignedAgent: val,
                        })
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Budi Santoso">Budi Santoso</SelectItem>
                        <SelectItem value="Sari Dewi">Sari Dewi</SelectItem>
                        <SelectItem value="Rizki Pratama">Rizki Pratama</SelectItem>
                        <SelectItem value="Dewi Hartati">Dewi Hartati</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      LISTING STATUS
                    </label>
                    <Select
                      value={formData.listingStatus}
                      onValueChange={(val) =>
                        setFormData({
                          ...formData,
                          listingStatus: val as
                            | "Draft"
                            | "Pending Review"
                            | "Active",
                        })
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Pending Review">Pending Review</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 9. LISTING INPUT SOURCE */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    LISTING INPUT SOURCE
                  </label>
                  <Select
                    value={formData.inputSource}
                    onValueChange={(val) =>
                      setFormData({
                        ...formData,
                        inputSource: val,
                      })
                    }
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select input source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Voice Inbound">Voice Inbound</SelectItem>
                      <SelectItem value="AI Extraction">AI Extraction</SelectItem>
                      <SelectItem value="Partner Portal">Partner Portal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Footer Buttons strictly matching screenshot */}
                <div className="sticky -bottom-4 bg-white/95 backdrop-blur-xs flex items-center justify-between gap-3 pt-3.5 pb-2 border-t border-slate-100 mt-6 z-20">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-11 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 6. View Details Modal */}
      {viewingListing && (
        <div
          onClick={() => setViewingListing(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {viewingListing.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {viewingListing.name}
                </h3>
              </div>
              <button
                onClick={() => setViewingListing(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Price</span>
                <span className="font-bold text-slate-900 text-sm">{viewingListing.price}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Status</span>
                <span className="font-semibold text-emerald-600">{viewingListing.status}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Type & Class</span>
                <span className="font-medium text-slate-800">{viewingListing.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Location</span>
                <span className="font-medium text-slate-800">{viewingListing.location}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Assigned Agent</span>
                <span className="font-medium text-slate-800">{viewingListing.agent}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400 font-medium">Last Updated</span>
                <span className="font-mono text-slate-600">{viewingListing.updated}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setEditingListing(viewingListing);
                  setViewingListing(null);
                }}
                className="flex-1 h-10 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Edit Listing</span>
              </button>
              <button
                type="button"
                onClick={() => setViewingListing(null)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Edit Listing Modal */}
      {editingListing && (
        <div
          onClick={() => setEditingListing(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Edit Listing ({editingListing.id})
              </h3>
              <button
                onClick={() => setEditingListing(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setListings((prev) =>
                  prev.map((l) => (l.id === editingListing.id ? editingListing : l))
                );
                showToast(`Listing ${editingListing.id} updated!`);
                setEditingListing(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Property Title
                </label>
                <input
                  type="text"
                  value={editingListing.name}
                  onChange={(e) =>
                    setEditingListing({ ...editingListing, name: e.target.value })
                  }
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={editingListing.price}
                    onChange={(e) =>
                      setEditingListing({ ...editingListing, price: e.target.value })
                    }
                    required
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={editingListing.status}
                    onChange={(e) =>
                      setEditingListing({
                        ...editingListing,
                        status: e.target.value as ListingItem["status"],
                      })
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Offer">Under Offer</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editingListing.location}
                  onChange={(e) =>
                    setEditingListing({ ...editingListing, location: e.target.value })
                  }
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingListing(null)}
                  className="h-10 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          onClick={() => setDeleteTarget(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 text-center animate-in zoom-in-95 duration-200"
          >
            <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Delete Listing {deleteTarget.id}?
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Are you sure you want to permanently delete &quot;{deleteTarget.name}&quot;?
            </p>

            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteListing}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
