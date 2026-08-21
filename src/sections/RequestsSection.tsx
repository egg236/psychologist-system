import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import styles from './RequestsSection.module.css'

export function RequestsSection() {
  const { requests } = site

  return (
    <section id="requests" className="section">
      <div className="container">
        <Reveal className="section-title">
          <div className="eyebrow">{requests.eyebrow}</div>
          <h2>{requests.title}</h2>
        </Reveal>
        <div className={styles.cards}>
          {requests.items.map((item) => (
            <Reveal key={item.title} as="article" className={styles.card}>
              <div className={styles.icon} aria-hidden="true">
                <img src={item.icon} alt="" loading="lazy" decoding="async" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className={`muted ${styles.note}`}>{requests.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
