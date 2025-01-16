'use client';

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { title: "GK Senior Men 1", caps: 186 },
  { title: "GK Senior Men 2", caps: 305 },
  { title: "GK Senior Men 3", caps: 237 },
  { title: "GK Senior Men 4", caps: 73 },
  { title: "GK Senior Men 5", caps: 209 },
  { title: "GK Senior Men 6", caps: 202 },
  { title: "GK Senior Men 7", caps: 100 },
  { title: "GK Senior Men 8", caps: 20 },
  { title: "GK Senior Men 9", caps: 30 },
  { title: "GK Senior Men 10", caps: 150 },
]

const chartConfig = {
  caps: {
    label: "Caps",
    color: "#90C7FE",
  },
}

export function HorizontalChart({title}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
            }}
          >
            <XAxis type="number" dataKey="caps" hide />
            <YAxis
              dataKey="title"
              type="category"
              tickLine={false}
              tickMargin={10}
              width={150} 
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="caps" fill="var(--color-caps)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
