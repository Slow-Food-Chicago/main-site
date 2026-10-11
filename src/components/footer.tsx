import ChicagoStar from './chicago-star'
import SnailLogo from './snail-logo'
import { Heart, CheckCircle2, Mail } from 'lucide-react'
import { useState } from 'react';

export default function Footer() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribed(true);
    };
    return (
        <footer className="border-t border-border bg-snail-cream dark:bg-snail-dark-surface-darker text-foreground transition-colors" style={{ borderTopColor: 'var(--snail-sand)', background: 'var(--snail-cream-dark)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="inline-flex items-center gap-3">
              <SnailLogo size={42} showText={true} />
            </a>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--snail-warm-gray)', fontSize: '13px', lineHeight: '1.8' }}>
              <strong>Slow Food Chicago</strong> is a volunteer-run, grassroots chapter
              working toward a food system that is{" "}
              <span style={{ color: 'var(--snail-red)', fontWeight: 500 }}>Good, Clean, and Fair</span> for
              everyone. We connect eaters, growers, and makers across our city — rooted in
              Chicago's neighborhoods and part of a global Slow Food movement.
            </p>
            <div className="flex items-center gap-1.5 pt-1" style={{ color: 'var(--snail-warm-gray)', fontSize: '11px' }}>
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5" style={{ fill: 'var(--snail-red)', color: 'var(--snail-red)' }} />
              <span>by the Slow Food Chicago Volunteer Chapter</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <ChicagoStar size={12} />
              <ChicagoStar size={12} />
              <ChicagoStar size={12} />
              <ChicagoStar size={12} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--snail-warm-gray)' }}>
                Chicago, Illinois
              </span>
            </div>
          </div>

          {/* Quick Links — placeholder column for future use */}
          <div className="space-y-3">
            
          </div>

          {/* Slow Food Initiatives */}
          <div className="space-y-3">
            <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--snail-charcoal)', margin: 0 }}>
              Slow Food Projects
            </h4>
            <ul className="space-y-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <a
                  href="https://ark.slowfoodchicago.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '13px', color: 'var(--snail-warm-gray)', transition: 'color 160ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--snail-red)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--snail-warm-gray)')}
                >
                  Ark of Taste (Biodiversity) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://snails.slowfoodchicago.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '13px', color: 'var(--snail-warm-gray)', transition: 'color 160ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--snail-red)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--snail-warm-gray)')}
                >
                  Snail of Approval ↗
                </a>
              </li>
              <li>
                <a
                  href="https://slowfoodusa.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '13px', color: 'var(--snail-warm-gray)', transition: 'color 160ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--snail-red)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--snail-warm-gray)')}
                >
                  Slow Food USA Network ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--snail-charcoal)', margin: 0 }}>
              Stay Connected
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--snail-warm-gray)', margin: 0, lineHeight: 1.7 }}>
              Sign up for our newsletter to hear about things going on with the Slow Food Chicago chapter
            </p>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 6, background: '#f0fdf4', color: '#166534', fontSize: 12, fontWeight: 500 }}>
                <CheckCircle2 style={{ width: 16, height: 16, flexShrink: 0, color: '#16a34a' }} />
                <span>Thank you! You are subscribed to Slow Food Chicago news.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                  <Mail style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--snail-warm-gray)', pointerEvents: 'none' }} />
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
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    background: 'var(--snail-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 3,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 160ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--snail-red-dark)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--snail-red)')}
                >
                  Subscribe to Updates
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--snail-sand)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontSize: 11, color: 'var(--snail-warm-gray)' }}>
          <p style={{ margin: 0 }}>
            © 2026 Slow Food Chicago. An independent 501(c)(3) non-profit chapter.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a
              href="https://slowfoodusa.org/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', transition: 'color 160ms ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--snail-red)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--snail-warm-gray)')}
            >
              Privacy Policy
            </a>
            <a
              href="https://slowfoodusa.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', transition: 'color 160ms ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--snail-red)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--snail-warm-gray)')}
            >
              Slow Food USA
            </a>
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
};