-- HuskOS — Row Level Security policies
-- Run this in the Supabase SQL editor AFTER `prisma db push` has created the tables.
-- Every table is scoped so a user can only read/write their own rows.

-- 1. Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.settings (id, profile_id)
  values (gen_random_uuid(), new.id)
  on conflict (profile_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Enable RLS on every user-owned table.
alter table public.profiles           enable row level security;
alter table public.settings           enable row level security;
alter table public.subjects           enable row level security;
alter table public.tasks              enable row level security;
alter table public.folders            enable row level security;
alter table public.notes              enable row level security;
alter table public.habits             enable row level security;
alter table public.habit_logs         enable row level security;
alter table public.goals              enable row level security;
alter table public.study_sessions     enable row level security;
alter table public.calendar_events    enable row level security;
alter table public.resources          enable row level security;
alter table public.user_achievements  enable row level security;

-- 3. Profile: a user can see/update only their own profile.
create policy "own profile - select" on public.profiles for select using (auth.uid() = id);
create policy "own profile - update" on public.profiles for update using (auth.uid() = id);

-- 4. Settings.
create policy "own settings" on public.settings
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- 5. Generic owner policies for the profile_id-scoped tables.
create policy "own subjects"        on public.subjects        for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own tasks"           on public.tasks           for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own folders"         on public.folders         for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own notes"           on public.notes           for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own habits"          on public.habits          for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own goals"           on public.goals           for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own study_sessions"  on public.study_sessions  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own calendar_events" on public.calendar_events for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own resources"       on public.resources       for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "own achievements"    on public.user_achievements for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- 6. habit_logs are scoped through the parent habit.
create policy "own habit_logs" on public.habit_logs
  for all using (
    exists (select 1 from public.habits h where h.id = habit_logs.habit_id and h.profile_id = auth.uid())
  )
  with check (
    exists (select 1 from public.habits h where h.id = habit_logs.habit_id and h.profile_id = auth.uid())
  );
