export function normalizePath(path: string): string {
  const withoutFile = path.replace(/\.html$/, '')
  const withoutIndex = withoutFile.replace(/\/index$/, '')
  const withoutSlash = withoutIndex.replace(/\/$/, '')

  return withoutSlash || '/'
}
