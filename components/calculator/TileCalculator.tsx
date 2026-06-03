'use client'

import { useEffect, useMemo, useState } from 'react'
import { Plus, X, ChevronDown, Info } from 'lucide-react'

/**
 * TileFlow tile calculator — v0.
 * Greenlit spec: metric-only, generic (no catalogue connection), 10% base
 * wastage, lay-pattern-driven defaults, 15% large-format auto-bump, no
 * grout-gap input, no cost display.
 *
 * All maths run client-side; inputs persist in localStorage for the session.
 */

type Unit = 'm' | 'cm' | 'mm'
type ProjectType = 'floor' | 'wall'
type Pattern = 'straight' | 'brick' | 'herringbone' | 'diagonal' | 'large-format'

interface AreaRow {
  id: string
  length: string
  width: string
  unit: Unit
}

const PATTERN_LABEL: Record<Pattern, string> = {
  straight: 'Straight lay',
  brick: 'Brick bond',
  herringbone: 'Herringbone',
  diagonal: 'Diagonal',
  'large-format': 'Large format',
}

const PATTERN_WASTAGE: Record<Pattern, number> = {
  straight: 10,
  brick: 10,
  herringbone: 15,
  diagonal: 15,
  'large-format': 15,
}

// metres of area per 1 unit² (we convert each dimension to metres first instead)
const UNIT_TO_M: Record<Unit, number> = { m: 1, cm: 0.01, mm: 0.001 }

const STORAGE_KEY = 'tf-tile-calculator-v0'

let rowSeq = 0
function newRow(unit: Unit = 'm'): AreaRow {
  rowSeq += 1
  return { id: `r${rowSeq}`, length: '', width: '', unit }
}

function parseNum(v: string): number {
  const n = parseFloat(v)
  return Number.isFinite(n) && n > 0 ? n : 0
}

/** Area of one row in m² (0 if incomplete). */
function rowAreaM2(row: AreaRow): number {
  const l = parseNum(row.length) * UNIT_TO_M[row.unit]
  const w = parseNum(row.width) * UNIT_TO_M[row.unit]
  return l > 0 && w > 0 ? l * w : 0
}

function tradeTip(pattern: Pattern, packsKnown: boolean): string {
  if (pattern === 'herringbone' || pattern === 'diagonal') {
    return 'Diagonal and herringbone lays generate more offcuts — that 15% spare is doing real work, not padding the order.'
  }
  if (pattern === 'large-format') {
    return 'Large-format tiles break more often on the cut and on site. Keep the spare box sealed — a cracked slab two weeks in is a bad day without it.'
  }
  return packsKnown
    ? 'Order the spare and keep one full box back for repairs. Colour-batch matching is near impossible two years later.'
    : 'Always order about 10% over. Breakages, bad cuts, and future repairs all come out of that spare.'
}

