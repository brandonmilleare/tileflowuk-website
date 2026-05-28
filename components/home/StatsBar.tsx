'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

const stats = [
  { value: 15, suffix: '+', label: 'Years on the Tools' },
  { value: 17, suffix: '', label: 'Tools Reviewed' },
  { value: 18, suffix: '', label: 'Portfolio Projects' },
  { value: 5, suffix: '★', label: 'Star Rated by Clients' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  // Initialise to the real target so the server-rendered HTML shows the true
  // number (15, 17, 18, 5) — not 0. Google + AI crawlers read the SSR output,
  // and "0 years on the tools" was an E-E-A-T own-goal. On the client we reset
  // to 0 and animate up when the bar scrolls into view (progressive enhancement).
  const [count, setCount] = useState(target)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    const raf = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <section className="bg-[var(--tf-trust)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/20">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col items-center text-center lg:px-8">
              <dt className="text-4xl font-bold font-display mb-1">
                <CountUp target={value} suffix={suffix} />
              </dt>
              <dd className="text-sm text-blue-100 font-medium">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
