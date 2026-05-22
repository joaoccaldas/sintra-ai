'use client'

import React, { createContext, useContext, useState } from 'react'

export type Language = 'en' | 'sv'

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      clientIssues: 'Client Issues',
      clinicOrOnline: 'Clinic or Online',
      contact: 'Contact',
      bookCta: 'Book Free Consultation',
    },
    home: {
      tag: 'English-Speaking Psychotherapist · Stockholm',
      heroTitle: 'Feeling down, stressed or out of touch with yourself?',
      heroDesc: 'Professional therapy available in-person at our calm Stockholm office, or online from anywhere in the world. Sessions in English.',
      heroCta: 'Book Free Consultation',
      heroSub: 'Free 30-minute consultation · No commitment',
      heroPhone: '+46 8 93 81 48',

      trustYears: 'Since 1993',
      trustYearsLabel: 'Counseling individuals',
      trustDoctoral: 'Doctoral Level',
      trustDoctoralLabel: 'APA-accredited degree',
      trustSession: 'Flexible Sessions',
      trustSessionLabel: 'In-person or online',
      trustEnglish: 'English-Speaking',
      trustEnglishLabel: 'Native English speaker',

      approachTitle: 'A Trusted Space to Heal',
      approachText: 'Whether you\'re navigating anxiety, depression, relationship challenges, or simply feeling disconnected — therapy can help. David blends traditional psychotherapy with contemporary evidence-based methods to provide lasting change, not just short-term relief.',
      methods: ['Psychodynamic', 'CBT', 'IFS', 'EMDR', 'Lifespan Integration', 'Existential'],

      featuresTitle: 'Why Choose Anxious or Blue?',
      features: [
        {
          title: '30+ Years Experience',
          desc: 'Counseling individuals, couples and families since 1993. Deep expertise across a wide range of psychological challenges.',
          icon: '◎',
        },
        {
          title: 'Evidence-Based Methods',
          desc: 'CBT, IFS, EMDR, Lifespan Integration and more — always grounded in what the research shows works.',
          icon: '◈',
        },
        {
          title: 'Flexible Sessions',
          desc: 'Meet in-person at our peaceful Stockholm clinic, or connect online from anywhere in the world.',
          icon: '◇',
        },
        {
          title: 'English-Speaking',
          desc: 'Native English speaker — ideal for expats, internationals, and cross-cultural families in Sweden.',
          icon: '◉',
        },
      ],

      aboutTag: 'About the Therapist',
      aboutTitle: 'Meet David Schultz',
      aboutSubtitle: 'Doctoral-Level Clinical Psychologist',
      aboutText: 'David holds a Doctoral degree in Clinical Psychology from the California School of Professional Psychology (APA-accredited). Based in Stockholm since 2003, he has introduced several contemporary US therapeutic models to Sweden — including Internal Family Systems and Lifespan Integration — and teaches advanced techniques to licensed professionals.',
      aboutCta: 'Learn More About David',

      issuesTitle: 'Issues I Work With',
      issuesList: [
        'Anxiety & Panic',
        'Depression',
        'Relationship & Family',
        'Trauma & PTSD',
        'Life Transitions',
        'Work & School Stress',
        'Grief & Bereavement',
        'OCD',
      ],
      issuesCta: 'See All Client Issues',

      ctaTitle: 'Ready to Take the First Step?',
      ctaText: 'Schedule a free 30-minute phone consultation to explore whether we\'re a good fit. No commitment, no pressure — just an honest conversation.',
      ctaButton: 'Schedule Right Fit Consultation',

      contactPhone: 'Call',
      contactEmail: 'Email',
      contactHours: 'Hours',
      contactHoursValue: 'Monday–Friday, 9 AM–5 PM',
    },
    about: {
      heroTag: 'About',
      heroTitle: 'David Schultz',
      heroSubtitle: 'Doctoral-Level Clinical Psychologist · Stockholm, Sweden',
      heroDesc: 'Counseling individuals, couples and families since 1993.',

      bgTag: 'Background',
      bgTitle: 'Training & Expertise',
      bgText1: 'David completed doctoral training in clinical psychology in California, with in-depth study across psychodynamic, cognitive behavioral, existential, and family systems modalities. He has been based in Stockholm since 2003.',
      bgText2: 'He introduced several contemporary US therapeutic models to Sweden — including Emotional Transformation Therapy, Internal Family Systems (IFS), and Lifespan Integration — and teaches these advanced techniques to licensed professionals throughout Stockholm.',

      credTag: 'Credentials',
      credTitle: 'Education & Certifications',
      credentials: [
        'Doctoral degree in Clinical Psychology — California School of Professional Psychology (APA & CAPIC accredited)',
        'Master\'s degree in Clinical Psychology — California School of Professional Psychology',
        'Bachelor\'s in Psychology, Cum Laude — California State University, Long Beach',
        'Bachelor\'s in Business and Public Administration',
        'EMDR Certified',
        'Head of IFS-Sweden',
      ],

      teachTag: 'Teaching',
      teachTitle: 'Training the Next Generation',
      teachText: 'David offers workshops at the Stockholm Academy for Psychotherapy Training and the Delphi Institute, training licensed mental health professionals in the most current therapeutic techniques.',

      rolesTag: 'Roles',
      rolesTitle: 'Professional Positions',
      roles: [
        'Owner — Anxious or Blue Therapy Clinic',
        'CEO — MindSolutions–Internal 360™',
        'Head — IFS-Sweden',
        'Former positions at UC Medical Center, family services, and suicide prevention programs',
      ],

      ctaTitle: 'Ready to Begin?',
      ctaText: 'A free 30-minute consultation is available to see if this is the right fit for you.',
      ctaButton: 'Book Free Consultation',
    },
    clientIssues: {
      heroTag: 'Client Issues',
      heroTitle: 'Issues I Work With',
      heroSubtitle: 'Whatever you\'re facing, you don\'t have to face it alone.',

      intro: 'David works with a wide range of psychological, emotional and relational challenges. Below are the primary areas of specialization — though this list is not exhaustive.',

      issues: [
        { title: 'Anxiety & Panic', desc: 'Generalized anxiety, panic disorder, constant worry, and physical symptoms of stress.' },
        { title: 'Depression', desc: 'Low mood, lack of motivation, emptiness, and persistent sadness.' },
        { title: 'Relationship & Family', desc: 'Couples conflict, communication breakdown, family dynamics, and divorce.' },
        { title: 'Life Transitions & Crisis', desc: 'Grief, job loss, midlife challenges, relocation, and major life changes.' },
        { title: 'Work & School Stress', desc: 'Burnout, performance anxiety, workplace conflict, and academic pressure.' },
        { title: 'Phobias & Social Anxiety', desc: 'Fear of specific situations, social performance anxiety, and avoidance behaviors.' },
        { title: 'Eating Disorders', desc: 'Disordered eating patterns, body image issues, and relationship with food.' },
        { title: 'OCD', desc: 'Obsessive thoughts, compulsive behaviors, and intrusive mental patterns.' },
        { title: 'Trauma & PTSD', desc: 'Past and current trauma, PTSD, and EMDR-based trauma processing.' },
        { title: 'Behavioral Patterns', desc: 'Addictive behaviors, self-sabotage, and repetitive negative cycles.' },
        { title: 'Chronic Illness', desc: 'Psychological adjustment to long-term or life-limiting health conditions.' },
        { title: 'Grief & Bereavement', desc: 'Loss of loved ones, mourning, and complicated grief.' },
        { title: 'ADD / ADHD', desc: 'Attention challenges, focus, organization, and emotional regulation.' },
        { title: 'Adverse Childhood Experiences', desc: 'Attachment wounds, early trauma, and the lasting effects of childhood adversity.' },
      ],

      enhanceTitle: 'Life Enhancement',
      enhanceText: 'Beyond therapy for distress, David also works with artists, athletes, executives and professionals seeking self-actualization and peak performance techniques.',

      diversityTitle: 'Serving Diverse Communities',
      diversityText: 'David works with culturally diverse populations, cross-cultural couples, families, and English-speaking expatriates throughout Sweden.',

      ctaTitle: 'Not Sure If Your Issue Is Listed?',
      ctaText: 'Reach out for a free consultation. If I\'m not the right fit, I\'ll point you in the right direction.',
      ctaButton: 'Book Free Consultation',
    },
    clinicOrOnline: {
      heroTag: 'Format',
      heroTitle: 'Clinic or Online?',
      heroSubtitle: 'Therapy that fits your life — wherever you are.',

      inPersonTitle: 'In-Person Sessions',
      inPersonDesc: 'Meet at our calm, private office in the heart of Stockholm, with a peaceful view over the water near Fotografiska museum.',
      inPersonFeatures: [
        'Private, peaceful office environment',
        'Fjällgatan 23 B, Hälsans Hus, Stockholm',
        'Accessible by public transport',
        'Scenic waterfront view — Fotografiska nearby',
      ],

      onlineTitle: 'Online Sessions',
      onlineDesc: 'Experience the convenience of therapy from your own home, office, or while travelling — anywhere in the world.',
      onlineFeatures: [
        'Sessions via Zoom or phone',
        'Available worldwide',
        'Same quality care as in-person',
        'International payments via PayPal',
      ],

      sessionTag: 'Session Info',
      sessionTitle: 'Session Length',
      sessionText: 'Most clients prefer 75-minute sessions. Session length is flexible and can be customized to suit your schedule and goals.',

      consultTag: 'Getting Started',
      consultTitle: 'Free Consultation First',
      consultText: 'A complimentary 30-minute phone or Zoom consultation is available to discuss your situation and explore whether this therapeutic approach is right for you. No obligation.',

      paymentTag: 'Payment',
      paymentTitle: 'Payment Options',
      paymentText: 'Credit card payments via PayPal are accepted for clients outside Sweden, processed before each session.',

      ctaTitle: 'Ready to Begin?',
      ctaButton: 'Schedule Right Fit Consultation',
    },
    contact: {
      heroTag: 'Contact',
      heroTitle: 'Get in Touch',
      heroSubtitle: 'A free 30-minute consultation is the first step.',

      consultTitle: 'Free 30-Minute Consultation',
      consultText: 'Before committing to regular sessions, schedule a free phone call to ask questions and see if this approach is right for you. No pressure, no obligation.',

      infoTitle: 'Contact Information',
      phone: 'Phone',
      email: 'Email',
      hours: 'Hours',
      hoursValue: 'Monday – Friday, 9 AM – 5 PM',
      address: 'Address',
      addressLines: ['Hälsans Hus (House of Health)', 'Fjällgatan 23 B', '116 28 Stockholm, Sweden'],

      directionsTitle: 'Finding the Office',
      directionsText: 'Enter Hälsans Hus and proceed upstairs past the main floor. Pass through the glass door, turn right down the hallway, open the wooden door, and wait in the hallway. The office overlooks the water, with Fotografiska museum visible from the window.',

      ctaButton: 'Schedule Right Fit Consultation',
    },
    footer: {
      tagline: 'English-speaking psychotherapy in Stockholm.',
      nav: 'Navigation',
      legal: 'Legal',
      cookiePolicy: 'Cookie Policy',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms and Conditions',
      copyright: '© 2026 Anxious or Blue Therapy Clinic. All rights reserved.',
    },
    cookie: {
      text: 'This site uses cookies to improve your experience.',
      accept: 'Accept',
      decline: 'Decline',
    },
  },
  sv: {
    nav: {
      home: 'Hem',
      about: 'Om mig',
      clientIssues: 'Klientfrågor',
      clinicOrOnline: 'Klinik eller Online',
      contact: 'Kontakt',
      bookCta: 'Boka kostnadsfri konsultation',
    },
    home: {
      tag: 'Engelskspråkig psykoterapeut · Stockholm',
      heroTitle: 'Känner du dig nere, stressad eller frånkopplad från dig själv?',
      heroDesc: 'Professionell terapi tillgänglig personligen på vår lugna klinik i Stockholm, eller online var som helst i världen. Sessioner på engelska.',
      heroCta: 'Boka kostnadsfri konsultation',
      heroSub: 'Kostnadsfritt 30-minuters samtal · Inga åtaganden',
      heroPhone: '+46 8 93 81 48',

      trustYears: 'Sedan 1993',
      trustYearsLabel: 'Rådgivning till individer',
      trustDoctoral: 'Doktorsnivå',
      trustDoctoralLabel: 'APA-ackrediterad examen',
      trustSession: 'Flexibla sessioner',
      trustSessionLabel: 'Personligen eller online',
      trustEnglish: 'Engelskspråkig',
      trustEnglishLabel: 'Modersmålstalare',

      approachTitle: 'En trygg plats att läka',
      approachText: 'Oavsett om du hanterar ångest, depression, relationsproblem eller bara känner dig frånkopplad — terapi kan hjälpa. David kombinerar traditionell psykoterapi med moderna evidensbaserade metoder för att ge varaktiga förändringar, inte bara kortsiktig lindring.',
      methods: ['Psykodynamisk', 'KBT', 'IFS', 'EMDR', 'Lifespan Integration', 'Existentiell'],

      featuresTitle: 'Varför välja Anxious or Blue?',
      features: [
        {
          title: '30+ års erfarenhet',
          desc: 'Rådgivning till individer, par och familjer sedan 1993. Djup expertis inom ett brett spektrum av psykologiska utmaningar.',
          icon: '◎',
        },
        {
          title: 'Evidensbaserade metoder',
          desc: 'KBT, IFS, EMDR, Lifespan Integration och mer — alltid grundat i vad forskningen visar fungerar.',
          icon: '◈',
        },
        {
          title: 'Flexibla sessioner',
          desc: 'Möts personligen på vår lugna klinik i Stockholm, eller anslut online var som helst i världen.',
          icon: '◇',
        },
        {
          title: 'Engelskspråkig',
          desc: 'Modersmålstalare — idealisk för expats, internationella klienter och tvärkulturella familjer i Sverige.',
          icon: '◉',
        },
      ],

      aboutTag: 'Om terapeuten',
      aboutTitle: 'Möt David Schultz',
      aboutSubtitle: 'Legitimerad klinisk psykolog på doktorsnivå',
      aboutText: 'David har en doktorsexamen i klinisk psykologi från California School of Professional Psychology (APA-ackrediterad). Bosatt i Stockholm sedan 2003 har han introducerat flera moderna amerikanska terapimodeller i Sverige — inklusive Internal Family Systems och Lifespan Integration — och undervisar avancerade tekniker till legitimerade yrkesverksamma.',
      aboutCta: 'Läs mer om David',

      issuesTitle: 'Frågor jag arbetar med',
      issuesList: [
        'Ångest & Panik',
        'Depression',
        'Relationer & Familj',
        'Trauma & PTSD',
        'Livsövergångar',
        'Arbets- & Skolstress',
        'Sorg & Förlust',
        'OCD',
      ],
      issuesCta: 'Se alla klientfrågor',

      ctaTitle: 'Redo att ta det första steget?',
      ctaText: 'Boka ett kostnadsfritt 30-minuters telefonsamtal för att utforska om vi passar varandra. Inga åtaganden, inget tryck — bara en ärlig konversation.',
      ctaButton: 'Boka rätt-passande konsultation',

      contactPhone: 'Ring',
      contactEmail: 'E-post',
      contactHours: 'Öppettider',
      contactHoursValue: 'Måndag–fredag, 9:00–17:00',
    },
    about: {
      heroTag: 'Om mig',
      heroTitle: 'David Schultz',
      heroSubtitle: 'Legitimerad klinisk psykolog på doktorsnivå · Stockholm',
      heroDesc: 'Rådgivning till individer, par och familjer sedan 1993.',

      bgTag: 'Bakgrund',
      bgTitle: 'Utbildning & Expertis',
      bgText1: 'David genomförde sin doktorsutbildning i klinisk psykologi i Kalifornien med fördjupning inom psykodynamiska, kognitiva beteende-, existentiella och familjesystems-modaliteter. Han har bott i Stockholm sedan 2003.',
      bgText2: 'Han introducerade flera moderna amerikanska terapimodeller i Sverige — inklusive Emotional Transformation Therapy, Internal Family Systems (IFS) och Lifespan Integration — och undervisar dessa avancerade tekniker till legitimerade yrkesverksamma i Stockholm.',

      credTag: 'Meriter',
      credTitle: 'Utbildning & Certifieringar',
      credentials: [
        'Doktorsexamen i klinisk psykologi — California School of Professional Psychology (APA & CAPIC ackrediterad)',
        'Masterexamen i klinisk psykologi — California School of Professional Psychology',
        'Kandidatexamen i psykologi, Cum Laude — California State University, Long Beach',
        'Kandidatexamen i ekonomi och offentlig förvaltning',
        'EMDR-certifierad',
        'Chef för IFS-Sverige',
      ],

      teachTag: 'Undervisning',
      teachTitle: 'Utbildning av nästa generation',
      teachText: 'David erbjuder workshops på Stockholms akademi för psykoterapiutbildning och Delphi-institutet, där han utbildar legitimerade psykiatrispecialister i de senaste terapeutiska teknikerna.',

      rolesTag: 'Roller',
      rolesTitle: 'Yrkespositioner',
      roles: [
        'Ägare — Anxious or Blue Therapy Clinic',
        'VD — MindSolutions–Internal 360™',
        'Chef — IFS-Sverige',
        'Tidigare positioner vid UC Medical Center, familjeservice och självmordsförebyggande program',
      ],

      ctaTitle: 'Redo att börja?',
      ctaText: 'En kostnadsfri 30-minuterskonsultation finns tillgänglig för att se om detta är rätt för dig.',
      ctaButton: 'Boka kostnadsfri konsultation',
    },
    clientIssues: {
      heroTag: 'Klientfrågor',
      heroTitle: 'Frågor jag arbetar med',
      heroSubtitle: 'Oavsett vad du möter behöver du inte möta det ensam.',

      intro: 'David arbetar med ett brett spektrum av psykologiska, emotionella och relationella utmaningar. Nedan är de primära specialiseringsområdena — men listan är inte uttömmande.',

      issues: [
        { title: 'Ångest & Panik', desc: 'Generaliserad ångest, panikstörning, konstant oro och fysiska stressymptom.' },
        { title: 'Depression', desc: 'Lågt humör, brist på motivation, tomhet och ihållande sorg.' },
        { title: 'Relationer & Familj', desc: 'Parkonflikt, kommunikationsbrott, familjedynamik och skilsmässa.' },
        { title: 'Livsövergångar & Kriser', desc: 'Sorg, jobbförlust, medelåldersutmaningar, flytt och stora livsförändringar.' },
        { title: 'Arbets- & Skolstress', desc: 'Utbrändhet, prestationsångest, arbetsplatskonflikter och akademisk press.' },
        { title: 'Fobier & Social Ångest', desc: 'Rädsla för specifika situationer, social prestationsångest och undvikande beteenden.' },
        { title: 'Ätstörningar', desc: 'Störda ätmönster, kroppsbild och relation till mat.' },
        { title: 'OCD', desc: 'Obsessiva tankar, tvångsbeteenden och påträngande mentala mönster.' },
        { title: 'Trauma & PTSD', desc: 'Nuvarande och tidigare trauma, PTSD och EMDR-baserad traumabehandling.' },
        { title: 'Beteendemönster', desc: 'Beroendeframkallande beteenden, självdestruktivitet och repetitiva negativa cykler.' },
        { title: 'Kronisk Sjukdom', desc: 'Psykologisk anpassning till långvariga eller livsavgörande hälsotillstånd.' },
        { title: 'Sorg & Förlust', desc: 'Förlust av nära och kära, sörjande och komplicerad sorg.' },
        { title: 'ADD / ADHD', desc: 'Uppmärksamhetsutmaningar, fokus, organisation och emotionell reglering.' },
        { title: 'Negativa Barndomsupplevelser', desc: 'Anknytningssår, tidigt trauma och de långvariga effekterna av barndomens motgångar.' },
      ],

      enhanceTitle: 'Livsutveckling',
      enhanceText: 'Utöver terapi för psykisk ohälsa arbetar David också med konstnärer, idrottare, chefer och yrkesverksamma som söker självförverkligande och toppresultattekniker.',

      diversityTitle: 'Vi betjänar mångfaldiga gemenskaper',
      diversityText: 'David arbetar med kulturellt mångfaldiga grupper, tvärkulturella par, familjer och engelskspråkiga expats i hela Sverige.',

      ctaTitle: 'Är ditt problem inte med på listan?',
      ctaText: 'Hör av dig för en kostnadsfri konsultation. Om jag inte passar dig hjälper jag dig att hitta rätt.',
      ctaButton: 'Boka kostnadsfri konsultation',
    },
    clinicOrOnline: {
      heroTag: 'Format',
      heroTitle: 'Klinik eller Online?',
      heroSubtitle: 'Terapi som passar ditt liv — var du än är.',

      inPersonTitle: 'Personliga Sessioner',
      inPersonDesc: 'Möts på vårt lugna, privata kontor i hjärtat av Stockholm, med utsikt över vattnet nära Fotografiska museet.',
      inPersonFeatures: [
        'Privat, lugn kontorsmiljö',
        'Fjällgatan 23 B, Hälsans Hus, Stockholm',
        'Lättåtkomligt med kollektivtrafik',
        'Utsikt över vattnet — Fotografiska museet i närheten',
      ],

      onlineTitle: 'Online-Sessioner',
      onlineDesc: 'Upplev bekvämligheten av terapi från ditt eget hem, kontor eller under resande — var som helst i världen.',
      onlineFeatures: [
        'Sessioner via Zoom eller telefon',
        'Tillgängligt världen över',
        'Samma kvalitet som personliga sessioner',
        'Internationella betalningar via PayPal',
      ],

      sessionTag: 'Sessionsinformation',
      sessionTitle: 'Sessionslängd',
      sessionText: 'De flesta klienter föredrar 75-minuters sessioner. Sessionslängden är flexibel och kan anpassas efter ditt schema och dina mål.',

      consultTag: 'Komma igång',
      consultTitle: 'Kostnadsfri konsultation först',
      consultText: 'En kostnadsfri 30-minuters telefon- eller Zoom-konsultation finns tillgänglig för att diskutera din situation och utforska om detta terapeutiska tillvägagångssätt passar dig. Utan förpliktelser.',

      paymentTag: 'Betalning',
      paymentTitle: 'Betalningsalternativ',
      paymentText: 'Kreditkortsbetalningar via PayPal accepteras för klienter utanför Sverige, behandlade före varje session.',

      ctaTitle: 'Redo att börja?',
      ctaButton: 'Boka rätt-passande konsultation',
    },
    contact: {
      heroTag: 'Kontakt',
      heroTitle: 'Kom i Kontakt',
      heroSubtitle: 'En kostnadsfri 30-minuterskonsultation är första steget.',

      consultTitle: 'Kostnadsfri 30-minuterskonsultation',
      consultText: 'Innan du förbinder dig till regelbundna sessioner är du välkommen att boka ett kostnadsfritt telefonsamtal för att ställa frågor och se om detta passar dig. Inget tryck, inga förpliktelser.',

      infoTitle: 'Kontaktinformation',
      phone: 'Telefon',
      email: 'E-post',
      hours: 'Öppettider',
      hoursValue: 'Måndag – fredag, 9:00 – 17:00',
      address: 'Adress',
      addressLines: ['Hälsans Hus (Hälsans Hus)', 'Fjällgatan 23 B', '116 28 Stockholm, Sverige'],

      directionsTitle: 'Hitta kontoret',
      directionsText: 'Gå in i Hälsans Hus och fortsätt uppför trappan förbi bottenvåningen. Gå genom glasdörren, sväng höger längs korridoren, öppna träddörren och vänta i hallen. Kontoret har utsikt över vattnet med Fotografiska museet synligt från fönstret.',

      ctaButton: 'Boka rätt-passande konsultation',
    },
    footer: {
      tagline: 'Engelskspråkig psykoterapi i Stockholm.',
      nav: 'Navigation',
      legal: 'Juridiskt',
      cookiePolicy: 'Cookiepolicy',
      privacyPolicy: 'Integritetspolicy',
      terms: 'Användarvillkor',
      copyright: '© 2026 Anxious or Blue Therapy Clinic. Alla rättigheter förbehållna.',
    },
    cookie: {
      text: 'Den här webbplatsen använder cookies för att förbättra din upplevelse.',
      accept: 'Acceptera',
      decline: 'Neka',
    },
  },
} as const

type Translations = typeof translations.en

interface LanguageContextValue {
  lang: Language
  setLang: (l: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const t = translations[lang] as unknown as Translations

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
