-- INVITO starter schema for Supabase/PostgreSQL.
-- Review policies and test with a separate non-production project before launch.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  description text not null default '',
  price_iqd integer not null check (price_iqd >= 0),
  theme text not null default 'classic',
  preview_image text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references public.templates(id),
  public_slug text unique not null,
  event_type text not null,
  host_names text not null,
  event_date date,
  event_time time,
  venue text,
  address text,
  message text,
  rsvp_enabled boolean not null default true,
  status text not null default 'draft' check (status in ('draft','pending_payment','published','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  invitation_id uuid not null references public.invitations(id) on delete restrict,
  amount_iqd integer not null check (amount_iqd >= 0),
  currency text not null default 'IQD',
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  provider text not null,
  provider_transaction_id text,
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  amount_iqd integer not null check (amount_iqd >= 0),
  verified_at timestamptz,
  raw_event jsonb,
  created_at timestamptz not null default now(),
  unique(provider, provider_transaction_id)
);

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_name text not null,
  attendance text not null check (attendance in ('yes','no','maybe')),
  party_size integer not null default 1 check (party_size between 1 and 20),
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.greetings (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  sender_name text not null,
  message text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.templates enable row level security;
alter table public.invitations enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;
alter table public.guests enable row level security;
alter table public.greetings enable row level security;

-- Public can read active template catalog only.
drop policy if exists "active templates are public" on public.templates;
create policy "active templates are public" on public.templates for select using (is_active = true);

-- Authenticated customers can access only their own profile, invitations and orders.
drop policy if exists "profile owner reads own profile" on public.profiles;
create policy "profile owner reads own profile" on public.profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "profile owner updates own profile" on public.profiles;
create policy "profile owner updates own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "owner reads own invitations" on public.invitations;
create policy "owner reads own invitations" on public.invitations for select to authenticated using (auth.uid() = owner_id);
drop policy if exists "owner inserts own invitations" on public.invitations;
create policy "owner inserts own invitations" on public.invitations for insert to authenticated with check (auth.uid() = owner_id);
drop policy if exists "owner updates own invitations" on public.invitations;
create policy "owner updates own invitations" on public.invitations for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "owner reads own orders" on public.orders;
create policy "owner reads own orders" on public.orders for select to authenticated using (auth.uid() = owner_id);

-- Intentionally no public insert/read policies for payments, guests or greetings.
-- Add secure server-side RPC/API routes with rate limits, spam controls and public-slug validation.
-- Never expose the Supabase service role key in browser code.
