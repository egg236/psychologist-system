import { useEffect, useState } from 'react'
import { site } from '../../content/site'
import { Button } from '../ui/Button'
import styles from './CookieBanner.module.css'

const STORAGE_KEY = 'cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== 'accepted') {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // ignore quota / private mode
    }
    setVisible(false)
  }

  return (
    <div className={styles.wrap} role="dialog" aria-live="polite" aria-label="Уведомление о cookies">
      <div className={styles.panel}>
        <div className={styles.copy}>
          <p className={styles.text}>{site.cookies.text}</p>
          <div className={styles.links}>
            <a
              className={styles.link}
              href={site.cookies.moreHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.cookies.more}
            </a>
            <a className={styles.link} href={site.cookies.policyHref}>
              {site.cookies.policy}
            </a>
          </div>
        </div>
        <Button type="button" onClick={accept}>
          {site.cookies.accept}
        </Button>
      </div>
    </div>
  )
}
