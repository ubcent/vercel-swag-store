import type { Stock } from "@/entities/product"
import { apiFetch } from "./client"

export async function getStock(idOrSlug: string): Promise<Stock> {
  const { data } = await apiFetch<Stock>(`/products/${idOrSlug}/stock`, {
    cache: "no-store",
  })
  return data
}
