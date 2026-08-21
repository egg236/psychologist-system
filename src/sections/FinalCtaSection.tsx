import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import styles from './FinalCtaSection.module.css'

export function FinalCtaSection() {
  const { finalCta, bookingUrl } = site

  return (
    <section className="section">
      <div className="container">
        <Reveal className={styles.final}>
          <div>
            <div className="eyebrow">{finalCta.eyebrow}</div>
            <h2>{finalCta.title}</h2>
            <p>{finalCta.text}</p>
            <Button href={bookingUrl} target="_blank" rel="noopener noreferrer">
              {finalCta.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
