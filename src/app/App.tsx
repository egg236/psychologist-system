import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { AboutSection } from '../sections/AboutSection'
import { ApproachSection } from '../sections/ApproachSection'
import { EducationSection } from '../sections/EducationSection'
import { FaqSection } from '../sections/FaqSection'
import { FinalCtaSection } from '../sections/FinalCtaSection'
import { HeroSection } from '../sections/HeroSection'
import { MeetingSection } from '../sections/MeetingSection'
import { PriceSection } from '../sections/PriceSection'
import { RequestsSection } from '../sections/RequestsSection'

export function App() {
  return (
    <>
      <Header />
      <main id="top">
        <HeroSection />
        <RequestsSection />
        <AboutSection />
        <ApproachSection />
        <EducationSection />
        <MeetingSection />
        <PriceSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
