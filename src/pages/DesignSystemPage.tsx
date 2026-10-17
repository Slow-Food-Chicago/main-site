import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Check,
  Type,
  Sprout,
  Sliders,
} from 'lucide-react'
import SectionKicker from '../components/ui/SectionKicker'
import ChicagoStar from '../components/ui/ChicagoStar'
import SnailLogo from '../components/ui/SnailLogo'

interface ColorToken {
  name: string
  cssVar: string
  hex: string
  rgb: string
  role: string
  textLight?: boolean
}

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  // Interactive Typography Sandbox state
  const [testFont, setTestFont] = useState<'title' | 'heading' | 'section-header' | 'body'>('title')
  const [testText, setTestText] = useState('Good, Clean, and Fair for everyone.')
  const [testSize, setTestSize] = useState(36)
  const [testWeight, setTestWeight] = useState('400')
  const [testItalic, setTestItalic] = useState(false)
  const [testUppercase, setTestUppercase] = useState(false)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopiedToken(id)
    setTimeout(() => {
      setCopiedToken((prev) => (prev === id ? null : prev))
    }, 2000)
  }

  const primaryColors: ColorToken[] = [
    {
      name: 'Snail Red',
      cssVar: '--snail-red',
      hex: '#DA2028',
      rgb: '218, 32, 40',
      role: 'Primary Brand Color · Snail Icon, CTAs, accents',
      textLight: true,
    },
    {
      name: 'Snail Red Dark',
      cssVar: '--snail-red-dark',
      hex: '#BA171E',
      rgb: '186, 23, 30',
      role: 'Button hover state, high-contrast borders',
      textLight: true,
    },
    {
      name: 'Snail Red Light',
      cssVar: '--snail-red-light',
      hex: '#FDF2F2',
      rgb: '253, 242, 242',
      role: 'Red tinted backgrounds, pill badges',
      textLight: false,
    },
    {
      name: 'Chicago Blue',
      cssVar: '--snail-blue',
      hex: '#41B6E6',
      rgb: '65, 182, 230',
      role: 'Civic Chicago Blue · Secondary accent, borders',
      textLight: false,
    },
    {
      name: 'Chicago Blue Dark',
      cssVar: '--snail-blue-dark',
      hex: '#006694',
      rgb: '0, 102, 148',
      role: 'Blue links, focus rings, dark blue accents',
      textLight: true,
    },
    {
      name: 'Chicago Blue Light',
      cssVar: '--snail-blue-light',
      hex: '#E8F6FC',
      rgb: '232, 246, 252',
      role: 'Soft blue tinted card backgrounds',
      textLight: false,
    },
  ]

  const accentColors: ColorToken[] = [
    {
      name: 'Snail Forest',
      cssVar: '--snail-forest',
      hex: '#20784F',
      rgb: '32, 120, 79',
      role: 'Initiatives, Gardens, Sustainability, CTAs',
      textLight: true,
    },
    {
      name: 'Forest Dark',
      cssVar: '--snail-forest-dark',
      hex: '#185D3D',
      rgb: '24, 93, 61',
      role: 'Deep green backgrounds, hover states',
      textLight: true,
    },
    {
      name: 'Forest Light',
      cssVar: '--snail-forest-light',
      hex: '#E8F4EE',
      rgb: '232, 244, 238',
      role: 'Green badge tints, icon circles',
      textLight: false,
    },
    {
      name: 'Snail Orange',
      cssVar: '--snail-orange',
      hex: '#DE7900',
      rgb: '222, 121, 0',
      role: 'Pantry Swap, warm food accents',
      textLight: true,
    },
    {
      name: 'Orange Light',
      cssVar: '--snail-orange-light',
      hex: '#FEF5E7',
      rgb: '254, 245, 231',
      role: 'Orange tinted card backgrounds',
      textLight: false,
    },
    {
      name: 'Snail Yellow',
      cssVar: '--snail-yellow',
      hex: '#F5BE0B',
      rgb: '245, 190, 11',
      role: 'Highlight accents, asterisks, badges',
      textLight: false,
    },
    {
      name: 'Snail Sage',
      cssVar: '--snail-sage',
      hex: '#7B9E87',
      rgb: '123, 158, 135',
      role: 'Muted botanic tint for subtle callouts',
      textLight: false,
    },
  ]

  const neutralColors: ColorToken[] = [
    {
      name: 'Snail Cream',
      cssVar: '--snail-cream',
      hex: '#FAF7F2',
      rgb: '250, 247, 242',
      role: 'Primary Site Background · Warm parchment',
      textLight: false,
    },
    {
      name: 'Snail Cream Dark',
      cssVar: '--snail-cream-dark',
      hex: '#F2ECE1',
      rgb: '242, 236, 225',
      role: 'Contrasting section background, cards',
      textLight: false,
    },
    {
      name: 'Snail Sand',
      cssVar: '--snail-sand',
      hex: '#E2D7C5',
      rgb: '226, 215, 197',
      role: 'Subtle divider lines, borders, inputs',
      textLight: false,
    },
    {
      name: 'Snail Charcoal',
      cssVar: '--snail-charcoal',
      hex: '#1F1D1B',
      rgb: '31, 29, 27',
      role: 'Primary text color, dark buttons',
      textLight: true,
    },
    {
      name: 'Snail Warm Gray',
      cssVar: '--snail-warm-gray',
      hex: '#78716C',
      rgb: '120, 113, 108',
      role: 'Muted text, metadata, kicker subtitles',
      textLight: true,
    },
    {
      name: 'Dark Surface',
      cssVar: '--snail-dark-surface',
      hex: '#1E1B19',
      rgb: '30, 27, 25',
      role: 'Dark mode foundation, deep contrast cards',
      textLight: true,
    },
  ]

  const fontFamMap = {
    title: 'var(--font-title)',
    heading: 'var(--font-heading)',
    'section-header': 'var(--font-section-header)',
    body: 'var(--font-body)',
  }

  return (
    <main className="ds-page" style={{ paddingBottom: '120px' }}>
      {/* ─── Hero Section ─── */}
      <section
        style={{
          background: 'white',
          padding: '80px 8.35% 60px',
          borderBottom: '1px solid rgb(31 29 27 / 8%)',
        }}
      >
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <SectionKicker tag="SYSTEM" text="Foundations & Visual Tokens" />
          <h1
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(42px, 5.2vw, 68px)',
              fontWeight: 400,
              letterSpacing: '-1.8px',
              lineHeight: 1.05,
              color: 'var(--snail-charcoal)',
              margin: '20px 0 16px',
            }}
          >
            Slow Food Chicago <span style={{ color: 'var(--snail-red)', fontStyle: 'italic' }}>Design System</span>
          </h1>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#686158',
              maxWidth: '720px',
              marginBottom: '32px',
            }}
          >
            The comprehensive visual identity, typography system, and UI specification for
            Slow Food Chicago. Grounded in the international Slow Food heritage with
            tasteful civic Chicago spirit.
          </p>

          {/* Quick jump navigation chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { label: 'Typography Roles', href: '#typography' },
              { label: 'Interactive Font Tester', href: '#tester' },
              { label: 'Color Palette', href: '#colors' },
              { label: 'Brand Badges & Logos', href: '#brand' },
              { label: 'Component Library', href: '#components' },
              { label: 'Hierarchy Guidelines', href: '#guidelines' },
            ].map((chip) => (
              <a
                key={chip.label}
                href={chip.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  background: 'var(--snail-cream)',
                  border: '1px solid var(--snail-sand)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--snail-charcoal)',
                  transition: 'all 160ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--snail-red)'
                  e.currentTarget.style.color = 'var(--snail-red)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--snail-sand)'
                  e.currentTarget.style.color = 'var(--snail-charcoal)'
                }}
              >
                {chip.label} <ArrowRight size={13} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 8.35%' }}>
        {/* ─── 01: Typography Specification ─── */}
        <section id="typography" style={{ paddingTop: '80px' }}>
          <SectionKicker number="01" text="Core Typography" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 3.8vw, 46px)',
              fontWeight: 600,
              letterSpacing: '-1px',
              color: 'var(--snail-charcoal)',
              margin: '16px 0 10px',
            }}
          >
            Typography Hierarchy & Four Font Roles
          </h2>
          <p style={{ color: '#746e65', fontSize: '15px', maxWidth: '780px', marginBottom: '40px' }}>
            Our visual identity is defined by a strict four-font role allocation: <strong>Bauer Bodoni</strong> for titles,{' '}
            <strong>Oswald</strong> for headings and subheadings, <strong>Riya Black</strong> for section headers and kickers, and{' '}
            <strong>Noto Sans</strong> for body copy.
          </p>

          {/* Four Font Specimen Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              marginBottom: '50px',
            }}
          >
            {/* 1. Bauer Bodoni */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgb(31 29 27 / 7%)',
                borderTop: '4px solid var(--snail-red)',
                padding: '30px 24px',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-section-header)',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '1.4px',
                    textTransform: 'uppercase',
                    color: 'var(--snail-red)',
                  }}
                >
                  Role: Titles
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--snail-warm-gray)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Serif Didone
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '32px',
                  fontWeight: 400,
                  margin: 0,
                  color: 'var(--snail-charcoal)',
                  lineHeight: 1.1,
                }}
              >
                Bauer Bodoni
              </h3>
              <p style={{ fontSize: '12.5px', color: '#686158', margin: 0, lineHeight: 1.6 }}>
                Official Slow Food international logotype typeface. High stroke contrast, vertical stress, and
                unbracketed hairline serifs. Used for hero titles, page hero headings, and brand marks.
              </p>
              <div
                style={{
                  marginTop: '10px',
                  padding: '14px',
                  background: 'var(--snail-cream)',
                  borderRadius: '4px',
                  fontSize: '18px',
                  fontFamily: 'var(--font-title)',
                  color: 'var(--snail-charcoal)',
                  lineHeight: 1.3,
                }}
              >
                <div>Aa Bb Cc Gg 123</div>
                <div style={{ fontStyle: 'italic', color: 'var(--snail-red)' }}>
                  "A more delicious Chicago"
                </div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--snail-warm-gray)', marginTop: 'auto' }}>
                <code>var(--font-title)</code>
              </div>
            </div>

            {/* 2. Oswald */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgb(31 29 27 / 7%)',
                borderTop: '4px solid var(--snail-charcoal)',
                padding: '30px 24px',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-section-header)',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '1.4px',
                    textTransform: 'uppercase',
                    color: 'var(--snail-charcoal)',
                  }}
                >
                  Role: Headings & Subheadings
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--snail-warm-gray)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Condensed Sans
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '32px',
                  fontWeight: 600,
                  margin: 0,
                  color: 'var(--snail-charcoal)',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.5px',
                }}
              >
                Oswald
              </h3>
              <p style={{ fontSize: '12.5px', color: '#686158', margin: 0, lineHeight: 1.6 }}>
                Narrow, tall, impactful Gothic sans-serif. Used for all section headings (H1, H2, H3, H4),
                subheadings, card titles, board member names, and calendar event titles.
              </p>
              <div
                style={{
                  marginTop: '10px',
                  padding: '14px',
                  background: 'var(--snail-cream)',
                  borderRadius: '4px',
                  fontSize: '18px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  color: 'var(--snail-charcoal)',
                  lineHeight: 1.3,
                }}
              >
                <div>AA BB CC GG 123456</div>
                <div style={{ color: 'var(--snail-forest)', fontWeight: 500 }}>
                  GOOD, CLEAN &amp; FAIR
                </div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--snail-warm-gray)', marginTop: 'auto' }}>
                <code>var(--font-heading)</code>
              </div>
            </div>

            {/* 3. Riya Black */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgb(31 29 27 / 7%)',
                borderTop: '4px solid var(--snail-forest)',
                padding: '30px 24px',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-section-header)',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '1.4px',
                    textTransform: 'uppercase',
                    color: 'var(--snail-forest)',
                  }}
                >
                  Role: Section Headers
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--snail-warm-gray)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Heavy Display
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-section-header)',
                  fontSize: '28px',
                  fontWeight: 800,
                  margin: 0,
                  color: 'var(--snail-charcoal)',
                  lineHeight: 1.1,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                Riya Black
              </h3>
              <p style={{ fontSize: '12.5px', color: '#686158', margin: 0, lineHeight: 1.6 }}>
                Ultra-bold, geometric display weight with high punch. Used for section kickers, category
                badges, kicker numbering (01, 02), eyebrow headers, and role tags.
              </p>
              <div
                style={{
                  marginTop: '10px',
                  padding: '14px',
                  background: 'var(--snail-cream)',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-section-header)',
                  fontWeight: 800,
                  color: 'var(--snail-charcoal)',
                  lineHeight: 1.4,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                }}
              >
                <div style={{ color: 'var(--snail-red)' }}>01 · FOOD CONNECTS US</div>
                <div>EXECUTIVE BOARD · 2026</div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--snail-warm-gray)', marginTop: 'auto' }}>
                <code>var(--font-section-header)</code>
              </div>
            </div>

            {/* 4. Noto Sans */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgb(31 29 27 / 7%)',
                borderTop: '4px solid var(--snail-orange)',
                padding: '30px 24px',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-section-header)',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '1.4px',
                    textTransform: 'uppercase',
                    color: 'var(--snail-orange)',
                  }}
                >
                  Role: Body Text
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--snail-warm-gray)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Humanist Sans
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '32px',
                  fontWeight: 600,
                  margin: 0,
                  color: 'var(--snail-charcoal)',
                  lineHeight: 1.1,
                }}
              >
                Noto Sans
              </h3>
              <p style={{ fontSize: '12.5px', color: '#686158', margin: 0, lineHeight: 1.6 }}>
                Universal, highly legible, accessible reading font. Used for body copy, paragraphs,
                navigation links, buttons, form controls, footnotes, and descriptions.
              </p>
              <div
                style={{
                  marginTop: '10px',
                  padding: '14px',
                  background: 'var(--snail-cream)',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--snail-charcoal)',
                  lineHeight: 1.6,
                }}
              >
                <div>We bring people together around good food—and work toward a food system that is good for people.</div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--snail-warm-gray)', marginTop: 'auto' }}>
                <code>var(--font-body)</code>
              </div>
            </div>
          </div>

          {/* Typography Scale Table */}
          <div
            style={{
              background: 'white',
              border: '1px solid rgb(31 29 27 / 8%)',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '60px',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--snail-cream-dark)',
                borderBottom: '1px solid rgb(31 29 27 / 8%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Type size={18} style={{ color: 'var(--snail-red)' }} />
              <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Type Scale &amp; Application Matrix
              </strong>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--snail-cream)', borderBottom: '1px solid var(--snail-sand)' }}>
                    <th style={{ padding: '12px 18px', fontWeight: 700 }}>Token / Role</th>
                    <th style={{ padding: '12px 18px', fontWeight: 700 }}>Target Font</th>
                    <th style={{ padding: '12px 18px', fontWeight: 700 }}>Size (Desktop / Mobile)</th>
                    <th style={{ padding: '12px 18px', fontWeight: 700 }}>Weight / Style</th>
                    <th style={{ padding: '12px 18px', fontWeight: 700 }}>Preview Sample</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      role: 'Display Title / Hero',
                      font: 'Bauer Bodoni',
                      fontVar: 'var(--font-title)',
                      size: '77px / 50px',
                      weight: '400 Regular · Italic accents',
                      sample: 'A more delicious Chicago',
                      className: 'font-title',
                      style: { fontSize: '28px', fontStyle: 'italic', color: 'var(--snail-red)' },
                    },
                    {
                      role: 'Page Hero Title',
                      font: 'Bauer Bodoni',
                      fontVar: 'var(--font-title)',
                      size: '70px / 44px',
                      weight: '400 Regular',
                      sample: 'Our Initiatives',
                      className: 'font-title',
                      style: { fontSize: '26px' },
                    },
                    {
                      role: 'Section Heading (H2)',
                      font: 'Oswald',
                      fontVar: 'var(--font-heading)',
                      size: '48px / 32px',
                      weight: '600 SemiBold',
                      sample: 'Good, clean and fair.',
                      className: 'font-heading',
                      style: { fontSize: '24px', fontWeight: 600, textTransform: 'uppercase' },
                    },
                    {
                      role: 'Card Heading (H3)',
                      font: 'Oswald',
                      fontVar: 'var(--font-heading)',
                      size: '26px / 20px',
                      weight: '600 SemiBold',
                      sample: 'preSERVE Community Garden',
                      className: 'font-heading',
                      style: { fontSize: '20px', fontWeight: 600 },
                    },
                    {
                      role: 'Subheading / Names (H4)',
                      font: 'Oswald',
                      fontVar: 'var(--font-heading)',
                      size: '20px / 16px',
                      weight: '600 SemiBold',
                      sample: 'Board Director of Programming',
                      className: 'font-heading',
                      style: { fontSize: '17px', fontWeight: 600 },
                    },
                    {
                      role: 'Section Header / Kicker',
                      font: 'Riya Black',
                      fontVar: 'var(--font-section-header)',
                      size: '11px / 10px',
                      weight: '800 Black · Uppercase · 1.6px track',
                      sample: '01 · FOOD CONNECTS US',
                      className: 'font-section-header',
                      style: { fontSize: '11px', fontWeight: 800, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--snail-forest)' },
                    },
                    {
                      role: 'Category Badge',
                      font: 'Riya Black',
                      fontVar: 'var(--font-section-header)',
                      size: '9px / 9px',
                      weight: '800 Black · Uppercase',
                      sample: 'COMMUNITY · ACTIVE',
                      className: 'font-section-header',
                      style: { fontSize: '9px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--snail-red)' },
                    },
                    {
                      role: 'Body Copy (Paragraphs)',
                      font: 'Noto Sans',
                      fontVar: 'var(--font-body)',
                      size: '14px / 13px',
                      weight: '400 Regular · 1.8 Line-height',
                      sample: 'We bring people together around good food.',
                      className: 'font-body',
                      style: { fontSize: '13px' },
                    },
                    {
                      role: 'Button / Action Link',
                      font: 'Noto Sans',
                      fontVar: 'var(--font-body)',
                      size: '12px / 12px',
                      weight: '700 Bold · Clear contrast',
                      sample: 'Join the movement →',
                      className: 'font-body',
                      style: { fontSize: '12px', fontWeight: 700, color: 'var(--snail-red)' },
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.role}
                      style={{
                        borderBottom: '1px solid rgb(31 29 27 / 6%)',
                        background: i % 2 === 0 ? 'white' : 'var(--snail-cream)',
                      }}
                    >
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>{row.role}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            background: 'white',
                            border: '1px solid var(--snail-sand)',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 700,
                          }}
                        >
                          {row.font}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', color: 'var(--snail-warm-gray)' }}>{row.size}</td>
                      <td style={{ padding: '14px 18px', color: 'var(--snail-warm-gray)', fontSize: '12px' }}>
                        {row.weight}
                      </td>
                      <td style={{ padding: '14px 18px', ...row.style }}>{row.sample}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── 02: Interactive Typography Sandbox ─── */}
        <section
          id="tester"
          style={{
            background: 'white',
            border: '1px solid rgb(31 29 27 / 8%)',
            borderRadius: '8px',
            padding: '36px',
            boxShadow: '0 4px 20px rgb(31 29 27 / 5%)',
            marginBottom: '80px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Sliders size={20} style={{ color: 'var(--snail-red)' }} />
            <SectionKicker tag="PLAYGROUND" text="Interactive Font Tester" />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '28px',
              fontWeight: 600,
              margin: '6px 0 24px',
              color: 'var(--snail-charcoal)',
            }}
          >
            Live Type Lab
          </h2>

          {/* Controls Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              padding: '20px',
              background: 'var(--snail-cream)',
              borderRadius: '6px',
              marginBottom: '24px',
            }}
          >
            {/* Font Family Selector */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--snail-warm-gray)',
                  marginBottom: '6px',
                }}
              >
                Font Role &amp; Family
              </label>
              <select
                value={testFont}
                onChange={(e) =>
                  setTestFont(e.target.value as 'title' | 'heading' | 'section-header' | 'body')
                }
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--snail-sand)',
                  background: 'white',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--snail-charcoal)',
                }}
              >
                <option value="title">Titles: Bauer Bodoni (Serif)</option>
                <option value="heading">Headings: Oswald (Condensed Sans)</option>
                <option value="section-header">Section Headers: Riya Black (Display)</option>
                <option value="body">Body Text: Noto Sans (Sans-Serif)</option>
              </select>
            </div>

            {/* Size Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--snail-warm-gray)',
                  }}
                >
                  Size: {testSize}px
                </label>
              </div>
              <input
                type="range"
                min="14"
                max="72"
                value={testSize}
                onChange={(e) => setTestSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--snail-red)' }}
              />
            </div>

            {/* Weight Selector */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--snail-warm-gray)',
                  marginBottom: '6px',
                }}
              >
                Font Weight
              </label>
              <select
                value={testWeight}
                onChange={(e) => setTestWeight(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--snail-sand)',
                  background: 'white',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--snail-charcoal)',
                }}
              >
                <option value="300">300 (Light)</option>
                <option value="400">400 (Regular)</option>
                <option value="500">500 (Medium)</option>
                <option value="600">600 (SemiBold)</option>
                <option value="700">700 (Bold)</option>
                <option value="800">800 (Extra Bold / Black)</option>
              </select>
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={testItalic}
                  onChange={(e) => setTestItalic(e.target.checked)}
                  style={{ accentColor: 'var(--snail-red)' }}
                />
                Italic
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={testUppercase}
                  onChange={(e) => setTestUppercase(e.target.checked)}
                  style={{ accentColor: 'var(--snail-red)' }}
                />
                Uppercase
              </label>
            </div>
          </div>

          {/* Quick preset phrases */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', color: 'var(--snail-warm-gray)', alignSelf: 'center' }}>Presets:</span>
            {[
              'Good, Clean, and Fair for everyone.',
              'A more delicious Chicago starts at the table.',
              '01 · FOOD CONNECTS US',
              'Pull up a chair at our table.',
              'preSERVE Garden in North Lawndale',
            ].map((phrase) => (
              <button
                key={phrase}
                type="button"
                onClick={() => setTestText(phrase)}
                style={{
                  background: 'white',
                  border: '1px solid var(--snail-sand)',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  color: 'var(--snail-charcoal)',
                }}
              >
                {phrase}
              </button>
            ))}
          </div>

          {/* Text Input to Edit */}
          <input
            type="text"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Type your preview text here..."
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid var(--snail-sand)',
              borderRadius: '4px',
              fontSize: '14px',
              marginBottom: '20px',
              boxSizing: 'border-box',
            }}
          />

          {/* Live Preview Display Canvas */}
          <div
            style={{
              minHeight: '140px',
              padding: '36px',
              background: 'var(--snail-cream)',
              border: '1px dashed var(--snail-sand)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            <div
              style={{
                fontFamily: fontFamMap[testFont],
                fontSize: `${testSize}px`,
                fontWeight: Number(testWeight),
                fontStyle: testItalic ? 'italic' : 'normal',
                textTransform: testUppercase ? 'uppercase' : 'none',
                lineHeight: 1.15,
                color: 'var(--snail-charcoal)',
                letterSpacing: testFont === 'section-header' ? '1.5px' : '-0.5px',
              }}
            >
              {testText || 'Type something to preview'}
            </div>
          </div>

          {/* CSS Token Copy Helper */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              padding: '10px 16px',
              background: '#24201d',
              color: '#eae5de',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace',
            }}
          >
            <span>
              font-family: {fontFamMap[testFont]}; font-size: {testSize}px; font-weight: {testWeight};
            </span>
            <button
              type="button"
              onClick={() =>
                copyToClipboard(
                  `font-family: ${fontFamMap[testFont]}; font-size: ${testSize}px; font-weight: ${testWeight};`,
                  'css-lab',
                )
              }
              style={{
                background: 'transparent',
                border: 'none',
                color: copiedToken === 'css-lab' ? '#4ade80' : 'white',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
              }}
            >
              {copiedToken === 'css-lab' ? <Check size={14} /> : <Copy size={14} />}
              {copiedToken === 'css-lab' ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
        </section>

        {/* ─── 03: Color Palette ─── */}
        <section id="colors" style={{ paddingTop: '60px', marginBottom: '80px' }}>
          <SectionKicker number="02" text="Color Architecture" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 3.8vw, 46px)',
              fontWeight: 600,
              letterSpacing: '-1px',
              color: 'var(--snail-charcoal)',
              margin: '16px 0 10px',
            }}
          >
            Color Palette &amp; Functional Tokens
          </h2>
          <p style={{ color: '#746e65', fontSize: '15px', maxWidth: '780px', marginBottom: '32px' }}>
            Click any swatch to copy its CSS custom property or hexadecimal code to your clipboard.
          </p>

          {/* Primary Brand Palette */}
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: 'var(--snail-charcoal)',
              margin: '0 0 14px',
            }}
          >
            Primary Brand &amp; Civic Chicago Colors
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: '14px',
              marginBottom: '36px',
            }}
          >
            {primaryColors.map((color) => (
              <ColorSwatchCard
                key={color.name}
                color={color}
                isCopied={copiedToken === color.hex}
                onCopy={() => copyToClipboard(color.hex, color.hex)}
              />
            ))}
          </div>

          {/* Accent Movement Colors */}
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: 'var(--snail-charcoal)',
              margin: '0 0 14px',
            }}
          >
            Earth, Harvest &amp; Accent Tones
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: '14px',
              marginBottom: '36px',
            }}
          >
            {accentColors.map((color) => (
              <ColorSwatchCard
                key={color.name}
                color={color}
                isCopied={copiedToken === color.hex}
                onCopy={() => copyToClipboard(color.hex, color.hex)}
              />
            ))}
          </div>

          {/* Warm Neutrals */}
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: 'var(--snail-charcoal)',
              margin: '0 0 14px',
            }}
          >
            Warm Neutrals &amp; Foundations
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: '14px',
            }}
          >
            {neutralColors.map((color) => (
              <ColorSwatchCard
                key={color.name}
                color={color}
                isCopied={copiedToken === color.hex}
                onCopy={() => copyToClipboard(color.hex, color.hex)}
              />
            ))}
          </div>
        </section>

        {/* ─── 04: Brand Symbols & Badges ─── */}
        <section id="brand" style={{ paddingTop: '60px', marginBottom: '80px' }}>
          <SectionKicker number="03" text="Brand Identity" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 3.8vw, 46px)',
              fontWeight: 600,
              letterSpacing: '-1px',
              color: 'var(--snail-charcoal)',
              margin: '16px 0 10px',
            }}
          >
            Logos, Emblems &amp; Section Headers
          </h2>
          <p style={{ color: '#746e65', fontSize: '15px', maxWidth: '780px', marginBottom: '32px' }}>
            Official badges and lockups combining Bauer Bodoni logotype with Riya Black header tags.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Snail Logo Variations */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgb(31 29 27 / 8%)',
                borderRadius: '6px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-section-header)',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: 'var(--snail-warm-gray)',
                }}
              >
                Snail Badge Variations
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                <SnailLogo size={52} backgroundColor="var(--snail-red)" />
                <SnailLogo size={52} backgroundColor="var(--snail-forest)" />
                <SnailLogo size={52} backgroundColor="var(--snail-blue-dark)" />
                <SnailLogo size={52} backgroundColor="var(--snail-charcoal)" />
              </div>
              <div style={{ borderTop: '1px solid var(--snail-sand)', paddingTop: '16px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                  <SnailLogo size={38} />
                  <span className="brand-name">
                    Slow Food
                    <span>Chicago</span>
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--snail-warm-gray)', marginTop: '8px' }}>
                  Header Lockup · Bauer Bodoni Title + Riya Black "Chicago"
                </div>
              </div>
            </div>

            {/* Chicago 4-Star Insignia */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgb(31 29 27 / 8%)',
                borderRadius: '6px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-section-header)',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: 'var(--snail-warm-gray)',
                }}
              >
                Chicago 6-Pointed Star Emblems
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ChicagoStar size={24} />
                <ChicagoStar size={24} />
                <ChicagoStar size={24} />
                <ChicagoStar size={24} />
                <span
                  style={{
                    fontFamily: 'var(--font-section-header)',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--snail-charcoal)',
                    marginLeft: '8px',
                  }}
                >
                  Chicago, Illinois
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#686158', lineHeight: 1.6 }}>
                The four six-pointed stars represent Fort Dearborn, the Great Chicago Fire, the World's
                Columbian Exposition, and the Century of Progress Exposition.
              </p>
            </div>

            {/* Section Kickers in Riya Black */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgb(31 29 27 / 8%)',
                borderRadius: '6px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-section-header)',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: 'var(--snail-warm-gray)',
                }}
              >
                Section Headers (Riya Black)
              </span>
              <SectionKicker number="01" text="Food connects us" />
              <SectionKicker number="02" text="Our north star" />
              <SectionKicker tag="GARDEN" text="preSERVE Initiative" />
              <p className="eyebrow" style={{ margin: 0 }}>
                <span /> A food community for all
              </p>
            </div>
          </div>
        </section>

        {/* ─── 05: UI Component Library ─── */}
        <section id="components" style={{ paddingTop: '60px', marginBottom: '80px' }}>
          <SectionKicker number="04" text="Interactive Elements" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 3.8vw, 46px)',
              fontWeight: 600,
              letterSpacing: '-1px',
              color: 'var(--snail-charcoal)',
              margin: '16px 0 10px',
            }}
          >
            Component Patterns &amp; Actions
          </h2>
          <p style={{ color: '#746e65', fontSize: '15px', maxWidth: '780px', marginBottom: '32px' }}>
            Production-ready UI components utilizing Noto Sans typography, crisp micro-interactions, and
            accessible contrast.
          </p>

          {/* Buttons & Links */}
          <div
            style={{
              background: 'white',
              border: '1px solid rgb(31 29 27 / 8%)',
              borderRadius: '6px',
              padding: '32px',
              marginBottom: '24px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                margin: '0 0 20px',
              }}
            >
              Buttons &amp; Links
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button type="button" className="button button-primary">
                Primary Red Button <ArrowRight size={16} />
              </button>
              <button type="button" className="button button-forest">
                Forest Action <ArrowRight size={16} />
              </button>
              <button type="button" className="button button-dark">
                Dark Charcoal Button <ArrowRight size={16} />
              </button>
              <a href="#test" className="text-link">
                Text link with arrow <ArrowRight size={14} />
              </a>
              <a href="#test" className="underlined-link">
                Underlined red link <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Cards Preview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Principle Card */}
            <article className="principle-card red" style={{ minHeight: 'auto' }}>
              <span className="principle-number">01</span>
              <span className="principle-icon">
                <Sprout size={22} />
              </span>
              <h3>
                Good<span>.</span>
              </h3>
              <p>Delicious and healthy food that connects us to seasonal flavor and local heritage.</p>
            </article>

            {/* Initiative Preview */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgb(31 29 27 / 8%)',
                padding: '24px',
                borderRadius: '6px',
                borderTop: '3px solid var(--snail-forest)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className="initiative-number">02</span>
                <span
                  className="initiative-badge"
                  style={{
                    background: 'var(--snail-forest-light)',
                    color: 'var(--snail-forest-dark)',
                  }}
                >
                  Garden · Active
                </span>
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--snail-charcoal)',
                  margin: '0 0 8px',
                }}
              >
                preSERVE Community Garden
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#686158', lineHeight: 1.7 }}>
                A vibrant urban garden cultivating organic food sovereignty and seed stewardship in North Lawndale.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 06: Guidelines & Do's / Don'ts ─── */}
        <section
          id="guidelines"
          style={{
            background: 'var(--snail-cream-dark)',
            border: '1px solid var(--snail-sand)',
            borderRadius: '8px',
            padding: '36px',
            marginBottom: '40px',
          }}
        >
          <SectionKicker number="05" text="Implementation Rules" />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '28px',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              margin: '14px 0 20px',
            }}
          >
            Typography Pairing &amp; Usage Rules
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            <div style={{ background: 'white', padding: '24px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontWeight: 800, marginBottom: '12px' }}>
                <Check size={18} />
                <span style={{ fontFamily: 'var(--font-section-header)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  DO
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.8, color: '#555' }}>
                <li>Use <strong>Bauer Bodoni</strong> for editorial statements, hero titles, and the primary brand mark.</li>
                <li>Use <strong>Oswald</strong> for all structured section headings (H1–H6), subheadings, and card titles.</li>
                <li>Use <strong>Riya Black</strong> in uppercase with generous tracking (1.2px–1.6px) for section kickers, tags, and badges.</li>
                <li>Use <strong>Noto Sans</strong> for body paragraphs, buttons, forms, and navigation links.</li>
              </ul>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontWeight: 800, marginBottom: '12px' }}>
                <span style={{ fontSize: '16px' }}>✕</span>
                <span style={{ fontFamily: 'var(--font-section-header)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  DON'T
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.8, color: '#555' }}>
                <li>Don't use Bauer Bodoni for small body text below 18px (hairline strokes diminish legibility).</li>
                <li>Don't use Riya Black for long sentences or multi-line paragraphs.</li>
                <li>Don't combine more than two display weights within a single component.</li>
                <li>Don't alter the core CSS variable names (<code>--font-title</code>, <code>--font-heading</code>, <code>--font-section-header</code>, <code>--font-body</code>).</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function ColorSwatchCard({
  color,
  isCopied,
  onCopy,
}: {
  color: ColorToken
  isCopied: boolean
  onCopy: () => void
}) {
  return (
    <div
      onClick={onCopy}
      style={{
        background: 'white',
        border: '1px solid rgb(31 29 27 / 7%)',
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 160ms ease, box-shadow 160ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 6px 16px rgb(31 29 27 / 8%)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
      title="Click to copy HEX code"
    >
      <div
        style={{
          height: '75px',
          background: color.hex,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: '8px',
          borderBottom: '1px solid rgb(31 29 27 / 6%)',
        }}
      >
        {isCopied && (
          <span
            style={{
              padding: '2px 8px',
              background: 'rgba(0,0,0,0.75)',
              color: '#4ade80',
              borderRadius: '3px',
              fontSize: '10px',
              fontWeight: 700,
            }}
          >
            Copied!
          </span>
        )}
      </div>
      <div style={{ padding: '12px' }}>
        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--snail-charcoal)', marginBottom: '2px' }}>
          {color.name}
        </div>
        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--snail-warm-gray)' }}>
          {color.hex}
        </div>
        <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#999', marginTop: '4px' }}>
          <code>{color.cssVar}</code>
        </div>
      </div>
    </div>
  )
}
