import SectionKicker from './SectionKicker'

export default function PageHero({
  kickerTag,
  kickerText,
  kicker,
  title,
  description,
  asideIcon: AsideIcon,
  asideColor,
  actions,
  className = '',
  children,
}) {
  return (
    <section className={`page-hero ${className}`.trim()}>
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

      {AsideIcon && (
        <div className="page-hero-aside" aria-hidden="true">
          <AsideIcon size={52} strokeWidth={1.2} style={{ color: asideColor }} />
        </div>
      )}
    </section>
  )
}
