"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Paperclip,
  Mic,
  Send,
  ArrowLeft,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConversationItem {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  avatarText?: string;
  isAi?: boolean;
  time: string;
  lastMessage: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  sender: "them" | "me";
  text: string;
  time: string;
}

const INITIAL_CONVERSATIONS: ConversationItem[] = [
  {
    id: "conv-1",
    name: "AI Assistant",
    subtitle: "Ai",
    role: "AI Real Estate Assistant",
    isAi: true,
    time: "10:42",
    lastMessage: "I found 4 villas matching your...",
    unreadCount: 2,
  },
  {
    id: "conv-2",
    name: "Budi Santoso",
    subtitle: "Property Specialist",
    role: "Senior Broker",
    avatarText: "BS",
    time: "09:15",
    lastMessage: "The visit is confirmed for Oct 5 at...",
  },
  {
    id: "conv-3",
    name: "Sari Dewi",
    subtitle: "Luxury Condo Advisor",
    role: "SCBD Advisor",
    avatarText: "SD",
    time: "Yesterday",
    lastMessage: "Please let me know if you nee...",
    unreadCount: 1,
  },
  {
    id: "conv-4",
    name: "CleanPro Services",
    subtitle: "Service Partner",
    role: "Home Maintenance",
    avatarText: "CP",
    time: "Mon",
    lastMessage: "Your cleaning service is schedule...",
  },
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  "conv-1": [
    {
      id: "msg-1",
      sender: "them",
      text: "Good morning! I wanted to confirm your site visit for the Jimbaran villa on October 5th at 10:00 AM. Does that still work for you?",
      time: "09:10",
    },
    {
      id: "msg-2",
      sender: "me",
      text: "Yes, that works perfectly. Should I bring any documents?",
      time: "09:12",
    },
    {
      id: "msg-3",
      sender: "them",
      text: "Just a valid ID. I'll send you the exact address and parking details shortly. Looking forward to seeing you!",
      time: "09:15",
    },
  ],
  "conv-2": [
    {
      id: "b-1",
      sender: "them",
      text: "Hello Anisa, Budi Santoso here. The visit is confirmed for Oct 5 at 10:00 WIB for Modern Villa with Ocean View.",
      time: "09:15",
    },
    {
      id: "b-2",
      sender: "me",
      text: "Thank you Budi! Is there private parking available at the property?",
      time: "09:18",
    },
    {
      id: "b-3",
      sender: "them",
      text: "Yes, there is an enclosed 2-car garage plus ample guest driveway parking.",
      time: "09:20",
    },
  ],
  "conv-3": [
    {
      id: "s-1",
      sender: "them",
      text: "Hi Anisa, following up on your SCBD apartment tour.",
      time: "Yesterday",
    },
    {
      id: "s-2",
      sender: "them",
      text: "Please let me know if you need floorplans or building amenity brochures.",
      time: "Yesterday",
    },
  ],
  "conv-4": [
    {
      id: "c-1",
      sender: "them",
      text: "Good day! Your cleaning service is scheduled for next Monday at 09:00 WIB.",
      time: "Mon",
    },
    {
      id: "c-2",
      sender: "me",
      text: "Confirmed, thank you CleanPro team!",
      time: "Mon",
    },
  ],
};

// Cute AI Avatar matching the screenshot dark-blue circle with white sparkles/smile icon
function AiAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shrink-0 shadow-xs",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-white"
      >
        <path d="M8 9h.01" />
        <path d="M16 9h.01" />
        <path d="M9 14.5c1.8 1.8 4.2 1.8 6 0" />
        <path d="M12 3v1.5" />
      </svg>
    </div>
  );
}

