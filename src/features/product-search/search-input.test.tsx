import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, fireEvent, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SearchInput } from "./search-input"

beforeEach(() => vi.clearAllMocks())

describe("SearchInput", () => {
  it("calls onSearch when Enter is pressed", async () => {
    const onSearch = vi.fn()
    const { getByRole } = render(<SearchInput onSearch={onSearch} initialValue="" />)
    const input = getByRole("searchbox")
    await userEvent.type(input, "hoodie{Enter}")
    expect(onSearch).toHaveBeenCalledWith("hoodie")
  })

  it("calls onSearch when search button is clicked", async () => {
    const onSearch = vi.fn()
    const { getByRole } = render(<SearchInput onSearch={onSearch} initialValue="" />)
    await userEvent.type(getByRole("searchbox"), "tee")
    await userEvent.click(getByRole("button", { name: /search/i }))
    expect(onSearch).toHaveBeenCalledWith("tee")
  })

  it("does not auto-search when input is < 3 chars", () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    const { getByRole } = render(<SearchInput onSearch={onSearch} initialValue="" />)
    fireEvent.change(getByRole("searchbox"), { target: { value: "ho" } })
    act(() => {
      vi.advanceTimersByTime(600)
    })
    expect(onSearch).not.toHaveBeenCalled()
    vi.useRealTimers()
  })

  it("auto-searches after 500ms debounce when ≥ 3 chars typed", () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    const { getByRole } = render(<SearchInput onSearch={onSearch} initialValue="" />)
    fireEvent.change(getByRole("searchbox"), { target: { value: "hoo" } })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(onSearch).toHaveBeenCalledWith("hoo")
    vi.useRealTimers()
  })
})
