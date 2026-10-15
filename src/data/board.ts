import type { LucideIcon } from 'lucide-react'
import { Snail, Handshake, Megaphone, Wheat } from 'lucide-react'
import dom from '../assets/dom.jpeg'
import jody from '../assets/jody.jpg'
import diane from '../assets/diane.jpeg'
import gabi from '../assets/gabi.JPG'
import christian from '../assets/christian.jpeg'
import { SNAIL_OF_APPROVAL_URL, ARK_OF_TASTE_URL } from './constants'

export interface BoardMember {
  role: string
  name?: string
  headshot?: string | null
  bio?: string
  social?: string | null
}

export interface CommitteeMember {
  role: string
  name: string
  headshot?: string | null
  bio?: string
  social?: string | null
}

export interface Committee {
  key: string
  name: string
  description: string
  icon: LucideIcon
  accent: string
  tint: string
  url?: string | null
}

export const executiveBoard: BoardMember[] = [
  {
    role: 'President',
    name: 'Dom Amato',
    headshot: dom,
    bio: "I'm a big plant nerd who loves food and building communities. Lets create a more resilient future!",
    social: null,
  },
  {
    role: 'Vice President',
    name: 'Diane Williams',
    headshot: diane,
    social: null,
    bio: `
    I became interested in the Slow Food movement after reading about its founding by Carlo Petrini, becoming a Slow Food member in the early 2000s, joining the Board in 2023. 
    I was raised on a fourth generation, McHenry County dairy farm. Good food and clean farm crops were part of my upbringing. 
    In my professional life, I was an economic development consultant to the public sector. 
    Routinely engaging with local food businesses in client communities was a major component of my practice. 
    Having retired in 2023, I now volunteer weekly with two area food banks. 
    For me, seeing the food system from these varied perspectives reinforces my belief in Slow Food's mission of good, clean, and fair food for all and a commitment to support Slow Food's important work.
    `,
  },
  {
    role: 'Secretary',
    name: 'Jody Klinedinst',
    headshot: jody,
    bio: 'an artisan cheesemaker and the co-owner of J2K Capraio, a family-operated creamery based on a 22-acre goat farm in Walkerton, Indiana.',
    social: null,
  },
  {
    role: 'Treasurer',
    name: '',
  },
]

export const committeeMembers: Record<string, CommitteeMember[]> = {
  comms: [
    { role: 'Chair', name: 'Vanshi Jhumkhawala', headshot: null, bio: '', social: null },
    { role: 'member', name: 'Benji Corpuz', headshot: null, bio: '', social: null },
  ],
  partnerships: [
    {
      role: 'Chair',
      name: 'Christian Hunter',
      headshot: christian,
      bio: 'is currently the only Black chef in Chicago with a Michelin star, and one of only two Black chefs in the country with the honor.',
      social: null,
    },
    { role: 'member', name: 'Dfrantz Smart', headshot: null, bio: '', social: null },
    { role: 'member', name: 'Benji Corpuz', headshot: null, bio: '', social: null },
    {
      role: 'member',
      name: 'Gabi Medina',
      headshot: gabi,
      social: null,
      bio: "Me llamo Gabriela, but please call me Gabi. I'm an Ecuadorian-born, US-raised bartender determined to lift the stories of indigenous drink-makers of the Americas. I named my business Chuchaqui Cocktails to encompass where I come from and where I want to go. Chuchaqui is a word in Kichwa, one of the indigenous languages of present-day Ecuador. It means to be hungover. Intentionally goofy. After more than ten years in the hospitality industry, only recently can I claim to understand what my ancestors already knew: slow food means care and intention, a long-term investment in and for the land and the people. That same structure encourages me to focus on education about who we can thank for what's in our cocktail, with curiosity and respect. ¡Salud!",
    },
  ],
  snail: [],
  ark: [
    { role: 'Chair', name: 'Jeanne Calabrese', headshot: null, bio: '', social: null },
    { role: 'member', name: 'Heidi Hedeker', headshot: null, bio: '', social: null },
    { role: 'member', name: 'Zachary Page', headshot: null, bio: '', social: null },
    { role: 'member', name: 'Alana Reynolds', headshot: null, bio: '', social: null },
    { role: 'member', name: 'Gregory Hall', headshot: null, bio: '', social: null },
  ],
}

export const committees: Committee[] = [
  {
    key: 'snail',
    name: 'Snail of Approval',
    description:
      'Recognizes Chicago-area food and beverage businesses that embody the Slow Food values of Good, Clean, and Fair.',
    icon: Snail,
    accent: 'var(--snail-red)',
    tint: 'var(--snail-red-light)',
    url: SNAIL_OF_APPROVAL_URL,
  },
  {
    key: 'partnerships',
    name: 'Partnerships',
    description:
      'Builds relationships with local farms, restaurants, schools, and community organizations that share our vision of a better food system.',
    icon: Handshake,
    accent: 'var(--snail-blue-dark)',
    tint: 'var(--snail-blue-light)',
    url: null,
  },
  {
    key: 'comms',
    name: 'Communications',
    description:
      'Tells the Slow Food Chicago story — managing our newsletter, social media, website, and community outreach.',
    icon: Megaphone,
    accent: 'var(--snail-forest)',
    tint: 'var(--snail-forest-light)',
    url: null,
  },
  {
    key: 'ark',
    name: 'Midwest Ark of Taste',
    description:
      'Catalogs and champions endangered Midwestern food biodiversity — from heirloom seeds to heritage breeds — as part of the global Slow Food Ark of Taste.',
    icon: Wheat,
    accent: 'var(--snail-orange)',
    tint: 'var(--snail-orange-light)',
    url: ARK_OF_TASTE_URL,
  },
]
