import Link from "next/link"
import { Button } from "@/shared/ui"

export function HeroSection() {
  return (
    <section className="border-border relative overflow-hidden border-b">
      {/* indigo glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, oklch(0.62 0.24 264 / 0.18), transparent)",
        }}
      />

      <div className="relative container mx-auto flex flex-col items-center gap-6 px-4 py-24 text-center md:py-36">
        <div className="border-border bg-muted text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs tracking-widest uppercase">
          <span className="bg-primary size-1.5 rounded-full" />
          Official Vercel Merchandise
        </div>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Build. Ship.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.18 264), oklch(0.62 0.24 240))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Swag.
          </span>
        </h1>

        <p className="text-muted-foreground max-w-md text-base sm:text-lg">
          Premium developer apparel, accessories, and gear for those who ship.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/search">Shop All Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/search?category=hoodies">Browse Hoodies</Link>
          </Button>
        </div>

        <div className="border-border bg-card divide-border mt-4 grid grid-cols-3 divide-x rounded-lg border text-center text-sm">
          <div className="px-8 py-4">
            <p className="font-semibold">31+</p>
            <p className="text-muted-foreground text-xs">Products</p>
          </div>
          <div className="px-8 py-4">
            <p className="font-semibold">13</p>
            <p className="text-muted-foreground text-xs">Categories</p>
          </div>
          <div className="px-8 py-4">
            <p className="font-semibold">Free</p>
            <p className="text-muted-foreground text-xs">Returns</p>
          </div>
        </div>
      </div>
    </section>
  )
}
