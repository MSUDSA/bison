"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "12:00 AM", value: 72 },
  { time: "2:00 AM", value: 68 },
  { time: "4:00 AM", value: 65 },
  { time: "6:00 AM", value: 70 },
  { time: "8:00 AM", value: 85 },
  { time: "10:00 AM", value: 78 },
  { time: "12:00 PM", value: 82 },
  { time: "2:00 PM", value: 80 },
  { time: "4:00 PM", value: 77 },
  { time: "6:00 PM", value: 76 },
  { time: "8:00 PM", value: 74 },
  { time: "10:00 PM", value: 73 },
]

export function HeartRateChart() {
  return (
    <ChartContainer
      config={{
        heartRate: {
          label: "Heart Rate",
          color: "hsl(var(--chart-1))",
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
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={[50, 100]}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `${value} BPM`} />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-heartRate)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, style: { fill: "var(--color-heartRate)" } }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

