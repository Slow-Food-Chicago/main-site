import type { LucideIcon } from 'lucide-react'
import { Leaf, Sun, Users } from 'lucide-react'
import garden1 from '../assets/garden/garden1.jpg'
import garden2 from '../assets/garden/garden2.jpg'
import garden3 from '../assets/garden/garden3.jpg'
import garden4 from '../assets/garden/garden4.jpg'
import garden5 from '../assets/garden/garden5.jpg'
import garden6 from '../assets/garden/garden6.jpg'

export interface GardenPhoto {
  src: string
  alt: string
  caption: string
  orientation: 'landscape' | 'portrait'
}

export const gardenHeroPhoto: GardenPhoto = {
  src: garden1,
  alt: 'Slow Food Grows Here sign on the preSERVE Garden fence with volunteers planting in the background',
  caption: 'Volunteers planting in the mulched beds behind our Slow Food Grows Here sign.',
  orientation: 'landscape',
}

export const gardenPhotos: GardenPhoto[] = [
  {
    src: garden4,
    alt: 'Group of smiling volunteers holding up freshly harvested sweet potatoes, peppers, and garden tools',
    caption: 'Celebrating a fall harvest of heirloom sweet potatoes and peppers with our garden crew.',
    orientation: 'landscape',
  },
  {
    src: garden3,
    alt: 'Volunteers working together in the sunlit garden beds',
    caption: 'Community workday in full swing — tending beds and sharing knowledge in the sun.',
    orientation: 'landscape',
  },
  {
    src: garden2,
    alt: 'Two volunteers tending lush vegetable beds and fruit trees at the preSERVE Garden',
    caption: 'Tending seasonal vegetable beds beneath the garden’s fruit trees in North Lawndale.',
    orientation: 'portrait',
  },
  {
    src: garden5,
    alt: 'Volunteer in gardening gloves harvesting fresh dinosaur kale',
    caption: 'Harvesting fresh bunches of lacinato kale straight from the bed.',
    orientation: 'portrait',
  },
  {
    src: garden6,
    alt: 'Community members examining and tasting fresh harvest in the garden',
    caption: 'Tasting ripe heritage fruit fresh from the garden during a late-summer workday.',
    orientation: 'portrait',
  },
]

export interface GardenPartner {
  name: string
  description: string
  url: string
}

export interface GardenWay {
  icon: LucideIcon
  title: string
  description: string
}

export interface CropVariety {
  name: string
  description: string
  arkOfTaste?: boolean
}

export interface Crop {
  category: string
  varieties: CropVariety[]
  season: 'spring' | 'summer' | 'fall' | 'winter'
  color: 'sage' | 'red' | 'yellow' | 'blue'
}

