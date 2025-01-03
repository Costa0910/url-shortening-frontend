"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./dataTable";
import { columns } from "./columns";
import { ShortUrlTable } from "@/types/ShortUrlTable";
import TableContextWrapper from "./TableContext";
import { TableSkeleton } from "./TableSkeleton";

export function UrlTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ShortUrlTable[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/protected/urls")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setData)
      .catch(() => setError("Failed to fetch URLs"))
      .finally(() => setIsLoading(false));
  }, []);

  if (error) return <div className="text-red-500 mx-auto">{error}</div>;
  if (isLoading) return <TableSkeleton />;

  return (
    <TableContextWrapper tableData={data}>
      <DataTable columns={columns} />
    </TableContextWrapper>
  );
}
