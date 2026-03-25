import type { Product } from "@/entities/product"

export interface ApiCartItem {
  productId: string
  quantity: number
  addedAt: string
  product: Product
  lineTotal: number
}

export interface ApiCart {
  token: string
  items: ApiCartItem[]
  totalItems: number
  subtotal: number
  currency: string
  createdAt: string
  updatedAt: string
}
