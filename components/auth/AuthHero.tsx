"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthHero() {
  return (
    <section className="relative w-full lg:w-1/2 min-h-[380px] sm:min-h-[460px] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-slate-900">
      {/* Architecture Background Image */}
      <Image
        src="/images/authImage.jpg"
        alt="Modern Architecture - Experience Luxury Living"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center"
      />

      {/* Ambient Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

      {/* Back to Home Link (Top Left) */}
      <div className="relative z-10 p-6 sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Typography Overlay (Bottom Left) */}
      <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl">
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-white tracking-tight leading-[1.12]">
          EXPERIENCE<br />
          LUXURY<br />
          LIVING
        </h1>
        <p className="mt-4 sm:mt-5 text-xs sm:text-[13.5px] text-slate-200/90 font-normal max-w-md leading-relaxed">
          Your dream home is waiting- modern elegance, unmatched comfort and prime location
        </p>
      </div>
    </section>
  );
}
