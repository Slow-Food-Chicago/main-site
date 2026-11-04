/**
 * Shared site constants, external links, and contact information.
 */

/**
 * Feature flag to control visibility of Slack mentions and links across the site.
 * Defaults to false (hidden). Enable via VITE_SHOW_SLACK=true or VITE_ENABLE_SLACK=true.
 */
export const SHOW_SLACK: boolean =
  import.meta.env.VITE_SHOW_SLACK === 'true' ||
  import.meta.env.VITE_ENABLE_SLACK === 'true'

export const ENABLE_SLACK = SHOW_SLACK

export const SLACK_INVITE_URL =
  'https://join.slack.com/t/slow-food-chicago/shared_invite/zt-4d91f5vic-d2GFPgGyzGAclfLP8bLRww' as const

export const CONTACT_EMAIL = 'hello@slowfoodchicago.org' as const

export const EVENTBRITE_URL = 'https://www.eventbrite.com/o/22780790031' as const

export const EVENTBRITE_ORGANIZER_ID = '22780790031' as const

export const MEMBERSHIP_URL = 'https://connect.clickandpledge.com/w/Form/da3477b3-1ac3-4f79-9e1f-81e85cfc7aa9?trk=MD23-websitemenu' as const

export const SLOW_FOOD_USA_URL = 'https://slowfoodusa.org' as const

export const PRIVACY_POLICY_URL = 'https://slowfoodusa.org/privacy-policy' as const

export const SNAIL_OF_APPROVAL_URL = 'https://snails.slowfoodchicago.org' as const

export const ARK_OF_TASTE_URL = 'https://ark.slowfoodchicago.org' as const

export const DEFAULT_GOOGLE_CALENDAR_ID = 'dd47612359dbde8faffd0ec0abb04d1a2bf2cb7266266d1df04cb27ac4dbf0b4@group.calendar.google.com'

export const GOOGLE_CALENDAR_API_KEY =
  (import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string) || ''

export const GOOGLE_CALENDAR_ICS_URL = 'https://calendar.google.com/calendar/ical/dd47612359dbde8faffd0ec0abb04d1a2bf2cb7266266d1df04cb27ac4dbf0b4%40group.calendar.google.com/public/basic.ics'
// 'https://calendar.google.com/calendar/u/0?cid=ZGQ0NzYxMjM1OWRiZGU4ZmFmZmQwZWMwYWJiMDRkMWEyYmYyY2I3MjY2MjY2ZDFkZjA0Y2IyN2FjNGRiZjBiNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t'
