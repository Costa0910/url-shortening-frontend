"use client";
import { ComboboxShortCodes } from "@/components/ComboboxUrls";
import StatsCharts from "@/components/StatsCharts";
import { comboBoxUrlStats } from "@/types/Stats";
import { useEffect, useState } from "react";

export type comboUrlsStats = {
  selectedUrl: comboBoxUrlStats | null;
  urlsStats: comboBoxUrlStats[];
};

export default function Stats() {
  const [shortCode, setShortCode] = useState<comboUrlsStats>({
    selectedUrl: null,
    urlsStats: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/protected/stats")
      .then((res) => res.json())
      .then((data) => {
        setShortCode({
          selectedUrl: data[0] || null,
          urlsStats: data,
        });
      })
      .catch((err) => {
        setError(err.message || "An error occurred, please try again later.");
      });
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-4">
      {shortCode.urlsStats && (
        <ComboboxShortCodes
          comboState={shortCode}
          setComboState={setShortCode}
          />
        )}
      {shortCode.selectedUrl && <StatsCharts selectedShortCode={shortCode.selectedUrl.shortCode}/>}
        {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
