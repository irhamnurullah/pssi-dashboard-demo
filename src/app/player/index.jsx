import { useEffect, useState } from "react";
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
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import PlayerCard from "../../components/card/player_card";
import PlayerImg from "../../assets/marselino.jpeg";
import { PieChartLabel } from "../../components/charts/piechart/piechart-label";
import NavBar from "../../components/navbar";
import sessions from "../../../utils/sessions";
import apiService from "../../../utils/services";
import { DataTable } from "@/components/table/datatable";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const playersCardsDataDummy = [
  {
    label: "Total Players",
    value: 1152,
    color: "green",
  },
  {
    label: "Male Players",
    value: 710,
    color: "blue",
  },
  {
    label: "Female Players",
    value: 442,
    color: "pink",
  },
];

const playersChartDataByAge = [
  { age: "U15", male: 216, female: 114 },
  { age: "U17", male: 266, female: 187 },
  { age: "U20", male: 806, female: 426 },
  { age: "U23", male: 707, female: 326 },
  { age: "Senior", male: 649, female: 583 },
];

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
];

const playerPieChartDataByGender = [
  { gender: "male", visitors: 649, fill: "#FF99CF" },
  { gender: "female", visitors: 583, fill: "#3067D3" },
];

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
  };

  const tableData = [
    {
      id: "P001",
      name: "Evan Dimas",
      position: "Midfielder",
      team: "Senior Men",
      currentClub: "Persija Jakarta",
      caps: 45,
      goals: 12,
    },
    {
      id: "P002",
      name: "Asnawi Mangkualam",
      position: "Defender",
      team: "Senior Men",
      currentClub: "Jeonnam Dragons",
      caps: 28,
      goals: 3,
    },
  ];

  const [playerData, setplayerData] = useState([]);
  const [licenseChart, setChartLicenseDistribution] = useState([]);
  const [chartConfigs, setChartConfig] = useState([]);
  const [detailPlayer, setDetailPlayer] = useState([]);
  const token = sessions.getSessionToken();
  const [rowFrom, setRowFrom] = useState(0);
  const [rowLength, setRowLength] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id_pemain",
      header: "ID Pemain",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id_pemain")}</div>
      ),
    },
    {
      accessorKey: "nama_pemain",
      header: "Nama Pemain",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nama_pemain")}</div>
      ),
    },
    {
      accessorKey: "jenis_kelamin",
      header: "Gender",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("jenis_kelamin")}</div>
      ),
    },
    {
      accessorKey: "tgl_lahir",
      header: "Tanggal Lahir",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("tgl_lahir")}</div>
      ),
    },
    {
      accessorKey: "NAMATIM",
      header: "Nama TIM",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("NAMATIM")}</div>
      ),
    },
    {
      accessorKey: "CAPS",
      header: "Caps",
      cell: ({ row }) => <div className="capitalize">{"-"}</div>,
    },
    {
      accessorKey: "Goals",
      header: "Goals",
      cell: ({ row }) => <div className="capitalize">{"-"}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div>
            <button
              onClick={() => {
                handleViewDetail(row.original.id_pemain);
              }}
              className="text-blue-400"
            >
              View Detail
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent
                className="max-w-full xl:max-w-4xl p-4 xl:p-5 overflow-y-auto h-[90vh]"
                openModal={isDialogOpen}
              >
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex flex-row mb-2 mt-5">
                      <img
                        className="rounded-full w-24"
                        src={detailPlayer.URL_FOTO}
                        alt="avatar"
                      />
                      <div className="text-gray-700 text-[18px] font-bold ml-4 mt-3">
                        {detailPlayer.NAMA_PEMAIN}<br></br>
                        <span className="text-gray-700 text-sm font-normal">
                          {detailPlayer.NAMATIM} - {detailPlayer.JENIS_KELAMIN === "Pria" ? "Men" : "Women"}
                        </span>
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-row mt-5 bg-white p-1">
                      <div
                        style={{ cursor: "pointer" }}
                        className={`bg-[#518EDC] bg-opacity-5 border-l-4 border-[#518EDC] p-2 w-full`}
                      >
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                            {"1.24"}
                          </div>
                        </div>
                        <div className="text-neutral-400 text-[10px] text-lg font-normal">
                          {"Goals per Cap"}
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        className={`bg-[#16A34A] bg-opacity-5 border-l-4 border-[#16A34A] p-2 w-full`}
                      >
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                            {"4"}
                          </div>
                        </div>
                        <div className="text-neutral-400 text-[10px] text-lg font-normal">
                          {"Years in National Team"}
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        className={`bg-[#FACC15] bg-opacity-5 border-l-4 border-[#FACC15] p-2 w-full`}
                      >
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                            {"71"}
                          </div>
                        </div>
                        <div className="text-neutral-400 text-[10px] text-lg font-normal">
                          {"International Ranking"}
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        className={`bg-[#CC0101] bg-opacity-5 border-l-4 border-[#CC0101] p-2 w-full`}
                      >
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                            {"5.8"}
                          </div>
                        </div>
                        <div className="text-neutral-400 text-[10px] text-lg font-normal">
                          {"Form Rating"}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-5">
                      <div className="bg-white rounded-lg shadow p-6 w-1/2">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="text-[#989899] text-[12px] font-medium">
                            Personal Information
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Federation</div>
                          <div className="text-neutral-400 font-normal">
                            Indonesia
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Current Club</div>
                          <div className="text-neutral-400 font-normal">
                            Oxford United
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Contract Start</div>
                          <div className="text-neutral-400 font-normal">
                            2025-01-01
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Contract End</div>
                          <div className="text-neutral-400 font-normal">
                            2027-01-01
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow p-6 w-1/2">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="text-[#989899] text-[12px] font-medium">
                            Career Statistics
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Caps</div>
                          <div className="text-neutral-400 font-normal">30</div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Goals</div>
                          <div className="text-neutral-400 font-normal">20</div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Team</div>
                          <div className="text-neutral-400 font-normal">
                            Senior Men
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Position</div>
                          <div className="text-neutral-400 font-normal">
                            Midfielder
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getListPlayer();
    getChartData();
  }, [rowFrom, rowLength]);

  const getListPlayer = async () => {
    try {
      const player = await apiService.get(
        `/api/player/GetListData?row_from=${rowFrom}&length=${rowLength}`,
        headers
      );

      if (player.status === 200) {
        setplayerData(player.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChartData = async () => {
    try {
      const player = await apiService.get(`/api/player/GetGrafikAll`, headers);

      if (player.status === 200 || player.length > 0) {
        const licenceFormatChart = player.data.map((item) => ({
          category: item.NAME,
          female_playeres: item.TOTAL_WANITA,
          male_playeres: item.TOTAL_PRIA,
        }));

        const chartConfig = {
          female_playeres: {
            label: "Female playeres",
            color: "#FF99CF",
          },
          male_playeres: {
            label: "Total playeres",
            color: "#3067D3",
          },
        };

        setChartLicenseDistribution(licenceFormatChart);
        setChartConfig(chartConfig);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetail = async (id_pemain) => {
    setIsDialogOpen(true);

    try {
      const detail = await apiService.get(
        `/api/player/GetRecordByID?id_pemain=${id_pemain}`,
        headers
      );      

      if (detail.status === 200) {
        setDetailPlayer(detail.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-[#212B5A] absolute h-[60vh] w-full z-10"></div>
      <NavBar
        bgColor="#FFFFFF"
        selectedTextColor="#212B5A"
        secondaryTextColor="#C6C6C6"
      />

      <div className="z-20 relative container-pssi flex flex-col gap-8 px-5 md:px-[150px] py-10 ">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary-pssi">Players</h1>
          <p className="text-gray-400">
            An Indonesian football player represents clubs or the national team,
            showcasing skills and passion in domestic and international
            competitions.
          </p>
        </div>

        <div className="grid grid-cols-3 p-4 gap-4 bg-white border rounded-lg">
          {playersCardsDataDummy.map((card, idx) => (
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
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/5 lg:basis-1/5 !overflow-visible"
              >
                <PlayerCard
                  img={PlayerImg}
                  alt="player"
                  country="Indonesia"
                  playerName="Marselino Ferdinand"
                  playerPosition="Midfielder - Senior Men"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <DataTable
          columns={columns}
          data={playerData}
          searchBy={"nama_pemain"}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-col col-span-5 p-4 gap-4 bg-white rounded-lg shadow-lg">
            <p className="font-bold">
              Player Distribution by Age Category and Gender
            </p>

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

        <div className="flex flex-col p-4 gap-4 bg-white rounded-lg shadow-lg">
          <div className="w-full justify-center">
            <PieChartLabel title={"Overall Player Distribution by Gender"} />
          </div>
        </div>
      </div>
    </div>
  );
}
