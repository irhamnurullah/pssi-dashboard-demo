'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [
  { category: 'C1', female_coaches: 5, total_coaches: 10 },
  { category: 'C2', female_coaches: 305, total_coaches: 300 },
  { category: 'C3', female_coaches: 237, total_coaches: 320 },
  { category: 'FIFA', female_coaches: 73, total_coaches: 190 },
];

const chartConfig = {
  female_coaches: {
    label: 'Female Coaches',
    color: '#FF99CF',
  },
  total_coaches: {
    label: 'Total Coaches',
    color: '#3067D3',
  },
};

export function MultipleBarChart() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-md size-5" style={{ backgroundColor: chartConfig['female_coaches'].color }}></div>
            <div className="text-sm">{chartConfig['female_coaches'].label}</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="rounded-md size-5" style={{ backgroundColor: chartConfig['total_coaches'].color }}></div>
            <div className="text-sm">{chartConfig['total_coaches'].label}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 4)} />
            <YAxis tickFormatter={(value) => `${value}`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="female_coaches" fill="#FF99CF" radius={4} />
            <Bar dataKey="total_coaches" fill="#3067D3" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
