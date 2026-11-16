import type React from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import { initiatives, initiativeColorMap } from '../data/initiatives'
import { SHOW_SLACK, SLACK_INVITE_URL } from '../data/constants'
import initativeHero from '../assets/events/events5.jpg'

export default function InitiativesPage() {
  return (
    <main>
      {/* Hero */}
      <PageHero
        kickerTag="Our work"
        kickerText="Initiatives"
        title={
          <>
            Good food takes <em>real effort.</em>
          </>
        }
        description="We run programs that connect people to better food, locally grown, ethically sourced, and rooted in the traditions that make Chicago's food culture worth celebrating."
        asideImage={initativeHero}
        asideImageAlt="Michael Thompson speaking at an event"
      />

      {/* Initiatives list */}
      <section className="initiatives-section">
        <div className="initiatives-list">
          {initiatives.map((item) => {
            const c = initiativeColorMap[item.color]
            const Icon = item.icon
            const CardWrapper = ({ children }: { children: React.ReactNode }) =>
              item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="initiative-card"
                >
                  {children}
                </a>
              ) : (
                <Link to={item.href} className="initiative-card">
                  {children}
                </Link>
              )
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
                  {item.external ? (
                    <ArrowUpRight size={18} style={{ color: c.accent }} />
                  ) : (
                    <ArrowRight size={18} style={{ color: c.accent }} />
                  )}
                </span>
              </CardWrapper>
            )
          })}
        </div>
      </section>

      {/* Call to action */}
      <CtaSection
        kickerTag="Join us"
        kickerText="Make it happen"
        heading={
          <>
            Want to help <em>with the work?</em>
          </>
        }
        description="Our initiatives run because of people who show up. Whether you want to volunteer, partner with us, or just learn more, reach out and let's talk."
        actions={
          <>
            <Link className="button button-white" to="/get-involved">
              Get involved <ArrowRight size={16} />
            </Link>
            {SHOW_SLACK && (
              <a
                className="button button-white"
                href={SLACK_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join our Slack <ArrowUpRight size={16} />
              </a>
            )}
          </>
        }
      />
    </main>
  )
}
