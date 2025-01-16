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

  const refereesData = {
    status: 200,
    message: "Success",
    data: {
      recordsTotal: 4192,
      recordsFiltered: 4192,
      data: [
        {
          id_petugas: "2518982980",
          nama_petugas: "JUSRIADI",
          jenis_kelamin: "Pria",
          tgl_lahir: "1989-12-12 00:00:00",
          kategori_petugas:
            "Wasit                                                                           ",
          nama_divisi: "Piala Soeratin",
          lisensi: "C2",
          nama_propinsi: "SULAWESI  BARAT",
          nama_kota: "Kota Mamuju",
        },
        {
          id_petugas: "2511479560",
          nama_petugas: "ALEXANDERADAM",
          jenis_kelamin: "Pria",
          tgl_lahir: "1986-01-09 00:00:00",
          kategori_petugas:
            "Wasit                                                                           ",
          nama_divisi: "LIGA 4",
          lisensi: "C2",
          nama_propinsi: "SULAWESI  BARAT",
          nama_kota: "Kab. Pasangkayu",
        },
        {
          id_petugas: "2516969473",
          nama_petugas: "FADIL AMRULLAH",
          jenis_kelamin: "Pria",
          tgl_lahir: "1996-01-29 00:00:00",
          kategori_petugas:
            "Asisten Wasit                                                                   ",
          nama_divisi: "Piala Soeratin",
          lisensi: "C2",
          nama_propinsi: "ACEH",
          nama_kota: "Kab. Aceh Besar",
        },
        {
          id_petugas: "2518085067",
          nama_petugas: "M. RIJAL",
          jenis_kelamin: "Pria",
          tgl_lahir: "2000-12-15 00:00:00",
          kategori_petugas:
            "Asisten Wasit                                                                   ",
          nama_divisi: "Piala Soeratin",
          lisensi: "C3",
          nama_propinsi: "ACEH",
          nama_kota: "Kota Banda Aceh",
        },
        {
          id_petugas: "2516853730",
          nama_petugas: "RUSDI",
          jenis_kelamin: "Pria",
          tgl_lahir: "1972-04-30 00:00:00",
          kategori_petugas: "Penilai Wasit",
          nama_divisi: "LIGA 4",
          lisensi: "Penilai Wasit",
          nama_propinsi: "ACEH",
          nama_kota: "Kota Banda Aceh",
        },
        {
          id_petugas: "2514771699",
          nama_petugas: "EKO SAIFANI",
          jenis_kelamin: "Pria",
          tgl_lahir: "1991-01-21 00:00:00",
          kategori_petugas:
            "Wasit                                                                           ",
          nama_divisi: "LIGA 2",
          lisensi: "C2",
          nama_propinsi: "ACEH",
          nama_kota: "Kab. Aceh Singkil",
        },
        {
          id_petugas: "2514807200",
          nama_petugas: "RINALDI",
          jenis_kelamin: "Pria",
          tgl_lahir: "1988-04-24 00:00:00",
          kategori_petugas:
            "Wasit                                                                           ",
          nama_divisi: "LIGA 4",
          lisensi: "C2",
          nama_propinsi: "ACEH",
          nama_kota: "Kab. Bireuen",
        },
        {
          id_petugas: "2518666862",
          nama_petugas: "RAMADHAN DIAS SANTOSO",
          jenis_kelamin: "Pria",
          tgl_lahir: "1999-01-15 00:00:00",
          kategori_petugas:
            "Asisten Wasit                                                                   ",
          nama_divisi: "LIGA 4",
          lisensi: "C2",
          nama_propinsi: "JAWA TIMUR",
          nama_kota: "Kab. Bangkalan",
        },
        {
          id_petugas: "2512394047",
          nama_petugas: "RIO SEPTIAN ALIF",
          jenis_kelamin: "Pria",
          tgl_lahir: "2004-09-13 00:00:00",
          kategori_petugas:
            "Asisten Wasit                                                                   ",
          nama_divisi: "LIGA 4",
          lisensi: "C2",
          nama_propinsi: "JAWA TIMUR",
          nama_kota: "Kota Surabaya",
        },
        {
          id_petugas: "2513558891",
          nama_petugas: "ZAINUR FADLI",
          jenis_kelamin: "Pria",
          tgl_lahir: "1991-09-03 00:00:00",
          kategori_petugas:
            "Wasit                                                                           ",
          nama_divisi: "LIGA PRO (FUTSAL)",
          lisensi: "Level 1",
          nama_propinsi: "JAWA TIMUR",
          nama_kota: "Kab. Pamekasan",
        },
      ],
    },
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
          <Dialog>
            <DialogTrigger className="text-blue-400">View Detail</DialogTrigger>
            <DialogContent className="max-w-full xl:max-w-4xl p-4 xl:p-5 overflow-y-auto h-[90vh]">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex flex-row mb-2 mt-5">
                    <img
                      className="rounded-full w-20"
                      src={detailReferee.data.biodata.URL_FOTO}
                      alt="avatar"
                    />
                    <div className="text-gray-700 text-[18px] font-bold ml-4 mt-3">
                      {detailReferee.data.biodata.NAMA_PETUGAS}
                      <br></br>
                      <span className="text-gray-700 text-sm font-normal">
                        {detailReferee.data.biodata.NAMA_LAMPIRAN +
                          "-" +
                          detailReferee.data.biodata.STAT_PETUGAS}
                      </span>
                    </div>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex space-x-4 mt-5">
                    <div className="bg-white rounded-lg shadow p-6 w-1/2">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="text-[#989899] text-[12px] font-medium">
                          Personal Information
                        </div>
                      </div>
                      <div className="flex justify-between py-2">
                        <div className="text-black">Birth Date</div>
                        <div className="text-neutral-400 font-normal">
                          {detailReferee.data.biodata.TGL_LAHIR}
                        </div>
                      </div>
                      <div className="flex justify-between py-2">
                        <div className="text-black">Gender</div>
                        <div className="text-neutral-400 font-normal">
                          {detailReferee.data.biodata.JNS_KELAMIN}
                        </div>
                      </div>
                      <div className="flex justify-between py-2">
                        <div className="text-black">Province</div>
                        <div className="text-neutral-400 font-normal">
                          {detailReferee.data.biodata.NAMA_PROPINSI}
                        </div>
                      </div>
                      <div className="flex justify-between py-2">
                        <div className="text-black">City</div>
                        <div className="text-neutral-400 font-normal">
                          {detailReferee.data.biodata.NAMA_KOTA}
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
                        <div className="text-black">License</div>
                        <div className="text-neutral-400 font-normal">
                          {detailReferee.data.biodata.NAMA_LAMPIRAN}
                        </div>
                      </div>
                      <div className="flex justify-between py-2">
                        <div className="text-black">Division</div>
                        <div className="text-neutral-400 font-normal">
                          {detailReferee.data.biodata.NAMA_DIVISI}
                        </div>
                      </div>
                      <div className="flex justify-between py-2">
                        <div className="text-black">Status</div>
                        <div className="text-neutral-400 font-normal">
                          {detailReferee.data.biodata.STATUS}
                        </div>
                      </div>
                      <div className="flex justify-between py-2">
                        <div className="text-black">Total Matches</div>
                        <div className="text-neutral-400 font-normal">
                          {20 /* API Kurang Total Matches */}
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
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-[12px]">Date</TableHead>
                            <TableHead className="text-[12px]">
                              Competition
                            </TableHead>
                            <TableHead className="text-[12px]">Match</TableHead>
                            <TableHead className="text-[12px]">Venue</TableHead>
                            <TableHead className="text-[12px]">Card</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-[12px]">
                              2024-01-01
                            </TableCell>
                            <TableCell className="text-[12px]">
                              BRI Liga 1
                            </TableCell>
                            <TableCell className="text-[12px]">
                              Persija vs Arema
                            </TableCell>
                            <TableCell className="text-[12px]">
                              Gelora Bung Karno Stadium
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                                  0 🟨
                                </span>
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                                  0 🟥
                                </span>
                              </div>
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
        );
      },
    },
  ];

  const detailReferee = {
    status: 200,
    message: "Success",
    data: {
      biodata: {
        ID_PETUGAS: "12101",
        NAMA_PETUGAS: "THORIQ M ALKATIRI",
        JNS_KELAMIN: "Pria",
        TGL_LAHIR: "1988-11-19",
        NAMA_PROPINSI: "JAWA BARAT",
        NAMA_KOTA: "Kota Bandung",
        NAMA_NEGARA: "Indonesia",
        NAMA_LAMPIRAN: "C1",
        NAMA_DIVISI: "LIGA 1",
        STAT_PETUGAS: "Wasit",
        STATUS: "Aktif",
        URL_FOTO:
          "https://siap.pssi.org/uploads/master_petugas/foto-thoriq-munir-alkatiri_ba01e0390d0c58ab871d3fd682bbf613.jpeg",
      },
      history: [
        {
          NAMA_KOMPETISI: "BRI LIGA 1 2024/2025",
          TOTAL_PW: 0,
          TOTAL_WS: 4,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 13,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "Mola Elite Pro Academy LIGA 1 U-20 2023",
          TOTAL_PW: 0,
          TOTAL_WS: 1,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "PEGADAIAN LIGA 2 2023-2024",
          TOTAL_PW: 0,
          TOTAL_WS: 4,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "BRI LIGA 1 2023-2024",
          TOTAL_PW: 0,
          TOTAL_WS: 26,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 4,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "BRI LIGA 1 2022-2023",
          TOTAL_PW: 0,
          TOTAL_WS: 12,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 1,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "LIGA 2 2021",
          TOTAL_PW: 0,
          TOTAL_WS: 1,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "BRI LIGA 1 2021-2022",
          TOTAL_PW: 0,
          TOTAL_WS: 13,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 4,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 1,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "LIGA 1 2020",
          TOTAL_PW: 0,
          TOTAL_WS: 3,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "LIGA 1 2019",
          TOTAL_PW: 0,
          TOTAL_WS: 15,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 10,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "Piala Presiden 2019",
          TOTAL_PW: 0,
          TOTAL_WS: 2,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "LIGA 3 2018 PUTARAN NASIONAL",
          TOTAL_PW: 0,
          TOTAL_WS: 1,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "GUBERNUR KALTIM 2018",
          TOTAL_PW: 0,
          TOTAL_WS: 2,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 1,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "GO-JEK LIGA 1 2018",
          TOTAL_PW: 0,
          TOTAL_WS: 16,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 2,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "PIALA PRESIDEN 2018",
          TOTAL_PW: 0,
          TOTAL_WS: 2,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 2,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "LIGA 1 2017",
          TOTAL_PW: 0,
          TOTAL_WS: 13,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 5,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "PIALA PRESIDEN 2017",
          TOTAL_PW: 0,
          TOTAL_WS: 3,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 3,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "ISC U21",
          TOTAL_PW: 0,
          TOTAL_WS: 1,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "TORABIKA SOCCER CHAMPIONSHIP 2016",
          TOTAL_PW: 0,
          TOTAL_WS: 17,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 6,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "OFFICIAL PRE-SEASON TOURNAMENT 2015",
          TOTAL_PW: 0,
          TOTAL_WS: 1,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "QNB LEAGUE 2015",
          TOTAL_PW: 0,
          TOTAL_WS: 2,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 1,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "U-21 ISL 2014",
          TOTAL_PW: 0,
          TOTAL_WS: 2,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 3,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "ISL 2014",
          TOTAL_PW: 0,
          TOTAL_WS: 10,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 2,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "INTER ISLAND CUP 2014",
          TOTAL_PW: 0,
          TOTAL_WS: 2,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 4,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "U-21 ISL 2012/2013",
          TOTAL_PW: 0,
          TOTAL_WS: 1,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "ISL 2012 / 2013",
          TOTAL_PW: 0,
          TOTAL_WS: 20,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 11,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "INTER ISLAND CUP 2012",
          TOTAL_PW: 0,
          TOTAL_WS: 2,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 1,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "PERANG BINTANG 2012",
          TOTAL_PW: 0,
          TOTAL_WS: 1,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 0,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "ISL U-21 2011/2012",
          TOTAL_PW: 0,
          TOTAL_WS: 3,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 1,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "DIVISI UTAMA LI 2011",
          TOTAL_PW: 0,
          TOTAL_WS: 4,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 5,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
        {
          NAMA_KOMPETISI: "ISL 2011",
          TOTAL_PW: 0,
          TOTAL_WS: 14,
          TOTAL_AW1: 0,
          TOTAL_AW2: 0,
          TOTAL_WC: 8,
          TOTAL_VAR: 0,
          TOTAL_AVAR: 0,
          TOTAL_AAR1: 0,
          TOTAL_PP: 0,
        },
      ],
    },
  };

  return (
    <div className="container-pssi mx-4">
      <h2 className="text-primary-pssi text-3xl font-bold">Referees</h2>
      <p className="text-sm text-neutral-400 mt-2">
        An Indonesian referee enforces rules and ensures fairness in sports
        competitions, certified nationally or internationally.
      </p>

      <div className="mt-4">
        <CarouselSize />
      </div>

      <div className="mt-4 grid grid-cols-6 gap-4 bg-white rounded-lg border">
        <div className="col-span-2">
          <LicenseDistribution />
        </div>
        <div className="col-span-4">
          <MapsChart dataMaps={dataMaps} />
        </div>
      </div>

      <div className="flex flex-wrap mt-5 bg-white p-5">
        <div className="text-black font-bold">Referee List</div>
        <DataTable
          columns={columns}
          data={refereesData?.data?.data}
          searchBy={"nama_petugas"}
        />
        <div className="flex flex-col">
          <div className="flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {/* <div className="mt-4">
        <RefereeList />
      </div> */}
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
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div>
              <Card className="border-none bg-transparent shadow-none">
                <CardContent
                  // className="flex flex-col items-center aspect-square p-6"
                  className="p-0"
                >
                  {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                  <img
                    className=" mx-auto"
                    src={
                      "https://siap.pssi.org/uploads/master_petugas/foto-thoriq-munir-alkatiri_ba01e0390d0c58ab871d3fd682bbf613.jpeg"
                    }
                    alt="avatar"
                  />
                  <div className="p-2 rounded-lg bg-white backdrop-filter bg-opacity-10 backdrop-blur-md">
                    <div className="space-y-1.5 rounded-lg w-full bg-white">
                      <p className="text-center w-full text-sm font-semibold">
                        <div className="flex flex-row justify-center">
                          <img
                            src="indo-flag.png"
                            className="w-5 h-5 shadow-lg"
                          />{" "}
                          <div className="ml-2">Thoriq Munir Alkatiri</div>
                        </div>
                      </p>
                      <p className="text-center w-full text-xs text-neutral-600">
                        C3 Referee
                      </p>
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

function LicenseDistribution() {
  return (
    <div className="px-4 py-3 ">
      <div className="">
        <h3 className="font-semibold">License Distribution</h3>
        <MultipleBarChart />
      </div>
      {/* <div className="flex-1">
        <h3 className="font-semibold">License Distribution - Female Referees by Province</h3>
      </div> */}
    </div>
  );
}

function RefereeList() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold">Referee List</h3>
      <DataTableExample />
    </Card>
  );
}
