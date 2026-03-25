import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"

vi.mock("@/shared/config", () => ({
  env: { API_BASE_URL: "https://api.test", API_BYPASS_TOKEN: "test-token" },
}))

vi.mock("@/features/cart-management", () => ({
  CartItemActions: () => null,
  getCartToken: vi.fn(),
}))

import { CartSummary } from "./cart-summary"
import { EMPTY_CART } from "@/entities/cart"
import type { ApiCartItem } from "@/entities/cart"

const mockProduct = {
  id: "prod-1",
  name: "Test Product",
  slug: "test-product",
  description: "A product",
  price: 1500,
  currency: "USD",
  category: "accessories" as const,
  images: ["https://example.com/img.jpg"],
  featured: false,
  tags: [],
  createdAt: "2024-01-01T00:00:00Z",
}

const mockItem = (lineTotal: number): ApiCartItem => ({
  productId: "prod-1",
  quantity: 1,
  addedAt: "2024-01-01T00:00:00Z",
  product: mockProduct,
  lineTotal,
})

describe("CartSummary", () => {
  it("displays formatted subtotal", () => {
    const cart = {
      ...EMPTY_CART,
      items: [mockItem(3000), mockItem(2800)],
      subtotal: 5800,
    }
    const { getByText } = render(<CartSummary cart={cart} />)
    expect(getByText("$58.00")).toBeInTheDocument()
  })
})
