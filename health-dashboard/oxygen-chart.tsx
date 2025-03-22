"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "12:00 AM", value: 97 },
  { time: "2:00 AM", value: 97 },
  { time: "4:00 AM", value: 96 },
  { time: "6:00 AM", value: 96 },
  { time: "8:00 AM", value: 98 },
  { time: "10:00 AM", value: 99 },
  { time: "12:00 PM", value: 99 },
  { time: "2:00 PM", value: 98 },
  { time: "4:00 PM", value: 98 },
  { time: "6:00 PM", value: 97 },
  { time: "8:00 PM", value: 97 },
  { time: "10:00 PM", value: 96 },
]

export function OxygenChart() {
  return (
    <ChartContainer
      config={{
        oxygen: {
          label: "Blood Oxygen",
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
            domain={[90, 100]}
            tickFormatter={(value) => `${value}%`}
            stroke="#003366"
          />
          <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `${value}%`} />} />
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

