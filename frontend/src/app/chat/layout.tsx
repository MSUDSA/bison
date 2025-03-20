"use client";

import React from "react";
import { Sidebar } from "./sidebar";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="grow bg-gray-900 text-white">{children}</div>
    </div>
  )
}