import { site } from '../content/site'
import { Reveal } from '../components/motion/Reveal'
import styles from './MeetingSection.module.css'

export function MeetingSection() {
  const { meeting } = site

  return (
    <section className={`section ${styles.meeting}`}>
      <div className="container">
        <Reveal className={styles.content}>
          <div className="eyebrow">{meeting.eyebrow}</div>
          <h2>{meeting.title}</h2>
          <p className={styles.lead}>{meeting.text}</p>
          <div className={styles.checklist}>
            {meeting.checklist.map((item) => (
              <div key={item} className={styles.check}>
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
