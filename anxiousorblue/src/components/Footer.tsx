'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n'

export default function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/client-issues', label: t.nav.clientIssues },
    { href: '/clinic-or-online', label: t.nav.clinicOrOnline },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="https://anxiousorblue.com/wp-content/uploads/2025/02/Logo_main_150.png"
              alt="Anxious or Blue"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert opacity-80"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="pt-2 space-y-1">
              <p className="text-slate-300 text-sm">
                <a href="tel:+4689381148" className="hover:text-teal transition-colors">
                  +46 8 93 81 48
                </a>
              </p>
              <p className="text-slate-300 text-sm">
                <a href="mailto:info@anxiousorblue.com" className="hover:text-teal transition-colors">
                  info@anxiousorblue.com
                </a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">
              {t.footer.nav}
            </h4>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 text-sm hover:text-teal transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">
              {t.footer.legal}
            </h4>
            <ul className="space-y-3 mb-8">
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-teal transition-colors">
                  {t.footer.cookiePolicy}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-teal transition-colors">
                  {t.footer.privacyPolicy}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-teal transition-colors">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-teal text-sm font-medium hover:text-teal-light transition-colors"
            >
              {t.nav.bookCta}
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-slate-600 text-xs text-center">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
