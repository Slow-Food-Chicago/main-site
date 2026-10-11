import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SnailLogo from './snail-logo'

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Slow Food Chicago home">
        <SnailLogo size={40} />
        <span className="brand-name">
          Slow Food
          <span>Chicago</span>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {/* <a href="/#about">Our movement</a>
        <a href="/#principles">Good, clean, fair</a>
        <a href="/#gather">Gather with us</a> */}
        <a href="https://www.eventbrite.com/o/22780790031" target="_blank" rel="noopener noreferrer">Events</a>
        <Link to="/board">Our Leadership</Link>
      </nav>
      <Link className="header-cta" to="/get-involved">
        Get involved <ArrowUpRight size={16} />
      </Link>
    </header>
  )
}