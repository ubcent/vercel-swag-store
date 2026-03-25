import type { Metadata } from "next"
import { SearchPage } from "@/views/search"

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Vercel Swag Store catalog.",
}

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { q, category } = await searchParams
  return <SearchPage q={q} category={category} />
}
