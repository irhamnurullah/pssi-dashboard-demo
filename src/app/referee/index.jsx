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
import { DataTable } from "@/components/table/datatable";
import MapsChart from "../../components/maps/mapsChart";
import refree from "../../assets/refree1.jpeg";
import redcard from "../../assets/redcard.png";
import yellowcard from "../../assets/yellowcard.png";
import { X } from "lucide-react";
import NavBar from "../../components/navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { columns } from "../../components/table/example-table";
import { useEffect, useState } from "react";
import sessions from "../../../utils/sessions";
import apiService from "../../../utils/services";
import { PaginationControls } from "../../components/table/pagination";

export default function Referee() {
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

  const [refereesData, setRefereesData] = useState([]);
  const [refereesTotal, setRefereesTotal] = useState([]);
  const [licenseChart, setChartLicenseDistribution] = useState([]);
  const [chartConfigs, setChartConfig] = useState([]);
  const [detailReferee, setDetailReferee] = useState([]);
  const [recentMatch, setRecentMatch] = useState([]);
  const token = sessions.getSessionToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [dataSlide, setDataSlide] = useState([]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getListReferee(currentPage, rowsPerPage);
    getChartData();
    getCarouselData();
  }, [currentPage, rowsPerPage]);

  const getListReferee = async (page, rowsPerPage) => {
    try {
      const referee = await apiService.get(`/api/referee/GetListData?row_from=${(page - 1) * rowsPerPage}&length=${rowsPerPage}`,headers
      );

      if (referee.status === 200) {
        const formattedData = referee.data.data.map((ref) => ({
          ...ref,
          tgl_lahir: ref.tgl_lahir.split(" ")[0],
        }));

        setRefereesData(formattedData);
        setRefereesTotal(referee.data.recordsTotal);
        setTotalPages(Math.ceil(refereesTotal / rowsPerPage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChartData = async () => {
    try {
      const referee = await apiService.get(
        `/api/referee/GetGrafikAll`,
        headers
      );

      if (referee.status === 200 || referee.length > 0) {
        const licenceFormatChart = referee.data.map((item) => ({
          category: item.NAME,
          female_coaches: item.TOTAL_WANITA,
          male_coaches: item.TOTAL_PRIA,
        }));

        const chartConfig = {
          female_coaches: {
            label: "Female",
            color: "#FF99CF",
          },
          male_coaches: {
            label: "Male",
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

  const handleViewDetail = async (id_petugas) => {
    setIsDialogOpen(true);

    try {
      const detail = await apiService.get(
        `/api/referee/GetRecordByID?id_petugas=${id_petugas}`,
        headers
      );

      if (detail.status === 200) {
        setDetailReferee(detail.data.biodata);
        setRecentMatch(detail.data.recent_match);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      accessorKey: "nama_petugas",
      header: "Nama",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nama_petugas")}</div>
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
      accessorKey: "nama_divisi",
      header: "Division",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nama_divisi")}</div>
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
      accessorKey: "nama_propinsi",
      header: "Province",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nama_propinsi")}</div>
      ),
    },
    {
      accessorKey: "nama_kota",
      header: "City",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nama_kota")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div>
            <button
              onClick={() => handleViewDetail(row.original.id_petugas)}
              className="text-blue-400"
            >
              View Detail
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {/* <DialogTrigger onClick={() => handleViewDetail(row.original.id_petugas)} className="text-blue-400">View Detail</DialogTrigger> */}
              <DialogContent
                className="max-w-full xl:max-w-4xl p-4 xl:p-5 overflow-y-auto h-[90vh] bg-[#7E0000]"
                openModal={isDialogOpen}
              >
                <DialogHeader>
                  
                  <button
                    className="absolute top-2 right-2 p-3  "
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 21.8787L22 1.87891" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 1.87908L22 21.8789" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>

                  <div className="grid grid-cols-7 pt-5">
                    <div className="col-span-2 pt-5">
                      <img
                        className="rounded-lg w-full"
                        src={detailReferee.URL_FOTO}
                        alt="avatar"
                      />
                    </div>
                    <div className="col-span-5 pl-5 text-slate-100">
                      
                      {/* name  */}
                      <div className=" font-bold  mt-3">
                        <p className="text-3xl">{detailReferee.NAMA_PETUGAS}</p>
                        <span className="text-sm font-normal">
                          {detailReferee.NAMA_LAMPIRAN +
                            "-" +
                            detailReferee.STAT_PETUGAS}
                        </span>
                      </div>
                      
                      {/* personal Information */}
                      <div className=" mt-5 border text-neutral-400 text-sm border-[#A75353] pb-3">
                        <div className="bg-[#A75353]  flex px-4 py-3 mb-3 items-center space-x-2">
                          <div className="text-slate-100 text-sm flex gap-2">
                            <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 21H7C3 21 2 20 2 16V8C2 4 3 3 7 3H17C21 3 22 4 22 8V16C22 20 21 21 17 21Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M14 8H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M15 12H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M17 16H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M8.49994 11.2899C9.49958 11.2899 10.3099 10.4796 10.3099 9.47992C10.3099 8.48029 9.49958 7.66992 8.49994 7.66992C7.50031 7.66992 6.68994 8.48029 6.68994 9.47992C6.68994 10.4796 7.50031 11.2899 8.49994 11.2899Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M12 16.33C11.86 14.88 10.71 13.74 9.26 13.61C8.76 13.56 8.25 13.56 7.74 13.61C6.29 13.75 5.14 14.88 5 16.33" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </div>
                            <span className="my-auto">Personal Information</span>
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">Birth Date</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.TGL_LAHIR}
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">Gender</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.JNS_KELAMIN}
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">Province</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.NAMA_PROPINSI}
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">City</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.NAMA_KOTA}
                          </div>
                        </div>
                      </div>

                      {/* careet statistic */}
                      <div className=" text-neutral-400 text-sm border border-[#A75353] pb-3">
                        
                        <div className="bg-[#A75353]  flex px-4 py-3 mb-3 items-center space-x-2">
                          <div className="text-slate-100 text-sm flex gap-2">
                            <div>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.87988 18.1501V16.0801" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                              <path d="M12 18.15V14.01" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                              <path d="M17.1201 18.1499V11.9299" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                              <path d="M17.1199 5.8501L16.6599 6.3901C14.1099 9.3701 10.6899 11.4801 6.87988 12.4301" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                              <path d="M14.1899 5.8501H17.1199V8.7701" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>

                            </div>
                            <span className="my-auto">Career Statistics</span>
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">License</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.NAMA_LAMPIRAN}
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">Division</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.NAMA_DIVISI}
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">Status</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.STATUS}
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">Total Red Card (RC)</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.TOTAL_RC}
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">Total Second Yellow Card (SYC)</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.TOTAL_SYC}
                          </div>
                        </div>
                        <div className="flex justify-between pl-12 pr-4">
                          <div className="">Total Yellow Card (YC)</div>
                          <div className="text-neutral-400 font-normal">
                            {detailReferee.TOTAL_YC}
                          </div>
                        </div>
                      </div>

                      {/* recent matches  */}
                      <div className="text-[#989899] mt-5 text-[12px] font-medium">
                          Recent Matches
                      </div>
                      <div className="flex space-x-4 ">
                        
                        <div className="flex flex-row">
                          <div className="w-full">
                            <Table className="mt-2">
                              <TableHeader className="text-white text-sm bg-white">
                                <TableRow>
                                  <TableHead className="text-[12px]">
                                    Competition
                                  </TableHead>
                                  <TableHead className="text-[12px]">
                                    Match
                                  </TableHead>
                                  <TableHead className="text-[12px]">
                                    Date
                                  </TableHead>
                                  <TableHead className="text-[12px]">
                                    Status
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {recentMatch.length > 0 ? (
                                  recentMatch.map((match, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="text-[12px]">
                                        {match.COMPETITION}
                                      </TableCell>
                                      <TableCell className="text-[12px]">
                                        {match.MATCH}
                                      </TableCell>
                                      <TableCell className="text-[12px]">
                                        {new Date(match.DATE).toLocaleDateString()}
                                      </TableCell>
                                      <TableCell className="text-[12px]">
                                        {match.STATUS}
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
                      </div>
                      

                    </div>
                  </div>

                 
                 
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  const getCarouselData = async () => {
    try {
      const refereeSlide = await apiService.get(
        `/api/referee/GetSlide`,
        headers
      );

      if (refereeSlide.status === 200 || refereeSlide.length > 0) {
        setDataSlide(refereeSlide.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      
    
    <div>
      <div className="bg-[#7E0000] absolute h-[60vh] w-full z-10"></div>
      <NavBar  bgColor="#FFFFFF" selectedTextColor="#7E0000" secondaryTextColor="#6C6C6C" />
      <div className="container-pssi mx-4 z-20 relative">
        <h2 className="text-slate-200 text-4xl font-bold">Referees</h2>
        <p className="text-sm text-slate-300 mt-2">
          An Indonesian referee enforces rules and ensures fairness in sports
          competitions, certified nationally or internationally.
        </p>

        <div className="mt-4 py-5 px-3 mb-10">
          <CarouselSize data={dataSlide}  handleViewDetail={handleViewDetail} />
        </div>

        <div className="mt-5 grid grid-cols-6 bg-white rounded-lg border">
          <div className="py-3 col-span-6 border-b border-slate-200 px-4">
            <h3 className="font-semibold">License Distribution</h3>
          </div>

          <div className="col-span-2 border-r border-slate-200 flex flex-col justify-end">
            <LicenseDistribution data={licenseChart} config={chartConfigs} />
          </div>
          <div className="col-span-4 px-4 pb-4">
            <MapsChart dataMaps={dataMaps} />
          </div>
        </div>

        <div className="mt-5 bg-white p-5">
          <div className="text-black font-bold">Referee List</div>
          <DataTable
            columns={columns}
            data={refereesData}
            searchBy={"nama_petugas"}
            totalData={refereesTotal}
            placeholderText={"Filter Nama..."}
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

function CarouselSize({data, handleViewDetail }) {
 
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full  mx-auto "
    >
      <CarouselContent>
        {data.map((slide, index) => (
          <CarouselItem 
            key={index} 
            className="md:basis-1/5 lg:basis-1/5"
            onClick={() => handleViewDetail(slide.ID_PETUGAS)}
          >
            <div>
              <Card className="border hover:border-2 hover:border-[#7E0000] rounded-lg cursor-pointer border-slate-200 bg-transparent shadow-none">
                <CardContent
                  className="p-0"
                >
                  {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                  <img
                    className="mx-auto rounded-t-lg object-cover w-full h-[30vh]"
                    src={slide.URL_FOTO}
                    alt="avatar"
                    style={{objectPosition: "top" }}
                  />

                  <div className="p-2 rounded-b-lg hover:shadow-xl  bg-white " style={{backgroundImage: `url('./pattern-white.svg')`}}>
                    <div className="py-3 px-4  relative">
                      <p className=" w-full text-md font-semibold">
                        {slide.NAMA_PETUGAS}
                      </p>
                      <div className="grid grid-cols-2 mt-2">
                        <div className="col-span-1">
                          <div className="flex gap-2">
                            <svg className="mt-1" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.49 2.23006L5.50003 4.11006C4.35003 4.54006 3.41003 5.90006 3.41003 7.12006V14.5501C3.41003 15.7301 4.19003 17.2801 5.14003 17.9901L9.44003 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.9901C19.83 17.2801 20.61 15.7301 20.61 14.5501V7.12006C20.61 5.89006 19.67 4.53006 18.52 4.10006L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.05005 11.8701L10.66 13.4801L14.96 9.18005" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Division</small>
                              <p className="text-xs text-neutral-700">
                                {slide.NAMA_DIVISI}
                              </p>
                            </div>
                            
                          </div>  
                        </div>

                        <div className="col-span-1">
                          <div className="flex gap-2">
                            <svg width="18" height="18" className="mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.38 12L10.79 14.42L15.62 9.57996" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.75 2.44995C11.44 1.85995 12.57 1.85995 13.27 2.44995L14.85 3.80995C15.15 4.06995 15.71 4.27995 16.11 4.27995H17.81C18.87 4.27995 19.74 5.14995 19.74 6.20995V7.90995C19.74 8.29995 19.95 8.86995 20.21 9.16995L21.57 10.7499C22.16 11.4399 22.16 12.5699 21.57 13.2699L20.21 14.8499C19.95 15.1499 19.74 15.7099 19.74 16.1099V17.8099C19.74 18.8699 18.87 19.7399 17.81 19.7399H16.11C15.72 19.7399 15.15 19.9499 14.85 20.2099L13.27 21.5699C12.58 22.1599 11.45 22.1599 10.75 21.5699L9.17 20.2099C8.87 19.9499 8.31 19.7399 7.91 19.7399H6.18C5.12 19.7399 4.25 18.8699 4.25 17.8099V16.0999C4.25 15.7099 4.04 15.1499 3.79 14.8499L2.44 13.2599C1.86 12.5699 1.86 11.4499 2.44 10.7599L3.79 9.16995C4.04 8.86995 4.25 8.30995 4.25 7.91995V6.19995C4.25 5.13995 5.12 4.26995 6.18 4.26995H7.91C8.3 4.26995 8.87 4.05995 9.17 3.79995L10.75 2.44995Z" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Status</small>
                              <p className="text-xs text-neutral-700">
                                {slide.STAT_PETUGAS}
                              </p>
                            </div>
                            
                          </div>  
                        </div>
                      </div>
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
    <div className="px-4 py-3 flex flex-col justify-end">
      
        
        <MultipleBarChart dataChart={data} config={config} />
      
      {/* <div className="flex-1">
        <h3 className="font-semibold">License Distribution - Female Referees by Province</h3>
      </div> */}
    </div>
  );
}

// function RefereeList() {
//   return (
//     <Card className="p-4">
//       <h3 className="font-semibold">Referee List</h3>
//       <DataTableExample />
//     </Card>
//   );
// }
