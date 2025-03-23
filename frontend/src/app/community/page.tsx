"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, MapPin, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const MOCK_CHATS = [
  {
    id: "1",
    name: "Anxiety Support Group",
    lastMessage: "Has anyone tried meditation for anxiety?",
    time: "10:30 AM",
    unread: 3,
  },
  {
    id: "2",
    name: "Local Mental Health",
    lastMessage: "The community meetup is this Saturday at 2pm",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    name: "Chronic Pain Management",
    lastMessage: "I found a new physical therapy technique that helps",
    time: "2 days ago",
    unread: 0,
  },
]

const MOCK_MESSAGES = [
  {
    id: "1",
    sender: "Jane",
    content: "Has anyone tried meditation for anxiety?",
    time: "10:30 AM",
    isCurrentUser: false,
  },
  {
    id: "2",
    sender: "Mike",
    content:
      "Yes, I've been doing guided meditation for about 3 months now. It's really helped me manage my anxiety symptoms.",
    time: "10:32 AM",
    isCurrentUser: false,
  },
  {
    id: "3",
    sender: "You",
    content: "I've tried a few times but had trouble staying focused. Any tips for beginners?",
    time: "10:35 AM",
    isCurrentUser: true,
  },
  {
    id: "4",
    sender: "Jane",
    content:
      "Start with just 5 minutes a day. There are some great apps like Calm or Headspace that have beginner sessions.",
    time: "10:37 AM",
    isCurrentUser: false,
  },
  {
    id: "5",
    sender: "Mike",
    content:
      "And don't be too hard on yourself if your mind wanders. That's normal! Just gently bring your focus back when you notice it.",
    time: "10:38 AM",
    isCurrentUser: false,
  },
]

// Simple encryption/decryption functions
function encryptMessage(message: string): string {
  // This is a very basic encryption for demonstration
  // In a real app, you would use a proper encryption library
  return btoa(message)
}

function decryptMessage(encrypted: string): string {
  // This is a very basic decryption for demonstration
  return atob(encrypted)
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          toast({
            title: "Location detected",
            description: "You can now see groups and users near you.",
          })
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Some features may be limited without location access.",
            variant: "destructive",
          })
        },
      )
    }
  }, [toast])

  const sendMessage = () => {
    if (!message.trim()) return

    // Encrypt the message before "sending"
    const encrypted = encryptMessage(message)
    console.log("Encrypted message:", encrypted)

    // In a real app, you would send the encrypted message to the server
    // Here we just add it to our local state
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: "You",
      content: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isCurrentUser: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-[#003366] bg-[url('/space-background.png')] bg-cover bg-center text-white flex flex-col">
      <header className="p-4 border-b border-white/20 backdrop-blur-md bg-[#003366]/70 flex justify-between items-center">
        <h1 className="text-xl font-bold">HealthSpace Connect</h1>
        <div className="flex items-center gap-4">
          {location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Location active</span>
            </div>
          )}
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/20 bg-[#003366]/70 backdrop-blur-md flex flex-col">
          <Tabs defaultValue="chats" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 m-2 bg-white/10">
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>

            <TabsContent value="chats" className="flex-1 overflow-y-auto p-2 space-y-2">
              {MOCK_CHATS.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeChat.id === chat.id ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                  onClick={() => setActiveChat(chat)}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{chat.name}</div>
                    <div className="text-xs text-white/70">{chat.time}</div>
                  </div>
                  <div className="text-sm text-white/70 truncate mt-1">{chat.lastMessage}</div>
                  {chat.unread > 0 && (
                    <div className="mt-1 flex justify-end">
                      <span className="bg-white text-[#003366] text-xs rounded-full px-2 py-0.5">{chat.unread}</span>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="nearby" className="flex-1 overflow-y-auto p-2">
              {location ? (
                <div className="space-y-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <div className="font-medium">Mental Health Support</div>
                    <div className="text-sm text-white/70 mt-1">5 members • 0.8 miles away</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 w-full border-white/50 text-white hover:bg-white/20"
                    >
                      Join Group
                    </Button>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg">
                    <div className="font-medium">Chronic Illness Network</div>
                    <div className="text-sm text-white/70 mt-1">12 members • 1.2 miles away</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 w-full border-white/50 text-white hover:bg-white/20"
                    >
                      Join Group
                    </Button>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg">
                    <div className="font-medium">Anxiety & Depression</div>
                    <div className="text-sm text-white/70 mt-1">8 members • 2.5 miles away</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 w-full border-white/50 text-white hover:bg-white/20"
                    >
                      Join Group
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <MapPin className="h-12 w-12 mb-4 text-white/50" />
                  <h3 className="text-lg font-medium">Location Access Required</h3>
                  <p className="text-white/70 mt-2">Please enable location access to see groups and users near you.</p>
                  <Button className="mt-4 bg-white text-[#003366] hover:bg-white/90">Enable Location</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="p-3 border-t border-white/20 flex justify-around">
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Users className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <MapPin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10" asChild>
              <Link href="/">
                <LogOut className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-white/20 backdrop-blur-md bg-[#003366]/70">
            <div className="font-medium">{activeChat.name}</div>
            <div className="text-sm text-white/70">
              {activeChat.id === "1" ? "5 members • End-to-end encrypted" : "8 members • End-to-end encrypted"}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.isCurrentUser ? "bg-white text-[#003366]" : "bg-white/20 text-white"
                  }`}
                >
                  {!msg.isCurrentUser && <div className="font-medium text-sm mb-1">{msg.sender}</div>}
                  <div>{msg.content}</div>
                  <div className="text-xs mt-1 text-right opacity-70">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/20 backdrop-blur-md bg-[#003366]/70">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
              />
              <Button onClick={sendMessage} size="icon" className="bg-white text-[#003366] hover:bg-white/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-white/50 mt-2 text-center">Messages are end-to-end encrypted</div>
          </div>
        </div>
      </div>
    </div>
  )
}

