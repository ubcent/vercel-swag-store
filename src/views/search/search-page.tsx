import { Suspense } from "react"
import { getCategories } from "@/shared/api"
import { SearchResultsSection, SearchResultsSkeleton } from "@/widgets/product-grid"
import { SearchControls } from "./search-controls"

interface SearchPageProps {
  q?: string
  category?: string
}

export async function SearchPage({ q, category }: SearchPageProps) {
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
