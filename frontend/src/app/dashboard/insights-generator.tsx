"use client"

import { useState } from "react"
import { AlertTriangle, ArrowRight, Brain, Check, Loader2 } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export type InsightType = "warning" | "normal" | "improvement" | "none"

export interface Insight {
  color_code: InsightType
  status_name?: string
  reason?: string
  metric_name: string
  timeframe?: string
  recommendation: string
  metric_value?: number
}
const sampleInsights: Insight[] = [
  {
    color_code: "warning",
    status_name: "Elevated Blood Pressure",
    reason:
      "Blood pressure readings have been consistently above normal range (120/80 mmHg) for the past week, with an average of 135/88 mmHg.",
    metric_name: "Blood Pressure",
    
    timeframe: "",
    metric_value: 40,
    recommendation:
    "Consider dietary sodium reduction and increased physical activity. Monitor more frequently and consult with provider if trend continues.",
  },
  {
    color_code: "normal",
    metric_value: 50,
    status_name: "Heart Rate Within Range",
    timeframe: "",
    reason:
    "Heart rate has maintained a healthy pattern between 65-80 BPM during rest periods, indicating good cardiovascular health.",
    metric_name: "Heart Rate",
    recommendation: "Continue current exercise regimen and monitoring schedule.",
  },
  {
    color_code: "improvement",
    metric_value: 60,
    status_name: "Improved Blood Oxygen Levels",
    reason: "Blood oxygen saturation has improved from an average of 95% to 98% over the past month.",
    timeframe: "",
    metric_name: "Blood Oxygen",
    recommendation: "Continue with current breathing exercises and activity level.",
  },
]

export function InsightsGenerator() {
  const [insights, setInsights] = useState<Insight[]>(sampleInsights)
  const [isGenerating, setIsGenerating] = useState(false)



  const handleGenerateInsights = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
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
          // size="sm"
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
        {insights.map((insight, index) => (
          <Alert key={index} className={getInsightColor(insight.color_code)}>
            <div className="flex items-start gap-3">
              {getInsightIcon(insight.color_code)}
              <div className="space-y-2 w-full">
                <AlertTitle className="font-medium">{insight.color_code}</AlertTitle>
                <AlertDescription className="text-sm">{insight.reason}</AlertDescription>
                <div className="flex flex-wrap gap-2 pt-1">
                    <Badge className="bg-white/50 border-battelle-blue/20">
                      {insight.metric_name}
                    </Badge>
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

