-- Tabela: cadastro de proprietários (home)
create table if not exists leads_proprietarios (
  id uuid default gen_random_uuid() primary key,
  criado_em timestamptz default now(),
  nome text not null,
  telefone text not null,
  tipo_imovel text not null,
  endereco text not null,
  mensagem text
);

-- Tabela: agendamentos de visita (santa-amelia e futuras páginas)
create table if not exists agendamentos (
  id uuid default gen_random_uuid() primary key,
  criado_em timestamptz default now(),
  nome text not null,
  email text not null,
  telefone text not null,
  data_visita date not null,
  horario text not null,
  imovel text not null default 'santa-amelia',
  mensagem text
);

-- RLS: habilitar mas permitir insert público (anon pode inserir, não pode ler)
alter table leads_proprietarios enable row level security;
alter table agendamentos enable row level security;

create policy "insert_proprietarios" on leads_proprietarios
  for insert to anon with check (true);

create policy "insert_agendamentos" on agendamentos
  for insert to anon with check (true);
