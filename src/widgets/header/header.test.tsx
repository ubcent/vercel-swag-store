import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { Header } from "./header"

vi.mock("./cart-indicator", () => ({
  CartIndicator: () => (
    <a href="/cart" aria-label="Cart">
      Cart
    </a>
  ),
}))

describe("Header", () => {
  it("renders logo link to /", () => {
    const { getByRole } = render(<Header />)
    expect(getByRole("link", { name: /vercel swag store/i })).toHaveAttribute("href", "/")
  })

  it("renders Home nav link to /", () => {
    const { getByRole } = render(<Header />)
    expect(getByRole("link", { name: /^home$/i })).toHaveAttribute("href", "/")
  })

  it("renders Search nav link to /search", () => {
    const { getByRole } = render(<Header />)
    expect(getByRole("link", { name: /^search$/i })).toHaveAttribute("href", "/search")
  })

  it("renders cart link to /cart", () => {
    const { getByRole } = render(<Header />)
    expect(getByRole("link", { name: /cart/i })).toHaveAttribute("href", "/cart")
  })
})
