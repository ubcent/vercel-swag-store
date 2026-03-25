import { Skeleton } from "@/shared/ui"

export function StockSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-24" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-9" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
