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
import { X } from 'lucide-react';

export default function Player() {
  const chartConfig = {
    female: {
      label: 'Female Player',
      color: '#FF99CF',
    },
    male: {
      label: 'Male Player',
      color: '#3067D3',
    },
  };

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

  const [totalPlayer, setTotalPlayer] = useState([
    {
      label: 'Total Players',
      value: 0,
      color: 'green',
    },
    {
      label: 'Male Players',
      value: 0,
      color: 'blue',
    },
    {
      label: 'Female Players',
      value: 0,
      color: 'pink',
    },
  ]);

  const [playerByAge, setPlayerByAge] = useState([
    { age: 'U17', male: 0, female: 0 },
    { age: 'U20', male: 0, female: 0 },
    { age: 'U23', male: 0, female: 0 },
    { age: 'Senior', male: 0, female: 0 },
  ]);

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
              <DialogContent className="max-w-full xl:max-w-4xl p-4 xl:p-5 bg-[#212B5A] overflow-y-auto h-[90vh]" openModal={isDialogOpen}>
                <DialogHeader>
                  
                  <div className="fixed top-2 right-2 p-3 cursor-pointer " onClick={() => setIsDialogOpen(false)}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 21.8787L22 1.87891" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 1.87908L22 21.8789" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <DialogDescription>

                    <div className="grid grid-cols-7 pt-5">
                      <div className="col-span-2 pt-5">
                        <img className="rounded-lg w-full" src={detailPlayerBiodata.URL_FOTO} alt="avatar" />
                      </div>

                      <div className="col-span-5 pl-5 text-slate-100">
                        <div className="font-bold  mt-3">
                          <p className="text-xl font-bold">{detailPlayerBiodata.NAMA_PEMAIN}</p>
                          
                          <span className="text-sm font-normal">
                            {detailPlayerBiodata.NAMATIM} - {detailPlayerBiodata.JENIS_KELAMIN === 'Pria' ? 'Men' : 'Women'}
                          </span>
                        </div>

                        {/* group resume  */}
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
                            <div className="text-[#212b5a] font-bold">{detailPlayerBiodata.RC}</div>
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
                            <div className="text-[#212b5a] font-bold">{detailPlayerBiodata.SYC}</div>
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
                            <div className="text-[#212b5a] font-bold">{detailPlayerBiodata.YC}</div>
                            <small className="text-xs text-slate-700  ">Yellow Card (YC)</small>
                          </div>

                        </div>

                        <div className="grid grid-cols-4 mt-4 gap-2">
                          <div className="bg-slate-100 rounded-lg px-3 py-4 relative">
                            <div className="w-7 absolute right-1  bottom-0">
                              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="0.5" d="M2 12C2 17.5228 6.47715 22 12 22C13.8526 22 15.5875 21.4962 17.0752 20.6182C17.0775 20.6169 17.0797 20.6156 17.0819 20.6143C17.5169 20.3571 17.9308 20.0679 18.3202 19.7499C20.5661 17.9162 22 15.1255 22 12C22 6.47715 17.5228 2 12 2C10.1443 2 8.40658 2.50549 6.91715 3.38628C6.88285 3.40657 6.84867 3.42705 6.81464 3.44773C6.41584 3.69005 6.03533 3.95947 5.67568 4.25345C3.43217 6.08725 2 8.87638 2 12Z" fill="#2684FC"/>
                              <path d="M13.1285 7.50055V10.0881L6.91725 3.38672C6.48105 3.64467 6.06613 3.93482 5.67578 4.25389L13.3285 12.5104C13.5382 12.7367 13.8651 12.8114 14.1524 12.6988C14.4396 12.5861 14.6285 12.3091 14.6285 12.0005V7.50055C14.6285 7.08633 14.2928 6.75055 13.8785 6.75055C13.4643 6.75055 13.1285 7.08633 13.1285 7.50055Z" fill="#2684FC"/>
                              <path d="M10.4208 11.4823C10.2091 11.2607 9.88389 11.1902 9.59944 11.3043C9.31499 11.4183 9.12854 11.6939 9.12854 12.0004V16.5004C9.12854 16.9146 9.46432 17.2504 9.87854 17.2504C10.2928 17.2504 10.6285 16.9146 10.6285 16.5004V13.8711L17.0753 20.6187C17.5128 20.3605 17.9289 20.0699 18.3203 19.7503L10.4208 11.4823Z" fill="#2684FC"/>
                              </svg>

                            </div>
                            <div className="text-[#212b5a] font-bold">{detailPlayerBiodata.SUBTITION}</div>
                            <small className="text-xs text-slate-700  ">Subtition</small>
                          </div>

                          <div className="bg-slate-100 rounded-lg px-3 py-4 relative">
                            <div className="w-7 absolute right-1  bottom-0">
                              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.81828 5.27233C2.22012 5.17186 2.62732 5.41619 2.72778 5.81803L3.10975 7.3459C3.71957 9.78517 5.64125 11.6764 8.0847 12.2499H16.0002C18.0912 12.2499 19.8512 13.815 20.0956 15.8918L20.745 21.4123C20.7934 21.8237 20.4992 22.1964 20.0878 22.2448C19.6764 22.2932 19.3037 21.9989 19.2553 21.5876L18.6058 16.067C18.4504 14.7457 17.3306 13.7499 16.0002 13.7499H7.91785L7.83748 13.7321C4.80227 13.0576 2.40864 10.7261 1.65454 7.7097L1.27257 6.18183C1.17211 5.77999 1.41643 5.37279 1.81828 5.27233Z" fill="#2684FC"/>
                              <path opacity="0.5" d="M8 13.75V18C8 19.8856 8 20.8284 8.58579 21.4142C9.17157 22 10.1144 22 12 22C13.8856 22 14.8284 22 15.4142 21.4142C16 20.8284 16 19.8856 16 18V13.75H8Z" fill="#2684FC"/>
                              <circle cx="12" cy="6" r="4" fill="#2684FC"/>
                              </svg>

                            </div>
                            <div className="text-[#212b5a] font-bold">{detailPlayerBiodata.PLAYING}</div>
                            <small className="text-xs text-slate-700  ">Playing</small>
                          </div>

                          <div className="bg-slate-100 rounded-lg px-3 py-4 relative">
                            <div className="w-7 absolute right-1  bottom-0">
                              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16ZM12 6C11.7159 6 11.5259 6.34084 11.1459 7.02251L11.0476 7.19887C10.9397 7.39258 10.8857 7.48944 10.8015 7.55334C10.7173 7.61725 10.6125 7.64097 10.4028 7.68841L10.2119 7.73161C9.47396 7.89857 9.10501 7.98205 9.01723 8.26432C8.92945 8.54659 9.18097 8.84072 9.68403 9.42898L9.81418 9.58117C9.95713 9.74833 10.0286 9.83191 10.0608 9.93531C10.0929 10.0387 10.0821 10.1502 10.0605 10.3733L10.0408 10.5763C9.96476 11.3612 9.92674 11.7536 10.1565 11.9281C10.3864 12.1025 10.7318 11.9435 11.4227 11.6254L11.6014 11.5431C11.7978 11.4527 11.8959 11.4075 12 11.4075C12.1041 11.4075 12.2022 11.4527 12.3986 11.5431L12.5773 11.6254C13.2682 11.9435 13.6136 12.1025 13.8435 11.9281C14.0733 11.7536 14.0352 11.3612 13.9592 10.5763L13.9395 10.3733C13.9179 10.1502 13.9071 10.0387 13.9392 9.93531C13.9714 9.83191 14.0429 9.74833 14.1858 9.58118L14.316 9.42898C14.819 8.84072 15.0706 8.54659 14.9828 8.26432C14.895 7.98205 14.526 7.89857 13.7881 7.73161L13.5972 7.68841C13.3875 7.64097 13.2827 7.61725 13.1985 7.55334C13.1143 7.48944 13.0603 7.39258 12.9524 7.19887L12.8541 7.02251C12.4741 6.34084 12.2841 6 12 6Z" fill="#2684FC"/>
                              <path opacity="0.5" d="M6.71424 17.323L7.35111 15L8 13H16L16.6489 15L17.2858 17.323C17.9141 19.6148 18.2283 20.7607 17.809 21.3881C17.6621 21.6079 17.465 21.7844 17.2363 21.9008C16.5837 22.2331 15.576 21.7081 13.5607 20.658C12.8901 20.3086 12.5548 20.1339 12.1986 20.0959C12.0665 20.0818 11.9335 20.0818 11.8014 20.0959C11.4452 20.1339 11.1099 20.3086 10.4393 20.658L10.4393 20.658C8.42401 21.7081 7.41635 22.2331 6.76372 21.9008C6.535 21.7844 6.3379 21.6079 6.19097 21.3881C5.77173 20.7607 6.0859 19.6148 6.71424 17.323Z" fill="#2684FC"/>
                              </svg>

                            </div>
                            <div className="text-[#212b5a] font-bold">{detailPlayerBiodata.MOP}</div>
                            <small className="text-xs text-slate-700  ">MOP</small>
                          </div>

                          <div className="bg-slate-100 rounded-lg px-3 py-4 relative">
                            <div className="w-7 absolute right-1  bottom-0">
                              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#2684FC"/>
                              <path d="M15.658 3.22334L14.3376 4.15456C13.6404 4.6463 13.1571 4.98717 12.7387 5.17554V9.57381L14.2887 10.7593L18.3858 9.0626C18.4193 8.60569 18.5719 8.03567 18.7915 7.21528L19.2095 5.65341L19.3212 5.20978C20.9695 6.99304 21.9769 9.37874 21.9769 12C21.9769 12.1971 21.9712 12.3929 21.96 12.5872L20.4493 11.5886C19.7353 11.1166 19.2411 10.79 18.9132 10.4677L14.7009 12.2121L14.1186 14.0986L16.6986 17.0828C17.146 17 17.7315 17 18.5696 17H20.6406C19.2551 19.3979 16.9037 21.1663 14.1189 21.772L14.1917 21.5L14.7793 19.7351C15.0515 18.9175 15.2394 18.3531 15.4674 17.9522L12.9151 15H11.0415L8.71853 17.9583C8.9449 18.3588 9.13229 18.9216 9.40314 19.7351L9.99076 21.5L10.0999 21.8215C7.20965 21.2678 4.76172 19.467 3.33628 17H5.61279C6.45913 17 7.04778 17 7.49688 17.0852L9.85371 14.0838L9.27685 12.2149L5.12864 10.4667C4.8008 10.7893 4.30632 11.1161 3.59168 11.5885L2.04097 12.6136L2.01944 12.6289C2.00654 12.421 2 12.2112 2 12C2 9.35924 3.02243 6.95755 4.69259 5.17007L4.8315 5.65332L5.24951 7.21519C5.46881 8.03457 5.62126 8.60419 5.65502 9.06081L9.68715 10.7601L11.2387 9.57341V5.15773C10.8253 4.96004 10.3502 4.60934 9.66562 4.10403L8.16997 3L7.9628 2.84539C9.19428 2.30182 10.5562 2 11.9885 2C13.436 2 14.8117 2.30828 16.0534 2.86285L15.658 3.22334Z" fill="#2684FC"/>
                              </svg>

                            </div>
                            <div className="text-[#212b5a] font-bold">{detailPlayerBiodata.GOAL}</div>
                            <small className="text-xs text-slate-700  ">Goal</small>
                          </div>
                        </div>


                        {/* personal information */}
                        <div className=" mt-5 border text-neutral-400 text-sm border-[#4D679E] pb-3">
                          <div className="bg-[#4D679E]  flex px-4 py-3 mb-3 items-center space-x-2">
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
                            <div className="">Tanggal Lahir</div>
                            <div className=" font-normal">{detailPlayerBiodata.TGL_LAHIR}</div>
                          </div>
                          <div className="flex py-1 text-slate-200 justify-between pl-12 pr-4">
                            <div className="">Jenis Kelamin</div>
                            <div className=" font-normal">{detailPlayerBiodata.JENIS_KELAMIN}</div>
                          </div>
                          <div className="flex py-1 text-slate-200 justify-between pl-12 pr-4">
                            <div className="">Kewarganegaraan</div>
                            <div className=" font-normal"> </div>
                          </div>
                          <div className="flex py-1 text-slate-200 justify-between pl-12 pr-4">
                            <div className="">Club</div>
                            <div className=" font-normal">{detailPlayerBiodata.NAMATIM} </div>
                          </div>
                        </div>


                        {/* Contract history / */}
                        <div className="flex space-x-4 mt-5">
                          <div className="text-slate-100 text-[12px] font-medium">Contract History</div>
                        </div>
                        <div className="flex flex-row mt-1">
                          <div className="w-full border border-[#4D679E]">
                            <Table className=" table-auto">
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

                        {/* competition history */}
                        <div className="flex space-x-4 mt-5">
                          <div className="text-slate-100 text-[12px] font-medium">Competition History</div>
                        </div>
                        <div className="flex flex-row mt-1">
                          <div className="w-full border border-[#4D679E]">
                            <Table className="">
                              <TableHeader className="bg-[#F6F6F6]">
                                <TableRow>
                                  <TableHead className="text-[12px]">Competition</TableHead>
                                  <TableHead className="text-[12px]">Club</TableHead>
                                  <TableHead className="text-[12px]">Position</TableHead>
                                  <TableHead className="text-[12px]">Playing</TableHead>
                                  <TableHead className="text-[12px]">Subtition</TableHead>

                                  <TableHead className="text-[12px]">MOP</TableHead>
                                  <TableHead className="text-[12px]">GOAL</TableHead>
                                  <TableHead className="text-[12px]">Red Card (RC)</TableHead>
                                  <TableHead className="text-[12px]">Second Yellow Card (SYC)</TableHead>
                                  <TableHead className="text-[12px]">Yellow Card (YC)</TableHead>

                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {detailPlayerCompetition?.length > 0 ? (
                                  detailPlayerCompetition?.map((detail, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="text-[12px]">{detail.COMPETITION}</TableCell>
                                      <TableCell className="text-[12px]">{detail.CLUB}</TableCell>
                                      <TableCell className="text-[12px]">{detail.POSITION}</TableCell>
                                      <TableCell className="text-[12px]">{detail.PLAYING}</TableCell>
                                      <TableCell className="text-[12px]">{detail.SUBTITION}</TableCell>

                                      <TableCell className="text-[12px]">{detail.MOP}</TableCell>
                                      <TableCell className="text-[12px]">{detail.GOAL}</TableCell>
                                      <TableCell className="text-[12px]">{detail.RC}</TableCell>
                                      <TableCell className="text-[12px]">{detail.SYC}</TableCell>
                                      <TableCell className="text-[12px]">{detail.YC}</TableCell>
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
    getListPlayer(currentPage, rowsPerPage);
    getChartData();
    getChartDataByProvince();
    getCarouselData();
  }, [currentPage, rowsPerPage]);

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

  const updateChartData = () => {
    const updatedChartData = totalPlayer
      .filter((player) => player.label !== 'Total Players') // Hanya ambil Male dan Female
      .map((player) => {
        const playerValue =
          typeof player.value === 'string'
            ? parseInt(player.value.replace(/\./g, ''), 10) // Jika string, konversi ke angka
            : player.value; // Jika sudah angka, gunakan langsung

        return {
          gender: player.label.toLowerCase().includes('male') ? 'male' : 'female',
          player: playerValue,
          fill: player.color === 'blue' ? 'var(--color-male)' : 'var(--color-female)',
        };
      });

    setChartDataExample(updatedChartData);
  };

  const getChartData = async () => {
    try {
      const player = await apiService.get(`/api/player/GetData`, headers);

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

        setPlayerByAge([
          {
            age: 'U17',
            male: player.data.PRIA_U17.TOTAL,
            female: player.data.WANITA_U17.TOTAL,
          },
          {
            age: 'U20',
            male: player.data.PRIA_U20.TOTAL,
            female: player.data.WANITA_U20.TOTAL,
          },
          {
            age: 'U23',
            male: player.data.PRIA_U23.TOTAL,
            female: player.data.WANITA_U23.TOTAL,
          },
          {
            age: 'Senior',
            male: player.data.PRIA_ALL.TOTAL,
            female: player.data.WANITA_ALL.TOTAL,
          },
        ]);

        updateChartData();
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
        console.log(playerSlide.data);
      }
    } catch (error) {
      console.log(error);
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

        <div className="grid grid-cols-3 gap-4 ">
          {totalPlayer.map((card, idx) => (
            <div
              className="relative bg-white border rounded-lg p-5 "
              style={{ backgroundImage: `url('./bg-logo-white.svg')`, backgroundRepeat: 'no-repeat', backgroundPosition: '100% 200%' }}
            >
              <p className="text-sm text-slate-600">{card.label}</p>
              <p className="font-bold text-[#212B5A] text-xl">{card.value}</p>
              {/* <img src="" className="w-20 h-20 absolute bottom-[-15px] right-[-5px]" /> */}
            </div>
          ))}
        </div>

        

        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-col col-span-5 p-4 gap-4 bg-white rounded-lg shadow-lg">
            <p className="font-bold">Player Distribution by Age Category and Gender</p>

            <ChartContainer config={chartConfig} className="h-full">
              <BarChart accessibilityLayer data={playerByAge}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="age" tickLine={true} tickMargin={10} axisLine={true} tickFormatter={(value) => value} />
                <YAxis tickLine={true} tickMargin={10} axisLine={true} tickFormatter={(value) => value.toLocaleString()} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="male" stackId="a" fill="var(--color-male)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="female" stackId="a" fill="var(--color-female)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="flex flex-col col-span-7 p-4 gap-4 bg-white rounded-lg shadow-lg">
            <p className="font-bold">Player Distribution by Province</p>

            <ChartContainer config={chartConfig} className="h-full">
              <BarChart accessibilityLayer data={playerProvince}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="province" tickLine={true} tickMargin={10} axisLine={true} tickFormatter={(value) => value.slice(0, 5)} />
                <YAxis tickLine={true} tickMargin={10} axisLine={true} tickFormatter={(value) => value.toLocaleString()} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="male" stackId="a" fill="var(--color-male)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="female" stackId="a" fill="var(--color-female)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
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
