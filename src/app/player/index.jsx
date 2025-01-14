import { useEffect } from "react";
import { useState } from "react";
import CardGradient from "../../components/card/card_gradient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Bar, BarChart, Pie, PieChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlayerCard from "../../components/card/player_card";
import PlayerImg from "../../../public/player.png";

const playersCardsDataDummy = [
  {
    label: "Total Players",
    value: 1152,
    color: "green"
  },
  {
    label: "Male Players",
    value: 710,
    color: "blue"
  },
  {
    label: "Female Players",
    value: 442,
    color: "pink"
  }
]

const playersChartDataByAge = [
  { age: "U15", male: 216, female: 114 },
  { age: "U17", male: 266, female: 187 },
  { age: "U20", male: 806, female: 426 },
  { age: "U23", male: 707, female: 326 },
  { age: "Senior", male: 649, female: 583 },
]

const playersChartDataByProvince = [
  { province: "Jakarta", male: 877, female: 666 },
  { province: "West Java", male: 1298, female: 536 },
  { province: "East Java", male: 724, female: 659 },
  { province: "Central Java", male: 1240, female: 574 },
  { province: "Yogyakarta", male: 1144, female: 392 },
  { province: "Bali", male: 1351, female: 399 },
  { province: "North Sumatra", male: 1412, female: 550 },
  { province: "South Sulawesi", male: 506, female: 576 },
  { province: "West Sumatra", male: 1456, female: 302 },
  { province: "Riau", male: 855, female: 278 },
]

const playerPieChartDataByGender = [
  { gender: "male", quota: 649, fill: "var(--color-male)" },
  { gender: "female", quota: 583, fill: "var(--color-female)" }
]

export default function Player() {
  const [playersCardsData, setPlayersCardsData] = useState([]);
  
  const chartConfig = {
    female: {
      label: "Female Player",
      color: "#FF99CF",
    },
    male: {
      label: "Male Player",
      color: "#3067D3",
    },
  }

  const tableData = [
    {
      id: "P001",
      name: "Evan Dimas",
      position: "Midfielder",
      team: "Senior Men",
      currentClub: "Persija Jakarta",
      caps: 45,
      goals: 12
    },
    {
      id: "P002",
      name: "Asnawi Mangkualam",
      position: "Defender",
      team: "Senior Men",
      currentClub: "Jeonnam Dragons",
      caps: 28,
      goals: 3
    }
  ]

  useEffect(() => {
    getPlayersCardsData();
  }, [])
  
  const getPlayersCardsData = () => {
    setPlayersCardsData(playersCardsDataDummy);
  }
  
  return (
    <div className="container-pssi flex flex-col gap-8 px-5 md:px-[150px] py-10 bg-background-pssi">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-primary-pssi">Players</h1>
        <p className="text-gray-400">
          An Indonesian football player represents clubs or the national team, showcasing skills and passion in domestic and international competitions.
        </p>
      </div>

      <div className="grid grid-cols-3 p-4 gap-4 bg-white border rounded-lg">
        {playersCardsData.map((card, idx) => (
          <CardGradient
            key={idx}
            title={card.label}
            subtitle={card.value}
            color={card.color}
          />
        ))}
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full !overflow-visible"
      >
        <CarouselContent className="!overflow-visible">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 !overflow-visible">
              <PlayerCard
                img={PlayerImg}
                alt="player"
                country="Indonesia"
                playerName="Arhan Pratama"
                playerPosition="Midfielder - Senior Men"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="p-4 gap-4 bg-white border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>POSITION</TableHead>
              <TableHead>TEAM</TableHead>
              <TableHead>CURRENT CLUB</TableHead>
              <TableHead>CAPS</TableHead>
              <TableHead>GOALS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((data, idx) => (
              <TableRow key={idx}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.position}</TableCell>
                <TableCell>{data.team}</TableCell>
                <TableCell>{data.currentClub}</TableCell>
                <TableCell>{data.caps}</TableCell>
                <TableCell>{data.goals}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col col-span-5 p-4 gap-4 bg-white rounded-lg shadow-lg">
          <p className="font-bold">Player Distribution by Age Category and Gender</p>

          <ChartContainer config={chartConfig} className="h-full">
            <BarChart accessibilityLayer data={playersChartDataByAge}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="age"
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="male"
                stackId="a"
                fill="var(--color-male)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="female"
                stackId="a"
                fill="var(--color-female)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="flex flex-col col-span-7 p-4 gap-4 bg-white rounded-lg shadow-lg">
          <p className="font-bold">Player Distribution by Province</p>

          <ChartContainer config={chartConfig} className="h-full">
            <BarChart accessibilityLayer data={playersChartDataByProvince}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="province"
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="male"
                stackId="a"
                fill="var(--color-male)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="female"
                stackId="a"
                fill="var(--color-female)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-4 bg-white rounded-lg shadow-lg hidden">
        <p className="font-bold">Overall Player Distribution by Gender</p>

        <div className="flex w-full justify-center">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={playerPieChartDataByGender} dataKey="quota" label nameKey="gender" />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
