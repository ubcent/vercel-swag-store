import { cacheLife } from "next/cache"
import type { Promotion } from "@/entities/promotion"
import { apiFetch } from "./client"

export async function getActivePromotion(): Promise<Promotion | null> {
  "use cache"
  cacheLife("minutes")

  try {
    const { data } = await apiFetch<Promotion>("/promotions")
    return data
  } catch {
    return null
  }
}
