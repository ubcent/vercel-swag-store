import { describe, it, expect } from "vitest"
import { getProductImageUrl } from "./lib"
import type { Product } from "./model"

const base: Product = {
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
}

describe("getProductImageUrl", () => {
  it("returns first image when images array is non-empty", () => {
    const p = { ...base, images: ["https://example.com/img.png", "https://example.com/img2.png"] }
    expect(getProductImageUrl(p)).toBe("https://example.com/img.png")
  })

  it("returns /placeholder.png when images array is empty", () => {
    expect(getProductImageUrl(base)).toBe("/placeholder.png")
  })
})
