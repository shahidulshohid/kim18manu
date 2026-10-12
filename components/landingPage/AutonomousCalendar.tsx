"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function AutonomousCalendar() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    "1. AI Search",
    "2. Property Match",
    "3. Contact Agent",
    "4. Schedule Visit",
    "5. AI Calendar Reminder",
    "6. Physical / Drone Site Visit",
  ];

  const cards: ServiceCard[] = [
    {
      id: "01",
      icon: "/images/autonomous/autonomousImg1.png",
      title: "Property Agents",
      subtitle: "Licensed AREBI Specialists",
      description:
        "Direct Liaison With Tested Regional Brokerages With Verified Off-Market Access In Bali, Jakarta, And Lombok.",
    },
    {
      id: "02",
      icon: "/images/autonomous/autonomousImg2.png",
      title: "Bank / Mortgage",
      subtitle: "BCA, Mandiri, CIMB KPR",
      description:
        "Instant Institutional KPR Pre-Qualification And Cross-Border Currency Conversion For Overseas Purchasers.",
    },
    {
      id: "03",
      icon: "/images/autonomous/autonomousImg3.png",
      title: "Certified Notary",
      subtitle: "PPAT Legal Verification",
      description:
        "Deed Registration, BPN Land Validation, And Sovereign Escrow Protection Prior To Release Of Capital.",
    },
    {
      id: "04",
      icon: "/images/autonomous/autonomousImg4.png",
      title: "Insurance & Underwriting",
      subtitle: "Allianz & Zurich Underwriting",
      description:
        "Seismic, Volcanic, And Environmental Hazard Underwriting Tailored To Indonesian Archipelago Parameters.",
    },
    {
      id: "05",
      icon: "/images/autonomous/autonomousImg5.png",
      title: "Architecture & Build",
      subtitle: "Turnkey Villa Contractors",
      description:
        "Vetted General Contractors And Architectural Masters Specializing In Tropical Modernism And MEP Standards.",
    },
    {
      id: "06",
      icon: "/images/autonomous/autonomousImg6.png",
      title: "Facility & Solar",
      subtitle: "Renewable & Villa Management",
      description:
        "Post-Transaction Hospitality Management, Solar Grid Integration, And Remote Surveillance Maintenance.",
    },
  ];

  return (
    <section
      id="ai-assistant"
      className="relative w-full bg-[#f8fbff] py-16 sm:py-20 lg:py-28 overflow-hidden font-sans border-t border-sky-100/60"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11.5px] sm:text-xs font-bold tracking-widest uppercase text-[#2f80ed] block mb-2.5">
            AUTONOMOUS CALENDAR HANDOFF
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0f172a] leading-tight">
            From Search to Site Visit.
          </h2>
          <p className="mt-3.5 text-slate-500 text-sm sm:text-[15.5px] font-normal leading-relaxed">
            Direct calendar orchestration between high-intent buyers, accredited
            brokers, and private chauffeurs.
          </p>
        </div>

        {/* Process Steps Bar */}
        <div className="mt-8 sm:mt-10 mb-12 lg:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-3.5">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step}
                  onClick={() => setActiveStep(idx)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-[12.5px] font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white text-slate-900 border border-sky-200 shadow-[0_4px_14px_rgba(47,128,237,0.12)] font-semibold scale-105"
                      : "bg-white/80 hover:bg-white text-slate-600 border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-200 hover:text-[#2f80ed]"
                  }`}
                >
                  {step}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Cards Grid (3 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-2xl sm:rounded-[22px] p-6 sm:p-7 border border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_32px_rgba(47,128,237,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon + Title & Subtitle */}
                <div className="flex items-center gap-4">
                  {/* Blue Icon Container */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#258cfb] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={24}
                      height={24}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-tight group-hover:text-[#2f80ed] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[11.5px] sm:text-xs text-slate-400 mt-1 font-medium">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 sm:mt-5 text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
