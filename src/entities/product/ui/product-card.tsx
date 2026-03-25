import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/shared/lib"
import { getProductImageUrl } from "../lib"
import type { Product } from "../model"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} aria-label={product.name}>
      <article className="group space-y-3">
        <div className="bg-muted aspect-square overflow-hidden rounded-lg">
          <Image
            src={getProductImageUrl(product)}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-1">
          <p className="line-clamp-2 text-sm leading-tight font-medium">{product.name}</p>
          <p className="text-muted-foreground text-sm">
            {formatCurrency(product.price, product.currency)}
          </p>
        </div>
      </article>
    </Link>
  )
}
