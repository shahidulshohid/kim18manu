"use client";

import React from "react";
import {
  Wrench,
  ShieldCheck,
  Paintbrush,
  Hammer,
  FileCheck2,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ServicesView() {
  const services = [
    {
      id: "srv-1",
      title: "Legal & Cadastral Deed Verification",
      icon: ShieldCheck,
      description: "Direct BPN land title verification, checking zoning restrictions, and tax clearance guarantee before purchase.",
      duration: "1-2 Business Days",
      price: "IDR 3,500,000",
      featured: true,
    },
    {
      id: "srv-2",
      title: "Notary / PPAT Closing Escrow",
      icon: FileCheck2,
      description: "Drafting Akta Jual Beli (AJB), authentic deed certification, and official name transfer with certified notaries.",
      duration: "3-5 Business Days",
      price: "From 1% of Transaction",
      featured: false,
    },
    {
      id: "srv-3",
      title: "Architectural & Interior Design",
      icon: Paintbrush,
      description: "Turnkey Scandinavian and tropical modern interior fit-outs with 3D architectural renders and staging.",
      duration: "Custom Timeline",
      price: "Custom Estimate",
      featured: false,
    },
    {
      id: "srv-4",
      title: "Multi-Bank Mortgage (KPR) Advisory",
      icon: Landmark,
      description: "Single application to 8 partner banks (BCA, Mandiri, CIMB, BNI) with pre-negotiated preferential interest rates.",
      duration: "Instant Pre-approval",
      price: "Free for Buyers",
      featured: true,
    },
    {
      id: "srv-5",
      title: "Comprehensive Building Inspection",
      icon: Hammer,
      description: "Engineering structural inspection, moisture & plumbing check, roof integrity, and electrical safety audit.",
      duration: "24 Hours Report",
      price: "IDR 2,800,000",
      featured: false,
    },
    {
      id: "srv-6",
      title: "Property Management & Vacation Rental",
      icon: Wrench,
      description: "Full guest management, Airbnb listing optimization, maintenance crew, and automated monthly yield payouts.",
      duration: "Ongoing Service",
      price: "15% Management Fee",
      featured: false,
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Property Services & Concierge
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          End-to-end verified professional services for your real estate investments
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>
                  {srv.featured && (
                    <Badge variant="blue" className="bg-blue-100 text-blue-700">
                      Popular
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1.5">{srv.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-400 font-medium">Timeline: {srv.duration}</span>
                  <span className="font-bold text-blue-600">{srv.price}</span>
                </div>

                <Button className="w-full h-9 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors">
                  <span>Request Service</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
