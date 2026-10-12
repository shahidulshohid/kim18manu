"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function HarmonizedOperations() {
  const aiFeatures = [
    "24/7 autonomous multilingual lead qualification and natural voice intake.",
    "Sub-second cadastral and spatial zoning cross-referencing across Bali & Jakarta.",
    "Automated schedule calendar handoff and optimal inspection route orchestration.",
    "Continuous rental yield aggregation across dynamic tourism databases.",
  ];

  const humanFeatures = [
    "High-touch negotiation, confidential advisory, and family estate nuances.",
    "PPAT & BPN sworn legal notarization with sovereign statutory indemnity.",
    "Licensed private bankers structuring bespoke Hak Pakai, PMA, or KPR facilities.",
    "Architectural site inspections examining structural integrity and construction quality.",
  ];

  return (
    <section
      id="harmonized-operations"
      className="relative w-full bg-[#f8fbff] py-16 sm:py-20 lg:py-28 overflow-hidden font-sans border-t border-sky-100/60"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-blue-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11.5px] sm:text-xs font-bold tracking-widest uppercase text-[#2f80ed] block mb-2.5">
            HARMONIZED OPERATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0f172a] leading-[1.16]">
            AI Handles the Work. People
            <br />
            Make the Connection.
          </h2>
          <p className="mt-3.5 text-slate-500 text-sm sm:text-[15.5px] font-normal leading-relaxed max-w-lg mx-auto">
            Machine intelligence unlocks speed; accredited human professionals
            deliver accountability.
          </p>
        </div>

        {/* 2-Column Harmonized Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 lg:mt-16 w-full">
          {/* Card 1: The AI Neural Layer */}
          <div className="group bg-white rounded-3xl p-7 sm:p-8 lg:p-9 border border-slate-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(47,128,237,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Title & Icon */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/harmonized/harmonizedImg1.png"
                    alt="AI Neural Layer"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-slate-900 group-hover:text-[#2f80ed] transition-colors">
                  The AI Neural Layer
                </h3>
              </div>

              {/* Bullet Features */}
              <ul className="mt-6 space-y-4 sm:space-y-4.5">
                {aiFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className="text-[#2f80ed] shrink-0 mt-0.5"
                    />
                    <span className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Human Elite Advisory */}
          <div className="group bg-white rounded-3xl p-7 sm:p-8 lg:p-9 border border-slate-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(47,128,237,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Title & Icon */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/harmonized/harmonizedImg2.png"
                    alt="Human Elite Advisory"
                    width={24}
                    height={24}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-slate-900 group-hover:text-[#2f80ed] transition-colors">
                  Human Elite Advisory
                </h3>
              </div>

              {/* Bullet Features */}
              <ul className="mt-6 space-y-4 sm:space-y-4.5">
                {humanFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className="text-[#2f80ed] shrink-0 mt-0.5"
                    />
                    <span className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
