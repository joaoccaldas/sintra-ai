'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'

export default function Home() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0A1E33] via-navy to-navy-mid overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div className="space-y-8">
              <span className="inline-block text-teal text-xs font-semibold tracking-widest uppercase">
                {h.tag}
              </span>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
                {h.heroTitle}
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                {h.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/contact" className="btn-teal text-base px-8 py-4">
                  {h.heroCta}
                </Link>
                <a href="tel:+4689381148" className="btn-outline-white text-base px-8 py-4">
                  {h.heroPhone}
                </a>
              </div>

              <p className="text-slate-500 text-sm">{h.heroSub}</p>
            </div>

            {/* Right: Office photo */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://anxiousorblue.com/wp-content/uploads/2026/05/Office2.webp"
                  alt="Therapy office in Stockholm"
                  width={600}
                  height={480}
                  className="w-full h-[480px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
              {/* Floating credential card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-5 shadow-xl">
                <p className="text-xs text-slate-500 mb-1">Doctoral Degree</p>
                <p className="text-sm font-semibold text-navy">Clinical Psychology</p>
                <p className="text-xs text-slate-400">APA-Accredited · Since 1993</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#FAFAF8" />
          </svg>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────── */}
      <section className="bg-cream-light py-12 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: h.trustYears, label: h.trustYearsLabel },
              { value: h.trustDoctoral, label: h.trustDoctoralLabel },
              { value: h.trustSession, label: h.trustSessionLabel },
              { value: h.trustEnglish, label: h.trustEnglishLabel },
            ].map(({ value, label }) => (
              <div key={value} className="text-center">
                <p className="font-serif text-xl font-medium text-navy mb-1">{value}</p>
                <p className="text-slate-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="section-heading mb-6">{h.approachTitle}</h2>
              <div className="w-12 h-px bg-teal mb-8" />
              <p className="text-slate-600 text-lg leading-relaxed">{h.approachText}</p>
            </div>
            <div className="space-y-4 pt-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Methods</p>
              <div className="flex flex-wrap gap-3">
                {h.methods.map((m) => (
                  <span
                    key={m}
                    className="px-4 py-2 bg-teal-xlight text-teal text-sm font-medium rounded-full"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-8 p-6 bg-cream rounded-xl border border-cream-dark">
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  &ldquo;Short-term relief while gently and respectfully going to the roots of your challenges.&rdquo;
                </p>
                <p className="text-slate-400 text-xs mt-3">— David Schultz, Psy.D.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">{h.featuresTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {h.features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="text-3xl text-teal mb-5 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="font-semibold text-navy mb-3 text-base">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="https://anxiousorblue.com/wp-content/uploads/2026/05/Office2.webp"
                  alt="Therapy office"
                  width={560}
                  height={420}
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-2xl bg-teal-xlight" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-cream" />
            </div>

            {/* Text side */}
            <div className="space-y-6">
              <span className="text-teal text-xs font-semibold tracking-widest uppercase">
                {h.aboutTag}
              </span>
              <h2 className="section-heading">{h.aboutTitle}</h2>
              <p className="text-teal font-medium">{h.aboutSubtitle}</p>
              <div className="w-10 h-px bg-teal" />
              <p className="text-slate-600 leading-relaxed">{h.aboutText}</p>
              <Link href="/about" className="btn-outline-teal inline-flex">
                {h.aboutCta} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ISSUES PREVIEW ───────────────────────────────────── */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="section-heading">{h.issuesTitle}</h2>
            <Link
              href="/client-issues"
              className="text-teal text-sm font-medium hover:text-teal-dark transition-colors flex-shrink-0"
            >
              {h.issuesCta} →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {h.issuesList.map((issue) => (
              <Link
                key={issue}
                href="/client-issues"
                className="group p-5 bg-white rounded-xl border border-slate-100 hover:border-teal/30 hover:shadow-md transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-teal mb-3 group-hover:scale-125 transition-transform" />
                <p className="text-navy text-sm font-medium">{issue}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#1A5C5C] to-teal text-white">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight">
            {h.ctaTitle}
          </h2>
          <p className="text-teal-xlight text-lg leading-relaxed">{h.ctaText}</p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-teal text-sm font-semibold rounded hover:bg-cream transition-colors shadow-lg"
            >
              {h.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ────────────────────────────────────── */}
      <section className="py-16 bg-navy border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-1">
              <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">{h.contactPhone}</p>
              <a href="tel:+4689381148" className="text-white text-lg hover:text-teal transition-colors">
                +46 8 93 81 48
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">{h.contactEmail}</p>
              <a href="mailto:info@anxiousorblue.com" className="text-white text-lg hover:text-teal transition-colors">
                info@anxiousorblue.com
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">{h.contactHours}</p>
              <p className="text-white text-lg">{h.contactHoursValue}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
