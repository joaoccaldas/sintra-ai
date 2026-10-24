-- Sintra experimental, server-only inference quotas. No user notes stored.
-- No model/provider service is activated by this migration.
create table if not exists sintra_internal.model_usage_daily (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_day date not null,
  calls integer not null default 0 check (calls >= 0),
  primary key (user_id, usage_day)
);
create table if not exists sintra_internal.model_usage_global_daily (
  usage_day date primary key,
  calls integer not null default 0 check (calls >= 0)
);
alter table sintra_internal.model_usage_daily enable row level security;
alter table sintra_internal.model_usage_global_daily enable row level security;
revoke all on sintra_internal.model_usage_daily from public, anon, authenticated;
revoke all on sintra_internal.model_usage_global_daily from public, anon, authenticated;
grant select, insert, update on sintra_internal.model_usage_daily to service_role;
grant select, insert, update on sintra_internal.model_usage_global_daily to service_role;

-- Called only by a trusted authenticated Edge Function through admin client.
-- Restricted privileges and explicit search_path; user cannot call from browser.
create or replace function public.sintra_reserve_model_quota(
  p_user_id uuid,
  p_daily_limit integer default 5,
  p_global_limit integer default 100
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_day date := (now() at time zone 'UTC')::date;
  v_global integer;
  v_user integer;
  v_user_cap integer := least(greatest(p_daily_limit,0),5);
  v_global_cap integer := least(greatest(p_global_limit,0),100);
begin
  if p_user_id is null or v_user_cap = 0 or v_global_cap = 0 then
    return false;
  end if;

  insert into sintra_internal.model_usage_global_daily(usage_day,calls)
    values (v_day,0) on conflict (usage_day) do nothing;
  select calls into v_global from sintra_internal.model_usage_global_daily
    where usage_day = v_day for update;
  if v_global >= v_global_cap then return false; end if;

  insert into sintra_internal.model_usage_daily(user_id,usage_day,calls)
    values(p_user_id,v_day,0) on conflict (user_id,usage_day) do nothing;
  select calls into v_user from sintra_internal.model_usage_daily
    where user_id=p_user_id and usage_day=v_day for update;
  if v_user >= v_user_cap then return false; end if;

  update sintra_internal.model_usage_daily
    set calls = calls + 1 where user_id=p_user_id and usage_day=v_day;
  update sintra_internal.model_usage_global_daily
    set calls = calls + 1 where usage_day=v_day;
  return true;
end;
$$;

revoke all on function public.sintra_reserve_model_quota(uuid,integer,integer) from public, anon, authenticated;
grant execute on function public.sintra_reserve_model_quota(uuid,integer,integer) to service_role;
