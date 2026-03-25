import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getProduct } from "@/shared/api"
import { ApiError } from "@/shared/api"
import { ProductGallery, ProductInfo, StockSkeleton } from "@/entities/product"
import { ProductActions } from "./product-actions"

export async function ProductPage({ slug }: { slug: string }) {
  let product

  try {
    product = await getProduct(slug)
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound()
    throw err
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <ProductGallery product={product} />
        <div className="space-y-6">
          <ProductInfo product={product} />
          <Suspense fallback={<StockSkeleton />}>
            <ProductActions product={product} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
