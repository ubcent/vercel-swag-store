import type { Product } from "./model"

export function getProductImageUrl(product: Product): string {
  return product.images[0] ?? "/placeholder.png"
}
