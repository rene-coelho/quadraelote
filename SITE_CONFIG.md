# Quadra e Lote — Configuração do Site

Documento de referência para o desenvolvimento e manutenção do site `quadraelote.com.br`.
Atualizar sempre que uma página for alterada, adicionada ou removida.

---

## Valores globais configuráveis

```
WhatsApp:   553128881091
E-mail:     contato@quadraelote.com.br
Domínio:    quadraelote.com.br
Cidade:     Belo Horizonte, MG
Razão social: Quadra e Lote Negócios Imobiliários
Instagram:  @quadraelote.com.br
```

---

## Design system

```css
--obsidian: #15211f   /* estrutura e tipografia principal */
--petrol:   #1a3a5f   /* cor de marca */
--skyblue:  #60a8c9   /* acento em fundo escuro */
--offwhite: #FAFAF7   /* fundos claros */
--line:     #dedcd4   /* bordas e divisores */
--text-soft:#5a5a55   /* texto secundário */
--radius-sm: 4px
--radius-md: 6px
--maxw:      1180px
```

Fonte: **Inter** (Google Fonts) — corpo e títulos, sempre caixa baixa.
Ícones: **Font Awesome 6.5.1** via cdnjs — `fa-brands` para WhatsApp, `fa-solid` para demais.

---

## Mapa de páginas

### `index.html` — Home institucional
**Status:** pronto, aguardando deploy  
**URL:** `quadraelote.com.br`  
**Header:** completo (logo + nav + CTA)  
**Footer:** completo (3 colunas com âncoras internas)

Seções (em ordem):
| ID | Título | Conteúdo |
|----|--------|----------|
| `#hero` | — | Conceito "a identidade oficial do seu imóvel", 2 CTAs |
| `#sobre` | de onde vem o nome | Origem cadastral, concept box com 3 bullets |
| `#solucoes` | três caminhos para o seu imóvel | 3 cards: compra direta, crédito imobiliário, consórcio |
| `#como-funciona` | cada imóvel, sua própria identidade digital | 4 passos: auditoria → landing → QR code → lead |
| `#proprietarios` | seu imóvel merece uma identidade própria | Argumento + prova + modal de cadastro |

---

### `compra-direta.html` — Compra Direta
**Status:** pronto  
**URL:** `quadraelote.com.br/compra-direta`  
**Header:** reduzido (logo + nav soluções▾ + CTA)  
**Footer:** mínimo (copyright + voltar ao início)

Seções: hero · legitimação (mito vs realidade) · mecanismos jurídicos (dark) · perfis · papel da Q&L + aside CTA

---

### `credito-imobiliario.html` — Crédito Imobiliário
**Status:** pronto  
**URL:** `quadraelote.com.br/credito-imobiliario`  
**Header:** reduzido (logo + nav soluções▾ + CTA)  
**Footer:** mínimo (copyright + voltar ao início)

Conteúdo principal: simulador SAC com 4 bancos. Configurar no array `BANKS` no JS:

```javascript
const BANKS = [
  { id:'caixa',     name:'Caixa Econômica',  rate: 0.1119, table:'SAC', logo: '' },
  { id:'santander', name:'Santander',         rate: 0.1199, table:'SAC', logo: '' },
  { id:'itau',      name:'Itaú',              rate: 0.1219, table:'SAC', logo: '' },
  { id:'bradesco',  name:'Bradesco',          rate: 0.1350, table:'SAC', logo: '' },
];
```

**Pendente:**
- Preencher campo `logo` com caminho do arquivo de imagem de cada banco (ex: `/img/caixa.svg`)
- Revisar taxas periodicamente — movem com a Selic
- Configurar CTA WhatsApp pós-simulação (atualmente desabilitado)

---

### `consorcio.html` — Consórcio de Imóveis
**Status:** pronto  
**URL:** `quadraelote.com.br/consorcio`  
**Header:** reduzido (logo + nav soluções▾ + CTA)  
**Footer:** mínimo (copyright + voltar ao início)

Parceiro: **Ademicon Consórcio** (consultora credenciada — Caminho 1)  
CTA: WhatsApp com mensagem pré-preenchida (não simula na página — restrição regulatória)

---

### `obrigado-proprietario.html` — Confirmação de cadastro
**Status:** pronto  
**URL:** `quadraelote.com.br/obrigado-proprietario`  
**Header:** mínimo (só logo, sem nav)  
**Footer:** mínimo (copyright + voltar ao início)

Exibida após proprietário enviar formulário de cadastro. Contém card linkando para a landing da Santa Amélia como exemplo do modelo.

---

