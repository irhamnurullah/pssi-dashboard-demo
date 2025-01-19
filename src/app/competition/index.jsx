import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import NavBar from "../../components/navbar";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MultipleBarChart } from "../../components/charts/barchart/multiple";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  //   ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import MapsChart from "../../components/maps/mapsChart";

const chartData = [
  { city: "Jakarta", totalclubs: 186, totalplayers: 80, totalofficial: 20 },
  { city: "Medan", totalclubs: 100, totalplayers: 200, totalofficial: 50 },
  { city: "Bandung", totalclubs: 150, totalplayers: 200, totalofficial: 70 },
  { city: "Banten", totalclubs: 73, totalplayers: 190, totalofficial: 90 },
  { city: "Jambi", totalclubs: 209, totalplayers: 130, totalofficial: 50 },
  { city: "Bali", totalclubs: 214, totalplayers: 140, totalofficial: 40 },
];

const chartConfig = {
  totalclubs: {
    label: "TOTAL CLUBS",
    color: "#4ADE80",
  },
  totalplayers: {
    label: "TOTAL PLAYERS",
    color: "#1D4ED8",
  },
  totalofficial: {
    label: "TOTAL OFFICIAL",
    color: "#FDA4AF",
  },
};

export default function Competition() {
  const dataHeader = [
    {
      id: 1,
      title: "Soeratin U13",
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 2,
      title: "Soeratin U15",
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 3,
      title: "Soeratin U17",
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 4,
      title: "Liga4",
      totalClubs: 166,
      totalPlayers: 2502,
    },
  ];

  const dataMaps = [
    ["id-ac", 19050],
    ["id-su", 48466],
    ["id-sb", 25862],
    ["id-sl", 67061],
    ["id-ri", 55266],
    ["id-kr", 9906],
    ["id-ja", 11174],
    ["id-be", 3638],
    ["id-bb", 2621],
    ["id-1024", 14481],
    ["id-jk", 127904],
    ["id-bt", 65361],
    ["id-jr", 210775],
    ["id-jt", 94373],
    ["id-yo", 23168],
    ["id-ji", 108284],
    ["id-nb", 4192],
    ["id-nt", 3393],
    ["id-kb", 5462],
    ["id-kt", 1976],
    ["id-ks", 6903],
    ["id-ki", 52417],
    ["id-sw", 5725],
    ["id-se", 29912],
    ["id-sr", 711],
    ["id-st", 4327],
    ["id-go", 1149],
    ["id-sg", 3430],
    ["id-ma", 3607],
    ["id-la", 1168],
    ["id-pa", 3911],
    ["id-ba", 5377],
  ];

  const [activeCard, setActiveCard] = useState(1);

  return (
    <div>
      <div className="bg-[#7E0000] absolute h-[60vh] w-full z-10"></div>
      <NavBar  bgColor="#FFFFFF" selectedTextColor="#7E0000" secondaryTextColor="#C6C6C6" />
      <div className="z-20 relative container-pssi">
        <h2 className="text-[#A54D4D] text-3xl font-bold">Competition</h2>
        <p className="text-sm text-neutral-400 mt-2">
          An Indonesian competition is an organized event where participants
          compete in various fields, such as sports, arts, or academics, at
          regional, national, or international levels.
        </p>

        <div className="flex flex-row mt-5 bg-white p-5">
          {dataHeader.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveCard(item.id)}
              style={{ cursor: "pointer" }}
              className={`${
                activeCard === item.id
                  ? "bg-gradient-to-r from-[#92D4F8] from-10% via-[#92D4F8] via-30% via-[#006FFF] via-50% via-[#16A34A] via-70% to-[#81F6E8] to-90%"
                  : "bg-white"
              } rounded-xl shadow-lg p-3 w-full ml-3`}
            >
              <div className="flex justify-between">
                <span className="text-gray-700 text-[18px] text-lg font-bold">
                  {item.title}
                </span>
              </div>
              {activeCard === item.id && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-700 text-[12px]">Total Club</span>
                    <span className="text-[#006FFF] font-medium text-[12px]">
                      {item.totalClubs}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 text-[12px]">
                      Total Players
                    </span>
                    <span className="text-[#16A34A] font-medium text-[12px]">
                      {item.totalPlayers}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-row mt-5 bg-white p-5">
          <div className="w-full">
            <h3 className="font-semibold">Soeratin U13</h3>
            {/* <Card>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="city"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value}
                    />
                    <YAxis tickFormatter={(value) => `${value}`} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar
                      dataKey="totalclubs"
                      fill="var(--color-totalclubs)"
                      radius={4}
                    />
                    <Bar
                      dataKey="totalplayers"
                      fill="var(--color-totalplayers)"
                      radius={4}
                    />
                    <Bar
                      dataKey="totalofficial"
                      fill="var(--color-totalofficial)"
                      radius={4}
                    />
                    <ChartLegend
                      layout="horizontal" // Menampilkan legend secara horizontal
                      align="center" // Menyelaraskan legend ke tengah
                      verticalAlign="top" // Memindahkan legend ke bagian atas
                      content={<ChartLegendContent />}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card> */}

            <div className="flex flex-col mt-3">
              <div className="flex justify-end">
                <Select>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Total</SelectLabel>
                      <SelectItem value="TOTAL_KLUB">Total Clubs</SelectItem>
                      <SelectItem value="TOTAL_PEMAIN">Total Players</SelectItem>
                      <SelectItem value="TOTAL_OFFICIAL">Total Official</SelectItem>
                      <SelectItem value="TOTAL_PERTANDINGAN">Total Pertandingan</SelectItem>
                      <SelectItem value="TOTAL_GOL">Total Gol</SelectItem>
                      <SelectItem value="TOTAL_KML">Total Kartu Merah Langsung</SelectItem>
                      <SelectItem value="TOTAL_KMT">Total Kartu Merah Tidak Langsung</SelectItem>
                      <SelectItem value="TOTAL_KK">Total Kartu Kuning</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <MapsChart dataMaps={dataMaps} />
          </div>
        </div>
        <div className="flex flex-row mt-5 bg-white p-5">
          <div className="w-full ml-5">
            <div className="text-black font-bold">Player List SoeratinU13</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">PROVINCE</TableHead>
                  <TableHead>TOTAL CLUB</TableHead>
                  <TableHead>TOTAL PLAYERS</TableHead>
                  <TableHead>TOTAL OFFICIAL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Jakarta</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bandung</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell>900</TableCell>
                  <TableCell>250</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Surabaya</TableCell>
                  <TableCell>200</TableCell>
                  <TableCell>1100</TableCell>
                  <TableCell>300</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medan</TableCell>
                  <TableCell>120</TableCell>
                  <TableCell>800</TableCell>
                  <TableCell>220</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Yogyakarta</TableCell>
                  <TableCell>180</TableCell>
                  <TableCell>950</TableCell>
                  <TableCell>280</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Makassar</TableCell>
                  <TableCell>140</TableCell>
                  <TableCell>870</TableCell>
                  <TableCell>240</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Denpasar</TableCell>
                  <TableCell>170</TableCell>
                  <TableCell>920</TableCell>
                  <TableCell>270</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Semarang</TableCell>
                  <TableCell>130</TableCell>
                  <TableCell>890</TableCell>
                  <TableCell>230</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Palembang</TableCell>
                  <TableCell>160</TableCell>
                  <TableCell>940</TableCell>
                  <TableCell>260</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pekanbaru</TableCell>
                  <TableCell>190</TableCell>
                  <TableCell>1020</TableCell>
                  <TableCell>290</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
