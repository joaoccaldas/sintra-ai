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

  side_home:            string;
  side_group_discover:  string;
  side_group_learn:     string;
  side_group_reference: string;
  side_live:      string;
  side_automate:  string;
  side_library:   string;
  side_news:      string;
  side_weekly:    string;
  side_topics:    string;
  side_history:   string;
  side_labs:      string;
  side_research:  string;
  side_learn:     string;
  side_guides:    string;
  side_resources: string;
  side_concepts:  string;
  side_videos:    string;
  side_tools:     string;
  side_models:    string;
  side_claude:    string;
  side_google:    string;
  side_costcalc:  string;
  side_expand:    string;
  side_collapse:  string;
  side_close_nav: string;
  theme_dark:   string;
  theme_light:  string;
  theme_forest: string;
  theme_ocean:  string;
  theme_switch: (label: string) => string;

  side_collections: string;
  side_prompt:      string;
  hdr_search:       string;
  hdr_open_search:  string;
  hdr_saved:        string;
  hdr_open_nav:     string;
  hdr_skip:         string;
  hdr_switch_to_pt: string;
  hdr_switch_to_en: string;

  hero_eyebrow_cmd:     string;
  hero_h1_pre:          string;
  hero_h1_em:           string;
  hero_lead:            string;
  hero_stat_signals:    string;
  hero_stat_blueprints: string;
  hero_stat_usecases:   string;
  hero_cta_live:        string;
  hero_cta_automation:  string;
  hero_cta_map:         string;
  hero_sources:         (n: number) => string;
  hero_feeds:           string;
  hero_trust:           string;
  hero_feed_checked:    string;
  hero_feed_just:       string;
  hero_feed_hours:      (h: number) => string;
  hero_feed_days:       (d: number) => string;

  news_preset_all:      string;
  news_preset_landmark: string;
  news_preset_deals:    string;
  news_preset_policy:   string;
  news_preset_models:   string;
  news_preset_brazil:   string;
  news_preset_sweden:   string;
  news_back:            string;
  news_eyebrow:         string;
  news_h1_pre:          string;
  news_h1_em:           string;
  news_lead:            string;
  news_events_month:    (n: number) => string;
  news_updated:         (d: string) => string;
  news_browse_archive:  (n: number) => string;
  news_search_ph:       string;
  news_clear_search:    string;
  news_sig_all:         string;
  news_sig_landmark:    string;
  news_sig_major:       string;
  news_sig_notable:     string;
  news_all_providers:   string;
  news_show_all_countries: string;
  news_show_brazil:     string;
  news_show_sweden:     string;
  news_label_brazil:    string;
  news_label_sweden:    string;
  news_events_count:    (n: number) => string;
  news_none_match:      (month: string) => string;
  news_none_search:     (q: string) => string;
  news_none_filter:     string;
  news_archived_more:   (n: number) => string;
  news_search_archive:  string;
  news_showing:         (x: number, y: number) => string;
  news_browse_older:    string;

  home_intent_track:         string;
  home_intent_track_desc:    string;
  home_intent_automate:      string;
  home_intent_automate_desc: string;
  home_intent_learn:         string;
  home_intent_learn_desc:    string;
  home_intent_build:         string;
  home_intent_build_desc:    string;
  home_link_model_radar:     string;
  home_sub_live:      (n: number) => string;
  home_sub_news:      (n: number) => string;
  home_sub_research:  string;
  home_sub_automate:  (n: number) => string;
  home_sub_library:   (n: number) => string;
  home_sub_tools:     (n: number) => string;
  home_sub_guides:    (n: number) => string;
  home_sub_paths:     (n: number) => string;
  home_sub_concepts:  (n: number) => string;
  home_sub_models:    (n: number) => string;
  home_sub_history:   string;
  home_sub_videos:    (n: number) => string;
  home_pick_story:    string;
  home_pick_prompt:   string;
  home_pick_guide:    string;
  home_pick_paper:    string;
  home_pick_tool:     string;
  home_read:          string;
  home_this_week:     string;
  home_news_updated:  (d: string) => string;
  home_tab_picks:     string;
  home_tab_news:      string;
  home_all_n:         (n: number) => string;
  home_live_frontier: string;
  home_open_live:     string;
  home_view_all:      string;
  home_rss_title:     string;
  home_rss_sub:       string;
  home_rss_btn:       string;
  home_automate_btn:  string;
  home_browse_all:    (n: number) => string;
  home_open:          string;
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

    side_home:            "Home",
    side_group_discover:  "Discover",
    side_group_learn:     "Learn",
    side_group_reference: "Reference",
    side_live:      "Live Feed",
    side_automate:  "Automation Hub",
    side_library:   "Prompt Library",
    side_news:      "AI News",
    side_weekly:    "Weekly Digest",
    side_topics:    "Topic Hubs",
    side_history:   "AI History",
    side_labs:      "AI Labs",
    side_research:  "Research",
    side_learn:     "Learning Paths",
    side_guides:    "Guides",
    side_resources: "Resources",
    side_concepts:  "Concepts",
    side_videos:    "Videos",
    side_tools:     "AI Tools",
    side_models:    "Models",
    side_claude:    "Claude",
    side_google:    "Google AI",
    side_costcalc:  "Cost Calc",
    side_expand:    "Expand sidebar",
    side_collapse:  "Collapse sidebar",
    side_close_nav: "Close navigation",
    theme_dark:   "Dark",
    theme_light:  "Light",
    theme_forest: "Forest",
    theme_ocean:  "Ocean",
    theme_switch: (label) => `Switch to ${label} theme`,

    side_collections: "Collections",
    side_prompt:      "Prompt",
    hdr_search:       "Search",
    hdr_open_search:  "Open search",
    hdr_saved:        "Open saved prompts",
    hdr_open_nav:     "Open navigation",
    hdr_skip:         "Skip to content",
    hdr_switch_to_pt: "Switch to Portuguese",
    hdr_switch_to_en: "Switch to English",

    hero_eyebrow_cmd:     "AI command center · live intelligence · automation",
    hero_h1_pre:          "The operating map for ",
    hero_h1_em:           "AI work",
    hero_lead:            "Track what is changing, understand what matters, compare tools and models, then turn it into prompts, workflows and automation systems.",
    hero_stat_signals:    "live signals",
    hero_stat_blueprints: "workflow blueprints",
    hero_stat_usecases:   "AI use cases",
    hero_cta_live:        "Explore live AI",
    hero_cta_automation:  "Build an automation",
    hero_cta_map:         "Browse the map",
    hero_sources:         (n) => `${n} sources`,
    hero_feeds:           "RSS + JSON feed",
    hero_trust:           "static, auditable, source-backed",
    hero_feed_checked:    "feed timestamp checked",
    hero_feed_just:       "feed fresh · just updated",
    hero_feed_hours:      (h) => `feed fresh · ${h}h old`,
    hero_feed_days:       (d) => `feed snapshot · ${d}d old`,

    news_preset_all:      "All",
    news_preset_landmark: "Landmark",
    news_preset_deals:    "Deals",
    news_preset_policy:   "Policy",
    news_preset_models:   "Models",
    news_preset_brazil:   "Brazil",
    news_preset_sweden:   "Sweden",
    news_back:            "Back to Sintra",
    news_eyebrow:         "AI Intelligence",
    news_h1_pre:          "The AI ",
    news_h1_em:           "digest.",
    news_lead:            "Landmark releases, model launches, and paradigm shifts — curated for signal, not noise.",
    news_events_month:    (n) => `${n} events this month`,
    news_updated:         (d) => `Updated ${d}`,
    news_browse_archive:  (n) => `Browse archive (${n} earlier events)`,
    news_search_ph:       "Search events, models, companies…",
    news_clear_search:    "Clear search",
    news_sig_all:         "All",
    news_sig_landmark:    "Landmark",
    news_sig_major:       "Major",
    news_sig_notable:     "Notable",
    news_all_providers:   "All providers",
    news_show_all_countries: "Show all countries",
    news_show_brazil:     "Show Brazil news only",
    news_show_sweden:     "Show Sweden news only",
    news_label_brazil:    "Brazil",
    news_label_sweden:    "Sweden",
    news_events_count:    (n) => `${n} events`,
    news_none_match:      (month) => `No events match this filter in ${month}.`,
    news_none_search:     (q) => `“${q}” might be in an earlier month — `,
    news_none_filter:     "This filter has no matches this month — ",
    news_archived_more:   (n) => `${n} more events are archived.`,
    news_search_archive:  "Search the archive",
    news_showing:         (x, y) => `Showing ${x} of ${y} events`,
    news_browse_older:    "Browse older months",

    home_intent_track:         "Track",
    home_intent_track_desc:    "What's changing in AI now",
    home_intent_automate:      "Automate",
    home_intent_automate_desc: "Turn AI into repeatable work",
    home_intent_learn:         "Learn",
    home_intent_learn_desc:    "Build real understanding, fast",
    home_intent_build:         "Build",
    home_intent_build_desc:    "Models, tools and decision support",
    home_link_model_radar:     "Model Radar",
    home_sub_live:      (n) => `${n} live signals`,
    home_sub_news:      (n) => `${n} items · updated daily`,
    home_sub_research:  "Key papers in plain English",
    home_sub_automate:  (n) => `${n} workflow blueprints`,
    home_sub_library:   (n) => `${n} executable use cases`,
    home_sub_tools:     (n) => `${n} tools & apps`,
    home_sub_guides:    (n) => `${n} practical how-to guides`,
    home_sub_paths:     (n) => `${n} structured paths`,
    home_sub_concepts:  (n) => `${n} core AI concepts`,
    home_sub_models:    (n) => `${n} models compared`,
    home_sub_history:   "70 years of milestones",
    home_sub_videos:    (n) => `${n} lessons`,
    home_pick_story:    "Story",
    home_pick_prompt:   "Prompt",
    home_pick_guide:    "Guide",
    home_pick_paper:    "Paper",
    home_pick_tool:     "Tool",
    home_read:          "Read",
    home_this_week:     "This Week",
    home_news_updated:  (d) => `News updated ${d}`,
    home_tab_picks:     "Picks",
    home_tab_news:      "News",
    home_all_n:         (n) => `All ${n}`,
    home_live_frontier: "Live from the frontier",
    home_open_live:     "Open live feed",
    home_view_all:      "View all",
    home_rss_title:     "Stay ahead of AI — follow the RSS feed",
    home_rss_sub:       "Subscribe in any RSS reader to get every new prompt, news item, live signal and model update from Sintra.",
    home_rss_btn:       "RSS Feed",
    home_automate_btn:  "Automate",
    home_browse_all:    (n) => `Browse all ${n}`,
    home_open:          "Open",
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

    side_home:            "Início",
    side_group_discover:  "Descobrir",
    side_group_learn:     "Aprender",
    side_group_reference: "Referência",
    side_live:      "Feed ao vivo",
    side_automate:  "Central de automação",
    side_library:   "Biblioteca de prompts",
    side_news:      "Notícias de IA",
    side_weekly:    "Resumo semanal",
    side_topics:    "Centrais de tópicos",
    side_history:   "História da IA",
    side_labs:      "Labs de IA",
    side_research:  "Pesquisa",
    side_learn:     "Trilhas de aprendizado",
    side_guides:    "Guias",
    side_resources: "Recursos",
    side_concepts:  "Conceitos",
    side_videos:    "Vídeos",
    side_tools:     "Ferramentas de IA",
    side_models:    "Modelos",
    side_claude:    "Claude",
    side_google:    "Google AI",
    side_costcalc:  "Calc. de custo",
    side_expand:    "Expandir barra lateral",
    side_collapse:  "Recolher barra lateral",
    side_close_nav: "Fechar navegação",
    theme_dark:   "Escuro",
    theme_light:  "Claro",
    theme_forest: "Floresta",
    theme_ocean:  "Oceano",
    theme_switch: (label) => `Mudar para o tema ${label}`,

    side_collections: "Coleções",
    side_prompt:      "Prompt",
    hdr_search:       "Buscar",
    hdr_open_search:  "Abrir busca",
    hdr_saved:        "Abrir prompts salvos",
    hdr_open_nav:     "Abrir navegação",
    hdr_skip:         "Pular para o conteúdo",
    hdr_switch_to_pt: "Mudar para português",
    hdr_switch_to_en: "Mudar para inglês",

    hero_eyebrow_cmd:     "Central de comando de IA · inteligência ao vivo · automação",
    hero_h1_pre:          "O mapa operacional para ",
    hero_h1_em:           "o trabalho com IA",
    hero_lead:            "Acompanhe o que está mudando, entenda o que importa, compare ferramentas e modelos e transforme tudo em prompts, fluxos de trabalho e sistemas de automação.",
    hero_stat_signals:    "sinais ao vivo",
    hero_stat_blueprints: "modelos de fluxo",
    hero_stat_usecases:   "casos de uso de IA",
    hero_cta_live:        "Explorar IA ao vivo",
    hero_cta_automation:  "Criar uma automação",
    hero_cta_map:         "Explorar o mapa",
    hero_sources:         (n) => `${n} fontes`,
    hero_feeds:           "Feed RSS + JSON",
    hero_trust:           "estático, auditável, com fontes",
    hero_feed_checked:    "carimbo do feed verificado",
    hero_feed_just:       "feed atualizado · agora mesmo",
    hero_feed_hours:      (h) => `feed atualizado · há ${h}h`,
    hero_feed_days:       (d) => `snapshot do feed · há ${d}d`,

    news_preset_all:      "Todos",
    news_preset_landmark: "Marco",
    news_preset_deals:    "Negócios",
    news_preset_policy:   "Política",
    news_preset_models:   "Modelos",
    news_preset_brazil:   "Brasil",
    news_preset_sweden:   "Suécia",
    news_back:            "Voltar ao Sintra",
    news_eyebrow:         "Inteligência de IA",
    news_h1_pre:          "O resumo de ",
    news_h1_em:           "IA.",
    news_lead:            "Lançamentos marcantes, novos modelos e mudanças de paradigma — selecionados por sinal, não por ruído.",
    news_events_month:    (n) => `${n} eventos neste mês`,
    news_updated:         (d) => `Atualizado ${d}`,
    news_browse_archive:  (n) => `Ver arquivo (${n} eventos anteriores)`,
    news_search_ph:       "Buscar eventos, modelos, empresas…",
    news_clear_search:    "Limpar busca",
    news_sig_all:         "Todos",
    news_sig_landmark:    "Marco",
    news_sig_major:       "Importante",
    news_sig_notable:     "Notável",
    news_all_providers:   "Todos os provedores",
    news_show_all_countries: "Mostrar todos os países",
    news_show_brazil:     "Mostrar só notícias do Brasil",
    news_show_sweden:     "Mostrar só notícias da Suécia",
    news_label_brazil:    "Brasil",
    news_label_sweden:    "Suécia",
    news_events_count:    (n) => `${n} eventos`,
    news_none_match:      (month) => `Nenhum evento corresponde a este filtro em ${month}.`,
    news_none_search:     (q) => `“${q}” pode estar em um mês anterior — `,
    news_none_filter:     "Este filtro não tem resultados neste mês — ",
    news_archived_more:   (n) => `mais ${n} eventos estão arquivados.`,
    news_search_archive:  "Buscar no arquivo",
    news_showing:         (x, y) => `Mostrando ${x} de ${y} eventos`,
    news_browse_older:    "Ver meses anteriores",

    home_intent_track:         "Acompanhar",
    home_intent_track_desc:    "O que está mudando na IA agora",
    home_intent_automate:      "Automatizar",
    home_intent_automate_desc: "Transforme IA em trabalho repetível",
    home_intent_learn:         "Aprender",
    home_intent_learn_desc:    "Construa entendimento real, rápido",
    home_intent_build:         "Construir",
    home_intent_build_desc:    "Modelos, ferramentas e apoio à decisão",
    home_link_model_radar:     "Radar de modelos",
    home_sub_live:      (n) => `${n} sinais ao vivo`,
    home_sub_news:      (n) => `${n} itens · atualizado diariamente`,
    home_sub_research:  "Artigos-chave em linguagem simples",
    home_sub_automate:  (n) => `${n} modelos de fluxo`,
    home_sub_library:   (n) => `${n} casos de uso executáveis`,
    home_sub_tools:     (n) => `${n} ferramentas e apps`,
    home_sub_guides:    (n) => `${n} guias práticos`,
    home_sub_paths:     (n) => `${n} trilhas estruturadas`,
    home_sub_concepts:  (n) => `${n} conceitos essenciais de IA`,
    home_sub_models:    (n) => `${n} modelos comparados`,
    home_sub_history:   "70 anos de marcos",
    home_sub_videos:    (n) => `${n} lições`,
    home_pick_story:    "Notícia",
    home_pick_prompt:   "Prompt",
    home_pick_guide:    "Guia",
    home_pick_paper:    "Artigo",
    home_pick_tool:     "Ferramenta",
    home_read:          "Ler",
    home_this_week:     "Esta semana",
    home_news_updated:  (d) => `Notícias atualizadas ${d}`,
    home_tab_picks:     "Destaques",
    home_tab_news:      "Notícias",
    home_all_n:         (n) => `Todos ${n}`,
    home_live_frontier: "Ao vivo da fronteira",
    home_open_live:     "Abrir feed ao vivo",
    home_view_all:      "Ver tudo",
    home_rss_title:     "Fique à frente da IA — assine o feed RSS",
    home_rss_sub:       "Assine em qualquer leitor de RSS para receber cada novo prompt, notícia, sinal ao vivo e atualização de modelo do Sintra.",
    home_rss_btn:       "Feed RSS",
    home_automate_btn:  "Automatizar",
    home_browse_all:    (n) => `Ver todos ${n}`,
    home_open:          "Abrir",
  },
};

export default translations;
