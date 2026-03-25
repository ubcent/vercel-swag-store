import { describe, it, expect, vi, beforeEach } from "vitest"
import { render } from "@testing-library/react"

vi.mock("@/shared/api", () => ({
  getProducts: vi.fn(),
}))

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

const { SearchResultsSection } = await import("./search-results-section")
const { getProducts } = await import("@/shared/api")

const mockProduct = {
  id: "prod-1",
  name: "Vercel Hoodie",
  slug: "vercel-hoodie",
  description: "A hoodie",
  price: 8000,
  currency: "USD",
  category: "hoodies" as const,
  images: ["https://i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com/hoodie.jpg"],
  featured: false,
  tags: [],
  createdAt: "2024-01-01T00:00:00Z",
}

const mockMeta = {
  page: 1,
  limit: 5,
  total: 5,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
}

const mockProducts5 = Array.from({ length: 5 }, (_, i) => ({
  ...mockProduct,
  id: `prod-${i + 1}`,
  slug: `vercel-hoodie-${i + 1}`,
}))

beforeEach(() => vi.clearAllMocks())

describe("SearchResultsSection", () => {
  it("renders up to 5 products for a matching query", async () => {
    vi.mocked(getProducts).mockResolvedValue({ products: mockProducts5, meta: mockMeta })
    const { getAllByRole } = render(await SearchResultsSection({ q: "hoodie" }))
    expect(getAllByRole("article").length).toBeLessThanOrEqual(5)
  })

  it("renders empty state when no results", async () => {
    vi.mocked(getProducts).mockResolvedValue({ products: [], meta: mockMeta })
    const { getByText } = render(await SearchResultsSection({ q: "xyznothing" }))
    expect(getByText(/no products found/i)).toBeInTheDocument()
  })

  it("renders default products when no query", async () => {
    vi.mocked(getProducts).mockResolvedValue({ products: mockProducts5, meta: mockMeta })
    const { getAllByRole } = render(await SearchResultsSection({}))
    expect(getAllByRole("article").length).toBeGreaterThan(0)
    expect(getProducts).toHaveBeenCalledWith(
      expect.not.objectContaining({ search: expect.anything() }),
    )
  })
})
