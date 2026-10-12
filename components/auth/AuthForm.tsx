"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export interface AuthFormValues {
  fullName: string;
  email: string;
  password: string;
}

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    // Simulated auth submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Account created with data:", data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <section className="w-full lg:w-1/2 min-h-[500px] lg:min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-20 bg-white">
      <div className="w-full max-w-[420px] mx-auto flex flex-col">
        {/* Top Brand Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block group">
            <span className="text-[#1d61f2] font-black text-2xl sm:text-[26px] tracking-wide select-none group-hover:opacity-90 transition-opacity">
              LOGO
            </span>
          </Link>

          {/* Header Title */}
          <h2 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight mt-6 sm:mt-7 leading-snug">
            Create Your Account
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-2 leading-relaxed">
            Create an account to manage your review growth.
          </p>
        </div>

        {/* Form using react-hook-form */}
        <form
          className="mt-8 sm:mt-9 space-y-4 sm:space-y-4.5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs sm:text-[12.5px] font-medium text-slate-800 mb-1.5"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                placeholder="Mehdi Dewan"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters",
                  },
                })}
                className={`w-full bg-[#f4f7fb] border rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.fullName
                    ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                    : "border-[#e5edf5] focus:ring-2 focus:ring-[#1d61f2]/20 focus:border-[#1d61f2]"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1.5 text-[11px] text-red-500 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Business Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-[12.5px] font-medium text-slate-800 mb-1.5"
            >
              Business email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 pointer-events-none">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="ayeshahabib@gmail.com"
                {...register("email", {
                  required: "Business email is required",
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

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-[12.5px] font-medium text-slate-800 mb-1.5"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full bg-[#f4f7fb] border rounded-xl pl-11 pr-11 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.password
                    ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                    : "border-[#e5edf5] focus:ring-2 focus:ring-[#1d61f2]/20 focus:border-[#1d61f2]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-[11px] text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Success Message Banner */}
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Your account has been created successfully!</span>
            </div>
          )}

          {/* Submit Button ("Sign in") */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1d61f2] hover:bg-[#1554dd] active:scale-[0.99] disabled:opacity-70 text-white font-medium py-3.5 px-4 rounded-xl shadow-[0_4px_14px_rgba(29,97,242,0.3)] transition-all duration-200 text-sm sm:text-[15px] cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>

          {/* "or" Divider */}
          <div className="relative flex items-center justify-center py-1">
            <span className="text-xs text-slate-400 font-normal">or</span>
          </div>

          {/* Continue with Google Button */}
          <button
            type="button"
            className="w-full bg-[#f4f7fb] hover:bg-[#edf2f8] active:scale-[0.99] border border-[#e5edf5] text-slate-700 font-medium py-3 sm:py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 text-xs sm:text-sm cursor-pointer"
          >
            <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </section>
  );
}
