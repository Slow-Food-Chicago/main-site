import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import ChicagoStar from '../ui/ChicagoStar'
import MemberModal, { type ModalMember } from './MemberModal'
import { executiveBoard, committeeMembers, committees } from '../../data/board'
import { SLACK_INVITE_URL, CONTACT_EMAIL } from '../../data/constants'

export default function Board() {
  const [activeModal, setActiveModal] = useState<ModalMember | null>(null)

  const openModal = useCallback((member: ModalMember) => {
    if (member.name && (member.bio || member.headshot)) setActiveModal(member)
  }, [])

  const closeModal = useCallback(() => setActiveModal(null), [])

  return (
    <div className="board-page">
      {activeModal && <MemberModal member={activeModal} onClose={closeModal} />}

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="board-hero">
        <div className="board-hero-inner">
          <h2>
            The people behind
            <br />
            <em>Slow Food Chicago.</em>
          </h2>
          <p className="board-hero-lead">
            Our chapter is run entirely by volunteers — passionate food lovers who give their time
            to build a better food community in Chicago and beyond.
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
            <div className="section-kicker">
              <span>01</span> Governance
            </div>
            <h3>Executive Council</h3>
            <p>
              The executive council is made up of executive board officers joined by each committee
              chair. Together they set priorities, coordinate initiatives, and ensure every voice
              in the chapter shapes our direction.
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
              <div
                className="council-card council-card--chair"
                key={`council-${c.key}`}
                style={
                  {
                    '--chair-accent': c.accent,
                    '--chair-tint': c.tint,
                  } as React.CSSProperties
                }
              >
                <span className="council-badge council-badge--committee">Committee Chair</span>
                <span className="council-role">{c.name}</span>
                <span className="council-name">
                  {committeeMembers[c.key]?.find((m) => m.role === 'Chair')?.name || (
                    <span className="board-vacant">Vacant</span>
                  )}
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
            <div className="section-kicker">
              <span>02</span> Leadership
            </div>
            <h3>Executive Board</h3>
            <p>
              The executive board is elected by chapter members and holds fiduciary and strategic
              responsibility for the chapter.
            </p>
          </header>
          <div className="exec-board-grid">
            {executiveBoard.map((member) => (
              <div className="exec-board-card" key={member.role}>
                <div
                  className="headshot-wrap"
                  onClick={() => (member.name ? openModal(member as ModalMember) : null)}
                >
                  <img
                    className="exec-board-headshot"
                    src={
                      member.headshot ||
                      'https://via.placeholder.com/avatar.png?size=250&shape=square'
                    }
                    width={250}
                    height={250}
                    alt={`Headshot of ${member.name || 'Vacant'}`}
                  />
                  {(member.bio || member.headshot) && member.name && (
                    <span className="headshot-hover-hint">View bio</span>
                  )}
                </div>
                <span className="exec-board-role">{member.role}</span>
                <span className="exec-board-name">
                  {member.name || <span className="board-vacant">Vacant</span>}
                </span>
                <p className="exec-board-bio">
                  {member.bio?.substring(0, 147)}
                  {member.bio && member.bio.length > 147 && '...'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Committees ──────────────────────────────────────────────────── */}
      <section className="board-section board-section--cream" id="committees">
        <div className="board-section-inner">
          <header className="board-section-header">
            <div className="section-kicker">
              <span>03</span> Get involved
            </div>
            <h3>Our Committees</h3>
            <p>
              Each committee drives a key area of Slow Food Chicago's work. Committee chairs sit
              on the executive council and welcome new volunteers at every meeting.
            </p>
          </header>
          <div className="committee-grid">
            {committees.map((c) => {
              const Icon = c.icon
              const chairs = committeeMembers[c.key]?.filter((m) => m.role === 'Chair') || []
              const members = committeeMembers[c.key]?.filter((m) => m.role === 'member') || []
              return (
                <article
                  className="committee-card"
                  key={c.key}
                  style={
                    {
                      '--card-accent': c.accent,
                      '--card-tint': c.tint,
                    } as React.CSSProperties
                  }
                >
                  <div className="committee-card-header">
                    <div className="committee-card-icon">
                      <Icon size={22} strokeWidth={1.6} />
                    </div>
                    {c.url &&
                      (c.url.startsWith('/') ? (
                        <Link to={c.url} className="committee-card-link">
                          View events →
                        </Link>
                      ) : (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="committee-card-link"
                        >
                          Visit project ↗
                        </a>
                      ))}
                  </div>
                  <h4 className="committee-card-name">{c.name}</h4>
                  <p className="committee-card-desc">{c.description}</p>
                  <div className="committee-card-leader">
                    <span className="committee-leader-label">
                      {chairs.length > 1 ? 'Co-Chairs' : 'Chair'}
                    </span>
                    {chairs.length > 0 ? (
                      chairs.map((m) => (
                        <span className="committee-leader-name" key={m.name}>
                          <div className="headshot-wrap" onClick={() => openModal(m)}>
                            <img
                              className="committee-headshot"
                              src={
                                m.headshot ||
                                'https://via.placeholder.com/avatar.png?size=100&shape=round'
                              }
                              width={100}
                              height={100}
                              alt={`Headshot of ${m.name || 'Vacant'}`}
                            />
                            {(m.bio || m.headshot) && (
                              <span className="headshot-hover-hint">View bio</span>
                            )}
                          </div>
                          {m.name}
                        </span>
                      ))
                    ) : (
                      <span className="committee-leader-name">
                        <div className="headshot-wrap">
                          <img
                            className="committee-headshot"
                            src="https://via.placeholder.com/avatar.png?size=100&shape=round"
                            width={100}
                            height={100}
                            alt="Headshot of Vacant"
                          />
                        </div>
                        <span className="board-vacant">Vacant</span>
                      </span>
                    )}
                  </div>
                  <div className="committee-card-leader">
                    <span className="committee-member-label">Members</span>
                    {members.length > 0 ? (
                      members.map((m) => (
                        <span className="committee-member-name" key={m.name}>
                          <div className="headshot-wrap" onClick={() => openModal(m)}>
                            <img
                              className="committee-headshot"
                              src={
                                m.headshot ||
                                'https://via.placeholder.com/avatar.png?size=100&shape=round'
                              }
                              width={100}
                              height={100}
                              alt={`Headshot of ${m.name || 'Vacant'}`}
                            />
                            {(m.bio || m.headshot) && (
                              <span className="headshot-hover-hint">View bio</span>
                            )}
                          </div>
                          {m.name}
                        </span>
                      ))
                    ) : (
                      <span className="committee-member-name">
                        <div className="headshot-wrap">
                          <img
                            className="committee-headshot"
                            src="https://via.placeholder.com/avatar.png?size=100&shape=round"
                            width={100}
                            height={100}
                            alt="Headshot of Awaiting Members"
                          />
                        </div>
                        <span className="board-vacant">Awaiting Members</span>
                      </span>
                    )}
                  </div>
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
            Slow Food Chicago runs entirely on volunteer energy. Whether you want to join a
            committee, attend events, or just lend a hand, there is a place for you here.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a
              href={SLACK_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-white"
            >
              Join our Slack ↗
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="button button-white">
              Say hello ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
