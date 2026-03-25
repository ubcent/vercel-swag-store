"use client"

import { useState, useTransition } from "react"
import { Button } from "@/shared/ui"
import { updateCartItemQuantity, removeFromCart } from "./actions"

interface CartItemActionsProps {
  itemId: string
  quantity: number
  maxQuantity: number
}

export function CartItemActions({ itemId, quantity, maxQuantity }: CartItemActionsProps) {
  const [optimisticQty, setOptimisticQty] = useState(quantity)
  const [isPending, startTransition] = useTransition()

  function handleDecrement() {
    if (optimisticQty <= 1) return
    const next = optimisticQty - 1
    setOptimisticQty(next)
    startTransition(async () => {
      const result = await updateCartItemQuantity(itemId, next)
      if (!result.success) setOptimisticQty(optimisticQty)
    })
  }

  function handleIncrement() {
    if (optimisticQty >= maxQuantity) return
    const next = optimisticQty + 1
    setOptimisticQty(next)
    startTransition(async () => {
      const result = await updateCartItemQuantity(itemId, next)
      if (!result.success) setOptimisticQty(optimisticQty)
    })
  }

  function handleRemove() {
    startTransition(async () => {
      await removeFromCart(itemId)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        aria-label="Decrease quantity"
        disabled={isPending || optimisticQty <= 1}
        onClick={handleDecrement}
      >
        −
      </Button>
      <span className="w-6 text-center text-sm">{optimisticQty}</span>
      <Button
        variant="outline"
        size="icon"
        aria-label="Increase quantity"
        disabled={isPending || optimisticQty >= maxQuantity}
        onClick={handleIncrement}
      >
        +
      </Button>
      <Button variant="ghost" size="sm" disabled={isPending} onClick={handleRemove}>
        Remove
      </Button>
    </div>
  )
}
