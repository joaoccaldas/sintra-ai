#!/usr/bin/env python3
"""Enrich useCases.json with outcome, inputs, tools, est_time, output_kind, sample_output.

Run from repo root:  python3 scripts/enrich.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC  = ROOT / "src" / "data" / "useCases.json"

# ── Auto-derived helpers ─────────────────────────────────────────────────────

def extract_inputs(prompt: str) -> list[dict]:
    """Pull [bracketed] and {curly} placeholders out of the prompt text."""
    bracket = re.findall(r"\[([^\]]+)\]", prompt)
    curly   = re.findall(r"\{([^}]+)\}", prompt)
    raw = bracket + curly
    seen, out = set(), []
    for r in raw:
        key = r.strip().lower()
        if key in seen or len(r) > 60:
            continue
        seen.add(key)
        out.append({"label": r.strip()})
        if len(out) >= 5:
            break
    return out


SKILL_TIME = {
    "BEGINNER":     "5–10 min",
    "INTERMEDIATE": "20–40 min",
    "ADVANCED":     "1–2 hours",
    "EXPERT":       "Multi-week",
}

TAG_TIME_OVERRIDE = {
    "15-minutes":         "15 min",
    "30-minutes":         "30 min",
    "1-hour":             "1 hour",
    "quick-win":          "30 min",
    "half-day":           "Half day",
    "half-day-to-day":    "Half day – 1 day",
    "half-day-to-week":   "Half day – 1 week",
    "multi-day":          "2–4 days",
    "multi-week":         "Multi-week",
    "multi-month":        "Multi-month",
    "multi-year":         "Multi-year",
    "self-paced":         "Self-paced",
}


def derive_time(item) -> str:
    for t in item["tags"]:
        if t.lower() in TAG_TIME_OVERRIDE:
            return TAG_TIME_OVERRIDE[t.lower()]
    return SKILL_TIME.get(item["skill_level"], "Varies")


def derive_tools(item) -> list[str]:
    p = (item["prompt"] + " " + " ".join(item["tags"])).lower()
    tools = set()
    mapping = [
        (("python",),                   "Python"),
        (("javascript", "react", "vue"), "JavaScript"),
        (("excel", "spreadsheet", "cube"), "Excel"),
        (("google sheets",),            "Google Sheets"),
        (("powerbi", "power bi", "dax"), "Power BI"),
        (("figma",),                    "Figma"),
        (("notion",),                   "Notion"),
        (("obsidian",),                 "Obsidian"),
        (("d3", "chart.js"),            "D3"),
        (("midjourney",),               "Midjourney"),
        (("cursor",),                   "Cursor"),
        (("airflow",),                  "Airflow"),
    ]
    for keys, label in mapping:
        if any(k in p for k in keys):
            tools.add(label)

    # Always recommend an AI runner. Beginner gets ChatGPT (most accessible),
    # everyone else gets Claude for long-context work.
    if item["skill_level"] == "BEGINNER":
        tools.add("ChatGPT")
    else:
        tools.add("Claude")
        if "advanced" in item["tags"] or item["skill_level"] in ("ADVANCED", "EXPERT"):
            tools.add("ChatGPT")
    return sorted(tools)


def derive_output_kind(item) -> str:
    p = (item["title"] + " " + item["prompt"]).lower()
    if any(k in p for k in ["python code", "javascript", "script", "scaffold", "snippet", "function"]):
        return "code"
    if any(k in p for k in ["dashboard", "real-time", "chart", "visualiz", "wireframe"]):
        return "visual"
    if any(k in p for k in ["architecture", "platform", "pipeline", "system", "infrastructure"]):
        return "spec"
    if any(k in p for k in ["template", "checklist", "outline", "agenda", "email"]):
        return "templates"
    if any(k in p for k in ["table", "rubric", "matrix", "spreadsheet", "model"]):
        return "table"
    if "presentation" in p or "slide" in p:
        return "deck"
    if any(k in p for k in ["roadmap", "plan", "phases", "strategy"]):
        return "plan"
    return "analysis"


# ── Hand-written content per case (by index) ─────────────────────────────────
# Each entry: outcome (1 sentence) + sample_output (short representative result)

CONTENT = {
0: {  # Quick Insights from Spreadsheets
    "outcome": "A plain-English readout of the top three trends, three chart specs you can paste into Excel, and two follow-up questions for the business.",
    "sample_output": """**Top 3 trends**
1. Revenue grew 14% YoY, accelerating in Q3 (+22% vs. +9% Q1)
2. EMEA outpaced APAC for the first time in 18 months
3. Promo months (Mar, Sep) drove 31% of annual revenue

**Charts to build**
- Line: monthly revenue vs. prior year (12 + 12 points)
- Stacked bar: revenue by region per quarter
- Scatter: promo spend vs. incremental revenue

**Unusual pattern:** August dip of −7% breaks the seasonal pattern. Worth asking ops.

**Investigate**
- Is the August dip a stocking issue or genuine demand?
- Does the EMEA acceleration hold without the FX tailwind?""",
},
1: {  # Rolling Forecast Model
    "outcome": "A structured 5-step build plan: model layout, formula spec, risk table, and a variance-analysis template — all wired to your historicals.",
    "sample_output": """**Sheet structure**
- `Drivers` — assumptions table (one column per month, FY+1 rolling)
- `P&L` — revenue waterfall, cost of sales, opex, operating profit
- `Variance` — actuals vs. forecast, with auto-coloured deltas
- `Scenarios` — base / upside / downside via INDEX/CHOOSE

**Key formulas**
```
Revenue = Units × Price × (1 + Seasonality_Idx)
GM%     = (Revenue − COGS) / Revenue
F'cast  = IF(MONTH(TODAY()) ≥ B$3, Actual, Driver-based)
```

**Risks & sensitivities**
1. Price elasticity unknown — model ±5%, ±10%
2. Promo cannibalisation — flag if uplift < 40%
3. FX exposure on EMEA revenue — hedge above $X""",
},
2: {  # Automated FP&A Pipeline
    "outcome": "A production-ready Python architecture: ingestion, validation, forecasting, alerting, and audit trail — with a deployment plan and testing strategy.",
    "sample_output": """**Architecture**
```
ERP → Ingest (Airflow) → Validate (Great Expectations)
    → Transform (dbt) → Forecast (Prophet/SARIMA)
    → Report (python-pptx) → Alert (Slack/Email)
```

**Code skeleton — validation step**
```python
from great_expectations.dataset import PandasDataset

def validate(df: pd.DataFrame) -> ValidationResult:
    ds = PandasDataset(df)
    ds.expect_column_values_to_not_be_null("account_id")
    ds.expect_column_values_to_be_between("amount", -1e9, 1e9)
    ds.expect_column_values_to_match_regex("period", r"^\\d{4}-\\d{2}$")
    return ds.validate()
```

**Testing:** 80%+ coverage on transforms; smoke-test full pipeline on synthetic 100-row sample daily.""",
},
3: {  # Enterprise Financial Platform
    "outcome": "An 18-month transformation plan: architecture, stack, data model, security framework, hiring plan, and total cost of ownership.",
    "sample_output": """**Phases**
