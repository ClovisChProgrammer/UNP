# ADR-0001 — Limites do OCR no UNT (e por que não há "cognição matemática")

- **Status:** Aceito
- **Data:** 2026-10-19
- **Contexto do produto:** UNT — Ultimate Note Pad (extensão Chrome MV3, 100% offline)
- **Decisão relacionada:** encerrar a linha de investigação de OCR manuscrito/matemático

## Contexto

A extensão oferece OCR do desenho (v0.5.0) usando **Tesseract.js 7.0.0 embutido**
(`vendor/`), sem CDN, 100% local. Durante os testes surgiram duas expectativas que
precisavam de verificação empírica antes de virar promessa:

1. Ler **nomes / cursivo** corretamente (ex.: `Clóvis` sendo lido como `Clear`).
2. Ler **expressões matemáticas** (ex.: `2x+3^2=`).

Fizemos um PoC headless com o próprio pipeline vendorizado e depois avaliamos a
**Handwriting Recognition API** nativa do Chromium como alternativa.

## Evidência

### Tesseract (medido, não estimado)

| Entrada | Esperado | Obtido | Confiança |
|---|---|---|---|
| Texto impresso | Relatorio de vendas / Total 1234 reais | Relatorio de vendas Total 1234 reais | 93 |
| Letra de bloco | NOTA 42 OK | NOTA 42 OK | 95 |
| Cursivo | Anotacao rapida | ANoOtactao ra pi da | 59 |
| Equação `2x+3^2=` | 2x+3^2= | `2X+3"2=` (ou `372=`) | 0 |
| Nome cursivo | Clovis | Clovis | 90 |
| Nome cursivo longo | Clovis Charlanti | Clovis Charlot | 23 |
| Símbolos | a+b*c=d-e (x^2) | a+b*c=d-e (x"2) | 71 |

Achados do PoC:

- **`load_system_dawg`/`load_freq_dawg` desligados NÃO mudam nada** — desligar o
  dicionário (via `config` do `createWorker`; `setParameters` é ignorado para esses,
  conforme o próprio worker avisa) produziu saída idêntica byte a byte ao baseline.
- **A whitelist funciona** como filtro: com `tessedit_char_whitelist` só de dígitos,
  `NOTA 42 OK` virou `420`. Mas ela **não cria glifos inexistentes**.
- **`^`, `+`, `=` não existem no unicharset de `eng`/`por` (LSTM)** — o Tesseract é
  incapaz de emitir esses símbolos; ele substitui pelo glifo mais próximo ou apaga
  (`^` → nada / `7` / `"`). Isso é **limite do modelo**, não configuração.

### Handwriting Recognition API (Chromium)

| Requisito da API | Fato | Impacto no UNT |
|---|---|---|
| `createHandwritingRecognizer` | Existe desde Chromium 99 | — |
| Entrada | **Apenas ink online** (traços), não imagem | Nosso canvas exporta PNG achatado → incompatível para recuperar o já desenhado |
| Contexto | **Só HTTPS + top-level browsing context** (`SecureContext`) | O editor roda em `chrome-extension://` → **fora do escopo da API** |
| Idiomas (ChromeOS) | **Só `en`** + gesto `zxx-x-gesture` | Sem português |
| Tipos | `text / email / number / per-character` | **Sem matemática** em nenhuma plataforma web |
| Windows | Depende do **Windows Ink (UWP)** expor o modelo | Indisponível no desktop comum |

### Alternativas que funcionariam

| Solução | Lê cursivo? | Lê math? | 100% local/grátis? | Veredito |
|---|---|---|---|---|
| Tesseract (atual) | ruim | não | sim | mantido p/ impresso/bloco |
| Handwriting API nativa | sim (só `en`) | não | sim, mas indisponível no contexto | inviável |
| MyScript / Mathpix | sim | sim | **não** (nuvem, pago, fechado) | viola princípios do projeto |
| HTR math open-source | parcial | parcial | incerto + modelo pesado | fora de escopo |

## Decisão

**Encerrar a linha de investigação de OCR manuscrito e matemático.** O UNT:

- Mantém o OCR **offline via Tesseract**, posicionado honestamente para
  **texto impresso e letra de bloco**.
- **Não** promete leitura de cursivo conectado nem de símbolos matemáticos — não há
  caminho **grátis + offline + local + em extensão** que entregue isso hoje.
- Documenta os limites nas três versões do README (EN/PT-BR/ES).

## Consequências

- **Positivas:** expectativa do usuário calibrada pela verdade; nenhuma dependência de
  nuvem adicionada; nenhum peso extra; foco liberado para publicação.
- **Negativas:** cursivo e matemática seguem não suportados. Se algum dia surgir um
  modelo HTR pequeno, offline e livre, esta ADR deve ser revisada.
- **Não** se adota whitelist restritiva por padrão nesta versão: o ganho em texto
  corrido é pequeno e há risco de descartar acentos; fica registrado como opção futura.

## Como reproduçamos esta verificação

PoC em `%TEMP%\opencode` (fora do repo): `ocr-tune.js` (matriz de variantes) e
`ocr-headless.js` (worker Node apontando para o `vendor/` local). Scripts de geração
de imagem via `System.Drawing`. Uma futura reavaliação deve repetir estes dois eixos:
(i) saída do Tesseract com/sem whitelist, e (ii) disponibilidade real da Handwriting API
via `queryHandwritingRecognizer`/`createHandwritingRecognizer` no contexto de extensão.
