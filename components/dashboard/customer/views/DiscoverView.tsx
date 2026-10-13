"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Star,
  Grid,
  List,
} from "lucide-react";
import { recommendedProperties } from "../data";
import { PropertyItem } from "../types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function DiscoverView() {
  const [activeTab, setActiveTab] = useState<"all" | "sale" | "rent">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extended properties for discover
  const allProperties: PropertyItem[] = [
    ...recommendedProperties,
    {
      id: "disc-4",
      title: "Cliffside Luxury Estate with Private Beach",
      location: "Uluwatu, Bali",
      price: "IDR 14,000,000,000",
      beds: 6,
      baths: 7,
      area: "580 m²",
      type: "Residential",
      tag: "For Sale",
      isFeatured: true,
      isSaved: false,
      image: "/images/dashboard/customer/home/homeImg1.png",
      description: "Ultra-luxury cliff front residence overlooking the Indian ocean with helipad and infinity pool.",
    },
    {
      id: "disc-5",
      title: "Penthouse Suite with Panoramic Skyline View",
      location: "Kuningan, Jakarta Selatan",
      price: "IDR 35,000,000 / mo",
      beds: 3,
      baths: 3,
      area: "210 m²",
      type: "Residential",
      tag: "For Rent",
      isFeatured: false,
      isSaved: false,
      image: "/images/dashboard/customer/home/homeImg2.png",
      description: "Top-floor duplex penthouse in high-rise condominium with direct elevator access.",
    },
    {
      id: "disc-6",
      title: "Minimalist Modern Townhouse Cluster",
      location: "BSD City, Tangerang Selatan",
      price: "IDR 2,100,000,000",
      beds: 3,
      baths: 2,
      area: "120 m²",
      type: "Residential",
      tag: "For Sale",
      isFeatured: false,
      isSaved: false,
      image: "/images/dashboard/customer/home/homeImg3.png",
      description: "Contemporary eco-friendly family home in smart township with solar panels and fiber optic.",
    },
  ];

  const filteredProperties = allProperties.filter((p) => {
    if (activeTab === "sale" && p.tag !== "For Sale") return false;
    if (activeTab === "rent" && p.tag !== "For Rent") return false;
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Discover Properties
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse premium properties verified by PropertiQU.AI network
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/60">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-lg text-xs font-medium transition-colors",
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-lg text-xs font-medium transition-colors",
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, neighborhood, or property name..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Tab filters: All / Sale / Rent */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            )}
          >
            All Properties
          </button>
          <button
            onClick={() => setActiveTab("sale")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
              activeTab === "sale"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            )}
          >
            For Sale
          </button>
          <button
            onClick={() => setActiveTab("rent")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all",
              activeTab === "rent"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            )}
          >
            For Rent
          </button>
        </div>
      </div>

      {/* Property Results Count */}
      <div className="flex items-center justify-between mb-4 text-xs text-slate-500 font-medium">
        <span>Showing {filteredProperties.length} verified listings</span>
        <span>Sorted by: AI Recommended</span>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="group flex flex-col rounded-2xl sm:rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white bg-blue-600/90 backdrop-blur-md">
                    {property.tag}
                  </span>
                  {property.isFeatured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white bg-amber-500 backdrop-blur-md flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{property.location}</span>
                </div>
                <div className="mt-3 text-lg font-bold text-blue-600">
                  {property.price}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-3">
                    <span>{property.beds} bed</span>
                    <span>•</span>
                    <span>{property.baths} bath</span>
                    <span>•</span>
                    <span>{property.area}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{property.type}</span>
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
              className="flex flex-col sm:flex-row rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all group p-3 gap-4"
            >
              <div className="relative h-48 sm:h-36 sm:w-56 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="blue">{property.tag}</Badge>
                    <span className="text-xs text-slate-400">{property.type}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
                  <span className="text-base font-bold text-blue-600">{property.price}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{property.beds} Bed</span>
                    <span>{property.baths} Bath</span>
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
