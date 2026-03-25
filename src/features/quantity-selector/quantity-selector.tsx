"use client"

import { useState, useEffect } from "react"
import { Button } from "@/shared/ui"
import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  max: number
  disabled?: boolean
}

export function QuantitySelector({
  value,
  onChange,
  max,
  disabled = false,
}: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(String(value))
  const isDisabled = disabled || max === 0

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  function decrement() {
    onChange(Math.max(1, value - 1))
  }

  function increment() {
    onChange(Math.min(max, value + 1))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleBlur() {
    const parsed = parseInt(inputValue, 10)
    const clamped = Math.max(1, Math.min(max, isNaN(parsed) ? 1 : parsed))
    onChange(clamped)
    setInputValue(String(clamped))
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Decrease quantity"
        disabled={isDisabled || value <= 1}
        onClick={decrement}
      >
        <Minus className="size-4" />
      </Button>
      <input
        type="number"
        role="spinbutton"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isDisabled}
        min={1}
        max={max}
        className="border-input bg-background h-9 w-16 [appearance:textfield] rounded-md border px-3 text-center text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Increase quantity"
        disabled={isDisabled || value >= max}
        onClick={increment}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
