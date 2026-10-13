import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  ShoppingBasket,
  Snail,
  Sprout,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const initiatives = [
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
    tagline: 'Recognizing Chicago\'s good food makers.',
    description:
      'The Snail of Approval is Slow Food\'s hallmark of quality and integrity. We work with local restaurants, producers, and markets to identify those who source responsibly, treat workers fairly, and cook with honesty. Look for the snail—it means something.',
    color: 'red',
    icon: Snail,
    status: 'Active',
    href: 'https://snails.slowfoodchicago.org',
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
    href: 'https://ark.slowfoodchicago.org',
    external: true,
  },
  {
    number: '04',
    title: 'preSERVE Garden',
    tagline: 'Growing food and community together.',
    description:
      `The preSERVE community garden project is a partnership between Slow Food Chicago, the North Lawndale Greening Committee, the Chicago Honey Co-Op, and NeighborSpace. 
preSERVE was created in 2010 out of a desire to get more deeply involved in community gardening at a neighborhood level.  Since its creation, the preSERVE garden has continued to expand. The garden is home to fruit trees and bushes, composting, and an ever-expanding diversity of crops like sweet potatoes, black eyed peas, greens, heirloom tomatoes and more!
Each season, we harvest food like beans, blackberries, celery, collard greens, cucumbers, garlic, heirloom lettuce, heirloom peppers, jalapeno peppers, kale, onions, raspberries, rhubarb, strawberries, sweet potatoes and swiss chard. Many of the varieties grown in the preSERVE Garden are from Slow Food's Ark of Taste, an international catalog of endangered and rare foods.`,
    color: 'sage',
    icon: Sprout,
    status: 'Active',
    href: '/initiatives/preserve-garden',
    external: false,
  }
]

const colorMap = {
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

export default function InitiativesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="section-kicker">
            <span>Our work</span> Initiatives
          </div>
          <h1 className="page-hero-title">
            Good food takes <em>real effort.</em>
          </h1>
          <p className="page-hero-desc">
            We run programs that connect people to better food—locally grown, ethically sourced, and
            rooted in the traditions that make Chicago's food culture worth celebrating.
          </p>
        </div>
        <div className="page-hero-aside" aria-hidden="true">
          <Sprout size={52} strokeWidth={1.2} style={{ color: 'var(--snail-forest-light)' }} />
        </div>
      </section>

      {/* Initiatives list */}
      <section className="initiatives-section">
        <div className="initiatives-list">
          {initiatives.map((item) => {
            const c = colorMap[item.color]
            const Icon = item.icon
            const CardWrapper = ({ children }) => item.external
              ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="initiative-card">{children}</a>
              : <Link to={item.href} className="initiative-card">{children}</Link>
            return (
              <CardWrapper key={item.number}>
                <div
                  className="initiative-icon-wrap"
                  style={{ background: c.bg, color: c.accent }}
                >
                  <Icon size={26} strokeWidth={1.6} />
                </div>
                <div className="initiative-body">
                  <div className="initiative-meta">
                    <span className="initiative-number">{item.number}</span>
                    <span
                      className="initiative-badge"
                      style={{ background: c.badge, color: c.badgeText }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h2 className="initiative-title">{item.title}</h2>
                  <p className="initiative-tagline" style={{ color: c.accent }}>
                    {item.tagline}
                  </p>
                  <p className="initiative-desc">{item.description}</p>
                </div>
                <span className="initiative-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} style={{ color: c.accent }} />
                </span>
              </CardWrapper>
            )
          })}
        </div>
      </section>

      {/* Call to action */}
      <section className="initiatives-cta-section">
        <div className="initiatives-cta-inner">
          <div className="section-kicker" style={{ color: 'rgb(255 255 255 / 65%)' }}>
            <span style={{ color: 'var(--snail-yellow)' }}>Join us</span> Make it happen
          </div>
          <h2 className="initiatives-cta-heading">
            Want to help <em>with the work?</em>
          </h2>
          <p className="initiatives-cta-desc">
            Our initiatives run because of people who show up. Whether you want to volunteer, partner
            with us, or just learn more—reach out and let's talk.
          </p>
          <a className="button button-white" href="/get-involved">
            Get involved <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  )
}
