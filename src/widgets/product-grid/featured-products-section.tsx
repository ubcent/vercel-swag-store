import { cacheLife } from "next/cache"
import { getProducts } from "@/shared/api"
import { ProductCard } from "@/entities/product"

export async function FeaturedProductsSection() {
  "use cache"
  cacheLife("hours")

  const { products } = await getProducts({ featured: true, limit: 6 })

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">Featured Products</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
