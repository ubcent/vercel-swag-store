import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CategoryFilter } from "./category-filter"
import type { Category } from "@/entities/category"

const mockCategories: Category[] = [
  { slug: "hoodies", name: "Hoodies", productCount: 5 },
  { slug: "t-shirts", name: "T-Shirts", productCount: 8 },
]

describe("CategoryFilter", () => {
  it("renders 'All Categories' as first option", () => {
    const { getByRole } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={undefined}
        onChange={vi.fn()}
      />,
    )
    expect(getByRole("option", { name: /all categories/i })).toBeInTheDocument()
  })

  it("calls onChange with category slug when selection changes", async () => {
    const onChange = vi.fn()
    const { getByRole } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={undefined}
        onChange={onChange}
      />,
    )
    await userEvent.selectOptions(getByRole("combobox"), "hoodies")
    expect(onChange).toHaveBeenCalledWith("hoodies")
  })

  it("shows current selection from selectedCategory prop", () => {
    const { getByRole } = render(
      <CategoryFilter categories={mockCategories} selectedCategory="hoodies" onChange={vi.fn()} />,
    )
    expect(getByRole("combobox")).toHaveValue("hoodies")
  })
})
