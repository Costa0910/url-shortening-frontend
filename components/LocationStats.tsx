"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { shortUrlStats } from "@/types/Stats";

export default function LocationStats({
  locations,
}: {
  locations: shortUrlStats["locationStats"];
}) {
  //only unique locations and top 5

  type LocationStats = {
    count: number;
    country: string;
    flags?: {
      emoji: string;
    };
  };

  let uniqueLocations: Record<string, LocationStats> = {};

  locations.forEach((loc) => {
    if (!uniqueLocations[loc.country]) {
      uniqueLocations[loc.country] = {
        count: loc.count,
        country: loc.country,
        flags: loc.flags,
      };
    } else {
      uniqueLocations[loc.country].count += loc.count;
    }
  });

  const sortedLocations = Object.values(uniqueLocations).sort(
    (a, b) => b.count - a.count
  );

  const topLocations = sortedLocations.slice(0, 5);

  uniqueLocations = {}; //clearing the object for next use

  return (
    <Card>
      <CardHeader>
      <CardTitle>Visitor Locations</CardTitle>
      <CardDescription>Top 5 visitor countries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topLocations.map((loc) => (
            <div key={loc.country} className="flex items-center">
              {loc.flags?.emoji}
              <span className="ml-2">{loc.country}</span>
              <span className="ml-auto">{loc.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
