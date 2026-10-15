export default function CtaSection({
  kickerTag,
  kickerText,
  heading,
  description,
  actions,
  className = '',
  children,
}) {
  return (
    <section className={`initiatives-cta-section ${className}`.trim()}>
      <div className="initiatives-cta-inner">
        {(kickerTag || kickerText) && (
          <div className="section-kicker" style={{ color: 'rgb(255 255 255 / 65%)' }}>
            <span style={{ color: 'var(--snail-yellow)' }}>{kickerTag}</span> {kickerText}
          </div>
        )}

        <h2 className="initiatives-cta-heading">{heading}</h2>

        {description && <p className="initiatives-cta-desc">{description}</p>}

        {actions && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {actions}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
