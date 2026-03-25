import type { ApiCart } from "./model"

export const EMPTY_CART: ApiCart = {
  token: "",
  items: [],
  totalItems: 0,
  subtotal: 0,
  currency: "USD",
  createdAt: "",
  updatedAt: "",
}

export function calcItemCount(cart: ApiCart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
}

export function calcSubtotal(cart: ApiCart): number {
  return cart.items.reduce((sum, item) => sum + item.lineTotal, 0)
}
