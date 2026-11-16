import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { trackWildcardRedirect } from './index'

interface WildcardRedirectProps {
  /**
   * Target path to redirect to. Defaults to '/'
   */
  to?: string
}

/**
 * WildcardRedirect captures inbound legacy or 404 URLs, records the desired destination
 * and referrer details to New Relic, and immediately redirects the user to the destination.
 */
export default function WildcardRedirect({ to = '/' }: WildcardRedirectProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const hasTrackedRef = useRef(false)

  useEffect(() => {
    if (hasTrackedRef.current) {
      return
    }
    hasTrackedRef.current = true

    // 1. Record the legacy/wildcard URL and referrer to New Relic
    trackWildcardRedirect({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      redirectTo: to,
    })

    // 2. Perform client-side redirect and update the browser URL bar
    navigate(to, { replace: true })
  }, [location, navigate, to])

  return null
}
