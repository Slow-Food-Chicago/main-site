import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Sprout,
  Utensils,
  HeartHandshake,
  Snail

} from 'lucide-react'

import Header from './components/header'
import Footer from './components/footer'

const principles = [
  {
    number: '01',
    title: 'Good',
    description:
      'Food that is delicious, seasonal, and rooted in the places and traditions that make it special.',
    color: 'red',
    icon: Utensils
  },
  {
    number: '02',
    title: 'Clean',
    description:
      'Food grown with care for the land, the people who grow it, and the future we share.',
    color: 'blue',
    icon: Sprout
  },
  {
    number: '03',
    title: 'Fair',
    description:
      'Food systems that value everyone at the table—from farmers and cooks to our neighbors.',
    color: 'green',
    icon: HeartHandshake
  },
]

function App() {
  return (
    <div className="site-shell">
      <Header />

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span /> A food community for all</p>
            <h1>
              A more delicious
              <br />
              <span>Chicago</span> starts
              <br />
              at the table.
            </h1>
            <p className="hero-description">
              We bring people together around good food—and work toward a food
              system that is good for people, the planet, and our city.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#get-involved">
                Join the movement <ArrowRight size={17} />
              </a>
              <a className="text-link" href="#about">
                Get to know us <ArrowDown size={15} />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85"
              alt="A colorful, freshly prepared seasonal meal shared around a table"
            />
            <div className="image-caption">
              <span className="caption-icon"><Sprout size={18} /></span>
              <span><strong>From our place,</strong><br />for every place.</span>
            </div>
            <span className="image-sun" aria-hidden="true">✳</span>
          </div>
          <div className="hero-stamp" aria-label="Good, clean, fair">
            <span>good</span><i>·</i><span>clean</span><i>·</i><span>fair</span>
          </div>
        </section>

        <section className="intro-section" id="about">
          <div className="section-kicker"><span>01</span> Food connects us</div>
          <div className="intro-content">
            <h2>Big change can start with something as small as <em>a bite.</em></h2>
            <div className="intro-aside">
              <p>
                Slow Food Chicago is part of a global, grassroots movement
                imagining a better way to eat—and making it happen, right here
                in our neighborhoods.
              </p>
              <a className="underlined-link" href="#principles">
                What we believe <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="intro-rule"><span>Chicago, Illinois</span><span>Since 2001</span></div>
        </section>

        <section className="principles-section" id="principles">
          <div className="principles-heading">
            <div>
              <div className="section-kicker"><span>02</span> Our north star</div>
              <h2>Good, clean <em>and</em> fair.</h2>
            </div>
            <p>Three simple ideas. A whole world of possibility.</p>
          </div>
          <div className="principle-grid">
            {principles.map((principle) => (
              <article className={`principle-card ${principle.color}`} key={principle.number}>
                <span className="principle-number">{principle.number}</span>
                <span className="principle-icon">
                  <principle.icon size={23} strokeWidth={1.7} />
                </span>
                <h3>{principle.title}<span>.</span></h3>
                <p>{principle.description}</p>
                <span className="card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </article>
            ))}
          </div>
        </section>

        <section className="gather-section" id="gather">
          <div className="gather-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85"
              alt="Fresh produce at a neighborhood farmers market"
              loading="lazy"
            />
            <span className="photo-label"><MapPin size={14} /> Chicago, IL</span>
          </div>
          <div className="gather-copy">
            <div className="section-kicker"><span>03</span> Pull up a chair</div>
            <h2>Better food is better <em>together.</em></h2>
            <p>
              Meet the growers, makers, cooks, and curious eaters who are
              changing the way Chicago eats. There&apos;s a place for you here.
            </p>
            <a className="button button-dark" href="#get-involved">
              Find your people <ArrowRight size={17} />
            </a>
            <div className="gather-detail">
              <CalendarDays size={18} />
              <span><strong>Good things happen in person.</strong><br />Come to a gathering near you.</span>
            </div>
          </div>
        </section>

        <section className="join-section" id="get-involved">
          <div className="join-decoration" aria-hidden="true">✳</div>
          <div className="join-content">
            <div className="section-kicker"><span>04</span> Make room at the table</div>
            <h2>Good food needs <em>good people.</em></h2>
            <p>Bring your appetite, your ideas, and your whole self. Let&apos;s make food a little better for everyone.</p>
            <a className="button button-white" href="mailto:hello@slowfoodchicago.org">
              Say hello <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="join-aside">
            <span className="join-aside-mark"><Snail size={27} style={{color: "white"}}/></span>
            <p>“The table is where community begins.”</p>
            <span>Slow Food Chicago</span>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}

export default App
