"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import type { groupData } from "@/types/Stats";

export default function ReferrerStats({
  referrerStats,
}: {
  referrerStats: groupData[];
}) {
  const chartData = referrerStats
    .map((data) => ({
      name: formatReferrerUrl(data.key),
      value: data.count,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Show top 10 referrers

  const COLORS = ['#4ECDC4', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFBB28', '#FF8042', '#FFBB28'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Referrers</CardTitle>
        <CardDescription>Most common traffic sources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartData.length > 0 ? ( // Check if chartData has data
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <p>No data available for the chart.</p> 
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Helper functions to format URLs
function formatReferrerUrl(url: string): string {
  if (url === "direct") return "Direct / None";
  return url;
}