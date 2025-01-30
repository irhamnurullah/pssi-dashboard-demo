import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MultipleBarChart } from '../../components/charts/barchart/multiple';
import { DataTableExample } from '@/components/table/example-table';
import MapsChart from '../../components/maps/mapsChart';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import NavBar from '../../components/navbar';
import coachImage from '../../assets/coach1.jpg';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import sessions from '../../../utils/sessions';
import apiService from '../../../utils/services';
import { DataTable } from '@/components/table/datatable';
import { PaginationControls } from '../../components/table/pagination';
import { LoaderCircleIcon, X } from 'lucide-react';
import { mappingCoach } from '../../helper/transformProvinceArray';
import { BarChartHorizontalLabel } from '../../components/charts/barchart/barchart-horizontal-label';

const chartConfig = [
  {
    dataKey: 'female',
    label: 'Female',
    color: '#FF99CF',
  },
  {
    dataKey: 'male',
    label: 'Male',
    color: '#3067D3',
  },
];

export default function Coach() {

  const tableData = [
    {
      id: 'COACH001',
      name: 'Coach 1',
      position: 'L',
      team: '1982-07-25',
      currentClub: 'A',
      caps: 'Head Coach',
      goals: 'Persija',
    },
    {
      id: 'COACH002',
      name: 'Coach 2',
      position: 'L',
      team: '1982-07-25',
      currentClub: 'A',
      caps: 'Head Coach',
      goals: 'Persija',
    },
  ];

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
      accessorKey: 'nama_official',
      header: 'Official Name',
      cell: ({ row }) => <div className="capitalize">{row.getValue('nama_official')}</div>,
    },
    {
      accessorKey: 'jenis_kelamin',
      header: 'Gender',
      cell: ({ row }) => <div className="capitalize">{row.getValue('jenis_kelamin')}</div>,
    },
    {
      accessorKey: 'tgl_lahir',
      header: 'Birth Date',
      cell: ({ row }) => <div className="capitalize">{row.getValue('tgl_lahir')}</div>,
    },
    {
      accessorKey: 'lisensi',
      header: 'Licence',
      cell: ({ row }) => <div className="capitalize">{row.getValue('lisensi')}</div>,
    },
    {
      accessorKey: 'NAMATIM',
      header: 'Club',
      cell: ({ row }) => <div className="capitalize">{row.getValue('NAMATIM')}</div>,
    },
    {
      accessorKey: 'NAMA_JABATAN',
      header: 'Position',
      cell: ({ row }) => <div className="capitalize">{row.getValue('NAMA_JABATAN')}</div>,
    },
    {
      id: 'actions',
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
              <DialogContent className="max-w-full xl:max-w-4xl p-4 xl:p-5 bg-[#212B5A] overflow-y-auto h-[90vh]" openModal={isDialogOpen}>
                <DialogHeader>
                  <button className="fixed top-2 right-2 p-3  " onClick={() => setIsDialogOpen(false)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 21.8787L22 1.87891" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 1.87908L22 21.8789" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <DialogDescription>
                    <div className="grid grid-cols-7 pt-5">
                      {/* left  */}
                      <div className="col-span-2 pt-5">
                        <img className="rounded-lg w-full" src={detailCoachBiodata.URL_FOTO} alt="avatar" />
                      </div>

                      {/* right  */}
                      <div className="col-span-5 pl-5 text-slate-100">
                        {/* name  */}
                        <div className="font-bold  mt-3">
                          <p className="text-xl">{detailCoachBiodata.NAMA_OFFICIAL}</p>
                          <span className=" text-sm font-normal">
                            {detailCoachBiodata.NAMA_JABATAN} {'-' + lisensi}
                          </span>
                        </div>

                        {/* personal information          */}
                        <div className=" mt-5 border text-neutral-400 text-sm border-[#646b8b] pb-3">
                          <div className="bg-[#646b8b]  flex px-4 py-3 mb-3 items-center space-x-2">
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
                            <div className=" font-normal">{detailCoachBiodata.TGL_LAHIR}</div>
                          </div>
                          <div className="flex py-1 text-slate-200 justify-between pl-12 pr-4">
                            <div className="">Gender</div>
                            <div className=" font-normal">{detailCoachBiodata.JENIS_KELAMIN}</div>
                          </div>
                          <div className="flex py-1 text-slate-200 justify-between pl-12 pr-4">
                            <div className="">Nationality</div>
                            <div className=" font-normal">{detailCoachBiodata.NAMA_NEGARA}</div>
                          </div>
                          <div className="flex text-slate-200 py-1 justify-between pl-12 pr-4">
                            <div className="">Position</div>
                            <div className="font-normal">{detailCoachBiodata.NAMA_JABATAN}</div>
                          </div>
                          <div className="flex text-slate-200 py-1 justify-between pl-12 pr-4">
                            <div className="">Club</div>
                            <div className="font-normal">{detailCoachBiodata.NAMATIM}</div>
                          </div>
                          <div className="flex text-slate-200 py-1 justify-between pl-12 pr-4">
                            <div className="">Licence</div>
                            <div className="font-normal">{lisensi}</div>
                          </div>
                        </div>

                        {/* contract history  */}
                        <div className="flex space-x-4 mt-5">
                          <div className="text-[#989899] text-[12px] font-medium">Contract History</div>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-full">
                            <Table className="mt-2">
                              <TableHeader className="bg-[#F6F6F6]">
                                <TableRow>
                                  <TableHead className="text-[12px]">Club</TableHead>
                                  <TableHead className="text-[12px]">Position</TableHead>
                                  <TableHead className="text-[12px]">Start Date</TableHead>
                                  <TableHead className="text-[12px]">End Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {detailCoach.hasOwnProperty('CONTRACT_HISTORY') ? (
                                  detailContract.length > 0 ? (
                                    detailContract.map((detail, index) => (
                                      <TableRow key={index}>
                                        <TableCell className="text-[12px]">{detail.CLUB}</TableCell>
                                        <TableCell className="text-[12px]">{detail.POSITION}</TableCell>
                                        <TableCell className="text-[12px]">{detail.START_DATE}</TableCell>
                                        <TableCell className="text-[12px]"><div dangerouslySetInnerHTML={{__html:detail.END_DATE}} /></TableCell>
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

                        {/* copetition history  */}
                        <div className="flex space-x-4 mt-5">
                          <div className="text-[#989899] text-[12px] font-medium">Competition History</div>
                        </div>
                        <div className="flex flex-row">
                          <div className="w-full">
                            <Table className="mt-2">
                              <TableHeader className="bg-[#F6F6F6]">
                                <TableRow>
                                  <TableHead className="text-[12px]">Club</TableHead>
                                  <TableHead className="text-[12px]">Competition</TableHead>
                                  <TableHead className="text-[12px]">Position</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {detailCoach.hasOwnProperty('COMPETITION_HISTORY') ? (
                                  detailCompetition.length > 0 ? (
                                    detailCompetition.map((detail, index) => (
                                      <TableRow key={index}>
                                        <TableCell className="text-[12px]">{detail.COMPETITION}</TableCell>
                                        <TableCell className="text-[12px]">{detail.CLUB}</TableCell>
                                        <TableCell className="text-[12px]">{detail.POSITION}</TableCell>
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

  const [coachData, setCoachData] = useState([]);
  const [coachTotal, setCoachTotal] = useState([]);
  const [licenseChart, setChartLicenseDistribution] = useState([]);
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

  const [dataMaps, setDataMaps] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [isLoadingGet, setIsLoadingGet] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getListCoach(currentPage, rowsPerPage);
    getChartData();
    getCarouselData();
  }, [currentPage, rowsPerPage]);

  const getListCoach = async (page, rowsPerPage) => {
    setIsLoadingTable(true);
    try {
      const coach = await apiService.get(`/api/coach/GetListData?row_from=${(page - 1) * rowsPerPage}&length=${rowsPerPage}`, headers);

      if (coach.status === 200) {
        setCoachData(coach.data.data);
        setCoachTotal(coach.data.recordsTotal);
        setTotalPages(Math.ceil(coachTotal / rowsPerPage));
      }
      setIsLoadingTable(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getChartData = async () => {
    try {
      const coach = await apiService.get(`/api/coach/GetGrafikAll`, headers);

      if (coach.status === 200 || coach.length > 0) {
        const licenceFormatChart = coach.data.map((item) => ({
          id_license: item.ID_LICENSI,
          category: item.NAME,
          female: item.TOTAL_WANITA,
          male: item.TOTAL_PRIA,
        }));

        setChartLicenseDistribution(licenceFormatChart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetail = async (id_official) => {
    setIsDialogOpen(true);

    try {
      const detail = await apiService.get(`/api/coach/GetRecordByID?id_official=${id_official}`, headers);

      if (detail.status === 200) {
        console.log(detail.data);
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
      const coachSlide = await apiService.get(`/api/coach/GetSlide`, headers);

      if (coachSlide.status === 200 || coachSlide.length > 0) {
        setDataSlide(coachSlide.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCoachesByLicense = async (category) => {
    setIsLoadingGet(true);
    const { category: categoryLabel, id_license } = category.data.payload;

    setActiveCategory({ categoryLabel, dataKey: category.dataKey });

    try {
      const response = await apiService.get(`/api/coach/GetGrafikByIDLicensi?id_licensi=${id_license}`);
      const result = response.data;
      const mapArray = Object.keys(result).map((key) => result[key]);
      const mappingArray = mappingCoach(mapArray, category.dataKey);
      setDataMaps(mappingArray);
      setIsLoadingGet(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="bg-[#212B5A] absolute h-[60vh] w-full z-10"></div>
      <NavBar bgColor="#FFFFFF" selectedTextColor="#212B5A" secondaryTextColor="#C6C6C6" />

      <div className="container-pssi mx-4 z-20 relative">
        <h2 className="text-slate-200 text-4xl font-bold">Coach</h2>
        <p className="text-sm text-slate-200 mt-2">
          An Indonesian coach trains and guides athletes or teams, focusing on skill development, strategy, and performance improvement.
        </p>

        <div className="mt-4">
          <CarouselSize data={dataSlide} handleViewDetail={handleViewDetail} />
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 bg-white rounded-lg border">
          <div className="col-span-5">
            <LicenseDistribution data={licenseChart} config={chartConfig} onClick={handleClickCoachesByLicense} />
          </div>
          <div className="col-span-7">
            {activeCategory && (
              <center className="font-bold p-2 rounded-lg ml-4 text-center">
                {activeCategory?.categoryLabel} : {activeCategory?.dataKey}
              </center>
            )}

            {isLoadingGet ? <div className="flex items-center justify-center h-full">
              <LoaderCircleIcon className="animate-spin" />
            </div> : <MapsChart dataMaps={dataMaps} />}
            
          </div>
        </div>

        <div className="p-4 mt-5 gap-4 bg-white border rounded-lg">
          {isLoadingTable ? <div className="flex items-center justify-center h-full">
              <LoaderCircleIcon className="animate-spin" />
            </div> :
            <>
              <DataTable columns={columns} data={coachData} searchBy={'nama_official'} totalData={coachTotal} placeholderText="Filter by Official Name..." />
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={setRowsPerPage}
                rowsPerPage={rowsPerPage}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

function CarouselSize({ data, handleViewDetail }) {
  // console.log(data);
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full  mx-auto"
    >
      <CarouselContent>
        {data.map((slide, index) => (
          <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/5" onClick={() => handleViewDetail(slide.ID_OFFICIAL)}>
            <div>
              <Card className="border-none bg-transparent shadow-none">
                <CardContent className="p-0">
                  <img
                    className="mx-auto rounded-t-lg object-cover w-full h-[30vh]"
                    src={slide.URL_FOTO}
                    alt="avatar"
                    style={{ objectPosition: 'top' }}
                  />

                  <div className="px-4 py-3 border rounded-b-lg hover:shadow-xl  bg-white " style={{ backgroundImage: `url('./pattern-white.svg')` }}>
                    <div className=" rounded-lg w-full ">
                      <p className="w-full text-[#212B5A] text-sm truncate font-semibold">{slide.NAMA_OFFICIAL}</p>

                      <div className="grid grid-cols-3 mt-2">
                        <div className="col-span-2">
                          <div className="flex gap-1">
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
                              <small className="text-xs text-neutral-400">Position</small>
                              <p className="text-xs text-neutral-700">{slide.NAMA_JABATAN}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="flex gap-1">
                            <svg width="18" height="18" className="mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M5.15002 2V22"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Nationality</small>
                              <p className="text-xs text-neutral-700">{slide.NAMA_NEGARA}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 mt-1">
                          <div className="flex gap-1">
                            <svg width="18" height="18" className="mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z"
                                stroke="#292D32"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.33 10H10.66C9.56003 10 8.66003 10.9 8.66003 12V22H15.33V12C15.33 10.9 14.44 10 13.33 10Z"
                                stroke="grey"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 17H15.33V22H22V19C22 17.9 21.1 17 20 17Z"
                                stroke="grey"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.52 2.07007L13.05 3.13006C13.12 3.28006 13.31 3.42006 13.47 3.44006L14.43 3.60007C15.04 3.70007 15.19 4.15005 14.75 4.58005L14 5.33005C13.87 5.46005 13.8 5.70006 13.84 5.87006L14.05 6.79007C14.22 7.52007 13.83 7.80007 13.19 7.42007L12.29 6.89007C12.13 6.79007 11.86 6.79007 11.7 6.89007L10.8 7.42007C10.16 7.80007 9.76998 7.52007 9.93998 6.79007L10.15 5.87006C10.19 5.70006 10.12 5.45005 9.98999 5.33005L9.24999 4.59006C8.80999 4.15006 8.94999 3.71005 9.56999 3.61005L10.53 3.45007C10.69 3.42007 10.88 3.28007 10.95 3.14007L11.48 2.08005C11.77 1.50005 12.23 1.50007 12.52 2.07007Z"
                                stroke="grey"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Club</small>
                              <p className="text-xs text-neutral-700">{slide.NAMATIM}</p>
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

function LicenseDistribution({ data, config, onClick }) {
  return (
    <div className="px-5 py-5 ">
      <div className="">
        <h3 className="font-semibold">License Distribution</h3>
        {/* <MultipleBarChart dataChart={data} config={config} onClick={onClick} /> */}
        <BarChartHorizontalLabel dataChart={data} onClick={onClick}/>
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
