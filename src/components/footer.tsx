import SnailLogo from './snail-logo'

export default function Footer() {
    return (
        <footer className="site-footer">
            <a className="brand footer-brand" href="#home">
                <SnailLogo />
                <span className="brand-name">Slow Food<span>Chicago</span></span>
            </a>
            <p>Good, clean, fair food for all.</p>
            <div className="footer-links">
                <a href="#about">Our movement</a>
                <a href="#gather">Gather with us</a>
            </div>
            <span className="copyright">© 2026 Slow Food Chicago</span>
        </footer>
    )
}