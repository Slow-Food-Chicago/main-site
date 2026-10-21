import { useEffect } from 'react'
import { X } from 'lucide-react'
import { SocialLinks } from './SocialLink'

export type ModalMember = {
  name: string
  role: string
  headshot?: string | null
  bio?: string | React.ReactNode
  social?: string | null
}

interface MemberModalProps {
  member: ModalMember
  onClose: () => void
}

function renderInlineFormatting(text: string): React.ReactNode[] {
  // Regex to match links, bold, italic, line breaks without lookbehinds for broad compatibility
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|\n)/g

  const parts = text.split(regex)
  return parts.map((part, index) => {
    if (!part) return null

    if (part === '\n') {
      return <br key={index} />
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="member-modal-bio-link"
        >
          {linkMatch[1]}
        </a>
      )
    }

    const boldMatch = part.match(/^(\*\*|__)(.+)\1$/)
    if (boldMatch) {
      return <strong key={index}>{boldMatch[2]}</strong>
    }

    const italicMatch = part.match(/^(\*|_)(.+)\1$/)
    if (italicMatch) {
      return <em key={index}>{italicMatch[2]}</em>
    }

    return part
  }).filter(Boolean)
}

export function FormattedBio({ content }: { content: string | React.ReactNode }) {
  if (typeof content !== 'string') {
    return <div className="member-modal-bio">{content}</div>
  }

  const trimmed = content.trim()
  if (!trimmed) return null

  // Split into blocks by two or more newlines (or single empty lines)
  const blocks = trimmed.split(/\n\s*\n/)

  return (
    <div className="member-modal-bio" tabIndex={0} role="region" aria-label="Biography">
      {blocks.map((block, idx) => {
        const cleanBlock = block.trim()
        if (!cleanBlock) return null

        const headingMatch = cleanBlock.match(/^(#{1,6})\s+(.+)$/)
        if (headingMatch) {
          return (
            <h4 key={idx} className="member-modal-bio-heading">
              {renderInlineFormatting(headingMatch[2])}
            </h4>
          )
        }

        const lines = cleanBlock.split('\n').map((l) => l.trim())
        const isList = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l))
        if (isList) {
          return (
            <ul key={idx} className="member-modal-bio-list">
              {lines.map((line, liIdx) => (
                <li key={liIdx}>
                  {renderInlineFormatting(line.replace(/^[-*]\s+/, ''))}
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={idx} className="member-modal-bio-paragraph">
            {renderInlineFormatting(cleanBlock)}
          </p>
        )
      })}
    </div>
  )
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="member-modal-backdrop" onClick={onClose}>
      <div
        className="member-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={member.name}
      >
        <button className="member-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={2} />
        </button>
        <div className="member-modal-inner">
          <div className="member-modal-image-wrap">
            <img
              className="member-modal-img"
              src={member.headshot || 'https://via.placeholder.com/avatar.png?size=400&shape=square'}
              alt={`Photo of ${member.name}`}
            />
          </div>
          <div className="member-modal-body">
            <span className="member-modal-role">{member.role}</span>
            <h3 className="member-modal-name">{member.name}</h3>
            {member.bio && <FormattedBio content={member.bio} />}
            {member.social && <SocialLinks urls={member.social} />}
          </div>
        </div>
      </div>
    </div>
  )
}
