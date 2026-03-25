import { Badge } from "@/shared/ui"
import { getStockLabel, getStockVariant } from "../stock"
import type { Stock } from "../model"

export function StockBadge({ stock }: { stock: Stock }) {
  const label = getStockLabel(stock)
  const variant = getStockVariant(stock)

  return (
    <Badge
      variant={
        variant === "warning" ? "secondary" : variant === "destructive" ? "destructive" : "outline"
      }
      className={
        variant === "warning" ? "border-yellow-500 text-yellow-700 dark:text-yellow-400" : undefined
      }
    >
      {label}
    </Badge>
  )
}
