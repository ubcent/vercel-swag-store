import { describe, it, expect } from "vitest"
import { calcItemCount, calcSubtotal, EMPTY_CART } from "./lib"
import type { ApiCart, ApiCartItem } from "./model"

const mockItem: ApiCartItem = {
  productId: "tshirt_001",
  quantity: 1,
  addedAt: "2025-01-01T00:00:00Z",
  lineTotal: 3000,
  product: {
    id: "tshirt_001",
    name: "Black Crewneck T-Shirt",
    slug: "black-crewneck-t-shirt",
    description: "A tee",
    price: 3000,
    currency: "USD",
    category: "t-shirts",
    images: [],
    featured: true,
    tags: [],
    createdAt: "2025-01-01T00:00:00Z",
  },
}

describe("calcItemCount", () => {
  it("returns 0 for empty cart", () => {
    expect(calcItemCount(EMPTY_CART)).toBe(0)
  })

  it("sums quantities across all items", () => {
    const cart: ApiCart = {
      ...EMPTY_CART,
      items: [
        { ...mockItem, quantity: 2 },
        { ...mockItem, productId: "hoodie_001", quantity: 3 },
      ],
    }
    expect(calcItemCount(cart)).toBe(5)
  })

  it("returns quantity for a single item", () => {
    const cart: ApiCart = { ...EMPTY_CART, items: [{ ...mockItem, quantity: 4 }] }
    expect(calcItemCount(cart)).toBe(4)
  })
})

describe("calcSubtotal", () => {
  it("returns 0 for empty cart", () => {
    expect(calcSubtotal(EMPTY_CART)).toBe(0)
  })

  it("sums lineTotals across all items", () => {
    const cart: ApiCart = {
      ...EMPTY_CART,
      items: [
        { ...mockItem, lineTotal: 3000 },
        { ...mockItem, productId: "hoodie_001", lineTotal: 1500 },
      ],
    }
    expect(calcSubtotal(cart)).toBe(4500)
  })

  it("returns lineTotal for a single item", () => {
    const cart: ApiCart = { ...EMPTY_CART, items: [{ ...mockItem, lineTotal: 6000 }] }
    expect(calcSubtotal(cart)).toBe(6000)
  })
})
