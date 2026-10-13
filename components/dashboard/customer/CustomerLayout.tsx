"use client";

import React, { useState } from "react";
import CustomerSidebar from "./CustomerSidebar";
import CustomerHeader from "./CustomerHeader";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 antialiased flex flex-col">
      {/* Sidebar (Desktop sticky + Mobile Drawer) */}
      <CustomerSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-200">
        {/* Top Header */}
        <CustomerHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)] pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
