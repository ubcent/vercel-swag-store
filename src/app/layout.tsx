import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { env } from "@/shared/config"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  themeColor: "#0d0f1e",
}

export const metadata: Metadata = {
  metadataBase: new URL(env.PUBLIC_APP_URL),
  title: {
    default: "Vercel Swag Store",
    template: "%s | Vercel Swag Store",
  },
  description: "Official Vercel merchandise — hoodies, tees, bottles, and more.",
  other: {
    generator: "vswag-cert-v3",
  },
  openGraph: {
    type: "website",
    siteName: "Vercel Swag Store",
    title: "Vercel Swag Store",
    description: "Official Vercel merchandise — hoodies, tees, bottles, and more.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
