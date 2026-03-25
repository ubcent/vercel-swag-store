import { cacheLife } from "next/cache"
import { getProducts } from "@/shared/api"
import { ProductCard } from "@/entities/product"

interface SearchResultsSectionProps {
  q?: string
  category?: string
}

async function fetchSearchResults(q: string | undefined, category: string | undefined) {
  "use cache"
  cacheLife("minutes")
  const params: Parameters<typeof getProducts>[0] = { limit: 5 }
  if (q) params.search = q
  if (category) params.category = category
  return getProducts(params)
}

async function fetchDefaultProducts() {
  "use cache"
  cacheLife("hours")
  return getProducts({ limit: 20 })
}

export async function SearchResultsSection({ q, category }: SearchResultsSectionProps) {
  const hasFilter = Boolean(q || category)

  const { products } = hasFilter
    ? await fetchSearchResults(q, category)
    : await fetchDefaultProducts()

  if (hasFilter && products.length === 0) {
    return (
      <p className="text-muted-foreground py-12 text-center">
        No products found{q ? ` for "${q}"` : ""}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
