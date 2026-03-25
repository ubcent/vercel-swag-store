import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { ProductCard } from "./product-card"
import type { Product } from "../model"

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}))

const mockProduct: Product = {
  id: "tshirt_001",
  name: "Black Crewneck T-Shirt",
  slug: "black-crewneck-t-shirt",
  description: "A great tee",
  price: 3000,
  currency: "USD",
  category: "t-shirts",
  images: ["https://example.com/img.png"],
  featured: true,
  tags: [],
  createdAt: "2025-01-01T00:00:00Z",
}

describe("ProductCard", () => {
  it("links to /products/[slug]", () => {
    const { getByRole } = render(<ProductCard product={mockProduct} />)
    expect(getByRole("link")).toHaveAttribute("href", "/products/black-crewneck-t-shirt")
  })

  it("displays product name", () => {
    const { getByText } = render(<ProductCard product={mockProduct} />)
    expect(getByText("Black Crewneck T-Shirt")).toBeInTheDocument()
  })

  it("displays formatted price", () => {
    const { getByText } = render(<ProductCard product={{ ...mockProduct, price: 2800 }} />)
    expect(getByText("$28.00")).toBeInTheDocument()
  })

  it("displays product image with alt text", () => {
    const { getByRole } = render(<ProductCard product={mockProduct} />)
    expect(getByRole("img")).toHaveAttribute("alt", "Black Crewneck T-Shirt")
  })

  it("uses placeholder image when product has no images", () => {
    const { getByRole } = render(<ProductCard product={{ ...mockProduct, images: [] }} />)
    expect(getByRole("img")).toHaveAttribute("src", "/placeholder.png")
  })
})
