import type React from 'react'
import { ArrowRight, ArrowUpRight, Snail } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import SectionKicker from '../components/ui/SectionKicker'
import { getInvolvedWays, getInvolvedColorMap } from '../data/get-involved'
import { SLACK_INVITE_URL, CONTACT_EMAIL } from '../data/constants'

export default function GetInvolvedPage() {
  return (
    <main>
      {/* Hero */}
      <PageHero
        kickerTag="Make room"
        kickerText="Get Involved"
        title={
          <>
            There's a place <em>for you here.</em>
          </>
        }
        description="Slow Food Chicago is a community of farmers, cooks, eaters, and advocates. Whether you have five minutes or five hours a week—you belong here."
        asideIcon={Snail}
        asideColor="var(--snail-red)"
        actions={
          <>
            <a
              className="button button-primary"
              href={SLACK_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Slack <ArrowUpRight size={16} />
            </a>
            <a className="button button-forest" href={`mailto:${CONTACT_EMAIL}`}>
              Say hello <ArrowUpRight size={16} />
            </a>
          </>
        }
      />

      {/* Ways to get involved */}
      <section className="involve-section">
        <div className="involve-heading">
          <SectionKicker tag="06" text="ways to join us" />
          <h2 className="involve-title">
            Pick how you want to <em>show up.</em>
          </h2>
        </div>
        <div className="involve-grid">
          {getInvolvedWays.map((w) => {
            const c = getInvolvedColorMap[w.color]
            const Icon = w.icon
            return (
              <article
                className="involve-card"
                key={w.number}
                style={
                  {
                    '--involve-accent': c.accent,
                    '--involve-bg': c.bg,
                    '--involve-border': c.border,
                  } as React.CSSProperties
                }
              >
                <div className="involve-card-top">
                  <span className="involve-number">{w.number}</span>
                  <span className="involve-icon-wrap">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                </div>
                <h3 className="involve-card-title">{w.title}</h3>
                <p className="involve-card-desc">{w.description}</p>
                {w.cta && (
                  <a
                    className="involve-card-link"
                    href={w.cta.href}
                    target={w.cta.href.startsWith('http') ? '_blank' : undefined}
                    rel={w.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {w.cta.label} <ArrowRight size={14} />
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* Call to action */}
      <CtaSection
        kickerTag="Questions?"
        kickerText="Reach out"
        heading={
          <>
            Questions? Just <em>reach out.</em>
          </>
        }
        description="We're a small, volunteer-run chapter. Join our Slack community or reach out by email anytime."
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
              {CONTACT_EMAIL} <ArrowUpRight size={16} />
            </a>
          </>
        }
      />
    </main>
  )
}
