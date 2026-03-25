export type ProductCategory =
  | "bottles"
  | "cups"
  | "mugs"
  | "desk"
  | "stationery"
  | "accessories"
  | "bags"
  | "hats"
  | "t-shirts"
  | "hoodies"
  | "socks"
  | "tech"
  | "books"

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  currency: string
  category: ProductCategory
  images: string[]
  featured: boolean
  tags: string[]
  createdAt: string
}

export interface ProductListMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface Stock {
  productId: string
  stock: number
  inStock: boolean
  lowStock: boolean
}
