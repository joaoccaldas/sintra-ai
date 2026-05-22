'use client'

import { useLanguage } from '@/lib/i18n'

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">{label}</p>
      <div className="text-navy font-medium">{children}</div>
    </div>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-teal text-xs font-semibold tracking-widest uppercase">{c.heroTag}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-white mt-4 mb-4 leading-tight">
            {c.heroTitle}
          </h1>
          <p className="text-slate-300 text-xl">{c.heroSubtitle}</p>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Left: Free consultation + contact info */}
            <div className="space-y-10">
              {/* Free consultation highlight */}
              <div className="p-8 bg-teal-xlight rounded-2xl border border-teal/20">
                <div className="text-3xl mb-4">📞</div>
                <h2 className="font-serif text-2xl font-medium text-navy mb-4">{c.consultTitle}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">{c.consultText}</p>
                <a
                  href="tel:+4689381148"
                  className="btn-teal inline-flex"
                >
                  +46 8 93 81 48
                </a>
              </div>

              {/* Contact details */}
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-medium text-navy">{c.infoTitle}</h3>
                <div className="grid gap-5 divide-y divide-slate-100">
                  <InfoRow label={c.phone}>
                    <a href="tel:+4689381480" className="hover:text-teal transition-colors">
                      +46 8 93 81 48
                    </a>
                  </InfoRow>
                  <div className="pt-4">
                    <InfoRow label={c.email}>
                      <a href="mailto:info@anxiousorblue.com" className="hover:text-teal transition-colors">
                        info@anxiousorblue.com
                      </a>
                    </InfoRow>
                  </div>
                  <div className="pt-4">
                    <InfoRow label={c.hours}>
                      <span>{c.hoursValue}</span>
                    </InfoRow>
                  </div>
                  <div className="pt-4">
                    <InfoRow label={c.address}>
                      <div className="space-y-0.5">
                        {c.addressLines.map((line) => (
                          <p key={line} className="text-navy">{line}</p>
                        ))}
                      </div>
                    </InfoRow>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Directions + map placeholder */}
            <div className="space-y-8">
              {/* Directions card */}
              <div className="p-8 bg-cream rounded-2xl">
                <h3 className="font-serif text-xl font-medium text-navy mb-4">{c.directionsTitle}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{c.directionsText}</p>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  title="Anxious or Blue — Fjällgatan 23 B, Stockholm"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=18.07%2C59.318%2C18.087%2C59.325&layer=mapnik&marker=59.321%2C18.078"
                  width="100%"
                  height="320"
                  loading="lazy"
                  className="w-full"
                  style={{ border: 0 }}
                />
              </div>

              <div className="text-center text-slate-400 text-sm">
                Fjällgatan 23 B, 116 28 Stockholm
              </div>

              {/* CTA */}
              <div className="p-8 bg-navy rounded-2xl text-center space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Ready to take the first step?
                </p>
                <a
                  href="tel:+4689381480"
                  className="btn-teal inline-flex text-base px-8 py-4"
                >
                  {c.ctaButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
