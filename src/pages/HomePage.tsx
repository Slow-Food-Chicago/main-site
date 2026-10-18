import {
  ArrowRight,
  ArrowUpRight,
  Sprout,
  Snail,
  UtensilsCrossed,
} from 'lucide-react'
import SectionKicker from '../components/ui/SectionKicker'
import ChicagoStar from '../components/ui/ChicagoStar'
import { principles } from '../data/principles'
import { SLACK_INVITE_URL, CONTACT_EMAIL } from '../data/constants'
import { Link } from 'react-router-dom'
import { getInvolvedWays, getInvolvedColorMap } from '../data/get-involved'

export default function HomePage() {
  return (
    <main>
      <section className="hero" id="home">
        <SectionKicker text="What is Slow Food?" />

        <h1>
          It is the notion that our environment, culture and economy are profoundly affected by{' '}
          <em>what we choose to eat.</em>
        </h1>

        <p className="hero-lead">
          We believe that everyone should have access to high-quality food produced in a sustainable and equitable way.
        </p>

        <div className="hero-vision-card">
          <h3>
            “Slow Food envisions a world in which all people can eat food that is good for them, good for the people who grow it, and good for the planet.”
          </h3>
        </div>

        <div className="hero-about-grid" id="about">
          <div className="hero-about-copy">
            <h3>About Slow Food Chicago</h3>
            <p>
              Slow Food Chicago is part of a global, grassroots movement imagining a better way to
              eat—and making it happen, right here in our neighborhoods.
            </p>
            <p>
              Slow Food Chicago is a member-supported chapter of Slow Food run by an all-volunteer Board
              of Directors and network of volunteers who help with operations and events. Slow Food
              Chicago is one of the largest chapters of Slow Food USA with more than 500 members and
              5,000 supporters.
            </p>
            <div className="hero-about-actions">
              <a className="button button-primary" href="#get-involved">
                Join the movement <ArrowRight size={16} />
              </a>
              <Link className="button button-forest" to="/initiatives">
                Our Initiatives <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85"
              alt="A colorful, freshly prepared seasonal meal shared around a table"
            />
            <div className="image-caption">
              <span className="caption-icon">
                <Sprout size={18} />
              </span>
              <span>
                <strong>From our place,</strong>
                <br />
                for every place.
              </span>
            </div>
            <span className="image-sun" aria-hidden="true">
              ✳
            </span>
          </div>
        </div>

        <div className="hero-pillars-wrap">
          <h4 className="hero-pillars-title">Through our events and programs, we:</h4>
          <div className="hero-pillars-grid">
            <div className="hero-pillar-card">
              <div className="hero-pillar-icon-wrap">
                <Sprout size={20} />
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

        <div className="intro-rule">
          <div className="intro-rule-item">
            <ChicagoStar size={16} className="intro-star" />
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
            <ChicagoStar size={16} className="intro-star" />
          </div>
        </div>
      </section>

      <section className="principles-section" id="principles">
        <div className="principles-heading">
          <div>
            <SectionKicker text="Our north star" />
            <h2>
              Good, clean <em>and</em> fair.
            </h2>
          </div>
          <p>We believe that everyone should have access to high-quality food produced in a sustainable and equitable way.
            This is distilled into three simple ideas.</p>
        </div>
        <div className="principle-grid">
          {principles.map((principle) => {
            const Icon = principle.icon
            return (
              <article className={`principle-card ${principle.color}`} key={principle.number}>
                <span className="principle-number">{principle.number}</span>
                <span className="principle-icon">
                  <Icon size={23} strokeWidth={1.7} />
                </span>
                <h3>
                  {principle.title}
                  <span>.</span>
                </h3>
                <p>{principle.description}</p>
                <span className="card-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </article>
            )
          })}
        </div>
      </section>

            {/* Ways to get involved */}
            <section className="involve-section" id='get-involved'>
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
                        <span className="involve-number">{w.number}</span>
                        <span className="involve-icon-wrap">
                          <Icon size={21} strokeWidth={1.7} />
                        </span>
                      </div>
                      <h3 className="involve-card-title">{w.title}</h3>
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

      <section className="join-section">
        <div className="join-decoration" aria-hidden="true">
          ✳
        </div>
        <div className="join-content">
          <SectionKicker text="Make room at the table" />
          <h2>
            Good food needs <em>good people.</em>
          </h2>
          <p>
            Bring your appetite, your ideas, and your whole self. Let&apos;s make food a little
            better for everyone.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              className="button button-white"
              href={SLACK_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Slack <ArrowUpRight size={17} />
            </a>
            <a className="button button-white" href={`mailto:${CONTACT_EMAIL}`}>
              Say hello <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="join-aside">
          <span className="join-aside-mark">
            <Snail size={27} style={{ color: 'white' }} />
          </span>
          <p>"The table is where community begins."</p>
          <span>Slow Food Chicago</span>
        </div>
      </section>
    </main>
  )
}
