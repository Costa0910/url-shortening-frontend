import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card";

export default function ChartSkeleton() {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-2 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[50px] w-full" />
        </CardContent>
      </Card>
    );
  }