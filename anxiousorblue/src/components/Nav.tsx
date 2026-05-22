'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'

export default function Nav() {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/client-issues', label: t.nav.clientIssues },
    { href: '/clinic-or-online', label: t.nav.clinicOrOnline },
    { href: '/contact', label: t.nav.contact },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const navBg = scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
  const textColor = scrolled ? 'text-slate-700' : 'text-white/90'
  const activeColor = scrolled ? 'text-teal' : 'text-white'
  const hoverColor = scrolled ? 'hover:text-teal' : 'hover:text-white'

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://anxiousorblue.com/wp-content/uploads/2025/02/Logo_main_150.png"
              alt="Anxious or Blue"
              width={130}
              height={44}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${textColor} ${hoverColor} ${
                  isActive(href) ? `${activeColor} font-medium` : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'sv' : 'en')}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                scrolled ? 'text-slate-400 hover:text-slate-700' : 'text-white/50 hover:text-white'
              }`}
              aria-label="Switch language"
            >
              {lang === 'en' ? 'SV' : 'EN'}
            </button>
            <Link
              href="/contact"
              className="btn-teal text-sm px-5 py-2.5"
            >
              {t.nav.bookCta}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'sv' : 'en')}
              className={`text-xs font-semibold tracking-widest uppercase ${
                scrolled ? 'text-slate-400' : 'text-white/60'
              }`}
            >
              {lang === 'en' ? 'SV' : 'EN'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="p-1 flex flex-col gap-1.5"
            >
              <span
                className={`block w-5 h-0.5 transition-all duration-200 ${
                  scrolled ? 'bg-slate-700' : 'bg-white'
                } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all duration-200 ${
                  scrolled ? 'bg-slate-700' : 'bg-white'
                } ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all duration-200 ${
                  scrolled ? 'bg-slate-700' : 'bg-white'
                } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-x-0 top-16 z-40 bg-white shadow-xl border-t border-slate-100 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col divide-y divide-slate-50">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-6 py-4 text-sm transition-colors hover:bg-slate-50 ${
                isActive(href) ? 'text-teal font-medium' : 'text-slate-700'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="px-6 py-5">
            <Link
              href="/contact"
              className="btn-teal w-full text-sm"
            >
              {t.nav.bookCta}
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
