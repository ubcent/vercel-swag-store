import { Suspense } from "react"
import { CartView, CartViewSkeleton } from "@/widgets/cart-view"

export function CartPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      <Suspense fallback={<CartViewSkeleton />}>
        <CartView />
      </Suspense>
    </div>
  )
}
