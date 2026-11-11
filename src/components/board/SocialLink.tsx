import { Globe, ArrowUpRight } from 'lucide-react'
import {
  detectSocialPlatform,
  resolveSocialLinks,
  type SocialPlatform,
  type SocialInput,
} from './socialUtils'

interface IconProps {
  size?: number
  className?: string
}

export function InstagramIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function FacebookIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function LinkedInIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function TwitterXIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function YouTubeIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.86-4.47V8.71a8.21 8.21 0 0 0 4.91 1.63V6.89a4.83 4.83 0 0 1-1-.2z" />
    </svg>
  )
}

export function ThreadsIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 12a7 7 0 1 0-7 7c3 0 4.5-1.5 4.5-3.5 0-2.5-2-3.5-4.5-3.5-3 0-4 1.5-4 3s1 2.5 3 2.5c1.5 0 2.5-.5 3-1.5" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

export function BlueskyIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.737 1.5 3.518c0 2.217.478 11.45 1.06 13.067.75 2.08 3.328 2.656 5.56.924-2.482 1.77-3.056 4.707-.775 6.096 3.013 1.834 4.655-2.905 4.655-2.905s1.642 4.739 4.655 2.905c2.28-1.389 1.707-4.326-.775-6.096 2.232 1.732 4.81 1.156 5.56-.924.582-1.617 1.06-10.85 1.06-13.067 0-1.781-1.066-2.508-3.702-.713C16.046 4.747 13.087 8.686 12 10.8z" />
    </svg>
  )
}

export function GitHubIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export function WebIcon({ size = 16, className = '' }: IconProps) {
  return <Globe size={size} strokeWidth={2} className={className} aria-hidden="true" />
}

export function PlatformIcon({
  platform,
  size = 15,
}: {
  platform: SocialPlatform
  size?: number
}) {
  switch (platform) {
    case 'instagram':
      return <InstagramIcon size={size} />
    case 'facebook':
      return <FacebookIcon size={size} />
    case 'linkedin':
      return <LinkedInIcon size={size} />
    case 'twitter':
      return <TwitterXIcon size={size} />
    case 'youtube':
      return <YouTubeIcon size={size} />
    case 'tiktok':
      return <TikTokIcon size={size} />
    case 'threads':
      return <ThreadsIcon size={size} />
    case 'bluesky':
      return <BlueskyIcon size={size} />
    case 'github':
      return <GitHubIcon size={size} />
    case 'website':
    default:
      return <WebIcon size={size} />
  }
}

export function SocialLink({
  url,
  label: customLabel,
  platform: customPlatform,
  className = 'member-modal-social',
}: {
  url: string
  label?: string
  platform?: SocialPlatform
  className?: string
}) {
  const detected = detectSocialPlatform(url)
  const platform = customPlatform || detected.platform
  const label = customLabel?.trim() || detected.label
  const href = detected.href

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${label} profile`}
    >
      <PlatformIcon platform={platform} size={15} />
      <span>{label}</span>
      <ArrowUpRight size={13} style={{ opacity: 0.8 }} />
    </a>
  )
}

export function SocialLinks({
  urls,
  items,
  containerClassName = 'member-modal-social-links',
  linkClassName,
}: {
  urls?: SocialInput
  items?: SocialInput
  containerClassName?: string
  linkClassName?: string
}) {
  const list = resolveSocialLinks(urls ?? items)
  if (list.length === 0) return null

  return (
    <div className={containerClassName}>
      {list.map((item, idx) => (
        <SocialLink
          key={`${item.href}-${idx}`}
          url={item.url}
          label={item.label}
          platform={item.platform}
          className={linkClassName}
        />
      ))}
    </div>
  )
}
