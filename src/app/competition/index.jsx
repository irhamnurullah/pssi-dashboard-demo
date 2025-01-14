import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MultipleBarChart } from "../../components/charts/barchart/multiple";

export default function Competition() {
  const dataHeader = [
    {
      id: 1,
      title: "Soeratin U13",
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 2,
      title: "Soeratin U15",
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 3,
      title: "Soeratin U17",
      totalClubs: 166,
      totalPlayers: 2502,
    },
    {
      id: 4,
      title: "Liga4",
      totalClubs: 166,
      totalPlayers: 2502,
    },
  ];

  const [activeCard, setActiveCard] = useState(1);

  return (
    <div className="container-pssi">
      <div className="text-[#4C1D95] text-lg font-semibold">Competition</div>
      <div className="text-[#989899] text-sm">
        An Indonesian competition is an organized event where participants
        compete in various fields, such as sports, arts, or academics, at
        regional, national, or international levels.
      </div>

      <div className="flex flex-row mt-5 bg-white p-5">
        {dataHeader.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveCard(item.id)}
            style={{ cursor: "pointer" }}
            className={`${
              activeCard === item.id
                ? "bg-gradient-to-r from-[#92D4F8] from-10% via-[#92D4F8] via-30% via-[#006FFF] via-50% via-[#16A34A] via-70% to-[#81F6E8] to-90%"
                : "bg-white"
            } rounded-xl shadow-lg p-3 w-full ml-3`}
          >
            <div className="flex justify-between">
              <span className="text-gray-700 text-[18px] text-lg font-bold">
                {item.title}
              </span>
            </div>
            {activeCard === item.id && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-700 text-[12px]">Total Club</span>
                  <span className="text-[#006FFF] font-medium text-[12px]">
                    {item.totalClubs}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 text-[12px]">
                    Total Players
                  </span>
                  <span className="text-[#16A34A] font-medium text-[12px]">
                    {item.totalPlayers}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-row mt-5 bg-white p-5">
        <div className="w-1/2">
          <h3 className="font-semibold">Soeratin U13</h3>
          <MultipleBarChart />
        </div>
        <div className="w-1/2 ml-5">
          <div className="text-black font-bold">Player List SoeratinU13</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">PROVINCE</TableHead>
                <TableHead>TOTAL CLUB</TableHead>
                <TableHead>TOTAL PLAYERS</TableHead>
                <TableHead>TOTAL OFFICIAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Jakarta</TableCell>
                <TableCell>100</TableCell>
                <TableCell>1000</TableCell>
                <TableCell>200</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bandung</TableCell>
                <TableCell>150</TableCell>
                <TableCell>900</TableCell>
                <TableCell>250</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Surabaya</TableCell>
                <TableCell>200</TableCell>
                <TableCell>1100</TableCell>
                <TableCell>300</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Medan</TableCell>
                <TableCell>120</TableCell>
                <TableCell>800</TableCell>
                <TableCell>220</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Yogyakarta</TableCell>
                <TableCell>180</TableCell>
                <TableCell>950</TableCell>
                <TableCell>280</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Makassar</TableCell>
                <TableCell>140</TableCell>
                <TableCell>870</TableCell>
                <TableCell>240</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Denpasar</TableCell>
                <TableCell>170</TableCell>
                <TableCell>920</TableCell>
                <TableCell>270</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Semarang</TableCell>
                <TableCell>130</TableCell>
                <TableCell>890</TableCell>
                <TableCell>230</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Palembang</TableCell>
                <TableCell>160</TableCell>
                <TableCell>940</TableCell>
                <TableCell>260</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pekanbaru</TableCell>
                <TableCell>190</TableCell>
                <TableCell>1020</TableCell>
                <TableCell>290</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
