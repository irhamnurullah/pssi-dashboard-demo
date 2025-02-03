'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

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
        <ChartContainer config={chartConfig} className="max-w-screen-xl h-[350px] w-full">
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
             className='uppercase'
              dataKey="NAMA_PETUGAS"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0} // Pastikan semua label muncul
              // angle={-15} // Rotasi label jika terlalu panjang
              textAnchor="end" // Atur posisi label setelah
              tick={(props) => {
                const { x, y, payload } = props
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="middle"
                      fill="#666"
                      fontSize={10}
                      width={100}
                      style={{ wordWrap: "break-word" }}
                    >
                      <tspan x="0" dy="0">
                        {payload.value.split(" ").slice(0, 2).join(" ")}
                      </tspan>
                      <tspan x="0" dy="1.2em">
                        {payload.value.split(" ").slice(2).join(" ")}
                      </tspan>
                    </text>
                  </g>
                )
              }}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent className="w-[150px]" labelFormatter={(value) => value} />} />
            {/* <Bar barSize={30} dataKey="Total" fill="var(--color-tugas)" /> */}
            <Bar dataKey="Total" fill="var(--color-tugas)" barSize={30}>
              <LabelList position="top" offset={12} className="fill-foreground font-bold" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
