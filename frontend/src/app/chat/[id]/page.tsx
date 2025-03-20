"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function Page() {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "user" | "ai" }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newUserMessage = { id: messages.length + 1, text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInput("");

      // Simulate AI response (you can replace this with actual API call for AI)
      setTimeout(() => {
        const newAIMessage = {
          id: messages.length + 2,
          text: "This is an AI response to your message.",
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, newAIMessage]);
      }, 1000);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-4 flex flex-col h-screen max-w-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-2 bg-gray-800 rounded-md space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">Start the conversation...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded-lg max-w-[${msg.id % 2 == 1 ? '50' : '80'}%] break-words ${
                msg.sender === "user" ? "bg-green-700 ml-auto" : "bg-gray-600"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
        {/* Dummy div to keep scroll at the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="flex items-center mt-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none resize-none h-12 max-h-40 overflow-y-auto"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-green-600 hover:bg-green-500 rounded-lg"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
