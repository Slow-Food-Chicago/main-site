import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, CheckCircle2, Mail, MessageSquare } from 'lucide-react'
import ChicagoStar from '../ui/ChicagoStar'
import horizontalLogo from '../../assets/colored-horizontal-logo.png'
import { SLACK_INVITE_URL } from '../../data/constants'
import {
  footerCommunityLinks,
  footerProjectLinks,
  footerBottomLinks,
} from '../../data/navigation'

export default function Footer() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [subscribeError, setSubscribeError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubscribeError('')

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}zeffy-contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        }),
      })
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setSubscribed(true)
    } catch (err) {
      setSubscribeError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer
      className="border-t border-border bg-snail-cream dark:bg-snail-dark-surface-darker text-foreground transition-colors"
      style={{ borderTopColor: 'var(--snail-sand)', background: 'var(--snail-cream-dark)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <img
              src={horizontalLogo}
              alt="Slow Food Chicago"
              className="brand-logo"
            />  
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: 'var(--snail-warm-gray)', fontSize: '13px', lineHeight: '1.8' }}
            >
              <strong>Slow Food Chicago</strong> is a volunteer-run, grassroots chapter
              working toward a food system that is{' '}
              <span style={{ color: 'var(--snail-red)', fontWeight: 500 }}>
                Good, Clean, and Fair
              </span>{' '}
              for everyone. We connect eaters, growers, and makers across our city — rooted in
              Chicago's neighborhoods and part of a global Slow Food movement.
            </p>
            <div
              className="footer-volunteer-credit flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-1 sm:gap-1.5 pt-1"
              style={{ color: 'var(--snail-warm-gray)', fontSize: '11px', lineHeight: '1.5' }}
            >
              <div className="flex items-center gap-1.5 shrink-0">
                <span>Made with</span>
                <Heart
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ fill: 'var(--snail-red)', color: 'var(--snail-red)' }}
                  aria-hidden="true"
                />
              </div>
              <span>by the Slow Food Chicago Volunteer Chapter</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <ChicagoStar size={12} />
              <ChicagoStar size={12} />
              <ChicagoStar size={12} />
              <ChicagoStar size={12} />
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--snail-warm-gray)',
                }}
              >
                Chicago, Illinois
              </span>
            </div>
          </div>

          {/* Community Links */}
          <div className="space-y-3">
            <h4
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--snail-charcoal)',
                margin: 0,
              }}
            >
              Community
            </h4>
            <ul className="space-y-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerCommunityLinks.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '13px',
                        color: 'var(--snail-warm-gray)',
                        transition: 'color 160ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--snail-red)')}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--snail-warm-gray)')
                      }
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      style={{
                        fontSize: '13px',
                        color: 'var(--snail-warm-gray)',
                        transition: 'color 160ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--snail-red)')}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--snail-warm-gray)')
                      }
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Slow Food Initiatives */}
          <div className="space-y-3">
            <h4
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--snail-charcoal)',
                margin: 0,
              }}
            >
              Slow Food Projects
            </h4>
            <ul className="space-y-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerProjectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '13px',
                      color: 'var(--snail-warm-gray)',
                      transition: 'color 160ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--snail-red)')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--snail-warm-gray)')
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--snail-charcoal)',
                margin: 0,
              }}
            >
              Stay Connected
            </h4>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--snail-warm-gray)',
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              Sign up for our newsletter to hear about things going on with the Slow Food Chicago
              chapter
            </p>
            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 12px',
                  borderRadius: 6,
                  background: '#f0fdf4',
                  color: '#166534',
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                <CheckCircle2
                  style={{ width: 16, height: 16, flexShrink: 0, color: '#16a34a' }}
                />
                <span>Thank you! You are subscribed to Slow Food Chicago news.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  style={inputStyle}
                />
                <div style={{ position: 'relative' }}>
                  <Mail
                    style={{
                      position: 'absolute',
                      left: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 14,
                      height: 14,
                      color: 'var(--snail-warm-gray)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ ...inputStyle, paddingLeft: 32 }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    background: 'var(--snail-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 3,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: submitting ? 'default' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    transition: 'background 160ms ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'var(--snail-red-dark)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'var(--snail-red)')
                  }
                >
                  {submitting ? 'Subscribing…' : 'Subscribe to Updates'}
                </button>
                {subscribeError && (
                  <div
                    role="alert"
                    style={{ fontSize: 12, fontWeight: 500, color: '#b91c1c' }}
                  >
                    {subscribeError}
                  </div>
                )}
              </form>
            )}
            <div style={{ paddingTop: 6 }}>
              <a
                href={SLACK_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--snail-charcoal)',
                  background: 'white',
                  border: '1px solid var(--snail-sand)',
                  padding: '7px 12px',
                  borderRadius: 3,
                  textDecoration: 'none',
                  transition: 'all 160ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--snail-red)'
                  e.currentTarget.style.color = 'var(--snail-red)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--snail-sand)'
                  e.currentTarget.style.color = 'var(--snail-charcoal)'
                }}
              >
                <MessageSquare style={{ width: 14, height: 14, color: 'var(--snail-red)' }} />
                <span>Join our Slack ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid var(--snail-sand)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            fontSize: 11,
            color: 'var(--snail-warm-gray)',
          }}
        >
          <p style={{ margin: 0 }}>
            © 2026 Slow Food Chicago. An independent 501(c)(3) non-profit chapter.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {footerBottomLinks.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', transition: 'color 160ms ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--snail-red)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--snail-warm-gray)')}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  style={{ color: 'inherit', transition: 'color 160ms ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--snail-red)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--snail-warm-gray)')}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  background: 'white',
  border: '1px solid var(--snail-sand)',
  borderRadius: 3,
  fontSize: 12,
  color: 'var(--snail-charcoal)',
  outline: 'none',
  boxSizing: 'border-box',
}
