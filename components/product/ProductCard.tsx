import Image from 'next/image'
import Link from 'next/link'
import { Star, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const fullStars = Math.floor(product.rating)
  const hasHalf = product.rating % 1 >= 0.5

  return (
    <article className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] bg-stone-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3">
            <Badge
              className={`text-xs font-semibold px-2.5 py-1 ${
                product.badge === 'Best Seller'
                  ? 'bg-amber-500 text-white border-0'
                  : product.badge === 'Best Value'
                    ? 'bg-green-600 text-white border-0'
                    : product.badge === "Editor's Pick"
                      ? 'bg-[var(--tf-primary)] text-white border-0'
                      : product.badge === 'Pro Choice'
                        ? 'bg-purple-600 text-white border-0'
                        : 'bg-orange-500 text-white border-0'
              }`}
            >
              {product.badge}
            </Badge>
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-medium text-[var(--tf-accent)] uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-semibold text-[var(--tf-fg)] leading-snug mb-2 line-clamp-2 flex-1">
          <Link href={`/shop/${product.slug}`} className="hover:text-[var(--tf-primary)] transition-colors">
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < fullStars
                    ? 'fill-amber-400 text-amber-400'
                    : i === fullStars && hasHalf
                      ? 'fill-amber-200 text-amber-400'
                      : 'text-stone-200 fill-stone-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-stone-500">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
          <div>
            <span className="font-bold text-[var(--tf-fg)]">
              {product.priceNote ? product.priceNote : `£${product.price.toLocaleString('en-GB')}`}
            </span>
          </div>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[var(--tf-accent)] text-white text-xs font-semibold rounded-full hover:bg-orange-600 transition-colors"
          >
            Amazon
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  )
}
