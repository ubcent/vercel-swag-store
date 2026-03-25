import { describe, it, expect, vi, beforeEach } from "vitest"
import { render } from "@testing-library/react"

vi.mock("@/features/cart-management", () => ({
  getCartToken: vi.fn(),
  CartItemActions: () => <div />,
}))

vi.mock("@/shared/api", () => ({
  getCart: vi.fn(),
}))

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

const { CartView } = await import("./cart-view")
const { getCartToken } = await import("@/features/cart-management")
const { getCart } = await import("@/shared/api")
const { EMPTY_CART } = await import("@/entities/cart")

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

const mockCartWithItems = {
  ...EMPTY_CART,
  token: "tok",
  items: [
    {
      productId: "prod-1",
      quantity: 1,
      addedAt: "2024-01-01T00:00:00Z",
      product: mockProduct,
      lineTotal: 3000,
    },
    {
      productId: "prod-2",
      quantity: 2,
      addedAt: "2024-01-01T00:00:00Z",
      product: { ...mockProduct, id: "prod-2", name: "Vercel Hoodie", slug: "vercel-hoodie" },
      lineTotal: 6000,
    },
  ],
  totalItems: 3,
  subtotal: 9000,
}

beforeEach(() => vi.clearAllMocks())

describe("CartView", () => {
  it("renders empty state when cart has no items", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok")
    vi.mocked(getCart).mockResolvedValue(EMPTY_CART)
    const { getByText } = render(await CartView())
    expect(getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it("renders Continue Shopping link when empty", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok")
    vi.mocked(getCart).mockResolvedValue(EMPTY_CART)
    const { getByRole } = render(await CartView())
    expect(getByRole("link", { name: /continue shopping/i })).toHaveAttribute("href", "/")
  })

  it("renders empty state immediately when no token exists", async () => {
    vi.mocked(getCartToken).mockResolvedValue(null)
    const { getByText } = render(await CartView())
    expect(getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it("renders cart items when cart has items", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok")
    vi.mocked(getCart).mockResolvedValue(mockCartWithItems)
    const { getAllByRole } = render(await CartView())
    expect(getAllByRole("row")).toHaveLength(mockCartWithItems.items.length)
  })
})
