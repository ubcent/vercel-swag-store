import { env } from "@/shared/config"
import type { ApiCart } from "@/entities/cart"
import { apiFetch } from "./client"

export async function createCart(): Promise<string> {
  const res = await fetch(`${env.API_BASE_URL}/cart/create`, {
    method: "POST",
    headers: {
      "x-vercel-protection-bypass": env.API_BYPASS_TOKEN,
    },
    cache: "no-store",
  })

  const token = res.headers.get("x-cart-token")
  if (!token) throw new Error("Cart creation failed: no x-cart-token in response headers")
  return token
}

export async function getCart(token: string): Promise<ApiCart> {
  const { data } = await apiFetch<ApiCart>("/cart", {
    cache: "no-store",
    headers: { "x-cart-token": token },
  })
  return data
}

export async function addCartItem(
  token: string,
  productId: string,
  quantity: number,
): Promise<ApiCart> {
  const { data } = await apiFetch<ApiCart>("/cart", {
    method: "POST",
    cache: "no-store",
    headers: { "x-cart-token": token },
    body: JSON.stringify({ productId, quantity }),
  })
  return data
}

export async function updateCartItem(
  token: string,
  itemId: string,
  quantity: number,
): Promise<ApiCart> {
  const { data } = await apiFetch<ApiCart>(`/cart/${itemId}`, {
    method: "PATCH",
    cache: "no-store",
    headers: { "x-cart-token": token },
    body: JSON.stringify({ quantity }),
  })
  return data
}

export async function removeCartItem(token: string, itemId: string): Promise<ApiCart> {
  const { data } = await apiFetch<ApiCart>(`/cart/${itemId}`, {
    method: "DELETE",
    cache: "no-store",
    headers: { "x-cart-token": token },
  })
  return data
}
