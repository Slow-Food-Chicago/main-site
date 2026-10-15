import { useEffect } from 'react'
import { X, ArrowUpRight } from 'lucide-react'

export type ModalMember = {
  name: string
  role: string
  headshot?: string | null
  bio?: string
  social?: string | null
}

interface MemberModalProps {
  member: ModalMember
  onClose: () => void
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
          <img
            className="member-modal-img"
            src={member.headshot || 'https://via.placeholder.com/avatar.png?size=400&shape=square'}
            alt={`Photo of ${member.name}`}
          />
          <div className="member-modal-body">
            <span className="member-modal-role">{member.role}</span>
            <h3 className="member-modal-name">{member.name}</h3>
            {member.bio && <p className="member-modal-bio">{member.bio.trim()}</p>}
            {member.social && (
              <a
                href={member.social}
                target="_blank"
                rel="noopener noreferrer"
                className="member-modal-social"
              >
                View profile <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
