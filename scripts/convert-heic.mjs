/**
 * HEIC → WebP conversion using macOS sips (handles HEIC natively)
 * Falls back to sharp for JPG/PNG (for resize + WebP compression)
 */
import sharp from 'sharp'
import { readdir, mkdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'
import { execSync } from 'child_process'
import { existsSync } from 'fs'

const SOURCE = '/Users/Tileflowuk/Desktop/Tile flow work /insperational this is my work /'
const DEST = './public/images/inspiration/'
const TMP = '/tmp/heic-convert-tmp/'

await mkdir(DEST, { recursive: true })
await mkdir(TMP, { recursive: true })

const files = await readdir(SOURCE)
const imageFiles = files.filter(f =>
  /\.(heic|HEIC|jpg|JPG|jpeg|JPEG|png|PNG)$/i.test(f) && !f.startsWith('.')
)

console.log(`Converting ${imageFiles.length} images to WebP...`)

let success = 0
let failed = 0

for (const file of imageFiles) {
  const ext = extname(file).toLowerCase()
  const slugName = basename(file, extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  const outPath = join(DEST, `${slugName}.webp`)
  const srcPath = join(SOURCE, file)

  try {
    if (ext === '.heic') {
      // Step 1: sips converts HEIC → JPEG to tmp
      const tmpJpeg = join(TMP, `${slugName}.jpg`)
      execSync(`sips -s format jpeg "${srcPath}" --out "${tmpJpeg}" --resampleWidth 1920 2>/dev/null`, {
        stdio: 'pipe'
      })
      // Step 2: sharp converts JPEG → WebP
      await sharp(tmpJpeg)
        .webp({ quality: 85 })
        .toFile(outPath)
      // Clean up tmp
      await unlink(tmpJpeg).catch(() => {})
    } else {
      // JPG/PNG: sharp handles directly
      await sharp(srcPath)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outPath)
    }
    success++
    console.log(`✓ ${file} → ${slugName}.webp`)
  } catch (e) {
    failed++
    console.error(`✗ ${file}: ${e.message}`)
  }
}

console.log(`\nDone! ${success} converted, ${failed} failed.`)
console.log('WebP files:', (await readdir(DEST)).filter(f => f.endsWith('.webp')).join(', '))
