import './board.css'
import { Snail, Users, Handshake, Megaphone, Wheat } from 'lucide-react'
import ChicagoStar from './chicago-star'
import dom from "../assets/dom.jpeg";
import jody from "../assets/jody.jpg"
import diane from "../assets/diane.jpeg"
import gabi from "../assets/gabi.JPG"
import christian from "../assets/christian.jpeg"

/* ─── Data ──────────────────────────────────────────────────────────────── */

type BoardMember = {
  role: string,
  name?: string,
  headshot?: string | null,
  bio?: string,
}

type CommitteeMember = {
  role: string,
  name: string,
  headshot?: string | null,
  bio?: string,
}

type Committee = {
  key: string,
  name: string,
  description: string,
  icon: React.ComponentType<{ size: number, strokeWidth: number }>,
  accent: string,
  tint: string,
  url?: string | null,
}

const executiveBoard: BoardMember[] = [
  { role: 'President', name: 'Dom Amato', headshot: dom, bio: "I'm a big plant nerd who loves food and building communities. Lets create a more resilient future!" },
  {
    role: 'Vice President', name: 'Diane Williams', headshot: diane, bio: `
    I became interested in the Slow Food movement after reading about its founding by Carlo Petrini, becoming a Slow Food member in the early 2000s, joining the Board in 2023. 
    I was raised on a fourth generation, McHenry County dairy farm. Good food and clean farm crops were part of my upbringing. 
    In my professional life, I was an economic development consultant to the public sector. 
    Routinely engaging with local food businesses in client communities was a major component of my practice. 
    Having retired in 2023, I now volunteer weekly with two area food banks. 
    For me, seeing the food system from these varied perspectives reinforces my belief in Slow Food’s mission of good, clean, and fair food for all and a commitment to support Slow Food’s important work.
    ` },
  { role: 'Secretary', name: 'Jody Klinedinst', headshot: jody, bio: "an artisan cheesemaker and the co-owner of J2K Capraio, a family-operated creamery based on a 22-acre goat farm in Walkerton, Indiana." },
  { role: 'Treasurer', name: '' },
]

const committeeMembers: Record<string, CommitteeMember[]> = {
  'comms': [
    { role: 'Chair', name: 'Vanshi Jhumkhawala', headshot: null, bio: '' },
    { role: 'member', name: 'Benji Corpuz', headshot: null, bio: '' },
  ],
  'partnerships': [
    { role: 'Chair', name: 'Christian Hunter', headshot: christian, bio: 'is currently the only Black chef in Chicago with a Michelin star, and one of only two Black chefs in the country with the honor.' },
    { role: 'member', name: 'Dfrantz Smart', headshot: null, bio: '' },
    { role: 'member', name: 'Benji Corpuz', headshot: null, bio: '' },
    { role: 'member', name: 'Gabi Medina', headshot: gabi, bio: 'Me llamo Gabriela, but please call me Gabi. I’m an Ecuadorian-born, US-raised bartender determined to lift the stories of indigenous drink-makers of the Americas. I named my business Chuchaqui Cocktails to encompass where I come from and where I want to go. Chuchaqui is a word in Kichwa, one of the indigenous languages of present-day Ecuador. It means to be hungover. Intentionally goofy. After more than ten years in the hospitality industry, only recently can I claim to understand what my ancestors already knew: slow food means care and intention, a long-term investment in and for the land and the people. That same structure encourages me to focus on education about who we can thank for what’s in our cocktail, with curiosity and respect. ¡Salud!' },
  ],
  'snail': [],
  'ark': [],
}

const committees: Committee[] = [
  {
    key: 'snail',
    name: 'Snail of Approval',
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
      'Tells the Slow Food Chicago story — managing our newsletter, social media, website, and community outreach.',
    icon: Megaphone,
    accent: 'var(--snail-forest)',
    tint: 'var(--snail-forest-light)',
    url: null,
  },
  {
    key: 'ark',
    name: 'Midwest Ark of Taste',
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

      {/* ── Executive Council ───────────────────────────────────────────── */}
      <section className="board-section board-section--white" id="executive-council">
        <div className="board-section-inner">
          <header className="board-section-header">
            <div className="section-kicker"><span>01</span> Governance</div>
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
                  {committeeMembers[c.key]?.filter((m) => m.role === 'Chair')?.[0]?.name || <span className="board-vacant">Vacant</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Executive Board ─────────────────────────────────────────────── */}
      <section className="board-section board-section--cream" id="executive-board">
        <div className="board-section-inner">
          <header className="board-section-header">
            <div className="section-kicker"><span>02</span> Leadership</div>
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
                  src={member.headshot || "https://via.placeholder.com/avatar.png?size=250&shape=square"}
                  width={250}
                  height={250}
                  alt={`Headshot of ${member.name || 'Vacant'}`}
                />
                <span className="exec-board-role">{member.role}</span>
                <span className="exec-board-name">
                  {member.name || <span className="board-vacant">Vacant</span>}
                </span>
                <p className="exec-board-bio">{member.bio?.substring(0, 147)}{member.bio && member.bio.length > 147 && '...'}</p>
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
                    <span className="committee-leader-label">{committeeMembers[c.key]?.filter((m) => m.role === 'Chair')?.length > 1 ? 'Co-Chairs' : 'Chair'}</span>
                    {
                      committeeMembers[c.key]?.filter((m) => m.role === 'Chair')?.map((m) =>
                        <div><span className="committee-leader-name">
                          <img className="committee-headshot"
                            src={m.headshot || "https://via.placeholder.com/avatar.png?size=100&shape=round"}
                            width={100}
                            height={100}
                            alt={`Headshot of ${m.name || 'Vacant'}`} />{m.name}
                        </span>
                          {m.bio && <p className="committee-leader-bio">{m.bio.substring(0, 160)}{m.bio.length > 160 ? '...' : ''}</p>}
                        </div>
                      ) || <span className="board-vacant">Vacant</span>
                    }

                  </div>
                  <div className="committee-card-leader">
                    <span className="committee-member-label">Members</span>
                    {committeeMembers[c.key]?.filter((m) => m.role === 'member')?.map((m) =>
                      <span className="committee-member-name">
                        <img className="committee-headshot"
                          src={m.headshot || "https://via.placeholder.com/avatar.png?size=100&shape=round"}
                          width={100}
                          height={100}
                          alt={`Headshot of ${m.name || 'Vacant'}`} />{m.name}
                      </span>
                    )}
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
