"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Hexagon,
  Heart,
  Star,
  X,
  ChevronRight,
  Bell,
  Trash2,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SavedProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  type: "Residential" | "Commercial" | "Industrial";
  tag: "For Sale" | "For Rent";
  isFeatured?: boolean;
  image: string;
  description: string;
  tags: string[];
  locationHierarchy: string[];
  agent: {
    name: string;
    phone: string;
    avatar: string;
  };
}

export interface SavedSearchItem {
  id: string;
  title: string;
  location: string;
  tag: "For Sale" | "For Rent";
  priceRange: string;
  beds: string;
  features: string[];
  frequency: "Instant" | "Daily" | "Weekly";
  newMatches: number;
  createdAt: string;
}

const INITIAL_SAVED_PROPERTIES: SavedProperty[] = [
  {
    id: "save-1",
    title: "Modern Villa with Ocean View",
    location: "Jimbaran, Denpasar",
    price: "IDR 4,500,000,000",
    beds: 4,
    baths: 3,
    area: "320 m²",
    type: "Residential",
    tag: "For Sale",
    isFeatured: true,
    image: "/dashboard/save/saveImg1.png",
    tags: ["Villa", "residential", "Flood Free", "Near Main Road", "Tourist Area"],
    locationHierarchy: ["Bali", "Denpasar", "Badung", "Kuta Selatan", "Jimbaran"],
    description:
      "Perched on Jimbaran cliffside with panoramic ocean views, private infinity pool, fully furnished minimalist Scandinavian interior, and smart home automation system.",
    agent: {
      name: "Budi Santoso",
      phone: "+62 811-987-6543",
      avatar: "B",
    },
  },
  {
    id: "save-2",
    title: "Spacious Family House with Garden",
    location: "Dago, Bandung",
    price: "IDR 12,000,000 / mo",
    beds: 3,
    baths: 2,
    area: "180 m²",
    type: "Residential",
    tag: "For Rent",
    isFeatured: false,
    image: "/dashboard/save/saveImg2.png",
    tags: ["House", "residential", "Cool Climate", "Gated Security", "Private Garden"],
    locationHierarchy: ["Jawa Barat", "Bandung", "Coblong", "Dago Pakar"],
    description:
      "Serene 2-story family haven with manicured garden lawn, private pool, tropical balcony, and quiet gated cluster with 24/7 security patrol.",
    agent: {
      name: "Dimas Pratama",
      phone: "+62 818-765-4321",
      avatar: "D",
    },
  },
];

const INITIAL_SAVED_SEARCHES: SavedSearchItem[] = [
  {
    id: "search-1",
    title: "Jimbaran Oceanfront & Luxury Villas",
    location: "Jimbaran, Denpasar, Bali",
    tag: "For Sale",
    priceRange: "Max IDR 5,000,000,000",
    beds: "4+ Beds",
    features: ["Flood Free", "Tourist Area", "Near Main Road"],
    frequency: "Daily",
    newMatches: 2,
    createdAt: "Saved 3 days ago",
  },
  {
    id: "search-2",
    title: "Bandung Family Residential Rentals",
    location: "Dago, Bandung, Jawa Barat",
    tag: "For Rent",
    priceRange: "Max IDR 15,000,000 / mo",
    beds: "3+ Beds",
    features: ["Private Garden", "Gated Security"],
    frequency: "Instant",
    newMatches: 1,
    createdAt: "Saved 1 week ago",
  },
];

