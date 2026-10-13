"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle,
  Clock,
  FileText,
  Download,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TransactionsView() {
  const transactions = [
    {
      id: "tx-1",
      propertyTitle: "Modern Villa with Ocean View",
      location: "Jimbaran, Denpasar, Bali",
      image: "/images/dashboard/customer/home/homeImg1.png",
      totalPrice: "IDR 4,500,000,000",
      depositAmount: "IDR 450,000,000 (10%)",
      status: "In Progress",
      currentStage: "Cadastral Deed Verification & PPAT Drafting",
      steps: [
        { label: "Letter of Intent (LOI) Signed", done: true, date: "Oct 02, 2026" },
        { label: "Escrow Deposit Secured", done: true, date: "Oct 06, 2026" },
        { label: "BPN Cadastral & Tax Clearance", done: true, date: "Oct 11, 2026" },
        { label: "AJB Signing with Notary", done: false, date: "Est. Oct 20, 2026" },
        { label: "Title Deed Handover", done: false, date: "Est. Oct 25, 2026" },
      ],
      notary: "Hendra Wijaya, S.H., M.Kn. (Denpasar PPAT)",
    },
  ];

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Property Transactions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track purchase agreements, escrow payments, cadastral checks, and notary closings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="blue" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" />
            100% Escrow Protected
          </Badge>
        </div>
      </div>

      {/* Transaction Card */}
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-xs mb-6 space-y-6"
        >
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative h-20 w-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                <Image src={tx.image} alt={tx.propertyTitle} fill className="object-cover" />
              </div>
              <div>
                <Badge variant="blue" className="bg-blue-100 text-blue-700 mb-1">
                  {tx.status}
                </Badge>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {tx.propertyTitle}
                </h3>
                <p className="text-xs text-slate-400">{tx.location}</p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-slate-400 font-medium">Agreed Purchase Value</span>
              <p className="text-xl sm:text-2xl font-black text-blue-600">{tx.totalPrice}</p>
              <p className="text-xs text-slate-500 mt-0.5">Escrow Deposit: {tx.depositAmount}</p>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Closing Milestones Pipeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {tx.steps.map((st, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border ${
                    st.done
                      ? "bg-blue-50/70 border-blue-200/80 text-blue-900"
                      : "bg-slate-50/60 border-slate-200 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {st.done ? (
                      <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wide">
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="text-xs font-bold line-clamp-2 leading-snug">{st.label}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">{st.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents & Assigned Notary row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Assigned Notary / PPAT: </span>
              {tx.notary}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-blue-600" />
                View Draft Deed (AJB)
              </Button>
              <Button size="sm" className="bg-blue-600 text-white text-xs flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Download Agreement
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
