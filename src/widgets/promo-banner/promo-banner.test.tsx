import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { PromoBanner } from "./promo-banner"
import type { Promotion } from "@/entities/promotion"

vi.mock("@/shared/api", () => ({
  getActivePromotion: vi.fn(),
}))

const { getActivePromotion } = await import("@/shared/api")

const mockPromotion: Promotion = {
  id: "promo_001",
  title: "Summer Ship-a-thon",
  description: "Get 20% off all t-shirts.",
  discountPercent: 20,
  code: "SHIPIT20",
  validFrom: "2025-06-01T00:00:00Z",
  validUntil: "2025-09-01T00:00:00Z",
  active: true,
}

describe("PromoBanner", () => {
  it("renders promotion title when promotion exists", async () => {
    vi.mocked(getActivePromotion).mockResolvedValue(mockPromotion)
    const { getByText } = render(await PromoBanner())
    expect(getByText(/summer ship-a-thon/i)).toBeInTheDocument()
  })

  it("renders promo code badge", async () => {
    vi.mocked(getActivePromotion).mockResolvedValue(mockPromotion)
    const { getByText } = render(await PromoBanner())
    expect(getByText("SHIPIT20")).toBeInTheDocument()
  })

  it("renders nothing when no promotion", async () => {
    vi.mocked(getActivePromotion).mockResolvedValue(null)
    const { container } = render(await PromoBanner())
    expect(container).toBeEmptyDOMElement()
  })
})
