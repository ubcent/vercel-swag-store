"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/shared/ui"

interface ErrorProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p
        className="text-8xl font-bold tracking-tight"
        style={{
          background: "linear-gradient(135deg, oklch(0.78 0.18 264), oklch(0.62 0.24 240))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        500
      </p>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground max-w-sm">
          An unexpected error occurred. Please try again or go back home.
        </p>
        {error.digest && (
          <p className="text-muted-foreground font-mono text-xs">Error ID: {error.digest}</p>
        )}
      </div>
      <div className="flex gap-3">
        <Button onClick={unstable_retry}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
