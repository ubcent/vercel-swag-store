import { Skeleton } from "@/shared/ui"

export function PromoBannerSkeleton() {
  return (
    <div className="bg-muted py-3">
      <div className="container mx-auto flex items-center justify-center gap-2 px-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-64" />
      </div>
    </div>
  )
}
