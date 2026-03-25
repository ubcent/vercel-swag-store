import { Badge } from "@/shared/ui"
import { formatCurrency } from "@/shared/lib"
import type { Product } from "../model"

export function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="space-y-3">
      <Badge variant="secondary" className="capitalize">
        {product.category}
      </Badge>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{product.name}</h1>
      <p className="text-2xl font-semibold">{formatCurrency(product.price, product.currency)}</p>
      <p className="text-muted-foreground leading-relaxed">{product.description}</p>
    </div>
  )
}
