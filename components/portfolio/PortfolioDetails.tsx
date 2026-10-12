"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Dumbbell,
  Armchair,
  Utensils,
  Waves,
  Zap,
  MapPin,
} from "lucide-react";
import Footer from "@/components/landingPage/Footer";

export default function PortfolioDetails() {
  const amenities = [
    { name: "Gymnasium", icon: Dumbbell },
    { name: "Living Room", icon: Armchair },
    { name: "Dining Area", icon: Utensils },
    { name: "Swimming Pool", icon: Waves },
    { name: "Power Backup", icon: Zap },
    { name: "Ideal Location", icon: MapPin },
  ];

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-800 antialiased flex flex-col">
      {/* Top Floating Navigation Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </nav>

      {/* 1. Hero Banner Section */}
      <section className="relative w-full h-[450px] sm:h-[540px] lg:h-[620px] overflow-hidden bg-slate-900 pt-16">
        {/* Exterior Building Image */}
        <Image
          src="/images/portFolio/portFolioDetails/portFolioImg1.png"
          alt="Residential Fort'D Exterior Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />

        {/* Banner Content Container */}
        <div className="relative z-10 max-w-[1440px] h-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-8 sm:pb-12 lg:pb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            {/* Title & Category (Left) */}
            <div className="max-w-2xl">
              <span className="text-[#d4a437] font-semibold text-xs sm:text-[13px] tracking-widest uppercase drop-shadow-sm block">
                RESIDENCE
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mt-1 drop-shadow-md">
                Residential Fort&apos;D
              </h1>
            </div>

            {/* Location & Price Floating Card (Right) */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/60 flex items-center justify-between sm:justify-start gap-6 sm:gap-10 shrink-0">
              {/* Location */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  LOCATION
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800 block mt-0.5">
                  Andreas Vesaliusstraat, Louvain Belgium
                </span>
              </div>

              {/* Price */}
              <div className="border-l border-slate-200/80 pl-6 sm:pl-8">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  PRICE
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800 block mt-0.5">
                  From $2,389/pp
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Middle Section: Description, Amenities & Bedroom Image */}
      <section className="w-full bg-[#f8fafd] py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Description & Amenities Grid */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-slate-600 font-normal leading-relaxed max-w-xl">
                This visualization project is about the building in the
                historical center of Omsk city, Russia. Initially built as a
                hotel for the 2018 FIFA World Cup, the project was not completed
                as supposed.
              </p>

              {/* Section Heading */}
              <h2 className="mt-8 sm:mt-10 text-xs sm:text-[12.5px] font-bold text-slate-900 tracking-wider uppercase">
                PROJECT AMENITIES
              </h2>

              {/* 6 Amenities Icon Cards Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 mt-4">
                {amenities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="bg-white border border-[#e2eaf2] rounded-xl p-3 sm:py-4 flex flex-col items-center justify-center gap-2 text-center shadow-xs hover:border-[#1d61f2] hover:shadow-sm transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#f0f6fd] group-hover:bg-[#1d61f2]/10 flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4 text-[#1d61f2]" />
                      </div>
                      <span className="text-[10px] sm:text-[10.5px] font-medium text-slate-600 block leading-tight">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Bedroom Portrait Visualization Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-lg bg-slate-100 border border-slate-200/60">
                <Image
                  src="/images/portFolio/portFolioDetails/portFolioImg2.png"
                  alt="Modern Bedroom Visualization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center hover:scale-103 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Section: Property Highlight & 3 Gallery Images */}
      <section className="w-full bg-white py-14 sm:py-20 flex-1">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Section Header: Title (Left) and Description (Right) */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-8 pb-8">
            <h2 className="text-xs sm:text-[12.5px] font-bold text-slate-900 tracking-wider uppercase shrink-0">
              PROPERTY HIGHLIGHT
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-xl">
              This is your opportunity to experience luxury, comfort, and
              convenience like never before. Contact us today for a private tour
              and explore all that this exceptional property has to offer.
            </p>
          </div>

          {/* 3 Gallery Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 mt-2 items-center">
            {/* Image 1: Kitchen & Dining Area */}
            <div className="sm:col-span-4 relative h-[230px] sm:h-[280px] lg:h-[310px] rounded-2xl overflow-hidden shadow-sm bg-slate-100 group border border-slate-100">
              <Image
                src="/images/portFolio/portFolioDetails/portFolioImg3.png"
                alt="Kitchen & Dining View"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Image 2: Living Room with Fireplace (Taller & Wider Middle Image) */}
            <div className="sm:col-span-5 relative h-[280px] sm:h-[350px] lg:h-[385px] rounded-2xl overflow-hidden shadow-md bg-slate-100 group border border-slate-100">
              <Image
                src="/images/portFolio/portFolioDetails/portFolioImg4.png"
                alt="Spacious Living Room"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Image 3: Hallway / Entryway */}
            <div className="sm:col-span-3 relative h-[230px] sm:h-[280px] lg:h-[310px] rounded-2xl overflow-hidden shadow-sm bg-slate-100 group border border-slate-100">
              <Image
                src="/images/portFolio/portFolioDetails/portFolioImg5.png"
                alt="Modern Hallway & Foyer"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
