import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

vi.mock("./session", () => ({
  getOrCreateCartToken: vi.fn(),
  getCartToken: vi.fn(),
  clearCartToken: vi.fn(),
}))

vi.mock("@/shared/api", () => {
  class ApiError extends Error {
    code: string
    constructor(message: string, code: string) {
      super(message)
      this.code = code
    }
  }
  return {
    ApiError,
    addCartItem: vi.fn(),
    updateCartItem: vi.fn(),
    removeCartItem: vi.fn(),
  }
})

const { addToCart, updateCartItemQuantity, removeFromCart } = await import("./actions")
const { revalidatePath } = await import("next/cache")
const { getOrCreateCartToken, getCartToken, clearCartToken } = await import("./session")
const { addCartItem, updateCartItem, removeCartItem, ApiError } = await import("@/shared/api")

beforeEach(() => vi.clearAllMocks())

describe("addToCart", () => {
  it("calls addCartItem with token, productId, and quantity", async () => {
    vi.mocked(getOrCreateCartToken).mockResolvedValue("tok_abc")
    vi.mocked(addCartItem).mockResolvedValue(undefined)

    await addToCart("prod-1", 2)

    expect(addCartItem).toHaveBeenCalledWith("tok_abc", "prod-1", 2)
  })

  it("revalidates /cart and layout on success", async () => {
    vi.mocked(getOrCreateCartToken).mockResolvedValue("tok_abc")
    vi.mocked(addCartItem).mockResolvedValue(undefined)

    await addToCart("prod-1", 1)

    expect(revalidatePath).toHaveBeenCalledWith("/cart")
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
  })

  it("returns success: true on successful add", async () => {
    vi.mocked(getOrCreateCartToken).mockResolvedValue("tok_abc")
    vi.mocked(addCartItem).mockResolvedValue(undefined)

    const result = await addToCart("prod-1", 1)

    expect(result).toEqual({ success: true })
  })

  it("returns success: false with 'Product not found' on NOT_FOUND error", async () => {
    vi.mocked(getOrCreateCartToken).mockResolvedValue("tok_abc")
    vi.mocked(addCartItem).mockRejectedValue(new ApiError("not found", "NOT_FOUND"))

    const result = await addToCart("prod-missing", 1)

    expect(result).toEqual({ success: false, error: "Product not found" })
  })

  it("returns success: false with 'Invalid quantity' on VALIDATION_ERROR", async () => {
    vi.mocked(getOrCreateCartToken).mockResolvedValue("tok_abc")
    vi.mocked(addCartItem).mockRejectedValue(new ApiError("bad qty", "VALIDATION_ERROR"))

    const result = await addToCart("prod-1", 0)

    expect(result).toEqual({ success: false, error: "Invalid quantity" })
  })

  it("clears cart token and returns error on BAD_REQUEST", async () => {
    vi.mocked(getOrCreateCartToken).mockResolvedValue("tok_expired")
    vi.mocked(addCartItem).mockRejectedValue(new ApiError("bad request", "BAD_REQUEST"))

    const result = await addToCart("prod-1", 1)

    expect(clearCartToken).toHaveBeenCalled()
    expect(result).toEqual({ success: false, error: "Cart session expired. Please try again." })
  })

  it("returns generic error for unknown errors", async () => {
    vi.mocked(getOrCreateCartToken).mockResolvedValue("tok_abc")
    vi.mocked(addCartItem).mockRejectedValue(new Error("network failure"))

    const result = await addToCart("prod-1", 1)

    expect(result).toEqual({ success: false, error: "Something went wrong. Please try again." })
  })
})

describe("updateCartItemQuantity", () => {
  it("returns error when no cart token exists", async () => {
    vi.mocked(getCartToken).mockResolvedValue(null)

    const result = await updateCartItemQuantity("item-1", 2)

    expect(result).toEqual({ success: false, error: "Cart session expired. Please try again." })
    expect(updateCartItem).not.toHaveBeenCalled()
  })

  it("calls updateCartItem with token, itemId, and quantity", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok_abc")
    vi.mocked(updateCartItem).mockResolvedValue(undefined)

    await updateCartItemQuantity("item-1", 3)

    expect(updateCartItem).toHaveBeenCalledWith("tok_abc", "item-1", 3)
  })

  it("revalidates paths on success", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok_abc")
    vi.mocked(updateCartItem).mockResolvedValue(undefined)

    await updateCartItemQuantity("item-1", 2)

    expect(revalidatePath).toHaveBeenCalledWith("/cart")
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
  })

  it("returns success: true on success", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok_abc")
    vi.mocked(updateCartItem).mockResolvedValue(undefined)

    const result = await updateCartItemQuantity("item-1", 2)

    expect(result).toEqual({ success: true })
  })

  it("clears token and returns error on BAD_REQUEST", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok_expired")
    vi.mocked(updateCartItem).mockRejectedValue(new ApiError("bad request", "BAD_REQUEST"))

    const result = await updateCartItemQuantity("item-1", 2)

    expect(clearCartToken).toHaveBeenCalled()
    expect(result.success).toBe(false)
  })
})

describe("removeFromCart", () => {
  it("returns error when no cart token exists", async () => {
    vi.mocked(getCartToken).mockResolvedValue(null)

    const result = await removeFromCart("item-1")

    expect(result).toEqual({ success: false, error: "Cart session expired. Please try again." })
    expect(removeCartItem).not.toHaveBeenCalled()
  })

  it("calls removeCartItem with token and itemId", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok_abc")
    vi.mocked(removeCartItem).mockResolvedValue(undefined)

    await removeFromCart("item-1")

    expect(removeCartItem).toHaveBeenCalledWith("tok_abc", "item-1")
  })

  it("revalidates paths on success", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok_abc")
    vi.mocked(removeCartItem).mockResolvedValue(undefined)

    await removeFromCart("item-1")

    expect(revalidatePath).toHaveBeenCalledWith("/cart")
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
  })

  it("returns success: true on success", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok_abc")
    vi.mocked(removeCartItem).mockResolvedValue(undefined)

    const result = await removeFromCart("item-1")

    expect(result).toEqual({ success: true })
  })

  it("clears token and returns error on BAD_REQUEST", async () => {
    vi.mocked(getCartToken).mockResolvedValue("tok_expired")
    vi.mocked(removeCartItem).mockRejectedValue(new ApiError("bad request", "BAD_REQUEST"))

    const result = await removeFromCart("item-1")

    expect(clearCartToken).toHaveBeenCalled()
    expect(result.success).toBe(false)
  })
})
