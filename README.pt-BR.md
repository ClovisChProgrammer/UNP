# UNT — Ultimate Note Pad · Manual (Português - Brasil)

[English](README.md) · **Português (BR)** · [Español](README.es.md)

![Versão](https://img.shields.io/badge/vers%C3%A3o-0.5.1-blue)
![Chrome](https://img.shields.io/badge/Chrome-114%2B-4285F4?logo=googlechrome&logoColor=white)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)
![Offline](https://img.shields.io/badge/100%25-offline-brightgreen)

**Bloco de rascunhos à caneta no painel lateral do Chrome.** Notas rápidas, cálculos
matemáticos e desenhos com sua caneta digital — sem contas, sem nuvem, sem rastreamento.

---

## Sobre

O **UNT (Ultimate Note Pad)** é uma extensão para navegadores baseados no Chrome que
transforma o painel lateral em um bloco de papel digital: escreva com a caneta do seu
tablet, apague, desfaça e exporte como imagem. Tudo acontece **localmente no seu
computador** — nenhum dado sai dele.

Feito para quem tem uma **caneta digital (stylus) ligada ao PC** e quer anotar qualquer
coisa em 2 segundos, sem abrir outro programa.

## Recursos

- **Painel lateral com toggle** — clique no ícone da extensão para abrir/fechar
- **Escrita à mão com pressão** — a espessura do traço varie conforme a pressão da caneta
- **Palm rejection** — a palma da mão/tocaço não apaga nem desenha enquanto a caneta está em uso
- **Tela cheia** — botão *↗ Tela cheia* ou atalho `Ctrl+Shift+U` abre o editor em aba própria
- **Caixa de texto** — botão *Texto* mostra uma área para datilografar notas (Ctrl+Z desfaz dentro dela)
- **Ferramentas essenciais** — 3 cores, 2 espessuras, borracha, desfazer (`Ctrl+Z`) e limpar
- **Export em 4 formatos** — `PNG`, `JPG`, `PDF` (página única) e `TXT` (o texto digitado), todos com um clique
- **Rascunho salvo automaticamente** — o que você escreve ou digita fica guardado e volta ao reabrir o Chrome
- **OCR offline (experimental)** — reconhece o texto do desenho sem enviar nada para a nuvem (Tesseract embutido)
- **100% offline** — funciona sem internet; nenhum dado é coletado ou enviado

## Requisitos

- Google Chrome 114 ou superior (ou Chromium/Edge/Vivaldi equivalentes)
- Um tablet com caneta é opcional — mouse também funciona

## Instalação (modo desenvolvedor)

1. Baixe ou clone este repositório para uma pasta fixa do seu computador
2. Abra `chrome://extensions` na barra de endereços
3. Ative o **Modo do desenvolvedor** (interruptor no canto superior direito)
4. Clique em **Carregar descompactada** e selecione a pasta do projeto
5. Pronto — o ícone do UNT aparece na barra de ferramentas do Chrome

> **Dica:** não apague a pasta depois de instalar — o Chrome carrega a extensão dela.
> Para atualizar, baixe a nova versão e clique em *Atualizar* no card da extensão.

## Uso

| Ação | Como fazer |
|------|-----------|
| Abrir/fechar o bloco | Clique no ícone do UNT na toolbar |
| Escrever | Toque com a caneta no painel (ou clique com o mouse) |
| Trocar cor/espessura | Botões na barra de ferramentas |
| Apagar | **Borracha** (apaga sem apagar o restante) |
| Desfazer | **Desfazer** ou `Ctrl+Z` |
| Limpar tudo | **Limpar** (também desfazível com `Ctrl+Z`) |
| Tela cheia | Botão **↗ Tela cheia** ou `Ctrl+Shift+U` |
| Digitar texto | Botão **Texto** (mostra a área de texto) |
| Baixar o texto como TXT | Botão **TXT** |
| Baixar o desenho como PDF | Botão **PDF** (página única) |
| Baixar imagem | Botões **PNG** ou **JPG** |
| Apagar o rascunho salvo | Botão **Apagar rascunho** (zera a tela e não volta sozinho) |
| Reconhecer o texto do desenho | Botão **OCR** (abre o painel com o texto reconhecido) |

**Tela cheia:** se o painel está aberto com um desenho (e/ou texto), ao entrar na aba o
conteúdo é **copiado uma vez** para a tela cheia (aviso aparece no rodapé). Depois disso,
painel e aba seguem independentes — desenhar em um não altera o outro.

O atalho `Ctrl+Shift+U` pode ser reconfigurado em `chrome://extensions/shortcuts`.

**Salvamento automático:** o desenho e o texto são salvos sozinhos (com um pequeno
atraso) e restaurados quando você reabre o painel ou o Chrome. Não há botão "Salvar" —
escreva e esqueça. O botão **Apagar rascunho** limpa a tela **e** o que estava guardado.

**OCR (experimental):** o botão **OCR** reconhece o texto do desenho usando o motor
Tesseract **embutido na extensão** — o processamento é 100% local, nada é enviado.
O painel mostra o texto, a confiança estimada e botões **Copiar** e **→ Texto** (envia
para a caixa de texto). Funciona bem com **texto impresso e letra de forma (bloco)**;
**escrita cursiva conectada tem baixa precisão** (limitação do próprio Tesseract, não da
extensão). Sempre revise o resultado antes de usar.

## Privacidade

- **Zero coleta de dados.** A extensão não envia nada para servidores — não há servidor
- **100% offline.** Nenhuma permissão de rede, nenhum rastreamento, nenhum cookie
- Permissões usadas: `sidePanel` (painel lateral) e `storage` (guardar preferências locais)
- Seus rascunhos ficam **apenas no seu navegador** (`chrome.storage.local`) — nada vai para a nuvem
- O OCR roda no seu computador com o motor Tesseract embutido — **nenhuma imagem é enviada**
- O código é aberto — audite à vontade

## Limitações conhecidas (v0.5.1)

- Ao redimensionar o painel, o desenho fica no canto superior esquerdo sem distorção
- A caixa de texto é uma "camada" sobre a parte inferior do desenho (não divide a tela)
- O PDF é uma página com a imagem do desenho (não selecionável)
- Rascunhos muito grandes (acima de ~8 MB) não são salvos — exporte como imagem nesse caso
- **OCR:** excelente em texto impresso e letra de forma; **ruim em cursivo conectado**
  e **não lê símbolos matemáticos** (`+`, `^`, `=` não existem no modelo — limitação do
  Tesseract, não é bug). O primeiro OCR carrega o motor (~1–2 s).
  Veja o [ADR-0001](docs/adr/0001-limites-do-ocr.md) para a análise completa.

## Roadmap

- [x] Painel lateral com caneta e pressão
- [x] Tela cheia em aba (`Ctrl+Shift+U`)
- [x] Export TXT e PDF
- [x] Salvar rascunhos (automático, com restaurar ao reabrir)
- [x] OCR offline do desenho (Tesseract embutido; impresso/bloco)
- [ ] Publicação na Chrome Web Store

## Licença

MIT — veja [LICENSE](LICENSE). Livre para usar, modificar e distribuir.
