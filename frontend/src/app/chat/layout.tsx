"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { WebSocketProvider } from "./WebSocketContext";
export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <WebSocketProvider>
    <div className="flex h-screen">
    <Sidebar />
    <div className="grow bg-gray-900 text-white">{children}</div>
    </div>
    </WebSocketProvider>
  )
}
