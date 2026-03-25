import type { Metadata } from "next"
import { getProduct, getProducts } from "@/shared/api"
import { ProductPage } from "@/views/product"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { products } = await getProducts({ limit: 100 })
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProduct(slug)
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images[0] ? [{ url: product.images[0] }] : [],
      },
    }
  } catch {
    return { title: "Product" }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <ProductPage slug={slug} />
}
