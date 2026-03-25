import { describe, it, expect, vi, beforeEach } from "vitest"
import { apiFetch, ApiError } from "./client"

vi.mock("@/shared/config", () => ({
  env: {
    API_BASE_URL: "https://api.test",
    API_BYPASS_TOKEN: "test-token",
  },
}))

const mockFetch = vi.fn()
vi.stubGlobal("fetch", mockFetch)

function makeResponse(body: object, status = 200) {
  return {
    status,
    json: vi.fn().mockResolvedValue(body),
  }
}

beforeEach(() => {
  mockFetch.mockReset()
})

describe("apiFetch", () => {
  it("sends x-vercel-protection-bypass header", async () => {
    mockFetch.mockResolvedValue(makeResponse({ success: true, data: {} }))
    await apiFetch("/test")
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.test/test",
      expect.objectContaining({
        headers: expect.objectContaining({
          "x-vercel-protection-bypass": "test-token",
        }),
      }),
    )
  })

  it("unwraps data from success envelope", async () => {
    mockFetch.mockResolvedValue(makeResponse({ success: true, data: { id: 1 } }))
    const result = await apiFetch<{ id: number }>("/test")
    expect(result.data).toEqual({ id: 1 })
  })

  it("returns meta when present", async () => {
    const meta = { pagination: { page: 1, total: 10 } }
    mockFetch.mockResolvedValue(makeResponse({ success: true, data: [], meta }))
    const result = await apiFetch("/test")
    expect(result.meta).toEqual(meta)
  })

  it("throws ApiError on success: false", async () => {
    mockFetch.mockResolvedValue(
      makeResponse({ success: false, error: { code: "NOT_FOUND", message: "Not found" } }, 404),
    )
    await expect(apiFetch("/test")).rejects.toThrow(ApiError)
  })

  it("throws ApiError with correct code and message", async () => {
    mockFetch.mockResolvedValue(
      makeResponse(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Invalid input" } },
        422,
      ),
    )
    try {
      await apiFetch("/test")
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).code).toBe("VALIDATION_ERROR")
      expect((err as ApiError).message).toBe("Invalid input")
      expect((err as ApiError).status).toBe(422)
    }
  })

  it("throws ApiError with correct HTTP status", async () => {
    mockFetch.mockResolvedValue(
      makeResponse({ success: false, error: { code: "NOT_FOUND", message: "Not found" } }, 404),
    )
    try {
      await apiFetch("/test")
    } catch (err) {
      expect((err as ApiError).status).toBe(404)
    }
  })
})
