import { useState, useRef, useEffect, useCallback } from 'react'
import {
  ArrowUpRight,
  Sprout,
  Sun,
  Leaf,
  Snowflake,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import BackLink from '../components/ui/BackLink'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import SectionKicker from '../components/ui/SectionKicker'
import {
  gardenHarvest,
  gardenPartners,
  gardenHeroPhoto,
  gardenPhotos,
  type Crop,
} from '../data/preserve-garden'
import { CONTACT_EMAIL } from '../data/constants'
import { Link } from 'react-router-dom'
import CropModal from '../components/garden/CropModal'
import { addPageAction } from '../telemetry'

const SEASON_CONFIG = {
  spring: { label: 'Spring', icon: Sprout },
  summer: { label: 'Summer', icon: Sun },
  fall: { label: 'Fall', icon: Leaf },
  winter: { label: 'Winter', icon: Snowflake },
} as const

export default function PreserveGardenPage() {
  const [activeCrop, setActiveCrop] = useState<Crop | null>(null)
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
  const [isPinned, setIsPinned] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    addPageAction('modal_open', {
      modal_name: 'PhotoLightbox',
      modal_type: 'photo_lightbox',
      photo_index: index,
      photo_caption: gardenPhotos[index]?.caption || '',
      page: '/initiatives/preserve-garden',
    })
  }, [])

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const showPrevPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + gardenPhotos.length) % gardenPhotos.length
    )
  }, [])
  const showNextPhoto = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % gardenPhotos.length))
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') showPrevPhoto()
      else if (e.key === 'ArrowRight') showNextPhoto()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, closeLightbox, showPrevPhoto, showNextPhoto])

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleCropMouseEnter = (crop: Crop, element: HTMLElement) => {
    clearCloseTimeout()
    if (!isPinned) {
      setActiveCrop(crop)
      setTriggerRect(element.getBoundingClientRect())
    }
  }

  const handleCropMouseLeave = () => {
    if (!isPinned) {
      clearCloseTimeout()
      closeTimeoutRef.current = window.setTimeout(() => {
        setActiveCrop(null)
        setTriggerRect(null)
      }, 160)
    }
  }

  const handleModalMouseEnter = () => {
    clearCloseTimeout()
  }

  const handleModalMouseLeave = () => {
    if (!isPinned) {
      clearCloseTimeout()
      closeTimeoutRef.current = window.setTimeout(() => {
        setActiveCrop(null)
        setTriggerRect(null)
      }, 160)
    }
  }

  const handleCropClick = (crop: Crop, element: HTMLElement) => {
    clearCloseTimeout()
    if (activeCrop?.category === crop.category && isPinned) {
      setIsPinned(false)
      setActiveCrop(null)
      setTriggerRect(null)
    } else {
      setActiveCrop(crop)
      setTriggerRect(element.getBoundingClientRect())
      setIsPinned(true)
      addPageAction('modal_open', {
        modal_name: 'CropModal',
        modal_type: 'crop',
        crop_name: crop.category,
        crop_category: crop.category,
        season: crop.season,
        page: '/initiatives/preserve-garden',
      })
    }
  }

  const handleCloseModal = () => {
    clearCloseTimeout()
    setActiveCrop(null)
    setTriggerRect(null)
    setIsPinned(false)
  }

  // Dismiss hover popover when scrolling to prevent detached positioning
  useEffect(() => {
    const handleScroll = () => {
      if (!isPinned && activeCrop) {
        clearCloseTimeout()
        setActiveCrop(null)
        setTriggerRect(null)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearCloseTimeout()
    }
  }, [isPinned, activeCrop])

  return (
    <main>
      {/* Back nav */}
      <BackLink to="/initiatives" label="All initiatives" />

      {/* Hero */}
      <PageHero
        className="preserve-hero"
        kickerTag="Initiative"
        kickerText="preSERVE Garden"
        title={
          <>
            A garden that <em>grows community.</em>
          </>
        }
        description="Since 2010, the preSERVE Garden has been growing heirloom vegetables, heritage fruits, and deep roots in Chicago's North Lawndale neighborhood one harvest at a time."
        asideImage={gardenHeroPhoto.src}
        asideImageAlt={gardenHeroPhoto.alt}
      />

      {/* About */}
      <section className="preserve-about-section">
        <div className="preserve-about-inner">
          <div className="preserve-about-copy">
            <SectionKicker text="About the garden" />
            <h2 className="preserve-section-title">
              Rooted in <em>North Lawndale</em> since 2010.
            </h2>
            <p className="preserve-body-text">
              The preSERVE Garden was born out of a desire to get more deeply involved in community
              gardening at a neighborhood level. What started as a small plot has grown into a
              thriving, multi-partner space, home to fruit trees and berry bushes, active
              composting beds, and an ever-expanding diversity of crops.
            </p>
            <p className="preserve-body-text">
              Many of the varieties we grow are drawn from{' '}
              <Link
                to="/initiatives/ark-of-taste"
                style={{ color: 'var(--snail-forest-dark)', fontWeight: 600, textDecoration: 'underline' }}
              >
                Slow Food's Ark of Taste
              </Link>
              , an international catalog of endangered and rare foods, making the garden not just a
              food source, but a living act of preservation.
            </p>
          </div>
          <div className="preserve-about-stat-stack">
            <div className="preserve-stat">
              <span className="preserve-stat-number">2010</span>
              <span className="preserve-stat-label">Year founded</span>
            </div>
            <div className="preserve-stat">
              <span className="preserve-stat-number">3+</span>
              <span className="preserve-stat-label">Partner organizations</span>
            </div>
            <div className="preserve-stat">
              <span className="preserve-stat-number">16+</span>
              <span className="preserve-stat-label">Crops grown each season</span>
            </div>
          </div>
        </div>

        {/* Garden Photo Gallery */}
        <div className="preserve-gallery" aria-label="preSERVE Garden photo gallery">
          {gardenPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className={`preserve-gallery-card preserve-gallery-card--${photo.orientation} preserve-gallery-card--item-${index + 1}`}
              onClick={() => openLightbox(index)}
              aria-label={`View photo: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="preserve-gallery-img"
                loading={index < 3 ? 'eager' : 'lazy'}
              />
              <span className="preserve-gallery-caption">{photo.caption}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Photo Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="preserve-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Garden photo viewer"
        >
          <div
            className="preserve-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="preserve-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close photo viewer"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="preserve-lightbox-nav preserve-lightbox-nav--prev"
              onClick={showPrevPhoto}
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <figure className="preserve-lightbox-figure">
              <img
                src={gardenPhotos[lightboxIndex].src}
                alt={gardenPhotos[lightboxIndex].alt}
                className="preserve-lightbox-img"
              />
              <figcaption className="preserve-lightbox-caption">
                <span>{gardenPhotos[lightboxIndex].caption}</span>
                <span className="preserve-lightbox-counter">
                  {lightboxIndex + 1} / {gardenPhotos.length}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              className="preserve-lightbox-nav preserve-lightbox-nav--next"
              onClick={showNextPhoto}
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* What we grow */}
      <section className="preserve-harvest-section">
        <div className="preserve-harvest-inner">
          <SectionKicker text="What we grow" />
          <h2 className="preserve-section-title preserve-section-title--light">
            A full season's <em>worth of flavor.</em>
          </h2>
          <p className="preserve-harvest-desc">
            Each growing season the garden yields a diverse mix of vegetables, fruits, and herbs,
            many of them heirloom or heritage varieties. Hover over any crop below to view the
            varieties planted and their stories.
          </p>
          <ul className="preserve-harvest-grid">
            {gardenHarvest.map((crop) => {
              const isActive = activeCrop?.category === crop.category
              const seasonInfo = SEASON_CONFIG[crop.season]
              const SeasonIcon = seasonInfo.icon
              const hasArkOfTaste = crop.varieties.some((v) => v.arkOfTaste)

              return (
                <li key={crop.category}>
                  <button
                    type="button"
                    className={`preserve-harvest-item ${isActive ? 'preserve-harvest-item--active' : ''}`}
                    onMouseEnter={(e) => handleCropMouseEnter(crop, e.currentTarget)}
                    onMouseLeave={handleCropMouseLeave}
                    onClick={(e) => handleCropClick(crop, e.currentTarget)}
                    onFocus={(e) => handleCropMouseEnter(crop, e.currentTarget)}
                    onBlur={handleCropMouseLeave}
                    aria-haspopup="dialog"
                    aria-expanded={isActive}
                    aria-label={`View varieties for ${crop.category}`}
                  >
                    <div className="preserve-harvest-header">
                      <span className="preserve-harvest-dot" aria-hidden="true">
                        ✳
                      </span>
                      <span className="preserve-harvest-name">{crop.category}</span>
                      <span className="preserve-harvest-count">
                        {crop.varieties.length}{' '}
                        {crop.varieties.length === 1 ? 'variety' : 'varieties'}
                      </span>
                    </div>

                    <div className="preserve-harvest-badges">
                      <span
                        className={`preserve-harvest-badge preserve-harvest-badge--season preserve-harvest-badge--${crop.season}`}
                        title={`${seasonInfo.label} Harvest`}
                      >
                        <SeasonIcon size={11} aria-hidden="true" />
                        <span>{seasonInfo.label}</span>
                      </span>

                      {hasArkOfTaste && (
                        <span
                          className="preserve-harvest-badge preserve-harvest-badge--ark"
                          title="Slow Food Ark of Taste Variety"
                        >
                          <Sparkles size={11} aria-hidden="true" />
                          <span>Ark of Taste</span>
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Active Crop Modal (Hover Popover or Pinned Dialog) */}
      {activeCrop && (
        <CropModal
          crop={activeCrop}
          triggerRect={triggerRect}
          isPinned={isPinned}
          onClose={handleCloseModal}
          onMouseEnter={handleModalMouseEnter}
          onMouseLeave={handleModalMouseLeave}
        />
      )}

      {/* Partners */}
      <section className="preserve-partners-section">
        <div className="preserve-partners-inner">
          <SectionKicker text="Our partners" />
          <h2 className="preserve-section-title">
            Built on <em>collaboration.</em>
          </h2>
          <div className="preserve-partners-list">
            {gardenPartners.map((p) => (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="preserve-partner-card"
                key={p.name}
                title={`Visit ${p.name}`}
              >
                <h3 className="preserve-partner-name">
                  <span>{p.name}</span>
                  <ArrowUpRight size={16} className="preserve-partner-arrow" aria-hidden="true" />
                </h3>
                <p className="preserve-partner-desc">{p.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        kickerTag="Join us"
        kickerText="In the garden"
        heading={
          <>
            Ready to <em>get growing?</em>
          </>
        }
        description="Volunteer days are open to all skill levels. Check our calendar to find out when the next workday is, or to learn how your organization can partner with us."
        actions={
          <>
            <Link to="/events" className="button button-white">
              Check for upcoming workdays <ArrowUpRight size={16} />
            </Link>
            <a className="button button-white" href={`mailto:${CONTACT_EMAIL}`}>
              For Groups <ArrowUpRight size={16} />
            </a>
          </>
        }
      />
    </main>
  )
}
