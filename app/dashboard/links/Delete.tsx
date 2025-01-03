"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShortUrlTable } from "@/types/ShortUrlTable";
import { Dispatch, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { TableContext } from "./TableContext";

export function DeleteUrl({
  openModal,
  urlToDelete,
  setDeleteUrl,
}: {
  openModal: boolean;
  urlToDelete: ShortUrlTable;
  setDeleteUrl: Dispatch<boolean>;
}) {
  const { setData, data } = useContext(TableContext);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/protected/links/${urlToDelete.shortCode}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error();
      }
      handleModalOpenChanges();
      const newData = data.filter((u) => u.id != urlToDelete.id);
      toast({
        title: "Success",
        description: "Url deleted successfully",
      });
      if (setData) {
        setData(newData);
      }
    } catch {
      handleModalOpenChanges();
      toast({
        variant: "destructive",
        title: "Error",
        description: "Couldn't delete url",
      });
    }
  };

  const handleModalOpenChanges = () => {
    setDeleteUrl(false);
  };

  return (
    <AlertDialog open={openModal} onOpenChange={handleModalOpenChanges}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            short url ({urlToDelete.shortCode}) and remove it's stats from our
            server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
