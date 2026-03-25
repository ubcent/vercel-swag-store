import { cacheLife } from "next/cache"
import type { Category } from "@/entities/category"
import { apiFetch } from "./client"

export async function getCategories(): Promise<Category[]> {
  "use cache"
  cacheLife("days")

  const { data } = await apiFetch<Category[]>("/categories")
  return data
}
