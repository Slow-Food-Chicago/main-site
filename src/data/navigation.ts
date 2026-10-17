import {
  SLACK_INVITE_URL,
  MEMBERSHIP_URL,
  SNAIL_OF_APPROVAL_URL,
  ARK_OF_TASTE_URL,
  SLOW_FOOD_USA_URL,
  PRIVACY_POLICY_URL,
} from './constants'

export interface NavLink {
  label: string
  href: string
  external: boolean
  highlight?: boolean
}

export const headerNavLinks: NavLink[] = [
  { label: 'Our Initiatives', href: '/initiatives', external: false },
  { label: 'Events', href: '/events', external: false },
  { label: 'Our Leadership', href: '/board', external: false },
  { label: 'Join Slack', href: SLACK_INVITE_URL, external: true },
]

export const footerCommunityLinks: NavLink[] = [
  { label: 'Join our Slack ↗', href: SLACK_INVITE_URL, external: true, highlight: true },
  { label: 'Get Involved', href: '/get-involved', external: false },
  { label: 'Events Calendar', href: '/events', external: false },
  { label: 'Become a Member ↗', href: MEMBERSHIP_URL, external: true },
]

export const footerProjectLinks: NavLink[] = [
  { label: 'Ark of Taste (Biodiversity) ↗', href: ARK_OF_TASTE_URL, external: true },
  { label: 'Snail of Approval ↗', href: SNAIL_OF_APPROVAL_URL, external: true },
  { label: 'Slow Food USA Network ↗', href: SLOW_FOOD_USA_URL, external: true },
]

export const footerBottomLinks: NavLink[] = [
  { label: 'Slack Community', href: SLACK_INVITE_URL, external: true },
  { label: 'Design System', href: '/design-system', external: false },
  { label: 'Privacy Policy', href: PRIVACY_POLICY_URL, external: true },
  { label: 'Slow Food USA', href: SLOW_FOOD_USA_URL, external: true },
]
