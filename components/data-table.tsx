"use client";

import { z } from "zod";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Column,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  Row,
} from "@tanstack/react-table";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  XCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  EyeOff,
  GripVertical,
  PlusCircle,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useId, useMemo, useState } from "react";
import { Card, CardContent } from "./ui/card";

export const transactionSchema = z.object({
  id: z.string(),
  referenceId: z.string(),
  customerName: z.string(),
  accountType: z.string(),
  dateTime: z.string(),
  activity: z.string(),
  status: z.string(),
});

type Transaction = z.infer<typeof transactionSchema>;

function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="h-8 w-8 cursor-grab text-muted-foreground hover:bg-background active:cursor-grabbing"
    >
      <GripVertical className="h-4 w-4" />
      <span className="sr-only">Drag untuk reorder</span>
    </Button>
  );
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}) {
  if (!column.getCanSort()) {
    return (
      <div className={cn("text-primary-foreground", className)}>{title}</div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-background/20 font-semibold text-primary-foreground hover:bg-background/20 hover:text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" strokeWidth={2} />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" strokeWidth={2} />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" strokeWidth={2} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="cursor-pointer"
          >
            <ArrowUp
              className="mr-2 h-4 w-4 text-muted-foreground"
              strokeWidth={2}
            />
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="cursor-pointer"
          >
            <ArrowDown
              className="mr-2 h-4 w-4 text-muted-foreground"
              strokeWidth={2}
            />
            Descending
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className="cursor-pointer"
          >
            <EyeOff
              className="mr-2 h-4 w-4 text-muted-foreground"
              strokeWidth={2}
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<Transaction>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-3">
        <Checkbox
          className="border-primary-foreground/70 data-[state=checked]:bg-background data-[state=checked]:text-primary"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-3">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "referenceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference Number" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-muted-foreground">
        {row.getValue("referenceId")}
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-muted-foreground">
        {row.getValue("customerName")}
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "accountType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("accountType") as string;
      return (
        <div className="w-25">
          <Badge
            variant={
              type.toLowerCase() === "priority" ? "default" : "secondary"
            }
            className="font-medium truncate"
          >
            {type}
          </Badge>
        </div>
      );
    },
    enableHiding: true,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "activity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activity" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("activity")}</div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-muted-foreground whitespace-nowrap text-sm">
        <Clock className="mr-2 h-4 w-4" />
        {row.getValue("dateTime")}
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isSuccess = status.toLowerCase() === "success";
      const isPending = status.toLowerCase() === "pending";

      return (
        <div className="flex items-center w-30">
          {isSuccess ? (
            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
          ) : isPending ? (
            <Clock className="mr-2 h-4 w-4 text-amber-500" />
          ) : (
            <XCircle className="mr-2 h-4 w-4 text-rose-500" />
          )}
          <span className="font-medium text-sm text-muted-foreground">
            {status}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Buka menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(row.original.referenceId)
            }
          >
            Salin No. Referensi
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<Transaction> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className={cn(
        "relative transition-colors hover:bg-slate-50/50",
        isDragging &&
          "z-10 bg-background/90 shadow-md opacity-90 ring-1 ring-primary/20",
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="py-3">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({ data: initialData }: { data: Transaction[] }) {
  const [data, setData] = useState(() => initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [statusSearch, setStatusSearch] = useState("");

  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="px-4 lg:px-6">
      <Card className="space-y-4">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customer name..."
                  value={
                    (table
                      .getColumn("customerName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("customerName")
                      ?.setFilterValue(event.target.value)
                  }
                  className="pl-8 h-9 rounded-lg bg-background"
                />
              </div>
              {table.getColumn("status") && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 border-dashed bg-background flex items-center"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Status
                      {(table.getColumn("status")?.getFilterValue() as string[])
                        ?.length > 0 && (
                        <>
                          <div className="mx-2 h-4 w-px bg-border" />{" "}
                          <div className="hidden space-x-1 lg:flex">
                            {(
                              table
                                .getColumn("status")
                                ?.getFilterValue() as string[]
                            ).map((val) => (
                              <Badge
                                variant="secondary"
                                key={val}
                                className="rounded-sm px-1 font-normal"
                              >
                                {val}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-50">
                    <div className="flex items-center border-b px-3 py-1">
                      <Search className="mr-2 h-4 w-4 opacity-50" />
                      <input
                        className="flex h-8 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                        placeholder="Filter status..."
                        value={statusSearch}
                        onChange={(e) => setStatusSearch(e.target.value)}
                      />
                    </div>
                    <div className="py-1">
                      {[
                        { label: "Success", icon: CheckCircle2 },
                        { label: "Pending", icon: Clock },
                        { label: "Failure", icon: XCircle },
                      ]
                        .filter((status) =>
                          status.label
                            .toLowerCase()
                            .includes(statusSearch.toLowerCase()),
                        )
                        .map((status) => {
                          const column = table.getColumn("status");
                          const filterValues =
                            (column?.getFilterValue() as string[]) || [];
                          const isChecked = filterValues.includes(status.label);
                          const count = column
                            ?.getFacetedUniqueValues()
                            .get(status.label);

                          return (
                            <DropdownMenuItem
                              key={status.label}
                              onSelect={(e) => {
                                e.preventDefault();
                                const newFilterValues = isChecked
                                  ? filterValues.filter(
                                      (v) => v !== status.label,
                                    )
                                  : [...filterValues, status.label];
                                column?.setFilterValue(
                                  newFilterValues.length
                                    ? newFilterValues
                                    : undefined,
                                );
                              }}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={isChecked}
                                  className="data-[state=checked]:border-primary data-[state=checked]:bg-background"
                                />
                                <status.icon className="h-4 w-4 text-muted-foreground ml-1" />
                                <span>{status.label}</span>
                              </div>
                              {count !== undefined && (
                                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs text-muted-foreground">
                                  {count}
                                </span>
                              )}
                            </DropdownMenuItem>
                          );
                        })}
                      {[
                        { label: "Success", icon: CheckCircle2 },
                        { label: "Pending", icon: Clock },
                        { label: "Failure", icon: XCircle },
                      ].filter((status) =>
                        status.label
                          .toLowerCase()
                          .includes(statusSearch.toLowerCase()),
                      ).length === 0 && (
                        <div className="py-4 text-center text-sm text-muted-foreground">
                          Status tidak ditemukan.
                        </div>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {table.getState().columnFilters.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => table.resetColumnFilters()}
                  className="h-9 px-2 text-muted-foreground hover:text-foreground lg:px-3"
                >
                  Reset
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 bg-background"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-38">
                  <DropdownMenuLabel>Toggle Column</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        typeof column.accessorFn !== "undefined" &&
                        column.getCanHide(),
                    )
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
                          {column.id === "customerName"
                            ? "Customer Name"
                            : column.id === "referenceId"
                              ? "Reference Number"
                              : column.id === "accountType"
                                ? "Account Type"
                                : column.id === "dateTime"
                                  ? "Time"
                                  : column.id === "activity"
                                    ? "Activity"
                                    : column.id === "status"
                                      ? "Status"
                                      : column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table>
                <TableHeader className="bg-primary">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="hover:bg-transparent border-b-0"
                    >
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="h-11 font-semibold text-muted-foreground"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    <SortableContext
                      items={dataIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow key={row.id} row={row} />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-muted-foreground"
                      >
                        Data not found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </div>
          <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} rows selected.
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Rows per page
                </p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(v) => table.setPageSize(Number(v))}
                >
                  <SelectTrigger className="h-8 w-18 bg-background">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-30 items-center justify-center text-sm font-medium text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount() || 1}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex bg-background"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-background"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-background"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex bg-background"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
