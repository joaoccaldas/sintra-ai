-- HoldingCo (ond.ai) / Sintra AI additive foundation, 2026-10-23.
-- Safe-by-default: no other app tables touched, no accounts/users created,
-- no newsletter emails dispatched and no automatic editorial publication.
-- Public prefixed tables are API-exposed only through explicit GRANT + RLS.
-- All internal agent data resides in an unexposed private schema.

create schema if not exists sintra_internal;
revoke all on schema sintra_internal from public, anon, authenticated;
grant usage on schema sintra_internal to service_role;

-- Members own their own private profile. Public display names can later be
-- projected onto approved projects by a dedicated privacy-reviewed endpoint.
create table if not exists public.sintra_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name varchar(80) not null check (char_length(btrim(display_name)) between 2 and 80),
  bio varchar(500) not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.sintra_profiles enable row level security;
revoke all on public.sintra_profiles from public, anon, authenticated;
grant select, insert, update on public.sintra_profiles to authenticated;
create policy sintra_profiles_own_read on public.sintra_profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy sintra_profiles_own_insert on public.sintra_profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy sintra_profiles_own_update on public.sintra_profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Roles are granted only by an audited server-side operation. No client may
-- INSERT, UPDATE or DELETE roles. Never use user-editable user_metadata.
create table if not exists public.sintra_editor_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('editor','moderator','admin')),
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id) on delete set null,
  primary key (user_id, role)
);
alter table public.sintra_editor_roles enable row level security;
revoke all on public.sintra_editor_roles from public, anon, authenticated;
grant select on public.sintra_editor_roles to authenticated;
create policy sintra_role_own_read on public.sintra_editor_roles
  for select to authenticated using ((select auth.uid()) = user_id);

-- Members can submit for moderation, but can NEVER self-publish a project.
create table if not exists public.sintra_projects (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  title varchar(140) not null check (char_length(btrim(title)) between 8 and 140),
  description text not null default '' check (char_length(description) <= 6000),
  topic varchar(64) not null default 'general',
  status text not null default 'draft' check (status in ('draft','submitted','published','rejected')),
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  published_at timestamptz,
  check (status <> 'published' or published_at is not null)
);
create index if not exists sintra_projects_author_idx on public.sintra_projects(author_id, created_at desc);
create index if not exists sintra_projects_public_idx on public.sintra_projects(published_at desc) where status='published';
alter table public.sintra_projects enable row level security;
revoke all on public.sintra_projects from public, anon, authenticated;
grant select on public.sintra_projects to anon, authenticated;
grant insert, update, delete on public.sintra_projects to authenticated;
create policy sintra_projects_public_read on public.sintra_projects
  for select to anon, authenticated using (status = 'published');
create policy sintra_projects_own_read on public.sintra_projects
  for select to authenticated using ((select auth.uid()) = author_id);
create policy sintra_projects_own_create on public.sintra_projects
  for insert to authenticated with check (
    (select auth.uid()) = author_id and status = 'draft'
    and submitted_at is null and published_at is null
  );
create policy sintra_projects_own_edit_draft on public.sintra_projects
  for update to authenticated using (
    (select auth.uid()) = author_id and status = 'draft'
  ) with check (
    (select auth.uid()) = author_id
    and status in ('draft','submitted') and published_at is null
  );
create policy sintra_projects_own_delete_draft on public.sintra_projects
  for delete to authenticated using (
    (select auth.uid()) = author_id and status = 'draft'
  );

-- Public comments require moderation; community input does not become
-- visible to everyone just because an account is authenticated.
create table if not exists public.sintra_comments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.sintra_projects(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 2 and 2000),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  check (status <> 'approved' or approved_at is not null)
);
create index if not exists sintra_comments_project_idx on public.sintra_comments(project_id, created_at desc);
alter table public.sintra_comments enable row level security;
revoke all on public.sintra_comments from public, anon, authenticated;
grant select on public.sintra_comments to anon, authenticated;
grant insert on public.sintra_comments to authenticated;
create policy sintra_comments_public_read on public.sintra_comments
  for select to anon, authenticated using (
    status = 'approved' and exists (
      select 1 from public.sintra_projects p
      where p.id = project_id and p.status = 'published'
    )
  );
create policy sintra_comments_own_read on public.sintra_comments
  for select to authenticated using ((select auth.uid()) = author_id);
create policy sintra_comments_submit on public.sintra_comments
  for insert to authenticated with check (
    (select auth.uid()) = author_id and status = 'pending'
    and approved_at is null and exists (
      select 1 from public.sintra_projects p
      where p.id = project_id and p.status = 'published'
    )
  );

