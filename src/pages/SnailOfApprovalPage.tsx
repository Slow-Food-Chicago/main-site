import {
  Snail,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Store,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import BackLink from '../components/ui/BackLink'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import SectionKicker from '../components/ui/SectionKicker'
import events4 from '../assets/events/events4.jpg'

const UPCOMING_DIRECTORY_FEATURES = [
  {
    title: 'Interactive Chicago Neighborhood Map',
    desc: 'Filter ethical dining spots across all 77 Chicago community areas, from Logan Square and Pilsen to Lincoln Square and South Shore.',
    icon: MapPin,
  },
  {
    title: '6-Pillar Transparency Scorecards',
    desc: 'Clear, verifiable scorecards showing exactly how each restaurant, bakery, and farm meets Good, Clean, and Fair standards.',
    icon: Sparkles,
  },
  {
    title: 'Digital Application & Self-Assessment',
    desc: 'An interactive readiness meter for Chicago chefs, brewers, urban growers, and bakers seeking Snail of Approval recognition.',
    icon: Store,
  },
]

export default function SnailOfApprovalPage() {
  return (
    <main>
      {/* Back link */}
      <BackLink to="/initiatives" label="All initiatives" />

      {/* Hero */}
      <PageHero
        kickerTag="Initiative"
        kickerText="Snail of Approval"
        title={
          <>
            Recognizing Chicago&apos;s <em>Good Food Makers.</em>
          </>
        }
        description={
          <>
            The <strong>Snail of Approval</strong> is Slow Food&apos;s hallmark of quality and integrity. We recognize
            local restaurants, bakeries, cafes, beverage makers, and urban farms that source responsibly, treat workers
            with dignity, and cook with honesty. Look for the snail! It means something.
          </>
        }
        asideImage={events4}
        asideImageAlt="Snail of Approval artisan grain and sourdough bread workshop"
      />

      {/* Parked Notice & Initiative Details */}
      <section
        className="parked-section"
        style={
          {
            '--parked-accent': 'var(--snail-red)',
            '--parked-tint': 'var(--snail-red-light)',
          } as React.CSSProperties
        }
      >
        <div className="parked-inner">
          {/* Status Announcement Banner */}
          <div className="parked-status-card">
            <div className="parked-status-header">
              <div className="parked-status-badge">
                <span className="parked-pulse-dot" />
                <span>Dedicated Guide & Directory In Development · Coming Soon</span>
              </div>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--snail-red)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Snail size={16} /> Slow Food Chicago Chapter
              </span>
            </div>

            <h2 className="parked-status-title">
              The New Snail of Approval Directory Is <em>Coming Soon.</em>
            </h2>

            <p className="parked-status-desc">
              We are currently finalizing an interactive directory, Chicago neighborhood map, and
              streamlined application portal to spotlight culinary changemakers across our city.
            </p>
          </div>

          {/* Meaning Section */}
          {/* <div className="parked-block">
            <div className="parked-block-header">
              <SectionKicker tag="What It Means" text="Trust The Snail" />
              <h2 className="parked-block-title">
                Look For The Snail. <em>It Means Something.</em>
              </h2>
              <p className="parked-block-subtitle">
                In an era of confusing labels and greenwashing, the Snail of Approval represents an independent,
                community-vetted benchmark. It honors businesses that put values above shortcuts, proving that exceptional
                food and ethical operations can thrive together in Chicago.
              </p>
            </div>
          </div> */}

          {/* Vetting Process */}
          {/* <div className="parked-block">
            <div className="parked-block-header">
              <SectionKicker tag="How It Works" text="Four-Stage Vetting Process" />
              <h2 className="parked-block-title">
                From Nomination To <em>Window Decal.</em>
              </h2>
              <p className="parked-block-subtitle">
                The Snail of Approval cannot be bought. It is awarded through transparent, peer-driven evaluation by our
                volunteer committee of chefs, food activists, and educators.
              </p>
            </div>

            <div className="parked-steps-grid">
              {VETTING_STEPS.map((step) => (
                <div key={step.step} className="parked-step-card">
                  <span className="parked-step-number">STEP {step.step}</span>
                  <h3 className="parked-step-title">{step.title}</h3>
                  <p className="parked-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Upcoming Directory Features */}
          <div className="parked-block">
            <div className="parked-block-header">
              <SectionKicker tag="Roadmap" text="Directory Features" />
              <h2 className="parked-block-title">
                What&apos;s Coming To The <em>New Directory.</em>
              </h2>
              <p className="parked-block-subtitle">
                Here is a sneak peek at the tools we are building to help Chicagoans find and celebrate businesses that
                honor our local food ecosystem.
              </p>
            </div>

            <div className="parked-grid-2">
              {UPCOMING_DIRECTORY_FEATURES.map((feat) => {
                const Icon = feat.icon
                return (
                  <div key={feat.title} className="parked-card">
                    <div className="parked-card-icon-wrap">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <h3 className="parked-card-title">{feat.title}</h3>
                    <p className="parked-card-text">{feat.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection
        kickerTag="Nominate & Connect"
        kickerText="Snail of Approval"
        heading={
          <>
            Know A Business That <em>Belongs On The Trail?</em>
          </>
        }
        description="Help us celebrate Chicago's most ethical restaurants, bakeries, cafes, and farms."
        actions={
          <>
            <Link className="button button-white" to="/get-involved">
              Join Review Committee <ArrowRight size={16} />
            </Link>
            <a
              className="button button-white"
              href="https://slowfoodusa.org/snail-of-approval/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: 'white',
              }}
            >
              Slow Food USA Snail <ArrowUpRight size={16} />
            </a>
          </>
        }
      />
    </main>
  )
}
