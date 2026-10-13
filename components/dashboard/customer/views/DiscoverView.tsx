"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Mic,
  SlidersHorizontal,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Star,
  LayoutGrid,
  List,
  ChevronDown,
  X,
  Calendar,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface DiscoverProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  beds?: number;
  baths: number;
  area: string;
  type: "Residential" | "Commercial" | "Industrial";
  tag: "For Sale" | "For Rent";
  isFeatured?: boolean;
  isSaved?: boolean;
  image: string;
  description?: string;
  agent?: {
    name: string;
    phone: string;
    avatar: string;
  };
}

export default function DiscoverView() {
  const [properties, setProperties] = useState<DiscoverProperty[]>([
    {
      id: "disc-1",
      title: "Modern Villa with Ocean View",
      location: "Jimbaran, Denpasar",
      price: "IDR 4,500,000,000",
      beds: 4,
      baths: 3,
      area: "320 m²",
      type: "Residential",
      tag: "For Sale",
      isFeatured: true,
      isSaved: true,
      image: "/dashboard/discover/discoverImg1.png",
      description:
        "Cliffside luxury villa overlooking Jimbaran bay. Features infinity pool, private cinema, Scandinavian interior, and 24/7 security.",
      agent: {
        name: "Budi Santoso",
        phone: "+62 811-987-6543",
        avatar: "B",
      },
    },
    {
      id: "disc-2",
      title: "Cozy Apartment in Business District",
      location: "SCBD, Jakarta Selatan",
      price: "IDR 850,000,000",
      beds: 2,
      baths: 2,
      area: "85 m²",
      type: "Residential",
      tag: "For Sale",
      isFeatured: false,
      isSaved: false,
      image: "/dashboard/discover/discoverImg2.png",
      description:
        "Premium high-rise condominium in SCBD financial district with city skyline panorama, direct MRT access, gym, and private lift.",
      agent: {
        name: "Siti Rahayu",
        phone: "+62 813-234-5678",
        avatar: "S",
      },
    },
    {
      id: "disc-3",
      title: "Spacious Family House with Garden",
      location: "Dago, Bandung",
      price: "IDR 12,000,000 / mo",
      beds: 3,
      baths: 2,
      area: "180 m²",
      type: "Residential",
      tag: "For Rent",
      isFeatured: false,
      isSaved: true,
      image: "/dashboard/discover/discoverImg3.png",
      description:
        "Serene 2-story family haven with manicured garden lawn, private pool, tropical balcony, and quiet gated cluster.",
      agent: {
        name: "Dimas Pratama",
        phone: "+62 818-765-4321",
        avatar: "D",
      },
    },
    {
      id: "disc-4",
      title: "Premium Shophouse — Seminyak Main Strip",
      location: "Seminyak, Denpasar",
      price: "IDR 25,000,000 / mo",
      baths: 1,
      area: "120 m²",
      type: "Commercial",
      tag: "For Rent",
      isFeatured: true,
      isSaved: false,
      image: "/dashboard/discover/discoverImg4.png",
      description:
        "High-traffic retail and office commercial shophouse in the heart of Seminyak tourist strip. Ideal for boutique, cafe, or agency.",
      agent: {
        name: "Made Sudarsana",
        phone: "+62 812-456-7890",
        avatar: "M",
      },
    },
    {
      id: "disc-5",
      title: "Minimalist Studio — BSD City",
      location: "BSD City, Tangerang Selatan",
      price: "IDR 4,500,000 / mo",
      beds: 1,
      baths: 1,
      area: "32 m²",
      type: "Residential",
      tag: "For Rent",
      isFeatured: false,
      isSaved: false,
      image: "/dashboard/discover/discoverImg5.png",
      description:
        "Smart-home compact studio apartment in BSD green township. Fully furnished with high-speed fiber internet and access to commuter rail.",
      agent: {
        name: "Aditya Wardhana",
        phone: "+62 819-321-6547",
        avatar: "A",
      },
    },
    {
      id: "disc-6",
      title: "Industrial Warehouse — Bekasi Industrial Estate",
      location: "MM2100, Bekasi",
      price: "IDR 7,200,000,000",
      baths: 2,
      area: "1200 m²",
      type: "Industrial",
      tag: "For Sale",
      isFeatured: false,
      isSaved: false,
      image: "/dashboard/discover/discoverImg6.png",
      description:
        "Heavy-duty modern logistics facility with high ceilings, truck loading bays, wide container access, and 3-phase industrial power grid.",
      agent: {
        name: "Hendrik Gunawan",
        phone: "+62 815-987-1234",
        avatar: "H",
      },
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<"all" | "For Sale" | "For Rent">("all");
  const [selectedType, setSelectedType] = useState<"all" | "Residential" | "Commercial" | "Industrial">("all");
  const [sortBy, setSortBy] = useState("relevant");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isListening, setIsListening] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<DiscoverProperty | null>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      )
    );
  };

  const toggleVoice = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setSearchQuery("Bali villa under 5 billion");
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  // Filter properties
  const filteredProperties = properties.filter((p) => {
    if (selectedTag !== "all" && p.tag !== selectedTag) return false;
    if (selectedType !== "all" && p.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchType = p.type.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchType) return false;
    }
    return true;
  });

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 leading-tight">
          Discover Properties
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
          Search, filter, and explore listings across Indonesia.
        </p>
      </div>

      {/* 2. Search Bar with Mic and Filters Button */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 flex items-center bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <Search className="h-4.5 w-4.5 text-slate-400 ml-3.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, location, or describe what you need..."
            className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={toggleVoice}
            className={cn(
              "p-2 mr-1.5 rounded-lg text-slate-400 hover:text-blue-600 transition-colors shrink-0",
              isListening && "text-red-500 animate-pulse bg-red-50"
            )}
            title={isListening ? "Listening..." : "Voice Search"}
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>

        {/* Filters Button */}
        <button
          type="button"
          onClick={() => setFilterOpen(!filterOpen)}
          className={cn(
            "h-10 sm:h-11 px-4 sm:px-5 rounded-xl sm:rounded-2xl border flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer",
            filterOpen
              ? "bg-blue-50 border-blue-300 text-blue-600 shadow-xs"
              : "bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50 shadow-2xs"
          )}
        >
          <SlidersHorizontal className="h-4 w-4 stroke-[2]" />
          <span>Filters</span>
        </button>
      </div>

      {/* Expandable Filter Box */}
      {filterOpen && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Filter Listings
            </h3>
            <button
              onClick={() => {
                setSelectedTag("all");
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-2">
                Transaction Type
              </label>
              <div className="flex items-center gap-2">
                {(["all", "For Sale", "For Rent"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTag(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all",
                      selectedTag === t
                        ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {t === "all" ? "All" : t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-2">
                Property Category
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {(["all", "Residential", "Commercial", "Industrial"] as const).map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedType(c)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all",
                        selectedType === c
                          ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      {c === "all" ? "All" : c}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Status Toolbar: Count & Sorting & Grid/List Switch */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs sm:text-sm font-medium text-slate-600">
          <strong className="text-slate-900 font-bold">
            {filteredProperties.length}
          </strong>{" "}
          properties found
        </span>

        <div className="flex items-center gap-2.5">
          {/* Sorting Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs cursor-pointer"
            >
              <option value="relevant">Most Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="featured">Featured First</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              )}
              title="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                viewMode === "list"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              )}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. 6 Property Cards - Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className="group cursor-pointer flex flex-col rounded-2xl sm:rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.09)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle top/bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* Top Left Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-xs backdrop-blur-md",
                      property.tag === "For Sale"
                        ? "bg-blue-600/90"
                        : "bg-sky-500/90"
                    )}
                  >
                    {property.tag}
                  </span>

                  {property.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-600/90 text-white shadow-xs backdrop-blur-md">
                      <Star className="h-3 w-3 fill-white stroke-none" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Top Right Heart Bookmark Button */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(property.id, e)}
                  aria-label={
                    property.isSaved ? "Remove from saved" : "Save property"
                  }
                  className={cn(
                    "absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all active:scale-90",
                    property.isSaved
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white/90 text-slate-500 hover:text-red-500 hover:bg-white backdrop-blur-md"
                  )}
                >
                  <Heart
                    className={cn(
                      "h-4.5 w-4.5 transition-colors",
                      property.isSaved
                        ? "fill-white stroke-none"
                        : "fill-transparent stroke-[2]"
                    )}
                  />
                </button>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-4 sm:p-5">
                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {property.title}
                </h3>

                {/* Location with Pin */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>

                {/* Price */}
                <div className="mt-3 text-base sm:text-[17px] font-extrabold text-blue-600">
                  {property.price}
                </div>

                {/* Specs Footer */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-3">
                    {property.beds !== undefined && property.beds > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5 text-slate-400" />
                        <span>{property.beds} bed</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5 text-slate-400" />
                      <span>{property.baths} bath</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Maximize2 className="h-3.5 w-3.5 text-slate-400" />
                      <span>{property.area}</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-normal">
                    {property.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className="group cursor-pointer flex flex-col sm:flex-row rounded-2xl sm:rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-100 transition-all p-3.5 gap-4 items-stretch"
            >
              <div className="relative h-48 sm:h-36 sm:w-56 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="250px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-white shadow-xs backdrop-blur-md",
                      property.tag === "For Sale"
                        ? "bg-blue-600/90"
                        : "bg-sky-500/90"
                    )}
                  >
                    {property.tag}
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(property.id, e)}
                      className={cn(
                        "p-1.5 rounded-full",
                        property.isSaved ? "text-blue-600" : "text-slate-400 hover:text-red-500"
                      )}
                    >
                      <Heart
                        className={cn(
                          "h-4.5 w-4.5",
                          property.isSaved && "fill-blue-600 stroke-none"
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.location}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
                  <span className="text-base font-extrabold text-blue-600">
                    {property.price}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    {property.beds !== undefined && property.beds > 0 && (
                      <span>{property.beds} bed • </span>
                    )}
                    <span>{property.baths} bath</span>
                    <span>•</span>
                    <span>{property.area}</span>
                    <span className="text-[11px] text-slate-400">({property.type})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Property Quick View Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-60 sm:h-72 w-full shrink-0 bg-slate-100">
              <Image
                src={selectedProperty.image}
                alt={selectedProperty.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 h-9 w-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="blue" className="bg-blue-600 text-white border-none">
                    {selectedProperty.tag}
                  </Badge>
                  {selectedProperty.isFeatured && (
                    <Badge variant="amber" className="bg-amber-500 text-white border-none">
                      ★ Featured
                    </Badge>
                  )}
                  <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    {selectedProperty.type}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{selectedProperty.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {selectedProperty.location}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Price</span>
                  <p className="text-2xl font-black text-blue-600">{selectedProperty.price}</p>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                  {selectedProperty.beds !== undefined && selectedProperty.beds > 0 && (
                    <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <Bed className="h-4 w-4 text-blue-600" />
                      {selectedProperty.beds} Bed
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Bath className="h-4 w-4 text-blue-600" />
                    {selectedProperty.baths} Bath
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Maximize2 className="h-4 w-4 text-blue-600" />
                    {selectedProperty.area}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Overview</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProperty.description}
                </p>
              </div>

              {selectedProperty.agent && (
                <div className="flex items-center justify-between bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                      {selectedProperty.agent.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900">
                          {selectedProperty.agent.name}
                        </span>
                        <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <span className="text-xs text-slate-400">Verified PropertiQU Agent</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${selectedProperty.agent.phone}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-3 py-2 rounded-xl"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call Agent
                  </a>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setSelectedProperty(null)}
                  className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Site Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
