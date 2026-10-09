import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const source = new URL(
  '../public/images/cover-discoveries-v2.png',
  import.meta.url,
)

for (const width of [480, 820, 1024]) {
  const output = new URL(
    `../public/images/cover-discoveries-v2-${width}.webp`,
    import.meta.url,
  )
  const result = await sharp(fileURLToPath(source))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(fileURLToPath(output))
  console.log(`${width}px: ${(result.size / 1024).toFixed(1)} KiB`)
}
