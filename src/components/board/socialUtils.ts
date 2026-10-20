export type SocialPlatform =
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'tiktok'
  | 'threads'
  | 'bluesky'
  | 'github'
  | 'website'

export function normalizeSocialUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim()
  return trimmed.startsWith('http://') || trimmed.startsWith('https://')
    ? trimmed
    : `https://${trimmed}`
}

export function detectSocialPlatform(url: string): {
  platform: SocialPlatform
  label: string
  href: string
} {
  const href = normalizeSocialUrl(url)
  try {
    const parsed = new URL(href)
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '')

    if (
      hostname === 'instagram.com' ||
      hostname.endsWith('.instagram.com') ||
      hostname === 'instagr.am'
    ) {
      return { platform: 'instagram', label: 'Instagram', href }
    }
    if (
      hostname === 'facebook.com' ||
      hostname.endsWith('.facebook.com') ||
      hostname === 'fb.com' ||
      hostname === 'fb.me'
    ) {
      return { platform: 'facebook', label: 'Facebook', href }
    }
    if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) {
      return { platform: 'linkedin', label: 'LinkedIn', href }
    }
    if (
      hostname === 'twitter.com' ||
      hostname.endsWith('.twitter.com') ||
      hostname === 'x.com' ||
      hostname.endsWith('.x.com')
    ) {
      return { platform: 'twitter', label: 'X (Twitter)', href }
    }
    if (
      hostname === 'youtube.com' ||
      hostname.endsWith('.youtube.com') ||
      hostname === 'youtu.be'
    ) {
      return { platform: 'youtube', label: 'YouTube', href }
    }
    if (hostname === 'tiktok.com' || hostname.endsWith('.tiktok.com')) {
      return { platform: 'tiktok', label: 'TikTok', href }
    }
    if (hostname === 'threads.net' || hostname.endsWith('.threads.net')) {
      return { platform: 'threads', label: 'Threads', href }
    }
    if (hostname === 'bsky.app' || hostname.endsWith('.bsky.app')) {
      return { platform: 'bluesky', label: 'Bluesky', href }
    }
    if (hostname === 'github.com' || hostname.endsWith('.github.com')) {
      return { platform: 'github', label: 'GitHub', href }
    }

    return { platform: 'website', label: 'Website', href }
  } catch {
    return { platform: 'website', label: 'Website', href }
  }
}

export function splitSocialUrls(raw: string): string[] {
  if (!raw || !raw.trim()) return []
  return raw
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}
