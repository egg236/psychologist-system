import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const { hero, images, bookingUrl } = site

  return (
    <section className={`container ${styles.hero}`}>
      <Reveal className={styles.copy}>
        <div className="eyebrow">{hero.eyebrow}</div>
        <h1>{hero.title}</h1>
        <p className={styles.lead}>{hero.lead}</p>
        <div className={styles.actions}>
          <Button href={bookingUrl} target="_blank" rel="noopener noreferrer">
            {hero.primaryCta}
          </Button>
          <Button href={hero.secondaryHref} variant="ghost">
            {hero.secondaryCta}
          </Button>
        </div>
      </Reveal>
      <Reveal className={styles.art}>
        <ResponsiveImage
          desktop={images.hero.desktop}
          mobile={images.hero.mobile}
          alt="Психолог Анна Морозова"
          loading="eager"
        />
      </Reveal>
    </section>
  )
}
