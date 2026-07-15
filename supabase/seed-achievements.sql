-- HuskOS — seed achievements catalog (public read reference data).
-- Run after tables exist. These are shared definitions, not user-owned rows.

insert into public.achievements (id, code, name, description, xp_reward) values
  (gen_random_uuid(), 'first_focus',   'First Focus',    'Complete your first Pomodoro session.', 50),
  (gen_random_uuid(), 'streak_7',      'Week Warrior',   'Maintain a 7-day habit streak.',        150),
  (gen_random_uuid(), 'ten_tasks',     'Getting Things Done', 'Complete 10 tasks.',              100),
  (gen_random_uuid(), 'night_owl',     'Night Owl',      'Study after midnight.',                 75),
  (gen_random_uuid(), 'goal_crusher',  'Goal Crusher',   'Complete your first goal.',            200)
on conflict (code) do nothing;

alter table public.achievements enable row level security;
create policy "achievements are readable" on public.achievements for select using (true);
