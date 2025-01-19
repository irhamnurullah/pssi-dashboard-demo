import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MultipleBarChart } from "../../components/charts/barchart/multiple";
import { DataTableExample } from "@/components/table/example-table";
import MapsChart from "../../components/maps/mapsChart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NavBar from "../../components/navbar";
import coachImage from "../../assets/coach1.jpg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import sessions from "../../../utils/sessions";
import apiService from "../../../utils/services";
import { DataTable } from "@/components/table/datatable";
import { PaginationControls } from "../../components/table/pagination";

export default function Coach() {
  const tableData = [
    {
      id: "COACH001",
      name: "Coach 1",
      position: "L",
      team: "1982-07-25",
      currentClub: "A",
      caps: "Head Coach",
      goals: "Persija",
    },
    {
      id: "COACH002",
      name: "Coach 2",
      position: "L",
      team: "1982-07-25",
      currentClub: "A",
      caps: "Head Coach",
      goals: "Persija",
    },
  ];

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
      accessorKey: "id_official",
      header: "ID Petugas",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id_official")}</div>
      ),
    },
    {
      accessorKey: "nama_official",
      header: "Nama Official",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nama_official")}</div>
      ),
    },
    {
      accessorKey: "jenis_kelamin",
      header: "Jenis Kelamin",
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
      accessorKey: "lisensi",
      header: "License",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("lisensi")}</div>
      ),
    },
    {
      accessorKey: "NAMATIM",
      header: "Nama Tim",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("NAMATIM")}</div>
      ),
    },
    {
      accessorKey: "NAMA_JABATAN",
      header: "Nama Jabatan",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("NAMA_JABATAN")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div>
            <button
              onClick={() => {handleViewDetail(row.original.id_official); setLicensi(row.original.lisensi)}}
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
                        src={detailCoach.URL_FOTO}
                        alt="avatar"
                      />
                      <div className="text-gray-700 text-[18px] font-bold ml-4 mt-3">
                        {detailCoach.NAMA_OFFICIAL}<br></br>
                        <span className="text-gray-700 text-sm font-normal">
                          {detailCoach.NAMA_JABATAN} {"-" + lisensi}
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
                            {"30"}
                          </div>
                        </div>
                        <div className="text-neutral-400 text-[10px] font-normal">
                          {"Total Match"}
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        className={`bg-[#16A34A] bg-opacity-5 border-l-4 border-[#16A34A] p-2 w-full`}
                      >
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                            {"74%"}
                          </div>
                        </div>
                        <div className="text-neutral-400 text-[10px] font-normal">
                          {"Win Rate"}
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        className={`bg-[#FACC15] bg-opacity-5 border-l-4 border-[#FACC15] p-2 w-full`}
                      >
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                            {"21%"}
                          </div>
                        </div>
                        <div className="text-neutral-400 text-[10px] font-normal">
                          {"Draw Rate"}
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        className={`bg-[#CC0101] bg-opacity-5 border-l-4 border-[#CC0101] p-2 w-full`}
                      >
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                            {"11%"}
                          </div>
                        </div>
                        <div className="text-neutral-400 text-[10px] font-normal">
                          {"Lose Rate"}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-5">
                      <div className="text-[#989899] text-[12px] font-medium">
                        Personal Information
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-1">
                      <div className="bg-white rounded-lg shadow p-6 w-full">
                        <div className="flex justify-between py-2">
                          <div className="text-black">Birth Date</div>
                          <div className="text-[#6B7280] font-normal">
                            {detailCoach.TGL_LAHIR}
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Birt Place</div>
                          <div className="text-[#6B7280] font-normal">
                            {detailCoach.TGL_LAHIR}
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Experience</div>
                          <div className="text-[#6B7280] font-normal">
                            38 Years
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Education</div>
                          <div className="text-[#6B7280] font-normal">
                            Rotterdam University
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-5">
                      <div className="text-[#989899] text-[12px] font-medium">
                        Recent Matches
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-full">
                        <Table className="mt-2">
                          <TableHeader className="bg-[#F6F6F6]">
                            <TableRow>
                              <TableHead className="text-[12px]">
                                Date
                              </TableHead>
                              <TableHead className="text-[12px]">
                                Match
                              </TableHead>
                              <TableHead className="text-[12px]">
                                Venue
                              </TableHead>
                              <TableHead className="text-[12px]">
                                Result
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-[12px]">
                                2024-01-01
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Indonesia vs Australia
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Gelora Bung Karno Stadium
                              </TableCell>
                              <TableCell className="text-[12px]">
                                2 - 1
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-[12px]">
                                2024-01-01
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Indonesia vs Bahrain
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Gelora Bung Karno Stadium
                              </TableCell>
                              <TableCell className="text-[12px]">
                                3 - 1
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-[12px]">
                                2024-01-01
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Indonesia vs China
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Gelora Bung Karno Stadium
                              </TableCell>
                              <TableCell className="text-[12px]">
                                1 - 1
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-5">
                      <div className="text-[#989899] text-[12px] font-medium">
                        Contract History
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-full">
                        <Table className="mt-2">
                          <TableHeader className="bg-[#F6F6F6]">
                            <TableRow>
                              <TableHead className="text-[12px]">
                                Club
                              </TableHead>
                              <TableHead className="text-[12px]">
                                Position
                              </TableHead>
                              <TableHead className="text-[12px]">
                                Start Date
                              </TableHead>
                              <TableHead className="text-[12px]">
                                End Date
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-[12px]">
                                Timnas Indonesia Senior
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Head Coach
                              </TableCell>
                              <TableCell className="text-[12px]">
                                2025-01-01
                              </TableCell>
                              <TableCell className="text-[12px]">
                                2027-01-01
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-[12px]">
                                Timnas Indonesia U23
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Head Coach
                              </TableCell>
                              <TableCell className="text-[12px]">
                                2025-01-01
                              </TableCell>
                              <TableCell className="text-[12px]">
                                2027-01-01
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-[12px]">
                                Timnas Indonesia U21
                              </TableCell>
                              <TableCell className="text-[12px]">
                                Head Coach
                              </TableCell>
                              <TableCell className="text-[12px]">
                                2025-01-01
                              </TableCell>
                              <TableCell className="text-[12px]">
                                2027-01-01
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
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

  const [coachData, setCoachData] = useState([]);
  const [coachTotal, setCoachTotal] = useState([]);
  const [licenseChart, setChartLicenseDistribution] = useState([]);
  const [chartConfigs, setChartConfig] = useState([]);
  const [detailCoach, setDetailCoach] = useState([]);
  const token = sessions.getSessionToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lisensi, setLicensi] = useState();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getListCoach(currentPage, rowsPerPage);
    getChartData();
  }, [currentPage, rowsPerPage]);

  const getListCoach = async (page, rowsPerPage) => {
    try {
      const coach = await apiService.get(
        `/api/coach/GetListData?row_from=${(page - 1) * rowsPerPage}&length=${rowsPerPage}`,
        headers
      );

      if (coach.status === 200) {
        setCoachData(coach.data.data);
        setCoachTotal(coach.data.recordsTotal);
        setTotalPages(Math.ceil(coachTotal / rowsPerPage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChartData = async () => {
    try {
      const coach = await apiService.get(`/api/coach/GetGrafikAll`, headers);

      if (coach.status === 200 || coach.length > 0) {
        const licenceFormatChart = coach.data.map((item) => ({
          category: item.NAME,
          female_coaches: item.TOTAL_WANITA,
          male_coaches: item.TOTAL_PRIA,
        }));

        const chartConfig = {
          female_coaches: {
            label: "Female Coaches",
            color: "#FF99CF",
          },
          male_coaches: {
            label: "Male Coaches",
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

  const handleViewDetail = async (id_official,) => {
    setIsDialogOpen(true);

    try {
      const detail = await apiService.get(
        `/api/coach/GetRecordByID?id_official=${id_official}`,
        headers
      );

      if (detail.status === 200) {
        setDetailCoach(detail.data);
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

      <div className="container-pssi mx-4 z-20 relative">
        <h2 className="text-[#646B8B] text-4xl font-bold">Coach</h2>
        <p className="text-sm text-neutral-400 mt-2">
          An Indonesian coach trains and guides athletes or teams, focusing on
          skill development, strategy, and performance improvement.
        </p>

        <div className="mt-4">
          <CarouselSize />
        </div>

        <div className="mt-4 grid grid-cols-6 gap-4 bg-white rounded-lg border">
          <div className="col-span-2">
            <LicenseDistribution data={licenseChart} config={chartConfigs} />
          </div>
          <div className="col-span-4">
            <MapsChart dataMaps={dataMaps} />
          </div>
        </div>

        <div className="p-4 mt-5 gap-4 bg-white border rounded-lg">
          <DataTable
            columns={columns}
            data={coachData}
            searchBy={"nama_official"}
            totalData={coachTotal}
          />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full md:max-w-screen-md lg:max-w-screen-xl mx-auto"
    >
      <CarouselContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/5">
            <div>
              <Card className="border-none bg-transparent shadow-none">
                <CardContent
                  // className="flex flex-col items-center aspect-square p-6"
                  className="p-0"
                >
                  {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                  <img
                    className="rounded-t-lg mx-auto"
                    src={coachImage}
                    alt="avatar"
                  />
                  <div className="p-2 rounded-b-lg bg-white border backdrop-filter bg-opacity-10 backdrop-blur-md">
                    <div className="py-3 pb-4  rounded-lg w-full bg-white">
                      <p className="text-center w-full text-sm font-semibold">
                        Patrick Kluivert
                      </p>
                      {/* <p className="text-center w-full text-xs text-neutral-600">C3 coach</p> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function LicenseDistribution({ data, config }) {
  return (
    <div className="px-4 py-3 ">
      <div className="">
        <h3 className="font-semibold">License Distribution</h3>
        <MultipleBarChart dataChart={data} config={config} />
      </div>
      {/* <div className="flex-1">
        <h3 className="font-semibold">License Distribution - Female coachs by Province</h3>
      </div> */}
    </div>
  );
}

function coachList() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold">coach List</h3>
      <DataTableExample />
    </Card>
  );
}
