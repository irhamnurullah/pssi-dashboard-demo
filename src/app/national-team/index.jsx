import { useEffect, useState } from "react";
import { PieChartLabel } from "../../components/charts/piechart/piechart-label";
import { HorizontalChart } from "../../components/charts/barchart/horizontalchart";
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
import NavBar from "../../components/navbar";
import apiServices from '../../../utils/services'

export default function NatioanalTeams() {
  const [activeCard, setActiveCard] = useState(1);
  const [listCategory, setListCategory] = useState([])
  const [listOfficial, setListOfficial] = useState([])
  const [listPlayer, setListPlayer] = useState([])

  const getListCategory = async() => {
    try {
    const response = await apiServices.get('/api/timnas/GetCategory')
    const result = response.data

    const resultData = [...result.MAN, ...result.WOMEN]
    setListCategory(resultData)
  } catch (error) {
      console.error(error)
    }
  }

  

  const getListRecordPlayer = async(kat_umur, jenis_kelamin) => {
    const row_from = 0
    const length = 10
    try {
      const response = await apiServices.get(`/api/timnas/GetListDataPlayer?row_from=${row_from}&length=${length}&kat_umur=${kat_umur}&jenis_kelamin=${jenis_kelamin}`)
       const result = response.data
       setListPlayer(result.data)
       console.log('result player : ', result)
    } catch (error) {
      setListPlayer([])
      console.error(error)
    }
  }

  const getListRecordOfficial = async(kat_umur, jenis_kelamin) => {
    const row_from = 0
    const length = 10
    try {
      const response = await apiServices.get(`/api/timnas/GetListDataOfficial?row_from=${row_from}&length=${length}&kat_umur=${kat_umur}&jenis_kelamin=${jenis_kelamin}`)
       const result = response.data
       setListOfficial(result.data)
       console.log('result official : ', result)
    } catch (error) {
      setListOfficial([])
      console.error(error)
    }
  }


  const handleClickCard = (dataActive) => {

    setActiveCard(dataActive)
    getListRecordOfficial(dataActive.KAT_UMUR, dataActive.CATEGORY)
    getListRecordPlayer(dataActive.KAT_UMUR, dataActive.CATEGORY)
  }

  useEffect(() => {
    getListCategory()
  },[])

  const dataHeader = [
    {
      id: 1,
      title: "Senior Men",
    },
    {
      id: 2,
      title: "Senior Women",
    },
    {
      id: 3,
      title: "U23 Men",
    },
    {
      id: 4,
      title: "U23 Women",
    },
    {
      id: 5,
      title: "U20 Men",
    },
    {
      id: 6,
      title: "U20 Women",
    },
    {
      id: 7,
      title: "U19 Men",
    },
    {
      id: 8,
      title: "U19 Women",
    },
    {
      id: 9,
      title: "U17 Men",
    },
    {
      id: 10,
      title: "U17 Women",
    },
  ];

  const playersData = [
    // {
    //   id: 1,
    //   name: "Marselino Ferdinan",
    //   position: "Midfielder",
    //   club: "Persija Jakarta",
    //   federation: "PSSI",
    //   caps: 25,
    //   goals: 35,
    // },
    // {
    //   id: 2,
    //   name: "Egy Maulana Vikri",
    //   position: "Forward",
    //   club: "Dewa United",
    //   federation: "PSSI",
    //   caps: 30,
    //   goals: 20,
    // },
    // {
    //   id: 3,
    //   name: "Witan Sulaeman",
    //   position: "Winger",
    //   club: "PSM Makassar",
    //   federation: "PSSI",
    //   caps: 28,
    //   goals: 18,
    // },
    // {
    //   id: 4,
    //   name: "Pratama Arhan",
    //   position: "Defender",
    //   club: "Tokyo Verdy",
    //   federation: "PSSI",
    //   caps: 22,
    //   goals: 5,
    // },
    // {
    //   id: 5,
    //   name: "Asnawi Mangkualam",
    //   position: "Defender",
    //   club: "Jeonnam Dragons",
    //   federation: "PSSI",
    //   caps: 27,
    //   goals: 8,
    // },
    // {
    //   id: 6,
    //   name: "Saddil Ramdani",
    //   position: "Winger",
    //   club: "Sabah FA",
    //   federation: "PSSI",
    //   caps: 26,
    //   goals: 15,
    // },
    // {
    //   id: 7,
    //   name: "Evan Dimas",
    //   position: "Midfielder",
    //   club: "Bhayangkara FC",
    //   federation: "PSSI",
    //   caps: 40,
    //   goals: 25,
    // },
    // {
    //   id: 8,
    //   name: "Rachmat Irianto",
    //   position: "Defender",
    //   club: "Persib Bandung",
    //   federation: "PSSI",
    //   caps: 24,
    //   goals: 10,
    // },
    // {
    //   id: 9,
    //   name: "Hansamu Yama",
    //   position: "Defender",
    //   club: "Persebaya Surabaya",
    //   federation: "PSSI",
    //   caps: 35,
    //   goals: 4,
    // },
    // {
    //   id: 10,
    //   name: "Ricky Kambuaya",
    //   position: "Midfielder",
    //   club: "Bali United",
    //   federation: "PSSI",
    //   caps: 32,
    //   goals: 14,
    // },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(playersData.length / itemsPerPage);

  // Get current items
  const currentItems = playersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /**
   {
    "id_pemain": 1720103296,
    "name": "ELIANO JOHANNES REIJNDERS",
    "position": "Midfielder",
    "club": "PEC ZWOLLE",
    "ma": "Netherlands",
    "contract_end_date": "1900-01-01",
    "mop": 0,
    "playing": 0,
    "subtition": 0,
    "yc": 0,
    "syc": 0,
    "rc": 0,
    "goal": 0
}
   */

  return (
    <div>
      <div className="bg-[#212B5A] absolute h-[60vh] w-full z-10"></div>
      <NavBar  bgColor="#FFFFFF" selectedTextColor="#212B5A" secondaryTextColor="#C6C6C6" />
      <div className="container-pssi mx-4 z-20 relative">
        <h2 className="text-slate-100 text-3xl font-bold">National Team</h2>
        <p className="text-sm text-slate-100 mt-2">
          An Indonesian competition is an organized event where participants
          compete in various fields, such as sports, arts, or academics, at
          regional, national, or international levels.
        </p>

        <div className="grid gap-4 grid-cols-6">
          {/* left side  */}
          <div className="mt-5 ">
            <div className="bg-white border px-2 py-2 rounded-lg">
             {
              listCategory.map((item) => (
                <div
                  key={item.TITLE}
                  onClick={() => handleClickCard(item)}
                  style={{ cursor: "pointer" }}
                  className={`hover:bg-primary-pssi hover:text-white ${
                    activeCard.TITLE === item.TITLE ? "bg-primary-pssi text-white" : ""
                  } rounded-md p-3  mb-1`}
                >
                  
                    <span
                      className={` text-sm font-normal`}
                    >
                      {item.TITLE}
                    </span>
                  
                </div>
              ))
             }
              
            </div>
          </div>

          {/* right side */}
          <div className="col-span-5">
            <div className=" mt-5 bg-white rounded-lg border ">
              <div className="text-black font-bold border-b px-4 py-3">{activeCard?.TITLE} Players</div>
              <div className="flex flex-wrap p-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {/* <TableHead className="w-[100px]">ID</TableHead> */}
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Clubs</TableHead>
                      {/* <TableHead>Federation</TableHead> */}
                      <TableHead>Caps</TableHead>
                      <TableHead>Goal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listPlayer.map((player) => (
                      <TableRow key={player.id_pemain}>
                        {/* <TableCell>{player.id_pemain}</TableCell> */}
                        <TableCell className="uppercase">{player.name}</TableCell>
                        <TableCell>{player.position}</TableCell>
                        <TableCell>{player.club}</TableCell>
                        {/* <TableCell>{player.federation}</TableCell> */}
                        <TableCell>{player.playing}</TableCell>
                        <TableCell>{player.goal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* <div className="flex flex-col">
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
              </div> */}
            </div>

            <div className=" mt-5 rounded-lg border bg-white ">
              <div className="text-black font-bold border-b px-4 py-3">{activeCard.TITLE} Official</div>
              <div className="p-5 flex flex-wrap">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listOfficial?.map((official) => (
                      <TableRow key={official.id}>
                        <TableCell className="uppercase">{official.name}</TableCell>
                        <TableCell>{official.position}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* <div className="flex flex-col">
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
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="flex flex-wrap mt-5 bg-white p-5">
          <div className="w-1/2">
            <PieChartLabel title={"Position Distribution"} />
          </div>
          <div className="w-1/2">
            <HorizontalChart title={"Player Caps"} />
          </div>
        </div> */}

        

          


      </div>
    </div>
  );
}
