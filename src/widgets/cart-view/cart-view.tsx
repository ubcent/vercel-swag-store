import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/shared/ui"
import { CartItemRow } from "@/entities/cart"
import { getCartToken } from "@/features/cart-management"
import { getCart } from "@/shared/api"
import { CartSummary } from "./cart-summary"

export async function CartView() {
  const token = await getCartToken()

  if (!token) {
    return <EmptyState />
  }

  const cart = await getCart(token)

  if (cart.items.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6">
      <table className="w-full">
        <tbody>
          {cart.items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </tbody>
      </table>
      <CartSummary cart={cart} />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <ShoppingBag className="text-muted-foreground size-12" />
      <p className="text-lg font-medium">Your cart is empty.</p>
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  )
}
