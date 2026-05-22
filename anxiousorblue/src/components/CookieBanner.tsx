'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted')
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookies-accepted', 'false')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
      <div className="max-w-lg mx-auto bg-navy text-white rounded-xl shadow-2xl p-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-300 leading-relaxed">{t.cookie.text}</p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            {t.cookie.decline}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 bg-teal text-white text-xs font-medium rounded hover:bg-teal-dark transition-colors"
          >
            {t.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
