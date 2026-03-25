import type { Metadata } from "next"
import { HomePage } from "@/views/home"

export const metadata: Metadata = {
  title: "Home",
  description: "Shop the latest Vercel merch — hoodies, tees, bottles, and more.",
  openGraph: {
    title: "Vercel Swag Store",
    description: "Shop the latest Vercel merch.",
    url: "/",
  },
}

export default function Page() {
  return <HomePage />
}
