import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/shared/lib"
import { CartItemActions } from "@/features/cart-management"
import type { ApiCartItem } from "../model"

interface CartItemRowProps {
  item: ApiCartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { product, quantity, lineTotal } = item

  return (
    <tr>
      <td className="py-4 pr-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
      </td>
      <td className="py-4 pr-4">
        <Link href={`/products/${product.slug}`} className="font-medium hover:underline">
          {product.name}
        </Link>
      </td>
      <td className="text-muted-foreground py-4 pr-4 text-sm">{formatCurrency(product.price)}</td>
      <td className="py-4 pr-4">
        <CartItemActions itemId={product.id} quantity={quantity} maxQuantity={99} />
      </td>
      <td className="py-4 text-right font-medium">{formatCurrency(lineTotal)}</td>
    </tr>
  )
}
