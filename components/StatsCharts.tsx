"use client";

import { useEffect, useState } from "react";
import type { shortUrlStats } from "@/types/Stats";
import ChartSkeleton from "./ChartSkeleton";
import DeviceStats from "./DeviceStats";
import TotalVisitors from "./TotalVisitors";
import BrowserStats from "./BrowserStats";
import QuickStatCard from "./QuickStatCard";
import QuickStatCardEmpty from "./QuickStatCardEmpty";
import LocationStats from "./LocationStats";
import OsStats from "./OsStats";
import ReferrerStats from "./ReferrerStats";
import StatsChartsSkeleton from "./StatsChartsSkeleton";

export default function StatsCharts({
  selectedShortCode,
}: {
  selectedShortCode: string;
}) {
  const [stats, setStats] = useState<shortUrlStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/protected/stats/${selectedShortCode}`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [selectedShortCode]);

  if (loading) return <StatsChartsSkeleton />;
  if (!stats) return <div className="text-red-500">Failed to load stats</div>;

  if (!stats) {
    return <div className="text-red-500">Failed to load stats</div>;
  }

  return (
    <div className="space-y-4">
      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1">
        <QuickStatCard
          title="Total Visits"
          value={stats.totalAccessCount.toLocaleString()}
        />
        <QuickStatCard
          title="Unique Visitors"
          value={stats.uniqueIPCount.toLocaleString()}
        />
        {stats.lastAccessDevice ? (
          <QuickStatCard
            title="Last Device"
            value={stats.lastAccessDevice.deviceType}
          />
        ) : (
          <QuickStatCardEmpty title="Last Device" />
        )}
        {stats.lastAccessDevice ? (
          <QuickStatCard
            title="Last Browser"
            value={stats.lastAccessDevice.browser}
          />
        ) : (
          <QuickStatCardEmpty title="Last Browser"/>
        )}
      </div>

      {/* Charts Grid */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        <TotalVisitors totalVisitors={stats.totalAccessCount} />
        <BrowserStats browserStats={stats.browserStats} />
        <DeviceStats deviceStatsData={stats.deviceStats} />
        <LocationStats locations={stats.locationStats} />
        <OsStats osStats={stats.osStats} />
        <ReferrerStats referrerStats={stats.referrerStats} />
      </div>
    </div>
  );
}
