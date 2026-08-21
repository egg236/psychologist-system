import { useCallback, useRef, useState, type RefCallback } from 'react'

export function useInViewOnce<T extends Element>(
  threshold = 0.12,
): [RefCallback<T>, boolean] {
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback<RefCallback<T>>(
    (node) => {
      observerRef.current?.disconnect()
      observerRef.current = null

      if (!node || visibleRef.current) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          visibleRef.current = true
          setVisible(true)
          observer.disconnect()
          observerRef.current = null
        },
        { threshold },
      )

      observerRef.current = observer
      observer.observe(node)
    },
    [threshold],
  )

  return [setRef, visible]
}
