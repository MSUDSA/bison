"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useWebSocket } from "../WebSocketContext";
import { MessageType } from "../types";

export default function Page() {
  const {sendMessage, message, isNewMessage}= useWebSocket()
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { dm_id } = useParams()

  useEffect(() => {
    if (isNewMessage && message) {
      updateMessages(message)
    }
  }, [isNewMessage])

function updateMessages(message: MessageType) {
  setMessages((prevMessages) => [...prevMessages, message]);
  setMessages((prevMessage) => prevMessage.filter((msg) => msg.dm_id == dm_id))
}

  const sendUserMessage = () => {
    if (input.trim() !== "") {
      const userMessage: MessageType = { content: input, dm_id: Number(dm_id), is_ai: false };
      updateMessages(userMessage)
      sendMessage(userMessage)
      setInput("");
    }
  };

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
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[${msg.is_ai == false ? '50' : '80'}%] break-words ${
                msg.is_ai === false ? "bg-green-700 ml-auto" : "bg-gray-600"
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none resize-none h-12 max-h-40 overflow-y-auto"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendUserMessage();
            }
          }}
        />
        <button
          onClick={sendUserMessage}
          className="ml-2 p-2 bg-green-600 hover:bg-green-500 rounded-lg"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}




