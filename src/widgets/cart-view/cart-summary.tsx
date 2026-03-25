import { formatCurrency } from "@/shared/lib"
import { Separator } from "@/shared/ui"
import type { ApiCart } from "@/entities/cart"

interface CartSummaryProps {
  cart: ApiCart
}

export function CartSummary({ cart }: CartSummaryProps) {
  return (
    <div className="space-y-4">
      <Separator />
      <div className="flex items-center justify-between font-medium">
        <span>Subtotal</span>
        <span>{formatCurrency(cart.subtotal)}</span>
      </div>
      <p className="text-muted-foreground text-sm">Taxes and shipping calculated at checkout</p>
    </div>
  )
}
