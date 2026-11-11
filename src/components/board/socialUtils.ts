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

export interface SocialLinkItemObject {
  url: string
  label?: string
}

export type SocialLinkItem = string | SocialLinkItemObject

export type SocialInput =
  | SocialLinkItem
  | SocialLinkItem[]
  | null
  | undefined

export interface ResolvedSocialLink {
  url: string
  href: string
  label: string
  platform: SocialPlatform
}

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

export function extractSocialHandle(
  url: string,
  platform: SocialPlatform
): string | null {
  const href = normalizeSocialUrl(url)
  try {
    const parsed = new URL(href)
    const pathname = parsed.pathname.replace(/^\/+|\/+$/g, '')
    if (!pathname) return null

    const segments = pathname.split('/').filter(Boolean)
    const first = segments[0]
    if (!first) return null

    switch (platform) {
      case 'instagram': {
        const reserved = new Set([
          'p',
          'reel',
          'reels',
          'stories',
          'explore',
          'accounts',
          'direct',
          'tv',
          'about',
          'developer',
          'legal',
        ])
        if (!reserved.has(first.toLowerCase())) {
          return `@${first}`
        }
        return null
      }
      case 'twitter': {
        const reserved = new Set([
          'home',
          'explore',
          'notifications',
          'messages',
          'i',
          'search',
          'intent',
          'share',
          'tos',
          'privacy',
        ])
        if (!reserved.has(first.toLowerCase())) {
          return `@${first.replace(/^@/, '')}`
        }
        return null
      }
      case 'threads': {
        return first.startsWith('@') ? first : `@${first}`
      }
      case 'tiktok': {
        return first.startsWith('@') ? first : `@${first}`
      }
      case 'bluesky': {
        if (first === 'profile' && segments[1]) {
          return `@${segments[1].replace(/^@/, '')}`
        }
        return `@${first.replace(/^@/, '')}`
      }
      case 'github': {
        const reserved = new Set(['orgs', 'features', 'pricing', 'enterprise', 'about'])
        if (!reserved.has(first.toLowerCase())) {
          return `@${first}`
        }
        return null
      }
      case 'youtube': {
        if (first.startsWith('@')) return first
        if ((first === 'c' || first === 'channel' || first === 'user') && segments[1]) {
          return `@${segments[1]}`
        }
        return null
      }
      case 'linkedin': {
        if ((first === 'in' || first === 'company') && segments[1]) {
          return segments[1]
        }
        return null
      }
      case 'website': {
        return parsed.hostname.toLowerCase().replace(/^www\./, '')
      }
      default:
        return null
    }
  } catch {
    return null
  }
}

/**
 * Parses a single string input which might contain:
 * 1. Markdown link(s): `[Label](url)`
 * 2. Labeled link(s): `Label: https://...`
 * 3. Delimited URLs: separated by newlines, commas, semicolons, or whitespace
 */
function parseStringLinks(raw: string): SocialLinkItemObject[] {
  const trimmed = raw.trim()
  if (!trimmed) return []

  // Check for markdown links: [Label](url)
  const mdRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const mdMatches = Array.from(trimmed.matchAll(mdRegex))
  if (mdMatches.length > 0) {
    return mdMatches.map((m) => ({
      label: m[1].trim(),
      url: m[2].trim(),
    }))
  }

  // Split lines / semicolon chunks
  const chunks = trimmed.split(/[\r\n;]+/).map((s) => s.trim()).filter(Boolean)
  const result: SocialLinkItemObject[] = []

  for (const chunk of chunks) {
    // Check for "Label: https://..." or "Label: www..."
    const labeledMatch = chunk.match(/^([^:]+):\s*(https?:\/\/.+|\S+\.\S+.*)$/)
    if (labeledMatch && !labeledMatch[1].startsWith('http')) {
      result.push({
        label: labeledMatch[1].trim(),
        url: labeledMatch[2].trim(),
      })
      continue
    }

    // Comma-separated URLs inside a line
    if (chunk.includes(',')) {
      const parts = chunk.split(',').map((s) => s.trim()).filter(Boolean)
      for (const p of parts) {
        result.push({ url: p })
      }
      continue
    }

    // Space-separated URLs inside a line (e.g. "https://a https://b")
    const tokens = chunk.split(/\s+/).filter(Boolean)
    if (tokens.length > 1 && tokens.every((t) => t.includes('.') || t.startsWith('http'))) {
      for (const t of tokens) {
        result.push({ url: t })
      }
      continue
    }

    result.push({ url: chunk })
  }

  return result
}

/**
 * Parses any supported social input into a flat list of `{ url, label? }`.
 */
export function parseSocialLinks(input: SocialInput): SocialLinkItemObject[] {
  if (!input) return []

  if (Array.isArray(input)) {
    return input.flatMap((item) => {
      if (!item) return []
      if (typeof item === 'string') {
        return parseStringLinks(item)
      }
      if (typeof item === 'object' && item.url) {
        return [{ url: item.url.trim(), label: item.label?.trim() || undefined }]
      }
      return []
    })
  }

  if (typeof input === 'string') {
    return parseStringLinks(input)
  }

  if (typeof input === 'object' && input.url) {
    return [{ url: input.url.trim(), label: input.label?.trim() || undefined }]
  }

  return []
}

/**
 * Resolves social links into fully typed items ready for display,
 * including platform icon detection and smart handle/domain fallback
 * when multiple links share the same platform.
 */
export function resolveSocialLinks(input: SocialInput): ResolvedSocialLink[] {
  const parsedItems = parseSocialLinks(input)
  if (parsedItems.length === 0) return []

  const detected = parsedItems.map((item) => {
    const info = detectSocialPlatform(item.url)
    const handle = extractSocialHandle(item.url, info.platform)
    return {
      rawUrl: item.url,
      href: info.href,
      platform: info.platform,
      defaultLabel: info.label,
      customLabel: item.label?.trim() || null,
      handle,
    }
  })

  // Count occurrences of platform when no custom label is provided
  const platformCounts: Record<string, number> = {}
  for (const d of detected) {
    if (!d.customLabel) {
      platformCounts[d.platform] = (platformCounts[d.platform] || 0) + 1
    }
  }

  return detected.map((d) => {
    let finalLabel = d.customLabel

    if (!finalLabel) {
      const hasDuplicatePlatform = (platformCounts[d.platform] || 0) > 1

      if (hasDuplicatePlatform && d.handle) {
        finalLabel = d.handle
      } else if (d.platform === 'website' && d.handle && detected.length > 1) {
        finalLabel = d.handle
      } else {
        finalLabel = d.defaultLabel
      }
    }

    return {
      url: d.rawUrl,
      href: d.href,
      label: finalLabel,
      platform: d.platform,
    }
  })
}

export function splitSocialUrls(raw: string): string[] {
  if (!raw || !raw.trim()) return []
  return parseSocialLinks(raw).map((item) => item.url)
}
