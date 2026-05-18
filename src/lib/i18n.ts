export type Locale = "en" | "pt";

export interface Translations {
  nav_explore:       string;
  nav_google_tools:  string;
  nav_concepts:      string;
  nav_enter_library: string;
  use_cases_count:   (n: number) => string;

  hero_eyebrow:    (n: number) => string;
  hero_tagline:    string;
  hero_cta:        string;
  hero_scroll:     string;

  carousel_back:        string;
  carousel_use_cases:   (n: number) => string;
  carousel_explore_cta: string;

  panel_no_cases: string;

  expanded_difficulty:  string;
  expanded_est_time:    string;
  expanded_tools:       string;
  expanded_output_kind: string;
  expanded_prompt:      string;
  expanded_outcome:     string;
  expanded_sample:      string;
  expanded_copy:        string;
  expanded_copied:      string;
  expanded_close:       string;
  expanded_inputs:      string;

  concepts_title:      string;
  concepts_subtitle:   string;
  concepts_all:        string;
  concepts_added:      string;
  concepts_difficulty: [string, string, string];
  concepts_analogy:    string;
  concepts_related:    string;
  concepts_learn_more: string;
  concepts_navigate:   string;

  footer_built:  string;
  footer_love:   string;
  footer_and:    string;
  footer_claude: string;
}

const translations: Record<Locale, Translations> = {
  en: {
    nav_explore:       "Explore",
    nav_google_tools:  "Google AI Tools",
    nav_concepts:      "Concepts",
    nav_enter_library: "Enter library →",
    use_cases_count:   (n) => `${n} use cases`,

    hero_eyebrow:    (n) => `${n} curated use cases`,
    hero_tagline:    "Pick a discipline. Explore its use cases.\nCopy a prompt. Ship the work.",
    hero_cta:        "Explore disciplines →",
    hero_scroll:     "Scroll",

    carousel_back:        "Universe",
    carousel_use_cases:   (n) => `${n} use cases`,
    carousel_explore_cta: "Explore use cases →",

    panel_no_cases: "No use cases yet in this domain.",

    expanded_difficulty:  "Difficulty",
    expanded_est_time:    "Est. time",
    expanded_tools:       "Tools",
    expanded_output_kind: "Output",
    expanded_prompt:      "The prompt",
    expanded_outcome:     "Outcome",
    expanded_sample:      "Expected output",
    expanded_copy:        "Copy prompt",
    expanded_copied:      "Copied!",
    expanded_close:       "Close",
    expanded_inputs:      "What you'll need",

    concepts_title:      "AI Concepts",
    concepts_subtitle:   "Foundational ideas explained clearly — from LLMs to MCP and beyond.",
    concepts_all:        "All",
    concepts_added:      "Added",
    concepts_difficulty: ["Beginner", "Intermediate", "Advanced"],
    concepts_analogy:    "Analogy",
    concepts_related:    "Related concepts",
    concepts_learn_more: "Learn more →",
    concepts_navigate:   "Navigate to concept",

    footer_built:  "Built with",
    footer_love:   "love",
    footer_and:    "and",
    footer_claude: "Claude",
  },
  pt: {
    nav_explore:       "Explorar",
    nav_google_tools:  "Google AI Tools",
    nav_concepts:      "Conceitos",
    nav_enter_library: "Entrar na biblioteca →",
    use_cases_count:   (n) => `${n} casos de uso`,

    hero_eyebrow:    (n) => `${n} casos de uso selecionados`,
    hero_tagline:    "Escolha uma disciplina. Explore os casos de uso.\nCopie um prompt. Entregue o trabalho.",
    hero_cta:        "Explorar disciplinas →",
    hero_scroll:     "Rolar",

    carousel_back:        "Universo",
    carousel_use_cases:   (n) => `${n} casos de uso`,
    carousel_explore_cta: "Explorar casos de uso →",

    panel_no_cases: "Nenhum caso de uso neste domínio ainda.",

    expanded_difficulty:  "Dificuldade",
    expanded_est_time:    "Tempo estimado",
    expanded_tools:       "Ferramentas",
    expanded_output_kind: "Saída",
    expanded_prompt:      "O prompt",
    expanded_outcome:     "Resultado esperado",
    expanded_sample:      "Exemplo de saída",
    expanded_copy:        "Copiar prompt",
    expanded_copied:      "Copiado!",
    expanded_close:       "Fechar",
    expanded_inputs:      "O que você vai precisar",

    concepts_title:      "Conceitos de IA",
    concepts_subtitle:   "Ideias fundamentais explicadas de forma clara — de LLMs a MCP e além.",
    concepts_all:        "Todos",
    concepts_added:      "Adicionado",
    concepts_difficulty: ["Iniciante", "Intermediário", "Avançado"],
    concepts_analogy:    "Analogia",
    concepts_related:    "Conceitos relacionados",
    concepts_learn_more: "Saiba mais →",
    concepts_navigate:   "Navegar para conceito",

    footer_built:  "Feito com",
    footer_love:   "amor",
    footer_and:    "e",
    footer_claude: "Claude",
  },
};

export default translations;
