"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MessageType, WebSocketContextType } from "./chat/types";



const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<MessageType | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false)

  useEffect(() => {
    const authToken = Cookies.get("auth_token");
    if (!authToken) return;

    const ws = new WebSocket(`ws://localhost:8000/messages/ws?token=${authToken}`);

    ws.onmessage = (event) => {
      console.log("Message from server: ", event.data);
      const res: MessageType = JSON.parse(event.data);
      console.log(res)
      setIsNewMessage(true)
      setMessage(res);
    };

    ws.onclose = () => {
      console.log("WebSocket closed, attempting to reconnect...");
      setTimeout(() => setSocket(new WebSocket(`ws://localhost:8000/messages/ws?token=${authToken}`)), 2000);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message: MessageType) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log(message)
        console.log(isNewMessage)
        socket.send(JSON.stringify(message));
        setIsNewMessage(false)
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, message, isNewMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
