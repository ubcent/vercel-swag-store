"use client"

import type { Category } from "@/entities/category"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | undefined
  onChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <select
      value={selectedCategory ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="border-input flex h-9 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.slug} value={cat.slug}>
          {cat.name}
        </option>
      ))}
    </select>
  )
}
