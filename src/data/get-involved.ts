import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  HandCoins,
  Megaphone,
  MessageSquare,
  UtensilsCrossed,
  Users,
} from 'lucide-react'
import {
  SLACK_INVITE_URL,
  MEMBERSHIP_URL,
  EVENTBRITE_URL,
  CONTACT_EMAIL,
} from './constants'

export type InvolveColor = 'red' | 'forest' | 'orange' | 'sage'

export interface InvolveCta {
  label: string
  href: string
}

export interface InvolveWay {
  number: string
  title: string
  description: string
  icon: LucideIcon
  color: InvolveColor
  cta: InvolveCta | null
}

export interface ColorScheme {
  bg: string
  accent: string
  dark: string
  border: string
}

export const getInvolvedWays: InvolveWay[] = [
  {
    number: '01',
    title: 'Become a Member',
    description:
      'Slow Food membership connects you to a global network of people who care about the future of food. As a member, you support our work and gain access to events, resources, and a community of like-minded eaters.',
    icon: Users,
    color: 'red',
    cta: { label: 'Join Slow Food', href: MEMBERSHIP_URL },
  },
  {
    number: '02',
    title: 'Join our Slack',
    description:
      "Connect directly with Chicago's food community. Swap recipes, discuss local food policy, coordinate garden days, and chat with fellow members and volunteers in real time.",
    icon: MessageSquare,
    color: 'forest',
    cta: { label: 'Join us on Slack', href: SLACK_INVITE_URL },
  },
  {
    number: '03',
    title: 'Come to an Event',
    description:
      "From dinners and tastings to farm visits and panel discussions—our events are where the real conversations happen. Check our calendar for what's coming up and pull up a chair.",
    icon: CalendarDays,
    color: 'orange',
    cta: { label: 'See upcoming events', href: EVENTBRITE_URL },
  },
  {
    number: '04',
    title: 'Volunteer',
    description:
      'Our programs run on the energy and skills of volunteers. Help at a Pantry Swap, assist with outreach, or lend your expertise to a project. Every hour matters and every hand helps.',
    icon: UtensilsCrossed,
    color: 'sage',
    cta: { label: 'Volunteer with us', href: `mailto:${CONTACT_EMAIL}` },
  },
  {
    number: '05',
    title: 'Spread the Word',
    description:
      'Talk about good food with your neighbors, share our events, and introduce someone new to the Slow Food movement. The most powerful thing you can do is bring more people to the table.',
    icon: Megaphone,
    color: 'red',
    cta: null,
  },
  {
    number: '06',
    title: 'Support Our Work',
    description:
      'Donations and sponsorships help us run programs, host events, and stay rooted in Chicago communities. Every contribution goes directly toward building a better food future for our city.',
    icon: HandCoins,
    color: 'forest',
    cta: { label: 'Make a donation', href: `mailto:${CONTACT_EMAIL}` },
  },
]

export const getInvolvedColorMap: Record<InvolveColor, ColorScheme> = {
  red: {
    bg: 'var(--snail-red-light)',
    accent: 'var(--snail-red)',
    dark: 'var(--snail-red-dark)',
    border: 'rgba(218,32,40,0.2)',
  },
  forest: {
    bg: 'var(--snail-forest-light)',
    accent: 'var(--snail-forest)',
    dark: 'var(--snail-forest-dark)',
    border: 'rgba(32,120,79,0.2)',
  },
  orange: {
    bg: 'var(--snail-orange-light)',
    accent: 'var(--snail-orange)',
    dark: 'var(--snail-orange-dark)',
    border: 'rgba(222,121,0,0.2)',
  },
  sage: {
    bg: '#EEF3F0',
    accent: 'var(--snail-sage)',
    dark: '#5E7A68',
    border: 'rgba(123,158,135,0.25)',
  },
}
