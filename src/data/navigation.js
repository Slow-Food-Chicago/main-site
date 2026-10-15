import {
  EVENTBRITE_URL,
  SLACK_INVITE_URL,
  MEMBERSHIP_URL,
  SNAIL_OF_APPROVAL_URL,
  ARK_OF_TASTE_URL,
  SLOW_FOOD_USA_URL,
  PRIVACY_POLICY_URL,
} from './constants'

export const headerNavLinks = [
  { label: 'Our Initiatives', href: '/initiatives', external: false },
  { label: 'Events', href: EVENTBRITE_URL, external: true },
  { label: 'Our Leadership', href: '/board', external: false },
  { label: 'Join Slack', href: SLACK_INVITE_URL, external: true },
]

export const footerCommunityLinks = [
  { label: 'Join our Slack ↗', href: SLACK_INVITE_URL, external: true, highlight: true },
  { label: 'Get Involved', href: '/get-involved', external: false },
  { label: 'Events Calendar ↗', href: EVENTBRITE_URL, external: true },
  { label: 'Become a Member ↗', href: MEMBERSHIP_URL, external: true },
]

export const footerProjectLinks = [
  { label: 'Ark of Taste (Biodiversity) ↗', href: ARK_OF_TASTE_URL, external: true },
  { label: 'Snail of Approval ↗', href: SNAIL_OF_APPROVAL_URL, external: true },
  { label: 'Slow Food USA Network ↗', href: SLOW_FOOD_USA_URL, external: true },
]

export const footerBottomLinks = [
  { label: 'Slack Community', href: SLACK_INVITE_URL, external: true },
  { label: 'Privacy Policy', href: PRIVACY_POLICY_URL, external: true },
  { label: 'Slow Food USA', href: SLOW_FOOD_USA_URL, external: true },
]
