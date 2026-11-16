import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { setPageViewName, setCustomAttribute, addPageAction } from './index'

/**
 * TelemetryRouteTracker integrates React Router route changes with the New Relic Browser Agent.
 *
 * For single-page applications (SPAs), this updates the active page view name and
 * records a 'route_change' PageAction with custom attributes for previous route and document title.
 */
export default function TelemetryRouteTracker() {
  const location = useLocation()
  const previousPathRef = useRef<string | null>(null)

  useEffect(() => {
    const currentPath = location.pathname + location.search
    if (previousPathRef.current === currentPath) {
      return
    }

    const routeName = location.pathname
    const previousRoute = previousPathRef.current ?? '(initial-load)'

    // Update New Relic SPA page view name
    setPageViewName(routeName)

    // Tag session attributes with current route context
    setCustomAttribute('page.route', routeName)
    setCustomAttribute('page.previous_route', previousRoute)
    if (location.search) {
      setCustomAttribute('page.search', location.search)
    }

    // Record custom PageAction for route transition
    addPageAction('route_change', {
      from: previousRoute,
      to: routeName,
    })

    previousPathRef.current = currentPath
  }, [location])

  return null
}