1. Months 0–3: Foundation — data warehouse (Snowflake), identity (Okta), governance.
2. Months 4–9: Core planning — Anaplan/Pigment migration, workflow approvals, multi-currency.
3. Months 10–14: Self-service — Power BI semantic layer, exec dashboards.
4. Months 15–18: AI overlay — forecast assistance, anomaly detection.

**Stack:** Snowflake · dbt · Anaplan · Power BI · Okta · GitHub Actions

**Org:** 1 Director, 3 Senior FP&A, 2 Data Eng, 1 Solutions Architect, 1 PM

**TCO (3-yr):** $4.8–6.2 M (60% software, 30% people, 10% integrators)""",
},
4: {  # Customer Feedback Summary
    "outcome": "Five clustered themes, the top five complaints with frequency, three quick wins, and a tracking template — drawn from your raw verbatims.",
    "sample_output": """**Themes** (n=87 verbatims)
- Onboarding friction (34%)
- Slow support response (22%)
- Missing integrations (18%)
- Pricing clarity (15%)
- Performance lag (11%)

**Top complaints**
1. "Couldn't find where to start" — 28 mentions
2. "Waited 3+ days for a reply" — 19 mentions
3. "Doesn't connect to Slack" — 14 mentions

**Quick wins**
- Add a guided first-run checklist (kills #1)
- Auto-acknowledge tickets within 5 min (softens #2)
- Build the Slack integration (clears #3)""",
},
5: {  # Competitive Analysis
    "outcome": "A SWOT, a pricing comparison, a market-share approach, and three strategic scenarios with pros/cons — packaged for the leadership memo.",
    "sample_output": """**SWOT (you vs. top 3)**
| | Strengths | Weaknesses |
|---|---|---|
| You | Product depth, NPS 62 | Slow GTM, no SMB pricing |
| Comp A | Brand, channel | Bloated UX |
| Comp B | Price, speed | Thin enterprise feature set |

**Pricing band:** $49–$199/mo. You sit at $129 — premium-mid.

**Scenarios**
1. Hold the line, fortify enterprise — defensible, slow growth.
2. Launch SMB tier @ $39 — opens TAM 3×, risks cannibalisation.
3. Acquire Comp B — instant channel, $80–120M, ~6 months to close.""",
},
6: {  # Real-Time Market Intelligence Dashboard
    "outcome": "A full technical spec: scraping infra, data pipeline, alert thresholds, dashboard wireframe, and a cost estimate.",
    "sample_output": """**Pipeline**
```
Sources (Bright Data / RSS / APIs)
  → Queue (SQS) → Workers (Python, 5 replicas)
  → DB (Postgres) → API (FastAPI) → UI (Next.js + Tremor)
```

**Alerts**
- Price change ≥5% within 24h → Slack #commercial
- New review with rating ≤2 → Slack #cx
- Competitor pricing page hash change → Email + Slack

**Cost:** ~$420/mo (scraping $180, infra $140, monitoring $100). Maintenance: 4 hrs/week.""",
},
7: {  # Process Improvement Ideas
    "outcome": "Three concrete improvement ideas, a before/after side-by-side, a proposal email draft, and the metrics worth tracking.",
    "sample_output": """**Three ideas**
1. **Batch the daily count** into one end-of-shift sweep (saves ~40 min/day).
2. **QR-tag the top-50 SKUs** so receiving scans instead of types.
3. **Auto-reorder** at min level via shared sheet (no more stockouts).

**Before → After**
- Manual count, 5×/day → 1 scan, end-of-shift
- Receiving avg time: 12 min → 4 min
- Stockouts/month: 7 → ≤1

**Email draft**
> Hi [manager], I've mapped three changes to receiving that could save ~15 hrs/week without new tooling. Quick run-through Friday at 2pm?""",
},
8: {  # Supply Chain Optimization
    "outcome": "An inefficiency map, three optimisation scenarios with ROI math, an implementation roadmap, and a risk register.",
    "sample_output": """**Inefficiencies found**
- 38% of SKUs sit in 2+ warehouses unnecessarily (carrying cost: $1.2M/yr)
- Lead time variance 4–18 days on a single supplier
- Safety stock set on rule-of-thumb, not service-level math

**Scenarios**
| | Cost | Annual saving | Service level |
|---|---|---|---|
| Consolidate to 3 DCs | $2.1M one-time | $1.8M | 97% |
| Add 4th regional DC | $3.4M one-time | $2.6M | 99% |
| Optimise w/o new DCs | $200k | $0.9M | 96% |

**Risk:** scenario 1 risks weather concentration on the Memphis hub.""",
},
9: {  # Customer Service Response Templates
    "outcome": "Five reusable response templates, a troubleshooting flowchart for your common issue, an info-collection checklist, and a team FAQ.",
    "sample_output": """**Templates**
1. **Acknowledgement** — "Got it, [name]. Looking into it now — back to you within 2 hours."
2. **Asking for more info** — "Quick thing to unblock me: could you send [X, Y]?"
3. **Known issue** — "Yep, known one — fix is going out [date]. Workaround: [...]"
4. **Escalation** — "Pulling in [team]. Owner is [name]. Updates in this thread."
5. **Resolution** — "[Fix] is live. Anything else from this ticket?"

**Flowchart** (login issue): Reset password? → Y: send link / N: 2FA enrolled? → Y: code working? → escalate.""",
},
10: {  # First Contact Resolution
    "outcome": "A decision tree, type-specific response templates, training topics, KPIs, and a quality monitoring checklist.",
    "sample_output": """**Decision tree (login)**
```
Issue → Account locked?
├─ Y → Unlock + send reset → Resolved
└─ N → 2FA enrolled?
    ├─ Y → Codes working? → escalate L2 if no
    └─ N → Enrol + verify → Resolved
```

**KPIs:** FCR (target 78%), AHT (≤6 min), CSAT (≥4.4/5), repeat-contact rate (≤8%).

**QA checklist (per ticket)**
- [ ] Asked the diagnostic Q first
- [ ] Verified identity
- [ ] Logged root cause code
- [ ] Sent confirmation summary""",
},
11: {  # AI Support Assistant
    "outcome": "An NLP pipeline architecture, training-data requirements, model selection, phased rollout, and success metrics.",
    "sample_output": """**Architecture**
```
Ticket → Classifier (BERT, 12 classes)
       → KB retriever (embeddings + reranker)
       → Drafter (LLM, brand-tuned)
       → Human-in-loop (L1 review for low-confidence)
       → Send / Escalate
```

**Training data:** ~5k labelled tickets minimum; 80/10/10 split; include 200 hard negatives.

**Rollout:** shadow-mode (4 wk) → suggest-only (8 wk) → auto-send tier-1 (gated by confidence ≥0.92).""",
},
12: {  # AI-Assisted Variance Analysis
    "outcome": "The top five variances with one-paragraph explanations, an action vs. noise call on each, and a ready-to-send manager email.",
    "sample_output": """**Top 5 variances (Oct vs. budget)**
| Account | Var | Driver |
|---|---|---|
| Subscription rev | +$340k | Renewal pull-forward, treat as timing |
| Cloud infra | +$190k | Workload spike from new feature — investigate |
| T&E | −$60k | Conf budget unspent — flag for reforecast |
| Stock comp | +$110k | New hires — already accrued, noise |
| Hosting | +$45k | Egress overage — review architecture |

**Action vs noise:** rows 2 and 5 need follow-up; the rest are timing/accrual noise.

**Manager email:** drafted, ~120 words, ready to copy.""",
},
13: {  # Automated Commentary Writing
    "outcome": "An executive-summary block, narrative sections for each P&L line, professional phrasing, red-flag highlights, and graphic suggestions.",
    "sample_output": """**Executive summary**
- Revenue $42.1M, +6.2% YoY, in line with budget
- GM% 68.1%, +120bps vs. prior year — pricing actions holding
- Opex tracking $0.4M favourable; hiring lag in R&D
- Operating income $12.6M; FX headwind of −$0.3M absorbed

**Revenue narrative**
> Subscription revenue grew 9% YoY, offsetting a 4% decline in services. New-logo ARR up 14%, but expansion softened to 11% (vs. 16% prior quarter), consistent with the broader macro slowdown observed by peers.

**Red flag:** R&D under-hire risks Q1 product timeline.""",
},
14: {  # AI-Powered Forecasting Assistant
    "outcome": "A trend + seasonality breakdown, adjustments for known events, three scenarios, and the narrative for leadership.",
    "sample_output": """**Trend & seasonality**
- 18-month CAGR: +12% (2.4% MoM)
- Seasonality peak: Nov–Dec (+38% vs. trailing 3 mo)
- Soft month: Feb (−18%)

**Scenarios (FY+1)**
| | Revenue | GM% | OI |
|---|---|---|---|
| Base | $186M | 67% | $42M |
| Upside (Enterprise +20%) | $204M | 69% | $52M |
| Downside (Churn 2pp) | $171M | 65% | $35M |

**Narrative:** "Base assumes 11% growth, in line with H2 run rate. Upside flips on enterprise pipeline conversion above 32% — feasible if security review accelerates."*""",
},
15: {  # Financial Modeling with AI
    "outcome": "A complete 3-statement model spec: structure, drivers, sensitivities, dashboard, audit checks, and documentation.",
    "sample_output": """**Tabs**
1. `Cover` — purpose, version, owner
2. `Drivers` — colour-coded inputs (blue)
3. `P&L`, `BS`, `CF` — links only (black), no hardcodes
4. `Sensitivity` — ±10/20% on revenue growth × GM
5. `Checks` — 6 integrity rules (BS balances, CF reconciles)

**Driver math (revenue)**
```
Rev_t = Cust_t × ARPU_t
Cust_t = Cust_{t-1} × (1 − Churn_t) + NewLogo_t
```

**Checks:** all return PASS or the cell turns red. Circularity resolved with iterative calc, max 100, threshold 0.001.""",
},
16: {  # Board Presentation Builder
    "outcome": "A story arc, slide-by-slide outline, chart picks, timed speaker notes, a backup appendix, and five anticipated questions with answers.",
    "sample_output": """**Story arc**
1. Where we are (one slide, one number)
2. What changed since last board (3 deltas)
3. What's working / what isn't
4. The decision we're asking for
5. What happens if you say yes

**Slides** (15 min total)
1. Title + headline number (45s)
2. Q3 scorecard vs. plan (90s)
3. The two wins (2 min)
4. The two concerns (2 min)
5. Pricing decision — recommendation (3 min)
6. Asks + timeline (1 min)

**Anticipated Q1:** "What's the downside case?" — answer prepped, 2 sentences + 1 backup slide.""",
},
17: {  # FP&A Process Automation
    "outcome": "A process map (as-is vs. to-be), automation approach, tool selection, error handling, validation, and a change-management plan.",
    "sample_output": """**As-is (12 hrs/wk)**
1. Pull exports from SAP, Salesforce, ADP (3 hrs)
2. Stitch in Excel (5 hrs)
3. Manual variance commentary (3 hrs)
4. Format deck (1 hr)

**To-be (~1 hr/wk)**
1. Python pulls from APIs nightly
2. dbt transforms + tests
3. LLM drafts commentary from variance table
4. python-pptx generates deck

**Tool stack:** Python · dbt · Anthropic API · python-pptx · Airflow

**Change mgmt:** 4-week parallel run, weekly QA, sign-off from controller before cutover.""",
},
18: {  # AI-Powered Financial Analysis Pipeline
    "outcome": "A complete AI-assisted FP&A system: architecture, data pipeline, model selection, integration plan, governance, and ROI math.",
    "sample_output": """**Architecture**
```
ERP/BI → Data lake (Snowflake)
       → Feature store (Feast)
       → LLM layer (Claude / GPT-4) ← embeddings of GL + commentary corpus
       → NL query interface (LangChain agent)
       → Outputs: commentary, anomaly alerts, forecast deltas
```

**Governance:** every AI-generated number gets a citation back to the source row; commentary stored with prompt + version hash for audit.

**ROI:** ~$240k/yr saved (1.5 FTE equivalent) against $80k build + $35k/yr run cost. Payback < 6 months.""",
},
19: {  # Enterprise FP&A Transformation
    "outcome": "A phased 3–5 year roadmap with org design, tech stack, investment case, risks, vendor criteria, and success metrics.",
    "sample_output": """**Phases**
- Yr 1 — Foundations: cloud DW, identity, governance, dashboarding standard
- Yr 2 — Planning: replace spreadsheet plan with Anaplan/Pigment
- Yr 3 — AI overlay: automated commentary, anomaly detection, NL queries

**Org shift**
- FP&A FTEs: 24 → 18 (reskill 6 into analytics engineers)
- New roles: 2 ML engineers, 1 finance data steward

**Investment case (3-yr)**
- Spend: $9.6M
- Savings: $14.2M (productivity, cycle-time reduction)
- Net: +$4.6M, payback yr 2.5

**Risks:** vendor lock-in (mitigate with semantic layer), change fatigue (sequence releases).""",
},
20: {  # AI-Powered Spreadsheet Analysis
    "outcome": "A structured analysis with trends, anomalies, summary stats, three insights, and chart recommendations — shareable as-is.",
    "sample_output": """**Trends**
- Northeast region revenue +18% YoY, leading other regions by 9pp
- Q4 still concentrates 38% of annual sales (vs. 34% three years ago)

**Anomalies**
- Two SKUs (#A23, #A41) show unit volume +200% but revenue flat — pricing issue?
- Negative gross margin on three loss-leaders in Mar

**Summary stats:** mean order $187, median $124, p90 $412. Long tail dominated by enterprise.

**Suggested visuals:** waterfall of YoY revenue by region; scatter of unit volume vs. price for the SKU set.""",
},
21: {  # Natural Language Excel Updates
    "outcome": "Latest actuals pulled into the tab you named, column headers swapped from E → A, variance commentary inline, and a source log appended.",
    "sample_output": """**Updates to @Balance Sheet - Q3**
- Q3 actuals replaced estimates in columns C:F (source: S&P Capital IQ, pulled 2026-05-12 09:14 UTC)
- Headers: "Q3 E" → "Q3 A"
- New row: variance commentary
- All checks PASS ✓

**Variance commentary inserted**
> Cash +$28M vs. estimate, driven by working-capital improvement (DSO ↓ 4 days). Long-term debt unchanged. Goodwill recalibrated for the X acquisition.

**Source log:** appended to `_meta` tab; includes URL, retrieval time, fields touched.""",
},
22: {  # AI-Assisted Financial Model Audit
    "outcome": "An audit report with severity-tagged findings: assumption consistency, formula integrity, broken links, anomalies, and improvements.",
    "sample_output": """**Critical (3)**
- `WACC!C18` references a deleted range — #REF!
- BS doesn't balance in years 4–5: $1.2M, $0.9M off
- Tax rate hard-coded inside a formula in CF tab

**Warnings (7)**
- Revenue growth jumps 14% → 41% Y3 with no driver explanation
- Two circularities resolved silently — flag for review
- Three named ranges declared but unused

**Info (12)** — naming, colour coding, font drift.

**Recommendation:** fix criticals before sending; warnings before signing.""",
},
23: {  # Power BI Model Optimization
    "outcome": "A naming + organisation rewrite, hidden FK columns, descriptions on every measure, drill hierarchies, type-optimised columns, and full documentation.",
    "sample_output": """**Suggested renames**
- `fact_sale_qty_v2` → `Sales Quantity`
- `dim_cust_full` → `Customer`
- `_calc_yoy_pct` → `Revenue YoY %`

**Display folders added**
- `Sales\\Volume` — Units, Returns, Net Units
- `Sales\\Value` — Revenue, GM, GM%
- `Time Intel` — YoY, MTD, QTD measures

**Optimisation**
- 14 string cols converted to integer keys → file size 89 MB → 41 MB
- Refresh time: 14 min → 6 min

**Doc output:** 28-page Markdown + Mermaid relationship diagram.""",
},
24: {  # Create Calculation Table with Measures
    "outcome": "A new measure table, an aggregate-amount calc per category value, a Net measure, and a full suite of monthly time-intelligence measures — placeholder fields hidden.",
    "sample_output": """**New table:** `_Measures`

**Per category:**
```dax
[Sales — Hardware] = CALCULATE([Sales Amount], 'Product'[Category] = "Hardware")
[Sales — Software] = CALCULATE([Sales Amount], 'Product'[Category] = "Software")
[Sales — Services] = CALCULATE([Sales Amount], 'Product'[Category] = "Services")
```

**Net:** `Net Sales = [Sales Amount] − [Returns Amount]`

**Time intel (for each measure):** MTD, QTD, YTD, MoM, YoY, Rolling 3M, Rolling 12M.

Placeholder integer column `_placeholder` hidden from report view.""",
},
25: {  # Cube Function Dashboard (Excel)
    "outcome": "A custom Excel cube-function dashboard: CUBESET dimensions, CUBEMEMBER labels, CUBEVALUE measures, Top-N ranks, and KPI conditional formatting.",
    "sample_output": """**Cell formulas (sample)**
```
A4:  =CUBEMEMBER("Model","[Date].[Calendar].[Month].&[2026-04]")
B4:  =CUBEVALUE("Model","[Measures].[Revenue]", A4, $A$1)
C4:  =CUBEVALUE("Model","[Measures].[Revenue YoY %]", A4, $A$1)
A20: =CUBERANKEDMEMBER("Model","[Product].[Top 10]",1)
```

**Layout:** quarter-bands in rows, scenarios in columns, two narration columns between sections — impossible to do this cleanly with a PivotTable.""",
},
26: {  # AI-Powered BI Documentation Generator
    "outcome": "A complete ~60-page Markdown doc with executive summary, mermaid relationship diagram, per-measure DAX + plain-English business logic, data sources, and usage scenarios.",
    "sample_output": """**Generated Markdown (excerpt)**
```markdown
## Model overview
This semantic model serves the Commercial Reporting team and powers
12 reports, 3 Power BI Apps, and 1 paginated weekly board pack.

## Relationship diagram
\\`\\`\\`mermaid
flowchart LR
  Date --> Sales
  Customer --> Sales
  Product --> Sales
  Sales --> InvoiceLine
\\`\\`\\`

## Measures
### Revenue
**DAX**
\\`\\`\\`dax
Revenue = SUMX('Sales', 'Sales'[Quantity] * 'Sales'[Unit Price])
\\`\\`\\`
**Business logic:** sales revenue net of returns, recognised on shipment.
```""",
},
27: {  # Autonomous Workflow System
    "outcome": "A blueprint for 36+ scheduled AI workflows: agent hierarchy, scheduling, integration with Claude Code / Codex / Cloud Code, monitoring, and error handling.",
    "sample_output": """**Hierarchy**
```
Master agent (daily 06:00 UTC)
├─ Morning briefing sub-agent → industry news + competitor moves
├─ Calendar sub-agent → today's meetings + prep
└─ Unblocked-tasks sub-agent → cross-checks email + Slack

Friday 16:00 UTC
└─ Email recap sub-agent → urgent unresponded, ranked
```

**Stack:** Claude Code + cron + S3 (state) + Slack/email (delivery).

**Monitoring:** every run writes structured log; dashboard alerts on >2 consecutive failures or runtime drift >2σ.""",
},
28: {  # Overwhelm Recovery
    "outcome": "A prioritisation framework, a daily + weekly schedule template, three focus habits, and platform-specific tool picks.",
    "sample_output": """**Prioritisation (Eisenhower + energy)**
1. Urgent + important + high-energy first hour
2. Important not urgent → schedule into deep-work blocks
3. Urgent not important → batch into a 30-min slot
4. Neither → delete, don't defer

**Daily template**
- 09:00–10:30 — Deep work block 1 (Slack off, phone away)
- 10:30–11:00 — Email / Slack triage
- 11:00–12:30 — Deep work block 2
- Afternoon: meetings + lighter work

**Habits:** (1) inbox-zero by 17:00, (2) one weekly review, (3) 50-min focus, 10-min reset.

**Mac tools:** Things 3, Cron, Raycast.""",
},
29: {  # Personal Productivity System
    "outcome": "A PARA-style organisation scheme, a weekly review process, meeting and project templates, and lightweight automations.",
    "sample_output": """**PARA**
- `01-Projects` — active, with a deadline (≤6)
- `02-Areas` — ongoing responsibilities (Health, Finance, Team)
- `03-Resources` — references you'll consult
- `04-Archive` — done or paused

**Weekly review (Fri 16:00, 45 min)**
1. Clear inbox, calendar, and capture tray
2. Move stale projects to Archive
3. Pick three priorities for next week
4. Two-line journal entry

**Automation:** Calendar → Notion meeting note auto-created with attendees + agenda block.""",
},
30: {  # Automated Productivity System
    "outcome": "An end-to-end personal productivity automation: task ingestion, AI scoring, deep-work scheduling, time tracking, weekly reports, and integrations.",
    "sample_output": """**Data flow**
```
Email/Slack/Calendar → Webhooks → AI scorer (priority 1–5)
   → Todoist (auto-tagged)
   → Calendar (deep-work blocks auto-inserted Mon–Fri 09–11)
   → Time tracker (auto-start on focus)
   → Weekly report (Notion page, Sunday 18:00)
```

**Scoring prompt (excerpt)**
> Score 1–5 on urgency, importance, and energy-fit. Output JSON: {score, reason, suggested_block}.

**Tech:** Python + n8n + Anthropic API + Todoist + Google Calendar.""",
},
31: {  # Meeting Prep
    "outcome": "An agenda, five sharp questions, a follow-up email template, and an action-items tracker — all in 5 minutes.",
    "sample_output": """**Agenda (30 min)**
1. Context recap (3 min)
2. Decisions needed (10 min) — list 2 here
3. Open risks (8 min)
4. Next steps + owners (5 min)
5. Parking lot (4 min)

**Questions to ask**
1. What's the success criterion for this in 30 days?
2. What's the blocker we're not naming?
3. Who's the single accountable owner?
4. What signal will tell us to course-correct?
5. What's the one thing we're optimising for?

**Follow-up template:** Decisions / Owners / Risks / Next sync — one line each.""",
},
32: {  # Meeting Effectiveness
    "outcome": "A meeting-quality checklist, agenda templates by type, a note-taking framework, a decision log, and a follow-up automation plan.",
    "sample_output": """**Quality checklist (run before sending the invite)**
- [ ] Is there a single decision or output? If not, don't schedule.
- [ ] Is the right person in the room? Limit to ≤6.
- [ ] Pre-read attached and read by attendees?

**Agenda types**
- Decision (30 min) — context, options, decide, owner
- Working session (60 min) — goal, work, check-out
- Status (15 min) — async-first; meet only if blocked

**Decision log columns:** Date · Decision · Owner · Rationale · Reversal cost.""",
},
33: {  # Meeting Intelligence System
    "outcome": "A privacy-friendly transcription + extraction system: local Whisper for ASR, LLM for action items / decisions, topic trending, follow-up agenda suggestions, UI mocks.",
    "sample_output": """**Pipeline**
```
Zoom recording → Local Whisper (large-v3) → Diarised transcript
   → LLM extractor → JSON {decisions, actions, owners, due}
   → Topic tracker (vector DB) → Trend dashboard
   → Project tool sync (Linear / Jira)
```

**Sample extraction**
```json
{
  "actions": [
    {"text": "Send pricing memo to Alex", "owner": "Sam", "due": "2026-05-22"},
    {"text": "Spike on auth migration", "owner": "Priya", "due": "2026-05-29"}
  ],
  "decisions": ["Ship dark mode behind a flag in 1.4.0"]
}
```""",
},
34: {  # 30-Day Learning Plan
    "outcome": "A 30-day learning plan, free/cheap resources, beginner-level practice projects, a progress tracker, and milestone moments.",
    "sample_output": """**Week 1 — Foundations**
- 4 × 1-hr lessons (e.g., Andrew Ng intro)
- Read 3 short essays, write reactions
- Mini project: rebuild a basic example end-to-end

**Week 2 — Apply**
- Pick a small dataset / problem from your own work
- Ship a v0 by Friday

**Week 3 — Stretch**
- Find a community (Discord/forum) and post one question
- Read 1 deeper paper or book chapter

**Week 4 — Consolidate**
- Write a 600-word "what I learned" note
- Share it; ask for one critique

**Milestones:** day 7 (first ship), day 14 (community), day 30 (public artefact).""",
},
35: {  # Career Development Plan
    "outcome": "A competency map, a milestone learning path, project-based practice, an accountability system, a portfolio strategy, and a networking plan.",
    "sample_output": """**Competency map** (target: Senior PM, 12 months)
| Skill | Now | Target | Gap |
|---|---|---|---|
| Product strategy | 3/5 | 4/5 | course + 1 case study |
| Stakeholder mgmt | 4/5 | 4/5 | maintain |
| Analytical depth | 2/5 | 4/5 | SQL + analytics cert |
| Influence at exec level | 2/5 | 4/5 | mentor + practice |

**Quarter 1 plan:** SQL course, 2 user-research interviews/wk, weekly 1:1 with skip-level.

**Portfolio:** ship 3 case studies (problem, decision, outcome) by month 9.""",
},
36: {  # Page Layout Help
    "outcome": "A suggested layout, a colour scheme, an essentials list, the most common mistakes to avoid, and free tool picks.",
    "sample_output": """**Layout (dashboard, desktop-first)**
- Top: page title + global filter row (1 row)
- Left rail: nav (collapsible)
- Main: 3-col KPI strip → 2-col chart block → table → footer

**Colour scheme**
- Bg: near-black (#0E1120)
- Surface: dark blue-grey (#161A2C)
- Primary action: violet (#9F8CFF)
- Positive / negative / neutral: cyan / rose / parchment

**Common mistakes:** too many colours, busy charts, no whitespace, low contrast on labels.

**Tools (free):** Figma, Penpot, Excalidraw.""",
},
37: {  # Full App Design
    "outcome": "User flows, wireframe descriptions, component specs, responsive considerations, a11y requirements, and a design-system recommendation.",
    "sample_output": """**Primary flow (new user)**
1. Sign up → email verify → onboarding tour (skippable)
2. Empty state → choose first task → wins (badge, confetti)
3. Day-2 nudge → return + retain

**Wireframes (described)**
- Home: top hero, three-card empty-state, primary CTA
- Detail: left meta column, main content, right rail with related items
- Settings: 3-tab layout, sticky save bar

**Responsive:** breakpoints 640 / 768 / 1024 / 1280; mobile uses bottom-nav, desktop uses side rail.

**A11y:** WCAG 2.1 AA contrast, focus rings on all interactive elements, keyboard-first nav, prefers-reduced-motion respected.""",
},
38: {  # Design System Build
    "outcome": "A component architecture, token structure, code examples, documentation template, and governance process — across Figma + React + Storybook.",
    "sample_output": """**Token tree**
```
color/
  bg/{abyss, steel, hairline}
  fg/{1, 2, 3, on-violet}
  accent/{violet, cyan-ice}
  diff/{beginner, intermediate, advanced, expert}
type/{display, h1, h2, body, eyebrow, mono}
space/{1..24}    // 4px grid
radius/{none, sm, md, lg, pill}
shadow/{1, 2, 3, glow, glow-strong}
motion/{ease-out, dur-fast, dur-base, dur-slow}
```

**Governance:** all changes via PR, two reviewers (1 design + 1 eng), Storybook snapshots + visual diff CI.""",
},
39: {  # Chart Selection Help
    "outcome": "Chart-type picks per metric, clarity tips, a colour scheme, the labels/annotations you need, and tool suggestions.",
    "sample_output": """**Picks**
- Trend over time → line (use bands for variability)
- Composition → stacked bar (small categories) or treemap (≥8)
- Ranking → horizontal bar, longest at top
- Distribution → histogram or box plot
- Correlation → scatter, with regression line if signal is strong

**Clarity:** start y-axis at 0 for bar charts (not always for line); label the most important point on the line, not all of them; lose the gridlines you don't read.

**Colour:** one neutral + one accent. No rainbow palettes for ordinal data.""",
},
40: {  # Dashboard Design
    "outcome": "A sectioned layout, chart-type picks per KPI, interaction design (filters, drill-down), an alert/notification scheme, and a mobile adaptation plan.",
    "sample_output": """**Sections (top → bottom)**
1. KPI strip (4 numbers, target vs. actual)
2. Trend grid (4 line charts, shared x-axis)
3. Breakdown (1 large + 2 small)
4. Anomaly table (sortable, default by severity)

**Interactions**
- Global filters: date range, region, segment
- Click a KPI tile → drill into its detail page
- Right-click any value → "explain this number" (LLM)

**Mobile:** collapse to single column, hide breakdown by default behind an accordion, keep KPI strip + one trend.""",
},
41: {  # Real-Time Analytics Dashboard
    "outcome": "A frontend architecture, data pipeline design, state management, performance optimisations, and a testing strategy.",
    "sample_output": """**Frontend**
- React + TanStack Query for data
- D3 for custom charts, Tremor for stock components
- State: Zustand for UI, React Query for server-state

**Data path**
```
Kafka → Pinot (OLAP) → REST/WS → React
                       ↳ SSE for live KPIs
```

**Perf**
- Virtualise tables >200 rows
- Web workers for any chart computing >5ms
- LRU on dimension queries (TTL 30s)

**Testing:** Playwright e2e for critical flows, Storybook visual regression, k6 load test (500 RPS sustained).""",
},
42: {  # Social Media Post
    "outcome": "Ten platform-tailored draft posts, suggested hashtags, image direction, and a posting schedule.",
    "sample_output": """**LinkedIn — Post 1 (educational)**
> Three things I've stopped doing as a [role] this year:
> 1. Sitting in status meetings without an agenda
> 2. Answering "quick questions" in DM
> 3. Volunteering for work I don't own
> What did you stop doing? ↓

**LinkedIn — Post 2 (POV)** [...]

**Hashtags:** #ProductManagement #FoundersJourney (max 3–5, never on the first line)

**Schedule:** Tue 09:00 educational, Thu 12:00 POV, Sat 10:00 story. Repurpose to Twitter same day, IG carousel on weekends.""",
},
43: {  # Content Strategy
    "outcome": "Content pillars, an editorial calendar template, a content-mix recipe, a repurposing plan, and success metrics.",
    "sample_output": """**Pillars (3)**
1. Craft — how we build (40%)
2. Behind the scenes — the boring middle (35%)
3. POV — opinionated takes that age well (25%)

**Mix per week**
- 2 LinkedIn long-form
- 3 Twitter threads
- 1 newsletter
- 1 short video (TikTok / Reels)

**Repurposing:** newsletter → LI thread → Twitter excerpt → reel script. One artefact, four formats.

**Metrics:** save rate (not likes), newsletter conversion, comment-to-DM ratio.""",
},
44: {  # AI Content Engine
    "outcome": "A generation pipeline, brand-voice tuning approach, quality control, automation workflows, and a performance tracking system.",
    "sample_output": """**Pipeline**
```
Topic queue → Outline LLM → Section drafts (parallel)
   → Brand-voice critic (LLM with rubric)
   → SEO optimiser (keyword density, headings)
   → Human review (5-min sanity check)
   → CMS publish → Schedule social
```

**Voice tuning:** 30 best-of corpus samples in an Anthropic file; system prompt anchors tone, banned words, sentence rhythm.

**A/B headlines:** generate 5 variants per post; rotate top-2 in social; declare winner after 72 hrs.

**Tracking:** scroll depth, time-on-page, conversion to newsletter, share rate.""",
},
45: {  # Repetitive Task Elimination
    "outcome": "A yes/no on whether it's automatable, the easiest path, step-by-step instructions, formulas/scripts, and a maintenance guide.",
    "sample_output": """**Verdict:** automatable in under 30 minutes.

**Simplest path:** Excel formulas + Power Query — no macros, no Python.

**Steps**
1. Save your source files in one folder, e.g. `~/Reports`.
2. Open Excel → Data → Get Data → From Folder → point to that folder.
3. Power Query stitches them. Click "Combine & Transform".
4. Sheet auto-refreshes when files are added.

**Formula to replace your VLOOKUP chain:**
```
=XLOOKUP(A2, LookupTable[Key], LookupTable[Value], "—", 0)
```

**Maintenance:** check column names monthly; if a source file renames a column, Power Query will flag it.""",
},
46: {  # Python Automation
    "outcome": "A commented Python script, setup instructions, error handling, scheduling guidance, and a documentation template.",
    "sample_output": """**Script skeleton**
```python
import logging, schedule, time
from pathlib import Path

log = logging.getLogger("autoreport")

def run() -> None:
    try:
        df = ingest(Path("~/inputs").expanduser())
        cleaned = clean(df)
        save(cleaned, Path("~/out") / "report.xlsx")
        notify("OK")
    except Exception:
        log.exception("run failed")
        notify("FAIL")

schedule.every().day.at("06:00").do(run)
while True: schedule.run_pending(); time.sleep(60)
```

**Setup:** `pipx install pdm`; `pdm add pandas openpyxl schedule`; cron entry on Mac/Linux or Task Scheduler on Windows.""",
},
47: {  # Automation Platform
    "outcome": "A microservices architecture, core service skeleton, DB schema, deployment pipeline, monitoring setup, and DR plan.",
    "sample_output": """**Architecture**
```
Event bus (NATS) ↔ Orchestrator (Prefect)
                   ↔ Workers (FastAPI, autoscaled)
                   ↔ Postgres (state) · S3 (artefacts) · Redis (cache)
                   ↔ Observability (OTel → Grafana)
```

**Job table**
```sql
create table jobs (
  id uuid primary key,
  kind text not null,
  payload jsonb,
  status text check (status in ('queued','running','done','failed')),
  attempts int default 0,
  created_at timestamptz default now()
);
```

**DR:** RPO 15 min (WAL streaming), RTO 30 min (warm standby), monthly restore drills.""",
},
48: {  # Data Cleaning
    "outcome": "Pandas code to clean the data, exploration snippets, simple visualisations, and a clean export.",
    "sample_output": """**Clean**
```python
import pandas as pd
df = pd.read_csv("raw.csv")

df = (
    df.drop_duplicates()
      .assign(date=lambda d: pd.to_datetime(d["date"], errors="coerce"))
      .dropna(subset=["date", "amount"])
      .query("amount.abs() < 1e7")  # outliers
)

df["amount"] = df["amount"].astype(float).round(2)
df.to_csv("clean.csv", index=False)
```

**Explore**
```python
df.describe(); df.isna().sum(); df.groupby("region")["amount"].sum().plot.bar()
```""",
},
49: {  # Data Pipeline
    "outcome": "A pipeline architecture, ETL/ELT approach, data model, quality checks, documentation standards, and tool picks.",
    "sample_output": """**Architecture (ELT)**
```
Sources (SAP, Salesforce, files)
  → Fivetran / Airbyte (ingest)
  → Snowflake raw schema
  → dbt models (staging → marts)
  → Great Expectations (tests)
  → BI (Power BI / Looker)
```

**Marts**
- `mart_finance.fct_invoice` — grain = invoice line
- `mart_finance.dim_customer` — SCD type 2

**Quality (per run)**
- Row count vs. prior run (alert if >5% drift)
- Null %, distinct count
- Joinable to dim tables = 100%""",
},
50: {  # Modern Data Platform
    "outcome": "A platform architecture, tool selection, phased rollout, team structure, cost estimate, and migration strategy.",
    "sample_output": """**Architecture**
```
Ingest: Fivetran + Kafka
Store: Snowflake (warehouse) + Iceberg (lake)
Transform: dbt
Catalog: DataHub
Quality: Great Expectations
Reverse-ETL: Hightouch
BI: Looker (semantic) + Power BI (long tail)
```

**Team (yr 1):** 1 lead, 2 analytics engineers, 1 data eng, 1 platform eng, 0.5 PM.

**Cost (annual run-rate):** $480k software, $1.1M people = $1.6M.

**Migration:** strangler-fig; new pipelines on platform from day 1, legacy decommission over 18 mo.""",
},
51: {  # AI Feasibility Check
    "outcome": "An honest take on whether AI fits, the simplest approach, data requirements, no-code/low-code tools, and an effort/accuracy estimate.",
    "sample_output": """**Fit check:** YES — but use rules + LLM, not ML from scratch. Your data shape (text + categories) is ideal for LLM classification with few-shot examples.

**Simplest path**
1. 20–50 hand-labelled examples
2. Prompt with examples + output schema
3. Run in batch (Make.com / Zapier scheduled)

**Effort:** ~2 hours setup, ~$5–20/month in LLM cost.

**Expected accuracy:** 88–94% on the obvious cases; design a fallback for the 6–12% it gets wrong.""",
},
52: {  # ML Model Build
    "outcome": "A data prep pipeline, model selection + training, evaluation framework, deployment approach, monitoring setup, and business metrics.",
    "sample_output": """**Pipeline**
```
Raw → feature store (Feast)
   → training (XGBoost + LightGBM ensemble)
   → eval (MAPE, prediction interval coverage)
   → registry (MLflow)
   → serving (FastAPI / Triton)
   → monitoring (Evidently)
```

**Eval (forecasting)**
- MAPE: target ≤8% at SKU-week grain
- 80% prediction interval coverage ≥75%
- Bias drift week-over-week ≤2pp

**Business metrics:** stockout rate (↓ target 35%), overstock cost (↓ target $1.2M/yr).""",
},
53: {  # Enterprise ML Platform
    "outcome": "A multi-cloud MLOps platform: architecture, components, rollout roadmap, team plan, cost model, and metrics.",
    "sample_output": """**Stack**
- Feature store: Feast
- Experiment tracking: Weights & Biases
- Registry + serving: MLflow + KServe
- Orchestration: Argo Workflows
- Monitoring: Evidently + Prometheus + Grafana
- Governance: model card per release, signed by data steward

**Rollout (12 mo)**
- Q1: foundation (registry, serving, baseline monitoring)
- Q2: first two production models (forecasting, churn)
- Q3: feature store, A/B framework
- Q4: governance, audit, multi-cloud failover

**TCO yr 1:** $1.8–2.4M.""",
},
54: {  # Quick Market Scan
    "outcome": "Top five players, market size + growth, key trends, recent news, and three deeper sources.",
    "sample_output": """**Top players** (mention only — sample shape, not real data)
1. Player A — incumbent, ~38% share, slow product velocity
2. Player B — pricing leader, growing in SMB
3. Player C — design-led challenger, last raised $80M
4. Player D — open-source play, strong dev community
5. Player E — vertical specialist (healthcare)

**Market:** ~$8.4B, CAGR 14%, fragmenting toward verticals.

**Trends:** consolidation in core, vertical land-grabs, AI-overlay pricing power.

**Read deeper:** [Gartner MQ] · [a16z thesis] · [recent Stratechery piece].""",
},
55: {  # Deep Dive Report
    "outcome": "A full market analysis: exec summary, structure, top-5 competitor profiles, trends, opportunities, risks, and recommendations.",
    "sample_output": """**Executive summary**
- Market: $12.4B, growing 11% CAGR
- Top-3 control 54%; long tail of 200+ players
- The decisive shift is from horizontal SaaS to vertical AI; budget will follow the workflow, not the tool

**Competitor profiles** (sample of one)
> **Player A** — Founded 2014, ~$320M ARR. Strengths: brand + channel. Weaknesses: legacy data model, slow on AI. Strategic moves: hired ex-Snowflake CRO, opened London office. Threat to us: medium — they're 18 months behind on AI but have the customer base.

**Recommendation:** focus enterprise GTM on three verticals where AI maturity differential is widest.""",
},
56: {  # Competitor Profile
    "outcome": "A complete intelligence brief: company overview, portfolio, pricing, position, strengths/weaknesses, recent moves, financials, and threat level.",
    "sample_output": """**Overview** — Founded 2017. ~620 FTEs. PE-backed (Series D, last priced 2024). HQ Austin, eng team in Krakow.

**Portfolio:** one flagship product, three adjacent SKUs (analytics, audit, compliance).

**Pricing:** $99 / $249 / Enterprise (call). 14-day trial, no card.

**Strengths:** integrations breadth, partner channel.
**Weaknesses:** product velocity (~6 releases/yr), thin data-science chops.

**Recent moves:** acquired a 12-person ML team (Q2), launched a free tier (Q3).

**Threat level:** HIGH on SMB segment, LOW on enterprise.""",
},
57: {  # Competitive Monitoring System
    "outcome": "An automated CI system spec: data sources, scraping infrastructure, analysis pipeline, alerts, and report templates.",
    "sample_output": """**Sources**
- Website diff: weekly snapshot, HTML diff with semantic noise filter
- Pricing pages: daily check (specific selectors)
- Job boards: Greenhouse/Lever scrape + keyword classifier
- Patents: USPTO RSS by competitor name
- Reviews: G2 / Capterra weekly pull

**Pipeline**
```
Source → Raw store (S3) → Classifier (LLM)
   → Significance scorer → Slack / Email
```

**Alerts:** major change = pricing ±5%, exec hire, M&A rumour, raise announcement.

**Weekly brief:** auto-generated Notion page Fri 09:00.""",
},
58: {  # Process Documentation
    "outcome": "A step-by-step guide with checkpoints, a troubleshooting section, a scannable format, and a storage recommendation.",
    "sample_output": """**Doc structure**
1. Who this is for (1 line)
2. Prerequisites (3–5 bullets)
3. Steps (numbered, screenshot every 3rd)
4. Verification checklist
5. Troubleshooting (top 5 issues)
6. Glossary
7. Last updated + owner

**Tone:** imperative, second person — "Open the file" not "The user opens the file".

**Where to store:** if it's product → docs site (Mintlify); if it's internal → Notion (one page per process, linked from a process index).""",
},
59: {  # Technical Documentation
    "outcome": "A complete tech doc set: overview + architecture, setup, API reference, examples, troubleshooting, FAQ, and changelog template — Markdown-ready.",
    "sample_output": """**Skeleton**
```
docs/
  README.md          # overview + diagram
  install.md         # platforms, prerequisites
  api/
    endpoints.md     # generated from OpenAPI
    auth.md
  examples/
    quickstart.md
    advanced.md
  troubleshooting.md
  faq.md
  changelog.md
```

**API reference (sample entry)**
```
### POST /v1/jobs
Create a new job. Idempotent on `Idempotency-Key` header.

**Body:** { kind: string, payload: object }
**Returns:** 201 + { id, status_url }
**Errors:** 400 (invalid kind), 409 (duplicate key)
```""",
},
60: {  # Documentation Platform
    "outcome": "An info architecture, tool selection + setup, writing standards, maintenance process, and migration plan.",
    "sample_output": """**IA (3 trees)**
1. Get started (onboarding) — < 5 min reads
2. How-to (task-oriented) — recipe format
3. Reference (deep) — searchable, structured

**Stack:** Mintlify / Docusaurus → GitHub → Vercel · Algolia search · Plausible analytics.

**Standards**
- Active voice, second person
- Sentence case headings
- Every page: who-it's-for + outcome at top
- Code blocks always copy-pasteable, no shell prompts

**Maintenance:** quarterly stale-page sweep; PR template enforces the standard.""",
},
61: {  # Slide Content
    "outcome": "A title + 3–5 section outline, speaker notes, suggested visuals/charts, a recommended slide count, and opening + closing statements.",
    "sample_output": """**Outline (15 min)**
- Title — "Why we should bet on X"
- Section 1 — The shift (3 slides, 4 min)
- Section 2 — Our position (2 slides, 3 min)
- Section 3 — The wedge (3 slides, 5 min)
- Section 4 — Ask (1 slide, 2 min)
- Q&A (1 min)

**Open:** "I'm asking for one decision today, and I'll get to it in 12 minutes."

**Close:** "If we approve this, here's what we're doing next week. If we don't, here's what we'll regret."

**Recommended:** 10 slides. Less is more.""",
},
62: {  # Presentation Design
    "outcome": "A narrative arc, storyboard, viz recommendations, timed speaker notes, anticipated Q&A, and a handout.",
    "sample_output": """**Arc**
1. Setup — the world they know
2. Disruption — what's changed
3. Resolution — what we do about it
4. Ask — the decision

**Speaker notes (slide 4)**
> "Three numbers tell this story. The first is [X] — that's our baseline. The second is [Y] — that's the new reality. The third is [Z] — that's the gap we have to close."

**Anticipated Q1:** "Why now, not next year?" — A: 2-sentence answer + back-up slide ready.

**Handout:** 2-pager, exec summary front, FAQ back.""",
},
63: {  # Automated Presentation Generation
    "outcome": "An end-to-end data-to-deck system: architecture, template design, data-to-slide mapping, automation pipeline, and quality checks.",
    "sample_output": """**Pipeline**
```
Sources → SQL → DataFrame
   → Template engine (python-pptx + branded slide masters)
   → Narrative generator (LLM with structured prompt per slide)
   → QA pass (LLM critic + rule-based checks)
   → S3 + Slack delivery
```

**Slide mapping**
| Slide | Data query | Layout |
|---|---|---|
| 1 — Headline | revenue_summary.sql | KPI tile |
| 2 — Trend | revenue_monthly.sql | line chart |
| 3 — Variance | budget_var.sql | table + comment |

**QA:** every number must trace to a query hash; LLM critic checks for tone + cross-slide consistency.""",
},
64: {  # Email Templates
    "outcome": "Five reusable templates — initial outreach, follow-up, meeting request, thank-you, status update — short and actionable.",
    "sample_output": """**Initial outreach**
> Subject: [their company] × [your company] — quick idea
> Hi [name], saw [specific signal]. We help [people like them] do [specific outcome]. Worth a 15-min chat next week?

**Follow-up (after no reply)**
> Subject: bumping this up
> Hi [name], jumping back here. If now's a bad week, just let me know and I'll try again in [month].

**Meeting request**
> Subject: 20 min, [topic]?
> Goal: decide [X]. Tue 10am, Thu 2pm — what works?

**Thank-you**
> Thanks for the time. Three things I owe you: [...]. Talk [date].

**Status update**
> [Project] · [colour] · [1-line headline]. Wins: [...]. Risks: [...]. Asks: [...].""",
},
65: {  # Communication Strategy
    "outcome": "A core message, a 10-question FAQ, a comms timeline, channel-specific drafts, a resistance plan, and a feedback loop design.",
    "sample_output": """**Core message** (1 sentence)
> "We're moving [process] to [new tool] over the next 8 weeks so [outcome] — and we're keeping [thing they care about] exactly as it is."

**FAQ (sample 3 of 10)**
- Q: Why now? A: [specific reason + signal]
- Q: What changes for me? A: [day-1 impact, week-1 impact]
- Q: What if I disagree? A: [exact path + when]

**Timeline**
- Week 0: leader pre-brief
- Week 1: all-hands announcement + FAQ doc
- Week 2: 1:1s for top concerns
- Week 4: midpoint pulse survey
- Week 8: retro

**Feedback loop:** anonymous form + biweekly office hours; ship one visible change in response.""",
},
}


def enrich(item, idx):
    extras = CONTENT.get(idx, {})
    return {
        **item,
        "outcome": extras.get("outcome", item.get("best_for", "")),
        "inputs": extract_inputs(item["prompt"]),
        "tools": derive_tools(item),
        "est_time": derive_time(item),
        "output_kind": derive_output_kind(item),
        "sample_output": extras.get("sample_output", ""),
    }


def main():
    data = json.loads(SRC.read_text())
    enriched = [enrich(d, i) for i, d in enumerate(data)]
    SRC.write_text(json.dumps(enriched, indent=2, ensure_ascii=False))
    missing = sum(1 for d in enriched if not d["sample_output"])
    print(f"Enriched {len(enriched)} cases.")
    print(f"Sample outputs: {len(enriched) - missing}/{len(enriched)}")
    print(f"Tools coverage: {sum(1 for d in enriched if d['tools'])}/{len(enriched)}")


if __name__ == "__main__":
    main()
