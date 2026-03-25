import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { CartIndicator } from "./cart-indicator"
import { EMPTY_CART } from "@/entities/cart"
import type { ApiCart } from "@/entities/cart"

vi.mock("@/features/cart-management/session", () => ({
  getCartToken: vi.fn(),
}))

vi.mock("@/shared/api", () => ({
  getCart: vi.fn(),
}))

const { getCartToken } = await import("@/features/cart-management/session")
const { getCart } = await import("@/shared/api")

const mockCartWithItems: ApiCart = {
  ...EMPTY_CART,
  token: "tok-123",
  items: [
    {
      productId: "tshirt_001",
      quantity: 2,
      addedAt: "",
      lineTotal: 6000,
      product: {
        id: "tshirt_001",
        name: "Black Crewneck T-Shirt",
        slug: "black-crewneck-t-shirt",
        description: "",
        price: 3000,
        currency: "USD",
        category: "t-shirts",
        images: [],
        featured: true,
        tags: [],
        createdAt: "",
      },
    },
  ],
  totalItems: 2,
  subtotal: 6000,
}

describe("CartIndicator", () => {
  it("renders cart link without badge when no token", async () => {
    vi.mocked(getCartToken).mockResolvedValue(null)
    const { getByRole, queryByRole } = render(await CartIndicator())
    expect(getByRole("link")).toHaveAttribute("href", "/cart")
    expect(queryByRole("status")).not.toBeInTheDocument()
  })

  it("renders badge with item count when cart has items", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok-123")
    vi.mocked(getCart).mockResolvedValue(mockCartWithItems)
    const { getByRole } = render(await CartIndicator())
    expect(getByRole("status")).toHaveTextContent("2")
  })

  it("renders without badge when cart is empty", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok-123")
    vi.mocked(getCart).mockResolvedValue({ ...EMPTY_CART, token: "tok-123", totalItems: 0 })
    const { queryByRole } = render(await CartIndicator())
    expect(queryByRole("status")).not.toBeInTheDocument()
  })

  it("renders gracefully when getCart throws", async () => {
    vi.mocked(getCartToken).mockResolvedValue("expired-token")
    vi.mocked(getCart).mockRejectedValue(new Error("cart expired"))
    const { getByRole } = render(await CartIndicator())
    expect(getByRole("link")).toHaveAttribute("href", "/cart")
  })
})
