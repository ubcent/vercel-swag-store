import { Suspense } from "react"
import Link from "next/link"
import { CartIndicator } from "./cart-indicator"
import { CartBadgeSkeleton } from "./cart-badge-skeleton"

export function Header() {
  return (
    <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" aria-label="Vercel Swag Store" className="flex items-center gap-2">
          <span className="bg-primary flex size-6 items-center justify-center rounded text-xs font-bold text-white">
            V
          </span>
          <span className="text-sm font-semibold tracking-tight">Swag Store</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/search"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Search
          </Link>
        </nav>

        <Suspense fallback={<CartBadgeSkeleton />}>
          <CartIndicator />
        </Suspense>
      </div>
    </header>
  )
}
