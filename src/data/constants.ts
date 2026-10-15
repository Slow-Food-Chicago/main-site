/**
 * Shared site constants, external links, and contact information.
 */

export const SLACK_INVITE_URL =
  'https://join.slack.com/t/slow-food-chicago/shared_invite/zt-4d91f5vic-d2GFPgGyzGAclfLP8bLRww' as const

export const CONTACT_EMAIL = 'hello@slowfoodchicago.org' as const

export const EVENTBRITE_URL = 'https://www.eventbrite.com/o/22780790031' as const

export const MEMBERSHIP_URL = 'https://www.slowfoodusa.org/membership' as const

export const SLOW_FOOD_USA_URL = 'https://slowfoodusa.org' as const

export const PRIVACY_POLICY_URL = 'https://slowfoodusa.org/privacy-policy' as const

export const SNAIL_OF_APPROVAL_URL = 'https://snails.slowfoodchicago.org' as const

export const ARK_OF_TASTE_URL = 'https://ark.slowfoodchicago.org' as const

export const DEFAULT_GOOGLE_CALENDAR_ID =
  (import.meta.env.VITE_GOOGLE_CALENDAR_ID as string) || 'hello@slowfoodchicago.org'

export const GOOGLE_CALENDAR_API_KEY =
  (import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string) || ''

export const GOOGLE_CALENDAR_ICS_URL =
  (import.meta.env.VITE_GOOGLE_CALENDAR_ICS_URL as string) || ''
