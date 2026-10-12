"use client";

import React from "react";
import AuthHero from "@/components/auth/AuthHero";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased">
      {/* Left Image & Overlay Side */}
      <AuthHero />

      {/* Right Form Side: Welcome back */}
      <LoginForm />
    </main>
  );
}
