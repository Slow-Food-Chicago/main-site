import { ArrowLeft, ArrowUpRight, ShoppingBasket, Recycle, Heart, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Bring what you have',
    description:
      'Gather shelf-stable pantry goods, homegrown produce, homemade preserves, or any food you have in abundance and would like to share. Everything should be unexpired, properly sealed, and safe to eat.',
  },
  {
    number: '02',
    icon: Recycle,
    title: 'Swap freely',
    description:
      'Lay your items out on the table and browse what others have brought. There are no price tags, no bartering rules, and no minimum. Take what you need, leave what you can.',
  },
  {
    number: '03',
    icon: Heart,
    title: 'Build community',
    description:
      'Pantry Swap is as much about people as it is about food. Stay a while, meet your neighbors, and share recipes, growing tips, or the story behind what you brought.',
  },
]

const bringItems = [
  'Canned goods (vegetables, beans, tomatoes, soups)',
  'Dry staples (pasta, rice, lentils, grains, flour)',
  'Homegrown or surplus fresh produce',
  'Homemade jams, pickles, sauces, and preserves',
  'Spices, oils, vinegars, and condiments',
  'Baked goods and snacks',
  'Seeds and starts for the garden',
]

export default function PantrySwapPage() {
  return (
    <main>
      {/* Back nav */}
      <div className="pantry-back">
        <Link to="/initiatives" className="pantry-back-link">
          <ArrowLeft size={14} /> All initiatives
        </Link>
      </div>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="section-kicker">
            <span>Initiative</span> Pantry Swap
          </div>
          <h1 className="page-hero-title">
            Share what you have. <em>Take what you need.</em>
          </h1>
          <p className="page-hero-desc">
            A free, community-run food exchange where neighbors trade pantry staples,
            fresh produce, and homemade goods — no money, no judgment, just good food
            shared generously.
          </p>
          <a className="button button-primary" href="mailto:hello@slowfoodchicago.org">
            Get involved <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="page-hero-aside" aria-hidden="true">
          <ShoppingBasket size={52} strokeWidth={1.2} style={{ color: 'var(--snail-orange-light)' }} />
        </div>
      </section>

      {/* How it works */}
      <section className="pantry-how-section">
        <div className="pantry-how-inner">
          <div className="section-kicker">
            <span>01</span> How it works
          </div>
          <h2 className="pantry-how-title">
            Simple by design. <em>Generous by nature.</em>
          </h2>
          <div className="pantry-steps">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div className="pantry-step" key={step.number}>
                  <div className="pantry-step-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <span className="pantry-step-number">{step.number}</span>
                  <h3 className="pantry-step-title">{step.title}</h3>
                  <p className="pantry-step-desc">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section className="pantry-bring-section">
        <div className="pantry-bring-inner">
          <div className="pantry-bring-copy">
            <div className="section-kicker">
              <span>02</span> What to bring
            </div>
            <h2 className="pantry-bring-title">
              Anything good <em>and shareable.</em>
            </h2>
            <p className="pantry-bring-desc">
              There's no strict list — if it's food you'd be happy to receive, it's
              welcome at Pantry Swap. Here are some ideas to get you started:
            </p>
          </div>
          <ul className="pantry-bring-list">
            {bringItems.map((item) => (
              <li key={item} className="pantry-bring-item">
                <span className="pantry-bring-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="initiatives-cta-section">
        <div className="initiatives-cta-inner">
          <div className="section-kicker" style={{ color: 'rgb(255 255 255 / 65%)' }}>
            <span style={{ color: 'var(--snail-yellow)' }}>Join us</span> Next swap
          </div>
          <h2 className="initiatives-cta-heading">
            Ready to <em>swap?</em>
          </h2>
          <p className="initiatives-cta-desc">
            Pantry Swaps are free and open to everyone. Sign up for our newsletter
            to hear about upcoming dates, or reach out to help organize one in your neighborhood.
          </p>
          <a className="button button-white" href="mailto:hello@slowfoodchicago.org">
            Say hello <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  )
}
