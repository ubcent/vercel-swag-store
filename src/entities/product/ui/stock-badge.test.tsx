import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { StockBadge } from "./stock-badge"
import type { Stock } from "../model"

describe("StockBadge", () => {
  it("renders 'Out of stock' when inStock is false", () => {
    const stock: Stock = { productId: "x", stock: 0, inStock: false, lowStock: false }
    const { getByText } = render(<StockBadge stock={stock} />)
    expect(getByText("Out of stock")).toBeInTheDocument()
  })

  it("renders 'Only N left' when low stock", () => {
    const stock: Stock = { productId: "x", stock: 2, inStock: true, lowStock: true }
    const { getByText } = render(<StockBadge stock={stock} />)
    expect(getByText("Only 2 left")).toBeInTheDocument()
  })

  it("renders 'In stock' when healthy", () => {
    const stock: Stock = { productId: "x", stock: 20, inStock: true, lowStock: false }
    const { getByText } = render(<StockBadge stock={stock} />)
    expect(getByText("In stock")).toBeInTheDocument()
  })
})
