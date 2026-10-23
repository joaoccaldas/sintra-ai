"use client";

import { ArrowRight, ArrowUpRight, BookOpen, Compass, Newspaper, ShieldCheck, Workflow } from "lucide-react";
import { BASE_PATH } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { HOME_EXPERIENCE_COPY } from "@/lib/homeExperienceCopy";
import s from "./BrazilFirstHero.module.css";
import ShareSintraButton from "./ShareSintraButton";

/**
 * A content-first, mobile-first homepage. No WebGL, third-party images,
 * invented community counters or claims of automatic source verification.
 * All destinations already exist on main.
 *
 * The locale switch is currently client-side. This component does NOT claim
 * to be a fully indexable pt-BR route; that remains tracked in issue #17.
 */
export default function BrazilFirstHero() {
  const { locale } = useLanguage();
  const c = HOME_EXPERIENCE_COPY[locale];

  const journeys = [
    { href: `${BASE_PATH}/learn/`, label: c.beginnerTitle, description: c.beginnerDescription, icon: BookOpen, number: "01" },
    { href: `${BASE_PATH}/library/`, label: c.workTitle, description: c.workDescription, icon: Compass, number: "02" },
    { href: `${BASE_PATH}/automate/`, label: c.builderTitle, description: c.builderDescription, icon: Workflow, number: "03" },
  ];

  return (
    <section className={s.hero} aria-labelledby="home-heading">
      <div className={s.shell}>
        <div className={s.mainGrid}>
          <div className={s.intro}>
            <p className={s.eyebrow}><span className={s.eyebrowMark} aria-hidden="true" />{c.eyebrow}</p>
            <h1 id="home-heading" className={s.heading}>
              {c.headline} <em>{c.headlineAccent}</em>
            </h1>
            <p className={s.lead}>{c.intro}</p>
            <div className={s.heroActions}>
              <a href="#pratique" className={s.primaryCta}>
                {locale === "pt" ? "Experimentar agora" : "Try a practical example"}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <ShareSintraButton />
            </div>
            <div className={s.directionHeader}>
              <span>{c.direction}</span>
              <span className={s.directionNote}>{c.directionNote}</span>
            </div>
            <div className={s.journeys}>
              {journeys.map(({ href, label, description, icon: Icon, number }) => (
                <a key={number} href={href} className={s.journey}>
                  <span className={s.journeyNumber}>{number}</span>
                  <span className={s.journeyIcon}><Icon size={20} strokeWidth={1.6} aria-hidden="true" /></span>
                  <span className={s.journeyCopy}>
                    <span className={s.journeyTitle}>{label}</span>
                    <span className={s.journeyDescription}>{description}</span>
                  </span>
                  <ArrowUpRight className={s.arrow} size={20} strokeWidth={1.8} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className={s.art} aria-hidden="true">
            {/* Open asymmetrical current, not a closed infinity loop.
                Gradient is optional decoration; the nav mark is monochrome. */}
            <svg className={s.current} viewBox="0 0 620 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sintra-open-current" x1="20" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#F6C88E" />
                  <stop offset=".34" stopColor="#E9A5C8" />
                  <stop offset=".7" stopColor="#6D56E9" />
                  <stop offset="1" stopColor="#0789B0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3, 4].map((index) => (
                <path key={index}
                  d={`M 23 ${146 + index * 11} C 118 ${155 + index * 11}, 139 ${47 + index * 10}, 234 ${57 + index * 11} C 324 ${67 + index * 10}, 339 ${200 + index * 9}, 440 ${184 + index * 10} C 509 ${174 + index * 10}, 555 ${108 + index * 10}, 599 ${111 + index * 10}`}
                  stroke="url(#sintra-open-current)" strokeWidth={index === 0 ? 5 : 1.6}
                  strokeOpacity={index === 0 ? 1 : .28} strokeLinecap="round"/>
              ))}
            </svg>
            <div className={s.artFooter}>
              <span>{c.detail}</span>
              <strong>{c.visualTitle}<br/><em>{c.visualAccent}</em></strong>
              <span>{c.visualCaption}</span>
            </div>
          </div>
        </div>

        <div className={s.resources}>
          <a className={s.resource} href={`${BASE_PATH}/news/`}>
            <span className={s.resourceTop}><Newspaper size={16} strokeWidth={1.7} aria-hidden="true" />{c.newsEyebrow}</span>
            <strong>{c.newsTitle}</strong>
            <span className={s.resourceDescription}>{c.newsDescription}</span>
            <span className={s.resourceAction}>{c.newsAction}<ArrowRight size={16} aria-hidden="true" /></span>
          </a>
          <a className={s.resource} href={`${BASE_PATH}/learn/`}>
            <span className={s.resourceTop}><BookOpen size={16} strokeWidth={1.7} aria-hidden="true" />{c.lessonEyebrow}</span>
            <strong>{c.lessonTitle}</strong>
            <span className={s.resourceDescription}>{c.lessonDescription}</span>
            <span className={s.resourceAction}>{c.lessonAction}<ArrowRight size={16} aria-hidden="true" /></span>
          </a>
        </div>

        <p className={s.trust}><ShieldCheck size={16} strokeWidth={1.7} aria-hidden="true" />{c.trust}</p>
      </div>
    </section>
  );
}
