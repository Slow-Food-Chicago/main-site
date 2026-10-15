import { useState } from 'react'
import { X, Check, Globe, Key, Info } from 'lucide-react'

interface FeedConfigModalProps {
  isOpen: boolean
  onClose: () => void
  currentCalendarId: string
  currentIcsUrl: string
  currentApiKey: string
  onSave: (settings: { calendarId: string; icsUrl: string; apiKey: string }) => void
}

export default function FeedConfigModal({
  isOpen,
  onClose,
  currentCalendarId,
  currentIcsUrl,
  currentApiKey,
  onSave,
}: FeedConfigModalProps) {
  const [calendarId, setCalendarId] = useState(currentCalendarId)
  const [icsUrl, setIcsUrl] = useState(currentIcsUrl)
  const [apiKey, setApiKey] = useState(currentApiKey)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      calendarId: calendarId.trim(),
      icsUrl: icsUrl.trim(),
      apiKey: apiKey.trim(),
    })
    onClose()
  }

  const handleReset = () => {
    setCalendarId('hello@slowfoodchicago.org')
    setIcsUrl('')
    setApiKey('')
  }

  return (
    <div className="feed-modal-backdrop" onClick={onClose}>
      <div
        className="feed-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feed-modal-title"
      >
        <div className="feed-modal-header">
          <div className="feed-modal-title-group">
            <Globe size={20} style={{ color: 'var(--snail-red)' }} />
            <h3 id="feed-modal-title">Google Calendar Feed Settings</h3>
          </div>
          <button
            type="button"
            className="feed-modal-close"
            onClick={onClose}
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="feed-modal-body">
          <p className="feed-modal-intro">
            Connect your live Google Calendar. Events will automatically sync and render directly
            into this page.
          </p>

          <div className="feed-form-field">
            <label htmlFor="feed-cal-id">
              Google Calendar ID
              <span className="feed-field-hint">
                (e.g. <code>hello@slowfoodchicago.org</code> or <code>c_...group.calendar.google.com</code>)
              </span>
            </label>
            <input
              id="feed-cal-id"
              type="text"
              value={calendarId}
              onChange={(e) => setCalendarId(e.target.value)}
              placeholder="hello@slowfoodchicago.org"
              className="feed-input"
            />
          </div>

          <div className="feed-form-field">
            <label htmlFor="feed-ics-url">
              Public iCal (.ics) Feed URL (Optional)
              <span className="feed-field-hint">
                Direct URL to a public <code>.ics</code> calendar export
              </span>
            </label>
            <input
              id="feed-ics-url"
              type="url"
              value={icsUrl}
              onChange={(e) => setIcsUrl(e.target.value)}
              placeholder="https://calendar.google.com/calendar/ical/.../public/basic.ics"
              className="feed-input"
            />
          </div>

          <div className="feed-form-field">
            <label htmlFor="feed-api-key">
              Google Calendar API Key (Optional)
              <span className="feed-field-hint">
                Optional API key for direct Google Calendar REST API v3 queries
              </span>
            </label>
            <div className="feed-input-with-icon">
              <Key size={14} className="feed-input-icon" />
              <input
                id="feed-api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="feed-input"
              />
            </div>
          </div>

          {/* Guide tip */}
          <div className="feed-guide-box">
            <div className="feed-guide-title">
              <Info size={14} /> How to make your Google Calendar public:
            </div>
            <ol className="feed-guide-steps">
              <li>Open Google Calendar on desktop and click the 3 dots next to your calendar.</li>
              <li>Select <strong>Settings and sharing</strong>.</li>
              <li>Under <strong>Access permissions for events</strong>, check <em>Make available to public</em>.</li>
              <li>Scroll down to <strong>Integrate calendar</strong> to copy your <em>Calendar ID</em> or <em>Public address in iCal format</em>.</li>
            </ol>
          </div>

          <div className="feed-modal-actions">
            <button
              type="button"
              className="button button-white feed-modal-btn-reset"
              onClick={handleReset}
            >
              Reset to Defaults
            </button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="button button-white"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button button-primary"
              >
                <Check size={15} /> Save &amp; Sync
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
