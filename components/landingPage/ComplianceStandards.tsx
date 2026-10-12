"use client";

import React from "react";
import Image from "next/image";

export interface ComplianceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export default function ComplianceStandards() {
  const cards: ComplianceCard[] = [
    {
      id: "01",
      icon: "/images/compliance/complianceImg1.png",
      title: "100% AREBI Certified",
      description:
        "Every Participating Broker Holds Active Registration With The Indonesian Real Estate Broker Association.",
    },
    {
      id: "02",
      icon: "/images/compliance/complianceImg2.png",
      title: "Verified Legal Titles",
      description:
        "Direct Algorithmic And Manual Notarization Against BPN Land Registry Records (SHM, SHGB, Hak Pakai).",
    },
    {
      id: "03",
      icon: "/images/compliance/complianceImg3.png",
      title: "Institutional Escrow",
      description:
        "Purchase Deposits Remain Secure In Insured Partner Bank Escrow Accounts Until Full Title Transfer Validation.",
    },
    {
      id: "04",
      icon: "/images/compliance/complianceImg4.png",
      title: "Bank-Grade Encryption",
      description:
        "End-To-End Encrypted Negotiation Logs, Financial Dossiers, And Identity Verification.",
    },
    {
      id: "05",
      icon: "/images/compliance/complianceImg5.png",
      title: "Transparent Milestones",
      description:
        "Real-Time Cad Astral Dashboard Reveals Deed Drafting, Tax Clearance (BPHTB), And BPN Endorsement Status.",
    },
    {
      id: "06",
      icon: "/images/compliance/complianceImg6.png",
      title: "Audited Reviews",
      description:
        "100% Genuine Verified Buyer Feedback Anchored To Completed Notarized Transactions, Eliminating Fraudulent Acclaim.",
    },
  ];

  return (
    <section
      id="compliance-standards"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden font-sans border-t border-slate-100"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11.5px] sm:text-xs font-bold tracking-widest uppercase text-[#2f80ed] block mb-2.5">
            COMPLIANCE STANDARDS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0f172a] leading-tight">
            Built for Trust.
          </h2>
          <p className="mt-3.5 text-slate-500 text-sm sm:text-[15.5px] font-normal leading-relaxed max-w-xl mx-auto">
            Every listing, legal certificate, and financial conduit meets
            institutional Indonesian requirements.
          </p>
        </div>

        {/* 6 Compliance Cards Grid (3 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mt-12 lg:mt-16 w-full">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 border border-slate-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_32px_rgba(47,128,237,0.07)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon + Title */}
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={24}
                      height={24}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  </div>
                  <h3 className="text-base sm:text-[17px] font-bold text-slate-900 group-hover:text-[#2f80ed] transition-colors leading-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-4 text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal">
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
