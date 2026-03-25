import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { ProductPage } from "./product-page"
import type { Product } from "@/entities/product"

vi.mock("next/navigation", () => ({
  notFound: vi.fn().mockImplementation(() => {
    throw new Error("NEXT_NOT_FOUND")
  }),
}))

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}))

vi.mock("@/shared/api", () => {
  class ApiError extends Error {
    code: string
    status: number
    constructor(code: string, message: string, status: number) {
      super(message)
      this.name = "ApiError"
      this.code = code
      this.status = status
    }
  }
  return { getProduct: vi.fn(), getStock: vi.fn(), ApiError }
})

// Stub out ProductActions (async, depends on getStock) so we can test ProductPage in isolation
vi.mock("./product-actions", () => ({
  ProductActions: () => <div data-testid="product-actions" />,
}))

const { getProduct, ApiError } = await import("@/shared/api")
const { notFound } = await import("next/navigation")

const mockProduct: Product = {
  id: "tshirt_001",
  name: "Black Crewneck T-Shirt",
  slug: "black-crewneck-t-shirt",
  description: "A great tee for developers.",
  price: 3000,
  currency: "USD",
  category: "t-shirts",
  images: ["https://example.com/img.png"],
  featured: true,
  tags: [],
  createdAt: "2025-01-01T00:00:00Z",
}

describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it("renders product name as h1", async () => {
    vi.mocked(getProduct).mockResolvedValue(mockProduct)
    const { getByRole } = render(await ProductPage({ slug: mockProduct.slug }))
    expect(getByRole("heading", { level: 1 })).toHaveTextContent("Black Crewneck T-Shirt")
  })

  it("renders formatted price", async () => {
    vi.mocked(getProduct).mockResolvedValue(mockProduct)
    const { getByText } = render(await ProductPage({ slug: mockProduct.slug }))
    expect(getByText("$30.00")).toBeInTheDocument()
  })

  it("renders product description", async () => {
    vi.mocked(getProduct).mockResolvedValue(mockProduct)
    const { getByText } = render(await ProductPage({ slug: mockProduct.slug }))
    expect(getByText("A great tee for developers.")).toBeInTheDocument()
  })

  it("calls notFound for a 404 error", async () => {
    vi.mocked(getProduct).mockRejectedValue(new ApiError("NOT_FOUND", "Not found", 404))
    await expect(ProductPage({ slug: "nonexistent" })).rejects.toThrow("NEXT_NOT_FOUND")
    expect(notFound).toHaveBeenCalled()
  })

  it("re-throws non-404 errors", async () => {
    vi.mocked(getProduct).mockRejectedValue(
      new ApiError("INTERNAL_SERVER_ERROR", "Server error", 500),
    )
    await expect(ProductPage({ slug: "bad" })).rejects.toThrow()
    expect(notFound).not.toHaveBeenCalled()
  })
})
