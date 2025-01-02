import ChartSkeleton from "./ChartSkeleton";
import PieChartSkeleton from "./PieChartSkeleton";

export default function StatsChartsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1">
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      {/* Charts Grid */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        <PieChartSkeleton />
        <PieChartSkeleton />
        <PieChartSkeleton />
        <PieChartSkeleton />
        <PieChartSkeleton />
        <PieChartSkeleton />
      </div>
    </div>
  );
}
