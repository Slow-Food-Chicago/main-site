import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export interface BackLinkProps {
  to?: string
  label?: string
  className?: string
}

export default function BackLink({
  to = '/initiatives',
  label = 'All initiatives',
  className = '',
}: BackLinkProps) {
  return (
    <div className={`pantry-back ${className}`.trim()}>
      <Link to={to} className="pantry-back-link">
        <ArrowLeft size={14} /> {label}
      </Link>
    </div>
  )
}
