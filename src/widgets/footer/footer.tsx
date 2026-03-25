export async function Footer() {
  "use cache"
  return (
    <footer className="border-border border-t py-6">
      <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} Vercel Swag Store. All rights reserved.
      </div>
    </footer>
  )
}
