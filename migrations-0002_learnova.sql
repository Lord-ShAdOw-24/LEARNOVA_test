-- Learnova per-user academic state (profiles, wallet, quiz bests, unlocks)

create table if not exists profiles (
  user_id text primary key,
  role text not null default 'student',
  username text,
  real_name text,
  school text,
  class_level text,
  subjects text,
  region text,
  city text,
  kyc_status text not null default 'none',
  credits integer not null default 50,
  premium_tier text not null default 'none',
  referral_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quiz_attempts (
  id serial primary key,
  user_id text not null,
  category text not null,
  subject text not null,
  difficulty text not null,
  score integer not null,
  total integer not null,
  percent integer not null,
  rank text not null,
  duration_ms integer not null,
  created_at timestamptz not null default now()
);
create index if not exists quiz_attempts_user_id_idx on quiz_attempts (user_id);
create index if not exists quiz_attempts_category_idx on quiz_attempts (category, percent desc);

create table if not exists unlocks (
  user_id text not null,
  resource_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, resource_id)
);

create table if not exists transactions (
  id serial primary key,
  user_id text not null,
  kind text not null,
  amount integer not null,
  method text,
  status text not null,
  label text not null,
  created_at timestamptz not null default now()
);
create index if not exists transactions_user_id_idx on transactions (user_id);

create table if not exists lai_messages (
  id serial primary key,
  user_id text not null,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists lai_messages_user_id_idx on lai_messages (user_id, created_at);

create table if not exists class_enrollments (
  user_id text not null,
  class_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, class_id)
);
