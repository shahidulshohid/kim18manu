"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface InstitutionCategory {
  id: string;
  name: string;
  icon: string;
}

export default function InstitutionalNetwork() {
  const [activeCategory, setActiveCategory] = useState<string>("Notary & PPAT");

  const categories: InstitutionCategory[] = [
    {
      id: "01",
      name: "Notary & PPAT",
      icon: "/images/institution/institutionalImg1.png",
    },
    {
      id: "02",
      name: "Bank & KPR",
      icon: "/images/institution/institutionalImg2.png",
    },
    {
      id: "03",
      name: "Insurance",
      icon: "/images/institution/institutionalImg3.png",
    },
    {
      id: "04",
      name: "Contractors",
      icon: "/images/institution/institutionalImg4.png",
    },
    {
      id: "05",
      name: "Interior & Design",
      icon: "/images/institution/institutionalImg5.png",
    },
    {
      id: "06",
      name: "Management",
      icon: "/images/institution/institutionalImg6.png",
    },
  ];

  const workflowSteps = [
    "Request Triggered",
    "AI Match",
    "Schedule Consultation",
    "Service Delivery",
    "Escrow Payout",
    "Verified Rating",
  ];

  return (
    <section
      id="institutional-network"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden font-sans border-t border-slate-100"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11.5px] sm:text-xs font-bold tracking-widest uppercase text-[#2f80ed] block mb-2.5">
            INSTITUTIONAL B2B NETWORK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0f172a] leading-tight">
            Build Around the Property Journey.
          </h2>
          <p className="mt-3.5 text-slate-500 text-sm sm:text-[15.5px] font-normal leading-relaxed">
            Connect your professional services to qualified buyers at the
            precise moment of purchase intent.
          </p>
        </div>

        {/* 6 Institution Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-4.5 mt-10 lg:mt-14">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`group cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col items-center justify-center text-center ${
                  isSelected
                    ? "bg-[#f4f9fd] border border-sky-200 shadow-[0_8px_24px_rgba(47,128,237,0.08)] -translate-y-1"
                    : "bg-[#f8fbff]/80 hover:bg-[#f4f9fd] border border-slate-100/90 hover:border-sky-200/70 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Icon Container */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={cat.icon}
                    alt={cat.name}
                    width={32}
                    height={32}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-3 text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug group-hover:text-[#2f80ed] transition-colors">
                  {cat.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Workflow Pipeline Process Bar */}
        <div className="mt-8 sm:mt-10 max-w-5xl mx-auto">
          <div className="bg-[#f6faff] rounded-2xl sm:rounded-full py-3.5 sm:py-4 px-4 sm:px-8 border border-sky-100/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-2 text-xs sm:text-[13px] text-slate-600 font-medium text-center">
              {workflowSteps.map((step, idx) => (
                <React.Fragment key={step}>
                  <span className="hover:text-[#2f80ed] transition-colors cursor-default whitespace-nowrap">
                    {step}
                  </span>
                  {idx < workflowSteps.length - 1 && (
                    <span className="text-slate-300 select-none font-light hidden sm:inline">
                      |
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
