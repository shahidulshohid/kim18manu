"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ChevronRight,
  Star,
  Calendar,
  Phone,
  CheckCircle,
  X,
} from "lucide-react";
import { recommendedProperties } from "./data";
import { PropertyItem } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RecommendedProperties() {
  const [properties, setProperties] = useState<PropertyItem[]>(
    recommendedProperties
  );
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(
    null
  );
  const [siteVisitScheduled, setSiteVisitScheduled] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      )
    );
  };

  const handleOpenDetails = (property: PropertyItem) => {
    setSelectedProperty(property);
    setSiteVisitScheduled(false);
  };

  return (
    <section className="mt-8 mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
          Recommended for You
        </h3>
        <Link
          href="/dashboard/customer/discover"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors group"
        >
          <span>View all</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => handleOpenDetails(property)}
            className="group cursor-pointer flex flex-col rounded-2xl sm:rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.09)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <Image
                src={property.image}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Top badges: For Sale / Featured */}
              <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm backdrop-blur-md",
                    property.tag === "For Sale"
                      ? "bg-blue-600/90"
                      : "bg-cyan-600/90"
                  )}
                >
                  {property.tag}
                </span>

                {property.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/95 text-white shadow-sm backdrop-blur-md">
                    <Star className="h-3 w-3 fill-white stroke-none" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {/* Top Right Heart Bookmark Button */}
              <button
                type="button"
                onClick={(e) => toggleFavorite(property.id, e)}
                aria-label={property.isSaved ? "Remove from saved" : "Save property"}
                className={cn(
                  "absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all active:scale-90",
                  property.isSaved
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white/90 text-slate-600 hover:text-red-500 hover:bg-white backdrop-blur-md"
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

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-4 sm:p-5">
              {/* Title */}
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {property.title}
              </h4>

              {/* Location */}
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
                  <span className="inline-flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5 text-slate-400" />
                    <span>{property.beds} bed</span>
                  </span>
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

      {/* Property Quick View Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto overscroll-contain">
          <div className="relative w-full max-w-2xl my-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Image Header */}
            <div className="relative h-52 sm:h-72 w-full shrink-0 bg-slate-100">
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
                className="absolute top-3.5 right-3.5 h-8 w-8 sm:h-9 sm:w-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer z-10"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="blue" className="bg-blue-600 text-white border-none text-[11px] sm:text-xs">
                    {selectedProperty.tag}
                  </Badge>
                  {selectedProperty.isFeatured && (
                    <Badge variant="amber" className="bg-amber-500 text-white border-none text-[11px] sm:text-xs">
                      ★ Featured
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold line-clamp-1">{selectedProperty.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{selectedProperty.location}</span>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Price</span>
                  <p className="text-xl sm:text-2xl font-black text-blue-600">{selectedProperty.price}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-100">
                    <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
                    <span>{selectedProperty.beds} Beds</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-100">
                    <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
                    <span>{selectedProperty.baths} Baths</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-100">
                    <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
                    <span>{selectedProperty.area}</span>
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">Overview & AI Insights</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProperty.description}
                </p>
              </div>

              {selectedProperty.agent && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">
                      {selectedProperty.agent.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {selectedProperty.agent.name}
                        </span>
                        <CheckCircle className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-slate-400">Verified PropertiQU Agent</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${selectedProperty.agent.phone}`}
                    className="self-start sm:self-auto flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-3 py-2 rounded-xl"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Contact
                  </a>
                </div>
              )}

              {/* Action row */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Button
                  onClick={() => setSiteVisitScheduled(true)}
                  disabled={siteVisitScheduled}
                  className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  {siteVisitScheduled ? "Site Visit Requested! (Agent Notified)" : "Schedule Site Visit"}
                </Button>
                <Link
                  href="/dashboard/customer/messages"
                  className="h-11 px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center"
                >
                  Chat with Agent
                </Link>
              </div>

              {siteVisitScheduled && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Your request was sent to {selectedProperty.agent?.name}. You can track this in <strong>Site Visits</strong>.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
