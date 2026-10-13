"use client";

import React from "react";
import Link from "next/link";
import { Bookmark, Calendar, MessageSquare, Activity, ArrowUpRight } from "lucide-react";
import { quickAccessItems } from "./data";
import { cn } from "@/lib/utils";

const iconMap = {
  bookmark: Bookmark,
  calendar: Calendar,
  message: MessageSquare,
  activity: Activity,
};

export default function QuickAccessGrid() {
  return (
    <section className="mt-8">
      {/* Section Title */}
      <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-3.5 sm:mb-4">
        Quick Access
      </h3>

      {/* 4 Cards Grid - Responsive across mobile, tablet, desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickAccessItems.map((item) => {
          const Icon = iconMap[item.iconName];

          return (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] hover:border-blue-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-4">
                {/* Rounded Icon Box with subtle blue accent */}
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                  <Icon className="h-5 w-5 stroke-[2]" />
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-400 font-medium mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
