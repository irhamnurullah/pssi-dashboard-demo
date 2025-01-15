"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "GoalKeeper", visitors: 275, fill: "#2663EB" },
  { browser: "Defender", visitors: 200, fill: "#60A8FB" },
  { browser: "Midfielder", visitors: 187, fill: "#90C7FE" },
  { browser: "Forward", visitors: 173, fill: "#BEDCFE" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  GoalKeeper: {
    label: "Goal Keeper",
    color: "#2663EB",
  },
  Defende: {
    label: "Defender",
    color: "#60A8FB",
  },
  Midfielder: {
    label: "Midfielder",
    color: "#90C7FE",
  },
  Forward: {
    label: "Forward",
    color: "#BEDCFE",
  },
};

export function PieChartDonutActive({ title }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-5">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={50}
              strokeWidth={5}
              activeIndex={0}
              activeShape={(props) => {
                const { outerRadius = 0, ...restProps } = props;
                return <Sector {...restProps} outerRadius={outerRadius + 10} />;
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
