"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ShortUrlSchema } from "@/types/ShortUrlSchema";
import { z } from "zod";
// import { ShortUrlResponse } from "@/types/ShortUrlResponse";
import { BaseUrl } from "@/types/BaseUrl";
import { BeatLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { apiFetch } from "@/utils/apiPost";
import { useToast } from "@/hooks/use-toast";
import { Copy, CalendarIcon } from "lucide-react";

type shortUrlData = z.infer<typeof ShortUrlSchema>;

export default function ShortUrlHome({
  withExpiration,
}: {
  withExpiration: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const form = useForm<shortUrlData>({
    resolver: zodResolver(ShortUrlSchema),
    defaultValues: {
      url: "",
      expiresAt: undefined,
    },
  });

  const onSubmit = async (data: shortUrlData) => {
    setIsLoading(true);
    setError(null);
    setUrl("");
    debugger;

    try {
      const resData = await apiFetch<shortUrlData, BaseUrl>(
        data,
        "/api/shortUrl",
        "POST"
      );
      if (resData) {
        const baseUrl = window.location.origin;
        const shortUrl = `${baseUrl}/${resData.shortCode}`;
        setUrl(shortUrl);
        form.reset();
      } else {
        throw new Error();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          description: "URL copied to clipboard!",
        });
      } catch {
        toast({
          title: "Fail to copy",
          description: "Failed to copy URL. Please try again.",
        });
      }
    } else {
      alert(
        `Copy to clipboard is not supported in this browser, your short url: ${url}`
      );
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
      )}
      {url && (
        <div className="flex justify-between items-center p-2 bg-secondary rounded-md">
          <span className="truncate">{url}</span>
          <Button variant="outline" type="button" onClick={handleCopy}>
            <Copy />
          </Button>
        </div>
      )}
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Paste your long URL here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {withExpiration && (
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
                            "lg:w-[240px] pl-3 text-left font-normal",
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
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
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <BeatLoader size={8} color="#ff7c03" />
            ) : (
              "Shorten URL"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
