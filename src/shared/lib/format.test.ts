import { describe, it, expect } from "vitest"
import { formatCurrency } from "./format"

describe("formatCurrency", () => {
  it("formats whole dollars", () => {
    expect(formatCurrency(3000)).toBe("$30.00")
  })

  it("formats cents correctly", () => {
    expect(formatCurrency(150)).toBe("$1.50")
  })

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00")
  })

  it("formats a single cent", () => {
    expect(formatCurrency(1)).toBe("$0.01")
  })

  it("respects currency param", () => {
    const result = formatCurrency(1000, "EUR")
    expect(result).toContain("10.00")
  })
})
