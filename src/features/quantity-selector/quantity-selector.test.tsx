import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { QuantitySelector } from "./quantity-selector"

function setup(max: number, initial = 1) {
  const onChange = vi.fn()
  const utils = render(<QuantitySelector value={initial} onChange={onChange} max={max} />)
  return { ...utils, onChange }
}

describe("QuantitySelector", () => {
  it("renders with initial value", () => {
    const { getByRole } = setup(10)
    expect(getByRole("spinbutton")).toHaveValue(1)
  })

  it("disables decrement button at minimum (1)", () => {
    const { getByLabelText } = setup(10, 1)
    expect(getByLabelText("Decrease quantity")).toBeDisabled()
  })

  it("enables decrement button above minimum", () => {
    const { getByLabelText } = setup(10, 2)
    expect(getByLabelText("Decrease quantity")).not.toBeDisabled()
  })

  it("disables increment button at maximum", () => {
    const { getByLabelText } = setup(5, 5)
    expect(getByLabelText("Increase quantity")).toBeDisabled()
  })

  it("disables all controls when max is 0", () => {
    const { getByRole, getByLabelText } = setup(0)
    expect(getByRole("spinbutton")).toBeDisabled()
    expect(getByLabelText("Decrease quantity")).toBeDisabled()
    expect(getByLabelText("Increase quantity")).toBeDisabled()
  })

  it("calls onChange with value + 1 on increment click", async () => {
    const { getByLabelText, onChange } = setup(10, 3)
    await userEvent.click(getByLabelText("Increase quantity"))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it("calls onChange with value - 1 on decrement click", async () => {
    const { getByLabelText, onChange } = setup(10, 3)
    await userEvent.click(getByLabelText("Decrease quantity"))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it("clamps typed value to max on blur", async () => {
    const { getByRole, onChange } = setup(5, 1)
    const input = getByRole("spinbutton")
    await userEvent.clear(input)
    await userEvent.type(input, "99")
    await userEvent.tab()
    expect(onChange).toHaveBeenLastCalledWith(5)
  })

  it("clamps typed value to min (1) on blur", async () => {
    const { getByRole, onChange } = setup(10, 5)
    const input = getByRole("spinbutton")
    await userEvent.clear(input)
    await userEvent.type(input, "0")
    await userEvent.tab()
    expect(onChange).toHaveBeenLastCalledWith(1)
  })
})
