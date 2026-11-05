import {
  ArrowRight,
  ArrowUpRight,
  Snail,
  UtensilsCrossed,
  Megaphone
} from 'lucide-react'
import SectionKicker from '../components/ui/SectionKicker'
import ChicagoStar from '../components/ui/ChicagoStar'
import { principles } from '../data/principles'
import { Link } from 'react-router-dom'
import { getInvolvedWays, getInvolvedColorMap } from '../data/get-involved'

export default function HomePage() {
  return (
    <main>


      {/* ── About Slow Food Chicago ── */}
      <section className="home-about-section" id="about">
        <div className="home-about-header">
          <div className="home-about-heading">
            <SectionKicker text="Who we are" />
            <h2>
              About Slow Food <em>Chicago.</em>
            </h2>
          </div>
          <div className="home-about-copy">
            <p>
              Slow Food Chicago is part of a global, grassroots movement imagining a better way to
              eat—and making it happen, right here in our neighborhoods.
            </p>
            <p>
              We are a member-supported chapter run by an all-volunteer <Link to='/board' style={{color: "var(--snail-red)"}}>Executive Council</Link>. 
              We also rely on a network of volunteers who help with operations and events. 
              With more than 500 members and 5,000 supporters, Slow Food Chicago is one of 
              the largest chapters in the US.
            </p>
          </div>
          <div className="intro-rule">
            <div className="intro-rule-item">
              <ChicagoStar size={16} className="intro-star intro-star--flank" />
              <span>Chicago, Illinois</span>
            </div>
            <div className="intro-rule-stars" aria-label="Four Chicago Stars">
              <ChicagoStar size={17} className="intro-star" />
              <ChicagoStar size={17} className="intro-star" />
              <ChicagoStar size={17} className="intro-star" />
              <ChicagoStar size={17} className="intro-star" />
            </div>
            <div className="intro-rule-item">
              <span>Since 2001</span>
              <ChicagoStar size={16} className="intro-star intro-star--flank" />
            </div>
          </div>
        </div>

        <div className="hero-pillars-wrap">
          <h4 className="hero-pillars-title">Through our events and programs, we:</h4>
          <div className="hero-pillars-grid">
            <div className="hero-pillar-card">
              <div className="hero-pillar-icon-wrap">
                <Megaphone size={20} />
              </div>
              <p>Advocate for renewed interest in and support for our local food culture</p>
            </div>
            <div className="hero-pillar-card">
              <div className="hero-pillar-icon-wrap">
                <Snail size={20} />
              </div>
              <p>Promote biodiverse and sustainable producers and purveyors in our community</p>
            </div>
            <div className="hero-pillar-card">
              <div className="hero-pillar-icon-wrap">
                <UtensilsCrossed size={20} />
              </div>
              <p>Bring people together through the common language of food</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="principles-section" id="principles">
        <div className="principles-heading">
          <div>
            <SectionKicker text="Our north star" />
            <h2>
              Good, clean <em>and</em> fair.
            </h2>
          </div>
          <p>
            We believe that everyone should have access to high-quality food produced in a
            sustainable and equitable way. This is distilled into three simple ideas.
          </p>
        </div>
        <div className="principle-grid">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <article className={`principle-card ${principle.color}`} key={principle.number}>
                <span className="principle-icon">
                  <Icon size={23} strokeWidth={1.7} />
                </span>
                <h3>
                  {principle.title}
                  <span>.</span>
                </h3>
                <p>{principle.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Ways to get involved ── */}
      <section className="involve-section" id="get-involved">
        <div className="involve-heading">
          <SectionKicker text="ways to join us" />
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
                  <h3 className="involve-card-title">{w.title}</h3>
                  <span className="involve-icon-wrap">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                </div>
                
                <p className="involve-card-desc">{w.description}</p>
                {w.cta &&
                  (w.cta.href.startsWith('/') ? (
                    <Link className="involve-card-link" to={w.cta.href}>
                      {w.cta.label} <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <a
                      className="involve-card-link"
                      href={w.cta.href}
                      target={w.cta.href.startsWith('http') ? '_blank' : undefined}
                      rel={w.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {w.cta.label} <ArrowRight size={14} />
                    </a>
                  ))}
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
