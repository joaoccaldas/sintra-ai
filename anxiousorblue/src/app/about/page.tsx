'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase">{a.heroTag}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-white mt-4 mb-4 leading-tight">
            {a.heroTitle}
          </h1>
          <p className="text-slate-300 text-lg mb-2">{a.heroSubtitle}</p>
          <p className="text-slate-400 text-base">{a.heroDesc}</p>
        </div>
      </section>

      {/* ── BACKGROUND ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Office image */}
            <div className="relative sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://anxiousorblue.com/wp-content/uploads/2026/05/Office2.webp"
                  alt="Therapy office in Stockholm"
                  width={560}
                  height={500}
                  className="w-full h-[460px] object-cover"
                />
              </div>
              <div className="mt-6 p-6 bg-cream rounded-xl space-y-3">
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Location</p>
                <p className="text-navy font-medium">Hälsans Hus, Fjällgatan 23 B</p>
                <p className="text-slate-500 text-sm">116 28 Stockholm, Sweden</p>
                <a
                  href="tel:+4689381148"
                  className="block text-teal text-sm font-medium hover:text-teal-dark transition-colors"
                >
                  +46 8 93 81 48
                </a>
              </div>
            </div>

            {/* Text content */}
            <div className="space-y-10">
              <div>
                <span className="text-teal text-xs font-semibold tracking-widest uppercase">{a.bgTag}</span>
                <h2 className="section-heading mt-3 mb-6">{a.bgTitle}</h2>
                <div className="w-10 h-px bg-teal mb-6" />
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>{a.bgText1}</p>
                  <p>{a.bgText2}</p>
                </div>
              </div>

              {/* Teaching */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-teal text-xs font-semibold tracking-widest uppercase">{a.teachTag}</span>
                <h3 className="font-serif text-2xl font-medium text-navy mt-3 mb-4">{a.teachTitle}</h3>
                <p className="text-slate-600 leading-relaxed">{a.teachText}</p>
              </div>

              {/* Roles */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-teal text-xs font-semibold tracking-widest uppercase">{a.rolesTag}</span>
                <h3 className="font-serif text-2xl font-medium text-navy mt-3 mb-5">{a.rolesTitle}</h3>
                <ul className="space-y-3">
                  {a.roles.map((role) => (
                    <li key={role} className="flex items-start gap-3 text-slate-600 text-sm">
                      <span className="text-teal mt-1 flex-shrink-0">▸</span>
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase">{a.credTag}</span>
            <h2 className="section-heading mt-3 mb-4">{a.credTitle}</h2>
            <div className="w-10 h-px bg-teal mb-10" />
            <div className="grid gap-4">
              {a.credentials.map((cred, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 p-6 bg-white rounded-xl border border-slate-100 hover:border-teal/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-xlight text-teal flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed pt-1">{cred}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif text-4xl font-medium">{a.ctaTitle}</h2>
          <p className="text-slate-300 text-lg">{a.ctaText}</p>
          <Link href="/contact" className="btn-teal inline-flex text-base px-8 py-4 mt-4">
            {a.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
