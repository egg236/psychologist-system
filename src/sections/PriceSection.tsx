import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import styles from './PriceSection.module.css'

export function PriceSection() {
  const { price, bookingUrl } = site

  return (
    <section id="price" className="section">
      <div className="container">
        <Reveal className="section-title">
          <div className="eyebrow">{price.eyebrow}</div>
          <h2>{price.title}</h2>
        </Reveal>

        <div className={styles.offers}>
          {price.offers.map((offer) => (
            <Reveal key={offer.title} className={styles.card}>
              <div className={styles.cardTop}>
                <h3>{offer.title}</h3>
                <strong>{offer.amount}</strong>
              </div>
              <ul className={styles.details}>
                {offer.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <Button href={bookingUrl} target="_blank" rel="noopener noreferrer">
                {price.cta}
              </Button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={`muted ${styles.note}`}>{price.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
