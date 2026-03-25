import { describe, it, expect } from "vitest"
import { getStockLabel, getStockVariant } from "./stock"
import type { Stock } from "./model"

const outOfStock: Stock = { productId: "x", stock: 0, inStock: false, lowStock: false }
const lowStock: Stock = { productId: "x", stock: 3, inStock: true, lowStock: true }
const inStock: Stock = { productId: "x", stock: 20, inStock: true, lowStock: false }

describe("getStockLabel", () => {
  it("returns 'Out of stock' when inStock is false", () => {
    expect(getStockLabel(outOfStock)).toBe("Out of stock")
  })

  it("returns 'Only N left' when lowStock is true", () => {
    expect(getStockLabel(lowStock)).toBe("Only 3 left")
  })

  it("returns 'In stock' when healthy", () => {
    expect(getStockLabel(inStock)).toBe("In stock")
  })

  it("prioritises inStock:false over lowStock:true", () => {
    const edge: Stock = { productId: "x", stock: 0, inStock: false, lowStock: true }
    expect(getStockLabel(edge)).toBe("Out of stock")
  })
})

describe("getStockVariant", () => {
  it("returns 'destructive' when out of stock", () => {
    expect(getStockVariant(outOfStock)).toBe("destructive")
  })

  it("returns 'warning' when low stock", () => {
    expect(getStockVariant(lowStock)).toBe("warning")
  })

  it("returns 'default' when in stock", () => {
    expect(getStockVariant(inStock)).toBe("default")
  })
})
