import { useSyncExternalStore } from 'react'
import { CookieBanner } from '../components/layout/CookieBanner'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { PrivacyPage } from '../pages/PrivacyPage'
import { AboutSection } from '../sections/AboutSection'
import { ApproachSection } from '../sections/ApproachSection'
import { EducationSection } from '../sections/EducationSection'
import { FaqSection } from '../sections/FaqSection'
import { FinalCtaSection } from '../sections/FinalCtaSection'
import { HeroSection } from '../sections/HeroSection'
import { MeetingSection } from '../sections/MeetingSection'
import { PriceSection } from '../sections/PriceSection'
import { RequestsSection } from '../sections/RequestsSection'

function subscribe(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange)
  return () => window.removeEventListener('popstate', onStoreChange)
}

function getPathname() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

function LandingPage() {
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
      <CookieBanner />
    </>
  )
}

export function App() {
  const pathname = useSyncExternalStore(subscribe, getPathname, () => '/')

  if (pathname === '/privacy') {
    return (
      <>
        <Header />
        <PrivacyPage />
        <Footer />
        <CookieBanner />
      </>
    )
  }

  return <LandingPage />
}
