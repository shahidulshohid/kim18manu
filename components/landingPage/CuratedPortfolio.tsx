"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Check, ArrowRight, Sparkles } from "lucide-react";

export interface PropertyItem {
  id: string;
  image: string;
  category: string;
  title: string;
  price: string;
  ownership: string;
  location: string;
  bedsBaths: string;
  landSize: string;
  feature: string;
  agent: {
    initials: string;
    name: string;
    title: string;
    rating: string;
  };
}

export default function CuratedPortfolio() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const properties: PropertyItem[] = [
    {
      id: "01",
      image: "/images/portFolio/portFolioImg1.png",
      category: "Modern Tropical Luxury Villa",
      title: "Villa Serenity Seminyak",
      price: "IDR 4,200,000,000",
      ownership: "Freehold",
      location: "Seminyak, Badung, Bali",
      bedsBaths: "3 beds · 3 baths",
      landSize: "280 m²",
      feature: "Lap Pool",
      agent: {
        initials: "MS",
        name: "Made Sudarsana",
        title: "Premier Bali Agent",
        rating: "4.98",
      },
    },
    {
      id: "02",
      image: "/images/portFolio/portFolioImg2.png",
      category: "Ultra-Luxury Clifftop Residence",
      title: "Villa Serenity Seminyak",
      price: "IDR 16,500,000,000",
      ownership: "Hak Pakai (Eligible PMA)",
      location: "Seminyak, Badung, Bali",
      bedsBaths: "5 Beds · 6 baths",
      landSize: "650 m²",
      feature: "Ocean Horizon",
      agent: {
        initials: "MS",
        name: "Evelyn Tan",
        title: "Sotheby's Specialist",
        rating: "5.00",
      },
    },
    {
      id: "03",
      image: "/images/portFolio/portFolioImg3.png",
      category: "Modern Tropical Haven",
      title: "Casa Verde Ubud",
      price: "IDR 12,300,000,000",
      ownership: "Hak Milik (Freehold)",
      location: "Ubud, Gianyar, Bali",
      bedsBaths: "4 Beds · 4 Baths",
      landSize: "550 m²",
      feature: "Lush Jungle Views",
      agent: {
        initials: "MS",
        name: "Adi Putra",
        title: "Luxury Specialist",
        rating: "4.85",
      },
    },
    {
      id: "04",
      image: "/images/portFolio/portFolioImg4.png",
      category: "Modern Tropical Luxury Villa",
      title: "Villa Serenity Seminyak",
      price: "IDR 4,200,000,000",
      ownership: "Freehold",
      location: "Seminyak, Badung, Bali",
      bedsBaths: "3 beds · 3 baths",
      landSize: "280 m²",
      feature: "Lap Pool",
      agent: {
        initials: "MS",
        name: "Made Sudarsana",
        title: "Premier Bali Agent",
        rating: "4.98",
      },
    },
    {
      id: "05",
      image: "/images/portFolio/portFolioImg5.png",
      category: "Ultra-Luxury Clifftop Residence",
      title: "Villa Serenity Seminyak",
      price: "IDR 16,500,000,000",
      ownership: "Hak Pakai (Eligible PMA)",
      location: "Seminyak, Badung, Bali",
      bedsBaths: "5 Beds · 6 baths",
      landSize: "650 m²",
      feature: "Ocean Horizon",
      agent: {
        initials: "MS",
        name: "Evelyn Tan",
        title: "Sotheby's Specialist",
        rating: "5.00",
      },
    },
    {
      id: "06",
      image: "/images/portFolio/portFolioImg6.png",
      category: "Modern Tropical Haven",
      title: "Casa Verde Ubud",
      price: "IDR 12,300,000,000",
      ownership: "Hak Milik (Freehold)",
      location: "Ubud, Gianyar, Bali",
      bedsBaths: "4 Beds · 4 Baths",
      landSize: "550 m²",
      feature: "Lush Jungle Views",
      agent: {
        initials: "MS",
        name: "Adi Putra",
        title: "Luxury Specialist",
        rating: "4.85",
      },
    },
  ];

  return (
    <section
      id="portfolio"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden font-sans border-t border-slate-100"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-14">
          <div>
            <span className="text-[12px] font-bold tracking-widest uppercase text-[#2f80ed] block mb-2">
              VERIFIED PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0f172a] leading-tight">
              Curated Recommendations
            </h2>
            <p className="mt-2.5 text-slate-500 text-sm sm:text-[15.5px] font-normal max-w-xl">
              Tailored to your live query profile with deep empirical metrics.
            </p>
          </div>

          <div className="shrink-0 pt-2 sm:pt-0">
            <a
              href="#view-all"
              className="text-sm font-semibold text-[#2f80ed] hover:text-[#1d6cd8] transition-colors flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* 6 Property Cards Grid (3 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              onClick={() => setSelectedProperty(property.id)}
              className="group bg-white rounded-3xl border border-slate-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Card Image Area with Gradient & Overlaid Title */}
              <div className="relative w-full h-[230px] sm:h-[240px] overflow-hidden bg-slate-100">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Overlaid Category & Title at bottom of photo */}
                <div className="absolute bottom-4 left-5 right-5 z-10">
                  <span className="text-[11px] sm:text-[11.5px] font-semibold text-[#38bdf8] block tracking-wide drop-shadow-sm">
                    {property.category}
                  </span>
                  <h3 className="text-base sm:text-[17px] font-bold text-white leading-snug drop-shadow-sm mt-0.5">
                    {property.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Price & Ownership Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#2f80ed] font-bold text-[16px] sm:text-[17px] tracking-tight">
                      {property.price}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {property.ownership}
                    </span>
                  </div>

                  {/* Location with Pin Icon */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2.5 font-normal">
                    <MapPin size={13} className="text-slate-400 shrink-0" />
                    <span>{property.location}</span>
                  </div>

                  {/* Specs Container (Light Ice-Gray Rounded Box) */}
                  <div className="mt-4 bg-[#f4f8fc] rounded-xl p-3 sm:py-3.5 sm:px-3 grid grid-cols-3 divide-x divide-slate-200/70 text-center">
                    <div className="px-1.5">
                      <span className="text-[10px] sm:text-[10.5px] font-medium text-slate-400 block">
                        Beds / Baths
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-700 block mt-0.5 truncate">
                        {property.bedsBaths}
                      </span>
                    </div>
                    <div className="px-1.5">
                      <span className="text-[10px] sm:text-[10.5px] font-medium text-slate-400 block">
                        Land Size
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-700 block mt-0.5">
                        {property.landSize}
                      </span>
                    </div>
                    <div className="px-1.5">
                      <span className="text-[10px] sm:text-[10.5px] font-medium text-slate-400 block">
                        Feature
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-700 block mt-0.5 truncate">
                        {property.feature}
                      </span>
                    </div>
                  </div>

                  {/* Agent Information */}
                  <div className="mt-4 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {/* Ochre Initial Badge */}
                      <div className="w-8 h-8 rounded-full bg-[#b58c4f] text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs">
                        {property.agent.initials}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-[12.5px] font-bold text-slate-800 leading-tight">
                          {property.agent.name}
                        </h4>
                        <p className="text-[10.5px] sm:text-[11px] text-slate-400 mt-0.5">
                          {property.agent.title} ·{" "}
                          <span className="text-slate-600 font-medium">
                            ★ {property.agent.rating}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Verified Scalloped Green Badge */}
                    <div
                      className="shrink-0 flex items-center justify-center"
                      title="Verified Agent"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[18px] h-[18px] sm:w-5 sm:h-5 drop-shadow-xs"
                      >
                        <path
                          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                          fill="#00BA51"
                        />
                        <path
                          d="m8.5 12.2 2.3 2.3 4.7-4.7"
                          stroke="#FFFFFF"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* View Property Dossier Button */}
                <div className="mt-5">
                  <button className="w-full py-2.5 sm:py-3 rounded-xl bg-[#f0f6fd] hover:bg-[#2f80ed] text-slate-700 hover:text-white border border-[#e2eefa]/80 font-semibold text-xs sm:text-[13px] transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.99]">
                    View Property Dossier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
