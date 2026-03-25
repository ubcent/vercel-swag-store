import { cacheLife } from "next/cache"
import type { Product, ProductCategory, ProductListMeta } from "@/entities/product"
import { apiFetch } from "./client"

export interface ProductListParams {
  page?: number
  limit?: number
  category?: ProductCategory | string
  search?: string
  featured?: boolean
}

export interface ProductListResult {
  products: Product[]
  meta: ProductListMeta
}

export async function getProducts(params?: ProductListParams): Promise<ProductListResult> {
  "use cache"
  cacheLife("hours")

  const qs = new URLSearchParams()
  if (params?.page) qs.set("page", String(params.page))
  if (params?.limit) qs.set("limit", String(params.limit))
  if (params?.category) qs.set("category", params.category)
  if (params?.search) qs.set("search", params.search)
  if (params?.featured !== undefined) qs.set("featured", String(params.featured))

  const query = qs.toString()
  const { data, meta } = await apiFetch<Product[]>(`/products${query ? `?${query}` : ""}`)

  return {
    products: data,
    meta: (meta as { pagination: ProductListMeta })?.pagination ?? {
      page: 1,
      limit: 20,
      total: data.length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  }
}

export async function getProduct(idOrSlug: string): Promise<Product> {
  "use cache"
  cacheLife("hours")

  const { data } = await apiFetch<Product>(`/products/${idOrSlug}`)
  return data
}
