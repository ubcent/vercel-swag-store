import { Suspense } from "react"
import { PromoBanner, PromoBannerSkeleton } from "@/widgets/promo-banner"
import { FeaturedProductsSection, ProductGridSkeleton } from "@/widgets/product-grid"
import { HeroSection } from "./hero-section"

export function HomePage() {
  return (
    <>
      <Suspense fallback={<PromoBannerSkeleton />}>
        <PromoBanner />
      </Suspense>
      <HeroSection />
      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <FeaturedProductsSection />
      </Suspense>
    </>
  )
}
