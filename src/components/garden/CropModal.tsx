import { useEffect, useRef, useState } from 'react'
import { X, Sparkles, Sprout, Sun, Leaf, Snowflake } from 'lucide-react'
import type { Crop } from '../../data/preserve-garden'

interface CropModalProps {
  crop: Crop
  triggerRect: DOMRect | null
  isPinned: boolean
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const SEASON_CONFIG = {
  spring: { label: 'Spring Harvest', icon: Sprout },
  summer: { label: 'Summer Harvest', icon: Sun },
  fall: { label: 'Fall Harvest', icon: Leaf },
  winter: { label: 'Winter Harvest', icon: Snowflake },
} as const

function computePosition(triggerRect: DOMRect | null, isPinned: boolean) {
  if (isPinned || !triggerRect || typeof window === 'undefined') {
    return null
  }
  const modalWidth = Math.min(380, window.innerWidth - 32)
  const triggerCenter = triggerRect.left + triggerRect.width / 2

  let left = triggerCenter - modalWidth / 2
  left = Math.max(16, Math.min(window.innerWidth - modalWidth - 16, left))

  const arrowLeft = Math.max(16, Math.min(modalWidth - 16, triggerCenter - left))

  const spaceAbove = triggerRect.top
  const spaceBelow = window.innerHeight - triggerRect.bottom

  if (spaceAbove >= 280 || spaceAbove > spaceBelow) {
    return {
      bottom: window.innerHeight - triggerRect.top + 10,
      left,
      arrowLeft,
      placement: 'top' as const,
    }
  }
  return {
    top: triggerRect.bottom + 10,
    left,
    arrowLeft,
    placement: 'bottom' as const,
  }
}

export default function CropModal({
  crop,
  triggerRect,
  isPinned,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: CropModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [, setWindowDimensions] = useState({ width: 0, height: 0 })

  // Subscribe to window resize to update anchored position
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const position = computePosition(triggerRect, isPinned)

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Lock body scroll only when pinned dialog modal is open on small screens / click
  useEffect(() => {
    if (isPinned) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isPinned])

  const seasonInfo = SEASON_CONFIG[crop.season]
  const SeasonIcon = seasonInfo.icon
  const seasonLabel = seasonInfo.label
  const hasArkOfTaste = crop.varieties.some((v) => v.arkOfTaste)

  // ── Pinned Dialog Mode (Click / Tap / Mobile) ─────────────────────────
  if (isPinned || !triggerRect || !position) {
    return (
      <div className="crop-modal-backdrop" onClick={onClose} role="presentation">
        <div
          ref={modalRef}
          className="crop-modal crop-modal--dialog"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Varieties of ${crop.category}`}
        >
          <button
            type="button"
            className="crop-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={2} />
          </button>

          <div className="crop-modal-header">
            <div className="crop-modal-meta">
              <span className={`crop-modal-season-tag crop-modal-season-tag--${crop.season}`}>
                <SeasonIcon size={12} aria-hidden="true" />
                {seasonLabel}
              </span>
              {hasArkOfTaste && (
                <span className="crop-modal-ark-tag crop-modal-ark-tag--header">
                  <Sparkles size={11} aria-hidden="true" />
                  Ark of Taste
                </span>
              )}
              <span className="crop-modal-count-badge">
                {crop.varieties.length} {crop.varieties.length === 1 ? 'variety' : 'varieties'}
              </span>
            </div>
            <h3 className="crop-modal-title">
              <Sprout size={20} className="crop-modal-title-icon" aria-hidden="true" />
              {crop.category}
            </h3>
            <p className="crop-modal-subtitle">
              Heirloom and heritage varieties planted at the preSERVE Garden
            </p>
          </div>

          <div className="crop-modal-body">
            <ul className="crop-modal-varieties">
              {crop.varieties.map((variety) => (
                <li key={variety.name} className="crop-modal-variety-card">
                  <div className="crop-modal-variety-header">
                    <h4 className="crop-modal-variety-name">{variety.name}</h4>
                    {variety.arkOfTaste && (
                      <span className="crop-modal-ark-tag">
                        <Sparkles size={11} aria-hidden="true" />
                        Ark of Taste
                      </span>
                    )}
                  </div>
                  <p className="crop-modal-variety-desc">{variety.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="crop-modal-footer">
            <span className="crop-modal-footer-text">
              preSERVE Community Garden · North Lawndale, Chicago
            </span>
          </div>
        </div>
      </div>
    )
  }

  // ── Hover Anchored Popover Mode (Desktop Hover) ──────────────────────
  return (
    <div
      ref={modalRef}
      className={`crop-modal crop-modal--hover crop-modal--placement-${position.placement}`}
      style={{
        left: `${position.left}px`,
        ...(position.top !== undefined ? { top: `${position.top}px` } : {}),
        ...(position.bottom !== undefined ? { bottom: `${position.bottom}px` } : {}),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="dialog"
      aria-modal="false"
      aria-label={`Varieties of ${crop.category}`}
    >
      {/* Arrow pointing to the trigger crop item */}
      <div
        className="crop-modal-arrow"
        style={{ left: `${position.arrowLeft}px` }}
        aria-hidden="true"
      />

      <div className="crop-modal-header">
        <div className="crop-modal-meta">
          <span className={`crop-modal-season-tag crop-modal-season-tag--${crop.season}`}>
            <SeasonIcon size={12} aria-hidden="true" />
            {seasonLabel}
          </span>
          {hasArkOfTaste && (
            <span className="crop-modal-ark-tag crop-modal-ark-tag--header">
              <Sparkles size={11} aria-hidden="true" />
              Ark of Taste
            </span>
          )}
          <span className="crop-modal-count-badge">
            {crop.varieties.length} {crop.varieties.length === 1 ? 'variety' : 'varieties'}
          </span>
        </div>
        <div className="crop-modal-title-row">
          <h3 className="crop-modal-title">
            <Sprout size={18} className="crop-modal-title-icon" aria-hidden="true" />
            {crop.category}
          </h3>
          <button
            type="button"
            className="crop-modal-close-hover"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
        <p className="crop-modal-subtitle">Varieties planted for the garden:</p>
      </div>

      <div className="crop-modal-body">
        <ul className="crop-modal-varieties">
          {crop.varieties.map((variety) => (
            <li key={variety.name} className="crop-modal-variety-card">
              <div className="crop-modal-variety-header">
                <h4 className="crop-modal-variety-name">{variety.name}</h4>
                {variety.arkOfTaste && (
                  <span className="crop-modal-ark-tag">
                    <Sparkles size={11} aria-hidden="true" />
                    Ark of Taste
                  </span>
                )}
              </div>
              <p className="crop-modal-variety-desc">{variety.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="crop-modal-footer">
        <span className="crop-modal-footer-hint">Click crop to pin open</span>
        <span className="crop-modal-footer-text">preSERVE Garden</span>
      </div>
    </div>
  )
}
