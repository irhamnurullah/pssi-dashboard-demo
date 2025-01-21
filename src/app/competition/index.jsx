import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Fragment, useEffect, useState } from 'react';
import NavBar from '../../components/navbar';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MultipleBarChart } from '../../components/charts/barchart/multiple';
import { DataTable } from '@/components/table/datatable';
import { PaginationControls } from '../../components/table/pagination';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Checkbox } from '@/components/ui/checkbox';
import sessions from '../../../utils/sessions';
import apiService from '../../../utils/services';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
  //   ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import MapsChart from '../../components/maps/mapsChart';

const chartData = [
  { city: 'Jakarta', totalclubs: 186, totalplayers: 80, totalofficial: 20 },
  { city: 'Medan', totalclubs: 100, totalplayers: 200, totalofficial: 50 },
  { city: 'Bandung', totalclubs: 150, totalplayers: 200, totalofficial: 70 },
  { city: 'Banten', totalclubs: 73, totalplayers: 190, totalofficial: 90 },
  { city: 'Jambi', totalclubs: 209, totalplayers: 130, totalofficial: 50 },
  { city: 'Bali', totalclubs: 214, totalplayers: 140, totalofficial: 40 },
];

const chartConfig = {
  totalclubs: {
    label: 'TOTAL CLUBS',
    color: '#4ADE80',
  },
  totalplayers: {
    label: 'TOTAL PLAYERS',
    color: '#1D4ED8',
  },
  totalofficial: {
    label: 'TOTAL OFFICIAL',
    color: '#FDA4AF',
  },
};

