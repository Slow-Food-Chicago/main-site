import type React from 'react'

export interface SectionKickerProps {
  tag?: string
  number?: string
  text?: string
  className?: string
  style?: React.CSSProperties
}

export default function SectionKicker({
  tag,
  number,
  text,
  className = '',
  style,
}: SectionKickerProps) {
  return (
    <div className={`section-kicker ${className}`.trim()} style={style}>
      <span>{tag || number}</span> {text}
    </div>
  )
}
