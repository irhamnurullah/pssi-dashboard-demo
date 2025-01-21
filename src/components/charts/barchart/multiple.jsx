import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function MultipleBarChart({ dataChart, config, onClick }) {
  // Handler untuk event click pada kategori
  const handleCategoryClick = (category) => {
    onClick(category);
  };

  return (
    <Card className="border-none shadow-none h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {config?.map((item) => (
            <div key={item.dataKey} className="flex items-center space-x-2">
              <div className="rounded-md size-5" style={{ backgroundColor: item.color }}></div>
              <div className="text-sm">{item.label}</div>
            </div>
          ))}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={Object.fromEntries(
            config.map(({ dataKey, color }) => [dataKey, { label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1), color }])
          )}
        >
          <BarChart accessibilityLayer data={dataChart} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 4)} />
            <YAxis tickFormatter={(value) => `${value}`} />
            <ChartTooltip cursor active content={<ChartTooltipContent indicator="line" />} />
            {config?.map((item) => (
              <Bar
                fill={item.color}
                key={item.dataKey}
                dataKey={item.dataKey}
                radius={4}
                onClick={(data, index) => handleCategoryClick({ data, index, dataKey: item.dataKey })}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
