"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Mic,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Building2,
  Paintbrush,
  Briefcase,
  Hammer,
  Home as HomeIcon,
  CheckCircle2,
} from "lucide-react";

export default function BannerPage() {
  const [searchQuery, setSearchQuery] = useState(
    "Find Me A Villa In Bali Near Seminyak Under 4B IDR, Preferably Suitable For Rental."
  );
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  const filters = [
    { name: "Construction", icon: Building2 },
    { name: "Interior Design", icon: Paintbrush },
    { name: "Consulting", icon: Briefcase },
    { name: "Renovation", icon: Hammer },
    { name: "Real Estate", icon: HomeIcon },
  ];

  const previewCards = [
    {
      id: "01",
      title: "Residential complex in Alanya",
      category: "Interior design",
      image: "/bannerSmallImg1.png",
      price: "$340,000",
      location: "Alanya, Turkey",
      rating: "4.9",
    },
    {
      id: "02",
      title: "Minimalist Scandinavian Living",
      category: "Interior design",
      image: "/bannerSmallImg2.png",
      price: "$480,000",
      location: "Seminyak, Bali",
      rating: "5.0",
    },
  ];

  const handleVoiceToggle = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery);
      setTimeout(() => setSubmittedQuery(null), 4000);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-[#c3e3fc] flex flex-col font-sans selection:bg-[#2f80ed] selection:text-white">
      {/* Dynamic Sky Background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#8fc7f7] via-[#bfe2fc] to-[#e1f0fc] z-0" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-white/30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-10 right-1/3 w-[500px] h-[300px] bg-sky-200/40 rounded-full blur-2xl pointer-events-none z-0" />

      {/* Main Hero Background Image (bannerImg1.png) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none flex items-end justify-center">
        <div className="relative w-full h-full min-h-screen">
          <Image
            src="/bannerImg1.png"
            alt="Modern luxury villa architecture with pool"
            fill
            priority
            className="object-cover object-[center_35%] lg:object-[center_28%] scale-100"
            sizes="100vw"
            quality={100}
          />
          {/* Subtle gradient overlays for smooth text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent lg:from-white/40 lg:via-transparent lg:to-transparent" />
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#8fc7f7]/90 via-[#a7d5fa]/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-30 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-5 pb-3">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <a href="#" className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt="PropertiQU.AI Logo"
                width={155}
                height={38}
                priority
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </a>
          </div>

          {/* Center: Floating Navigation Pill */}
          <nav className="hidden md:flex items-center bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center space-x-8 text-[14px] font-medium text-slate-700">
              <a
                href="#"
                className="text-slate-900 font-semibold hover:text-[#2f80ed] transition-colors relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#2f80ed] after:rounded-full"
              >
                Home
              </a>
              <a
                href="#how-it-works"
                className="text-slate-600 hover:text-[#2f80ed] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#ai-assistant"
                className="text-slate-600 hover:text-[#2f80ed] transition-colors flex items-center gap-1.5"
              >
                <span>AI Assistant</span>
                <span className="bg-blue-100 text-[#2f80ed] text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                  New
                </span>
              </a>
            </div>
          </nav>

          {/* Right: Auth Action Buttons */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href="#login"
              className="text-[14px] font-medium text-slate-800 hover:text-[#2f80ed] transition-colors px-2 py-1"
            >
              Log In
            </a>
            <a
              href="#get-started"
              className="bg-[#2f80ed] hover:bg-[#1f70dd] text-white text-[14px] font-medium px-6 py-2.5 rounded-full shadow-[0_4px_14px_rgba(47,128,237,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-1.5"
            >
              <span>Get Started</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-800 shadow-sm border border-white/60"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl p-5 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-900 font-semibold text-base py-1"
            >
              Home
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-medium text-base py-1"
            >
              How It Works
            </a>
            <a
              href="#ai-assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-medium text-base py-1 flex items-center justify-between"
            >
              <span>AI Assistant</span>
              <span className="bg-blue-100 text-[#2f80ed] text-xs px-2 py-0.5 rounded-full font-semibold">
                New
              </span>
            </a>
            <hr className="border-slate-100 my-1" />
            <div className="flex flex-col gap-2.5">
              <a
                href="#login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-slate-800 font-medium text-sm border border-slate-200 rounded-full"
              >
                Log In
              </a>
              <a
                href="#get-started"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 bg-[#2f80ed] text-white font-medium text-sm rounded-full shadow-md"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Hero Content Area */}
      <main className="relative z-20 flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between pt-6 sm:pt-10 pb-8 lg:pb-12 min-h-[calc(100vh-80px)]">
        {/* Top Hero Section: Title, Subtitle, CTA Button */}
        <div className="max-w-2xl mt-2 sm:mt-4 lg:mt-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-extrabold tracking-tight text-[#0f172a] leading-[1.08] drop-shadow-sm">
            Property Discovery,
            <br />
            <span className="text-[#2f80ed]">Reimagined by AI.</span>
          </h1>

          <p className="mt-4 sm:mt-5 text-slate-600 text-sm sm:text-base md:text-[15.5px] leading-relaxed max-w-[530px] font-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            Search naturally, discover intelligently, connect with trusted property professionals,
            and move from property discovery to transaction in one intelligent ecosystem.
          </p>

          <div className="mt-6 sm:mt-7">
            <button
              onClick={() => {
                const element = document.getElementById("ai-search-box");
                element?.scrollIntoView({ behavior: "smooth" });
                element?.focus();
              }}
              className="group inline-flex items-center gap-2.5 bg-[#2f80ed] hover:bg-[#1d6cd8] text-white text-[14.5px] font-semibold px-6 py-3 rounded-full shadow-[0_6px_20px_rgba(47,128,237,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <span>Our Property</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={14} className="stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Area: Left (Filter Chips + AI Prompt Input) & Right (Property Preview Slider) */}
        <div className="mt-12 sm:mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          {/* Left Column (Tags and AI Search Box) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Filter Tags / Category Pills */}
            <div className="flex flex-col gap-2.5">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-2.5">
                {filters.slice(0, 2).map((item) => {
                  const isSelected = activeFilter === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() =>
                        setActiveFilter(isSelected ? null : item.name)
                      }
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                        isSelected
                          ? "bg-[#2f80ed] text-white shadow-md shadow-blue-500/30 scale-105"
                          : "bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md border border-white/80 hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center gap-2.5">
                {filters.slice(2).map((item) => {
                  const isSelected = activeFilter === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() =>
                        setActiveFilter(isSelected ? null : item.name)
                      }
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.04)] ${
                        isSelected
                          ? "bg-[#2f80ed] text-white shadow-md shadow-blue-500/30 scale-105"
                          : "bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md border border-white/80 hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Glassmorphic AI Prompt Search Input */}
            <div className="w-full max-w-[530px] pt-1">
              <form
                onSubmit={handleSearchSubmit}
                className="relative group bg-white/45 hover:bg-white/55 focus-within:bg-white/70 backdrop-blur-xl border border-white/80 hover:border-white rounded-2xl p-1.5 sm:p-2 flex items-center gap-2 shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <input
                  id="ai-search-box"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything in natural language..."
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 text-xs sm:text-[13.5px] font-normal px-3 py-1.5 outline-none leading-snug"
                />

                {/* Voice / Mic Button */}
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  title="Voice Search"
                  className={`p-2 rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "text-slate-600 hover:text-[#2f80ed] hover:bg-white/60"
                  }`}
                >
                  <Mic size={17} className={isListening ? "animate-bounce" : ""} />
                </button>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  title="Submit AI Search"
                  className="bg-[#2f80ed] hover:bg-[#1d6cd8] active:scale-95 text-white p-2 sm:p-2.5 rounded-full flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30 transition-all duration-200 cursor-pointer"
                >
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </form>

              {/* Quick Prompt Suggestions helper */}
              <div className="flex items-center gap-2 mt-2 px-1 text-[11px] text-slate-600 font-medium">
                <Sparkles size={12} className="text-[#2f80ed] shrink-0" />
                <span className="shrink-0">Try:</span>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setSearchQuery(
                        "Find luxury 4-bedroom villa with private pool in Bali under $800k"
                      )
                    }
                    className="hover:text-[#2f80ed] underline underline-offset-2 truncate cursor-pointer"
                  >
                    Bali Luxury Villa
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSearchQuery(
                        "Residential complex in Alanya with modern Scandinavian interior design"
                      )
                    }
                    className="hover:text-[#2f80ed] underline underline-offset-2 truncate cursor-pointer"
                  >
                    Alanya Interior Design
                  </button>
                </div>
              </div>

              {/* Feedback Alert toast on search */}
              {submittedQuery && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs flex items-center justify-between gap-3 shadow-xl animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>
                      AI is analyzing matches for: &ldquo;{submittedQuery.slice(0, 42)}...&rdquo;
                    </span>
                  </div>
                  <span className="text-[10px] bg-blue-500 px-2 py-0.5 rounded-full">
                    98% Match
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Property Card Carousel & Indicators */}
          <div className="lg:col-span-5 flex flex-col justify-end items-start lg:items-end">
            {/* Slide Index / Number Indicator Header */}
            <div className="flex items-center gap-4 mb-2.5 px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <span className="text-slate-900 font-bold">01</span>
                <span className="w-12 sm:w-16 h-[1.5px] bg-slate-400/60 rounded-full overflow-hidden relative">
                  <span
                    className="absolute inset-y-0 left-0 bg-[#2f80ed] rounded-full transition-all duration-300"
                    style={{
                      width: `${((activeSlide + 1) / 2) * 100}%`,
                    }}
                  />
                </span>
                <span className="text-slate-500">02</span>
              </div>

              {/* Slider Arrow Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setActiveSlide((prev) =>
                      prev === 0 ? 1 : prev - 1
                    )
                  }
                  className="p-1 rounded-full bg-white/70 hover:bg-white text-slate-700 shadow-sm border border-white/60 transition-all cursor-pointer"
                  aria-label="Previous property"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() =>
                    setActiveSlide((prev) =>
                      prev === 1 ? 0 : prev + 1
                    )
                  }
                  className="p-1 rounded-full bg-white/70 hover:bg-white text-slate-700 shadow-sm border border-white/60 transition-all cursor-pointer"
                  aria-label="Next property"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Floating Cards Container */}
            <div className="flex items-center gap-3.5 w-full overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 justify-start lg:justify-end">
              {/* Card 1 (Primary Active Card) */}
              <div
                onClick={() => setActiveSlide(0)}
                className={`group cursor-pointer transition-all duration-300 transform rounded-2xl p-2.5 sm:p-3 flex items-center gap-3.5 min-w-[280px] sm:min-w-[310px] ${
                  activeSlide === 0
                    ? "bg-[#eaf4fc]/95 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] scale-100 ring-2 ring-[#2f80ed]/30"
                    : "bg-white/80 backdrop-blur-md border border-white/60 shadow-sm opacity-85 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >
                <div className="relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 shadow-inner bg-slate-100">
                  <Image
                    src="/bannerSmallImg1.png"
                    alt="Residential complex in Alanya"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="100px"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="text-xs sm:text-[13.5px] font-semibold text-slate-800 leading-snug truncate group-hover:text-[#2f80ed] transition-colors">
                    Residential complex in Alanya
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 capitalize font-normal">
                    Interior design
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] font-medium text-slate-600">
                    <span className="text-[#2f80ed] font-semibold">$340,000</span>
                    <span>•</span>
                    <span className="text-amber-600">★ 4.9</span>
                  </div>
                </div>
              </div>

              {/* Card 2 (Secondary Card) */}
              <div
                onClick={() => setActiveSlide(1)}
                className={`group cursor-pointer transition-all duration-300 transform rounded-2xl p-2.5 sm:p-3 flex items-center gap-3.5 min-w-[280px] sm:min-w-[310px] ${
                  activeSlide === 1
                    ? "bg-[#eaf4fc]/95 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] scale-100 ring-2 ring-[#2f80ed]/30"
                    : "bg-white/80 backdrop-blur-md border border-white/60 shadow-sm opacity-85 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >
                <div className="relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 shadow-inner bg-slate-100">
                  <Image
                    src="/bannerSmallImg2.png"
                    alt="Minimalist Bohemian Living"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="100px"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="text-xs sm:text-[13.5px] font-semibold text-slate-800 leading-snug truncate group-hover:text-[#2f80ed] transition-colors">
                    Minimalist Living Room
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 capitalize font-normal">
                    Interior design
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] font-medium text-slate-600">
                    <span className="text-[#2f80ed] font-semibold">$480,000</span>
                    <span>•</span>
                    <span className="text-amber-600">★ 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
