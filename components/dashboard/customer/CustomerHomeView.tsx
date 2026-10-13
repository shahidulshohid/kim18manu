"use client";

import React from "react";
import AiSearchCard from "./AiSearchCard";
import QuickAccessGrid from "./QuickAccessGrid";
import RecommendedProperties from "./RecommendedProperties";

export default function CustomerHomeView() {
  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Greeting Section */}
      <div className="mb-6 sm:mb-8">
        <span className="text-xs sm:text-sm font-medium text-slate-400">
          Good morning,
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-slate-900 mt-0.5">
          Welcome back, Anisa
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
          Here&apos;s what&apos;s new in your property search today.
        </p>
      </div>

      {/* 2. AI-Powered Search Card */}
      <AiSearchCard />

      {/* 3. Quick Access Grid */}
      <QuickAccessGrid />

      {/* 4. Recommended for You Section */}
      <RecommendedProperties />
    </div>
  );
}
