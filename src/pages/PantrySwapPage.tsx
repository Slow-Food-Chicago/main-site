import { ArrowUpRight, ShoppingBasket } from 'lucide-react'
import BackLink from '../components/ui/BackLink'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import SectionKicker from '../components/ui/SectionKicker'
import { swapItems } from '../data/pantry-swap'
import { SHOW_SLACK, SLACK_INVITE_URL, CONTACT_EMAIL } from '../data/constants'
import pantry2 from '../assets/pantry/pantry2.jpg'
export default function PantrySwapPage() {
  return (
    <main>
      {/* Back nav */}
      <BackLink to="/initiatives" label="All initiatives" />

      {/* Hero */}
      <PageHero
        kickerTag="Initiative"
        kickerText="Pantry Swap"
        title={
          <>
            Rethink Staples. <em>Support Local.</em>
          </>
        }
        description={
          <>
            How you spend your money can dramatically affect your local economy. The next time you
            need to refill or replace a common ingredient, consider its source.{' '}
            <em>Provenance Matters!</em>
          </>
        }
        asideImage={pantry2}
        asideImageAlt="Pantry swap initiative"
      />

      {/* What to swap */}
      <section className="pantry-swap-section">
        <div className="pantry-swap-inner">
          <div className="pantry-swap-header">
            <SectionKicker text="What to swap" />
            <h2 className="pantry-swap-title">
              Small Actions <em>Taken Collectively</em>
            </h2>
          </div>

          <div className="pantry-swap-items">
            {swapItems.map((item) => (
              <div key={item.item} className="pantry-swap-card">
                <div className="pantry-swap-card-left">
                  <h3 className="pantry-swap-card-title">{item.item}</h3>
                  <p className="pantry-swap-card-blurb">{item.blurb}</p>
                </div>
                <div className="pantry-swap-card-right">
                  <h4 className="pantry-suppliers-heading">Suppliers</h4>
                  <div className="pantry-suppliers-list">
                    {item.suppliers.map((supplier) => (
                      <a
                        href={supplier.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pantry-supplier-card"
                        key={item.item + supplier.name}
                        title={`Visit ${supplier.name}`}
                      >
                        <div className="pantry-supplier-header">
                          <h5 className="pantry-supplier-name">
                            {supplier.name}
                            <ArrowUpRight size={14} className="pantry-supplier-arrow" />
                          </h5>
                        </div>
                        <p className="pantry-supplier-why">{supplier.why}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        heading={
          <>
            Got A Business who you think <em>belongs here?</em>
          </>
        }
        description="We're always looking for new suppliers and partners to join our pantry swap initiative. If you know a business that could contribute, let us know!"
        actions={
          <>
            {SHOW_SLACK && (
              <a
                className="button button-white"
                href={SLACK_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join our Slack <ArrowUpRight size={16} />
              </a>
            )}
            <a className="button button-white" href={`mailto:${CONTACT_EMAIL}`}>
              Let us know <ArrowUpRight size={16} />
            </a>
          </>
        }
      />
    </main>
  )
}
