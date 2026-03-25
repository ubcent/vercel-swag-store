"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { SearchInput } from "@/features/product-search"
import { CategoryFilter } from "@/features/category-filter"
import type { Category } from "@/entities/category"

interface SearchControlsProps {
  categories: Category[]
  initialQ?: string
  initialCategory?: string
}

export function SearchControls({ categories, initialQ, initialCategory }: SearchControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSearch(q: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (q) params.set("q", q)
    else params.delete("q")
    router.push(`/search?${params.toString()}`)
  }

  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (category) params.set("category", category)
    else params.delete("category")
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <SearchInput onSearch={handleSearch} initialValue={initialQ ?? ""} />
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={initialCategory}
        onChange={handleCategoryChange}
      />
    </div>
  )
}
