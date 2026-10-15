import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  ShoppingBasket,
  Snail,
  Sprout,
} from 'lucide-react'
import {
  SNAIL_OF_APPROVAL_URL,
  ARK_OF_TASTE_URL,
} from './constants'

export type InitiativeColor = 'orange' | 'red' | 'forest' | 'sage'

export interface InitiativeItem {
  number: string
  title: string
  tagline: string
  description: string
  color: InitiativeColor
  icon: LucideIcon
  status: string
  href: string
  external: boolean
}

export interface InitiativeColorScheme {
  bg: string
  accent: string
  dark: string
  badge: string
  badgeText: string
}

export const initiatives: InitiativeItem[] = [
  {
    number: '01',
    title: 'Pantry Swap',
    tagline: 'Share what you have. Take what you need.',
    description:
      'Pantry Swap is a community-led food exchange that reduces waste and builds neighborhood connection. Members bring shelf-stable goods, pantry staples, and homegrown produce to trade—no money, no judgment, just good food shared generously.',
    color: 'orange',
    icon: ShoppingBasket,
    status: 'Active',
    href: '/initiatives/pantry-swap',
    external: false,
  },
  {
    number: '02',
    title: 'Snail of Approval',
    tagline: "Recognizing Chicago's good food makers.",
    description:
      "The Snail of Approval is Slow Food's hallmark of quality and integrity. We work with local restaurants, producers, and markets to identify those who source responsibly, treat workers fairly, and cook with honesty. Look for the snail—it means something.",
    color: 'red',
    icon: Snail,
    status: 'Active',
    href: SNAIL_OF_APPROVAL_URL,
    external: true,
  },
  {
    number: '03',
    title: 'Midwest Ark of Taste',
    tagline: 'Preserving flavors before they disappear.',
    description:
      'The Ark of Taste is a living catalog of endangered foods—heirloom vegetables, heritage breeds, traditional recipes, and artisan products at risk of being lost. We document and champion Midwestern foods worth saving, from Illinois native varieties to regional foodways.',
    color: 'forest',
    icon: BookOpen,
    status: 'Active',
    href: ARK_OF_TASTE_URL,
    external: true,
  },
  {
    number: '04',
    title: 'preSERVE Garden',
    tagline: 'Growing food and community together.',
    description:
      'The preSERVE community garden project is a partnership between Slow Food Chicago, the North Lawndale Greening Committee, the Chicago Honey Co-Op, and NeighborSpace.',
    color: 'sage',
    icon: Sprout,
    status: 'Active',
    href: '/initiatives/preserve-garden',
    external: false,
  },
]

export const initiativeColorMap: Record<InitiativeColor, InitiativeColorScheme> = {
  orange: {
    bg: 'var(--snail-orange-light)',
    accent: 'var(--snail-orange)',
    dark: 'var(--snail-orange-dark)',
    badge: '#FEF5E7',
    badgeText: 'var(--snail-orange-dark)',
  },
  red: {
    bg: 'var(--snail-red-light)',
    accent: 'var(--snail-red)',
    dark: 'var(--snail-red-dark)',
    badge: '#FDF2F2',
    badgeText: 'var(--snail-red-dark)',
  },
  forest: {
    bg: 'var(--snail-forest-light)',
    accent: 'var(--snail-forest)',
    dark: 'var(--snail-forest-dark)',
    badge: '#E8F4EE',
    badgeText: 'var(--snail-forest-dark)',
  },
  sage: {
    bg: '#EEF3F0',
    accent: 'var(--snail-sage)',
    dark: '#5E7A68',
    badge: '#EEF3F0',
    badgeText: '#5E7A68',
  },
}
