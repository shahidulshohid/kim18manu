"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, RotateCw } from "lucide-react";
import AuthHero from "./AuthHero";

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Focus the first input on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric inputs
    if (!/^\d*$/.test(value)) return;

    setError(null);
    const newOtp = [...otp];
    // Take the last character typed
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance to next input if filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(45);
    setCanResend(false);
    setError(null);
    setOtp(new Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulated OTP verification
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("Verified OTP:", otpValue);
    setIsSuccess(true);
    setIsSubmitting(false);

    // Redirect to reset password page
    setTimeout(() => {
      router.push("/reset-password");
    }, 1000);
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased">
      {/* Left Architecture Hero Image Side */}
      <AuthHero />

      {/* Right Form Side: Verify OTP */}
      <section className="w-full lg:w-1/2 min-h-[500px] lg:min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-20 bg-white">
        <div className="w-full max-w-[440px] mx-auto flex flex-col">
          {/* Header Title */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-[30px] font-bold text-slate-900 tracking-tight leading-snug">
              Verify OTP
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-2.5 max-w-sm mx-auto leading-relaxed">
              Please enter the 6-digit verification code sent to your email address.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 sm:mt-9 space-y-5" onSubmit={handleSubmit}>
            {/* 6 Digit OTP Inputs */}
            <div>
              <div className="flex items-center justify-between gap-2 sm:gap-2.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold rounded-xl bg-[#f4f7fb] border text-slate-900 focus:outline-none focus:bg-white transition-all ${
                      error
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : digit
                        ? "border-[#1d61f2] ring-1 ring-[#1d61f2]/20 bg-white"
                        : "border-[#e5edf5] focus:ring-2 focus:ring-[#1d61f2]/20 focus:border-[#1d61f2]"
                    }`}
                  />
                ))}
              </div>

              {/* Error message */}
              {error && (
                <p className="mt-2 text-center text-[11px] text-red-500 font-medium">
                  {error}
                </p>
              )}
            </div>

            {/* Resend Code Section */}
            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1d61f2] hover:underline cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              ) : (
                <p className="text-xs text-slate-500">
                  Didn&apos;t receive code?{" "}
                  <span className="font-semibold text-slate-700">
                    Resend in 00:{timer < 10 ? `0${timer}` : timer}
                  </span>
                </p>
              )}
            </div>

            {/* Success Banner */}
            {isSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>OTP verified! Redirecting to reset password...</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting || otp.join("").length < 6}
                className="w-full bg-[#1d61f2] hover:bg-[#1554dd] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 px-4 rounded-xl shadow-[0_4px_14px_rgba(29,97,242,0.3)] transition-all duration-200 text-sm sm:text-[15px] cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify OTP</span>
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
