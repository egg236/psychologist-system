import { privacyPolicy } from '../content/privacyPolicy'
import styles from './PrivacyPage.module.css'

export function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.back} href="/">
          {privacyPolicy.backLabel}
        </a>
        <h1 className={styles.title}>{privacyPolicy.title}</h1>
        <div className={styles.sections}>
          {privacyPolicy.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {'bullets' in section && section.bullets ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
