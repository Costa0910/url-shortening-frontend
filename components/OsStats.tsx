import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface OsStatsProps {
  osStats: {
    key: string;
    count: number;
  }[];
}

export default function OsStats({ osStats }: OsStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Operating Systems</CardTitle>
        <CardDescription>
          Distribution of operating systems used by visitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={osStats}>
              <XAxis 
                dataKey="key"
                tickFormatter={(value) => value.split(' ')[0]} // Show only first word
              />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} visits`, "Visits"]}
                labelFormatter={(label) => `OS: ${label}`}
              />
              <Bar 
                dataKey="count"
                fill="#96CEB4"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}