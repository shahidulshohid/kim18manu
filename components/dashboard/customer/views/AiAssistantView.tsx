"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  Calculator,
  Compass,
  FileText,
  Building,
  CheckCircle2,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recommendedProperties } from "../data";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedProperties?: typeof recommendedProperties;
}

export default function AiAssistantView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello Anisa! I am your PropertiQU AI Property Advisor. I can analyze neighborhoods, estimate ROI on vacation rentals, calculate Indonesian notary & BPHTB taxes, or find unlisted villas matching your lifestyle. How can I help you today?",
      timestamp: "09:00 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(100);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptSuggestions = [
    "Find high-yield rental villas in Bali under 5 Billion IDR",
    "Calculate notary & BPHTB transfer taxes for IDR 4.5B villa",
    "Compare SCBD apartments vs BSD townhouses for long-term growth",
    "Draft an official inquiry for Modern Villa with Ocean View",
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    idCounterRef.current += 1;
    const currentId = idCounterRef.current;

    const userMsg: ChatMessage = {
      id: `usr-${currentId}`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI simulated intelligent response
    setTimeout(() => {
      let aiReply = "";
      let withProperties = false;

      if (text.toLowerCase().includes("bali") || text.toLowerCase().includes("villa")) {
        aiReply =
          "I found 3 premier villa listings in Jimbaran & Canggu matching your criteria! Properties in Jimbaran currently average 8.4% gross rental yield with 82% peak occupancy. Here is my top recommended matching estate:";
        withProperties = true;
      } else if (text.toLowerCase().includes("tax") || text.toLowerCase().includes("bphtb")) {
        aiReply =
          "For an acquisition of IDR 4,500,000,000 in Badung, Bali:\n• BPHTB (Buyer Tax, 5% after NPOPTKP allowance): ~IDR 221,000,000\n• Notary Deed (Akta Jual Beli / PPAT, ~1%): ~IDR 45,000,000\n• BPN Land Title Check & Name Transfer: ~IDR 6,500,000\nTotal estimated legal closing costs: ~IDR 272,500,000 (approx. 6.05%). Would you like me to connect you with our vetted notary partner?";
      } else {
        aiReply = `I've analyzed your inquiry regarding "${text}". Based on current market transactions and cadastral records across Jakarta and Bali, property values in these sectors have appreciated by 7.2% year-over-year. Let me prepare a tailored dossier for you.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${currentId + 1}`,
          sender: "ai",
          text: aiReply,
          timestamp: "Just now",
          suggestedProperties: withProperties ? [recommendedProperties[0]] : undefined,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px] flex flex-col h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                PropertyAI Assistant
              </h1>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized property search, valuation & legal insights
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs text-xs font-bold ${
                msg.sender === "user"
                  ? "bg-slate-800 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-tr-xs"
                  : "bg-white border border-slate-100 text-slate-800 shadow-xs rounded-tl-xs"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Optional Property recommendation inside chat */}
              {msg.suggestedProperties && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  {msg.suggestedProperties.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60"
                    >
                      <div className="relative h-14 w-20 rounded-lg overflow-hidden shrink-0">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900 text-xs truncate">{p.title}</p>
                        <p className="text-[11px] text-slate-500">{p.location}</p>
                        <p className="text-xs font-bold text-blue-600">{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <span
                className={`text-[10px] block mt-1.5 ${
                  msg.sender === "user" ? "text-blue-100 text-right" : "text-slate-400"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 shrink-0">
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="text-[11px] font-medium text-slate-600 bg-white border border-slate-200/80 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-1.5 rounded-full whitespace-nowrap transition-all shadow-2xs shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-2 shrink-0 relative"
      >
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-200/90 p-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask AI about property valuation, locations, yields, legal questions..."
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <Button
            type="submit"
            disabled={!inputText.trim()}
            className="h-9 w-9 p-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shrink-0 flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
