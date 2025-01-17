import { useState } from "react";
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


export default function NatioanalTeams() {
  const [activeCard, setActiveCard] = useState(1);

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
    {
      id: 1,
      name: "Marselino Ferdinan",
      position: "Midfielder",
      club: "Persija Jakarta",
      federation: "PSSI",
      caps: 25,
      goals: 35,
    },
    {
      id: 2,
      name: "Egy Maulana Vikri",
      position: "Forward",
      club: "Dewa United",
      federation: "PSSI",
      caps: 30,
      goals: 20,
    },
    {
      id: 3,
      name: "Witan Sulaeman",
      position: "Winger",
      club: "PSM Makassar",
      federation: "PSSI",
      caps: 28,
      goals: 18,
    },
    {
      id: 4,
      name: "Pratama Arhan",
      position: "Defender",
      club: "Tokyo Verdy",
      federation: "PSSI",
      caps: 22,
      goals: 5,
    },
    {
      id: 5,
      name: "Asnawi Mangkualam",
      position: "Defender",
      club: "Jeonnam Dragons",
      federation: "PSSI",
      caps: 27,
      goals: 8,
    },
    {
      id: 6,
      name: "Saddil Ramdani",
      position: "Winger",
      club: "Sabah FA",
      federation: "PSSI",
      caps: 26,
      goals: 15,
    },
    {
      id: 7,
      name: "Evan Dimas",
      position: "Midfielder",
      club: "Bhayangkara FC",
      federation: "PSSI",
      caps: 40,
      goals: 25,
    },
    {
      id: 8,
      name: "Rachmat Irianto",
      position: "Defender",
      club: "Persib Bandung",
      federation: "PSSI",
      caps: 24,
      goals: 10,
    },
    {
      id: 9,
      name: "Hansamu Yama",
      position: "Defender",
      club: "Persebaya Surabaya",
      federation: "PSSI",
      caps: 35,
      goals: 4,
    },
    {
      id: 10,
      name: "Ricky Kambuaya",
      position: "Midfielder",
      club: "Bali United",
      federation: "PSSI",
      caps: 32,
      goals: 14,
    },
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

  return (
    <div>
      <div className="bg-[#212B5A] absolute h-[60vh] w-full z-10"></div>
      <NavBar  bgColor="#FFFFFF" selectedTextColor="#212B5A" secondaryTextColor="#C6C6C6" />
      <div className="z-20 relative container-pssi">
        <h2 className="text-[#646B8B] text-3xl font-bold">National Team</h2>
        <p className="text-sm text-neutral-400 mt-2">
          An Indonesian competition is an organized event where participants
          compete in various fields, such as sports, arts, or academics, at
          regional, national, or international levels.
        </p>

        <div className="flex flex-wrap mt-5 bg-white p-5">
          {dataHeader.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveCard(item.id)}
              style={{ cursor: "pointer" }}
              className={`${
                activeCard === item.id ? "bg-[#28166F]" : "bg-[#F3F4F6]"
              } rounded-md shadow-lg p-3 w-[calc(20%_-_1rem)] ml-3 mb-3`}
            >
              <div className="flex justify-center">
                <span
                  className={`${
                    activeCard === item.id ? "text-white" : "text-black"
                  } text-[16px] text-lg font-normal`}
                >
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mt-5 bg-white p-5">
          <div className="w-1/2">
            <PieChartLabel title={"Position Distribution"} />
          </div>
          <div className="w-1/2">
            <HorizontalChart title={"Player Caps"} />
          </div>
        </div>

        <div className="flex flex-wrap mt-5 bg-white p-5">
          <div className="text-black font-bold">Senior Men Players</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Clubs</TableHead>
                <TableHead>Federation</TableHead>
                <TableHead>Caps</TableHead>
                <TableHead>Goal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playersData.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.id}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.club}</TableCell>
                  <TableCell>{player.federation}</TableCell>
                  <TableCell>{player.caps}</TableCell>
                  <TableCell>{player.goals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        <div className="flex flex-wrap mt-5 bg-white p-5">
          <div className="text-black font-bold">Senior Women Players</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Clubs</TableHead>
                <TableHead>Federation</TableHead>
                <TableHead>Caps</TableHead>
                <TableHead>Goal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playersData.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.id}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.club}</TableCell>
                  <TableCell>{player.federation}</TableCell>
                  <TableCell>{player.caps}</TableCell>
                  <TableCell>{player.goals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      </div>
    </div>
  );
}
