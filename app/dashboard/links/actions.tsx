"use client";

import { Row } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Copy,
  Delete,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { ShortUrlTable } from "@/types/ShortUrlTable";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { EditModal } from "./EditModal";
import { DeleteUrl } from "./Delete";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const url = row.original as ShortUrlTable;
  const [deleteUrl, setDeleteUrl] = useState(false);
  const [openEditModal, setOpenEditModal] = useState({
    open: false,
    selectedUrl: url,
  });

  const handleCopy = async () => {
    if (navigator.clipboard) {
      const shortUrl = `${window.location.origin}/${url.shortCode}`;
      try {
        await navigator.clipboard.writeText(shortUrl);
        toast({
          description: "URL copied to clipboard!",
        });
      } catch {
        toast({
          title: "Failed to copy",
          description: "Failed to copy URL. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              setOpenEditModal((prev) => ({ ...prev, open: true }))
            }
          >
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>
            <Copy />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href={`/${url.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex gap-2 items-center"
            >
              <ExternalLink className="h-4 w-4" />
              Open
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteUrl(true)}>
            <Delete />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openEditModal.open && (
        <EditModal {...openEditModal} setOpenEditModal={setOpenEditModal} />
      )}
      {deleteUrl && (
        <DeleteUrl
          openModal={deleteUrl}
          urlToDelete={url}
          setDeleteUrl={setDeleteUrl}
        />
      )}
    </>
  );
}
