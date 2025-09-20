"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { topic: "Data Privacy", interest: 186 },
  { topic: "IP Rights", interest: 205 },
  { topic: "AI Ethics", interest: 237 },
  { topic: "Contracts", interest: 173 },
  { topic: "Cybersecurity", interest: 200 },
  { topic: "E-commerce", interest: 150 },
];

const chartConfig = {
  interest: {
    label: "Interest",
    color: "hsl(var(--primary))",
  },
};

export function TrendingTopicsChart() {
  return (
    <div className="glass-card p-4 rounded-lg">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="topic"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 6)}
          />
           <YAxis
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={false}
           />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent 
                indicator="dot"
                labelClassName="font-bold text-lg"
                className="glass-card"
            />}
          />
          <Bar 
            dataKey="interest" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            animationDuration={800}
           />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
