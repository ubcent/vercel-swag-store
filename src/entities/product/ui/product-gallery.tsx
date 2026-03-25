import Image from "next/image"
import { getProductImageUrl } from "../lib"
import type { Product } from "../model"

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="bg-muted aspect-square overflow-hidden rounded-xl">
      <Image
        src={getProductImageUrl(product)}
        alt={product.name}
        width={600}
        height={600}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  )
}
