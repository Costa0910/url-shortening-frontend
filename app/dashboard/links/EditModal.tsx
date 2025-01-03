"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { BeatLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShortUrlTable } from "@/types/ShortUrlTable";
import { Dispatch, useContext, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { updateExpirationDate } from "@/types/updateExpirationDate";
import { useToast } from "@/hooks/use-toast";
import { BaseUrl } from "@/types/BaseUrl";
import { TableContext } from "./TableContext";

export function EditModal({
  open,
  selectedUrl,
  setOpenEditModal,
}: {
  open: boolean;
  selectedUrl: ShortUrlTable;
  setOpenEditModal: Dispatch<{ open: boolean; selectedUrl: ShortUrlTable }>;
}) {
  const { data, setData } = useContext(TableContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateSelectedUrl = (newData: BaseUrl) => {
    if (!data) return;

    const updatedData = data.map((item) => {
      if (item.id === newData.id) {
        return {
          ...item,
          expiresAt: newData.expiresAt,
          shortCode: newData.shortCode,
        };
      }
      return item;
    });

    setOpenEditModal({
      selectedUrl: {
        ...selectedUrl,
        expiresAt: newData.expiresAt,
        shortCode: newData.shortCode,
      },
      open: false,
    });
    if (setData) {
      setData(updatedData);
    }
  };

  const handleChange = () => {
    setOpenEditModal({
      selectedUrl: selectedUrl,
      open: false,
    });
  };

  const form = useForm<updateExpirationDate>({
    defaultValues: {
      expiresAt: selectedUrl.expiresAt
        ? new Date(selectedUrl.expiresAt)
        : undefined, // not to show 1970-01-01 when there is no expiration date
      field: "both",
      Url: selectedUrl.url,
    },
  });

  const onSubmit = async (data: updateExpirationDate) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/protected/links/${selectedUrl.shortCode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const message = await res.json();
        setError(message);
        return;
      }

      const updatedUrl = (await res.json()) as BaseUrl;
      updateSelectedUrl(updatedUrl);
      toast({
        title: "Success",
        description: "Url updated successfully",
      });
    } catch {
      setError("Something went wrong, try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit URL</SheetTitle>
          <SheetDescription>
            Make changes to your url here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {error && (
          <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
        )}
        <div className="grid gap-3 py-3">
          <div className="">
            <Label htmlFor="url" className="text-right">
              Original Url
            </Label>
            <Input
              id="url"
              value={selectedUrl.url}
              disabled
              className="col-span-3"
            />
          </div>
          <div className=" ">
            <Label htmlFor="shortcode" className="text-right">
              Short Code
            </Label>
            <Input
              id="shortcode"
              value={selectedUrl.shortCode}
              disabled
              className="col-span-3"
            />
          </div>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full flex-cols-4 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick expiration date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="end">
                        <Calendar
                          mode="single"
                          style={{ width: "100%" }}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date <= new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The short URL will expire on the selected date
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem className="flex flex-col align-center">
                    <Label htmlFor="field">
                      Select what you want to update
                    </Label>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      onChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expiresAt" id="expiresAt" />
                        <Label htmlFor="expiresAt">Expiration Date</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="shortCode" id="shortCode" />
                        <Label htmlFor="shortCode">Short Code</Label>
                      </div>
                      <FormDescription>
                        Have in mind that changing the short code will make the
                        old short url invalid and the new one will be used.
                      </FormDescription>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <BeatLoader size={8} color="#ff7c03" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
