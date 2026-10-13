"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Search, Mic, MicOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchPills } from "./data";
import { cn } from "@/lib/utils";

interface AiSearchCardProps {
  onSearch?: (query: string) => void;
}

export default function AiSearchCard({ onSearch }: AiSearchCardProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    location?: string;
    budget?: string;
    type?: string;
    summary?: string;
  } | null>(null);

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate speech-to-text voice input
      setTimeout(() => {
        setQuery("Modern 3 bedroom villa near beach in Canggu Bali under 4.5 billion IDR");
        setIsListening(false);
      }, 2200);
    } else {
      setIsListening(false);
    }
  };

  const handlePillClick = (pill: string) => {
    setQuery(pill);
    handleExecuteSearch(pill);
  };

  const handleExecuteSearch = (searchQueryToRun: string) => {
    const q = searchQueryToRun.trim();
    if (!q) return;

    setIsAnalyzing(true);
    setAiAnalysisResult(null);

    // Simulate AI parsing of natural language query
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiAnalysisResult({
        location: q.toLowerCase().includes("bali")
          ? "Bali, Indonesia"
          : q.toLowerCase().includes("jakarta")
          ? "Jakarta, Indonesia"
          : "Surabaya, Indonesia",
        budget: q.toLowerCase().includes("billion")
          ? "Under IDR 5,000,000,000"
          : "Flexible Budget",
        type: q.toLowerCase().includes("villa")
          ? "Private Villa"
          : q.toLowerCase().includes("apartment")
          ? "Modern Apartment"
          : "Commercial Real Estate",
        summary: `AI analyzed your prompt: filtered 3 matching properties in real-time.`,
      });

      if (onSearch) {
        onSearch(q);
      }
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(query);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-100/80 bg-gradient-to-b from-blue-50/50 via-white to-white p-5 sm:p-7 shadow-[0_4px_20px_rgba(37,99,235,0.04)]">
      {/* Decorative subtle corner glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-700">
          AI-Powered Search
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-5">
        What are you looking for?
      </h2>

      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative mb-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <div className="relative flex-1 flex items-center min-w-0">
            <Search className="h-4.5 w-4.5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 3-bedroom house near main road in Bali under 5 billion..."
              className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            {/* Mic voice button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              title={isListening ? "Listening..." : "Click to speak"}
              className={cn(
                "p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors mr-1 shrink-0",
                isListening && "text-red-600 bg-red-50 animate-pulse"
              )}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 text-red-500" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isAnalyzing}
            className="h-10 sm:h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 shrink-0 flex items-center justify-center gap-1.5"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </Button>
        </div>
      </form>

      {/* Voice prompt listening banner */}
      {isListening && (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2 text-xs text-red-700 border border-red-200 animate-in fade-in">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
          <span>Listening to your voice query... Speak now (simulating: Bali Villa under 4.5B)</span>
        </div>
      )}

      {/* AI Analysis feedback pill */}
      {aiAnalysisResult && (
        <div className="mb-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 p-3 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
            <span>
              <strong>Smart Intent:</strong> {aiAnalysisResult.type} • {aiAnalysisResult.location} • {aiAnalysisResult.budget}
            </span>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/dashboard/customer/discover?q=${encodeURIComponent(query)}`)}
            className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
          >
            Explore in Discover
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Suggested Search Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {searchPills.map((pill) => (
          <button
            key={pill}
            type="button"
            onClick={() => handlePillClick(pill)}
            className="rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95 shadow-2xs"
          >
            {pill}
          </button>
        ))}
      </div>
    </div>
  );
}
