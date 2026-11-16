import type { LucideIcon } from 'lucide-react'
import { Snail, Handshake, Megaphone, Wheat, CalendarDays, Sprout } from 'lucide-react'
import dom from '../assets/board/dom.jpeg'
import jody from '../assets/board/jody.jpeg'
import diane from '../assets/board/diane.jpeg'
import gabi from '../assets/board/gabi.JPG'
import christian from '../assets/board/christian.jpeg'
import benji from '../assets/board/benji.jpeg'
import dfrantz from '../assets/board/dfrantz.jpg'
import heidi from '../assets/board/heidi.jpg'
import jeanne from '../assets/board/jeanne.png'
import michelle from '../assets/board/michelle.jpg'
import vanshi from '../assets/board/vanshi.jpeg'
import greg from '../assets/board/greg.jpg'
import { SNAIL_OF_APPROVAL_URL, ARK_OF_TASTE_URL } from './constants'

export type SocialLinkItemObject = {
  url: string
  label?: string
}

export type SocialLinkItem = string | SocialLinkItemObject

export type SocialInput =
  | SocialLinkItem
  | SocialLinkItem[]
  | null
  | undefined

export interface BoardMember {
  role: string
  name?: string
  headshot?: string | null
  bio?: string
  social?: SocialInput
  socials?: SocialInput
}

export interface CommitteeMember {
  role: string
  name: string
  headshot?: string | null
  bio?: string
  social?: SocialInput
  socials?: SocialInput
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
    bio: `I'm a big plant nerd who loves food and building community. 
    
    Lets create a more resilient future together!`,
    social: null,
  },
  {
    role: 'Vice President',
    name: 'Diane Williams',
    headshot: diane,
    social: null,
    bio: `I became interested in the Slow Food movement after reading about its founding by Carlo Petrini, becoming a Slow Food member in the early 2000s, joining the Board in 2023.

I was raised on a fourth generation, McHenry County dairy farm. Good food and clean farm crops were part of my upbringing.

In my professional life, I was an economic development consultant to the public sector. Routinely engaging with local food businesses in client communities was a major component of my practice.

Having retired in 2023, I now volunteer weekly with two area food banks.

For me, seeing the food system from these varied perspectives reinforces my belief in Slow Food's mission of good, clean, and fair food for all and a commitment to support Slow Food's important work.`,
  },
  {
    role: 'Secretary',
    name: 'Jody Klinedinst',
    headshot: jody,
    bio: "I'm an artisan cheesemaker and the co-owner of J2K Capraio, a family-operated creamery based on a 22-acre goat farm in Walkerton, Indiana.",
    social: null,
  },
  {
    role: 'Treasurer',
    name: '',
  },
]

const Benji: CommitteeMember = {
  role: 'Chair', name: 'Benji Corpuz', headshot: benji, bio: `I'm a city planner with the City of Chicago’s Department of Planning and Development, and I believe great neighborhoods are shaped by human connection, welcoming public spaces, and cultural identity.

I have a lifelong appreciation for food as a source of family and community, and I'm a fierce advocate for shopping and dining locally. I hope to contribute my passion for strong neighborhoods, local food systems, and fostering connections to the organization.

I'm particularly interested in the intersection of nutrition, public health, and food access, and how individual, collective, and municipal efforts can make nutritious food more accessible to everyone.

Outside of work, you can find me behind a camera, tending to my backyard garden, biking around town, or enjoying a meal with friends and good company.`, social: null
}

const Greg: CommitteeMember = { role: 'member', name: 'Gregory Hall', headshot: greg, bio: `Greg Hall began his brewing career in 1988, the year his father, John Hall, opened the brewery. Greg attended Chicago's brewing school, the Siebel Institute, graduating in 1989. In 1992, Hall become the brewmaster of Goose Island Beer Company and under his direction, the brewery flourished and expanded its draft and bottle beer lines. 
  
  Hall stepped down as Brewmaster of Goose Island in May 2011 to pursue cider making, opening up Virtue Cider in 2011. 
  
  He is a long-time supporter of the Chicago food community and many local organizations like Chicago’s Green City Market and the Chicago Rarities Orchard Project. He formerly served as a board member of Slow Food Chicago`, social: null }


