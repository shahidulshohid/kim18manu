"use client";

import React, { useState, useRef } from "react";
import {
  Search,
  Send,
  Phone,
  Video,
  Paperclip,
  CheckCheck,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  name: string;
  role: string;
  property: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

export default function MessagesView() {
  const [conversations] = useState<Conversation[]>([
    {
      id: "c-1",
      name: "Budi Santoso",
      role: "Property Specialist",
      property: "Modern Villa with Ocean View, Jimbaran",
      lastMessage: "I prepared the cadastral certificate and video walkthrough for tomorrow's tour.",
      time: "10:15 AM",
      unread: 1,
      avatar: "B",
      online: true,
    },
    {
      id: "c-2",
      name: "Siti Rahayu",
      role: "Luxury Condo Advisor",
      property: "Cozy Apartment in Business District, SCBD",
      lastMessage: "The owner accepted your inquiry and agreed to negotiate on the furnishing package.",
      time: "Yesterday",
      unread: 2,
      avatar: "S",
      online: false,
    },
    {
      id: "c-3",
      name: "Dimas Pratama",
      role: "Residential Consultant",
      property: "Spacious Family House with Garden, Bandung",
      lastMessage: "The owner confirmed Monday at 11 AM works perfectly for your site visit.",
      time: "Oct 11",
      unread: 1,
      avatar: "D",
      online: true,
    },
    {
      id: "c-4",
      name: "Hendra Wijaya, S.H.",
      role: "PPAT / Notary Partner",
      property: "Legal Title Verification",
      lastMessage: "Draft Akta Jual Beli (AJB) has been uploaded to your Transactions portal.",
      time: "Oct 10",
      unread: 1,
      avatar: "H",
      online: false,
    },
  ]);

  const [selectedId, setSelectedId] = useState("c-1");
  const [messages, setMessages] = useState<
    Record<string, { id: string; sender: "them" | "me"; text: string; time: string }[]>
  >({
    "c-1": [
      {
        id: "m1",
        sender: "them",
        text: "Hi Anisa! Good morning. Thank you for booking the visit for the Modern Villa in Jimbaran.",
        time: "10:00 AM",
      },
      {
        id: "m2",
        sender: "me",
        text: "Hi Budi! Can you confirm if the road access from the main highway is wide enough for large SUVs?",
        time: "10:08 AM",
      },
      {
        id: "m3",
        sender: "them",
        text: "Yes, absolutely! The access road is a paved 6-meter two-lane road. I prepared the cadastral certificate and video walkthrough for tomorrow's tour.",
        time: "10:15 AM",
      },
    ],
  });

  const [inputMsg, setInputMsg] = useState("");
  const activeConversation = conversations.find((c) => c.id === selectedId) || conversations[0];
  const msgIdCounter = useRef(100);

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    msgIdCounter.current += 1;
    const newMsg = {
      id: `msg-${msgIdCounter.current}`,
      sender: "me" as const,
      text: inputMsg,
      time: "Just now",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg],
    }));
    setInputMsg("");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 py-4 sm:py-6 px-3 sm:px-6 lg:px-[32px] h-[calc(100vh-80px)] flex flex-col">
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-sm flex-1 flex overflow-hidden min-w-0">
        {/* Left: Conversations List */}
        <div
          className={cn(
            "w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col bg-white min-w-0",
            selectedId ? "hidden md:flex" : "flex"
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {conversations.map((conv) => {
              const isSelected = conv.id === selectedId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={cn(
                    "p-3.5 flex items-start gap-3 cursor-pointer transition-colors",
                    isSelected ? "bg-blue-50/70" : "hover:bg-slate-50"
                  )}
                >
                  <div className="relative shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {conv.name}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">{conv.time}</span>
                    </div>

                    <p className="text-[11px] text-blue-600 font-medium truncate mt-0.5">
                      {conv.property}
                    </p>

                    <p className="text-xs text-slate-500 truncate mt-0.5 font-normal">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        <div
          className={cn(
            "flex-1 flex flex-col bg-slate-50/50",
            !selectedId ? "hidden md:flex" : "flex"
          )}
        >
          {/* Active Chat Header */}
          <div className="h-16 px-4 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedId("")}
                className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                {activeConversation.avatar}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 leading-snug truncate">
                  {activeConversation.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium truncate">
                  {activeConversation.property}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-50 cursor-pointer">
                <Phone className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-50 cursor-pointer">
                <Video className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {(messages[selectedId] || []).map((m) => (
              <div
                key={m.id}
                className={cn("flex flex-col", m.sender === "me" ? "items-end" : "items-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs break-words",
                    m.sender === "me"
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-white border border-slate-100 text-slate-800 rounded-bl-xs"
                  )}
                >
                  <p>{m.text}</p>
                  <div
                    className={cn(
                      "flex items-center justify-end gap-1 text-[10px] mt-1",
                      m.sender === "me" ? "text-blue-100" : "text-slate-400"
                    )}
                  >
                    <span>{m.time}</span>
                    {m.sender === "me" && <CheckCheck className="h-3 w-3" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type your message to the agent..."
                className="flex-1 min-w-0 h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />

              <Button
                type="submit"
                className="h-10 px-3.5 sm:px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shrink-0 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
