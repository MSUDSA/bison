"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "12:00 AM", value: 98.4 },
  { time: "2:00 AM", value: 98.2 },
  { time: "4:00 AM", value: 98.0 },
  { time: "6:00 AM", value: 97.9 },
  { time: "8:00 AM", value: 98.3 },
  { time: "10:00 AM", value: 98.6 },
  { time: "12:00 PM", value: 98.8 },
  { time: "2:00 PM", value: 99.0 },
  { time: "4:00 PM", value: 98.9 },
  { time: "6:00 PM", value: 98.7 },
  { time: "8:00 PM", value: 98.6 },
  { time: "10:00 PM", value: 98.5 },
]

export function TemperatureChart() {
  return (
    <ChartContainer
      config={{
        temperature: {
          label: "Temperature",
          color: "#003366",
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
            domain={[97, 100]}
            tickFormatter={(value) => `${value}°F`}
            stroke="#003366"
          />
          <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `${value}°F`} />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#003366"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, style: { fill: "#003366" } }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

