import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import horizontalLogo from '../../assets/colored-horizontal-logo.png'
import { initiatives } from '../../data/initiatives'
import { INSTAGRAM_URL } from '../../data/constants'
import { InstagramIcon } from '../board/SocialLink'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileInitiativesOpen, setMobileInitiativesOpen] = useState(false)
  const location = useLocation()
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close menus on route change
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setIsOpen(false)
    setDropdownOpen(false)
  }

  // Handle desktop dropdown hover timing
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false)
    }, 150)
  }

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  // Close menus on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setDropdownOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
        <img
          src={horizontalLogo}
          alt="Slow Food Chicago"
          className="brand-logo"
        />
      </Link>

      {/* Desktop navigation */}
      <nav className="main-nav" aria-label="Main navigation">
        <div
          className={`nav-dropdown ${dropdownOpen ? 'is-open' : ''}`}
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className="nav-dropdown-trigger"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span>Our Initiatives</span>
            <ChevronDown size={14} className="nav-dropdown-chevron" />
          </button>

          {dropdownOpen && (
            <div className="nav-dropdown-menu" role="menu">
              <Link
                to="/initiatives"
                className="nav-dropdown-item"
                role="menuitem"
                onClick={() => setDropdownOpen(false)}
                style={{ fontWeight: 700 }}
              >
                All Initiatives
              </Link>
              <div className="nav-dropdown-divider" />
              {initiatives.map((item) =>
                item.external ? (
                  <a
                    key={item.number}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-dropdown-item"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
                  </a>
                ) : (
                  <Link
                    key={item.number}
                    to={item.href}
                    className="nav-dropdown-item"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>{item.title}</span>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
        <Link to="/board">Our Leadership</Link>
      </nav>

      {/* Desktop CTA & Social */}
      <Link className="header-cta" to="/events">
        Events <ArrowUpRight size={16} />
      </Link>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="header-social"
        aria-label="Slow Food Chicago on Instagram"
        title="Slow Food Chicago on Instagram"
      >
        <InstagramIcon size={18} />
      </a>

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
          <div className="mobile-nav-group">
            <div className="mobile-nav-group-header">
              <Link
                to="/initiatives"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                Our Initiatives
              </Link>
              <button
                type="button"
                className="mobile-nav-toggle"
                aria-label="Toggle initiatives submenu"
                aria-expanded={mobileInitiativesOpen}
                onClick={() => setMobileInitiativesOpen(!mobileInitiativesOpen)}
              >
                <ChevronDown
                  size={20}
                  style={{
                    transform: mobileInitiativesOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 180ms ease',
                  }}
                />
              </button>
            </div>
            {mobileInitiativesOpen && (
              <div className="mobile-nav-sublinks">
                <Link
                  to="/initiatives"
                  className="mobile-nav-sublink"
                  onClick={() => setIsOpen(false)}
                  style={{ fontWeight: 700 }}
                >
                  All Initiatives
                </Link>
                {initiatives.map((item) =>
                  item.external ? (
                    <a
                      key={item.number}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-nav-sublink"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight size={14} className="mobile-nav-ext-icon" />
                    </a>
                  ) : (
                    <Link
                      key={item.number}
                      to={item.href}
                      className="mobile-nav-sublink"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
          <Link to="/events" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
            Events
          </Link>
          <Link to="/board" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
            Our Leadership
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link"
            onClick={() => setIsOpen(false)}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <InstagramIcon size={18} />
              Instagram
            </span>
            <ArrowUpRight size={16} className="mobile-nav-ext-icon" />
          </a>
        </nav>
      </div>
    </header>
  )
}
