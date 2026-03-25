import { cookies } from "next/headers"
import { createCart } from "@/shared/api"

const CART_COOKIE = "cart-token"
export const CART_COOKIE_MAX_AGE = 60 * 60 * 24 // 24h

export async function getCartToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(CART_COOKIE)?.value ?? null
}

export async function getOrCreateCartToken(): Promise<string> {
  const existing = await getCartToken()
  if (existing) return existing

  const token = await createCart()
  await setCartToken(token)
  return token
}

export async function clearCartToken(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("cart-token")
}

export async function setCartToken(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(CART_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: CART_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  })
}
