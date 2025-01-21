'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  tugas: {
    label: 'Total Tugas',
    color: '#7E0000',
  },
};

export function BarChartInteractive({ chartData }) {
  return (
    <div className="p-5">
      <CardContent>
        <ChartContainer config={chartConfig} className="max-w-screen-xl h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              bottom: 50,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="NAMA_PETUGAS"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0} // Pastikan semua label muncul
              angle={-15} // Rotasi label jika terlalu panjang
              textAnchor="end" // Atur posisi label setelah
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent className="w-[150px]" labelFormatter={(value) => `Petugas: ${value}`} />} />
            <Bar barSize={30} dataKey="TOTAL_TUGAS" fill="var(--color-tugas)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
