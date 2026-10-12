"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  const institutionalLinks = [
    { name: "Home", href: "#" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "For Agents", href: "#" },
    { name: "Partners", href: "#" },
  ];

  const ecosystemLinks = [
    { name: "Property Agents", href: "#" },
    { name: "Bank / Mortgage", href: "#" },
    { name: "Certified Notary", href: "#" },
    { name: "Insurance & Underwriting", href: "#" },
    { name: "Architecture & Build", href: "#" },
    { name: "Facility & Solar", href: "#" },
  ];

  return (
    <footer className="relative w-full bg-[#090e1a] text-slate-300 pt-16 sm:pt-20 pb-12 overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Brand Logo & Tagline */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <a href="#" className="inline-flex items-center gap-2 group transition-opacity hover:opacity-90">
                <Image
                  src="/logo-white.png"
                  alt="PropertiQU.AI Logo"
                  width={154}
                  height={28}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </a>

              {/* Tagline */}
              <p className="mt-5 text-slate-300 text-xs sm:text-[13.5px] leading-relaxed max-w-sm font-normal">
                High-net-worth real estate discovery powered by
                computational intelligence across Indonesia&apos;s
                prime luxury archipelago.
              </p>
            </div>
          </div>

          {/* Right Columns: Nav Links */}
          <div className="md:col-span-6 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {/* Column 1: Institutional */}
            <div>
              <ul className="space-y-2.5">
                {institutionalLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-xs sm:text-[13px] text-slate-300 hover:text-white transition-colors duration-200 block py-0.5"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Ecosystem */}
            <div>
              <ul className="space-y-2.5">
                {ecosystemLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-xs sm:text-[13px] text-slate-300 hover:text-white transition-colors duration-200 block py-0.5"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p className="font-normal text-center sm:text-left text-slate-300">
            © 2025 PropertyAI Indonesia. All rights reserved
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Privacy Charter
            </a>
            <a
              href="#terms"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
