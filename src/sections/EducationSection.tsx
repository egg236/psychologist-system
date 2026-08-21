import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import styles from './EducationSection.module.css'

export function EducationSection() {
  const { education } = site

  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal className="section-title">
          <div className="eyebrow">{education.eyebrow}</div>
          <h2>{education.title}</h2>
        </Reveal>
        <Reveal className={styles.timeline}>
          {education.items.map((item) => (
            <div key={item.year} className={styles.item}>
              <div className={styles.year}>{item.year}</div>
              <div>
                <h3>{item.title}</h3>
                <p className="muted">{item.detail}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal>
          <p className={`muted ${styles.note}`}>{education.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
