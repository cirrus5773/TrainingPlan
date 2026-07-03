create table if not exists public.training_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.training_state enable row level security;

create policy "Users can read own training state"
on public.training_state
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own training state"
on public.training_state
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own training state"
on public.training_state
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
