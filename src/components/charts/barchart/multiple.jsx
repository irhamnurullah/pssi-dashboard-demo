'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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

export function MultipleBarChart({dataChart, config}) {
  console.log(config);
  
  
  return (
    <Card className="border-none shadow-none h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
        {Object.keys(chartConfig).map(key => (
            <div key={key} className="flex items-center space-x-2">
              <div 
                className="rounded-md size-5" 
                style={{ backgroundColor: chartConfig[key].color }}
              ></div>
              <div className="text-sm">{chartConfig[key].label}</div>
            </div>
          ))}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart accessibilityLayer data={dataChart}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 4)} />
            <YAxis tickFormatter={(value) => `${value}`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="female_coaches" fill="#FF99CF" radius={4} />
            <Bar dataKey="male_coaches" fill="#3067D3" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
