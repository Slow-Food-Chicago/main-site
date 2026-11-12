import {
  Sparkles,
  BookOpen,
  Wheat,
  Sprout,
  ArrowRight,
  ArrowUpRight,
  Apple,
  ShieldCheck,
  FolderHeart,
  Globe,
  Leaf,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import BackLink from '../components/ui/BackLink'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import SectionKicker from '../components/ui/SectionKicker'
import events5 from '../assets/events/events5.jpg'
import arkHero from '../assets/ark2.jpg'

const ARK_CRITERIA = [
  {
    number: '01',
    title: 'Exceptional Sensory Character',
    desc: 'Distinctive flavor, texture, and aroma shaped by local terroir, climate, and traditional stewardship rather than industrial transport durability or uniform cosmetic appearance.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Deep Historical & Cultural Roots',
    desc: 'Anchored in Midwest community identity and collective memory for at least 25 years. The variety or foodway must be tied to regional traditions, Indigenous stewardship, or immigrant culinary history.',
    icon: FolderHeart,
  },
  {
    number: '03',
    title: 'Small-Scale & Artisanal Scale',
    desc: 'Cultivated, harvested, or prepared by independent family farms, community gardens, or small-scale artisan workshops operating with care, craftsmanship, and ecological respect.',
    icon: Sprout,
  },
  {
    number: '04',
    title: 'Facing Real Risk of Disappearance',
    desc: 'Threatened by agricultural consolidation, patenting, monoculture, habitat loss, or commercial decline that makes its continued culinary survival precarious without active advocacy.',
    icon: ShieldCheck,
  },
]

const UPCOMING_FEATURES = [
  {
    title: 'Living Regional Catalog',
    desc: 'An illustrated digital archive documenting Midwestern heirloom fruits, grains, beans, heritage livestock breeds, and historic food preparations.',
    icon: BookOpen,
  },
  {
    title: 'Interactive Biodiversity Explorer',
    desc: 'Filter by Great Lakes bioregions, seasonal availability, culinary profiles, and traditional uses to discover endangered foods near you.',
    icon: Globe,
  },
  {
    title: 'Community Nomination Portal',
    desc: 'Submit endangered family heirlooms, community recipes, and regional crops for formal review by the Midwest Ark of Taste committee.',
    icon: Wheat,
  },
  {
    title: 'Seed Stewards & Grower Index',
    desc: 'Connect with local seed libraries, heritage nurseries, and regenerative farmers propagating Ark varieties across Illinois and the Midwest.',
    icon: Leaf,
  },
]

const PRESERVE_ARK_CROPS = [
  {
    name: 'Sea Island Red Pea',
    category: 'Field Pea / Legume',
    desc: "An heirloom celebrated in Gullah Geechee culinary tradition. Drought-hardy and soil-restorative, delivering an earthy, nutty savor.",
  },
  {
    name: 'King of the Early Pole Bean',
    category: 'Heirloom Bean',
    desc: 'Grown since the 1840s, prized for striking maroon swirls, a rich chestnut aroma, and a buttery, melting texture.',
  },
  {
    name: 'Inchelium Red Garlic',
    category: 'Softneck Garlic',
    desc: 'Discovered on the Colville Indian Reservation, prized for lush, creamy roasted cloves and mild, full-bodied warmth.',
  },
  {
    name: 'Hussli Tomato Pepper',
    category: 'Sweet & Piquant Pepper',
    desc: 'Brought to Wisconsin from Hungary in 1912. Thick, crunchy walls with sweet-to-mildly-piquant heat prized for roasting.',
  },
  {
    name: 'Jesuit Pear',
    category: 'Heritage Fruit Tree',
    desc: 'Planted in the 1700s across the Great Lakes basin. Centuries-old trees yield aromatic, honey-spiced heritage pears.',
  },
  {
    name: 'Pawpaw & American Persimmon',
    category: 'Native Tree Fruits',
    desc: "North America's largest native fruits, boasting tropical butterscotch, custard, and spiced vanilla notes with ancient native roots.",
  },
]

export default function ArkOfTastePage() {
  return (
    <main>
      {/* Back link */}
      <BackLink to="/initiatives" label="All initiatives" />

      {/* Hero */}
      <PageHero
        kickerTag="Initiative"
        kickerText="Midwest Ark of Taste"
        title={
          <>
            Preserving Flavors <em>Before They Disappear.</em>
          </>
        }
        description={
          <>
            The <strong>Ark of Taste</strong> is an international living catalog of delicious and endangered
            foods—heirloom vegetables, heritage livestock breeds, traditional recipes, and artisan products at risk of
            being lost. Here in the Midwest, we catalog, cultivate, and champion regional food biodiversity worth saving.
          </>
        }
        asideImage={arkHero}
        asideImageAlt="Midwest Ark of Taste initiative"
      />

      {/* Parked Notice & Initiative Details */}
      <section
        className="parked-section"
        style={
          {
            '--parked-accent': 'var(--snail-forest)',
            '--parked-tint': 'var(--snail-forest-light)',
          } as React.CSSProperties
        }
      >
        <div className="parked-inner">
          {/* Status Announcement Banner */}
          <div className="parked-status-card">
            <div className="parked-status-header">
              <div className="parked-status-badge">
                <span className="parked-pulse-dot" />
                <span>Dedicated Platform In Development · Coming Soon</span>
              </div>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--snail-forest)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Apple size={15} /> Midwest Chapter Working Group
              </span>
            </div>

            <h2 className="parked-status-title">
              Our Midwest Ark of Taste Catalog Is <em>On the Way.</em>
            </h2>

            <p className="parked-status-desc">
              We are actively building a dedicated online catalog and nomination tool for the{' '}
              <strong>Midwest Ark of Taste</strong>. In the meantime, this parked page provides an overview of our
              biodiversity mission, our evaluation criteria, and the Ark varieties you can already find growing in
              Chicago at our community garden.
            </p>

            <div className="parked-preview-box">
              <div className="parked-preview-label">What to expect on the upcoming platform:</div>
              <div className="parked-preview-pills">
                <span className="parked-preview-pill">
                  <BookOpen size={14} style={{ color: 'var(--snail-forest)' }} />
                  Living Regional Catalog
                </span>
                <span className="parked-preview-pill">
                  <Globe size={14} style={{ color: 'var(--snail-forest)' }} />
                  Great Lakes Bioregion Profiles
                </span>
                <span className="parked-preview-pill">
                  <Wheat size={14} style={{ color: 'var(--snail-forest)' }} />
                  Online Food Nomination Portal
                </span>
                <span className="parked-preview-pill">
                  <Sprout size={14} style={{ color: 'var(--snail-forest)' }} />
                  Seed Steward & Grower Directory
                </span>
              </div>
            </div>
          </div>

          {/* Core Philosophy Section */}
          <div className="parked-block">
            <div className="parked-block-header">
              <SectionKicker tag="Core Philosophy" text="Eat It To Save It" />
              <h2 className="parked-block-title">
                To Save It, <em>We Must Eat It.</em>
              </h2>
              <p className="parked-block-subtitle">
                The Ark of Taste isn&apos;t a museum collection sealed in glass. It is an active agricultural and culinary
                movement. By planting endangered seeds, demanding them from local farmers, buying from heritage
                bakers and producers, and cooking traditional recipes at home, we give rare foodways an economic reason to survive.
              </p>
            </div>
          </div>

          {/* 4 Criteria Grid */}
          <div className="parked-block">
            <div className="parked-block-header">
              <SectionKicker tag="Evaluation Standards" text="The 4 Ark Criteria" />
              <h2 className="parked-block-title">
                What Qualifies For The <em>Ark of Taste?</em>
              </h2>
              <p className="parked-block-subtitle">
                Every candidate nominated to the Ark of Taste is vetted against four fundamental criteria established by
                the international Slow Food Foundation for Biodiversity.
              </p>
            </div>

            <div className="parked-grid-2">
              {ARK_CRITERIA.map((criterion) => {
                const Icon = criterion.icon
                return (
                  <div key={criterion.number} className="parked-card">
                    <div className="parked-card-meta">
                      <span className="parked-card-number">CRITERION {criterion.number}</span>
                      <span className="parked-card-badge">Ark Standard</span>
                    </div>
                    <div className="parked-card-icon-wrap">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <h3 className="parked-card-title">{criterion.title}</h3>
                    <p className="parked-card-text">{criterion.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection
        kickerTag="Nominate & Preserve"
        kickerText="Midwest Ark of Taste"
        heading={
          <>
            Know An Endangered Food That <em>Belongs On The Ark?</em>
          </>
        }
        description="Our working group is actively documenting endangered Midwestern varieties, heirloom seeds, and heritage recipes."
        actions={
          <>
            <Link className="button button-white" to="/get-involved">
              Join Our Committee <ArrowRight size={16} />
            </Link>
            <a
              className="button button-white"
              href="https://www.fondazioneslowfood.com/en/what-we-do/the-ark-of-taste/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: 'white',
              }}
            >
              Global Ark of Taste <ArrowUpRight size={16} />
            </a>
          </>
        }
      />
    </main>
  )
}
