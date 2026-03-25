import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { getCart } from "@/shared/api"
import { Badge } from "@/shared/ui"
import { getCartToken } from "@/features/cart-management/session"

export async function CartIndicator() {
  const token = await getCartToken()

  let totalItems = 0

  if (token) {
    try {
      const cart = await getCart(token)
      totalItems = cart.totalItems
    } catch {
      // graceful fallback — show cart icon without count
    }
  }

  return (
    <Link
      href="/cart"
      aria-label={
        totalItems > 0 ? `Cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}` : "Cart"
      }
      className="relative p-2"
    >
      <ShoppingCart className="size-5" />
      {totalItems > 0 && (
        <Badge
          role="status"
          className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full p-0 text-xs"
        >
          {totalItems}
        </Badge>
      )}
    </Link>
  )
}
