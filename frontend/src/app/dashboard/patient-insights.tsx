"use client"

import type React from "react"

import { Activity, AlertTriangle, ArrowRight, ArrowUp, Droplets, Heart, Info, Thermometer } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface Insight {
  id: string
  severity: "normal" | "warning" | "critical" | "info"
  title: string
  description: string
  recommendation: string
  metric: {
    name: string
    value: string
    icon: React.ReactNode
  }
  timeframe: string
}

// Sample insights data - in a real app, this would come from an API
const insights: Insight[] = [
  {
    id: "1",
    severity: "warning",
    title: "Elevated Blood Pressure",
    description:
      "Your blood pressure readings have been consistently above the normal range for the past week. The average reading is 135/88 mmHg, which is in the pre-hypertension range.",
    recommendation:
      "Consider reducing sodium intake to less than 2,000mg daily. Increase consumption of potassium-rich foods like bananas and leafy greens. Monitor your readings daily and practice stress-reduction techniques like deep breathing.",
    metric: {
      name: "Blood Pressure",
      value: "135/88 mmHg",
      icon: <Activity className="h-5 w-5" />,
    },
    timeframe: "Last 7 days",
  },
  {
    id: "2",
    severity: "critical",
    title: "Irregular Heart Rate Pattern",
    description:
      "We've detected an irregular pattern in your heart rate during sleep hours. Your heart rate fluctuated between 48-110 BPM with sudden spikes occurring 3 times last night.",
    recommendation:
      "This pattern requires medical attention. Please schedule an appointment with your cardiologist within the next 48 hours. Until then, avoid caffeine, alcohol, and strenuous exercise.",
    metric: {
      name: "Heart Rate",
      value: "48-110 BPM",
      icon: <Heart className="h-5 w-5" />,
    },
    timeframe: "Last night",
  },
  {
    id: "3",
    severity: "normal",
    title: "Stable Body Temperature",
    description:
      "Your body temperature has remained within the normal range (97.8°F - 98.6°F) consistently throughout the monitoring period.",
    recommendation:
      "Continue your current health practices. Your temperature readings indicate normal thermoregulation.",
    metric: {
      name: "Temperature",
      value: "98.2°F",
      icon: <Thermometer className="h-5 w-5" />,
    },
    timeframe: "Last 30 days",
  },
  {
    id: "4",
    severity: "info",
    title: "Improved Blood Oxygen Trend",
    description:
      "Your blood oxygen saturation has shown improvement, increasing from an average of 95% to 98% over the past month.",
    recommendation:
      "The breathing exercises you've been practicing appear to be effective. Continue with your current regimen and consider adding 5 minutes of diaphragmatic breathing before sleep.",
    metric: {
      name: "Blood Oxygen",
      value: "98%",
      icon: <Droplets className="h-5 w-5" />,
    },
    timeframe: "Last 30 days",
  },
]

export function PatientInsights() {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      case "critical":
        return <AlertTriangle className="h-5 w-5" />
      case "normal":
        return <ArrowRight className="h-5 w-5" />
      case "info":
        return <ArrowUp className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "warning":
        return "border-l-amber-500 bg-amber-50"
      case "critical":
        return "border-l-red-500 bg-red-50"
      case "normal":
        return "border-l-green-500 bg-green-50"
      case "info":
        return "border-l-battelle-accent bg-battelle-accent/10"
      default:
        return ""
    }
  }

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case "warning":
        return "text-amber-800"
      case "critical":
        return "text-red-800"
      case "normal":
        return "text-green-800"
      case "info":
        return "text-battelle-accent"
      default:
        return ""
    }
  }

  const getBadgeColor = (severity: string) => {
    switch (severity) {
      case "warning":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "normal":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "info":
        return "bg-battelle-accent/20 text-battelle-accent hover:bg-battelle-accent/30"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <div key={insight.id} className={`rounded-lg border-l-4 p-4 ${getSeverityColor(insight.severity)}`}>
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 ${getSeverityTextColor(insight.severity)}`}>
              {getSeverityIcon(insight.severity)}
            </div>
            <div className="space-y-3 w-full">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium text-base ${getSeverityTextColor(insight.severity)}`}>{insight.title}</h3>
                <Badge variant="outline" className={getBadgeColor(insight.severity)}>
                  {insight.timeframe}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  {insight.metric.icon}
                  <span className="font-medium">{insight.metric.name}:</span>
                </div>
                <span>{insight.metric.value}</span>
              </div>

              <p className="text-sm text-muted-foreground">{insight.description}</p>

              <div className="pt-1">
                <h4 className="text-sm font-medium mb-1">Recommendation:</h4>
                <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

