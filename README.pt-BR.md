# UNT — Ultimate Note Pad · Manual (Português - Brasil)

[English](README.md) · **Português (BR)** · [Español](README.es.md)

![Versão](https://img.shields.io/badge/vers%C3%A3o-0.2.0-blue)
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
- **Ferramentas essenciais** — 3 cores, 2 espessuras, borracha, desfazer (`Ctrl+Z`) e limpar
- **Export PNG e JPG** — um clique baixa a imagem com nome e hora
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
| Baixar imagem | Botões **PNG** ou **JPG** |

**Tela cheia:** se o painel está aberto com um desenho, ao entrar na aba o desenho é
**copiado uma vez** para a tela cheia (aviso aparece no rodapé). Depois disso, painel e
aba seguem independentes — desenhar em um não altera o outro.

O atalho `Ctrl+Shift+U` pode ser reconfigurado em `chrome://extensions/shortcuts`.

## Privacidade

- **Zero coleta de dados.** A extensão não envia nada para servidores — não há servidor
- **100% offline.** Nenhuma permissão de rede, nenhum rastreamento, nenhum cookie
- Permissões usadas: `sidePanel` (painel lateral) e `storage` (guardar preferências locais)
- O código é aberto — audite à vontade

## Limitações conhecidas (v0.2)

- O desenho não é salvo entre sessões do Chrome (salvar rascunhos está no roadmap)
- Ao redimensionar o painel, o desenho fica no canto superior esquerdo sem distorção
- Export em PDF e OCR (texto manuscrito → texto) ainda não disponíveis

## Roadmap

- [x] Painel lateral com caneta e pressão
- [x] Tela cheia em aba (`Ctrl+Shift+U`)
- [ ] Export em TXT e PDF
- [ ] OCR manuscrito → texto (processado localmente)
- [ ] Salvar rascunhos entre sessões
- [ ] Publicação na Chrome Web Store

## Licença

MIT — veja [LICENSE](LICENSE). Livre para usar, modificar e distribuir.
