"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"

interface SearchInputProps {
  onSearch: (query: string) => void
  initialValue?: string
}

export function SearchInput({ onSearch, initialValue = "" }: SearchInputProps) {
  const [value, setValue] = useState(initialValue)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (value.length >= 3) {
      timerRef.current = setTimeout(() => {
        onSearch(value)
      }, 500)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value, onSearch])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (timerRef.current) clearTimeout(timerRef.current)
      onSearch(value)
    }
  }

  function handleButtonClick() {
    if (timerRef.current) clearTimeout(timerRef.current)
    onSearch(value)
  }

  return (
    <div className="flex gap-2">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        aria-label="Search"
        className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-sm"
      >
        <Search className="size-4" />
        Search
      </button>
    </div>
  )
}
