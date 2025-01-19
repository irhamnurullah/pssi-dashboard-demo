"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function MultipleBarChart({ dataChart, config }) {

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {Object.keys(config).map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="rounded-md size-5"
                style={{ backgroundColor: config[key].color }}
              ></div>
              <div className="text-sm">{config[key].label}</div>
            </div>
          ))}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart accessibilityLayer data={dataChart}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <YAxis tickFormatter={(value) => `${value}`} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {/* <Bar dataKey="female_coaches" fill="#FF99CF" radius={4} />
            <Bar dataKey="male_coaches" fill="#3067D3" radius={4} /> */}
            {Object.keys(config).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config[key].color}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
