"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "AFC Level 1 Goalkeeping Coaching License", male: 186, female: 80 },
  { month: "February", male: 305, female: 200 },
  { month: "March", male: 237, female: 120 },
  { month: "April", male: 73, female: 190 },
  { month: "May", male: 209, female: 130 },
  { month: "June", male: 214, female: 140 },
];

const chartConfig = {
  desktop: {
    label: "Male",
    color: "#FF99CF",
  },
  mobile: {
    label: "Female",
    color: "#3067D3",
  },
};

export function BarChartHorizontalLabel({ dataChart, onClick }) {

  const handleClick = (category) => {
    onClick(category)
  }
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <ChartContainer style={{ height: "500px", width: "100%" }} config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dataChart}
            layout="vertical"
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 25,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={200} // Berikan ruang lebih untuk label sumbu Y
            />
            <XAxis type="number" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              onClick={(data, index) => handleClick({ data, index, dataKey: 'male' })}
              name="Male"
              dataKey="male"
              layout="vertical"
              radius={[4, 4, 0, 0]}
              fill="#3067D3"
              >
              <LabelList
                offset={10} // Jarak label dari batang
                dataKey="male"
                position="insideLeft" // Buat rata kiri di dalam batang
                fill="black"
                fontSize={12}
                formatter={(value) => `${value}`}
                />
            </Bar>

            <Bar
              onClick={(data, index) => handleClick({ data, index, dataKey: 'female' })}

              fill="#FF99CF"
              name="Female"
              dataKey="female"
              layout="vertical"
              radius={[0, 0, 4, 4]}
            >
              <LabelList
                offset={10} // Jarak label dari batang
                dataKey="female"
                position="insideLeft" // Buat rata kiri di dalam batang
                fill="black"
                fontSize={12}
                formatter={(value) => `${value}`}
              />
            </Bar>
            <Legend />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
