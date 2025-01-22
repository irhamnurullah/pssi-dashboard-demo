import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function MultipleBarChart({ dataChart, config, onClick }) {
  // Handler untuk event click pada kategori
  const handleCategoryClick = (category) => {
    onClick(category);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {config?.map((item) => (
            <div key={item.dataKey} className="flex items-center space-x-2">
              <div
                className="rounded-md size-5"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="text-sm">{item.label}</div>
            </div>
          ))}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          style={{ height: '400px', width: '100%' }} // Tingkatkan tinggi container agar elemen memiliki ruang cukup
          config={Object.fromEntries(
            config.map(({ dataKey, color }) => [
              dataKey,
              {
                label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
                color,
              },
            ])
          )}
        >
          <BarChart
            className="h-full"
            accessibilityLayer
            data={dataChart}
            margin={{
              left: 12,
              right: 0,
              bottom:200, // Tingkatkan margin bawah agar teks tidak terpotong
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              textAnchor='start'
              dataKey="category"
              angle={45} // Rotasi label sumbu X agar tidak saling tumpang tindih
              tickLine={false}
              axisLine={false}
              tickMargin={16} // Tambahkan margin antara label dan grafik
              interval={0} // Pastikan semua label muncul
              tickFormatter={(value) => value}
            />
            <YAxis
              tick={{ fontSize: 12 }} // Atur ukuran font untuk label sumbu Y
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor
              active
              content={<ChartTooltipContent indicator="line" />}
            />
            {config?.map((item) => (
              <Bar
                barSize={30}
                fill={item.color}
                key={item.dataKey}
                dataKey={item.dataKey}
                radius={4}
                onClick={(data, index) =>
                  handleCategoryClick({ data, index, dataKey: item.dataKey })
                }
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
