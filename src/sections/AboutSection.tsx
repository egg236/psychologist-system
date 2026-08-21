import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import styles from './AboutSection.module.css'

export function AboutSection() {
  const { about, images } = site

  return (
    <section id="about" className="section">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.photo}>
          <ResponsiveImage
            desktop={images.about.desktop}
            mobile={images.about.mobile}
            alt="Анна Морозова на консультации"
          />
        </Reveal>
        <Reveal className={styles.copy}>
          <div className="eyebrow">{about.eyebrow}</div>
          <h2>{about.title}</h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className={styles.stats}>
            {about.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <strong>{stat.value}</strong>
                <span className="muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
