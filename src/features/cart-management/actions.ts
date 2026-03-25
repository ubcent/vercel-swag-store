"use server"

import { revalidatePath } from "next/cache"
import { addCartItem, updateCartItem, removeCartItem } from "@/shared/api"
import { ApiError } from "@/shared/api"
import { getOrCreateCartToken, getCartToken, clearCartToken } from "./session"

export interface CartActionResult {
  success: boolean
  error?: string
}

function mapError(err: unknown): string {
  if (!(err instanceof ApiError)) return "Something went wrong. Please try again."
  switch (err.code) {
    case "NOT_FOUND":
      return "Product not found"
    case "VALIDATION_ERROR":
      return "Invalid quantity"
    case "BAD_REQUEST":
      return "Cart session expired. Please try again."
    default:
      return "Something went wrong. Please try again."
  }
}

export async function addToCart(productId: string, quantity: number): Promise<CartActionResult> {
  try {
    const token = await getOrCreateCartToken()
    await addCartItem(token, productId, quantity)
    revalidatePath("/cart")
    revalidatePath("/", "layout")
    return { success: true }
  } catch (err) {
    if (err instanceof ApiError && err.code === "BAD_REQUEST") {
      await clearCartToken()
    }
    return { success: false, error: mapError(err) }
  }
}

export async function updateCartItemQuantity(
  itemId: string,
  quantity: number,
): Promise<CartActionResult> {
  try {
    const token = await getCartToken()
    if (!token) return { success: false, error: "Cart session expired. Please try again." }

    await updateCartItem(token, itemId, quantity)
    revalidatePath("/cart")
    revalidatePath("/", "layout")
    return { success: true }
  } catch (err) {
    if (err instanceof ApiError && err.code === "BAD_REQUEST") {
      await clearCartToken()
    }
    return { success: false, error: mapError(err) }
  }
}

export async function removeFromCart(itemId: string): Promise<CartActionResult> {
  try {
    const token = await getCartToken()
    if (!token) return { success: false, error: "Cart session expired. Please try again." }

    await removeCartItem(token, itemId)
    revalidatePath("/cart")
    revalidatePath("/", "layout")
    return { success: true }
  } catch (err) {
    if (err instanceof ApiError && err.code === "BAD_REQUEST") {
      await clearCartToken()
    }
    return { success: false, error: mapError(err) }
  }
}