### `[nome-do-imovel].html` — Landing individual de imóvel
**Status:** template validado (Santa Amélia), aguardando carteira suficiente para replicar  
**URL:** `quadraelote.com.br/[nome-do-imovel]`  
**Header:** mínimo (logo clicável → home + botão WhatsApp)  
**Footer:** mínimo

Inclui breadcrumb: `quadra e lote → imóveis → [nome do imóvel]`  
Template de referência: `santa-amelia.html` (arquivo em conversa separada do projeto)

---

## Navegação (header)

### Home (`index.html`)
```
[logo → /]   sobre · soluções▾   [falar agora — WhatsApp]
```
Dropdown "soluções":
- compra direta → `/compra-direta`
- crédito imobiliário → `/credito-imobiliario`
- consórcio de imóveis → `/consorcio`

"Como funciona" e "proprietários" **não estão no menu** — são encontrados no scroll.

### Páginas de solução (`/compra-direta`, `/credito-imobiliario`, `/consorcio`)
```
[logo → /]   soluções▾   [falar agora — WhatsApp]
```
Mesmo dropdown. Sem "sobre", "como funciona" ou "proprietários" — exclusivos da home.

### Landings de imóvel e páginas mínimas
```
[logo → /]   [WhatsApp]
```
Sem nav. Logo clicável retorna à home.

---

## Footer

### Home — completo
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| sobre a marca → `#sobre` | (31) 2888-1091 | Quadra e Lote Negócios Imobiliários |
| soluções de aquisição → `#solucoes` | contato@quadraelote.com.br | Belo Horizonte, MG |
| como funciona → `#como-funciona` | | quadraelote.com.br |
| para proprietários → `#proprietarios` | | |

Links são âncoras — rolam a home, não abrem novas páginas.

### Demais páginas — mínimo
Copyright + link "voltar ao início" → `/`

---

## Conexões entre páginas

| De | Para | Via |
|----|------|-----|
| Home | Solução específica | Dropdown do nav ou card na seção #solucoes |
| Home | Landing de imóvel | Cards da seção de imóveis (a construir) |
| Páginas de solução | Home | Logo clicável no header |
| Páginas de solução | Outras soluções | Dropdown do nav |
| Landing de imóvel | Home | Logo + breadcrumb |
| Obrigado proprietário | Home | Link no footer mínimo |
| Obrigado proprietário | Santa Amélia | Card de exemplo no corpo |

---

## Hospedagem e deploy

- **Plataforma:** Vercel (via GitHub)
- **Repositório:** GitHub (clonar e push para deploy automático)
- **Domínio:** `quadraelote.com.br` — configurar DNS em Vercel → Settings → Domains
- **Status:** repositório configurado, push e conexão com Vercel pendentes

---

## Pendências abertas

| Item | Prioridade | Contexto |
|------|-----------|---------|
| Finalizar push GitHub + deploy Vercel | Alta | Git configurado, commit e push pendentes |
| Atualizar home: 3 cards em #solucoes + novo título | Alta | Seção ainda tem 2 cards e título "dois caminhos" |
| Atualizar menu home: remover "como funciona" e "proprietários" do nav | Alta | Definido na conversa de estrutura, não aplicado |
| Logos dos bancos em `/credito-imobiliario` | Média | Campo `logo` vazio no array BANKS |
| Taxas dos bancos — revisão periódica | Média | Movem com a Selic |
| CTA WhatsApp pós-simulação em `/credito-imobiliario` | Média | Intencionalmente deixado para configurar depois |
| Seção "imóveis em destaque" na home | Baixa | Aguarda carteira mínima de imóveis ativos |
| Replicar template de landing para outros imóveis | Baixa | Template validado com Santa Amélia |

---

## Notas técnicas importantes

**Google Maps JS API**
O Maps JS API limpa todos os filhos da div onde é inicializado. Botões sobrepostos (ex: "ver rua") devem estar em uma `div` irmã dentro de um wrapper — nunca filhos do container do mapa.

**WhatsApp Font Awesome**
Usar `fa-brands fa-whatsapp` — não `fa-solid fa-whatsapp`.

**Consórcio — restrição regulatória**
A Quadra e Lote não simula, não apresenta taxas nem promete prazos de contemplação. Toda simulação e contratação é feita pela Ademicon. O CTA de consórcio sempre aponta para WhatsApp, nunca para simulador próprio.

**Parcelamento direto — nota jurídica**
A página `/compra-direta` orienta sobre o mecanismo (cláusula resolutiva, alienação fiduciária, averbação) mas não presta consultoria jurídica. O CTA sempre direciona para conversa com a Quadra e Lote, que encaminha para advogado especializado.
