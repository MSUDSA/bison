"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Calendar, Clock, Edit, MessageSquare, Plus, Trash, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

interface Recommendation {
  id: string
  provider: {
    name: string
    avatar: string
    role: string
  }
  date: string
  content: string
  metrics: string[]
  status: "active" | "completed" | "cancelled"
}

// Sample recommendations data - in a real app, this would come from an API
const sampleRecommendations: Recommendation[] = [
  {
    id: "1",
    provider: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Cardiologist",
    },
    date: "March 18, 2024",
    content:
      "Reduce sodium intake to help lower blood pressure. Aim for less than 2,000mg per day. Increase potassium-rich foods like bananas, spinach, and sweet potatoes.",
    metrics: ["Blood Pressure"],
    status: "active",
  },
  {
    id: "2",
    provider: {
      name: "Dr. Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Primary Care",
    },
    date: "March 10, 2024",
    content:
      "Implement daily breathing exercises for 10 minutes to improve blood oxygen levels. Follow up in two weeks to assess improvement.",
    metrics: ["Blood Oxygen"],
    status: "completed",
  },
]

export function RecommendationsList() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(sampleRecommendations)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRecommendation, setNewRecommendation] = useState("")

  const handleAddRecommendation = () => {
    if (!newRecommendation.trim()) return

    // In a real app, this would send the data to an API
    const recommendation: Recommendation = {
      id: Date.now().toString(),
      provider: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Cardiologist",
      },
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      content: newRecommendation,
      metrics: ["Heart Rate"], // This would be selected in the form
      status: "active",
    }

    setRecommendations([recommendation, ...recommendations])
    setNewRecommendation("")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full flex items-center gap-2 mb-4">
            <Plus className="h-4 w-4" />
            Add New Recommendation
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Recommendation</DialogTitle>
            <DialogDescription>Create a new recommendation or treatment plan for this patient.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="metrics">Related Metrics</Label>
              <Input id="metrics" placeholder="e.g., Blood Pressure, Heart Rate" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recommendation">Recommendation</Label>
              <Textarea
                id="recommendation"
                placeholder="Enter your clinical recommendation..."
                value={newRecommendation}
                onChange={(e) => setNewRecommendation(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRecommendation}>Save Recommendation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={rec.provider.avatar} alt={rec.provider.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{rec.provider.name}</p>
                  <p className="text-xs text-muted-foreground">{rec.provider.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{rec.date}</span>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {rec.metrics.map((metric) => (
                  <Badge key={metric} variant="secondary" className="text-xs">
                    {metric}
                  </Badge>
                ))}
                <Badge
                  variant={rec.status === "active" ? "default" : rec.status === "completed" ? "outline" : "destructive"}
                  className="text-xs"
                >
                  {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm">{rec.content}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Follow up in 2 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

