"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SiteVisitItem {
  id: string;
  propertyTitle: string;
  location: string;
  image: string;
  date: string;
  time: string;
  agentName: string;
  agentPhone: string;
  agentAvatar: string;
  status: "confirmed" | "pending" | "completed";
}

export default function SiteVisitsView() {
  const [visits] = useState<SiteVisitItem[]>([
    {
      id: "sv-1",
      propertyTitle: "Modern Villa with Ocean View",
      location: "Jl. Karang Mas No. 12, Jimbaran, Denpasar, Bali",
      image: "/images/dashboard/customer/home/homeImg1.png",
      date: "Tomorrow, Oct 14",
      time: "10:00 AM - 11:30 AM",
      agentName: "Budi Santoso",
      agentPhone: "+62 811-987-6543",
      agentAvatar: "B",
      status: "confirmed",
    },
    {
      id: "sv-2",
      propertyTitle: "Cozy Apartment in Business District",
      location: "Tower 2, Fl 18, SCBD Lot 11, Jakarta Selatan",
      image: "/images/dashboard/customer/home/homeImg2.png",
      date: "Friday, Oct 16",
      time: "02:30 PM - 03:30 PM",
      agentName: "Siti Rahayu",
      agentPhone: "+62 813-234-5678",
      agentAvatar: "S",
      status: "confirmed",
    },
    {
      id: "sv-3",
      propertyTitle: "Spacious Family House with Garden",
      location: "Jl. Dago Pakar Permai 4B, Bandung, Jawa Barat",
      image: "/images/dashboard/customer/home/homeImg3.png",
      date: "Monday, Oct 19",
      time: "11:00 AM - 12:00 PM",
      agentName: "Dimas Pratama",
      agentPhone: "+62 818-765-4321",
      agentAvatar: "D",
      status: "pending",
    },
  ]);

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Site Visits
            </h1>
            <Badge variant="blue" className="bg-blue-100 text-blue-700">
              {visits.length} Upcoming
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your on-site physical and virtual property tours
          </p>
        </div>

        <Link href="/dashboard/customer/discover">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Schedule New Visit
          </Button>
        </Link>
      </div>

      {/* Visits List */}
      <div className="space-y-4">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="flex flex-col lg:flex-row rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md transition-all gap-5 items-stretch lg:items-center justify-between"
          >
            {/* Left Image & Property Info */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative h-28 w-full sm:w-44 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src={visit.image}
                  alt={visit.propertyTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="blue"
                    className={
                      visit.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {visit.status === "confirmed" ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        Confirmed Tour
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-amber-600" />
                        Awaiting Confirmation
                      </span>
                    )}
                  </Badge>
                </div>

                <h3 className="font-bold text-base text-slate-900 line-clamp-1">
                  {visit.propertyTitle}
                </h3>

                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{visit.location}</span>
                </p>

                {/* Date & Time pill */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                    <Calendar className="h-3.5 w-3.5" />
                    {visit.date}
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                    <Clock className="h-3.5 w-3.5" />
                    {visit.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Assigned Agent & Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div className="flex items-center gap-2.5 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  {visit.agentAvatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{visit.agentName}</p>
                  <p className="text-[11px] text-slate-400">Assigned Agent</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${visit.agentPhone}`}
                  className="flex-1 sm:flex-none h-9 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </a>
                <Link
                  href="/dashboard/customer/messages"
                  className="flex-1 sm:flex-none h-9 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Chat
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
