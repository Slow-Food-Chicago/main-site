export default function SectionKicker({ tag, number, text, className = '', style }) {
  return (
    <div className={`section-kicker ${className}`.trim()} style={style}>
      <span>{tag || number}</span> {text}
    </div>
  )
}
