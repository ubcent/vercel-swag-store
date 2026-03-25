import { Skeleton } from "@/shared/ui"

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="container mx-auto px-4 py-12">
      <Skeleton className="mb-8 h-8 w-48" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </section>
  )
}
