"use client"

import { useState, useTransition } from "react"
import { Button } from "@/shared/ui"
import { QuantitySelector } from "@/features/quantity-selector"
import { ShoppingCart } from "lucide-react"
import { addToCart } from "./actions"

interface AddToCartFormProps {
  productId: string
  maxQuantity: number
  inStock: boolean
}

export function AddToCartForm({ productId, maxQuantity, inStock }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleAddToCart() {
    setError(null)
    startTransition(async () => {
      const result = await addToCart(productId, quantity)
      if (!result.success) setError(result.error ?? "Something went wrong.")
    })
  }

  return (
    <div className="space-y-4">
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        max={maxQuantity}
        disabled={!inStock || isPending}
      />
      <Button
        onClick={handleAddToCart}
        disabled={!inStock || isPending}
        className="w-full"
        size="lg"
        aria-disabled={!inStock}
      >
        <ShoppingCart className="mr-2 size-4" />
        {isPending ? "Adding..." : "Add to Cart"}
      </Button>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
