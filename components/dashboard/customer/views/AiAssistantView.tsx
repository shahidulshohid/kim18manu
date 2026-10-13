"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
}

// Custom Smiling AI Avatar Icon matching user screenshot
function AiAvatarIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#1e2a5e] text-white flex items-center justify-center shadow-xs shrink-0 select-none",
        className
      )}
      aria-label="AI Assistant Avatar"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left eye stroke / wink */}
        <path
          d="M7.5 10.5L9.5 9.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Right eye dot */}
        <circle cx="15.5" cy="10" r="1.3" fill="white" />
        {/* Smile curve */}
        <path
          d="M8.5 14.5C10 16.8 14 16.8 15.5 14.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function AiAssistantView() {
  // Pre-loaded conversation exact match to user screenshot
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello Anisa! I'm your AI Property Assistant. I can help you find properties, compare listings, understand market trends, schedule site visits, and answer any property-related questions. What would you like to explore today?",
    },
    {
      id: "msg-2",
      sender: "user",
      text: "Show me villas in Bali under 5 billion with at least 3 bedrooms",
    },
    {
      id: "msg-3",
      sender: "ai",
      text: "I found 4 villas in Bali matching your criteria. The top match is the Modern Villa with Ocean View in Jimbaran (IDR 4.5B, 4BR) — it's in a tourist area and flood-free. Would you like a detailed comparison, or shall I schedule a site visit for your favorites?",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(100);

  // 5 Action Pills matching user screenshot
  const quickPrompts = [
    "Find a property",
    "Compare listings",
    "Market insights",
    "Schedule site visit",
    "Mortgage estimate",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setInputText("Compare villas in Jimbaran vs Seminyak");
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    idCounterRef.current += 1;
    const currentId = idCounterRef.current;

    const userMsg: ChatMessage = {
      id: `usr-${currentId}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI intelligent contextual reply generator
    setTimeout(() => {
      let aiReply = "";

      if (text.toLowerCase().includes("find a property") || text.toLowerCase().includes("villa")) {
        aiReply =
          "I have filtered 3 top-tier luxury villas in Jimbaran and Canggu with ocean views and private pools, starting from IDR 4.2 Billion. Would you like to view photos or inspect floorplans?";
      } else if (text.toLowerCase().includes("compare listings")) {
        aiReply =
          "Comparing Jimbaran Ocean Villa vs SCBD Condominium:\n• Jimbaran: 4 Beds, 320 m², IDR 4.5B (Expected yield: 8.4% p.a.)\n• SCBD: 2 Beds, 85 m², IDR 850M (Capital appreciation: 11% p.a.)\nJimbaran is superior for rental cash flow, while SCBD offers prime business district liquidity.";
      } else if (text.toLowerCase().includes("market insights")) {
        aiReply =
          "Bali property values in tourist corridors (Jimbaran, Canggu, Uluwatu) grew by 9.3% YoY in 2026. High tourist occupancy (82% avg.) continues to drive strong foreign and domestic investor demand.";
      } else if (text.toLowerCase().includes("schedule site visit")) {
        aiReply =
          "I can arrange an on-site or 3D virtual walkthrough with our certified agent Budi Santoso. Tomorrow at 10:00 AM or 02:30 PM is available. Which time suits you best?";
      } else if (text.toLowerCase().includes("mortgage estimate")) {
        aiReply =
          "For IDR 4,500,000,000 with a 20% down payment (IDR 900M) at 4.85% fixed for 5 years:\n• Loan Amount: IDR 3,600,000,000\n• Monthly Installment: ~IDR 28,140,000/mo over 15 years.\nOur partner banks (BCA, Mandiri) offer pre-approval within 24 hours.";
      } else {
        aiReply = `I've analyzed your query regarding "${text}". Based on verified Indonesian cadastral records and current market transactions, I can prepare an itemized report or schedule a direct consultation with our agent.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${currentId + 1}`,
          sender: "ai",
          text: aiReply,
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px] flex flex-col h-[calc(100vh-64px)] justify-between">
      {/* 1. Header Section */}
      <div className="shrink-0 mb-4 sm:mb-5">
        <div className="flex items-center gap-3.5 mb-5">
          <AiAvatarIcon className="h-11 w-11 sm:h-12 sm:w-12" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              AI Assistant
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-[#22c55e] inline-block shrink-0" />
              <span className="text-[#22c55e] font-semibold">Online</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-medium">
                Powered by Property AI
              </span>
            </div>
          </div>
        </div>

        {/* 2. Quick Action Suggestion Pills (Matching Screenshot) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              className="px-4 py-1.5 rounded-full border border-blue-200/90 text-blue-600 bg-white text-xs font-medium hover:bg-blue-50/80 hover:border-blue-300 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Chat Messages Stream Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4 overscroll-contain">
        {messages.map((msg) => {
          if (msg.sender === "ai") {
            return (
              <div key={msg.id} className="flex items-start gap-3 sm:gap-3.5">
                <AiAvatarIcon className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 mt-0.5" />
                <div className="max-w-[90%] sm:max-w-[78%] rounded-2xl bg-white border border-blue-200/80 p-4 sm:p-5 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-2xs">
                  <div className="whitespace-pre-line font-normal">{msg.text}</div>
                </div>
              </div>
            );
          }

          // User message (Right-aligned blue bubble without avatar, matching screenshot)
          return (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[88%] sm:max-w-[70%] rounded-2xl bg-[#2563eb] text-white px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-normal leading-relaxed shadow-xs">
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Typing indicator bubble */}
        {isTyping && (
          <div className="flex items-start gap-3 sm:gap-3.5 animate-in fade-in">
            <AiAvatarIcon className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 mt-0.5" />
            <div className="rounded-2xl bg-white border border-blue-200/80 px-4 py-3 text-xs sm:text-sm text-slate-500 shadow-2xs flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Chat Input Bar (Matching Screenshot) */}
      <form onSubmit={handleSubmit} className="pt-2 pb-1 shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Main Input Box */}
          <div className="relative flex-1 min-w-0 flex items-center bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about properties..."
              className="w-full bg-transparent px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none min-w-0"
            />
            {/* Microphone button inside input */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={cn(
                "p-2 mr-2 text-slate-400 hover:text-blue-600 transition-colors shrink-0 cursor-pointer",
                isListening && "text-red-500 animate-pulse bg-red-50 rounded-xl"
              )}
              title={isListening ? "Listening..." : "Click for voice input"}
            >
              {isListening ? (
                <MicOff className="h-4.5 w-4.5 text-red-500" />
              ) : (
                <Mic className="h-4.5 w-4.5" />
              )}
            </button>
          </div>

          {/* Send Button on the right (Navy Blue Rounded Square with White Send Icon) */}
          <button
            type="submit"
            disabled={!inputText.trim() && !isTyping}
            className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-[#1e2a5e] hover:bg-[#152044] text-white flex items-center justify-center shrink-0 shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="h-4.5 w-4.5 stroke-[2]" />
          </button>
        </div>
      </form>
    </div>
  );
}
