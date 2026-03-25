import { describe, it, expect, vi, beforeEach } from "vitest"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CartItemActions } from "./cart-item-actions"

vi.mock("./actions", () => ({
  updateCartItemQuantity: vi.fn(),
  removeFromCart: vi.fn(),
}))

const { updateCartItemQuantity, removeFromCart } = await import("./actions")

beforeEach(() => vi.clearAllMocks())

describe("CartItemActions", () => {
  it("disables decrement button when quantity is 1", () => {
    const { getByLabelText } = render(<CartItemActions itemId="i1" quantity={1} maxQuantity={10} />)
    expect(getByLabelText("Decrease quantity")).toBeDisabled()
  })

  it("calls updateCartItemQuantity with quantity + 1 on increment", async () => {
    vi.mocked(updateCartItemQuantity).mockResolvedValue({ success: true })
    const { getByLabelText } = render(<CartItemActions itemId="i1" quantity={2} maxQuantity={10} />)
    await userEvent.click(getByLabelText("Increase quantity"))
    expect(updateCartItemQuantity).toHaveBeenCalledWith("i1", 3)
  })

  it("calls updateCartItemQuantity with quantity - 1 on decrement", async () => {
    vi.mocked(updateCartItemQuantity).mockResolvedValue({ success: true })
    const { getByLabelText } = render(<CartItemActions itemId="i1" quantity={3} maxQuantity={10} />)
    await userEvent.click(getByLabelText("Decrease quantity"))
    expect(updateCartItemQuantity).toHaveBeenCalledWith("i1", 2)
  })

  it("calls removeFromCart on Remove click", async () => {
    vi.mocked(removeFromCart).mockResolvedValue({ success: true })
    const { getByRole } = render(<CartItemActions itemId="i1" quantity={2} maxQuantity={10} />)
    await userEvent.click(getByRole("button", { name: /remove/i }))
    expect(removeFromCart).toHaveBeenCalledWith("i1")
  })
})
