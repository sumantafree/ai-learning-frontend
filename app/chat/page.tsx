"use client";

import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const res = await axios.post(
      "https://ai-learning-aia7.onrender.com/api/ai/chat",
      { message }
    );

    setChat([...chat, { user: message, ai: res.data.reply }]);
    setMessage("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>

      <div className="space-y-4 mb-4">
        {chat.map((c, i) => (
          <div key={i}>
            <div className="text-right text-blue-400">{c.user}</div>
            <div className="text-left text-gray-300">{c.ai}</div>
          </div>
        ))}
      </div>

      <input
        className="w-full p-3 rounded bg-gray-800"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
      />

      <button
        onClick={sendMessage}
        className="mt-3 w-full bg-purple-600 p-3 rounded"
      >
        Send
      </button>
    </div>
  );
}