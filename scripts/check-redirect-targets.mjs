import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const redirectsFile = join(process.cwd(), 'public/_redirects')

function isExternalOrDynamic(target) {
  return (
    target.startsWith('http://') ||
    target.startsWith('https://') ||
    target.includes('*') ||
    /:[A-Za-z]/.test(target)
  )
}

function candidatePaths(target) {
  const normalized = target.replace(/\/$/, '') || '/'

  if (normalized === '/') {
    return [join(distDir, 'index.html')]
  }

  const relative = normalized.slice(1)

  return [
    join(distDir, relative),
    join(distDir, `${relative}.html`),
    join(distDir, relative, 'index.html'),
  ]
}

function targetExists(target) {
  if (isExternalOrDynamic(target)) {
    return true
  }

  return candidatePaths(target).some((filePath) => existsSync(filePath))
}

const missing = []

for (const line of readFileSync(redirectsFile, 'utf8').split('\n')) {
  const trimmed = line.trim()

  if (!trimmed || trimmed.startsWith('#')) {
    continue
  }

  const columns = trimmed.split(/\s+/)

  if (columns.length < 2) {
    continue
  }

  const target = columns[1]

  if (!targetExists(target)) {
    missing.push(trimmed)
  }
}

if (missing.length > 0) {
  console.error('Redirect targets missing from dist/:')

  for (const rule of missing) {
    console.error(`  ${rule}`)
  }

  process.exit(1)
}

console.log('All redirect targets exist in dist/.')
