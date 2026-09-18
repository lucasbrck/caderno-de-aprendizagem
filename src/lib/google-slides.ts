/** Read only the embed URL; the supplied HTML is never inserted into the page. */
export function getGoogleSlidesSrc(iframeOrUrl?: string): string | null {
  const value = iframeOrUrl?.trim()
  if (!value) return null

  const src = value.startsWith('<')
    ? new DOMParser()
        .parseFromString(value, 'text/html')
        .querySelector('iframe')
        ?.getAttribute('src')
    : value

  if (!src) return null

  try {
    const url = new URL(src)
    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'docs.google.com' ||
      url.username ||
      url.password ||
      !/^\/presentation\/d\/(?:e\/)?[^/]+\/(?:embed|pubembed|preview)\/?$/.test(
        url.pathname,
      )
    ) {
      return null
    }
    return url.href
  } catch {
    return null
  }
}
