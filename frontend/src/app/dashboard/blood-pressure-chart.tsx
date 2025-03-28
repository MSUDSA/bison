"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "12:00 AM", systolic: 118, diastolic: 75 },
  { time: "2:00 AM", systolic: 115, diastolic: 73 },
  { time: "4:00 AM", systolic: 112, diastolic: 70 },
  { time: "6:00 AM", systolic: 116, diastolic: 72 },
  { time: "8:00 AM", systolic: 125, diastolic: 80 },
  { time: "10:00 AM", systolic: 122, diastolic: 78 },
  { time: "12:00 PM", systolic: 124, diastolic: 79 },
  { time: "2:00 PM", systolic: 123, diastolic: 78 },
  { time: "4:00 PM", systolic: 120, diastolic: 76 },
  { time: "6:00 PM", systolic: 119, diastolic: 75 },
  { time: "8:00 PM", systolic: 118, diastolic: 74 },
  { time: "10:00 PM", systolic: 117, diastolic: 73 },
]

export function BloodPressureChart() {
  return (
    <ChartContainer
      config={{
        systolic: {
          label: "Systolic",
          color: "#003366",
        },
        diastolic: {
          label: "Diastolic",
          color: "#4a90e2",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            minTickGap={30}
            tickFormatter={(value) => value}
            stroke="#003366"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={[60, 140]}
            tickFormatter={(value) => `${value}`}
            stroke="#003366"
          />
          <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `${value} mmHg`} />} />
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="#003366"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, style: { fill: "#003366" } }}
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="#4a90e2"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, style: { fill: "#4a90e2" } }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

