import { Suspense } from "react"
import { cacheLife } from "next/cache"
import { getCategories } from "@/shared/api"
import { SearchResultsSection, SearchResultsSkeleton } from "@/widgets/product-grid"
import { SearchControls } from "./search-controls"

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>
}

export function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageInner searchParams={searchParams} />
    </Suspense>
  )
}

async function SearchPageInner({ searchParams }: SearchPageProps) {
  const { q, category } = await searchParams
  return <SearchPageContent q={q} category={category} />
}

// Cached per unique (q, category) combination
async function SearchPageContent({ q, category }: { q?: string; category?: string }) {
  "use cache"
  cacheLife("minutes")

  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Search</h1>
      <div className="mb-8">
        <SearchControls categories={categories} initialQ={q} initialCategory={category} />
      </div>
      <Suspense key={`${q}-${category}`} fallback={<SearchResultsSkeleton />}>
        <SearchResultsSection q={q} category={category} />
      </Suspense>
    </div>
  )
}

function SearchPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-muted mb-6 h-9 w-32 animate-pulse rounded-md" />
      <div className="mb-8 flex gap-2">
        <div className="bg-muted h-9 flex-1 animate-pulse rounded-md" />
        <div className="bg-muted h-9 w-40 animate-pulse rounded-md" />
      </div>
      <SearchResultsSkeleton />
    </div>
  )
}
