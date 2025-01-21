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
import { X } from "lucide-react";

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
              onClick={() => {
                handleViewDetail(row.original.id_official);
                setLicensi(row.original.lisensi);
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
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <DialogTitle>
                    <div className="flex flex-row mb-2 mt-5">
                      <img
                        className="rounded-full w-24"
                        src={detailCoachBiodata.URL_FOTO}
                        alt="avatar"
                      />
                      <div className="text-gray-700 text-[18px] font-bold ml-4 mt-3">
                        {detailCoachBiodata.NAMA_OFFICIAL}
                        <br></br>
                        <span className="text-gray-700 text-sm font-normal">
                          {detailCoachBiodata.NAMA_JABATAN} {"-" + lisensi}
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
                            {detailCoachBiodata.TGL_LAHIR}
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Birt Place</div>
                          <div className="text-[#6B7280] font-normal">
                            -
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
                            {detailCoach.hasOwnProperty("COMPETITION_HISTORY") ? (
                              detailCompetition.length > 0 ? (
                                detailCompetition.map((detail, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="text-[12px]">
                                      -
                                    </TableCell>
                                    <TableCell className="text-[12px]">
                                      {detail.COMPETITION}
                                    </TableCell>
                                    <TableCell className="text-[12px]">
                                      -
                                    </TableCell>
                                    <TableCell className="text-[12px]">
                                      -
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell className="text-[12px]" colSpan={4} style={{ textAlign: "center" }}>
                                    Tidak ada data
                                  </TableCell>
                                </TableRow>
                              )
                            ) : (
                              <TableRow>
                                <TableCell className="text-[12px]" colSpan={4} style={{ textAlign: "center" }}>
                                  Tidak ada data
                                </TableCell>
                              </TableRow>
                            )}
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
                            {detailContract.length > 0 ? (
                              detailContract.map((detail, index) => (
                                <TableRow key={index}>
                                  <TableCell className="text-[12px]">
                                    {detail.CLUB}
                                  </TableCell>
                                  <TableCell className="text-[12px]">
                                    {detail.POSITION}
                                  </TableCell>
                                  <TableCell className="text-[12px]">
                                    {new Date(detail.START_DATE).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell className="text-[12px]">
                                    {detail.END_DATE}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell className="text-[12px]" colSpan={4} style={{ textAlign: "center" }}>
                                  Tidak ada data
                                </TableCell>
                              </TableRow>
                            )}
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
  const [detailCoachBiodata, setDetailCoachBiodata] = useState([]);
  const [detailCompetition, setDetailCompetition] = useState([]);
  const [detailContract, setDetailContract] = useState([]);
  const token = sessions.getSessionToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lisensi, setLicensi] = useState();

  const [dataSlide, setDataSlide] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getListCoach(currentPage, rowsPerPage);
    getChartData();
    getCarouselData();
  }, [currentPage, rowsPerPage]);

  const getListCoach = async (page, rowsPerPage) => {
    try {
      const coach = await apiService.get(
        `/api/coach/GetListData?row_from=${
          (page - 1) * rowsPerPage
        }&length=${rowsPerPage}`,
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

  const handleViewDetail = async (id_official) => {
    setIsDialogOpen(true);

    try {
      const detail = await apiService.get(
        `/api/coach/GetRecordByID?id_official=${id_official}`,
        headers
      );

      if (detail.status === 200) {
        setDetailCoach(detail.data);
        setDetailCoachBiodata(detail.data.BIODATA);
        setDetailContract(detail.data.CONTRACT_HISTORY);
        setDetailCompetition(detail.data.COMPETITION_HISTORY);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCarouselData = async () => {
    try {
      const coachSlide = await apiService.get(
        `/api/coach/GetSlide`,
        headers
      );

      if (coachSlide.status === 200 || coachSlide.length > 0) {
        setDataSlide(coachSlide.data);
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
          <CarouselSize data={dataSlide} handleViewDetail={handleViewDetail} />
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
            placeholderText="Filter Nama Official..."
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

function CarouselSize({data, handleViewDetail}) {
  // console.log(data);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full  mx-auto"
    >
      <CarouselContent>
        {data.map((slide, index) => (
          <CarouselItem 
            key={index} 
            className="md:basis-1/5 lg:basis-1/5"
            onClick={() => handleViewDetail(slide.ID_OFFICIAL)}
          >
            <div>
              <Card className="border-none bg-transparent shadow-none">
                <CardContent
                  className="p-0"
                >
                  
                  <img
                    className="mx-auto rounded-t-lg object-cover w-full h-[30vh]"
                    src={slide.URL_FOTO}
                    alt="avatar"
                    style={{objectPosition: "top" }}
                  />

                  <div className="px-4 py-3 border rounded-b-lg hover:shadow-xl  bg-white " style={{backgroundImage: `url('./pattern-white.svg')`}}>
                    <div className=" rounded-lg w-full ">
                      <p className="w-full text-[#212B5A] text-sm truncate font-semibold">
                        {slide.NAMA_OFFICIAL}
                      </p>

                      <div className="grid grid-cols-3 mt-2">
                        <div className="col-span-2">
                          <div className="flex gap-1">
                            <svg className="mt-1" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.49 2.23006L5.50003 4.11006C4.35003 4.54006 3.41003 5.90006 3.41003 7.12006V14.5501C3.41003 15.7301 4.19003 17.2801 5.14003 17.9901L9.44003 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.9901C19.83 17.2801 20.61 15.7301 20.61 14.5501V7.12006C20.61 5.89006 19.67 4.53006 18.52 4.10006L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.05005 11.8701L10.66 13.4801L14.96 9.18005" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Jabatan</small>
                              <p className="text-xs text-neutral-700">
                                {slide.NAMA_JABATAN}
                              </p>
                            </div>
                            
                          </div>  
                        </div>

                        <div className="col-span-1">
                          <div className="flex gap-1">
                            <svg width="18" height="18" className="mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.15002 2V22" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>


                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Negara</small>
                              <p className="text-xs text-neutral-700">
                                {slide.NAMA_NEGARA}
                              </p>
                            </div>
                            
                          </div>  
                        </div>

                        <div className="col-span-2 mt-1">
                          <div className="flex gap-1">
                            <svg width="18" height="18" className="mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.33 10H10.66C9.56003 10 8.66003 10.9 8.66003 12V22H15.33V12C15.33 10.9 14.44 10 13.33 10Z" stroke="grey" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 17H15.33V22H22V19C22 17.9 21.1 17 20 17Z" stroke="grey" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.52 2.07007L13.05 3.13006C13.12 3.28006 13.31 3.42006 13.47 3.44006L14.43 3.60007C15.04 3.70007 15.19 4.15005 14.75 4.58005L14 5.33005C13.87 5.46005 13.8 5.70006 13.84 5.87006L14.05 6.79007C14.22 7.52007 13.83 7.80007 13.19 7.42007L12.29 6.89007C12.13 6.79007 11.86 6.79007 11.7 6.89007L10.8 7.42007C10.16 7.80007 9.76998 7.52007 9.93998 6.79007L10.15 5.87006C10.19 5.70006 10.12 5.45005 9.98999 5.33005L9.24999 4.59006C8.80999 4.15006 8.94999 3.71005 9.56999 3.61005L10.53 3.45007C10.69 3.42007 10.88 3.28007 10.95 3.14007L11.48 2.08005C11.77 1.50005 12.23 1.50007 12.52 2.07007Z" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Club</small>
                              <p className="text-xs text-neutral-700">
                                {slide.NAMATIM}
                              </p>
                            </div>
                            
                          </div>  
                        </div>
                      </div>

                      {/* <p className=" w-full text-xs text-neutral-600 truncate">{slide.NAMA_JABATAN + " - " + slide.NAMATIM}</p> */}
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

// function coachList() {
//   return (
//     <Card className="p-4">
//       <h3 className="font-semibold">coach List</h3>
//       <DataTableExample />
//     </Card>
//   );
// }
