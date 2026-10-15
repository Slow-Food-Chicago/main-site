import { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import SnailLogo from '../ui/SnailLogo'
import { EVENTBRITE_URL } from '../../data/constants'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  // Close menu on route change
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setIsOpen(false)
  }

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-nav-open')
    } else {
      document.body.classList.remove('mobile-nav-open')
    }
    return () => {
      document.body.classList.remove('mobile-nav-open')
    }
  }, [isOpen])

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Slow Food Chicago home">
        <SnailLogo size={36} />
        <span className="brand-name">
          Slow Food
          <span>Chicago</span>
        </span>
      </Link>

      {/* Desktop navigation */}
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/initiatives">Our Initiatives</Link>
        <a href={EVENTBRITE_URL} target="_blank" rel="noopener noreferrer">
          Events
        </a>
        <Link to="/board">Our Leadership</Link>
      </nav>

      {/* Desktop CTA */}
      <Link className="header-cta" to="/get-involved">
        Get involved <ArrowUpRight size={16} />
      </Link>

      {/* Mobile hamburger button */}
      <button
        type="button"
        className="hamburger-btn"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile nav drawer & backdrop */}
      {isOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`mobile-nav-drawer ${isOpen ? 'is-open' : ''}`}
        id="mobile-nav-menu"
        aria-hidden={!isOpen}
      >
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/initiatives" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
            Our Initiatives
          </Link>
          <a
            href={EVENTBRITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link"
            onClick={() => setIsOpen(false)}
          >
            Events <ArrowUpRight size={15} className="mobile-nav-ext-icon" />
          </a>
          <Link to="/board" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
            Our Leadership
          </Link>
        </nav>
        <div className="mobile-nav-cta-wrap">
          <Link
            className="button button-primary mobile-nav-cta"
            to="/get-involved"
            onClick={() => setIsOpen(false)}
          >
            Get involved <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  )
}
