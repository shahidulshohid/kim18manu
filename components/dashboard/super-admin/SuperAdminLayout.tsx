"use client";

import React, { useState } from "react";
import SuperAdminSidebar from "./SuperAdminSidebar";
import SuperAdminHeader from "./SuperAdminHeader";

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {/* Sticky Full-Width Super Admin Header matching user screenshot */}
      <SuperAdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex-1 flex w-full">
        {/* Super Admin Sidebar (Desktop & Mobile Drawer) */}
        <SuperAdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Page Content shifted on desktop by sidebar width (w-64) */}
        <div className="flex-1 min-w-0 lg:pl-64 flex flex-col">
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
