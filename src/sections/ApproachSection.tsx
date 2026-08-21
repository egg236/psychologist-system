import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import styles from './ApproachSection.module.css'

export function ApproachSection() {
  const { approach } = site

  return (
    <section id="approach" className="section">
      <div className="container">
        <Reveal className="section-title">
          <div className="eyebrow">{approach.eyebrow}</div>
          <h2>{approach.title}</h2>
        </Reveal>
        <div className={styles.principles}>
          {approach.items.map((item) => (
            <Reveal key={item.title} className={styles.principle}>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
