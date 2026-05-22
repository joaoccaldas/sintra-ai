'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-slate-600 text-sm">
      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  )
}

export default function ClinicOrOnline() {
  const { t } = useLanguage()
  const co = t.clinicOrOnline

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase">{co.heroTag}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-white mt-4 mb-4 leading-tight">
            {co.heroTitle}
          </h1>
          <p className="text-slate-300 text-xl">{co.heroSubtitle}</p>
        </div>
      </section>

      {/* ── IN-PERSON vs ONLINE ──────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* In-Person */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="relative h-56">
                <Image
                  src="https://anxiousorblue.com/wp-content/uploads/2026/05/Office2.webp"
                  alt="Stockholm therapy clinic"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-navy/40" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <span className="text-teal text-xs font-semibold tracking-widest uppercase">Stockholm</span>
                    <h2 className="font-serif text-2xl font-medium text-white mt-1">{co.inPersonTitle}</h2>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-slate-600 leading-relaxed">{co.inPersonDesc}</p>
                <ul className="space-y-3">
                  {co.inPersonFeatures.map((f) => (
                    <CheckItem key={f} text={f} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Online */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="relative h-56 bg-gradient-to-br from-teal-dark to-teal flex items-end">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg viewBox="0 0 100 100" className="w-32 h-32 text-white" fill="currentColor">
                    <circle cx="50" cy="50" r="40" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="50" cy="50" r="10" />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <span className="text-teal-xlight text-xs font-semibold tracking-widest uppercase">Worldwide</span>
                    <h2 className="font-serif text-2xl font-medium text-white mt-1">{co.onlineTitle}</h2>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-slate-600 leading-relaxed">{co.onlineDesc}</p>
                <ul className="space-y-3">
                  {co.onlineFeatures.map((f) => (
                    <CheckItem key={f} text={f} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFO CARDS ───────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Session Length */}
            <div className="bg-white rounded-2xl p-8 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-xlight text-teal flex items-center justify-center text-lg">⏱</div>
              <span className="text-teal text-xs font-semibold tracking-widest uppercase block">{co.sessionTag}</span>
              <h3 className="font-serif text-xl font-medium text-navy">{co.sessionTitle}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{co.sessionText}</p>
            </div>

            {/* Free Consultation */}
            <div className="bg-white rounded-2xl p-8 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-xlight text-teal flex items-center justify-center text-lg">📞</div>
              <span className="text-teal text-xs font-semibold tracking-widest uppercase block">{co.consultTag}</span>
              <h3 className="font-serif text-xl font-medium text-navy">{co.consultTitle}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{co.consultText}</p>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-8 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-xlight text-teal flex items-center justify-center text-lg">💳</div>
              <span className="text-teal text-xs font-semibold tracking-widest uppercase block">{co.paymentTag}</span>
              <h3 className="font-serif text-xl font-medium text-navy">{co.paymentTitle}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{co.paymentText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif text-4xl font-medium">{co.ctaTitle}</h2>
          <Link href="/contact" className="btn-teal inline-flex text-base px-8 py-4 mt-4">
            {co.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
