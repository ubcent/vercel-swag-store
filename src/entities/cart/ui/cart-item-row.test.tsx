import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { CartItemRow } from "./cart-item-row"
import type { ApiCartItem } from "../model"

vi.mock("@/features/cart-management", () => ({
  CartItemActions: () => <div data-testid="cart-item-actions" />,
}))

const mockProduct = {
  id: "prod-1",
  name: "Vercel Cap",
  slug: "vercel-cap",
  description: "A cap",
  price: 3000,
  currency: "USD",
  category: "hats" as const,
  images: ["https://i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com/cap.jpg"],
  featured: false,
  tags: [],
  createdAt: "2024-01-01T00:00:00Z",
}

const mockCartItem: ApiCartItem = {
  productId: "prod-1",
  quantity: 2,
  addedAt: "2024-01-01T00:00:00Z",
  product: mockProduct,
  lineTotal: 6000,
}

describe("CartItemRow", () => {
  it("displays product name", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <CartItemRow item={mockCartItem} />
        </tbody>
      </table>,
    )
    expect(getByText("Vercel Cap")).toBeInTheDocument()
  })

  it("product name links to /products/[slug]", () => {
    const { getByRole } = render(
      <table>
        <tbody>
          <CartItemRow item={mockCartItem} />
        </tbody>
      </table>,
    )
    expect(getByRole("link", { name: "Vercel Cap" })).toHaveAttribute(
      "href",
      "/products/vercel-cap",
    )
  })

  it("displays formatted unit price", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <CartItemRow item={mockCartItem} />
        </tbody>
      </table>,
    )
    expect(getByText("$30.00")).toBeInTheDocument()
  })

  it("displays formatted line total", () => {
    const item = { ...mockCartItem, lineTotal: 6000 }
    const { getByText } = render(
      <table>
        <tbody>
          <CartItemRow item={item} />
        </tbody>
      </table>,
    )
    expect(getByText("$60.00")).toBeInTheDocument()
  })
})
