import { getStock } from "@/shared/api"
import { StockBadge } from "@/entities/product"
import { AddToCartForm } from "@/features/cart-management"
import type { Product } from "@/entities/product"

export async function ProductActions({ product }: { product: Product }) {
  let stock = { productId: product.id, stock: 0, inStock: false, lowStock: false }

  try {
    stock = await getStock(product.slug)
  } catch {
    // Graceful fallback — treat as out of stock
  }

  return (
    <div className="space-y-4">
      <StockBadge stock={stock} />
      <AddToCartForm productId={product.id} maxQuantity={stock.stock} inStock={stock.inStock} />
    </div>
  )
}
