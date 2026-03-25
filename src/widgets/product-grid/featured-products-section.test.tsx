import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { FeaturedProductsSection } from "./featured-products-section"
import type { Product } from "@/entities/product"

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}))

vi.mock("@/shared/api", () => ({
  getProducts: vi.fn(),
}))

const { getProducts } = await import("@/shared/api")

const mockMeta = {
  page: 1,
  limit: 6,
  total: 6,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
}

function makeProduct(i: number): Product {
  return {
    id: `prod_00${i}`,
    name: `Product ${i}`,
    slug: `product-${i}`,
    description: "A product",
    price: 3000,
    currency: "USD",
    category: "t-shirts",
    images: [`https://example.com/img${i}.png`],
    featured: true,
    tags: [],
    createdAt: "2025-01-01T00:00:00Z",
  }
}

const mockProducts = Array.from({ length: 6 }, (_, i) => makeProduct(i + 1))

describe("FeaturedProductsSection", () => {
  it("renders a product card for each product", async () => {
    vi.mocked(getProducts).mockResolvedValue({ products: mockProducts, meta: mockMeta })
    const { getAllByRole } = render(await FeaturedProductsSection())
    expect(getAllByRole("article")).toHaveLength(6)
  })

  it("renders product names", async () => {
    vi.mocked(getProducts).mockResolvedValue({ products: mockProducts, meta: mockMeta })
    const { getByText } = render(await FeaturedProductsSection())
    expect(getByText("Product 1")).toBeInTheDocument()
  })

  it("renders formatted price", async () => {
    vi.mocked(getProducts).mockResolvedValue({
      products: [makeProduct(1)],
      meta: mockMeta,
    })
    const { getByText } = render(await FeaturedProductsSection())
    expect(getByText("$30.00")).toBeInTheDocument()
  })

  it("calls getProducts with featured: true and limit: 6", async () => {
    vi.mocked(getProducts).mockResolvedValue({ products: mockProducts, meta: mockMeta })
    await FeaturedProductsSection()
    expect(getProducts).toHaveBeenCalledWith({ featured: true, limit: 6 })
  })
})
