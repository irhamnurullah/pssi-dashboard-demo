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
import refree from "../../assets/refree1.jpeg";
import redcard from "../../assets/redcard.png";
import yellowcard from "../../assets/yellowcard.png";

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

  const refereesData = [
    {
      id: 1,
      name: "Thoriq Munir Alkatiri",
      gender: "Male",
      birthdate: "1975-05-10",
      province: "Jakarta",
      city: "Jakarta",
      license: "A",
      status: "Active",
      division: "Professional",
    },
    {
      id: 2,
      name: "Adi Riyanto",
      gender: "Male",
      birthdate: "1980-08-15",
      province: "East Java",
      city: "Surabaya",
      license: "A",
      status: "Active",
      division: "Professional",
    },
    {
      id: 3,
      name: "Muhaimin Hasbullah",
      gender: "Male",
      birthdate: "1978-03-20",
      province: "West Java",
      city: "Bandung",
      license: "B",
      status: "Active",
      division: "Professional",
    },
    {
      id: 4,
      name: "Suharno",
      gender: "Male",
      birthdate: "1973-11-25",
      province: "Central Java",
      city: "Semarang",
      license: "A",
      status: "Active",
      division: "Professional",
    },
    {
      id: 5,
      name: "Joko Susilo",
      gender: "Male",
      birthdate: "1985-01-05",
      province: "Bali",
      city: "Denpasar",
      license: "B",
      status: "Active",
      division: "Professional",
    },
    {
      id: 6,
      name: "Rizal Aswad",
      gender: "Male",
      birthdate: "1982-06-30",
      province: "South Sulawesi",
      city: "Makassar",
      license: "A",
      status: "Active",
      division: "Professional",
    },
    {
      id: 7,
      name: "Imam Taufik",
      gender: "Male",
      birthdate: "1979-04-17",
      province: "North Sumatra",
      city: "Medan",
      license: "A",
      status: "Active",
      division: "Professional",
    },
    {
      id: 8,
      name: "Hadi Priyanto",
      gender: "Male",
      birthdate: "1983-09-12",
      province: "Jakarta",
      city: "Jakarta",
      license: "B",
      status: "Active",
      division: "Professional",
    },
    {
      id: 9,
      name: "Bambang Suryadi",
      gender: "Male",
      birthdate: "1976-07-07",
      province: "East Java",
      city: "Malang",
      license: "A",
      status: "Active",
      division: "Professional",
    },
    {
      id: 10,
      name: "Herman Simanjuntak",
      gender: "Male",
      birthdate: "1981-10-22",
      province: "Riau",
      city: "Pekanbaru",
      license: "B",
      status: "Active",
      division: "Professional",
    },
  ];

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Birthdate</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>City</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refereesData.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.id}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.gender}</TableCell>
                <TableCell>{player.birthdate}</TableCell>
                <TableCell>{player.province}</TableCell>
                <TableCell>{player.city}</TableCell>
                <TableCell>{player.license}</TableCell>
                <TableCell>{player.status}</TableCell>
                <TableCell>{player.division}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger className="text-blue-400">
                      View Detail
                    </DialogTrigger>
                    <DialogContent className="max-w-full xl:max-w-4xl p-4 xl:p-5 overflow-y-auto h-[90vh]">
                      <DialogHeader>
                        <DialogTitle>
                          <div className="flex flex-row mb-2 mt-5">
                            <img
                              className="rounded-full w-20"
                              src={refree}
                              alt="avatar"
                            />
                            <div className="text-gray-700 text-[18px] font-bold ml-4 mt-3">
                              Thoriq Munir Alkatiri<br></br>
                              <span className="text-gray-700 text-sm font-normal">
                                FIFA - Referee
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
                                <div className="text-black">
                                  Birth Date
                                </div>
                                <div className="text-neutral-400 font-normal">
                                  1997-02-02
                                </div>
                              </div>
                              <div className="flex justify-between py-2">
                                <div className="text-black">Gender</div>
                                <div className="text-neutral-400 font-normal">
                                  Male
                                </div>
                              </div>
                              <div className="flex justify-between py-2">
                                <div className="text-black">Province</div>
                                <div className="text-neutral-400 font-normal">
                                  East Java
                                </div>
                              </div>
                              <div className="flex justify-between py-2">
                                <div className="text-black">City</div>
                                <div className="text-neutral-400 font-normal">
                                  Bandung
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
                                <div className="text-black">
                                  Birth Date
                                </div>
                                <div className="text-neutral-400 font-normal">
                                  1997-02-02
                                </div>
                              </div>
                              <div className="flex justify-between py-2">
                                <div className="text-black">Gender</div>
                                <div className="text-neutral-400 font-normal">
                                  Male
                                </div>
                              </div>
                              <div className="flex justify-between py-2">
                                <div className="text-black">Province</div>
                                <div className="text-neutral-400 font-normal">
                                  East Java
                                </div>
                              </div>
                              <div className="flex justify-between py-2">
                                <div className="text-black">City</div>
                                <div className="text-neutral-400 font-normal">
                                  Bandung
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
                                    <TableHead className="text-[12px]">
                                      Date
                                    </TableHead>
                                    <TableHead className="text-[12px]">
                                      Competition
                                    </TableHead>
                                    <TableHead className="text-[12px]">
                                      Match
                                    </TableHead>
                                    <TableHead className="text-[12px]">
                                      Venue
                                    </TableHead>
                                    <TableHead className="text-[12px]">
                                      Card
                                    </TableHead>
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
                                      <div className="flex items-center flex-row mb-5">
                                        <img
                                          className="w-3 h-3"
                                          src={redcard}
                                          alt="avatar"
                                        />
                                        <div className="text-gray-700 text-[12px] font-normal ml-1">
                                          0
                                        </div>
                                        <img
                                          className="w-3 h-3 ml-2"
                                          src={yellowcard}
                                          alt="avatar"
                                        />
                                        <div className="text-gray-700 text-[12px] font-normal ml-1">
                                          0
                                        </div>
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
                </TableCell>
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
                  <img className=" mx-auto" src={refree} alt="avatar" />
                  <div className="p-2 rounded-lg bg-white backdrop-filter bg-opacity-10 backdrop-blur-md">
                    <div className="space-y-1.5 rounded-lg w-full bg-white">
                      <p className="text-center w-full text-sm font-semibold">
                        🇮🇩 Thoriq Munir Alkatiri
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
