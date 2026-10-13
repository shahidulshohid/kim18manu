"use client";

import React, { useState } from "react";
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
      <div className="flex-1 min-w-0 w-full flex flex-col lg:pl-64 transition-all duration-200 overflow-x-hidden">
        {/* Top Header */}
        <AgentHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 min-w-0 w-full min-h-[calc(100vh-64px)] pb-12 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
