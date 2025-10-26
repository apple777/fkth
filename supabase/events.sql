-- supabase/events.sql
create table if not exists public.events (
  id bigint generated always as identity primary key,
  title text not null,
  date date not null,
  description text not null,
  image_url text,
  locale text not null default 'he' check (locale in ('he','en')),
  created_at timestamp with time zone default now()
);

alter table public.events enable row level security;
create policy "Public read events"
on public.events for select
to anon, authenticated
using (true);