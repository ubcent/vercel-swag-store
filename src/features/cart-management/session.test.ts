import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("next/headers", () => ({ cookies: vi.fn() }))

vi.mock("@/shared/api", () => ({ createCart: vi.fn() }))

const { getCartToken, setCartToken, getOrCreateCartToken, CART_COOKIE_MAX_AGE } =
  await import("./session")
const { cookies } = await import("next/headers")
const { createCart } = await import("@/shared/api")

function makeCookieStore(value?: string) {
  const mockSet = vi.fn()
  return {
    get: vi.fn().mockReturnValue(value ? { value } : undefined),
    set: mockSet,
    _mockSet: mockSet,
  }
}

beforeEach(() => vi.clearAllMocks())

describe("getCartToken", () => {
  it("returns null when cookie is absent", async () => {
    vi.mocked(cookies).mockResolvedValue(makeCookieStore() as never)
    expect(await getCartToken()).toBeNull()
  })

  it("returns token string when cookie exists", async () => {
    vi.mocked(cookies).mockResolvedValue(makeCookieStore("tok_abc123") as never)
    expect(await getCartToken()).toBe("tok_abc123")
  })
})

describe("setCartToken", () => {
  it("sets httpOnly cookie with correct name and maxAge", async () => {
    const store = makeCookieStore()
    vi.mocked(cookies).mockResolvedValue(store as never)

    await setCartToken("tok_new")

    expect(store._mockSet).toHaveBeenCalledWith(
      "cart-token",
      "tok_new",
      expect.objectContaining({ httpOnly: true, maxAge: CART_COOKIE_MAX_AGE }),
    )
  })

  it("sets sameSite: lax", async () => {
    const store = makeCookieStore()
    vi.mocked(cookies).mockResolvedValue(store as never)

    await setCartToken("tok_new")

    expect(store._mockSet).toHaveBeenCalledWith(
      "cart-token",
      "tok_new",
      expect.objectContaining({ sameSite: "lax" }),
    )
  })
})

describe("getOrCreateCartToken", () => {
  it("returns existing token without calling createCart", async () => {
    vi.mocked(cookies).mockResolvedValue(makeCookieStore("existing-token") as never)

    const token = await getOrCreateCartToken()

    expect(token).toBe("existing-token")
    expect(createCart).not.toHaveBeenCalled()
  })

  it("calls createCart and stores token when no cookie exists", async () => {
    const store = makeCookieStore()
    vi.mocked(cookies).mockResolvedValue(store as never)
    vi.mocked(createCart).mockResolvedValue("new-token-xyz")

    const token = await getOrCreateCartToken()

    expect(token).toBe("new-token-xyz")
    expect(createCart).toHaveBeenCalledOnce()
    expect(store._mockSet).toHaveBeenCalledWith(
      "cart-token",
      "new-token-xyz",
      expect.objectContaining({ httpOnly: true, maxAge: CART_COOKIE_MAX_AGE }),
    )
  })

  it("does not call createCart on second call when token cached", async () => {
    vi.mocked(cookies).mockResolvedValue(makeCookieStore("cached-token") as never)

    await getOrCreateCartToken()
    await getOrCreateCartToken()

    expect(createCart).not.toHaveBeenCalled()
  })
})

describe("CART_COOKIE_MAX_AGE", () => {
  it("is 86400 seconds (24 hours)", () => {
    expect(CART_COOKIE_MAX_AGE).toBe(86400)
  })
})
