import type { CalendarEvent } from '../types/calendar'

export const sampleEvents: CalendarEvent[] = [
  {
    id: 'sfc-garden-oct-2026',
    title: 'preSERVE Garden Workday & Seed Saving',
    description:
      'Join us at the preSERVE community garden in North Lawndale. We will be prepping beds for the cold season, mulching berry rows, and saving heirloom seeds from this season’s harvest. All skill levels welcome!',
    location: 'preSERVE Garden, North Lawndale, Chicago, IL',
    startDate: new Date('2026-10-24T10:00:00-05:00'),
    endDate: new Date('2026-10-24T13:00:00-05:00'),
    isAllDay: false,
    category: 'garden',
    url: 'https://www.eventbrite.com/o/22780790031',
  },
  {
    id: 'sfc-pantry-swap-nov-2026',
    title: 'Autumn Community Pantry Swap',
    description:
      'Bring your homemade jams, sourdough starter, dried herbs, fermented goods, or shelf-stable local staples to trade with neighbors. Free and open to everyone.',
    location: 'The Plant, 1400 W 46th St, Chicago, IL',
    startDate: new Date('2026-11-07T11:00:00-05:00'),
    endDate: new Date('2026-11-07T14:00:00-05:00'),
    isAllDay: false,
    category: 'gathering',
    url: 'https://www.eventbrite.com/o/22780790031',
  },
  {
    id: 'sfc-committee-nov-2026',
    title: 'Slow Food Chicago Chapter & Committee Open Meeting',
    description:
      'Interested in getting more involved? Join our chapter leaders, committee chairs, and fellow members to hear what we are planning for winter and spring.',
    location: 'Virtual on Zoom & Chicago Public Library Harold Washington Center',
    startDate: new Date('2026-11-12T18:30:00-05:00'),
    endDate: new Date('2026-11-12T20:00:00-05:00'),
    isAllDay: false,
    category: 'meeting',
    url: 'https://join.slack.com/t/slow-food-chicago/shared_invite/zt-4d91f5vic-d2GFPgGyzGAclfLP8bLRww',
  },
  {
    id: 'sfc-snail-tasting-nov-2026',
    title: 'Snail of Approval: Artisan Grain & Bread Workshop',
    description:
      'A hands-on discussion and tasting spotlighting Midwestern heritage stone-milled flours, natural sourdough fermentation, and local bakeries holding the Snail of Approval.',
    location: 'Middle Brow Bungalow, 2840 W Armitage Ave, Chicago, IL',
    startDate: new Date('2026-11-21T14:00:00-05:00'),
    endDate: new Date('2026-11-21T16:30:00-05:00'),
    isAllDay: false,
    category: 'workshop',
    url: 'https://www.eventbrite.com/o/22780790031',
  },
  {
    id: 'sfc-ark-cider-dec-2026',
    title: 'Midwest Ark of Taste: Heirloom Apple & Cider Celebration',
    description:
      'An evening exploring endangered and heritage Midwestern apple varieties listed on the Slow Food Ark of Taste, accompanied by regional single-varietal ciders and cheeses.',
    location: 'Northman Riverwalk / Cider Pub, Chicago, IL',
    startDate: new Date('2026-12-05T17:00:00-06:00'),
    endDate: new Date('2026-12-05T19:30:00-06:00'),
    isAllDay: false,
    category: 'gathering',
    url: 'https://www.eventbrite.com/o/22780790031',
  },
]
