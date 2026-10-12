import './board.css'
import { Snail, Users, Handshake, Megaphone, Wheat } from 'lucide-react'
import ChicagoStar from './chicago-star'
import dom from "../assets/dom.jpeg";
import jody from "../assets/jody.jpg"

/* ─── Data ──────────────────────────────────────────────────────────────── */

const executiveBoard = [
  { role: 'President',          name: 'Dom Amato', headshot: dom, bio: "A big plant nerd who loves food and building communities. Lets create a more resilient future!" },
  { role: 'Vice President',     name: 'Diane Williams', headshot: '', bio: "" },
  { role: 'Secretary',          name: 'Jody Klinedinst', headshot: jody, bio: "an artisan cheesemaker and the co-owner of J2K Capraio, a family-operated creamery based on a 22-acre goat farm in Walkerton, Indiana." },
  { role: 'Treasurer',          name: '' },
]

const committees = [
  {
    key: 'snail',
    name: 'Snail of Approval',
    leader: '',
    leaderTitle: 'Committee Chair',
    description:
      'Recognizes Chicago-area food and beverage businesses that embody the Slow Food values of Good, Clean, and Fair.',
    icon: Snail,
    accent: 'var(--snail-red)',
    tint: 'var(--snail-red-light)',
    url: 'https://snails.slowfoodchicago.org',
  },
  {
    key: 'partnerships',
    name: 'Partnerships',
    leader: '',
    leaderTitle: 'Committee Chair',
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
    leader: '',
    leaderTitle: 'Committee Chair',
    description:
      'Tells the Slow Food Chicago story — managing our newsletter, social media, website, and community outreach.',
    icon: Megaphone,
    accent: 'var(--snail-forest)',
    tint: 'var(--snail-forest-light)',
    url: null,
  },
  {
    key: 'ark',
    name: 'Midwest Ark of Taste',
    leader: '',
    leaderTitle: 'Committee Chair',
    description:
      'Catalogs and champions endangered Midwestern food biodiversity — from heirloom seeds to heritage breeds — as part of the global Slow Food Ark of Taste.',
    icon: Wheat,
    accent: 'var(--snail-orange)',
    tint: 'var(--snail-orange-light)',
    url: 'https://ark.slowfoodchicago.org',
  },
]

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function Board() {
  return (
    <div className="board-page">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="board-hero">
        <div className="board-hero-inner">
          <h2>
            The people behind<br />
            <em>Slow Food Chicago.</em>
          </h2>
          <p className="board-hero-lead">
            Our chapter is run entirely by volunteers — passionate food lovers
            who give their time to build a better food community in Chicago and beyond.
          </p>
          <div className="board-hero-rule">
            <ChicagoStar size={11} />
            <ChicagoStar size={11} />
            <ChicagoStar size={11} />
            <ChicagoStar size={11} />
            <span>Chicago, Illinois · Est. 2001</span>
          </div>
        </div>
      </section>

      {/* ── Executive Board ─────────────────────────────────────────────── */}
      <section className="board-section board-section--cream" id="executive-board">
        <div className="board-section-inner">
          <header className="board-section-header">
            <div className="section-kicker"><span>01</span> Leadership</div>
            <h3>Executive Board</h3>
            <p>
              The executive board is elected by chapter members and holds
              fiduciary and strategic responsibility for the chapter.
            </p>
          </header>
          <div className="exec-board-grid">
            {executiveBoard.map((member) => (
              <div className="exec-board-card" key={member.role}>
                <img
                  className="exec-board-headshot"
                  src={member.headshot || "https://via.placeholder.com/250"}
                  width={250}
                  height={250}
                  alt={`Headshot of ${member.name || 'Vacant'}`}
                />
                <span className="exec-board-role">{member.role}</span>
                <span className="exec-board-name">
                  {member.name || <span className="board-vacant">Vacant</span>}
                </span>
                <p className="exec-board-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Executive Council ───────────────────────────────────────────── */}
      <section className="board-section board-section--white" id="executive-council">
        <div className="board-section-inner">
          <header className="board-section-header">
            <div className="section-kicker"><span>02</span> Governance</div>
            <h3>Executive Council</h3>
            <p>
              The executive council is made up of executive board officers
              joined by each committee chair. Together they set priorities,
              coordinate initiatives, and ensure every voice in the chapter
              shapes our direction.
            </p>
          </header>
          <div className="council-grid">
            {/* Board officers in council */}
            {executiveBoard.map((member) => (
              <div className="council-card council-card--officer" key={`council-${member.role}`}>
                <span className="council-badge">Executive Board</span>
                <span className="council-role">{member.role}</span>
                <span className="council-name">
                  {member.name || <span className="board-vacant">Vacant</span>}
                </span>
              </div>
            ))}
            {/* Committee chairs in council */}
            {committees.map((c) => (
              <div className="council-card council-card--chair" key={`council-${c.key}`}
                style={{ '--chair-accent': c.accent, '--chair-tint': c.tint } as React.CSSProperties}>
                <span className="council-badge council-badge--committee">Committee Chair</span>
                <span className="council-role">{c.name}</span>
                <span className="council-name">
                  {c.leader || <span className="board-vacant">Vacant</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Committees ──────────────────────────────────────────────────── */}
      <section className="board-section board-section--cream" id="committees">
        <div className="board-section-inner">
          <header className="board-section-header">
            <div className="section-kicker"><span>03</span> Get involved</div>
            <h3>Our Committees</h3>
            <p>
              Each committee drives a key area of Slow Food Chicago's work.
              Committee chairs sit on the executive council and welcome new
              volunteers at every meeting.
            </p>
          </header>
          <div className="committee-grid">
            {committees.map((c) => {
              const Icon = c.icon
              return (
                <article className="committee-card" key={c.key}
                  style={{ '--card-accent': c.accent, '--card-tint': c.tint } as React.CSSProperties}>
                  <div className="committee-card-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h4 className="committee-card-name">{c.name}</h4>
                  <p className="committee-card-desc">{c.description}</p>
                  <div className="committee-card-leader">
                    <span className="committee-leader-label">Chair</span>
                    <span className="committee-leader-name">
                      {c.leader || <span className="board-vacant">Vacant</span>}
                    </span>
                  </div>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="committee-card-link"
                    >
                      Visit project ↗
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Join CTA ────────────────────────────────────────────────────── */}
      <section className="board-cta">
        <div className="board-cta-inner">
          <Users size={28} strokeWidth={1.5} />
          <h3>Want to get involved?</h3>
          <p>
            Slow Food Chicago runs entirely on volunteer energy. Whether you
            want to join a committee, attend events, or just lend a hand, there
            is a place for you here.
          </p>
          <a href="mailto:hello@slowfoodchicago.org" className="button button-white">
            Say hello ↗
          </a>
        </div>
      </section>

    </div>
  )
}