export default function SavedView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"properties" | "searches">("properties");
  const [properties, setProperties] = useState<SavedProperty[]>(INITIAL_SAVED_PROPERTIES);
  const [savedSearches, setSavedSearches] = useState<SavedSearchItem[]>(INITIAL_SAVED_SEARCHES);
  const [selectedProperty, setSelectedProperty] = useState<SavedProperty | null>(null);
  const [compared, setCompared] = useState(false);
  const [contactToast, setContactToast] = useState(false);
  const [removedItem, setRemovedItem] = useState<SavedProperty | null>(null);

  const handleRemoveProperty = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const item = properties.find((p) => p.id === id);
    if (item) {
      setRemovedItem(item);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      if (selectedProperty?.id === id) {
        setSelectedProperty(null);
      }
    }
  };

  const handleUndoRemove = () => {
    if (removedItem) {
      setProperties((prev) => [...prev, removedItem]);
      setRemovedItem(null);
    }
  };

  const handleDeleteSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
  };

  const handleContactAgent = () => {
    setContactToast(true);
    setTimeout(() => {
      setContactToast(false);
      router.push("/dashboard/customer/messages");
    }, 900);
  };

  const handleCompare = () => {
    setCompared((prev) => !prev);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
          Saved
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Your saved properties and search alerts.
        </p>
      </div>

      {/* 2. Tabs */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-200/80 mt-6 mb-7">
        <button
          type="button"
          onClick={() => setActiveTab("properties")}
          className={cn(
            "relative pb-2.5 text-sm font-semibold transition-colors cursor-pointer select-none",
            activeTab === "properties"
              ? "text-[#2563eb]"
              : "text-slate-500 hover:text-slate-800"
          )}
        >
          Saved Properties ({properties.length})
          {activeTab === "properties" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2563eb] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("searches")}
          className={cn(
            "relative pb-2.5 text-sm font-semibold transition-colors cursor-pointer select-none",
            activeTab === "searches"
              ? "text-[#2563eb]"
              : "text-slate-500 hover:text-slate-800"
          )}
        >
          Saved Searches ({savedSearches.length})
          {activeTab === "searches" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2563eb] rounded-full" />
          )}
        </button>
      </div>

      {/* 3. Tab Content */}
      {activeTab === "properties" ? (
        properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                onClick={() => {
                  setSelectedProperty(property);
                  setCompared(false);
                }}
                className="group cursor-pointer flex flex-col rounded-2xl sm:rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.08)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 min-w-0"
              >
                {/* Image Container with Badges & Solid Blue Heart Button */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay for badge contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

                  {/* Top Left Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white shadow-xs",
                        property.tag === "For Sale"
                          ? "bg-[#2563eb]"
                          : "bg-[#0284c7]"
                      )}
                    >
                      {property.tag}
                    </span>

                    {property.isFeatured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#78350f] text-white shadow-xs">
                        <Star className="h-3 w-3 fill-white stroke-none" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Top Right Royal Blue Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveProperty(property.id, e)}
                    aria-label="Remove from saved"
                    title="Remove from saved"
                    className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-md hover:bg-blue-700 transition-all active:scale-90 cursor-pointer"
                  >
                    <Heart className="h-4.5 w-4.5 fill-white stroke-none" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {property.title}
                  </h3>

                  {/* Location with Pin */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1 truncate">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 text-base sm:text-[17px] font-extrabold text-[#2563eb] tracking-tight truncate">
                    {property.price}
                  </div>

                  {/* Specs Footer */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{property.beds} bed</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{property.baths} bath</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Hexagon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{property.area}</span>
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-normal shrink-0">
                      {property.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Properties */
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 sm:p-14 text-center max-w-md mx-auto">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-7 w-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              No saved properties
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-6">
              Properties you bookmark in Discover or Home will appear here for easy comparison.
            </p>
            <Link
              href="/dashboard/customer/discover"
              className="inline-flex items-center justify-center h-10 px-6 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              Browse Properties
            </Link>
          </div>
        )
      ) : (
        /* Saved Searches Tab */
        savedSearches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            {savedSearches.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-100 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className={cn(
                          "inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-white mb-2",
                          item.tag === "For Sale" ? "bg-[#2563eb]" : "bg-[#0284c7]"
                        )}
                      >
                        {item.tag}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        {item.location}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteSearch(item.id)}
                      title="Delete saved search"
                      className="h-8 w-8 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Filter criteria badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {item.priceRange}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {item.beds}
                    </span>
                    {item.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-medium text-[11px]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Bell className="h-3.5 w-3.5 text-blue-600" />
                    <span>{item.frequency} alert • {item.newMatches} new matches</span>
                  </div>

                  <Link
                    href="/dashboard/customer/discover"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:underline"
                  >
                    <span>View Matches</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Searches */
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 sm:p-14 text-center max-w-md mx-auto">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-7 w-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              No saved searches
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-6">
              Save your search filters from the Discover page to receive notifications when new matches appear.
            </p>
            <Link
              href="/dashboard/customer/discover"
              className="inline-flex items-center justify-center h-10 px-6 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              Discover Properties
            </Link>
          </div>
        )
      )}

      {/* Undo Toast Notification */}
      {removedItem && (
        <div className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Removed from saved</span>
          <button
            type="button"
            onClick={handleUndoRemove}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline ml-1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Undo
          </button>
        </div>
      )}

      {/* 4. Property Quick-View Modal */}
      {selectedProperty && (
        <div
          onClick={() => setSelectedProperty(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[540px] my-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] sm:max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Modal Image Header with Badges and Close Button */}
            <div className="relative h-48 sm:h-64 w-full shrink-0 bg-slate-100 overflow-hidden">
              <Image
                src={selectedProperty.image}
                alt={selectedProperty.title}
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
                priority
              />

              {/* Close Button Top Right (White Circle with X) */}
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 h-8 w-8 bg-white/95 hover:bg-white text-slate-600 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="h-4 w-4 stroke-[2.2]" />
              </button>

              {/* Top Left Badges */}
              <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2 z-10">
                <span
                  className={cn(
                    "px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white shadow-xs",
                    selectedProperty.tag === "For Sale"
                      ? "bg-[#2563eb]"
                      : "bg-[#0284c7]"
                  )}
                >
                  {selectedProperty.tag}
                </span>

                {selectedProperty.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#78350f] text-white shadow-xs">
                    <Star className="h-3 w-3 fill-white stroke-none" />
                    <span>Featured</span>
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-3.5 sm:space-y-4">
              {/* Row 1: Title + Location & Floating Blue Heart Button */}
              <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug break-words">
                    {selectedProperty.title}
                  </h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-normal break-words">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="break-words line-clamp-1 sm:line-clamp-none">
                      {selectedProperty.location}
                    </span>
                  </p>
                </div>

                {/* Circular Royal Blue Heart Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveProperty(selectedProperty.id)}
                  aria-label="Remove from saved"
                  title="Remove from saved"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center bg-[#2563eb] hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 transition-all shrink-0 active:scale-95 cursor-pointer"
                >
                  <Heart className="h-5 w-5 fill-white stroke-none" />
                </button>
              </div>

              {/* Row 2: Price */}
              <div className="text-xl sm:text-[23px] font-black text-[#2563eb] tracking-tight truncate">
                {selectedProperty.price}
              </div>

              {/* Row 3: 3 Specs Cards Grid (Bedrooms, Bathrooms, Land Size) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {/* Bedrooms */}
                <div className="bg-[#f8fafc] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-100 flex flex-col items-center justify-center text-center min-w-0">
                  <Bed className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-slate-400 stroke-[1.75] mb-1 sm:mb-1.5 shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-none truncate w-full">
                    {selectedProperty.beds}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1 truncate w-full">
                    Bedrooms
                  </span>
                </div>

                {/* Bathrooms */}
                <div className="bg-[#f8fafc] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-100 flex flex-col items-center justify-center text-center min-w-0">
                  <Bath className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-slate-400 stroke-[1.75] mb-1 sm:mb-1.5 shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-none truncate w-full">
                    {selectedProperty.baths}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1 truncate w-full">
                    Bathrooms
                  </span>
                </div>

                {/* Land Size */}
                <div className="bg-[#f8fafc] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-100 flex flex-col items-center justify-center text-center min-w-0">
                  <Hexagon className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-slate-400 stroke-[1.75] mb-1 sm:mb-1.5 shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-none truncate w-full">
                    {selectedProperty.area}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1 truncate w-full">
                    Land Size
                  </span>
                </div>
              </div>

              {/* Row 4: Tag Pills */}
              {selectedProperty.tags && selectedProperty.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
                  {selectedProperty.tags.map((tag, idx) => {
                    let badgeClass = "bg-[#f1f5f9] text-slate-700";
                    if (tag === "Flood Free") {
                      badgeClass =
                        "bg-[#f0fdf4] text-[#15803d] border border-[#86efac]";
                    } else if (
                      tag === "Near Main Road" ||
                      tag === "MRT Access" ||
                      tag === "Campus Hub"
                    ) {
                      badgeClass =
                        "bg-[#eff6ff] text-[#1d4ed8] border border-[#93c5fd]";
                    } else if (
                      tag === "Tourist Area" ||
                      tag === "High Footfall" ||
                      tag === "Prime Retail"
                    ) {
                      badgeClass =
                        "bg-[#fff7ed] text-[#9a3412] border border-[#fed7aa]";
                    }

                    return (
                      <span
                        key={idx}
                        className={cn(
                          "px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-colors break-words",
                          badgeClass
                        )}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Row 5: Location Hierarchy Breadcrumbs */}
              {selectedProperty.locationHierarchy &&
                selectedProperty.locationHierarchy.length > 0 && (
                  <div className="bg-[#f8fafc] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      LOCATION
                    </span>
                    <div className="text-[11px] sm:text-xs text-slate-600 flex flex-wrap items-center gap-1 sm:gap-1.5 font-medium leading-relaxed break-words">
                      {selectedProperty.locationHierarchy.map((loc, idx) => {
                        const isLast =
                          idx === selectedProperty.locationHierarchy.length - 1;
                        return (
                          <React.Fragment key={idx}>
                            <span
                              className={
                                isLast
                                  ? "font-bold text-slate-900"
                                  : "text-slate-600"
                              }
                            >
                              {loc}
                            </span>
                            {!isLast && (
                              <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedProperty.description}
              </p>

              {/* Toast Feedback */}
              {contactToast && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2 animate-in fade-in">
                  <span>Redirecting to agent chat...</span>
                </div>
              )}

              {/* Row 6: Bottom Action Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleContactAgent}
                  className="flex-1 min-w-0 h-11 sm:h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl shadow-sm transition-all flex items-center justify-center cursor-pointer active:scale-98 truncate px-3"
                >
                  Contact Agent
                </button>

                <button
                  type="button"
                  onClick={handleCompare}
                  className={cn(
                    "h-11 sm:h-12 px-4 sm:px-6 border text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl transition-all cursor-pointer active:scale-98 shrink-0",
                    compared
                      ? "bg-blue-50 border-blue-300 text-blue-600 font-bold"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {compared ? "Compared ✓" : "Compare"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
