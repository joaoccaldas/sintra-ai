/**
 * Verified publisher feed endpoints, NOT a claim that their articles are
 * independently checked by Sintra. RSS access/rights must be monitored.
 *
 * Journalism from Brazil may report global events: coverageRegion identifies
 * the publisher, while brazilImpact is inferred conservatively from the title.
 */
export const BRAZIL_SOURCES = Object.freeze([
  {
    id: "canaltech",
    name: "Canaltech",
    feedUrl: "https://canaltech.com.br/rss/",
    publisherHost: "canaltech.com.br",
    coverageRegion: "BR",
    language: "pt-BR",
    kind: "press",
  },
  {
    id: "agencia-brasil",
    name: "Agência Brasil",
    feedUrl: "https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml",
    publisherHost: "agenciabrasil.ebc.com.br",
    coverageRegion: "BR",
    language: "pt-BR",
    kind: "public-service",
  },
]);

// Require substantive AI terms in headlines, not arbitrary stories containing
// the letters "ia" inside Portuguese words like "história".
const AI_TITLE = /(?:\bIA\b|intelig[eê]ncia artificial|chatgpt|openai|\bclaude\b|\bgemini\b|machine learning|aprendizado de m[aá]quina|deep learning|\bLLMs?\b|agentes? (?:de )?IA|modelos? de linguagem|rede neural|algoritmo generativo|\bNvidia\b.*(?:IA|intelig[eê]ncia artificial))/iu;
const BRAZIL_IMPACT = /\b(?:Brasil|brasileir[oa]s?|Brasília|governo federal|congresso nacional|senado|câmara dos deputados|STF|MEC|SUS|BNDES|Anatel|Pix|LGPD|Cetic|São Paulo|Rio de Janeiro|Bahia)\b/iu;
export const titleIsAiNews = title => typeof title === "string" && AI_TITLE.test(title);
export const titleHasBrazilImpact = title => typeof title === "string" && BRAZIL_IMPACT.test(title);
