import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return

    const syncFromHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (ids.includes(id)) setActiveId(id)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [ids])

  useEffect(() => {
    if (ids.length === 0) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Set<string>()

    const updateActive = () => {
      const next =
        [...ids].reverse().find((id) => visible.has(id)) ?? null
      if (next) setActiveId(next)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
        }
        updateActive()
      },
      {
        rootMargin: '-78px 0px -55% 0px',
        threshold: 0,
      },
    )

    for (const el of elements) observer.observe(el)

    return () => {
      observer.disconnect()
      visible.clear()
    }
  }, [ids])

  return activeId
}
