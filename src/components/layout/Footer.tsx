import { site } from '../../content/site'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.stack}`}>
        <p>
          © {year} {site.footer.copyright}
        </p>
        <p>{site.footer.warning}</p>
        <p>{site.footer.demo}</p>
      </div>
    </footer>
  )
}
