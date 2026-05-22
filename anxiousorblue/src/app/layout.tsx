import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: 'Anxious or Blue — English-Speaking Therapist in Stockholm',
  description:
    'English-speaking psychotherapist in Stockholm. Individual, couples and family therapy available in-person or online. Doctoral-level clinical psychology.',
  keywords: 'therapist stockholm, english speaking therapist sweden, psychotherapy stockholm, anxiety depression therapy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  )
}
