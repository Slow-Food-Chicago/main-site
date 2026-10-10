import {
  ArrowUpRight,

} from 'lucide-react'

import SnailLogo from './snail-logo'

export default function Header() {

    return (
        <header className="site-header">
        <a className="brand" href="#home" aria-label="Slow Food Chicago home">
          <SnailLogo size={40} />
          <span className="brand-name">
            Slow Food
            <span>Chicago</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#about">Our movement</a>
          <a href="#principles">Good, clean, fair</a>
          <a href="#gather">Gather with us</a>
        </nav>
        <a className="header-cta" href="#get-involved">
          Get involved <ArrowUpRight size={16} />
        </a>
      </header>
    )
}