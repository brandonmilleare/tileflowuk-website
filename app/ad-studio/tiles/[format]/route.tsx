import { ImageResponse } from 'next/og'

export const dynamic = 'force-dynamic'

type Format = 'pinterest' | 'instagram-portrait' | 'instagram-square' | 'tiktok'

const FORMATS: Record<Format, { width: number; height: number; label: string }> = {
  pinterest: { width: 1000, height: 1500, label: 'Pinterest 2:3' },
  'instagram-portrait': { width: 1080, height: 1350, label: 'Instagram 4:5' },
  'instagram-square': { width: 1080, height: 1080, label: 'Instagram 1:1' },
  tiktok: { width: 1080, height: 1920, label: 'TikTok 9:16' },
}

const HOOKS: Record<Format, { eyebrow: string; headline: string; sub: string }> = {
  pinterest: {
    eyebrow: 'Coming soon',
    headline: 'The tile range every UK bathroom will want in 2026.',
    sub: '7 tiles. Early access open.',
  },
  'instagram-portrait': {
    eyebrow: 'Pre-launch',
    headline: '7 tiles. One UK range. Dropping soon.',
    sub: 'Picked by a UK tiler.',
  },
  'instagram-square': {
    eyebrow: 'Early access',
    headline: 'The 2026 tile drop.',
    sub: '7 new tiles. First-pick list open.',
  },
  tiktok: {
    eyebrow: 'POV',
    headline: 'You just found THE 2026 tile range.',
    sub: '7 tiles. Link below.',
  },
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ format: string }> },
) {
  const { format } = await ctx.params
  const cfg = FORMATS[format as Format]
  if (!cfg) return new Response('Unknown format', { status: 404 })

  const hook = HOOKS[format as Format]
  const origin = new URL(req.url).origin

  const tileImages = [
    `${origin}/images/tiles/wex-quartz-jade.jpg`,
    `${origin}/images/tiles/wex-delphi.jpg`,
    `${origin}/images/tiles/wex-flurry.jpg`,
    `${origin}/images/tiles/wex-linsey.jpg`,
  ]

  const topBandH = Math.round(cfg.height * 0.09)
  const bottomBandH = Math.round(cfg.height * 0.26)
  const gridH = cfg.height - topBandH - bottomBandH
  const rowH = Math.round(gridH / 2)
  const colW = Math.round(cfg.width / 2)

  const titleSize = cfg.width >= 1080 ? (hook.headline.length > 40 ? 80 : 104) : 72
  const eyebrowSize = cfg.width >= 1080 ? 28 : 22
  const ctaSize = cfg.width >= 1080 ? 44 : 34
  const brandSize = cfg.width >= 1080 ? 40 : 32
  const pad = cfg.width >= 1080 ? 60 : 44

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#4d7c66',
          fontFamily: 'serif',
        }}
      >
        {/* Top sage band — brand + coming soon */}
        <div
          style={{
            height: topBandH,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${pad}px`,
            background: '#4d7c66',
            color: 'white',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: topBandH * 0.55,
                height: topBandH * 0.55,
                background: 'white',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4d7c66',
                fontSize: topBandH * 0.36,
                fontWeight: 800,
              }}
            >
              T
            </div>
            <div style={{ fontSize: brandSize, fontWeight: 700, letterSpacing: -0.5 }}>
              TileFlow UK
            </div>
          </div>
          <div
            style={{
              fontSize: eyebrowSize,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.18)',
              padding: '8px 18px',
              borderRadius: 999,
            }}
          >
            {hook.eyebrow}
          </div>
        </div>

        {/* 2 x 2 photo grid — full bleed, no gaps */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: cfg.width,
            height: gridH,
          }}
        >
          <div style={{ display: 'flex', height: rowH, width: cfg.width }}>
            <img
              src={tileImages[0]}
              alt=""
              width={colW}
              height={rowH}
              style={{ width: colW, height: rowH, objectFit: 'cover', display: 'block' }}
            />
            <img
              src={tileImages[1]}
              alt=""
              width={cfg.width - colW}
              height={rowH}
              style={{
                width: cfg.width - colW,
                height: rowH,
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          <div style={{ display: 'flex', height: gridH - rowH, width: cfg.width }}>
            <img
              src={tileImages[2]}
              alt=""
              width={colW}
              height={gridH - rowH}
              style={{
                width: colW,
                height: gridH - rowH,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <img
              src={tileImages[3]}
              alt=""
              width={cfg.width - colW}
              height={gridH - rowH}
              style={{
                width: cfg.width - colW,
                height: gridH - rowH,
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Bottom sage block — hook + CTA, no blank space */}
        <div
          style={{
            height: bottomBandH,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: `0 ${pad}px`,
            background: '#4d7c66',
            color: 'white',
            borderTop: '6px solid #ea580c',
          }}
        >
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -1.5,
              marginBottom: 14,
            }}
          >
            {hook.headline}
          </div>
          <div
            style={{
              fontSize: ctaSize,
              fontWeight: 700,
              color: '#ffe8d4',
              letterSpacing: -0.3,
            }}
          >
            tileflowuk.com/tiles
          </div>
        </div>
      </div>
    ),
    { width: cfg.width, height: cfg.height },
  )
}
