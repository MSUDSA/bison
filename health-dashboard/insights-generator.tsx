"use client"

import { useState } from "react"
import { AlertTriangle, ArrowRight, Brain, Check, Loader2 } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type InsightType = "warning" | "normal" | "improvement"

interface Insight {
  id: string
  type: InsightType
  title: string
  description: string
  metrics: string[]
  recommendation: string
}

// Sample insights data - in a real app, this would come from an API
const sampleInsights: Insight[] = [
  {
    id: "1",
    type: "warning",
    title: "Elevated Blood Pressure",
    description:
      "Blood pressure readings have been consistently above normal range (120/80 mmHg) for the past week, with an average of 135/88 mmHg.",
    metrics: ["Blood Pressure"],
    recommendation:
      "Consider dietary sodium reduction and increased physical activity. Monitor more frequently and consult with provider if trend continues.",
  },
  {
    id: "2",
    type: "normal",
    title: "Heart Rate Within Range",
    description:
      "Heart rate has maintained a healthy pattern between 65-80 BPM during rest periods, indicating good cardiovascular health.",
    metrics: ["Heart Rate"],
    recommendation: "Continue current exercise regimen and monitoring schedule.",
  },
  {
    id: "3",
    type: "improvement",
    title: "Improved Blood Oxygen Levels",
    description: "Blood oxygen saturation has improved from an average of 95% to 98% over the past month.",
    metrics: ["Blood Oxygen"],
    recommendation: "Continue with current breathing exercises and activity level.",
  },
]

export function InsightsGenerator() {
  const [insights, setInsights] = useState<Insight[]>(sampleInsights)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateInsights = () => {
    setIsGenerating(true)
    // Simulate API call to generate insights
    setTimeout(() => {
      setIsGenerating(false)
      // In a real app, this would update with new insights from the API
    }, 2000)
  }

  const getInsightIcon = (type: InsightType) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "normal":
        return <Check className="h-5 w-5 text-green-500" />
      case "improvement":
        return <ArrowRight className="h-5 w-5 text-battelle-accent" />
      default:
        return null
    }
  }

  const getInsightColor = (type: InsightType) => {
    switch (type) {
      case "warning":
        return "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
      case "normal":
        return "bg-green-50 text-green-800 border-green-200 hover:bg-green-100"
      case "improvement":
        return "bg-battelle-accent/10 text-battelle-accent border-battelle-accent/20 hover:bg-battelle-accent/20"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-battelle-blue" />
          <span className="text-sm font-medium text-battelle-blue">AI-powered health insights</span>
        </div>
        <Button
          size="sm"
          onClick={handleGenerateInsights}
          disabled={isGenerating}
          className="bg-battelle-blue text-white hover:bg-battelle-lightblue"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Generate New Insights"
          )}
        </Button>
      </div>

      <Separator className="bg-battelle-blue/10" />

      <div className="space-y-3">
        {insights.map((insight) => (
          <Alert key={insight.id} className={getInsightColor(insight.type)}>
            <div className="flex items-start gap-3">
              {getInsightIcon(insight.type)}
              <div className="space-y-2 w-full">
                <AlertTitle className="font-medium">{insight.title}</AlertTitle>
                <AlertDescription className="text-sm">{insight.description}</AlertDescription>
                <div className="flex flex-wrap gap-2 pt-1">
                  {insight.metrics.map((metric) => (
                    <Badge key={metric} variant="outline" className="bg-white/50 border-battelle-blue/20">
                      {metric}
                    </Badge>
                  ))}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium">Recommendation:</p>
                  <p className="text-sm">{insight.recommendation}</p>
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  )
}

