"use client";

import React, { createContext, useState, Dispatch, SetStateAction } from "react";
import { ShortUrlTable } from "@/types/ShortUrlTable";

type TableContextType = {
  data: ShortUrlTable[];
  setData?: Dispatch<SetStateAction<ShortUrlTable[]>>;
};

// This is the context that will be used to pass the data to the table,
// so that the table can be used in a reusable way and update the data when changes happen in real-time
export const TableContext = createContext<TableContextType>({
  data: [],
  setData: () => {},
});

export default function TableContextWrapper({
  children,
  tableData,
}: {
  children: React.ReactNode;
  tableData: ShortUrlTable[];
}) {
  const [data, setData] = useState<ShortUrlTable[]>(tableData);

  const TData: TableContextType = {
    data: data,
    setData: setData,
  };
  return (
    <TableContext.Provider value={TData}>{children}</TableContext.Provider>
  );
}
