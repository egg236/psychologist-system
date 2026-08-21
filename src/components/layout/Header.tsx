import { useEffect, useId, useMemo, useState } from 'react'
import { site } from '../../content/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Button } from '../ui/Button'
import styles from './Header.module.css'

const DESKTOP_MIN = 981

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const sectionIds = useMemo(
    () => site.nav.map((item) => item.href.slice(1)),
    [],
  )
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN) setMenuOpen(false)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const navLinkClass = (href: string) =>
    href === `#${activeId}` ? styles.navActive : undefined

  return (
    <header className={styles.header}>
      <div className={`container ${styles.nav}`}>
        <a className={styles.brand} href="/" onClick={closeMenu}>
          {site.brand.name}
          <span>{site.brand.tagline}</span>
        </a>

        <nav className={styles.navlinks} aria-label="Навигация по разделам">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={`/${item.href}`}
              className={navLinkClass(item.href)}
              aria-current={item.href === `#${activeId}` ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            {site.headerCta}
          </Button>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} />
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ''}`}
        hidden={!menuOpen}
      >
        <nav className="container" aria-label="Мобильная навигация">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={`/${item.href}`}
              className={navLinkClass(item.href)}
              aria-current={item.href === `#${activeId}` ? 'true' : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
