import { cacheLife } from "next/cache"
import { getActivePromotion } from "@/shared/api"
import { Badge } from "@/shared/ui"

export async function PromoBanner() {
  "use cache"
  cacheLife("minutes")

  const promotion = await getActivePromotion()
  if (!promotion) return null

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 py-3 text-center sm:flex-row">
        {promotion.code && (
          <Badge variant="secondary" className="shrink-0 font-mono text-xs">
            {promotion.code}
          </Badge>
        )}
        <p className="text-sm font-medium">
          {promotion.title} — {promotion.description}
        </p>
      </div>
    </div>
  )
}
