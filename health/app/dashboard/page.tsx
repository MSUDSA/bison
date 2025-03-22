"use client"

import { useState } from "react"
import {
  Activity,
  Calendar,
  ChevronDown,
  Clock,
  Droplets,
  Heart,
  History,
  Thermometer,
  User,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeartRateChart } from "./heart-rate-chart"
import { BloodPressureChart } from "./blood-pressure-chart"
import { TemperatureChart } from "./temperature-chart"
import { OxygenChart } from "./oxygen-chart"
import { PatientSelector } from "./patient-selector"
import { DateRangePicker } from "./date-range-picker"
import { InsightsGenerator } from "./insights-generator"
import { RecommendationsList } from "./recommendations-list"
import { PatientInsights } from "./patient-insights"

export default function Dashboard() {
  const [view, setView] = useState<"patient" | "provider">("patient")

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">HealthMonitor</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <DateRangePicker />
          {view === "provider" && <PatientSelector />}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {view === "patient" ? <User className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                {view === "patient" ? "Patient View" : "Provider View"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Switch View</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setView("patient")}>
                <User className="mr-2 h-4 w-4" />
                Patient View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView("provider")}>
                <Users className="mr-2 h-4 w-4" />
                Provider View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <Heart className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78 BPM</div>
              <p className="text-xs text-muted-foreground">Normal range</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120/80 mmHg</div>
              <p className="text-xs text-muted-foreground">Normal range</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.6 °F</div>
              <p className="text-xs text-muted-foreground">Normal range</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Oxygen</CardTitle>
              <Droplets className="h-4 w-4 text-sky-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">Normal range</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Vitals</TabsTrigger>
              <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
              <TabsTrigger value="blood-pressure">Blood Pressure</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="oxygen">Blood Oxygen</TabsTrigger>
              <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <History className="h-4 w-4" />
                History
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Calendar className="h-4 w-4" />
                Weekly
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Clock className="h-4 w-4" />
                Real-time
              </Button>
            </div>
          </div>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Heart Rate</CardTitle>
                  <CardDescription>Beats per minute over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <HeartRateChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Blood Pressure</CardTitle>
                  <CardDescription>Systolic and diastolic pressure over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <BloodPressureChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Temperature</CardTitle>
                  <CardDescription>Body temperature over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <TemperatureChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Blood Oxygen</CardTitle>
                  <CardDescription>Oxygen saturation percentage over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <OxygenChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="heart-rate">
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate</CardTitle>
                <CardDescription>Detailed heart rate analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <HeartRateChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="blood-pressure">
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure</CardTitle>
                <CardDescription>Detailed blood pressure analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <BloodPressureChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="temperature">
            <Card>
              <CardHeader>
                <CardTitle>Temperature</CardTitle>
                <CardDescription>Detailed temperature analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <TemperatureChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="oxygen">
            <Card>
              <CardHeader>
                <CardTitle>Blood Oxygen</CardTitle>
                <CardDescription>Detailed blood oxygen analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <OxygenChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="insights">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>Automated analysis of health metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InsightsGenerator />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Provider Recommendations</CardTitle>
                    <CardDescription>Clinical feedback and action plans</CardDescription>
                  </div>
                  {view === "provider" && <Button size="sm">Add Recommendation</Button>}
                </CardHeader>
                <CardContent>
                  <RecommendationsList />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        {(view === "provider" || view === "patient") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Health Insights</CardTitle>
                <CardDescription>Data-driven recommendations based on your health metrics</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Normal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">Warning</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Critical</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Info</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <PatientInsights />
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