export default function TileCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>('floor')
  const [areas, setAreas] = useState<AreaRow[]>([newRow('m')])
  const [obstacles, setObstacles] = useState<AreaRow[]>([])
  const [showObstacles, setShowObstacles] = useState(false)
  const [tileLength, setTileLength] = useState('')
  const [tileWidth, setTileWidth] = useState('')
  const [pattern, setPattern] = useState<Pattern>('straight')
  const [wastage, setWastage] = useState<number>(10)
  const [userSetWastage, setUserSetWastage] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // ── Restore from localStorage (once) ──────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const s = JSON.parse(raw)
        if (s.projectType) setProjectType(s.projectType)
        if (Array.isArray(s.areas) && s.areas.length) setAreas(s.areas)
        if (Array.isArray(s.obstacles)) setObstacles(s.obstacles)
        if (s.obstacles?.length) setShowObstacles(true)
        if (typeof s.tileLength === 'string') setTileLength(s.tileLength)
        if (typeof s.tileWidth === 'string') setTileWidth(s.tileWidth)
        if (s.pattern) setPattern(s.pattern)
        if (typeof s.wastage === 'number') setWastage(s.wastage)
        if (typeof s.userSetWastage === 'boolean') setUserSetWastage(s.userSetWastage)
      }
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true)
  }, [])

  // ── Net tiled area, recommended wastage, results ──────────────────────────
  const grossArea = useMemo(() => areas.reduce((sum, r) => sum + rowAreaM2(r), 0), [areas])
  const obstacleArea = useMemo(
    () => obstacles.reduce((sum, r) => sum + rowAreaM2(r), 0),
    [obstacles]
  )
  const netArea = Math.max(0, grossArea - obstacleArea)

  const tileLenMm = parseNum(tileLength)
  const tileWidMm = parseNum(tileWidth)
  const tileAreaM2 = tileLenMm > 0 && tileWidMm > 0 ? (tileLenMm / 1000) * (tileWidMm / 1000) : 0

  // Large-format auto-bump: tile ≥600mm on its longest edge AND room under 5m².
  const isLargeFormat = Math.max(tileLenMm, tileWidMm) >= 600
  const recommendedWastage = useMemo(() => {
    let base = PATTERN_WASTAGE[pattern]
    if (isLargeFormat && netArea > 0 && netArea < 5 && base < 15) base = 15
    return base
  }, [pattern, isLargeFormat, netArea])

  // Keep wastage synced to the recommendation until the user overrides it.
  useEffect(() => {
    if (!userSetWastage) setWastage(recommendedWastage)
  }, [recommendedWastage, userSetWastage])

  const effectiveWastage = userSetWastage ? wastage : recommendedWastage
  const areaToOrder = netArea * (1 + effectiveWastage / 100)
  const tilesNeeded = tileAreaM2 > 0 ? Math.ceil(areaToOrder / tileAreaM2) : 0
  const hasResult = netArea > 0 && tileAreaM2 > 0

  // ── Persist ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          projectType,
          areas,
          obstacles,
          tileLength,
          tileWidth,
          pattern,
          wastage,
          userSetWastage,
        })
      )
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [loaded, projectType, areas, obstacles, tileLength, tileWidth, pattern, wastage, userSetWastage])

  // ── Row helpers ───────────────────────────────────────────────────────────
  const updateRow = (
    list: AreaRow[],
    setList: (r: AreaRow[]) => void,
    id: string,
    patch: Partial<AreaRow>
  ) => setList(list.map(r => (r.id === id ? { ...r, ...patch } : r)))

  const fmt = (n: number) =>
    n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const labelUnit = projectType === 'floor' ? 'floor' : 'wall'

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
      {/* ── Inputs ──────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        {/* Project type */}
        <fieldset>
          <legend className="text-sm font-semibold text-[var(--tf-fg)] mb-3">What are you tiling?</legend>
          <div className="inline-flex rounded-full bg-stone-100 p-1" role="tablist" aria-label="Project type">
            {(['floor', 'wall'] as ProjectType[]).map(t => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={projectType === t}
                onClick={() => setProjectType(t)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${
                  projectType === t
                    ? 'bg-white text-[var(--tf-primary)] shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {t === 'floor' ? 'Floor' : 'Wall'}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Areas */}
        <fieldset>
          <legend className="text-sm font-semibold text-[var(--tf-fg)] mb-3">
            {projectType === 'floor' ? 'Floor area' : 'Wall area'}
          </legend>
          <div className="space-y-3">
            {areas.map((row, i) => (
              <div key={row.id} className="flex items-end gap-2">
                <Dim
                  label={i === 0 ? 'Length' : undefined}
                  value={row.length}
                  onChange={v => updateRow(areas, setAreas, row.id, { length: v })}
                  ariaLabel={`${labelUnit} area ${i + 1} length`}
                />
                <span className="pb-2.5 text-stone-400">×</span>
                <Dim
                  label={i === 0 ? 'Width' : undefined}
                  value={row.width}
                  onChange={v => updateRow(areas, setAreas, row.id, { width: v })}
                  ariaLabel={`${labelUnit} area ${i + 1} width`}
                />
                <UnitSelect
                  label={i === 0 ? 'Unit' : undefined}
                  value={row.unit}
                  onChange={u => updateRow(areas, setAreas, row.id, { unit: u })}
                  ariaLabel={`${labelUnit} area ${i + 1} unit`}
                />
                {areas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setAreas(areas.filter(r => r.id !== row.id))}
                    aria-label={`Remove area ${i + 1}`}
                    className="pb-1.5 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAreas([...areas, newRow(areas[areas.length - 1]?.unit ?? 'm')])}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:text-[var(--tf-primary-hover)]"
          >
            <Plus className="w-4 h-4" /> Add another area
          </button>
        </fieldset>

        {/* Obstacles */}
        <div>
          <button
            type="button"
            onClick={() => {
              setShowObstacles(v => !v)
              if (!showObstacles && obstacles.length === 0) setObstacles([newRow('m')])
            }}
            aria-expanded={showObstacles}
            className="flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-fg)]"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showObstacles ? 'rotate-180' : ''}`}
            />
            Doors, windows or units to subtract?
          </button>
          {showObstacles && (
            <div className="mt-3 space-y-3 border-l-2 border-stone-100 pl-4">
              {obstacles.map((row, i) => (
                <div key={row.id} className="flex items-end gap-2">
                  <Dim
                    label={i === 0 ? 'Length' : undefined}
                    value={row.length}
                    onChange={v => updateRow(obstacles, setObstacles, row.id, { length: v })}
                    ariaLabel={`Subtraction ${i + 1} length`}
                  />
                  <span className="pb-2.5 text-stone-400">×</span>
                  <Dim
                    label={i === 0 ? 'Width' : undefined}
                    value={row.width}
                    onChange={v => updateRow(obstacles, setObstacles, row.id, { width: v })}
                    ariaLabel={`Subtraction ${i + 1} width`}
                  />
                  <UnitSelect
                    label={i === 0 ? 'Unit' : undefined}
                    value={row.unit}
                    onChange={u => updateRow(obstacles, setObstacles, row.id, { unit: u })}
                    ariaLabel={`Subtraction ${i + 1} unit`}
                  />
                  <button
                    type="button"
                    onClick={() => setObstacles(obstacles.filter(r => r.id !== row.id))}
                    aria-label={`Remove subtraction ${i + 1}`}
                    className="pb-1.5 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setObstacles([...obstacles, newRow(obstacles[obstacles.length - 1]?.unit ?? 'm')])}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--tf-primary)] hover:text-[var(--tf-primary-hover)]"
              >
                <Plus className="w-4 h-4" /> Add another
              </button>
            </div>
          )}
        </div>

        {/* Tile size */}
        <fieldset>
          <legend className="text-sm font-semibold text-[var(--tf-fg)] mb-3">Tile size (mm)</legend>
          <div className="flex items-end gap-2">
            <Dim label="Length" value={tileLength} onChange={setTileLength} ariaLabel="Tile length in mm" suffix="mm" />
            <span className="pb-2.5 text-stone-400">×</span>
            <Dim label="Width" value={tileWidth} onChange={setTileWidth} ariaLabel="Tile width in mm" suffix="mm" />
          </div>
          <p className="mt-2 text-xs text-stone-400">
            Tile size is on the box — e.g. 600 × 600, 300 × 600, 200 × 250.
          </p>
        </fieldset>

        {/* Lay pattern + wastage */}
        <fieldset>
          <legend className="text-sm font-semibold text-[var(--tf-fg)] mb-3">Lay pattern</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PATTERN_LABEL) as Pattern[]).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPattern(p)}
                aria-pressed={pattern === p}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                  pattern === p
                    ? 'border-[var(--tf-primary)] bg-[var(--tf-sage-mist)] text-[var(--tf-primary)]'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                {PATTERN_LABEL[p]}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <label htmlFor="wastage" className="text-sm text-stone-600">
              Wastage
            </label>
            <input
              id="wastage"
              type="number"
              min={0}
              max={30}
              inputMode="numeric"
              value={effectiveWastage}
              onChange={e => {
                setUserSetWastage(true)
                setWastage(Math.max(0, Math.min(30, parseInt(e.target.value || '0', 10))))
              }}
              className="w-20 rounded-lg border border-stone-200 px-3 py-1.5 text-sm focus:border-[var(--tf-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--tf-primary)]"
            />
            <span className="text-sm text-stone-500">%</span>
            {userSetWastage && effectiveWastage !== recommendedWastage && (
              <button
                type="button"
                onClick={() => setUserSetWastage(false)}
                className="text-xs font-semibold text-[var(--tf-primary)] hover:underline"
              >
                Reset to {recommendedWastage}%
              </button>
            )}
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-xs text-stone-400">
            <Info className="w-3.5 h-3.5 mt-px shrink-0" />
            {recommendedWastage}% recommended for {PATTERN_LABEL[pattern].toLowerCase()}
            {isLargeFormat && netArea > 0 && netArea < 5 ? ' on a small large-format area' : ''}. Always your call.
          </p>
        </fieldset>
      </div>

      {/* ── Result card ─────────────────────────────────────────────────── */}
      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-[var(--tf-sage-mist)] px-6 py-4 border-b border-stone-200">
            <h2 className="font-display text-lg font-bold text-[var(--tf-fg)]">Your estimate</h2>
          </div>

          {!hasResult ? (
            <div className="px-6 py-8 text-sm text-stone-500">
              Enter your {labelUnit} measurements and a tile size to see how many tiles you need.
            </div>
          ) : (
            <div className="px-6 py-5 space-y-4">
              <Stat label={`Tiled area${obstacleArea > 0 ? ' (after subtractions)' : ''}`} value={`${fmt(netArea)} m²`} />
              <Stat label="Wastage applied" value={`${effectiveWastage}% — ${PATTERN_LABEL[pattern].toLowerCase()}`} sub />
              <Stat label="Area to order" value={`${fmt(areaToOrder)} m²`} />
              <div className="pt-3 border-t border-stone-100">
                <div className="text-3xl font-bold text-[var(--tf-primary)]">
                  {tilesNeeded.toLocaleString('en-GB')}
                </div>
                <div className="text-sm text-stone-500">tiles needed</div>
              </div>

              <div className="rounded-xl bg-stone-50 border border-stone-100 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">Trade tip</p>
                <p className="text-sm text-stone-600 leading-relaxed">{tradeTip(pattern, false)}</p>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed">
                An estimate, not a guarantee — measure twice, and check the box for the actual pack size before you
                order.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Small field primitives ──────────────────────────────────────────────────

function Dim({
  label,
  value,
  onChange,
  ariaLabel,
  suffix,
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  ariaLabel: string
  suffix?: string
}) {
  return (
    <div className="flex-1 min-w-0">
      {label && <span className="block text-xs text-stone-400 mb-1">{label}</span>}
      <div className="relative">
        <input
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label={ariaLabel}
          placeholder="0"
          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-[var(--tf-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--tf-primary)]"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function UnitSelect({
  label,
  value,
  onChange,
  ariaLabel,
}: {
  label?: string
  value: Unit
  onChange: (u: Unit) => void
  ariaLabel: string
}) {
  return (
    <div>
      {label && <span className="block text-xs text-stone-400 mb-1">{label}</span>}
      <select
        value={value}
        onChange={e => onChange(e.target.value as Unit)}
        aria-label={ariaLabel}
        className="rounded-lg border border-stone-200 px-2 py-2 text-sm bg-white focus:border-[var(--tf-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--tf-primary)]"
      >
        <option value="m">m</option>
        <option value="cm">cm</option>
        <option value="mm">mm</option>
      </select>
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={`text-sm ${sub ? 'text-stone-400' : 'text-stone-500'}`}>{label}</span>
      <span className={`font-semibold text-right ${sub ? 'text-sm text-stone-500' : 'text-[var(--tf-fg)]'}`}>
        {value}
      </span>
    </div>
  )
}
