import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import ChicagoStar from '../components/ui/ChicagoStar'
import MemberModal, { type ModalMember } from '../components/board/MemberModal'
import { addPageAction } from '../telemetry'
import {
  executiveBoard,
  committeeMembers,
  committees,
  workingGroups,
  type Committee,
} from '../data/board'
import { SHOW_SLACK, SLACK_INVITE_URL, CONTACT_EMAIL } from '../data/constants'

const getBioPreview = (bio?: string) => {
  if (!bio) return ''
  const clean = bio.replace(/[*_#`[\]]/g, '').replace(/\s+/g, ' ').trim()
  return clean.length > 147 ? `${clean.substring(0, 147)}...` : clean
}

const hasMemberDetails = (
  m?: { bio?: unknown; headshot?: unknown; social?: unknown; socials?: unknown } | null
) => {
  if (!m) return false
  if (m.bio || m.headshot) return true
  const s = m.social ?? m.socials
  if (Array.isArray(s)) return s.length > 0
  return Boolean(s)
}

export default function BoardPage() {
  const [activeModal, setActiveModal] = useState<ModalMember | null>(null)

  const openModal = useCallback((member: ModalMember) => {
    if (member.name && hasMemberDetails(member)) {
      setActiveModal(member)
      addPageAction('modal_open', {
        modal_name: 'MemberModal',
        modal_type: 'member',
        member_name: member.name,
        role: member.role || 'Member',
        page: '/leadership',
      })
    }
  }, [])

  const closeModal = useCallback(() => setActiveModal(null), [])

  const renderGroupCard = (c: Committee) => {
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
                {c.url === '/events' ? 'View events →' : 'Visit project →'}
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
                  {hasMemberDetails(m) && (
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
                  {hasMemberDetails(m) && (
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
  }

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
            Our chapter is run entirely by volunteers, passionate food lovers who give their time
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
              The executive council is made up of each committee's chair(s) who elect an executive board of officers. 
              Together they set priorities, coordinate initiatives, and ensure every voice in the chapter shapes our direction.
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
            {committees.map((c) => {
              const chairs = committeeMembers[c.key]?.filter((m) => m.role === 'Chair') || []
              return (
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
                  <span className="council-badge council-badge--committee">
                    {chairs.length > 1 ? 'Committee Co-Chairs' : 'Committee Chair'}
                  </span>
                  <span className="council-role">{c.name}</span>
                  <span className="council-name">
                    {chairs.length > 0 ? (
                      chairs.map((m, i) => (
                        <span key={m.name}>
                          <span style={{ whiteSpace: 'nowrap' }}>{m.name}</span>
                          {i < chairs.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span className="board-vacant">Vacant</span>
                    )}
                  </span>
                </div>
              )
            })}
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
              The executive board is elected by the committee chairs and holds fiduciary and strategic
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
                  {hasMemberDetails(member) && member.name && (
                    <span className="headshot-hover-hint">View bio</span>
                  )}
                </div>
                <span className="exec-board-role">{member.role}</span>
                <span className="exec-board-name">
                  {member.name || <span className="board-vacant">Vacant</span>}
                </span>
                <p className="exec-board-bio">
                  {getBioPreview(member.bio)}
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
            {committees.map((c) => renderGroupCard(c))}
          </div>
        </div>
      </section>

      {/* ── Working Groups ──────────────────────────────────────────────── */}
      <section className="board-section board-section--cream" id="working-groups">
        <div className="board-section-inner">
          <header className="board-section-header">
            <div className="section-kicker">
              <span>04</span> Initiatives
            </div>
            <h3>Our Working Groups</h3>
            <p>
              Working groups focus on hands-on projects and specialized initiatives that preserve
              local foodways and cultivate community across the region.
            </p>
          </header>
          <div className="committee-grid">
            {workingGroups.map((wg) => renderGroupCard(wg))}
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
            committee or working group, attend events, or just lend a hand, there is a place for
            you here.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {SHOW_SLACK && (
              <a
                href={SLACK_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-white"
              >
                Join our Slack ↗
              </a>
            )}
            <a href={`mailto:${CONTACT_EMAIL}`} className="button button-white">
              Say hello ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