export const gardenHarvest: Crop[] = [
  {
    category: 'Beans',
    season: 'fall',
    color: 'yellow',
    varieties: [
      {
        name: 'Cowpeas',
        description:
          "An heirloom field pea celebrated in Gullah Geechee culinary tradition and Slow Food's Ark of Taste. Drought-hardy and restorative to urban garden soil, it delivers an earthy, rich, and nutty savor.",
        arkOfTaste: true,
      },
      {
        name: 'Christmas Lima Bean',
        description:
          'An Ark of Taste heirloom pole bean grown since the 1840s, prized for striking maroon swirls, a rich chestnut aroma, and a buttery, melting texture.',
        arkOfTaste: true,
      },
    ],
  },
  {
    category: 'Blackberries',
    season: 'summer',
    color: 'red',
    varieties: [
      {
        name: 'Darrow',
        description:
          'A vigorous, cold-hardy heirloom bramble well-suited to Midwestern seasons, producing large, glossy berries bursting with deep sweetness and bright acidity.',
        arkOfTaste: false,
      },
      {
        name: 'Illinois Wild Heritage',
        description:
          'A resilient native perennial berry that feeds Chicago pollinators and yields intensely tart, dark berries ideal for fresh eating and seasonal preserves.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Garlic',
    season: 'fall',
    color: 'yellow',
    varieties: [
      {
        name: 'Inchelium Red',
        description:
          'An Ark of Taste softneck artichoke garlic discovered on the Colville Indian Reservation, prized for its lush, creamy texture and mild, full-bodied roasted profile.',
        arkOfTaste: true,
      },
      {
        name: 'German Extra Hardy',
        description:
          'A rugged porcelain hardneck garlic that weathers freezing Chicago winters to produce large, easy-to-peel cloves with an assertive, fiery kick.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Peppers',
    season: 'summer',
    color: 'red',
    varieties: [
      {
        name: 'Beaver Dam',
        description:
          'An Ark of Taste heirloom brought to Wisconsin from Hungary in 1912 by Joe Hussli. Features crunchy, thick walls and a gentle, sweet-to-mildly-piquant heat prized for roasting.',
        arkOfTaste: true,
      },
      {
        name: 'Sheepnose Pimiento',
        description:
          'A ribbed, pumpkin-shaped heirloom sweet pepper known for thick, juicy flesh with exceptional floral sweetness, perfect for canning or eating crisp from the vine.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Leeks',
    season: 'fall',
    color: 'yellow',
    varieties: [
      {
        name: 'Bleu de Solaise',
        description:
          'A historic 19th-century French heirloom with blue-tinted winter foliage and stout white shafts that develop exceptional sweetness following the first autumn frosts.',
        arkOfTaste: false,
      },
      {
        name: 'King Richard',
        description:
          'An early-maturing heirloom producing extra-long, tender shafts with a delicate, buttery allium sweetness that enriches late-season soups and braises.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Raspberries',
    season: 'summer',
    color: 'red',
    varieties: [
      {
        name: 'Heritage',
        description:
          'A classic everbearing heirloom yielding fragrant clusters of deep crimson berries in midsummer and autumn, delivering quintessential sweet-tart raspberry flavor.',
        arkOfTaste: false,
      },
      {
        name: 'Anne Golden',
        description:
          'A prized yellow heirloom berry celebrated for low acidity and radiant, honeyed sweetness with delicate undertones of apricot and melon.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Sweet Potatoes',
    season: 'fall',
    color: 'yellow',
    varieties: [
      {
        name: 'Jubilee',
        description:
          'A Southern heirloom with copper-tinged skin and radiant orange flesh, revered for its moist, tender bake and naturally high sugar content.',
        arkOfTaste: false,
      },
      {
        name: 'Red Wine',
        description:
          'A rare heritage sweet potato displaying rich reddish-purple skin and creamy flesh that caramelizes to a silky, rich sweetness when slow roasted.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Pears',
    season: 'fall',
    color: 'yellow',
    varieties: [
      {
        name: 'Jesuit',
        description:
          'An endangered Ark of Taste heritage tree fruit planted in the 1700s by French Jesuit missionaries in the Great Lakes basin. Long-lived trees yield aromatic pears with honey-spiced flesh.',
        arkOfTaste: true,
      },
    ],
  },
  {
    category: 'Persimmon',
    season: 'winter',
    color: 'blue',
    varieties: [
      {
        name: 'American Persimmon',
        description:
          'A native North American Ark of Taste treasure (Diospyros virginiana) harvested after late-autumn frosts when its soft pulp develops rich notes of butterscotch, honey, and spice.',
        arkOfTaste: true,
      },
    ],
  },
  {
    category: 'PawPaw',
    season: 'fall',
    color: 'yellow',
    varieties: [
      {
        name: 'Pawpaw',
        description:
          "North America's largest native tree fruit (Asimina triloba) and an Ark of Taste crown jewel. Features creamy, custard-like flesh reminiscent of banana, mango, and vanilla.",
        arkOfTaste: true,
      },
    ],
  },
  {
    category: 'Shiso',
    season: 'spring',
    color: 'sage',
    varieties: [
      {
        name: 'Red Shiso (Akajiso)',
        description:
          'A ruffled, ruby-purple heirloom herb with notes of anise, cinnamon, and basil, traditionally prized for umeboshi pickling, syrups, and aromatic herbal vinegars.',
        arkOfTaste: false,
      },
      {
        name: 'Green Shiso (Aojiso)',
        description:
          'A vibrant culinary herb delivering an invigorating blend of mint, basil, and citrusy spice, wonderful fresh in summer garden salads and community tastings.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Elderberry',
    season: 'summer',
    color: 'red',
    varieties: [
      {
        name: 'American Elderberry',
        description:
          'A hardy native Midwest shrub (Sambucus canadensis) whose starry summer umbels give way to rich clusters of tart, glossy purple berries prized for syrups and cordials.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Peach',
    season: 'summer',
    color: 'red',
    varieties: [
      {
        name: 'Indian Free',
        description:
          'An Ark of Taste heirloom freestone peach with historic Native American roots. Boasts striking crimson-marbled white flesh with a uniquely bold, vinous, berry-tart flavor.',
        arkOfTaste: true,
      },
      {
        name: 'Reliance',
        description:
          'A celebrated cold-hardy heirloom bred to weather frigid Midwestern winters, yielding abundant harvests of tender, juicy, golden-fleshed freestone peaches.',
        arkOfTaste: false,
      },
    ],
  },
  {
    category: 'Sunchoke',
    season: 'winter',
    color: 'blue',
    varieties: [{
      name: 'White Fuseau',
      description: 'Forms long, elegant, pale-skinned tubers that peel and cook with ease.',
      arkOfTaste: false
    },
    {
      name: 'Red Fuseau',
      description: "One of the most sought-after Jerusalem artichoke varieties available. With smooth, elongated tubers and a rich, nutty flavor, it's widely regarded as one of the best-eating sunchoke varieties out there.",
      arkOfTaste: false
    }]
  },
  {
    category: 'Groundnut',
    season: 'fall',
    color: 'yellow',
    varieties: [
      {
        name: 'Apripos Americana',
        description: "Also called 'potato beans,' this low-maintenance and trouble-free native USA plant is a legume, or bean family member.   It rapidly grows lovely bean-like vines that like to climb.  In late summer lovely purple, pea-like flowers appear.",
        arkOfTaste: true
      }
    ]
  }
]

export const gardenPartners: GardenPartner[] = [
  {
    name: 'North Lawndale Greening Committee',
    description:
      'A neighborhood-led group working to green and revitalize North Lawndale through community-driven environmental projects.',
    url: 'https://nlgreeningcommittee.org/',
  },
  {
    name: 'Chicago Honey Co-Op',
    description:
      "A worker-owned beekeeping cooperative rooted in Chicago's South Side, supporting urban pollinator health and local honey production.",
    url: 'https://www.chicagohoneycoop.com/',
  },
  {
    name: 'NeighborSpace',
    description:
      'A nonprofit land trust that preserves and supports community-managed open spaces across Chicago neighborhoods.',
    url: 'https://neighbor-space.org/',
  },
]

export const gardenWays: GardenWay[] = [
  {
    icon: Sun,
    title: 'Volunteer Days',
    description:
      'Join us for seasonal work days — planting, weeding, watering, composting, and harvesting. No experience needed, just a willingness to get your hands dirty.',
  },
  {
    icon: Leaf,
    title: 'Harvest Shares',
    description:
      'Help distribute what the garden grows to neighbors and community members. A direct connection between the soil and the table.',
  },
  {
    icon: Users,
    title: 'Seed Saving Workshops',
    description:
      'Learn to save seeds from our heirloom and Ark of Taste varieties so these flavors survive for future seasons and future gardeners.',
  },
]
