"use client";

import React, { useState } from "react";
import Link from "next/link";
import AgentSidebar from "./AgentSidebar";
import AgentHeader from "./AgentHeader";

interface AgentLayoutProps {
  children: React.ReactNode;
}

export default function AgentLayout({ children }: AgentLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 antialiased flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Sidebar (Desktop fixed + Mobile Drawer) */}
      <AgentSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 w-full flex flex-col lg:pl-64 transition-all duration-200 overflow-x-hidden relative">
        {/* Top Header */}
        <AgentHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 min-w-0 w-full min-h-[calc(100vh-64px)] pb-20 overflow-x-hidden">
          {children}
        </main>

        {/* Floating Back to Portal Select Button matching reference screenshot */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <Link
            href="/login"
            className="bg-white border border-slate-200/90 shadow-md hover:shadow-lg px-4 py-2 rounded-full text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all hover:bg-slate-50 cursor-pointer"
          >
            ← Back to Portal Select
          </Link>
        </div>
      </div>
    </div>
  );
}
