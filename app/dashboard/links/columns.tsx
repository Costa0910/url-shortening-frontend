"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { ShortUrlTable } from "@/types/ShortUrlTable";
import { format } from "date-fns";
import { DataTableRowActions } from "./actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<ShortUrlTable>[] = [
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
    accessorKey: "status",
    header: ({ column }) => SortHeader(column, "Status"),
    cell: ({ row }) => (
      <span className="font-medium px-4">{row.getValue("status")}</span>
    ),
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "shortCode",
    header: "Short Code",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => SortHeader(column, "Created At"),
    cell: ({ row }) => FormatDate(row.getValue("createdAt")),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => SortHeader(column, "Last Updated"),
    cell: ({ row }) => FormatDate(row.getValue("updatedAt")),
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => SortHeader(column, "Expires On"),
    cell: ({ row }) => FormatDate(row.getValue("expiresAt")),
  },
  {
    id: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

function FormatDate(value: string) {
  try {
    const formatted = format(value, "PPP");
    return <div className="font-medium px-4">{formatted}</div>;
  } catch {
    //user may not have set an expiration date
    return <div className="font-medium px-4">Never</div>;
  }
}

function SortHeader(column: Column<ShortUrlTable>, headerName: string) {
  return (
    <Button
      className="px-4"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {headerName}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
