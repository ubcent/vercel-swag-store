import type { Stock } from "./model"

export function getStockLabel(stock: Stock): string {
  if (!stock.inStock) return "Out of stock"
  if (stock.lowStock) return `Only ${stock.stock} left`
  return "In stock"
}

export function getStockVariant(stock: Stock): "default" | "warning" | "destructive" {
  if (!stock.inStock) return "destructive"
  if (stock.lowStock) return "warning"
  return "default"
}
