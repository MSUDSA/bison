"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, Loader2, Brain, AlertTriangle, ArrowRight, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageType } from "../chat/types"
import { InsightType } from "./insights-generator"
import { useWebSocket } from "../WebSocketContext"



// Sample initial messages
const initialMessages: MessageType[] = [
  {
    is_ai: true,
    content: "Hello Dr. Johnson. I've analyzed John Doe's recent health data. How can I assist you today?",
    // timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    is_ai: false,
    content: "Can you analyze the patient's blood pressure trends over the past week?",
    // timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
  },
  {
    is_ai: true,
    content: {
      color_code: 'warning',
      metric_name: "Blood Pressure",
      recommendation: "'ve analyzed John Doe's blood pressure readings for the past week. The data shows an elevated pattern with an average of 135/88 mmHg, which is in the pre-hypertension range. There's a notable increase during morning hours (8-10 AM) and again in the evening (6-8 PM)."
    }
  },
]

export function AIAnalysisChat() {

  const [messages, setMessages] = useState<MessageType[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
const {sendMessage, message, isNewMessage} = useWebSocket()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function updateMessages(message: MessageType) {
    setIsTyping(false)
    setMessages((prevMessages) => [...prevMessages, message]);
  }
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const providerMessage: MessageType = {
      is_ai: false,
      content: inputValue,
      dm_id: 1
    }

    sendMessage(providerMessage)
    updateMessages(providerMessage)
    setInputValue("")

    setIsTyping(true)
  }

  useEffect(() => {
    if (isNewMessage && message) {
      updateMessages(message)
    }
  },[isNewMessage])

  const getAnalysisIcon = (type: InsightType) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "normal":
        return <Check className="h-4 w-4 text-green-500" />
      case "improvement":
        return <ArrowRight className="h-4 w-4 text-battelle-accent" />
      default:
        return null
    }
  }

  const getAnalysisColor = (type: InsightType) => {
    switch (type) {
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-800"
      case "normal":
        return "bg-green-50 border-green-200 text-green-800"
      case "improvement":
        return "bg-battelle-accent/10 border-battelle-accent/20 text-battelle-accent"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }


  return (
    <div className="flex flex-col h-[600px] border border-battelle-blue/20 rounded-lg overflow-hidden">
      <div className="bg-battelle-blue p-3 flex items-center gap-3">
        <Avatar className="h-8 w-8 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback className="bg-white text-battelle-blue">AI</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-white font-medium">Health Analysis Assistant</h3>
          <p className="text-white/70 text-xs">Analyzing data for John Doe</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-battelle-gray/30">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${!message.is_ai ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${!message.is_ai ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 mt-1">
                  {message.is_ai ? (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-battelle-blue text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-white border border-battelle-blue text-battelle-blue">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                <div className="space-y-2">
                  <div
                    className={`p-3 rounded-lg ${
                      message.is_ai ? "bg-white border border-battelle-blue/20" : "bg-battelle-blue text-white"
                    }`}
                  >
                    <p className="text-sm">{typeof message.content === "string" ? message.content : ''}</p>
                  </div>

                  {typeof message.content !== "string" && message.content.color_code !== "none" && (
                    <div className={`p-3 rounded-lg border ${getAnalysisColor(message.content.color_code)}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {getAnalysisIcon(message.content.color_code)}
                        <span className="text-xs font-medium">
                          {message.content.color_code === "warning"
                            ? "Warning"
                            : message.content.color_code === "normal"
                              ? "Normal"
                              : "Improvement"}
                        </span>
                      </div>

                      {message.content.metric_name && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            <Badge variant="outline" className="text-xs bg-white/50">
                              {message.content.metric_name}
                            </Badge>
                        </div>
                      )}

                      {message.content.recommendation && (
                        <div>
                          <p className="text-xs font-medium mb-1">Recommendation:</p>
                          <p className="text-xs">{message.content.recommendation}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`text-xs text-muted-foreground ${!message.is_ai? "text-right" : ""}`}>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-battelle-blue text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-white border border-battelle-blue/20">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-battelle-blue" />
                    <p className="text-sm text-muted-foreground">Analyzing data...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-battelle-blue/20 bg-white">
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask about patient health metrics or request analysis..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="min-h-[60px] resize-none border-battelle-blue/30 focus-visible:ring-battelle-blue"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-battelle-blue text-white hover:bg-battelle-lightblue self-end h-10 w-10 p-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <Brain className="h-3 w-3 text-battelle-blue" />
          <p className="text-xs text-muted-foreground">
            Try asking about specific metrics like "heart rate", "blood pressure", or request an "overall health
            summary"
          </p>
        </div>
      </div>
    </div>
  )
}

