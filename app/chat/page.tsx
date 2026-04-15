"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

type ChatMessage = {
  user: string;
  ai: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // ✅ Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  // ✅ Send message to backend
  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://ai-learning-aia7.onrender.com/api/ai/chat",
        { message: userMessage }
      );

      setChat((prev) => [
        ...prev,
        { user: userMessage, ai: res.data.reply || "No response" },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      setChat((prev) => [
        ...prev,
        { user: userMessage, ai: "❌ AI failed. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-white">

      {/* 🔥 Header */}
      <div className="p-4 border-b border-slate-800 text-lg font-semibold">
        AI Assistant
      </div>

      {/* 💬 Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {chat.length === 0 && (
          <div className="text-center text-slate-500 mt-20">
            Start a conversation with AI 🚀
          </div>
        )}

        {chat.map((c, i) => (
          <div key={i} className="space-y-2">

            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-purple-600 px-4 py-2 rounded-xl max-w-[70%] text-sm">
                {c.user}
              </div>
            </div>

            {/* AI Message */}
            <div className="flex justify-start">
              <div className="bg-slate-800 px-4 py-2 rounded-xl max-w-[70%] text-sm text-slate-200">
                {c.ai}
              </div>
            </div>

          </div>
        ))}

        {/* ⏳ Loading Indicator */}
        {loading && (
          <div className="text-slate-400 text-sm">AI is typing...</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ✨ Input Bar */}
      <div className="p-4 border-t border-slate-800 bg-[#020617]">
        <div className="flex gap-3">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything..."
            className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-5 bg-purple-600 hover:bg-purple-500 rounded-lg transition disabled:opacity-50"
          >
            Send
          </button>

        </div>
      </div>

    </div>
  );
}