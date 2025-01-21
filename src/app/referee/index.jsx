import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MultipleBarChart } from '../../components/charts/barchart/multiple';
import { DataTable } from '@/components/table/datatable';
import MapsChart from '../../components/maps/mapsChart';
import NavBar from '../../components/navbar';
import { Checkbox } from '@/components/ui/checkbox';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Fragment, useEffect, useState } from 'react';
import sessions from '../../../utils/sessions';
import apiService from '../../../utils/services';
import { PaginationControls } from '../../components/table/pagination';
import { mapping, mappingReferee } from '../../helper/transformProvinceArray';
import { BarChartInteractive } from '../../components/charts/barchart/barchart-interactive';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const dataSelect = [
  { label: 'BRI LIGA 1 2024/2025', value: 4 },
  { label: 'BRI LIGA 2 2024/2025', value: 1 },
  { label: 'BRI LIGA 3 2024/2025', value: 32 },
];

const chartConfig = [
  {
    dataKey: 'female_referee',
    label: 'Female',
    color: '#FF99CF',
  },
  {
    dataKey: 'male_referee',
    label: 'Male',
    color: '#3067D3',
  },
];

export default function Referee() {
  const [dataMaps, setDataMaps] = useState([]);
  const [refereesData, setRefereesData] = useState([]);
  const [refereesTotal, setRefereesTotal] = useState([]);
  const [licenseChart, setChartLicenseDistribution] = useState([]);
  const [detailReferee, setDetailReferee] = useState([]);
  const [recentMatch, setRecentMatch] = useState([]);
  const token = sessions.getSessionToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [dataSlide, setDataSlide] = useState([]);

  const [distributionRefereeData, setDistributionRefereeData] = useState([]);

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
      const referee = await apiService.get(`/api/referee/GetListData?row_from=${(page - 1) * rowsPerPage}&length=${rowsPerPage}`, headers);

      if (referee.status === 200) {
        const formattedData = referee.data.data.map((ref) => ({
          ...ref,
          tgl_lahir: ref.tgl_lahir.split(' ')[0],
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
      const referee = await apiService.get(`/api/referee/GetGrafikAll`, headers);

      if (referee.status === 200 || referee.length > 0) {
        const licenceFormatChart = referee.data.map((item) => ({
          id_license: item.ID_LICENSI,
          category: item.NAME,
          female_referee: item.TOTAL_WANITA,
          male_referee: item.TOTAL_PRIA,
        }));

        setChartLicenseDistribution(licenceFormatChart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetail = async (id_petugas) => {
    setIsDialogOpen(true);

    try {
      const detail = await apiService.get(`/api/referee/GetRecordByID?id_petugas=${id_petugas}`, headers);

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
      accessorKey: 'nama_petugas',
      header: 'Nama',
      cell: ({ row }) => <div className="capitalize">{row.getValue('nama_petugas')}</div>,
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
      accessorKey: 'nama_divisi',
      header: 'Division',
      cell: ({ row }) => <div className="capitalize">{row.getValue('nama_divisi')}</div>,
    },
    {
      accessorKey: 'lisensi',
      header: 'License',
      cell: ({ row }) => <div className="capitalize">{row.getValue('lisensi')}</div>,
    },
    {
      accessorKey: 'nama_propinsi',
      header: 'Province',
      cell: ({ row }) => <div className="capitalize">{row.getValue('nama_propinsi')}</div>,
    },
    {
      accessorKey: 'nama_kota',
      header: 'City',
      cell: ({ row }) => <div className="capitalize">{row.getValue('nama_kota')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div>
            <button onClick={() => handleViewDetail(row.original.id_petugas)} className="text-blue-400">
              View Detail
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {/* <DialogTrigger onClick={() => handleViewDetail(row.original.id_petugas)} className="text-blue-400">View Detail</DialogTrigger> */}
              <DialogContent className="max-w-full  xl:max-w-4xl p-4 xl:p-5 overflow-y-auto h-[90vh] bg-[#7E0000]" openModal={isDialogOpen}>
                <DialogHeader className="relative">
                  <button className="fixed top-2 right-2 p-3  " onClick={() => setIsDialogOpen(false)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 21.8787L22 1.87891" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 1.87908L22 21.8789" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-7 pt-5">
                    <div className="col-span-2 pt-5">
                      <img className="rounded-lg w-full" src={detailReferee.URL_FOTO} alt="avatar" />
                    </div>
                    <div className="col-span-5 pl-5 text-slate-100">
                      {/* name  */}
                      <div className=" font-bold  mt-3">
                        <p className="text-3xl">{detailReferee.NAMA_PETUGAS}</p>
                        <span className="text-sm font-normal">{detailReferee.NAMA_LAMPIRAN + '-' + detailReferee.STAT_PETUGAS}</span>
                      </div>

                      <div className="grid grid-cols-3 mt-4 gap-2">
                        <div className="bg-slate-100 relative rounded-lg px-3 py-2">
                          <div className="w-7 absolute right-1  bottom-0">
                            <svg width="100%" height="100%" viewBox="0 0 297 487" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M2.19611 99.3623L95.1961 291.862C102.153 306.263 109.732 338.167 124 347L285.196 271.362C299.996 264.562 297.363 251.195 294.196 245.362L182.196 10.8623C176.996 -0.337695 164.696 -2.63802 155.696 2.86231L10.1961 71.3623C-1.00389 77.3623 -1.80383 91.3623 2.19611 99.3623Z"
                                fill="#FF0000"
                              />
                              <path
                                d="M103.023 309.342L61.0227 221.342C55.8227 227.742 42.1894 267.342 36.0227 286.342C34.8227 309.942 81.0227 394.842 96.5227 435.842V486.842H191.523V435.842C213.923 413.842 216.189 387.675 214.523 377.342C207.523 334.842 191.023 356.842 181.523 242.842C179.923 209.642 147.023 216.342 147.023 239.342V299.842C142.023 338.842 111.523 328.342 103.023 309.342Z"
                                fill="#F4D5C6"
                              />
                            </svg>
                          </div>
                          <div className="text-[#7E0000] font-bold">{detailReferee.TOTAL_RC}</div>
                          <small className="text-xs text-slate-700  ">Red Card (RC)</small>
                        </div>

                        <div className="bg-slate-100 rounded-lg px-3 py-2 relative">
                          <div className="w-7 absolute right-1  bottom-0">
                            <svg width="100%" height="100%" viewBox="0 0 355 524" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M47.1645 98.2341L105.324 303.959C109.675 319.348 111.599 352.084 124.116 363.261L295.998 316.763C311.754 312.637 311.481 299.016 309.376 292.721L239.798 42.3353C236.622 30.4025 224.908 26.0012 215.09 29.8552L59.9051 72.0487C47.8334 76.0127 44.6145 89.6611 47.1645 98.2341Z" fill="#FFE137" stroke="#8A7500" stroke-width="4"/>
                            <path d="M4.19611 136.362L97.1961 328.862C104.153 343.263 111.732 375.167 126 384L287.196 308.362C301.996 301.562 299.363 288.195 296.196 282.362L184.196 47.8623C178.996 36.6623 166.696 34.362 157.696 39.8623L12.1961 108.362C0.996111 114.362 0.196165 128.362 4.19611 136.362Z" fill="#FFE137" stroke="#8A7500" stroke-width="4"/>
                            <path d="M105.023 346.342L63.0227 258.342C57.8227 264.742 44.1894 304.342 38.0227 323.342C36.8227 346.942 83.0227 431.842 98.5227 472.842V523.842H193.523V472.842C215.923 450.842 218.189 424.675 216.523 414.342C209.523 371.842 193.023 393.842 183.523 279.842C181.923 246.642 149.023 253.342 149.023 276.342V336.842C144.023 375.842 113.523 365.342 105.023 346.342Z" fill="#F4D5C6"/>
                            </svg>

                          </div>
                          <div className="text-[#7E0000] font-bold">{detailReferee.TOTAL_SYC}</div>
                          <small className="text-xs text-slate-700  ">Second Yellow Card (SYC)</small>
                        </div>

                        <div className="bg-slate-100 rounded-lg px-3 py-4 relative">
                          <div className="w-7 absolute right-1  bottom-0">
                            <svg width="100%" height="100%" viewBox="0 0 301 489" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M4.19611 101.362L97.1961 293.862C104.153 308.263 111.732 340.167 126 349L287.196 273.362C301.996 266.562 299.363 253.195 296.196 247.362L184.196 12.8623C178.996 1.6623 166.696 -0.638021 157.696 4.86231L12.1961 73.3623C0.996111 79.3623 0.196165 93.3623 4.19611 101.362Z"
                                fill="#FFE137"
                                stroke="#8A7500"
                                strokeWidth="4"
                              />
                              <path
                                d="M105.023 311.342L63.0227 223.342C57.8227 229.742 44.1894 269.342 38.0227 288.342C36.8227 311.942 83.0227 396.842 98.5227 437.842V488.842H193.523V437.842C215.923 415.842 218.189 389.675 216.523 379.342C209.523 336.842 193.023 358.842 183.523 244.842C181.923 211.642 149.023 218.342 149.023 241.342V301.842C144.023 340.842 113.523 330.342 105.023 311.342Z"
                                fill="#F4D5C6"
                              />
                            </svg>
                          </div>
                          <div className="text-[#7E0000] font-bold">{detailReferee.TOTAL_YC}</div>
                          <small className="text-xs text-slate-700  ">Yellow Card (YC)</small>
                        </div>
                      </div>

                      {/* personal Information */}
                      <div className=" mt-5 border text-neutral-400 text-sm border-[#A75353] pb-3">
                        <div className="bg-[#A75353]  flex px-4 py-3 mb-3 items-center space-x-2">
                          <div className="text-slate-100 text-sm flex gap-2">
                            <div>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M17 21H7C3 21 2 20 2 16V8C2 4 3 3 7 3H17C21 3 22 4 22 8V16C22 20 21 21 17 21Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path d="M14 8H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17 16H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                  d="M8.49994 11.2899C9.49958 11.2899 10.3099 10.4796 10.3099 9.47992C10.3099 8.48029 9.49958 7.66992 8.49994 7.66992C7.50031 7.66992 6.68994 8.48029 6.68994 9.47992C6.68994 10.4796 7.50031 11.2899 8.49994 11.2899Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 16.33C11.86 14.88 10.71 13.74 9.26 13.61C8.76 13.56 8.25 13.56 7.74 13.61C6.29 13.75 5.14 14.88 5 16.33"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span className="my-auto">Personal Information</span>
                          </div>
                        </div>
                        <div className="flex py-1 text-slate-200 justify-between pl-12 pr-4">
                          <div className="">Birth Date</div>
                          <div className=" font-normal">{detailReferee.TGL_LAHIR}</div>
                        </div>
                        <div className="flex py-1 text-slate-200 justify-between pl-12 pr-4">
                          <div className="">Gender</div>
                          <div className=" font-normal">{detailReferee.JNS_KELAMIN}</div>
                        </div>
                        <div className="flex py-1 text-slate-200 justify-between pl-12 pr-4">
                          <div className="">Province</div>
                          <div className=" font-normal">{detailReferee.NAMA_PROPINSI}</div>
                        </div>
                        <div className="flex text-slate-200 py-1 justify-between pl-12 pr-4">
                          <div className="">City</div>
                          <div className="font-normal">{detailReferee.NAMA_KOTA}</div>
                        </div>
                      </div>

                      {/* careet statistic */}
                      <div className=" text-neutral-400 text-sm border border-[#A75353] pb-3">
                        <div className="bg-[#A75353]  flex px-4 py-3 mb-3 items-center space-x-2">
                          <div className="text-slate-100 text-sm flex gap-2">
                            <div>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.87988 18.1501V16.0801" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M12 18.15V14.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M17.1201 18.1499V11.9299" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path
                                  d="M17.1199 5.8501L16.6599 6.3901C14.1099 9.3701 10.6899 11.4801 6.87988 12.4301"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M14.1899 5.8501H17.1199V8.7701"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span className="my-auto">Career Statistics</span>
                          </div>
                        </div>
                        <div className="flex text-slate-200 py-1  justify-between pl-12 pr-4">
                          <div className="">License</div>
                          <div className=" font-normal">{detailReferee.NAMA_LAMPIRAN}</div>
                        </div>
                        <div className="flex text-slate-200 py-1  justify-between pl-12 pr-4">
                          <div className="">Division</div>
                          <div className=" font-normal">{detailReferee.NAMA_DIVISI}</div>
                        </div>
                        <div className="flex text-slate-200 py-1  justify-between pl-12 pr-4">
                          <div className="">Status</div>
                          <div className="font-normal">{detailReferee.STATUS}</div>
                        </div>
                      </div>

                      {/* recent matches  */}
                      <div className="text-[#989899] mt-5 text-[12px] font-medium">Recent Matches</div>
                      <div className="flex space-x-4 ">
                        <div className="flex border border-[#A75353] flex-row">
                          <div className="w-full">
                            <Table className="">
                              <TableHeader className="text-white text-sm bg-white">
                                <TableRow>
                                  <TableHead className="text-[12px]">Competition</TableHead>
                                  <TableHead className="text-[12px]">Match</TableHead>
                                  <TableHead className="text-[12px]">Date</TableHead>
                                  <TableHead className="text-[12px]">Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {recentMatch.length > 0 ? (
                                  recentMatch.map((match, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="text-[12px]">{match.COMPETITION}</TableCell>
                                      <TableCell className="text-[12px]">{match.MATCH}</TableCell>
                                      <TableCell className="text-[12px]">{new Date(match.DATE).toLocaleDateString()}</TableCell>
                                      <TableCell className="text-[12px]">{match.STATUS}</TableCell>
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
      const refereeSlide = await apiService.get(`/api/referee/GetSlide`, headers);

      if (refereeSlide.status === 200 || refereeSlide.length > 0) {
        setDataSlide(refereeSlide.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickChart = async (category) => {
    const { category: categoryLabel, id_license } = category.data.payload;

    setActiveCategory({ categoryLabel, dataKey: category.dataKey });

    try {
      const response = await apiService.get(`/api/referee/GetGrafikByIDLicensi?id_licensi=${id_license}`);
      const result = response.data;
      const mapArray = Object.keys(result).map((key) => result[key]);
      const mappingArray = mappingReferee(mapArray, category.dataKey);
      setDataMaps(mappingArray);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="bg-[#7E0000] absolute h-[60vh] w-full z-10"></div>
      <NavBar bgColor="#FFFFFF" selectedTextColor="#7E0000" secondaryTextColor="#6C6C6C" />
      <div className="container-pssi mx-4 z-20 relative">
        <h2 className="text-slate-200 text-4xl font-bold">Referees</h2>
        <p className="text-sm text-slate-300 mt-2">
          An Indonesian referee enforces rules and ensures fairness in sports competitions, certified nationally or internationally.
        </p>

        <div className="mt-4 py-5 px-3 mb-10">
          <CarouselSize data={dataSlide} handleViewDetail={handleViewDetail} />
        </div>

        <div className="mt-5 grid grid-cols-6 bg-white rounded-lg border">
          <div className="py-3 col-span-6 border-b border-slate-200 px-4">
            <h3 className="font-semibold">Referee Distribution</h3>
          </div>

          <div className="col-span-full border-r border-slate-200 flex flex-col justify-end">
            <RefereeActivity chartData={distributionRefereeData} />
          </div>
        </div>

        {/* License Distribution */}
        <div className="mt-5 grid grid-cols-6 bg-white rounded-lg border">
          <div className="py-3 col-span-6 border-b border-slate-200 px-4">
            <h3 className="font-semibold">License Distribution</h3>
          </div>

          <div className="col-span-2 border-r border-slate-200 flex flex-col justify-end">
            <LicenseDistribution data={licenseChart} config={chartConfig} onClick={handleClickChart} />
          </div>
          <div className="col-span-4 px-4 pb-4">
            {activeCategory && (
              <center className="font-bold p-2 rounded-lg ml-4 text-center">
                {activeCategory?.categoryLabel} : {activeCategory?.dataKey}
              </center>
            )}

            <MapsChart dataMaps={dataMaps} />
          </div>
        </div>

        <div className="mt-5 bg-white p-5">
          <div className="text-black font-bold">Referee List</div>
          <DataTable columns={columns} data={refereesData} searchBy={'nama_petugas'} totalData={refereesTotal} placeholderText={'Filter Nama...'} />
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

function CarouselSize({ data, handleViewDetail }) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full  mx-auto "
    >
      <CarouselContent>
        {data.map((slide, index) => (
          <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/5" onClick={() => handleViewDetail(slide.ID_PETUGAS)}>
            <div>
              <Card className="border hover:border-2 hover:border-[#7E0000] rounded-lg cursor-pointer border-slate-200 bg-transparent shadow-none">
                <CardContent className="p-0">
                  {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                  <img
                    className="mx-auto rounded-t-lg object-cover w-full h-[30vh]"
                    src={slide.URL_FOTO}
                    alt="avatar"
                    style={{ objectPosition: 'top' }}
                  />

                  <div className="p-2 rounded-b-lg hover:shadow-xl  bg-white " style={{ backgroundImage: `url('./pattern-white.svg')` }}>
                    <div className="py-3 px-4  relative">
                      <p className=" w-full text-md font-semibold">{slide.NAMA_PETUGAS}</p>
                      <div className="grid grid-cols-2 mt-2">
                        <div className="col-span-1">
                          <div className="flex gap-2">
                            <svg className="mt-1" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10.49 2.23006L5.50003 4.11006C4.35003 4.54006 3.41003 5.90006 3.41003 7.12006V14.5501C3.41003 15.7301 4.19003 17.2801 5.14003 17.9901L9.44003 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.9901C19.83 17.2801 20.61 15.7301 20.61 14.5501V7.12006C20.61 5.89006 19.67 4.53006 18.52 4.10006L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z"
                                stroke="grey"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9.05005 11.8701L10.66 13.4801L14.96 9.18005"
                                stroke="grey"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Division</small>
                              <p className="text-xs text-neutral-700">{slide.NAMA_DIVISI}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="flex gap-2">
                            <svg width="18" height="18" className="mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8.38 12L10.79 14.42L15.62 9.57996"
                                stroke="grey"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.75 2.44995C11.44 1.85995 12.57 1.85995 13.27 2.44995L14.85 3.80995C15.15 4.06995 15.71 4.27995 16.11 4.27995H17.81C18.87 4.27995 19.74 5.14995 19.74 6.20995V7.90995C19.74 8.29995 19.95 8.86995 20.21 9.16995L21.57 10.7499C22.16 11.4399 22.16 12.5699 21.57 13.2699L20.21 14.8499C19.95 15.1499 19.74 15.7099 19.74 16.1099V17.8099C19.74 18.8699 18.87 19.7399 17.81 19.7399H16.11C15.72 19.7399 15.15 19.9499 14.85 20.2099L13.27 21.5699C12.58 22.1599 11.45 22.1599 10.75 21.5699L9.17 20.2099C8.87 19.9499 8.31 19.7399 7.91 19.7399H6.18C5.12 19.7399 4.25 18.8699 4.25 17.8099V16.0999C4.25 15.7099 4.04 15.1499 3.79 14.8499L2.44 13.2599C1.86 12.5699 1.86 11.4499 2.44 10.7599L3.79 9.16995C4.04 8.86995 4.25 8.30995 4.25 7.91995V6.19995C4.25 5.13995 5.12 4.26995 6.18 4.26995H7.91C8.3 4.26995 8.87 4.05995 9.17 3.79995L10.75 2.44995Z"
                                stroke="grey"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Status</small>
                              <p className="text-xs text-neutral-700">{slide.STAT_PETUGAS}</p>
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

function LicenseDistribution({ data, config, onClick }) {
  return (
    <div className="px-4 py-3 flex flex-col justify-end">
      <MultipleBarChart dataChart={data} config={config} onClick={onClick} />

      {/* <div className="flex-1">
        <h3 className="font-semibold">License Distribution - Female Referees by Province</h3>
      </div> */}
    </div>
  );
}

function RefereeActivity() {
  const [distributionRefereeData, setDistributionRefereeData] = useState([]);

  const [activeLiga, setActiveLiga] = useState(4);

  const handleChangeSelect = async (value) => {
    setActiveLiga(value);
    await getDistributionReferee(value);
  };

  const getDistributionReferee = async (id_divisi) => {
    try {
      const response = await apiService.get(`/api/referee/GetGrafikPenugasanWasit?id_divisi=${id_divisi}`);
      const result = response.data;
      const randomArray = result.sort(() => Math.random() - 0.5);

      setDistributionRefereeData(randomArray);
    } catch (error) {
      console.log('🐙 ~ getGrafikByProvince ~ error:', error);
    }
  };

  useEffect(() => {
    getDistributionReferee(1);
  }, []);

  return (
    <Fragment>
      <div className="flex items-center justify-end pt-4 pr-10">
        <Select onValueChange={handleChangeSelect} defaultValue={dataSelect[0]?.value}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Liga" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataSelect.map((item) => (
                <SelectItem value={item.value} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <BarChartInteractive chartData={distributionRefereeData} />
    </Fragment>
  );
}
