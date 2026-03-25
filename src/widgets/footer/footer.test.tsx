import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Footer } from "./footer"

describe("Footer", () => {
  it("displays the current year", async () => {
    const year = new Date().getFullYear().toString()
    const { getByText } = render(await Footer())
    expect(getByText(new RegExp(year))).toBeInTheDocument()
  })

  it("renders copyright text", async () => {
    const { getByText } = render(await Footer())
    expect(getByText(/vercel swag store/i)).toBeInTheDocument()
  })
})
