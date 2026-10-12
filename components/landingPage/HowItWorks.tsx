"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mic,
  Sparkles,
  Bot,
  Globe2,
  Volume2,
  CheckCircle2,
  Calendar,
  Building,
  Check,
} from "lucide-react";

export default function HowItWorks() {
  const [activeLang, setActiveLang] = useState("Bahasa Indonesia");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const languages = [
    {
      name: "Bahasa Indonesia",
      query: "“Carikan 3 villa di dekat Seminyak dengan okupansi sewa tinggi.”",
      response:
        "Menganalisis 142 listing Bali... Berikut adalah tiga villa terverifikasi di Seminyak dengan okupansi historis di atas 78% dan izin Pondok Wisata lengkap. Apakah Anda ingin saya jadwalkan inspeksi VIP untuk hari Sabtu?",
    },
    {
      name: "English (US/UK)",
      query: "“Find me three villas near Seminyak with high rental occupancy.”",
      response:
        "Analyzing 142 Bali listings... Here are three verified villas in Seminyak with historical occupancy exceeding 78% and verified Pondok Wisata rental licenses. Would you like me to schedule a VIP inspection for Saturday?",
    },
    {
      name: "Mandarin (中文)",
      query: "“帮我在水明漾附近找三套高出租率的豪华别墅。”",
      response:
        "正在分析 142 套巴厘岛房源... 这是水明漾地区历史出租率超过 78% 且拥有完整 Pondok Wisata 租赁许可证的三套精选别墅。需要我为您安排周六的 VIP 专属看房吗？",
    },
    {
      name: "Korean (한국어)",
      query: "“스미냑 근처에서 높은 임대 수익률을 가진 풀빌라 3곳을 찾아줘.”",
      response:
        "발리 매물 142개를 실시간 분석 중입니다... 과거 평균 임대 가동률 78% 이상 및 정식 Pondok Wisata 면허가 검증된 빌라 3곳을 찾았습니다. 이번 주 토요일 VIP 프라이빗 투어를 예약해 드릴까요?",
    },
  ];

  const currentLangData =
    languages.find((l) => l.name === activeLang) || languages[1];

  const toggleSpeak = () => {
    setIsSpeaking((prev) => !prev);
  };

  const steps = [
    {
      step: "01",
      image: "/images/howItWork/howItWorkImg1.png",
      title: "Tell AI What You Need",
      description:
        "Speak in any language or type your exact lifestyle, capital requirement, or commercial yield parameters. No rigid dropdown menus.",
      highlight: "Conversational & Natural",
    },
    {
      step: "02",
      image: "/images/howItWork/howItWorkImg2.png",
      title: "Discover the Right Properties",
      description:
        "Deep neural matching cross-references public and off-market inventory, zoning constraints, legal validity, and empirical yield profiles.",
      highlight: "Neural Deep Search",
    },
    {
      step: "03",
      image: "/images/howItWork/howItWorkImg3.png",
      title: "Connect & Take Action",
      description:
        "Instant agent collaboration, automated site visit appointments, notary PPAT compliance review, and sovereign banking handoffs.",
      highlight: "Seamless Transaction",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#f8fbff] py-20 lg:py-28 overflow-hidden font-sans border-t border-sky-100/70"
    >
      {/* Background Decorative Ambient Blobs */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[300px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* --- PART 1: HOW IT WORKS 3-PHASE CARDS --- */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <span className="text-[12px] font-bold tracking-widest uppercase text-[#2f80ed] block mb-2">
                FRICTIONLESS EXECUTION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0f172a]">
                How It Works
              </h2>
            </div>
            <p className="text-slate-700 text-base sm:text-lg lg:text-[19px] max-w-lg font-normal leading-snug">
              Three coordinated phases from conversational query to closed deed.
            </p>
          </div>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((item, idx) => {
              return (
                <div
                  key={item.step}
                  onMouseEnter={() => setActiveTab(idx)}
                  className={`group relative bg-white rounded-3xl p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    activeTab === idx
                      ? "border-sky-200 shadow-[0_12px_35px_rgba(47,128,237,0.08)] -translate-y-1.5"
                      : "border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-200"
                  }`}
                >
                  {/* Top: Step Number & Icon Badge */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 group-hover:text-[#2f80ed] transition-colors">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-sky-50/70 border border-sky-100 flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#2f80ed]/10 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                        />
                      </div>
                    </div>

                    {/* Card Title & Description */}
                    <div className="mt-6">
                      <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 leading-snug group-hover:text-[#2f80ed] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-slate-500 text-xs sm:text-[13.5px] leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle Bottom Accent Indicator */}
                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-[#2f80ed] transition-colors">
                    <span>{item.highlight}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2f80ed] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- PART 2: CONVERSATIONAL REAL ESTATE (TALK TO YOUR ASSISTANT) --- */}
        <div className="mt-24 lg:mt-32 pt-16 border-t border-sky-100/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Description & Multilingual Stack */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[12px] font-bold tracking-widest uppercase text-[#2f80ed] block mb-2">
                CONVERSATIONAL REAL ESTATE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0f172a] leading-[1.12]">
                Talk to Your Property Assistant.
              </h2>
              <p className="mt-4 sm:mt-5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                Skip filters and complex real estate jargon. Ask questions in
                everyday language. PropertyAI understands nuances, zoning
                restrictions, and return requirements across four international
                languages.
              </p>

              {/* Language Selector Chips */}
              <div className="mt-8">
                <span className="text-[11.5px] font-medium text-slate-400 tracking-wide uppercase block mb-3">
                  Active Multilingual Voice Stack:
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {languages.map((lang) => {
                    const isSelected = activeLang === lang.name;
                    return (
                      <button
                        key={lang.name}
                        onClick={() => setActiveLang(lang.name)}
                        className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm ${
                          isSelected
                            ? "bg-[#2f80ed] text-white shadow-md shadow-blue-500/25 scale-105"
                            : "bg-white text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-[#2f80ed] hover:bg-sky-50/50"
                        }`}
                      >
                        {isSelected && <Check size={13} className="stroke-[3]" />}
                        <span>{lang.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: AI Conversational Demonstration Card */}
            <div className="lg:col-span-6">
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-sky-100/80 shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all">
                {/* Buyer Query Glass Bubble (Top) */}
                <div className="bg-[#ebf5fe] rounded-2xl p-4 sm:p-5 border border-sky-100 transition-all">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2f80ed] mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mic size={12} className="text-[#2f80ed]" />
                    </div>
                    <span>Buyer (Voice Query)</span>
                  </div>
                  <p className="text-slate-800 text-xs sm:text-[13.5px] font-normal leading-relaxed italic pl-7">
                    {currentLangData.query}
                  </p>
                </div>

                {/* AI Assistant Output Box (Middle) */}
                <div className="mt-5 pl-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2f80ed] mb-2">
                    <Sparkles size={14} />
                    <span>PropertyAI Assistant</span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal">
                    {currentLangData.response}
                  </p>
                </div>

                {/* Bottom Audio Wave Visualizer & Tap to Speak Action Button */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  {/* Waveform Visualizer */}
                  <div className="flex items-center gap-1 h-6">
                    <span className="w-1 bg-[#2f80ed] rounded-full h-3 animate-pulse" />
                    <span className="w-1 bg-[#2f80ed] rounded-full h-5 animate-pulse delay-75" />
                    <span className="w-1 bg-[#2f80ed] rounded-full h-6 animate-pulse delay-150" />
                    <span className="w-1 bg-[#2f80ed] rounded-full h-4 animate-pulse delay-100" />
                    <span className="w-1 bg-[#2f80ed] rounded-full h-2 animate-pulse delay-200" />
                    <span className="text-[11px] font-semibold text-slate-400 ml-2">
                      {isSpeaking ? "Listening..." : "Natural Voice Ready"}
                    </span>
                  </div>

                  {/* Tap to Speak Trigger Pill */}
                  <button
                    onClick={toggleSpeak}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      isSpeaking
                        ? "bg-red-500 text-white animate-bounce shadow-md shadow-red-500/30"
                        : "bg-sky-50 hover:bg-sky-100 text-[#2f80ed] border border-sky-100 hover:scale-[1.02] active:scale-95"
                    }`}
                  >
                    <Mic size={13} />
                    <span>Tap to Speak (IDR / EN / 中 / 한국어)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
