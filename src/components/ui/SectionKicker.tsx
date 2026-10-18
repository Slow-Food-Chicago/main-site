import type React from 'react'

export interface SectionKickerProps {
  tag?: string
  text?: string
  className?: string
  style?: React.CSSProperties
}

export default function SectionKicker({
  tag,
  text,
  className = '',
  style,
}: SectionKickerProps) {
  return (
    <div className={`section-kicker ${className}`.trim()} style={style}>
      <span>{tag || ''}</span> {text}
    </div>
  )
}
