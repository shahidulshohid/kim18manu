"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, CheckCircle2 } from "lucide-react";
import AuthHero from "./AuthHero";

export interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    // Simulated send reset link
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Password reset link sent to:", data.email);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased">
      {/* Left Architecture Hero Image Side */}
      <AuthHero />

      {/* Right Form Side: Forgot Password */}
      <section className="w-full lg:w-1/2 min-h-[500px] lg:min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-20 bg-white">
        <div className="w-full max-w-[420px] mx-auto flex flex-col">
          {/* Header Title */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-[30px] font-bold text-slate-900 tracking-tight leading-snug">
              Forgot Password?
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-2.5 max-w-sm mx-auto leading-relaxed">
              Enter the email address associated with your account. We&apos;ll send
              you a link to reset your password.
            </p>
          </div>

          {/* Form using react-hook-form */}
          <form
            className="mt-8 sm:mt-9 space-y-4 sm:space-y-4.5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Business Email Field */}
            <div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="ayeshahabib@gmail.com"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full bg-[#f4f7fb] border rounded-xl pl-11 pr-4 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                    errors.email
                      ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                      : "border-[#e5edf5] focus:ring-2 focus:ring-[#1d61f2]/20 focus:border-[#1d61f2]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-[11px] text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Success Banner */}
            {isSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Reset link sent! Please check your email inbox.</span>
              </div>
            )}

            {/* Submit Button ("Send link") */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1d61f2] hover:bg-[#1554dd] active:scale-[0.99] disabled:opacity-70 text-white font-medium py-3.5 px-4 rounded-xl shadow-[0_4px_14px_rgba(29,97,242,0.3)] transition-all duration-200 text-sm sm:text-[15px] cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Otp...</span>
                  </>
                ) : (
                  <span>Send Otp</span>
                )}
              </button>
            </div>

            {/* Back to Login Link */}
            <div className="text-center pt-2">
              <Link
                href="/signin"
                className="inline-block text-xs sm:text-[13px] font-semibold text-[#1d61f2] hover:underline transition-all"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
