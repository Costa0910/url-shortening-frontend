"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Calendar, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import { BaseUrl } from "@/types/BaseUrl";

export default function RecentUrls() {
  const [urls, setUrls] = useState<BaseUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentUrls = async () => {
      try {
        debugger;
        const res = await fetch("/api/protected/dashboard");
        if (res.ok) {
          const data = await res.json() as Array<BaseUrl>;
          setUrls(data);
          return;
        }
        throw new Error;
      } catch {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load recent URLs",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentUrls();
  }, [toast]);

  const handleCopy = async (shortUrl: string) => {
    if (navigator.clipboard) {
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

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 bg-muted rounded w-3/4" />
            <Skeleton className="h-3 bg-muted rounded w-1/2 mt-2" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {urls.map((url) => (
        <Card key={url.id} className="p-4">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1">
              <p className="font-medium break-all">{url.shortCode}</p>
              <p className="text-sm truncate text-muted-foreground break-all">
                {url.url}
              </p>
              {url.expiresAt && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Expires {format(new Date(url.expiresAt), "PPP")}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleCopy(`${window.location.origin}/${url.shortCode}`)
                }
                className="text-muted-foreground hover:text-foreground"
              >
                <Copy className="h-4 w-4" />
              </button>
              <a
                href={`/${url.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Card>
      ))}
      {urls.length === 0 && (
        <Card className="p-4">
          <p className="text-center text-muted-foreground">No recent URLs</p>
        </Card>
      )}
    </div>
  );
}