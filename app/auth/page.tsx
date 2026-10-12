"use client";

import React from "react";
import AuthHero from "@/components/auth/AuthHero";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased">
      {/* Left Image & Overlay Side */}
      <AuthHero />

      {/* Right Form Side */}
      <AuthForm />
    </main>
  );
}
