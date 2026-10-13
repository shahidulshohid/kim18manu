"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  ChevronRight,
  X,
  Hexagon,
  Filter,
} from "lucide-react";
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
  tags?: string[];
  locationHierarchy?: string[];
  agent?: {
    name: string;
    phone: string;
    avatar: string;
  };
}

export default function DiscoverView() {
  const router = useRouter();

  const [properties, setProperties] = useState<DiscoverProperty[]>([
    {
      id: "disc-1",
      title: "Modern Villa with Ocean View",
      location: "Jimbaran, Kuta Selatan, Denpasar, Bali",
      price: "IDR 4,500,000,000",
      beds: 4,
      baths: 3,
      area: "320 m²",
      type: "Residential",
      tag: "For Sale",
      isFeatured: true,
      isSaved: true,
      image: "/dashboard/discover/discoverImg1.png",
      tags: ["Villa", "residential", "Flood Free", "Near Main Road", "Tourist Area"],
      locationHierarchy: ["Bali", "Denpasar", "Badung", "Kuta Selatan", "Jimbaran"],
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
      tags: ["Apartment", "residential", "MRT Access", "City Center", "Smart Home"],
      locationHierarchy: ["DKI Jakarta", "Jakarta Selatan", "Kebayoran Baru", "Senayan", "SCBD"],
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
      tags: ["House", "residential", "Cool Climate", "Gated Security", "Private Garden"],
      locationHierarchy: ["Jawa Barat", "Bandung", "Coblong", "Dago Pakar"],
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
      beds: 0,
      baths: 1,
      area: "120 m²",
      type: "Commercial",
      tag: "For Rent",
      isFeatured: true,
      isSaved: false,
      image: "/dashboard/discover/discoverImg4.png",
      tags: ["Shophouse", "commercial", "High Footfall", "Prime Retail", "Corner Lot"],
      locationHierarchy: ["Bali", "Badung", "Kuta", "Seminyak", "Kayu Aya"],
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
      tags: ["Studio", "residential", "Furnished", "Campus Hub", "Fiber Optic"],
      locationHierarchy: ["Banten", "Tangerang Selatan", "Serpong", "BSD City"],
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
      beds: 0,
      baths: 2,
      area: "1200 m²",
      type: "Industrial",
      tag: "For Sale",
      isFeatured: false,
      isSaved: false,
      image: "/dashboard/discover/discoverImg6.png",
      tags: ["Warehouse", "industrial", "Container Access", "3-Phase Power", "High Ceiling"],
      locationHierarchy: ["Jawa Barat", "Bekasi", "Cikarang Barat", "MM2100"],
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
  const [listingType, setListingType] = useState("all");
  const [propertyClass, setPropertyClass] = useState("all");
  const [province, setProvince] = useState("all");
  const [bedrooms, setBedrooms] = useState("any");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [minSize, setMinSize] = useState("");
  const [features, setFeatures] = useState({
    floodFree: false,
    nearMainRoad: false,
    touristArea: false,
    businessArea: false,
  });
  const [saveSearchToast, setSaveSearchToast] = useState(false);

  const [sortBy, setSortBy] = useState("relevant");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isListening, setIsListening] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<DiscoverProperty | null>(null);
  const [compared, setCompared] = useState(false);
  const [contactToast, setContactToast] = useState(false);

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

  const handleContactAgent = () => {
    setContactToast(true);
    setTimeout(() => {
      setContactToast(false);
      router.push("/dashboard/customer/messages");
    }, 900);
  };

  const handleCompare = () => {
    setCompared(!compared);
  };

  const handleResetFilters = () => {
    setListingType("all");
    setPropertyClass("all");
    setProvince("all");
    setBedrooms("any");
    setBudgetMin("");
    setBudgetMax("");
    setMinSize("");
    setFeatures({
      floodFree: false,
      nearMainRoad: false,
      touristArea: false,
      businessArea: false,
    });
    setSearchQuery("");
  };

  const handleSaveSearch = () => {
    setSaveSearchToast(true);
    setTimeout(() => {
      setSaveSearchToast(false);
    }, 2500);
  };

  // Filter properties according to active filter fields
  const filteredProperties = properties.filter((p) => {
    // 1. Listing Type
    if (listingType !== "all" && p.tag !== listingType) return false;

    // 2. Property Class
    if (propertyClass !== "all" && p.type !== propertyClass) return false;

    // 3. Province
    if (province !== "all") {
      const provLower = province.toLowerCase();
      const matchProv =
        p.location.toLowerCase().includes(provLower) ||
        p.locationHierarchy?.some((loc) => loc.toLowerCase().includes(provLower));
      if (!matchProv) return false;
    }

    // 4. Bedrooms
    if (bedrooms !== "any") {
      const minBeds = parseInt(bedrooms, 10);
      if (p.beds === undefined || p.beds < minBeds) return false;
    }

    // 5. Min Size
    if (minSize.trim()) {
      const minVal = parseInt(minSize, 10);
      const propertyAreaVal = parseInt(p.area.replace(/\D/g, ""), 10);
      if (!isNaN(minVal) && !isNaN(propertyAreaVal) && propertyAreaVal < minVal) {
        return false;
      }
    }

    // 6. Checkboxes
    if (features.floodFree && !p.tags?.includes("Flood Free")) return false;
    if (features.nearMainRoad && !p.tags?.includes("Near Main Road")) return false;
    if (features.touristArea && !p.tags?.includes("Tourist Area")) return false;
    if (
      features.businessArea &&
      !p.tags?.some(
        (t) =>
          t === "City Center" ||
          t === "High Footfall" ||
          t === "Commercial" ||
          t === "Campus Hub"
      ) &&
      !p.location.toLowerCase().includes("scbd") &&
      !p.location.toLowerCase().includes("business")
    ) {
      return false;
    }

    // 7. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchType = p.type.toLowerCase().includes(q);
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchLoc && !matchType && !matchTags) return false;
    }

    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price-asc") {
      const priceA = parseInt(a.price.replace(/\D/g, ""), 10) || 0;
      const priceB = parseInt(b.price.replace(/\D/g, ""), 10) || 0;
      return priceA - priceB;
    }
    if (sortBy === "price-desc") {
      const priceA = parseInt(a.price.replace(/\D/g, ""), 10) || 0;
      const priceB = parseInt(b.price.replace(/\D/g, ""), 10) || 0;
      return priceB - priceA;
    }
    if (sortBy === "featured") {
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
    return 0;
  });

  return (
    <div className="w-full max-w-full overflow-x-hidden py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 leading-tight">
          Discover Properties
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
          Search, filter, and explore listings across Indonesia.
        </p>
      </div>

      {/* 2. Search Bar with Mic and Filters Button (Matching Screenshot) */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-5">
        <div className="relative flex-1 min-w-0 flex items-center bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-slate-400 ml-3.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, location, or describe what you need..."
            className="w-full min-w-0 bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={toggleVoice}
            className={cn(
              "p-2 mr-1 rounded-lg text-slate-400 hover:text-blue-600 transition-colors shrink-0",
              isListening && "text-red-500 animate-pulse bg-red-50"
            )}
            title={isListening ? "Listening..." : "Voice Search"}
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>

        {/* Filters Button (Matching Screenshot: Blue background with funnel Filter icon) */}
        <button
          type="button"
          onClick={() => setFilterOpen(!filterOpen)}
          className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-[#2563eb] hover:bg-blue-700 text-white flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all shrink-0 shadow-sm cursor-pointer active:scale-98"
        >
          <Filter className="h-4 w-4 fill-white stroke-none" />
          <span>Filters</span>
        </button>
      </div>

      {/* Expandable Filter Box (Pixel-Perfect Matching Screenshot) */}
      {filterOpen && (
        <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs animate-in fade-in duration-200">
          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4">
            Filter Properties
          </h3>

          {/* Row 1: 4 Dropdowns (LISTING TYPE, PROPERTY CLASS, PROVINCE, BEDROOMS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Listing Type */}
            <div>
              <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">
                LISTING TYPE
              </label>
              <div className="relative">
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Property Class */}
            <div>
              <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">
                PROPERTY CLASS
              </label>
              <div className="relative">
                <select
                  value={propertyClass}
                  onChange={(e) => setPropertyClass(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="all">All Classes</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Province */}
            <div>
              <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">
                PROVINCE
              </label>
              <div className="relative">
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="all">All Provinces</option>
                  <option value="Bali">Bali</option>
                  <option value="DKI Jakarta">DKI Jakarta</option>
                  <option value="Jawa Barat">Jawa Barat</option>
                  <option value="Banten">Banten</option>
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">
                BEDROOMS
              </label>
              <div className="relative">
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: 3 Inputs (BUDGET MIN, BUDGET MAX, MIN SIZE) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {/* Budget Min */}
            <div>
              <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">
                BUDGET MIN
              </label>
              <input
                type="text"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                placeholder="IDR"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Budget Max */}
            <div>
              <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">
                BUDGET MAX
              </label>
              <input
                type="text"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                placeholder="IDR"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Min Size */}
            <div>
              <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5">
                MIN SIZE (M²)
              </label>
              <input
                type="text"
                value={minSize}
                onChange={(e) => setMinSize(e.target.value)}
                placeholder="e.g. 100"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Empty 4th column for alignment matching screenshot */}
            <div className="hidden lg:block" />
          </div>

          {/* Row 3: 4 Checkboxes (Flood Free, Near Main Road, Tourist Area, Business Area) */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 mb-5">
            <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={features.floodFree}
                onChange={(e) =>
                  setFeatures((prev) => ({ ...prev, floodFree: e.target.checked }))
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span>Flood Free</span>
            </label>

            <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={features.nearMainRoad}
                onChange={(e) =>
                  setFeatures((prev) => ({ ...prev, nearMainRoad: e.target.checked }))
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span>Near Main Road</span>
            </label>

            <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={features.touristArea}
                onChange={(e) =>
                  setFeatures((prev) => ({ ...prev, touristArea: e.target.checked }))
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span>Tourist Area</span>
            </label>

            <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={features.businessArea}
                onChange={(e) =>
                  setFeatures((prev) => ({ ...prev, businessArea: e.target.checked }))
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span>Business Area</span>
            </label>
          </div>

          {/* Row 4: Buttons (Apply Filters, Reset, Save Search) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="h-10 px-5 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer active:scale-98"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-10 px-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-98"
              >
                Reset
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveSearch}
              className="text-xs sm:text-sm font-semibold text-[#2563eb] hover:underline cursor-pointer"
            >
              Save Search
            </button>
          </div>

          {/* Optional confirmation toast for Save Search */}
          {saveSearchToast && (
            <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2 animate-in fade-in">
              <span>Search criteria saved to your profile!</span>
            </div>
          )}
        </div>
      )}

      {/* 3. Status Toolbar: Count & Sorting & Grid/List Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <span className="text-xs sm:text-sm font-medium text-slate-600">
          <strong className="text-slate-900 font-bold">
            {sortedProperties.length}
          </strong>{" "}
          properties found
        </span>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
          {/* Sorting Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white border border-slate-200/90 rounded-xl px-3 sm:px-3.5 py-1.5 pr-8 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs cursor-pointer"
            >
              <option value="relevant">Most Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="featured">Featured First</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60 shrink-0">
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
          {sortedProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => {
                setSelectedProperty(property);
                setCompared(false);
              }}
              className="group cursor-pointer flex flex-col rounded-2xl sm:rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.09)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 min-w-0"
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
                    "absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all active:scale-90 cursor-pointer",
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
                <div className="mt-3 text-base sm:text-[17px] font-extrabold text-blue-600 truncate">
                  {property.price}
                </div>

                {/* Specs Footer */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {property.beds !== undefined && property.beds > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{property.beds} bed</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{property.baths} bath</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Maximize2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
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
        /* List View */
        <div className="space-y-4">
          {sortedProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => {
                setSelectedProperty(property);
                setCompared(false);
              }}
              className="group cursor-pointer flex flex-col sm:flex-row rounded-2xl sm:rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-100 transition-all p-3 sm:p-3.5 gap-3 sm:gap-4 items-stretch min-w-0"
            >
              <div className="relative h-44 sm:h-36 sm:w-56 w-full rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 250px"
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

              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 sm:py-1">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(property.id, e)}
                      className={cn(
                        "p-1.5 rounded-full shrink-0 cursor-pointer",
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
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 mt-3">
                  <span className="text-base font-extrabold text-blue-600 truncate">
                    {property.price}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 font-medium">
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

      {/* 5. Pixel-Perfect Property Details Modal (Matching User Screenshot) */}
      {selectedProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto overscroll-contain"
          onClick={() => setSelectedProperty(null)}
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
                    "px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white shadow-xs backdrop-blur-md",
                    selectedProperty.tag === "For Sale"
                      ? "bg-[#3b82f6]"
                      : "bg-sky-500"
                  )}
                >
                  {selectedProperty.tag}
                </span>

                {selectedProperty.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#3e2410]/95 text-amber-300 border border-amber-600/30 shadow-xs backdrop-blur-md">
                    <Star className="h-3 w-3 fill-amber-300 stroke-none" />
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
                    <span className="break-words line-clamp-1 sm:line-clamp-none">{selectedProperty.location}</span>
                  </p>
                </div>

                {/* Circular Royal Blue Heart Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedProperty.id, e);
                    setSelectedProperty({
                      ...selectedProperty,
                      isSaved: !selectedProperty.isSaved,
                    });
                  }}
                  aria-label="Save property"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center bg-[#2563eb] hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 transition-all shrink-0 active:scale-95 cursor-pointer"
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-transform",
                      selectedProperty.isSaved
                        ? "fill-white stroke-none"
                        : "fill-white/80 stroke-none"
                    )}
                  />
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
                    {selectedProperty.beds !== undefined && selectedProperty.beds > 0
                      ? selectedProperty.beds
                      : "-"}
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
                          idx === selectedProperty.locationHierarchy!.length - 1;
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

              {/* Optional Toast Feedback */}
              {contactToast && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2 animate-in fade-in">
                  <span>Redirecting to agent chat...</span>
                </div>
              )}

              {/* Row 6: Bottom Action Buttons (Contact Agent & Compare) */}
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
