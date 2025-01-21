import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import PlayerCard from '../../components/card/player_card';
import { PieChartLabel } from '../../components/charts/piechart/piechart-label';
import NavBar from '../../components/navbar';
import sessions from '../../../utils/sessions';
import apiService from '../../../utils/services';
import { DataTable } from '@/components/table/datatable';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PaginationControls } from '../../components/table/pagination';
import { LoaderCircleIcon, X } from 'lucide-react';
import { MultipleBarChart } from '../../components/charts/barchart/multiple';
import MapsChart from '../../components/maps/mapsChart';
import { mappingPlayer } from '../../helper/transformProvinceArray';

const chartConfig = [
  {
    dataKey: 'female_player',
    label: 'Female',
    color: '#FF99CF',
  },
  {
    dataKey: 'male_player',
    label: 'Male',
    color: '#3067D3',
  },
];

export default function Player() {
  const [playerData, setplayerData] = useState([]);
  const [playerTotal, setPlayerTotal] = useState([]);
  const [detailPlayer, setDetailPlayer] = useState([]);
  const [detailPlayerBiodata, setDetailPlayerBiodata] = useState([]);
  const [detailPlayerContract, setDetailPlayerContract] = useState([]);
  const [detailPlayerCompetition, setDetailPlayerCompetition] = useState([]);
  const token = sessions.getSessionToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [dataSlide, setDataSlide] = useState([]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [dataMaps, setDataMaps] = useState([]);
  const [loadingDataMaps, setLoadingDataMaps] = useState(false);

  const [totalPlayer, setTotalPlayer] = useState(null);

  const [playerByAge, setPlayerByAge] = useState([]);

  const [playerProvince, setPlayerProvince] = useState([]);

  const [chartDataExample, setChartDataExample] = useState([]);

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
      accessorKey: 'id_pemain',
      header: 'ID Pemain',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id_pemain')}</div>,
    },
    {
      accessorKey: 'nama_pemain',
      header: 'Nama Pemain',
      cell: ({ row }) => <div className="capitalize">{row.getValue('nama_pemain')}</div>,
    },
    {
      accessorKey: 'jenis_kelamin',
      header: 'Gender',
      cell: ({ row }) => <div className="capitalize">{row.getValue('jenis_kelamin')}</div>,
    },
    {
      accessorKey: 'tgl_lahir',
      header: 'Tanggal Lahir',
      cell: ({ row }) => <div className="capitalize">{row.getValue('tgl_lahir')}</div>,
    },
    {
      accessorKey: 'NAMATIM',
      header: 'Nama TIM',
      cell: ({ row }) => <div className="capitalize">{row.getValue('NAMATIM')}</div>,
    },
    {
      accessorKey: 'CAPS',
      header: 'Caps',
      cell: ({ row }) => <div className="capitalize">{'-'}</div>,
    },
    {
      accessorKey: 'Goals',
      header: 'Goals',
      cell: ({ row }) => <div className="capitalize">{'-'}</div>,
    },
    {
      id: 'actions',
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
              <DialogContent className="max-w-full xl:max-w-4xl p-4 xl:p-5 overflow-y-auto h-[90vh]" openModal={isDialogOpen}>
                <DialogHeader>
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setIsDialogOpen(false)}>
                    <X className="h-4 w-4" />
                  </button>
                  <DialogTitle>
                    <div className="flex flex-row mb-2 mt-5">
                      <img className="rounded-full w-24" src={detailPlayerBiodata.URL_FOTO} alt="avatar" />
                      <div className="text-gray-700 text-[18px] font-bold ml-4 mt-3">
                        {detailPlayerBiodata.NAMA_PEMAIN}
                        <br></br>
                        <span className="text-gray-700 text-sm font-normal">
                          {detailPlayerBiodata.NAMATIM} - {detailPlayerBiodata.JENIS_KELAMIN === 'Pria' ? 'Men' : 'Women'}
                        </span>
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-row mt-5 bg-white p-1">
                      <div style={{ cursor: 'pointer' }} className={`bg-[#518EDC] bg-opacity-5 border-l-4 border-[#518EDC] p-2 w-full`}>
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">{'1.24'}</div>
                        </div>
                        <div className="text-neutral-400 text-[10px] text-lg font-normal">{'Goals per Cap'}</div>
                      </div>
                      <div style={{ cursor: 'pointer' }} className={`bg-[#16A34A] bg-opacity-5 border-l-4 border-[#16A34A] p-2 w-full`}>
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">{'4'}</div>
                        </div>
                        <div className="text-neutral-400 text-[10px] text-lg font-normal">{'Years in National Team'}</div>
                      </div>
                      <div style={{ cursor: 'pointer' }} className={`bg-[#FACC15] bg-opacity-5 border-l-4 border-[#FACC15] p-2 w-full`}>
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">{'71'}</div>
                        </div>
                        <div className="text-neutral-400 text-[10px] text-lg font-normal">{'International Ranking'}</div>
                      </div>
                      <div style={{ cursor: 'pointer' }} className={`bg-[#CC0101] bg-opacity-5 border-l-4 border-[#CC0101] p-2 w-full`}>
                        <div className="flex justify-between">
                          <div className="text-[#2D3748] text-[12px] text-lg font-bold">{'5.8'}</div>
                        </div>
                        <div className="text-neutral-400 text-[10px] text-lg font-normal">{'Form Rating'}</div>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-5">
                      <div className="bg-white rounded-lg shadow p-6 w-1/2">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="text-[#989899] text-[12px] font-medium">Personal Information</div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Federation</div>
                          <div className="text-neutral-400 font-normal">Indonesia</div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Current Club</div>
                          <div className="text-neutral-400 font-normal">Oxford United</div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Contract Start</div>
                          <div className="text-neutral-400 font-normal">2025-01-01</div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Contract End</div>
                          <div className="text-neutral-400 font-normal">2027-01-01</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow p-6 w-1/2">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="text-[#989899] text-[12px] font-medium">Career Statistics</div>
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
                          <div className="text-neutral-400 font-normal">Senior Men</div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="text-black">Position</div>
                          <div className="text-neutral-400 font-normal">Midfielder</div>
                        </div>
                      </div>
                    </div>
                  </DialogDescription>

                  <div className="flex space-x-4 mt-5">
                    <div className="text-[#989899] text-[12px] font-medium">Recent Contract</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-full">
                      <Table className="mt-2">
                        <TableHeader className="bg-[#F6F6F6]">
                          <TableRow>
                            <TableHead className="text-[12px]">Club</TableHead>
                            <TableHead className="text-[12px]">Status</TableHead>
                            <TableHead className="text-[12px]">Start</TableHead>
                            <TableHead className="text-[12px]">End</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {detailPlayer.hasOwnProperty('CONTRACT_HISTORY') ? (
                            detailPlayerContract.length > 0 ? (
                              detailPlayerContract.map((detail, index) => (
                                <TableRow key={index}>
                                  <TableCell className="text-[12px]">{detail.CLUB}</TableCell>
                                  <TableCell className="text-[12px]">{detail.STATUS}</TableCell>
                                  <TableCell className="text-[12px]">{detail.START_DATE}</TableCell>
                                  <TableCell className="text-[12px]">{detail.END_DATE}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell className="text-[12px]" colSpan={4} style={{ textAlign: 'center' }}>
                                  Tidak ada data
                                </TableCell>
                              </TableRow>
                            )
                          ) : (
                            <TableRow>
                              <TableCell className="text-[12px]" colSpan={4} style={{ textAlign: 'center' }}>
                                Tidak ada data
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-5">
                    <div className="text-[#989899] text-[12px] font-medium">Contract History</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-full">
                      <Table className="mt-2">
                        <TableHeader className="bg-[#F6F6F6]">
                          <TableRow>
                            <TableHead className="text-[12px]">Competition</TableHead>
                            <TableHead className="text-[12px]">Club</TableHead>
                            <TableHead className="text-[12px]">Position</TableHead>
                            <TableHead className="text-[12px]">Playing</TableHead>
                            <TableHead className="text-[12px]">Subtition</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {detailPlayerCompetition.length > 0 ? (
                            detailPlayerCompetition.map((detail, index) => (
                              <TableRow key={index}>
                                <TableCell className="text-[12px]">{detail.COMPETITION}</TableCell>
                                <TableCell className="text-[12px]">{detail.CLUB}</TableCell>
                                <TableCell className="text-[12px]">{detail.POSITION}</TableCell>
                                <TableCell className="text-[12px]">{detail.PLAYING}</TableCell>
                                <TableCell className="text-[12px]">{detail.SUBTITION}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell className="text-[12px]" colSpan={4} style={{ textAlign: 'center' }}>
                                Tidak ada data
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
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

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getListPlayer(currentPage, rowsPerPage);
    getChartData();
    getChartDataByProvince();
    getCarouselData();
  }, [currentPage, rowsPerPage]);

  /* Total Player Pie Chart */
  useEffect(() => {
    if (totalPlayer) {
      updateChartData();
    }
  }, [totalPlayer]);

  const getListPlayer = async (page, rowsPerPage) => {
    try {
      const player = await apiService.get(`/api/player/GetListData?row_from=${(page - 1) * rowsPerPage}&length=${rowsPerPage}`, headers);

      if (player.status === 200) {
        setplayerData(player.data.data);
        setPlayerTotal(player.data.recordsTotal);
        setTotalPages(Math.ceil(playerTotal / rowsPerPage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateChartData = async () => {
    const updatedChartData = totalPlayer
      .filter((player) => player.label !== 'Total Players')
      .map((player) => {
        const playerValue = typeof player.value === 'string' ? parseInt(player.value.replace(/\./g, ''), 10) : player.value;

        return {
          gender: player.label === 'Male Players' ? 'male' : 'female',
          player: playerValue,
          fill: player.color === 'blue' ? 'var(--color-male)' : 'var(--color-female)',
        };
      });

    console.log('🐙 ~ updateChartData ~ updatedChartData:', updatedChartData);

    setChartDataExample(updatedChartData);
    // console.log(updatedChartData);
  };

  const getChartData = async () => {
    try {
      const player = await apiService.get(`/api/player/GetData`, headers);
      const transformData = (data) => {
        const groupedData = {};

        // Iterasi menggunakan Object.entries
        Object.entries(data).forEach(([key, value]) => {
          const [gender, category] = key.split('_');
          if (!groupedData[category]) {
            groupedData[category] = { category, female_player: 0, male_player: 0 };
          }
          if (gender === 'PRIA') {
            groupedData[category].male_player = value.TOTAL;
          } else if (gender === 'WANITA') {
            groupedData[category].female_player = value.TOTAL;
          }
        });

        // Ubah hasil menjadi array
        return Object.values(groupedData);
      };

      if (player.status === 200) {
        setTotalPlayer([
          {
            label: 'Total Players',
            value: (player.data.PRIA_ALL.TOTAL + player.data.WANITA_ALL.TOTAL).toLocaleString('id-ID'),
            color: 'green',
          },
          {
            label: 'Total Male Players',
            value: player.data.PRIA_ALL.TOTAL.toLocaleString('id-ID'),
            color: 'blue',
          },
          {
            label: 'Total Female Players',
            value: player.data.WANITA_ALL.TOTAL.toLocaleString('id-ID'),
            color: 'pink',
          },
        ]);

        setPlayerByAge(transformData(player.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChartDataByProvince = async () => {
    try {
      const player = await apiService.get(`/api/player/GetDataByProvinsi`, headers);

      if (player.status === 200) {
        const playerChartByProvince = Object.entries(player.data)
          .map(([province, values]) => ({
            province,
            male: values.PRIA_ALL.TOTAL,
            female: values.WANITA_ALL.TOTAL,
          }))
          .sort((a, b) => b.male - a.male)
          .slice(0, 10);

        setPlayerProvince(playerChartByProvince);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetail = async (id_pemain) => {
    setIsDialogOpen(true);

    try {
      const detail = await apiService.get(`/api/player/GetRecordByID?id_pemain=${id_pemain}`, headers);

      if (detail.status === 200) {
        setDetailPlayer(detail.data);
        setDetailPlayerBiodata(detail.data.BIODATA);
        setDetailPlayerContract(detail.data.CONTRACT_HISTORY);
        setDetailPlayerCompetition(detail.data.COMPETITION_HISTORY);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCarouselData = async () => {
    try {
      const playerSlide = await apiService.get(`/api/player/GetSlide`, headers);

      if (playerSlide.status === 200 || playerSlide.length > 0) {
        setDataSlide(playerSlide.data);
        // console.log(playerSlide.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transformDataByCategory = (data, category) => {
    const totalPriaKey = `PRIA_${category}`;
    const totalWanitaKey = `WANITA_${category}`;

    return {
      ID_PROVINSI: data.ID_PROVINSI,
      PROVINSI: data.PROVINSI,
      TOTAL_PRIA: data[totalPriaKey]?.TOTAL || 0,
      TOTAL_WANITA: data[totalWanitaKey]?.TOTAL || 0,
    };
  };

  const handleClickPlayerByAge = async (category) => {
    setLoadingDataMaps(true);
    const { category: categoryLabel } = category.data.payload;

    setActiveCategory({ categoryLabel, dataKey: category.dataKey });

    try {
      const response = await apiService.get(`/api/player/GetDataByProvinsi`);
      const result = response.data;
      const mapArray = Object.keys(result).map((key) => transformDataByCategory(result[key], category.data.category));
      const mappingArray = mappingPlayer(mapArray, category.dataKey);
      setDataMaps(mappingArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDataMaps(false);
    }
  };

  return (
    <div>
      <div className="bg-[#212B5A] absolute h-[60vh] w-full z-10"></div>
      <NavBar bgColor="#FFFFFF" selectedTextColor="#212B5A" secondaryTextColor="#C6C6C6" />

      <div className=" flex flex-col gap-5 container-pssi mx-4 z-20 relative ">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-slate-200">Players</h1>
          <p className="text-slate-200">
            An Indonesian football player represents clubs or the national team, showcasing skills and passion in domestic and international
            competitions.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full !overflow-visible"
        >
          <CarouselContent className="!overflow-visible">
            {dataSlide.map((slide, index) => (
              <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/5 !overflow-visible" onClick={() => handleViewDetail(slide.ID_PEMAIN)}>
                <PlayerCard img={slide.URL_FOTO} alt="player" country={slide.NAMA_NEGARA} playerName={slide.NAMA_PEMAIN} namaTim={slide.NAMATIM} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* License Distribution */}
        <div className="mt-5 grid grid-cols-6 bg-white rounded-lg border">
          <div className="py-3 col-span-6 border-b border-slate-200 px-4">
            <h3 className="font-semibold">Player Distribution by Province</h3>
          </div>

          <div className="col-span-2 border-r border-slate-200">
            <PlayerDistributionChart data={playerByAge} config={chartConfig} onClick={handleClickPlayerByAge} />
          </div>
          <div className="col-span-4 px-4 pb-4">
            {activeCategory && (
              <center className="font-bold p-2 rounded-lg ml-4 text-center">
                {activeCategory?.categoryLabel} : {activeCategory?.dataKey}
              </center>
            )}

            {loadingDataMaps ? (
              <div className="flex items-center justify-center h-full">
                <LoaderCircleIcon className="animate-spin" />
              </div>
            ) : (
              <MapsChart dataMaps={dataMaps} />
            )}
          </div>
        </div>

        <div className="flex flex-col p-4 gap-4 bg-white rounded-lg shadow-lg">
          <div className="w-full justify-center">
            <PieChartLabel title={'Overall Player Distribution by Gender'} chartData={chartDataExample} />
          </div>
        </div>

        <div className="p-4 mt-5 gap-4 bg-white border rounded-lg">
          <DataTable columns={columns} data={playerData} searchBy={'nama_pemain'} totalData={playerTotal} />

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

function PlayerDistributionChart({ data, config, onClick }) {
  return (
    <div className="px-4 py-3 ">
      <div className="">
        <MultipleBarChart dataChart={data} config={config} onClick={onClick} />
      </div>
      {/* <div className="flex-1">
            <h3 className="font-semibold">License Distribution - Female coachs by Province</h3>
          </div> */}
    </div>
  );
}
