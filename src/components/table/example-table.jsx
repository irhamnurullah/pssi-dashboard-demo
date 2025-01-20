import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import coachImage from "../../assets/marselino.jpeg";

const data = [
  {
    id: "m5gr84i9",
    name: "Marselino Ferdinan",
    position: "Midfielder",
    team: "Senior Men",
    currentClub: "Persija Jakarta",
    caps: 25,
    goals: 35,
  },
  {
    id: "a3kf82j7",
    name: "Egy Maulana Vikri",
    position: "Forward",
    team: "Senior Men",
    currentClub: "Dewa United",
    caps: 30,
    goals: 20,
  },
  {
    id: "c7mf95k3",
    name: "Witan Sulaeman",
    position: "Winger",
    team: "Senior Men",
    currentClub: "PSM Makassar",
    caps: 28,
    goals: 18,
  },
  {
    id: "d8lg73n1",
    name: "Pratama Arhan",
    position: "Defender",
    team: "Senior Men",
    currentClub: "Tokyo Verdy",
    caps: 22,
    goals: 5,
  },
  {
    id: "e9hs62p4",
    name: "Asnawi Mangkualam",
    position: "Defender",
    team: "Senior Men",
    currentClub: "Jeonnam Dragons",
    caps: 27,
    goals: 8,
  },
  {
    id: "f0kt83q5",
    name: "Saddil Ramdani",
    position: "Winger",
    team: "Senior Men",
    currentClub: "Sabah FA",
    caps: 26,
    goals: 15,
  },
  {
    id: "g1nv94r6",
    name: "Evan Dimas",
    position: "Midfielder",
    team: "Senior Men",
    currentClub: "Bhayangkara FC",
    caps: 40,
    goals: 25,
  },
  {
    id: "h2mp65s7",
    name: "Rachmat Irianto",
    position: "Defender",
    team: "Senior Men",
    currentClub: "Persib Bandung",
    caps: 24,
    goals: 10,
  },
  {
    id: "i3qo76t8",
    name: "Hansamu Yama",
    position: "Defender",
    team: "Senior Men",
    currentClub: "Persebaya Surabaya",
    caps: 35,
    goals: 4,
  },
  {
    id: "j4pr87u9",
    name: "Ricky Kambuaya",
    position: "Midfielder",
    team: "Senior Men",
    currentClub: "Bali United",
    caps: 32,
    goals: 14,
  },
];

export const columns = [
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
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "position",
    header: "position",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("position")}</div>
    ),
  },
  {
    accessorKey: "team",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          team
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("team")}</div>,
  },
  {
    accessorKey: "currentClub",
    header: "Current Club",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("currentClub")}</div>
    ),
  },
  {
    accessorKey: "caps",
    header: "Caps",
    cell: ({ row }) => <div className="capitalize">{row.getValue("caps")}</div>,
  },
  {
    accessorKey: "goals",
    header: "Goals",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("goals")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Dialog>
          <DialogTrigger className="text-blue-400">View Detail</DialogTrigger>
          <DialogContent className="max-w-full xl:max-w-4xl p-4 xl:p-5 overflow-y-auto h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                <div className="flex flex-row mb-2 mt-5">
                  <img
                    className="rounded-full w-24"
                    src={coachImage}
                    alt="avatar"
                  />
                  <div className="text-gray-700 text-[18px] font-bold ml-4 mt-3">
                    Marselino Ferdinan<br></br>
                    <span className="text-gray-700 text-sm font-normal">
                      Midfielder - Senior Men
                    </span>
                  </div>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="flex flex-row mt-5 bg-white p-1">
                  <div
                    style={{ cursor: "pointer" }}
                    className={`bg-[#518EDC] bg-opacity-5 border-l-4 border-[#518EDC] p-2 w-full`}
                  >
                    <div className="flex justify-between">
                      <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                        {"1.24"}
                      </div>
                    </div>
                    <div className="text-neutral-400 text-[10px] text-lg font-normal">
                      {"Goals per Cap"}
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className={`bg-[#16A34A] bg-opacity-5 border-l-4 border-[#16A34A] p-2 w-full`}
                  >
                    <div className="flex justify-between">
                      <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                        {"4"}
                      </div>
                    </div>
                    <div className="text-neutral-400 text-[10px] text-lg font-normal">
                      {"Years in National Team"}
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className={`bg-[#FACC15] bg-opacity-5 border-l-4 border-[#FACC15] p-2 w-full`}
                  >
                    <div className="flex justify-between">
                      <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                        {"71"}
                      </div>
                    </div>
                    <div className="text-neutral-400 text-[10px] text-lg font-normal">
                      {"International Ranking"}
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className={`bg-[#CC0101] bg-opacity-5 border-l-4 border-[#CC0101] p-2 w-full`}
                  >
                    <div className="flex justify-between">
                      <div className="text-[#2D3748] text-[12px] text-lg font-bold">
                        {"5.8"}
                      </div>
                    </div>
                    <div className="text-neutral-400 text-[10px] text-lg font-normal">
                      {"Form Rating"}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-5">
                  <div className="bg-white rounded-lg shadow p-6 w-1/2">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="text-[#989899] text-[12px] font-medium">
                        Personal Information
                      </div>
                    </div>
                    <div className="flex justify-between py-2">
                      <div className="text-black">Federation</div>
                      <div className="text-neutral-400 font-normal">
                        Indonesia
                      </div>
                    </div>
                    <div className="flex justify-between py-2">
                      <div className="text-black">Current Club</div>
                      <div className="text-neutral-400 font-normal">
                        Oxford United
                      </div>
                    </div>
                    <div className="flex justify-between py-2">
                      <div className="text-black">Contract Start</div>
                      <div className="text-neutral-400 font-normal">
                        2025-01-01
                      </div>
                    </div>
                    <div className="flex justify-between py-2">
                      <div className="text-black">Contract End</div>
                      <div className="text-neutral-400 font-normal">
                        2027-01-01
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
                      <div className="text-black">Caps</div>
                      <div className="text-neutral-400 font-normal">
                        30
                      </div>
                    </div>
                    <div className="flex justify-between py-2">
                      <div className="text-black">Goals</div>
                      <div className="text-neutral-400 font-normal">20</div>
                    </div>
                    <div className="flex justify-between py-2">
                      <div className="text-black">Team</div>
                      <div className="text-neutral-400 font-normal">
                        Senior Men
                      </div>
                    </div>
                    <div className="flex justify-between py-2">
                      <div className="text-black">Position</div>
                      <div className="text-neutral-400 font-normal">
                        Midfielder
                      </div>
                    </div>
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

export function DataTableExample() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter ..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
