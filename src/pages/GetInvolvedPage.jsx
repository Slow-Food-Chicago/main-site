import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  HandCoins,
  Megaphone,
  Snail,
  UtensilsCrossed,
  Users,
} from 'lucide-react'

const ways = [
  {
    number: '01',
    title: 'Become a Member',
    description:
      'Slow Food membership connects you to a global network of people who care about the future of food. As a member, you support our work and gain access to events, resources, and a community of like-minded eaters.',
    icon: Users,
    color: 'red',
    cta: { label: 'Join Slow Food', href: 'https://www.slowfoodusa.org/membership' },
  },
  {
    number: '02',
    title: 'Come to an Event',
    description:
      'From dinners and tastings to farm visits and panel discussions—our events are where the real conversations happen. Check our calendar for what\'s coming up and pull up a chair.',
    icon: CalendarDays,
    color: 'blue',
    cta: { label: 'See upcoming events', href: 'https://www.eventbrite.com/o/22780790031' },
  },
  {
    number: '03',
    title: 'Volunteer',
    description:
      'Our programs run on the energy and skills of volunteers. Help at a Pantry Swap, assist with outreach, or lend your expertise to a project. Every hour matters and every hand helps.',
    icon: UtensilsCrossed,
    color: 'forest',
    cta: { label: 'Volunteer with us', href: 'mailto:hello@slowfoodchicago.org' },
  },
  {
    number: '04',
    title: 'Spread the Word',
    description:
      'Talk about good food with your neighbors, share our events, and introduce someone new to the Slow Food movement. The most powerful thing you can do is bring more people to the table.',
    icon: Megaphone,
    color: 'orange',
    cta: null,
  },
  {
    number: '05',
    title: 'Support Our Work',
    description:
      'Donations and sponsorships help us run programs, host events, and stay rooted in Chicago communities. Every contribution goes directly toward building a better food future for our city.',
    icon: HandCoins,
    color: 'navy',
    cta: { label: 'Make a donation', href: 'mailto:hello@slowfoodchicago.org' },
  },
]

const colorMap = {
  red: { bg: 'var(--snail-red-light)', accent: 'var(--snail-red)', border: 'rgba(218,32,40,0.15)' },
  blue: { bg: 'var(--snail-blue-light)', accent: 'var(--snail-blue-dark)', border: 'rgba(0,102,148,0.15)' },
  forest: { bg: 'var(--snail-forest-light)', accent: 'var(--snail-forest)', border: 'rgba(32,120,79,0.15)' },
  orange: { bg: 'var(--snail-orange-light)', accent: 'var(--snail-orange)', border: 'rgba(222,121,0,0.15)' },
  navy: { bg: 'var(--snail-navy-light)', accent: 'var(--snail-navy)', border: 'rgba(0,102,148,0.15)' },
}

export default function GetInvolvedPage() {
  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="section-kicker">
            <span>Make room</span> Get Involved
          </div>
          <h1 className="page-hero-title">
            There's a place <em>for you here.</em>
          </h1>
          <p className="page-hero-desc">
            Slow Food Chicago is a community of farmers, cooks, eaters, and advocates. Whether you
            have five minutes or five hours a week—you belong here.
          </p>
          <a className="button button-primary" href="mailto:hello@slowfoodchicago.org">
            Say hello <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="page-hero-aside" aria-hidden="true">
          <Snail size={52} strokeWidth={1.2} style={{ color: 'var(--snail-red-light)' }} />
        </div>
      </section>

      {/* Ways to get involved */}
      <section className="involve-section">
        <div className="involve-heading">
          <div className="section-kicker">
            <span>05</span> ways to join us
          </div>
          <h2 className="involve-title">
            Pick how you want to <em>show up.</em>
          </h2>
        </div>
        <div className="involve-grid">
          {ways.map((w) => {
            const c = colorMap[w.color]
            const Icon = w.icon
            return (
              <article
                className="involve-card"
                key={w.number}
                style={{ '--involve-accent': c.accent, '--involve-bg': c.bg, '--involve-border': c.border }}
              >
                <div className="involve-card-top">
                  <span className="involve-number">{w.number}</span>
                  <span className="involve-icon-wrap">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                </div>
                <h3 className="involve-card-title">{w.title}</h3>
                <p className="involve-card-desc">{w.description}</p>
                {w.cta && (
                  <a
                    className="involve-card-link"
                    href={w.cta.href}
                    target={w.cta.href.startsWith('http') ? '_blank' : undefined}
                    rel={w.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {w.cta.label} <ArrowRight size={14} />
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* Contact strip */}
      <section className="contact-strip">
        <div className="contact-strip-inner">
          <div className="contact-strip-copy">
            <h2 className="contact-strip-heading">
              Questions? Just <em>reach out.</em>
            </h2>
            <p className="contact-strip-desc">
              We're a small, volunteer-run chapter. We read every email and we'd love to hear from you.
            </p>
          </div>
          <a className="button button-white" href="mailto:hello@slowfoodchicago.org">
            hello@slowfoodchicago.org <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  )
}
