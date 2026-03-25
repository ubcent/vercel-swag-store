import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/shared/config", () => ({
  env: { API_BASE_URL: "https://api.test", API_BYPASS_TOKEN: "test-token" },
}))

const mockFetch = vi.fn()
vi.stubGlobal("fetch", mockFetch)

const { createCart } = await import("./cart")

beforeEach(() => mockFetch.mockReset())

describe("createCart", () => {
  it("returns token from x-cart-token response header", async () => {
    mockFetch.mockResolvedValue({
      headers: { get: (h: string) => (h === "x-cart-token" ? "tok_brand_new" : null) },
      json: vi.fn(),
    })

    expect(await createCart()).toBe("tok_brand_new")
  })

  it("sends POST to /cart/create", async () => {
    mockFetch.mockResolvedValue({
      headers: { get: () => "tok_x" },
      json: vi.fn(),
    })

    await createCart()

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.test/cart/create",
      expect.objectContaining({ method: "POST" }),
    )
  })

  it("includes x-vercel-protection-bypass header", async () => {
    mockFetch.mockResolvedValue({
      headers: { get: () => "tok_x" },
      json: vi.fn(),
    })

    await createCart()

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ "x-vercel-protection-bypass": "test-token" }),
      }),
    )
  })

  it("throws when x-cart-token header is absent", async () => {
    mockFetch.mockResolvedValue({
      headers: { get: vi.fn().mockReturnValue(null) },
      json: vi.fn(),
    })

    await expect(createCart()).rejects.toThrow("no x-cart-token in response headers")
  })
})