-- Published source-linked editorial: public GET is allowed, but a client
-- cannot create or update news, translations or review status.
create table if not exists public.sintra_stories (
  id uuid primary key default gen_random_uuid(),
  canonical_source_url text not null check (canonical_source_url ~ '^https://'),
  source_publisher text not null check (char_length(source_publisher) between 2 and 120),
  geography text not null check (geography in ('BR','WORLD')),
  source_published_at timestamptz,
  status text not null default 'draft' check (status in ('draft','in_review','published','retracted')),
  original_revision text not null default '',
  created_at timestamptz not null default now(),
  published_at timestamptz,
  check (status <> 'published' or published_at is not null)
);
create index if not exists sintra_stories_public_idx on public.sintra_stories(geography,published_at desc) where status='published';
alter table public.sintra_stories enable row level security;
revoke all on public.sintra_stories from public, anon, authenticated;
grant select on public.sintra_stories to anon, authenticated;
create policy sintra_stories_published_read on public.sintra_stories
  for select to anon, authenticated using (status='published');

create table if not exists public.sintra_story_locales (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.sintra_stories(id) on delete cascade,
  locale text not null check (locale in ('pt-BR','en')),
  headline varchar(220) not null check (char_length(btrim(headline)) between 8 and 220),
  summary text not null check (char_length(summary) between 20 and 2400),
  why_it_matters text not null default '',
  what_to_try text not null default '',
  article_markdown text not null default '',
  source_revision text not null,
  editorial_status text not null default 'draft' check (editorial_status in ('draft','reviewed','published')),
  reviewed_at timestamptz,
  published_at timestamptz,
  unique(story_id,locale),
  check (editorial_status <> 'published' or (reviewed_at is not null and published_at is not null))
);
create index if not exists sintra_story_locales_public_idx on public.sintra_story_locales(locale,published_at desc) where editorial_status='published';
alter table public.sintra_story_locales enable row level security;
revoke all on public.sintra_story_locales from public, anon, authenticated;
grant select on public.sintra_story_locales to anon, authenticated;
create policy sintra_story_locales_published_read on public.sintra_story_locales
  for select to anon, authenticated using (
    editorial_status='published' and exists (
      select 1 from public.sintra_stories s
      where s.id=story_id and s.status='published'
    )
  );

-- Internal source discovery, ingestion, workflow orchestration and subscriber
-- email addresses are not exposed through the public Data API.
create table if not exists sintra_internal.sources (
  id text primary key,
  publisher text not null,
  feed_url text not null check (feed_url ~ '^https://'),
  region text not null check (region in ('BR','WORLD')),
  language text not null default 'pt-BR',
  is_active boolean not null default true,
  last_success_at timestamptz,
  last_checked_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists sintra_internal.ingest_items (
  id uuid primary key default gen_random_uuid(),
  source_id text not null references sintra_internal.sources(id),
  canonical_url text not null check (canonical_url ~ '^https://'),
  title text not null,
  publisher_excerpt text not null default '',
  source_published_at timestamptz,
  retrieved_at timestamptz not null default now(),
  raw_metadata jsonb not null default '{}'::jsonb,
  unique(source_id,canonical_url)
);
create index if not exists sintra_ingest_newest_idx on sintra_internal.ingest_items(retrieved_at desc);

create table if not exists sintra_internal.content_jobs (
  id uuid primary key default gen_random_uuid(),
  job_kind text not null check (job_kind in ('news','translation','article','research','newsletter')),
  status text not null default 'queued' check (status in ('queued','running','needs_review','approved','published','failed','cancelled')),
  idempotency_key text not null unique,
  target_id uuid,
  input_manifest jsonb not null default '{}'::jsonb,
  evidence_manifest jsonb not null default '{}'::jsonb,
  output_revision text,
  approved_revision text,
  model_id text,
  input_tokens integer not null default 0 check (input_tokens >= 0),
  output_tokens integer not null default 0 check (output_tokens >= 0),
  cost_usd numeric(12,6) not null default 0 check (cost_usd >= 0),
  error_code text,
  created_at timestamptz not null default now(),
  finished_at timestamptz,
  check (status not in ('approved','published') or
         (output_revision is not null and approved_revision=output_revision))
);
create index if not exists sintra_jobs_review_idx on sintra_internal.content_jobs(status,created_at desc);

create table if not exists sintra_internal.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email) and email like '%@%' and char_length(email) <= 254),
  language text not null default 'pt-BR' check (language in ('pt-BR','en')),
  consent_status text not null default 'pending' check (consent_status in ('pending','confirmed','unsubscribed')),
  consent_version text not null,
  consent_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  verification_token_hash text,
  created_at timestamptz not null default now(),
  check (consent_status <> 'confirmed' or confirmed_at is not null)
);
create index if not exists sintra_newsletter_active_idx
  on sintra_internal.newsletter_subscriptions(language,confirmed_at) where consent_status='confirmed';

-- Private schema: no public exposure even if project Data API defaults change.
alter table sintra_internal.sources enable row level security;
alter table sintra_internal.ingest_items enable row level security;
alter table sintra_internal.content_jobs enable row level security;
alter table sintra_internal.newsletter_subscriptions enable row level security;
revoke all on all tables in schema sintra_internal from public, anon, authenticated;
grant all on all tables in schema sintra_internal to service_role;
-- No permissive policies: roles anon and authenticated cannot see internal rows.

-- Future ond.ai products may add their own prefixed tables and private schemas;
-- never use the Sintra content grants as a template for financial/business data.
