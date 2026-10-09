export function getGoogleSlidesSrc(
  iframeOrUrl?: string,
): string | null {
  const value = iframeOrUrl?.trim()
  console.log("🚀 ~ getGoogleSlidesSrc ~ value:", value)
  if (!value) return null

  const src = value.startsWith('<')
    ? new DOMParser()
      .parseFromString(value, 'text/html')
      .querySelector('iframe')
      ?.getAttribute('src')
    : value
  console.log("🚀 ~ getGoogleSlidesSrc ~ src:", src)
  if (!src) return null

  try {
    const url = new URL(src)

    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'docs.google.com' ||
      url.username ||
      url.password
    ) {
      return null
    }

    const validPath =
      /^\/presentation\/d\/(?:e\/)?[^/]+\/(?:embed|pubembed|preview|pub)\/?$/.test(
        url.pathname,
      )

    if (!validPath) {
      console.log('Invalid Google Slides path:', url.pathname)
      return null
    }

    return url.href
  } catch (error) {
    console.log('Invalid Google Slides URL:', error)
    return null
  }
}