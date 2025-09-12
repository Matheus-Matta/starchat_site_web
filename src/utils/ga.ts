export function track(event: string, params: Record<string, any> = {}) {
  const gaId = import.meta.env.VITE_GA_ID
  if (!gaId) return
  const w = window as any
  if (!w?.gtag) return
  w.gtag('event', event, params)
}

export const trackCTA = (where: string, label?: string) =>
  track('cta_click', { where, label })

export const trackFormSubmit = (name: string, status: 'success'|'error') =>
  track('form_submit', { form_name: name, status })
