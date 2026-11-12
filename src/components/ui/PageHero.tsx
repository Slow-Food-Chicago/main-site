import type React from 'react'
import type { LucideIcon } from 'lucide-react'
import SectionKicker from './SectionKicker'

export interface PageHeroProps {
  kickerTag?: string
  kickerText?: string
  kicker?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  asideIcon?: LucideIcon
  asideColor?: string
  asideImage?: string
  asideImageAlt?: string
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export default function PageHero({
  kickerTag,
  kickerText,
  kicker,
  title,
  description,
  asideIcon: AsideIcon,
  asideColor,
  asideImage,
  asideImageAlt = '',
  actions,
  className = '',
  children,
}: PageHeroProps) {
  const heroClasses = ['page-hero', asideImage ? 'page-hero--with-image' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={heroClasses}>
      <div className="page-hero-inner">
        {kicker ? (
          kicker
        ) : kickerTag || kickerText ? (
          <SectionKicker tag={kickerTag} text={kickerText} />
        ) : null}

        <h1 className="page-hero-title">{title}</h1>

        {description && <p className="page-hero-desc">{description}</p>}

        {actions && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {actions}
          </div>
        )}

        {children}
      </div>

      {asideImage ? (
        <div className="page-hero-media">
          <img src={asideImage} alt={asideImageAlt} className="page-hero-img" />
        </div>
      ) : (
        AsideIcon && (
          <div className="page-hero-aside" aria-hidden="true">
            <AsideIcon size={52} strokeWidth={1.2} style={{ color: asideColor }} />
          </div>
        )
      )}
    </section>
  )
}
