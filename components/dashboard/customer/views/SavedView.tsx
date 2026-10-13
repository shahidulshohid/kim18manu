"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Trash2,
  Calendar,
  MapPin,
  BellRing,
} from "lucide-react";
import { recommendedProperties } from "../data";
import { PropertyItem } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SavedView() {
  const [savedList, setSavedList] = useState<PropertyItem[]>([
    ...recommendedProperties,
    {
      id: "sav-4",
      title: "Eco Sanctuary Luxury Villa",
      location: "Ubud, Gianyar, Bali",
      price: "IDR 3,800,000,000",
      beds: 3,
      baths: 3,
      area: "190 m²",
      type: "Residential",
      tag: "For Sale",
      isFeatured: true,
      isSaved: true,
      image: "/images/dashboard/customer/home/homeImg1.png",
      description: "Surrounded by lush jungle foliage and peaceful rice paddies.",
    },
  ]);

  const removeSaved = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Saved Properties
            </h1>
            <Badge variant="blue" className="bg-blue-100 text-blue-700">
              {savedList.length} Items
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Properties you have bookmarked for comparison, site visits, and price tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-xs font-semibold flex items-center gap-1.5">
            <BellRing className="h-3.5 w-3.5 text-blue-600" />
            Price Alerts (On)
          </Button>
        </div>
      </div>

      {/* Grid */}
      {savedList.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <Bookmark className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No saved properties yet</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Click the heart icon on any property in Discover or Home to save it here.
          </p>
          <Link href="/dashboard/customer/discover">
            <Button className="bg-blue-600 text-white">Explore Properties</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedList.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeSaved(item.id)}
                  title="Remove from saved"
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 text-slate-500 hover:text-red-600 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="absolute top-3 left-3">
                  <Badge variant="blue" className="bg-blue-600 text-white">
                    {item.tag}
                  </Badge>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </p>
                <p className="mt-2 text-base font-extrabold text-blue-600">{item.price}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>{item.beds} Beds</span>
                    <span>•</span>
                    <span>{item.baths} Baths</span>
                    <span>•</span>
                    <span>{item.area}</span>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center gap-2">
                  <Link
                    href="/dashboard/customer/site-visits"
                    className="flex-1 h-9 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Book Visit
                  </Link>
                  <Link
                    href="/dashboard/customer/messages"
                    className="h-9 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center transition-colors"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
