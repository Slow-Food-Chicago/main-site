import { ArrowUpRight, Sprout } from 'lucide-react'
import BackLink from '../components/ui/BackLink'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import SectionKicker from '../components/ui/SectionKicker'
import { gardenHarvest, gardenPartners, gardenWays } from '../data/preserve-garden'
import { SLACK_INVITE_URL, CONTACT_EMAIL } from '../data/constants'

export default function PreserveGardenPage() {
  return (
    <main>
      {/* Back nav */}
      <BackLink to="/initiatives" label="All initiatives" />

      {/* Hero */}
      <PageHero
        className="preserve-hero"
        kickerTag="Initiative"
        kickerText="preSERVE Garden"
        title={
          <>
            A garden that <em>grows community.</em>
          </>
        }
        description="Since 2010, the preSERVE Garden has been growing heirloom vegetables, heritage fruits, and deep roots in Chicago's North Lawndale neighborhood — one harvest at a time."
        asideIcon={Sprout}
        asideColor="var(--snail-forest)"
        actions={
          <a className="button button-forest" href={`mailto:${CONTACT_EMAIL}`}>
            Get involved <ArrowUpRight size={16} />
          </a>
        }
      />

      {/* About */}
      <section className="preserve-about-section">
        <div className="preserve-about-inner">
          <div className="preserve-about-copy">
            <SectionKicker text="About the garden" />
            <h2 className="preserve-section-title">
              Rooted in <em>North Lawndale</em> since 2010.
            </h2>
            <p className="preserve-body-text">
              The preSERVE Garden was born out of a desire to get more deeply involved in community
              gardening at a neighborhood level. What started as a small plot has grown into a
              thriving, multi-partner space — home to fruit trees and berry bushes, active
              composting beds, and an ever-expanding diversity of crops.
            </p>
            <p className="preserve-body-text">
              Many of the varieties we grow are drawn from Slow Food's Ark of Taste — an
              international catalog of endangered and rare foods — making the garden not just a
              food source, but a living act of preservation.
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
          <SectionKicker text="What we grow" />
          <h2 className="preserve-section-title preserve-section-title--light">
            A full season's <em>worth of flavor.</em>
          </h2>
          <p className="preserve-harvest-desc">
            Each growing season the garden yields a diverse mix of vegetables, fruits, and herbs —
            many of them heirloom or heritage varieties.
          </p>
          <ul className="preserve-harvest-grid">
            {gardenHarvest.map((crop) => (
              <li key={crop} className="preserve-harvest-item">
                <span className="preserve-harvest-dot" aria-hidden="true">
                  ✳
                </span>
                {crop}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get involved */}
      <section className="preserve-involve-section">
        <div className="preserve-involve-inner">
          <SectionKicker text="Get involved" />
          <h2 className="preserve-section-title">
            Show up and <em>dig in.</em>
          </h2>
          <div className="preserve-ways-grid">
            {gardenWays.map((w) => {
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
          <SectionKicker text="Our partners" />
          <h2 className="preserve-section-title">
            Built on <em>collaboration.</em>
          </h2>
          <div className="preserve-partners-list">
            {gardenPartners.map((p) => (
              <div className="preserve-partner-card" key={p.name}>
                <h3 className="preserve-partner-name">{p.name}</h3>
                <p className="preserve-partner-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        kickerTag="Join us"
        kickerText="In the garden"
        heading={
          <>
            Ready to <em>get growing?</em>
          </>
        }
        description="Volunteer days are open to all skill levels. Reach out to find out when the next workday is, or to learn how your organization can partner with us."
        actions={
          <>
            <a
              className="button button-white"
              href={SLACK_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Slack <ArrowUpRight size={16} />
            </a>
            <a className="button button-white" href={`mailto:${CONTACT_EMAIL}`}>
              Say hello <ArrowUpRight size={16} />
            </a>
          </>
        }
      />
    </main>
  )
}