export const committeeMembers: Record<string, CommitteeMember[]> = {
  comms: [
    { role: 'Chair', name: 'Vanshi Jhumkhawala', headshot: vanshi, bio: `As a food lover myself, I strongly believe that food has a unique way of bringing people and communities closer. With a background in graphic and digital design, I love finding creative ways to make information engaging, accessible, and meaningful. I'm excited to use those skills to help share Slow Food's mission and connect more people with the movement.

Outside of design, you'll often find me experimenting in the kitchen, trying new recipes, or finding any excuse to bring people together over good food!`, social: null },
    Benji
  ],
  partnerships: [
    {
      role: 'Chair',
      name: 'Christian Hunter',
      headshot: christian,
      bio: `I am currently the only Black chef in Chicago with a Michelin star, and one of only two Black chefs in the country with the honor.

My culinary journey began in Lexington, Kentucky, where I was immersed in a family of passionate home cooks. My formative years in this environment fostered a profound appreciation for 'traditional Southern food.'

Subsequently, my exposure to Lexington's diverse culinary scene broadened my horizons, shaping my innovative approach.`,
      social: null,
    },
    {
      role: 'member', name: 'Dfrantz Smart', headshot: dfrantz, bio: `D’Frantz Smart is an independent curator, event producer, community organizer, connector, food justice advocate, and data scientist.
      
She is the founder of Rooted Reads, an organization connecting and building community through a radical analysis of food and global food systems, and the founder of Hold The Lane, a collective of urban cyclists cultivating environments that nurture physical, emotional, and mental health through community rides and events for Black, Brown and Queer cyclists. 

Her work has involved connecting, supporting, and educating community members through food, film, sports, and tech.

D’Frantz’s projects and events have been featured on/with The Chicago Tribune, SoHo House, The Chicago Reader, and The Chicago Sun-Times. Programmatic partners include Nike, Jordan, Red Bull, Sisters In Cinema, and more.

--
a lifelong learner. 
healing and liberating our people through food + films + bikes + sports + love
Creator of @therootedreadsbookclub  + @theblkbikepanel 
Organizer @holdthelane`,
      social: [
        {
          label: 'Rooted Reads',
          url: 'https://www.instagram.com/therootedreadsbookclub/',
        },
        {
          label: 'The BLK Bike Panel',
          url: 'https://www.instagram.com/theblkbikepanel/',
        },
        {
          label: 'Hold The Lane',
          url: 'https://www.instagram.com/holdthelane/',
        },
      ],
    },
    Benji,
    {
      role: 'member',
      name: 'Gabi Medina',
      headshot: gabi,
      social: 'https://www.instagram.com/chuchaquicocktails/',
      bio: `Me llamo Gabriela, but please call me Gabi. I'm an Ecuadorian-born, US-raised bartender determined to lift the stories of indigenous drink-makers of the Americas. 
      
      I named my business Chuchaqui Cocktails to encompass where I come from and where I want to go. Chuchaqui is a word in Kichwa, one of the indigenous languages of present-day Ecuador. It means to be hungover. Intentionally goofy. 
      
      After more than ten years in the hospitality industry, only recently can I claim to understand what my ancestors already knew: slow food means care and intention, a long-term investment in and for the land and the people. That same structure encourages me to focus on education about who we can thank for what's in our cocktail, with curiosity and respect. ¡Salud!`,
    },
    {
      role: 'member',
      name: 'Michelle DiMuzio',
      headshot: michelle,
      bio: `Michelle works at the intersection of food, sustainability, and hospitality. With experience across nonprofit organizations, food and beverage businesses, and food systems consulting, she has explored the food world from a variety of angles, from serving as Communications Coordinator for Slow Food USA to consulting with food businesses on sustainability initiatives.

She currently works in food systems consulting and helps bring creative food experiences to life through pop-up supper clubs across Chicago. She's particularly interested in the people, places, and traditions that shape our food culture, and in supporting the independent businesses and local producers that make it special. 

Outside of work, she enjoys cooking, exploring Chicago's food scene, learning more about foraging, and finding new ways to enjoy the outdoors in every season.`,
      social: null,
    }
  ],
  snail: [],
  ark: [
    {
      role: 'Chair', name: 'Jeanne Calabrese', headshot: jeanne, bio: `Jeanne Calabrese is a sustainable agriculture and food justice advocate. 
      
      For years she has cultivated her knowledge of local food systems and growing practices in order to gain a better understanding of how to impact positive change within the food system. This has led her to complete the Stateline Farm Beginnings course, a residency program in fermentation, certification as a master food preserver and an apprenticeship on a small apple orchard. She has taken numerous workshops at food and farming conferences throughout the US. 
      
      She is co-founder of City Orchards, a 501c3 entity that designs, implements and manages micro orchards on Chicago’s westside. 
      
      She has been a member of the Midwest Ark of Taste since its inception and is a former Slow Food Chicago board member.`, social: 'https://www.instagram.com/fedupferments/'
    },
    {
      role: 'member', name: 'Heidi Hedeker', headshot: heidi, bio: `She grew up in the business, working in her family’s bakery on the Northwest side, Gladstone Park Bakery. Hedeker went on to own her own shop in Wicker Park, Alliance Bakery, chosen as Best Retailer of the Year by Culinaria in 2000. 

Heidi is also a food writer who has served as editor for Baking Magazine and holds a Bachelor of the Arts degree in writing. 

She is a certified master baker and is currently at work on a therapeutic baking and pastry program for disadvantaged mothers and daughters called “It Bakes a Village.”`, social: null
    },
    Greg,
    { role: 'member', name: 'Sarah Batka', headshot: null, bio: '', social: null }
  ],
  preserve: [],
  events: [
    { ...Greg, role: 'Chair' },
  ]
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
      'Tells the Slow Food Chicago story, managing our newsletter, social media, website, and community outreach.',
    icon: Megaphone,
    accent: 'var(--snail-forest)',
    tint: 'var(--snail-forest-light)',
    url: null,
  },
  {
    key: 'events',
    name: 'Events',
    description:
      'Organizes gatherings, tastings, workshops, and farm visits that connect Chicagoans with good, clean, and fair food and each other.',
    icon: CalendarDays,
    accent: 'var(--snail-orange)',
    tint: 'var(--snail-orange-light)',
    url: '/events',
  },
]

export const workingGroups: Committee[] = [
  {
    key: 'ark',
    name: 'Midwest Ark of Taste',
    description:
      'Catalogs and champions endangered Midwestern food biodiversity, from heirloom seeds to heritage breeds, as part of the global Slow Food Ark of Taste.',
    icon: Wheat,
    accent: 'var(--snail-yellow)',
    tint: 'var(--snail-yellow-light)',
    url: ARK_OF_TASTE_URL,
  },
  {
    key: 'preserve',
    name: 'preSERVE Garden',
    description:
      'Cultivates heirloom vegetables, heritage fruits, and community roots in North Lawndale through a collaborative neighborhood garden.',
    icon: Sprout,
    accent: 'var(--snail-lime)',
    tint: 'var(--snail-lime-light)',
    url: '/initiatives/preserve-garden',
  },
]