export default function MessagesView() {
  const [conversations, setConversations] = useState<ConversationItem[]>(INITIAL_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string>("conv-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation =
    conversations.find((c) => c.id === activeId) || conversations[0];

  const currentChatMessages = messages[activeId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeId, currentChatMessages.length]);

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: undefined } : c))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: inputText.trim(),
      time: timeStr,
    };

    setMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMsg],
    }));

    // Update snippet in conversation list
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMessage: inputText.trim(),
              time: timeStr,
            }
          : c
      )
    );

    const sentText = inputText.trim();
    setInputText("");

    // If chatting with AI, provide a smart quick response
    if (activeConversation.isAi) {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `reply-${Date.now()}`,
          sender: "them",
          text: `Got it! I've noted that down: "${sentText}". I'm here to help coordinate your visits and property searches.`,
          time: timeStr,
        };
        setMessages((prev) => ({
          ...prev,
          [activeId]: [...(prev[activeId] || []), replyMsg],
        }));
      }, 1000);
    }
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-6 sm:py-8 px-4 sm:px-6 lg:px-[32px]">
      {/* 1. Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
          Messages
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Conversations with your AI assistant, agents, and service partners.
        </p>
      </div>

      {/* 2. Main Two-Panel Layout */}
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Panel: Conversations List */}
        <div
          className={cn(
            "w-full lg:w-[350px] shrink-0 bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col",
            activeId ? "block" : "block"
          )}
        >
          {/* Search Box */}
          <div className="relative mb-3">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full h-10 pl-9 pr-3.5 rounded-xl border-none bg-[#f8fafc] text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Conversations Items */}
          <div className="space-y-1">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeId;

              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={cn(
                    "relative flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all select-none",
                    isSelected
                      ? "bg-transparent"
                      : "hover:bg-slate-50/80"
                  )}
                >
                  {/* Blue Left Indicator for Active Conversation */}
                  {isSelected && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#2563eb] rounded-r-full" />
                  )}

                  {/* Avatar */}
                  {conv.isAi ? (
                    <AiAvatar />
                  ) : (
                    <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-slate-300/80 text-slate-600 font-bold flex items-center justify-center text-xs sm:text-sm shrink-0">
                      {conv.avatarText}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {conv.name}
                      </span>
                      <span className="text-[11px] text-slate-400 shrink-0">
                        {conv.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className="text-xs text-slate-400 truncate">
                        {conv.lastMessage}
                      </p>

                      {/* Unread badge */}
                      {conv.unreadCount !== undefined && conv.unreadCount > 0 && (
                        <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#2563eb] text-white text-[10.5px] font-bold px-1 shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Active Chat Window */}
        <div className="flex-1 w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-[640px] sm:h-[680px] overflow-hidden min-w-0">
          {/* Chat Header */}
          <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {activeConversation.isAi ? (
                <AiAvatar />
              ) : (
                <div className="h-10 w-10 rounded-full bg-slate-300/80 text-slate-600 font-bold flex items-center justify-center text-sm shrink-0">
                  {activeConversation.avatarText}
                </div>
              )}

              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate">
                  {activeConversation.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-normal">
                  {activeConversation.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {currentChatMessages.map((msg) => {
              const isMe = msg.sender === "me";

              return (
                <div
                  key={msg.id}
                  className={cn("flex flex-col", isMe ? "items-end" : "items-start")}
                >
                  <div
                    className={cn(
                      "rounded-2xl p-4 sm:p-5 max-w-[85%] sm:max-w-[78%] text-xs sm:text-sm leading-relaxed break-words",
                      isMe
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f8fafc] text-slate-800"
                    )}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={cn(
                        "text-[11px] mt-1.5 flex items-center gap-1",
                        isMe ? "text-blue-100 justify-end" : "text-slate-400 justify-start"
                      )}
                    >
                      <span>{msg.time}</span>
                      {isMe && <CheckCheck className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar matching screenshot */}
          <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-white">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 sm:gap-3"
            >
              {/* Attachment Icon */}
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
                aria-label="Attach file"
              >
                <Paperclip className="h-4.5 w-4.5" />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 min-w-0 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />

              {/* Microphone Icon */}
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
                aria-label="Voice input"
              >
                <Mic className="h-4.5 w-4.5" />
              </button>

              {/* Send Button */}
              <button
                type="submit"
                className="h-9 w-9 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-xs transition-all active:scale-95 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