export default function Competition() {
  const [competition, setCompetition] = useState([]);
  const token = sessions.getSessionToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [refereesData, setRefereesData] = useState([]);
  const [refereesTotal, setRefereesTotal] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getListCompetition(17);
  });

  const getListCompetition = async (id_divisi) => {
    try {
      const competition = await apiService.get(`/api/competition/GetData?id_divisi=${id_divisi}`, headers);

      if (competition.status === 200) {
        setRefereesData(competition.data);
        setRefereesTotal(competition.recordsTotal);
        setTotalPages(refereesTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataHeader = [
    {
      id: 17,
      title: 'Piala Soeratin U13',
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 15,
      title: 'Piala Soeratin U15',
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 14,
      title: 'Soeratin U17',
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 13,
      title: 'Liga4',
      totalClubs: 166,
      totalPlayers: 2502,
    },

    {
      id: 31,
      title: 'Piala Pertiwi U15',
      totalClubs: 166,
      totalPlayers: 2502,
    },

    {
      id: 30,
      title: 'Piala Pertiwi U17',
      totalClubs: 166,
      totalPlayers: 2502,
    },

    {
      id: 21,
      title: 'Piala Pertiwi',
      totalClubs: 166,
      totalPlayers: 2502,
    },
  ];

  const dataMaps = [
    ['id-ac', 19050],
    ['id-su', 48466],
    ['id-sb', 25862],
    ['id-sl', 67061],
    ['id-ri', 55266],
    ['id-kr', 9906],
    ['id-ja', 11174],
    ['id-be', 3638],
    ['id-bb', 2621],
    ['id-1024', 14481],
    ['id-jk', 127904],
    ['id-bt', 65361],
    ['id-jr', 210775],
    ['id-jt', 94373],
    ['id-yo', 23168],
    ['id-ji', 108284],
    ['id-nb', 4192],
    ['id-nt', 3393],
    ['id-kb', 5462],
    ['id-kt', 1976],
    ['id-ks', 6903],
    ['id-ki', 52417],
    ['id-sw', 5725],
    ['id-se', 29912],
    ['id-sr', 711],
    ['id-st', 4327],
    ['id-go', 1149],
    ['id-sg', 3430],
    ['id-ma', 3607],
    ['id-la', 1168],
    ['id-pa', 3911],
    ['id-ba', 5377],
  ];

  const [activeCard, setActiveCard] = useState(1);

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'NAMA_PROVINSI',
      header: 'PROVINCE',
      cell: ({ row }) => <div className="capitalize">{row.getValue('NAMA_PROVINSI')}</div>,
    },
    {
      accessorKey: 'TOTAL_KLUB',
      header: 'TOTAL CLUB',
      cell: ({ row }) => <div className="capitalize">{row.getValue('TOTAL_KLUB')}</div>,
    },
    {
      accessorKey: 'TOTAL_PEMAIN',
      header: 'TOTAL PLAYER',
      cell: ({ row }) => <div className="capitalize">{row.getValue('TOTAL_PEMAIN')}</div>,
    },
    {
      accessorKey: 'TOTAL_OFFICIAL',
      header: 'TOTAL OFFICIAL',
      cell: ({ row }) => <div className="capitalize">{row.getValue('TOTAL_OFFICIAL')}</div>,
    },
  ];

  return (
    <div>
      <div className="bg-[#7E0000] absolute h-[60vh] w-full z-10"></div>
      <NavBar bgColor="#FFFFFF" selectedTextColor="#7E0000" secondaryTextColor="#C6C6C6" />
      <div className="relative flex flex-col gap-5 container-pssi mx-4 z-20  ">
        <div>
          <h2 className="text-slate-200 text-3xl font-bold">Competition</h2>
          <p className="text-sm text-slate-200 ">
            An Indonesian competition is an organized event where participants compete in various fields, such as sports, arts, or academics, at
            regional, national, or international levels.
          </p>
        </div>

        <div className="flex flex-row mt-2 rounded-lg border bg-white p-0">
          <div className="w-full">
            {/* <h3 className="font-semibold">Soeratin U13</h3> */}
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

            <div className="flex flex-row gap-4 border-b px-4 py-3">
              {dataHeader.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveCard(item.id)}
                  style={{ cursor: 'pointer' }}
                  className={`${activeCard === item.id ? 'bg-[#010101] text-white' : 'bg-slate-100'} rounded-lg  p-3 w-full relative`}
                >
                  <div className="flex mb-2 z-20 relative justify-between">
                    <span className="  text-sm font-bold">{item.title}</span>
                  </div>
                  {activeCard === item.id && (
                    <>
                      <div className="z-20 relative">
                        <div className="flex text-xs justify-between">
                          <span className="">Total Club</span>
                          <span className=" font-medium ">{item.totalClubs}</span>
                        </div>
                        <div className="flex text-xs  justify-between">
                          <span className=" ">Total Players</span>
                          <span className="font-medium ">{item.totalPlayers}</span>
                        </div>
                      </div>

                      <div className="absolute z-10 bottom-[-1px] right-1">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z"
                            stroke="#9A5250"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.33 10H10.66C9.56003 10 8.66003 10.9 8.66003 12V22H15.33V12C15.33 10.9 14.44 10 13.33 10Z"
                            stroke="#9A5250"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 17H15.33V22H22V19C22 17.9 21.1 17 20 17Z"
                            stroke="#9A5250"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.52 2.07007L13.05 3.13006C13.12 3.28006 13.31 3.42006 13.47 3.44006L14.43 3.60007C15.04 3.70007 15.19 4.15005 14.75 4.58005L14 5.33005C13.87 5.46005 13.8 5.70006 13.84 5.87006L14.05 6.79007C14.22 7.52007 13.83 7.80007 13.19 7.42007L12.29 6.89007C12.13 6.79007 11.86 6.79007 11.7 6.89007L10.8 7.42007C10.16 7.80007 9.76998 7.52007 9.93998 6.79007L10.15 5.87006C10.19 5.70006 10.12 5.45005 9.98999 5.33005L9.24999 4.59006C8.80999 4.15006 8.94999 3.71005 9.56999 3.61005L10.53 3.45007C10.69 3.42007 10.88 3.28007 10.95 3.14007L11.48 2.08005C11.77 1.50005 12.23 1.50007 12.52 2.07007Z"
                            stroke="#9A5250"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col mt-3 p-5">
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

        <div className="mt-5 bg-white p-5">
          <div>Active Card by ID : {activeCard}</div>
          <div className="text-black font-bold">Player List</div>
          <DataTable columns={columns} data={refereesData} searchBy={'NAMA_PROVINSI'} totalData={refereesTotal} placeholderText={'Filter Nama...'} />
          {/* <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
            rowsPerPage={rowsPerPage}
          /> */}
        </div>
      </div>
    </div>
  );
}
