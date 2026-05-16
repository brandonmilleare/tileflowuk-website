import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Tile } from '@/data/tiles'

interface TileCardProps {
  tile: Tile
  priority?: boolean
}

export default function TileCard({ tile, priority = false }: TileCardProps) {
  return (
    <article className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col">
      <Link
        href={`/tiles/${tile.slug}`}
        aria-label={`${tile.name} — ${tile.style}, ${tile.size}, ${tile.price}. View full details and order.`}
        className="relative block aspect-[4/3] bg-stone-50 overflow-hidden"
      >
        <Image
          src={tile.images[0]}
          alt={`${tile.name} — ${tile.style} from the Wex range at TileFlow UK`}
          fill
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--tf-ink)] text-white shadow-sm uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          In Stock
        </span>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-medium text-[var(--tf-accent)] uppercase tracking-wider mb-1">
          {tile.range} Range · {tile.size}
        </p>
        <h3 className="font-semibold text-[var(--tf-fg)] leading-snug mb-1">
          <Link
            href={`/tiles/${tile.slug}`}
            className="hover:text-[var(--tf-primary)] transition-colors"
          >
            {tile.name}
          </Link>
        </h3>
        <p className="text-sm text-stone-500 mb-4">{tile.style}</p>

        <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="text-base font-bold text-[var(--tf-primary)]">{tile.price}</span>
          <Link
            href={`/tiles/${tile.slug}`}
            aria-label={`Buy or enquire about ${tile.name} ${tile.style} ${tile.size}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[var(--tf-primary)] text-white text-xs font-semibold rounded-full hover:bg-[var(--tf-primary-hover)] transition-colors"
          >
            Buy / Enquire
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}
