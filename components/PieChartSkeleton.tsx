import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function PieChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-1/3" /> {/* Title Skeleton */}
        <Skeleton className="h-4 w-2/3" /> {/* Description Skeleton */}
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-[300px]">
          <Skeleton className="h-full w-full max-w-[300px] max-h-[300px]" /> {/* Pie Chart Skeleton */}
        </div>
      </CardContent>
    </Card>
  );
}