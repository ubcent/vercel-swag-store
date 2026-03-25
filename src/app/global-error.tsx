"use client"

import { Geist } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

interface GlobalErrorProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function GlobalError({ error, unstable_retry }: GlobalErrorProps) {
  return (
    <html lang="en" className={`${geistSans.variable} dark antialiased`}>
      <body className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center">
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
          <h1 className="text-2xl font-semibold">Critical error</h1>
          <p className="text-muted-foreground max-w-sm text-sm">
            The application encountered a fatal error.
          </p>
          {error.digest && (
            <p className="text-muted-foreground font-mono text-xs">Error ID: {error.digest}</p>
          )}
        </div>
        <button
          onClick={unstable_retry}
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
        >
          Try again
        </button>
      </body>
    </html>
  )
}
