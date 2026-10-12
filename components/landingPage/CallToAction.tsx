"use client";

import React from "react";
import { Mic } from "lucide-react";

export default function CallToAction() {
  const handleTalkToAi = () => {
    const input = document.getElementById("ai-search-box");
    if (input) {
      input.scrollIntoView({ behavior: "smooth" });
      input.focus();
    }
  };

  const handleStartExploring = () => {
    const portfolio = document.getElementById("portfolio");
    if (portfolio) {
      portfolio.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="cta"
      className="relative w-full bg-[#2f80ed] py-20 sm:py-24 lg:py-28 overflow-hidden font-sans"
    >
      {/* Subtle ambient lighting inside the blue background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.18] max-w-3xl mx-auto">
          Your Next Property Starts With
          <br />
          a Conversation.
        </h2>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-white/90 text-sm sm:text-[15.5px] font-normal leading-relaxed max-w-xl mx-auto">
          Search naturally. Discover intelligently. Connect
          <br className="hidden sm:inline" />{" "}
          confidently across Indonesia&apos;s prime luxury archipelago.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-8 sm:mt-10">
          {/* Start Exploring Button */}
          <button
            onClick={handleStartExploring}
            className="bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs sm:text-[14px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Start Exploring
          </button>

          {/* Talk to AI Assistant Button */}
          <button
            onClick={handleTalkToAi}
            className="bg-white hover:bg-slate-50 text-[#2f80ed] font-semibold text-xs sm:text-[14px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
          >
            <Mic size={16} className="text-[#2f80ed] stroke-[2.4]" />
            <span>Talk to AI Assistant</span>
          </button>
        </div>
      </div>
    </section>
  );
}
