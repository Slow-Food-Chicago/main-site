import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BackLink({
  to = '/initiatives',
  label = 'All initiatives',
  className = '',
}) {
  return (
    <div className={`pantry-back ${className}`.trim()}>
      <Link to={to} className="pantry-back-link">
        <ArrowLeft size={14} /> {label}
      </Link>
    </div>
  )
}
