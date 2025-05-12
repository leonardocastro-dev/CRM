import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingOverview() {
  return (
    <>
      <div className="h-[150px] grid gap-4 md:grid-cols-4">
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </div>
      <Skeleton className="h-[276px] w-full" />
      <div className="h-[240px] grid gap-4 md:grid-cols-2">
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </div>
    </>
  );
}