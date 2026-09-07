export type Locale = "en" | "pt";

export interface Translations {
  nav_explore:       string;
  nav_tools:         string;
  nav_news:          string;
  nav_learn:         string;
  nav_claude:        string;
  nav_resources:     string;
  nav_google_tools:  string;
  nav_concepts:      string;
  nav_ai_history:    string;
  nav_ai_labs:       string;
  nav_enter_library: string;
  use_cases_count:   (n: number) => string;

  hero_eyebrow:    (n: number) => string;
  hero_tagline:    string;
  hero_cta:        string;
  hero_cta_news:   string;
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

  footer_newsletter_eyebrow:  string;
  footer_newsletter_title:    string;
  footer_newsletter_sub:      string;
  footer_newsletter_disabled: string;
  footer_newsletter_done:     string;
  footer_subscribe:           string;
  footer_sending:             string;
  footer_newsletter_error:    string;
  footer_tagline:             string;
  footer_free:                string;
  footer_col_discover:        string;
  footer_col_reference:       string;
  footer_col_elsewhere:       string;
  footer_copyright:           string;
  footer_void:                string;
  footer_link_use_cases:   string;
  footer_link_collections: string;
  footer_link_tools:       string;
  footer_link_news:        string;
  footer_link_learn:       string;
  footer_link_resources:   string;
  footer_link_claude:      string;
  footer_link_concepts:    string;
  footer_link_history:     string;
  footer_link_labs:        string;
  footer_link_google:      string;
  footer_link_keynote:     string;
  footer_link_github:      string;
  footer_link_rss:         string;
}

const translations: Record<Locale, Translations> = {
  en: {
    nav_explore:       "Explore",
    nav_tools:         "AI Tools",
    nav_news:          "News",
    nav_learn:         "Learn",
    nav_claude:        "Claude",
    nav_resources:     "Resources",
    nav_google_tools:  "Google AI",
    nav_concepts:      "Concepts",
    nav_ai_history:    "AI History",
    nav_ai_labs:       "AI Labs",
    nav_enter_library: "Enter library →",
    use_cases_count:   (n) => `${n} use cases`,

    hero_eyebrow:    (n) => `Daily AI intelligence · ${n} prompts`,
    hero_tagline:    "Track AI as it moves — daily news, model updates, and ready-to-use prompts.\nStay current. Ship the work.",
    hero_cta:        "Browse the library →",
    hero_cta_news:   "Today's AI news →",
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

    footer_newsletter_eyebrow:  "Stay current",
    footer_newsletter_title:    "New prompts & AI news, weekly",
    footer_newsletter_sub:      "No noise. Curated highlights from the library.",
    footer_newsletter_disabled: "Newsletter signup is currently disabled.",
    footer_newsletter_done:     "Subscribed.",
    footer_subscribe:           "Subscribe",
    footer_sending:             "Sending…",
    footer_newsletter_error:    "Subscription failed. Try again later.",
    footer_tagline:             "A curated library of AI use cases, mapped across every way to think with a machine.",
    footer_free:                "Open source · Free forever",
    footer_col_discover:        "Discover",
    footer_col_reference:       "Reference",
    footer_col_elsewhere:       "Elsewhere",
    footer_copyright:           "© 2026 Sintra · Curated in the open.",
    footer_void:                "Built on the void.",
    footer_link_use_cases:   "Use Cases",
    footer_link_collections: "Collections",
    footer_link_tools:       "AI Tools Directory",
    footer_link_news:        "AI News",
    footer_link_learn:       "Learning Paths",
    footer_link_resources:   "Resources & Links",
    footer_link_claude:      "Claude & Anthropic",
    footer_link_concepts:    "AI Concepts",
    footer_link_history:     "AI History",
    footer_link_labs:        "AI Labs",
    footer_link_google:      "Google AI Tools",
    footer_link_keynote:     "AI Keynote ↗",
    footer_link_github:      "GitHub ↗",
    footer_link_rss:         "RSS Feed ↗",
  },
  pt: {
    nav_explore:       "Explorar",
    nav_tools:         "Ferramentas IA",
    nav_news:          "Notícias",
    nav_learn:         "Aprender",
    nav_claude:        "Claude",
    nav_resources:     "Recursos",
    nav_google_tools:  "Google AI",
    nav_concepts:      "Conceitos",
    nav_ai_history:    "História da IA",
    nav_ai_labs:       "Labs de IA",
    nav_enter_library: "Entrar na biblioteca →",
    use_cases_count:   (n) => `${n} casos de uso`,

    hero_eyebrow:    (n) => `Inteligência de IA diária · ${n} prompts`,
    hero_tagline:    "Acompanhe a IA em movimento — notícias diárias, atualizações de modelos e prompts prontos para uso.\nFique atualizado. Entregue o trabalho.",
    hero_cta:        "Ver a biblioteca →",
    hero_cta_news:   "Notícias de IA de hoje →",
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

    footer_newsletter_eyebrow:  "Fique por dentro",
    footer_newsletter_title:    "Novos prompts e notícias de IA, toda semana",
    footer_newsletter_sub:      "Sem ruído. Destaques selecionados da biblioteca.",
    footer_newsletter_disabled: "A inscrição na newsletter está desativada no momento.",
    footer_newsletter_done:     "Inscrito.",
    footer_subscribe:           "Inscrever-se",
    footer_sending:             "Enviando…",
    footer_newsletter_error:    "Falha na inscrição. Tente novamente mais tarde.",
    footer_tagline:             "Uma biblioteca selecionada de casos de uso de IA, mapeada por todas as formas de pensar com uma máquina.",
    footer_free:                "Código aberto · Grátis para sempre",
    footer_col_discover:        "Descobrir",
    footer_col_reference:       "Referência",
    footer_col_elsewhere:       "Em outros lugares",
    footer_copyright:           "© 2026 Sintra · Curado abertamente.",
    footer_void:                "Construído sobre o vazio.",
    footer_link_use_cases:   "Casos de uso",
    footer_link_collections: "Coleções",
    footer_link_tools:       "Diretório de ferramentas de IA",
    footer_link_news:        "Notícias de IA",
    footer_link_learn:       "Trilhas de aprendizado",
    footer_link_resources:   "Recursos e links",
    footer_link_claude:      "Claude e Anthropic",
    footer_link_concepts:    "Conceitos de IA",
    footer_link_history:     "História da IA",
    footer_link_labs:        "Labs de IA",
    footer_link_google:      "Ferramentas Google AI",
    footer_link_keynote:     "Palestra de IA ↗",
    footer_link_github:      "GitHub ↗",
    footer_link_rss:         "Feed RSS ↗",
  },
};

export default translations;
