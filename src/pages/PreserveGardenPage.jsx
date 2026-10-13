import { ArrowLeft, ArrowUpRight, Sprout, Leaf, Sun, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const harvest = [
  'Beans', 'Blackberries', 'Celery', 'Collard Greens', 'Cucumbers',
  'Garlic', 'Heirloom Lettuce', 'Heirloom Peppers', 'Jalapeño Peppers',
  'Kale', 'Onions', 'Raspberries', 'Rhubarb', 'Strawberries',
  'Sweet Potatoes', 'Swiss Chard',
]

const partners = [
  {
    name: 'North Lawndale Greening Committee',
    description: 'A neighborhood-led group working to green and revitalize North Lawndale through community-driven environmental projects.',
  },
  {
    name: 'Chicago Honey Co-Op',
    description: "A worker-owned beekeeping cooperative rooted in Chicago's South Side, supporting urban pollinator health and local honey production.",
  },
  {
    name: 'NeighborSpace',
    description: 'A nonprofit land trust that preserves and supports community-managed open spaces across Chicago neighborhoods.',
  },
]

const ways = [
  {
    icon: Sun,
    title: 'Volunteer Days',
    description: 'Join us for seasonal work days — planting, weeding, watering, composting, and harvesting. No experience needed, just a willingness to get your hands dirty.',
  },
  {
    icon: Leaf,
    title: 'Harvest Shares',
    description: 'Help distribute what the garden grows to neighbors and community members. A direct connection between the soil and the table.',
  },
  {
    icon: Users,
    title: 'Seed Saving Workshops',
    description: 'Learn to save seeds from our heirloom and Ark of Taste varieties so these flavors survive for future seasons and future gardeners.',
  },
]

export default function PreserveGardenPage() {
  return (
    <main>
      {/* Back nav */}
      <div className="pantry-back">
        <Link to="/initiatives" className="pantry-back-link">
          <ArrowLeft size={14} /> All initiatives
        </Link>
      </div>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="section-kicker">
            <span>Initiative</span> preSERVE Garden
          </div>
          <h1 className="page-hero-title">
            A garden that <em>grows community.</em>
          </h1>
          <p className="page-hero-desc">
            Since 2010, the preSERVE Garden has been growing heirloom vegetables,
            heritage fruits, and deep roots in Chicago's North Lawndale neighborhood —
            one harvest at a time.
          </p>
          <a className="button button-primary" href="mailto:hello@slowfoodchicago.org">
            Get involved <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="page-hero-aside" aria-hidden="true">
          <Sprout size={52} strokeWidth={1.2} style={{ color: '#C8D9CD' }} />
        </div>
      </section>

      {/* About */}
      <section className="preserve-about-section">
        <div className="preserve-about-inner">
          <div className="preserve-about-copy">
            <div className="section-kicker">
              <span>01</span> About the garden
            </div>
            <h2 className="preserve-section-title">
              Rooted in <em>North Lawndale</em> since 2010.
            </h2>
            <p className="preserve-body-text">
              The preSERVE Garden was born out of a desire to get more deeply involved
              in community gardening at a neighborhood level. What started as a small
              plot has grown into a thriving, multi-partner space — home to fruit trees
              and berry bushes, active composting beds, and an ever-expanding diversity
              of crops.
            </p>
            <p className="preserve-body-text">
              Many of the varieties we grow are drawn from Slow Food's Ark of Taste —
              an international catalog of endangered and rare foods — making the garden
              not just a food source, but a living act of preservation.
            </p>
          </div>
          <div className="preserve-about-stat-stack">
            <div className="preserve-stat">
              <span className="preserve-stat-number">2010</span>
              <span className="preserve-stat-label">Year founded</span>
            </div>
            <div className="preserve-stat">
              <span className="preserve-stat-number">3+</span>
              <span className="preserve-stat-label">Partner organizations</span>
            </div>
            <div className="preserve-stat">
              <span className="preserve-stat-number">16+</span>
              <span className="preserve-stat-label">Crops grown each season</span>
            </div>
          </div>
        </div>
      </section>

      {/* What we grow */}
      <section className="preserve-harvest-section">
        <div className="preserve-harvest-inner">
          <div className="section-kicker">
            <span>02</span> What we grow
          </div>
          <h2 className="preserve-section-title preserve-section-title--light">
            A full season's <em>worth of flavor.</em>
          </h2>
          <p className="preserve-harvest-desc">
            Each growing season the garden yields a diverse mix of vegetables,
            fruits, and herbs — many of them heirloom or heritage varieties.
          </p>
          <ul className="preserve-harvest-grid">
            {harvest.map((crop) => (
              <li key={crop} className="preserve-harvest-item">
                <span className="preserve-harvest-dot" aria-hidden="true">✳</span>
                {crop}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get involved */}
      <section className="preserve-involve-section">
        <div className="preserve-involve-inner">
          <div className="section-kicker">
            <span>03</span> Get involved
          </div>
          <h2 className="preserve-section-title">
            Show up and <em>dig in.</em>
          </h2>
          <div className="preserve-ways-grid">
            {ways.map((w) => {
              const Icon = w.icon
              return (
                <div className="preserve-way-card" key={w.title}>
                  <div className="preserve-way-icon">
                    <Icon size={21} strokeWidth={1.7} />
                  </div>
                  <h3 className="preserve-way-title">{w.title}</h3>
                  <p className="preserve-way-desc">{w.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="preserve-partners-section">
        <div className="preserve-partners-inner">
          <div className="section-kicker">
            <span>04</span> Our partners
          </div>
          <h2 className="preserve-section-title">
            Built on <em>collaboration.</em>
          </h2>
          <div className="preserve-partners-list">
            {partners.map((p) => (
              <div className="preserve-partner-card" key={p.name}>
                <h3 className="preserve-partner-name">{p.name}</h3>
                <p className="preserve-partner-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="initiatives-cta-section">
        <div className="initiatives-cta-inner">
          <div className="section-kicker" style={{ color: 'rgb(255 255 255 / 65%)' }}>
            <span style={{ color: 'var(--snail-yellow)' }}>Join us</span> In the garden
          </div>
          <h2 className="initiatives-cta-heading">
            Ready to <em>get growing?</em>
          </h2>
          <p className="initiatives-cta-desc">
            Volunteer days are open to all skill levels. Reach out to find out
            when the next workday is, or to learn how your organization can partner with us.
          </p>
          <a className="button button-white" href="mailto:hello@slowfoodchicago.org">
            Say hello <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  )
}
