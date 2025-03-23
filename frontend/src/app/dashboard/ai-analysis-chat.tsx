"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, Loader2, Brain, AlertTriangle, ArrowRight, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

type MessageType = "ai" | "provider"
type AnalysisType = "warning" | "normal" | "improvement" | "none"

interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: Date
  analysis?: {
    type: AnalysisType
    metrics?: string[]
    recommendation?: string
  }
}

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content: "Hello Dr. Johnson. I've analyzed John Doe's recent health data. How can I assist you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    analysis: {
      type: "none",
    },
  },
  {
    id: "2",
    type: "provider",
    content: "Can you analyze the patient's blood pressure trends over the past week?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
  },
  {
    id: "3",
    type: "ai",
    content:
      "I've analyzed John Doe's blood pressure readings for the past week. The data shows an elevated pattern with an average of 135/88 mmHg, which is in the pre-hypertension range. There's a notable increase during morning hours (8-10 AM) and again in the evening (6-8 PM).",
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
    analysis: {
      type: "warning",
      metrics: ["Blood Pressure"],
      recommendation:
        "Consider recommending dietary sodium reduction and increased physical activity. The timing of elevation suggests stress-related factors may be contributing. A follow-up within two weeks would be advisable to assess if interventions are effective.",
    },
  },
]

// AI response templates to simulate conversation
const aiResponses = [
  {
    trigger: ["heart", "rate", "bpm", "pulse"],
    response:
      "Based on the heart rate data, the patient has maintained a relatively stable pattern between 65-85 BPM during rest periods. However, I've noticed occasional spikes up to 110 BPM during what should be resting hours (11 PM - 2 AM) on three separate nights this week.",
    analysis: {
      type: "warning",
      metrics: ["Heart Rate"],
      recommendation:
        "These nocturnal spikes could indicate sleep disturbances or anxiety. Consider discussing sleep hygiene practices and possibly conducting a sleep assessment if the pattern continues.",
    },
  },
  {
    trigger: ["temperature", "fever"],
    response:
      "The patient's temperature readings have remained within the normal range (97.8°F - 98.6°F) consistently throughout the monitoring period, with no significant fluctuations or fever episodes.",
    analysis: {
      type: "normal",
      metrics: ["Temperature"],
      recommendation:
        "No intervention needed for temperature regulation. Current health practices appear effective in maintaining normal thermoregulation.",
    },
  },
  {
    trigger: ["oxygen", "o2", "saturation"],
    response:
      "The blood oxygen saturation data shows improvement over the past month, increasing from an average of 95% to a consistent 98%. This positive trend began approximately two weeks after the patient reported starting the breathing exercises you recommended.",
    analysis: {
      type: "improvement",
      metrics: ["Blood Oxygen"],
      recommendation:
        "The breathing exercises appear effective. Consider maintaining the current regimen and potentially adding 5 minutes of diaphragmatic breathing before sleep to further reinforce the improvement.",
    },
  },
  {
    trigger: ["medication", "prescribe", "drug", "treatment"],
    response:
      "Based on the current health metrics and trends, particularly the elevated blood pressure readings, medication intervention could be considered if lifestyle modifications don't show improvement within 4-6 weeks.",
    analysis: {
      type: "warning",
      metrics: ["Blood Pressure", "Heart Rate"],
      recommendation:
        "Before prescribing medication, I'd recommend a 4-week trial of lifestyle modifications including reduced sodium intake, increased physical activity, and stress management techniques. If blood pressure remains above 130/85 mmHg after this period, consider low-dose antihypertensive therapy.",
    },
  },
  {
    trigger: ["overall", "summary", "health", "status"],
    response:
      "Overall, John Doe's health metrics show mixed patterns. Blood pressure remains in the pre-hypertension range, heart rate is generally normal with occasional nocturnal elevations, temperature is stable, and blood oxygen levels have improved significantly.",
    analysis: {
      type: "normal",
      metrics: ["Blood Pressure", "Heart Rate", "Temperature", "Blood Oxygen"],
      recommendation:
        "Focus interventions on blood pressure management through lifestyle modifications. Continue monitoring heart rate patterns during sleep. Maintain current successful approaches for temperature regulation and blood oxygen improvement.",
    },
  },
]

export function AIAnalysisChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add provider message
    const providerMessage: Message = {
      id: Date.now().toString(),
      type: "provider",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages([...messages, providerMessage])
    setInputValue("")

    // Simulate AI thinking
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage = generateAIResponse(inputValue)
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): Message => {
    // Check if query matches any of our templates
    const lowerQuery = query.toLowerCase()

    for (const template of aiResponses) {
      if (template.trigger.some((keyword) => lowerQuery.includes(keyword))) {
        return {
          id: Date.now().toString(),
          type: "ai",
          content: template.response,
          timestamp: new Date(),
          analysis: template.analysis,
        }
      }
    }

    // Default response if no triggers match
    return {
      id: Date.now().toString(),
      type: "ai",
      content:
        "I've analyzed the patient data related to your query. The metrics appear to be within normal ranges, but I can provide more specific analysis if you clarify which health parameters you'd like me to focus on (heart rate, blood pressure, temperature, or blood oxygen).",
      timestamp: new Date(),
      analysis: {
        type: "normal",
        metrics: ["General Health"],
        recommendation: "Please specify which health metrics you'd like me to analyze in more detail.",
      },
    }
  }

  const getAnalysisIcon = (type: AnalysisType) => {
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

  const getAnalysisColor = (type: AnalysisType) => {
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "provider" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.type === "provider" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 mt-1">
                  {message.type === "ai" ? (
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
                      message.type === "ai" ? "bg-white border border-battelle-blue/20" : "bg-battelle-blue text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>

                  {message.analysis && message.analysis.type !== "none" && (
                    <div className={`p-3 rounded-lg border ${getAnalysisColor(message.analysis.type)}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {getAnalysisIcon(message.analysis.type)}
                        <span className="text-xs font-medium">
                          {message.analysis.type === "warning"
                            ? "Warning"
                            : message.analysis.type === "normal"
                              ? "Normal"
                              : "Improvement"}
                        </span>
                      </div>

                      {message.analysis.metrics && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {message.analysis.metrics.map((metric) => (
                            <Badge key={metric} variant="outline" className="text-xs bg-white/50">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {message.analysis.recommendation && (
                        <div>
                          <p className="text-xs font-medium mb-1">Recommendation:</p>
                          <p className="text-xs">{message.analysis.recommendation}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`text-xs text-muted-foreground ${message.type === "provider" ? "text-right" : ""}`}>
                    {formatTime(message.timestamp)}
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

