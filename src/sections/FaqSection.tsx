import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import styles from './FaqSection.module.css'

export function FaqSection() {
  const { faq } = site

  return (
    <section id="faq" className="section">
      <div className="container">
        <Reveal className="section-title">
          <div className="eyebrow">{faq.eyebrow}</div>
          <h2>{faq.title}</h2>
        </Reveal>
        <Reveal className={styles.list}>
          {faq.items.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
