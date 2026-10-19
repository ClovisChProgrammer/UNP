# UNT — Ultimate Note Pad

Extensão Chrome (Manifest V3) com bloco de rascunhos no **side panel** — notas rápidas e
cálculos à mão com caneta/stylus. Zero dependências, 100% local, sem rede.

## Instalar (modo desenvolvedor)

1. Abra `chrome://extensions`
2. Ative **Modo do desenvolvedor** (canto superior direito)
3. **Carregar descompactada** → selecione a pasta `D:\Extensão\UNT`
4. Clique no ícone UNT na toolbar → o painel lateral abre/fecha (toggle)

## Uso

- **Toggle:** clique no ícone da extensão (abre/fecha o painel)
- **Desenho:** caneta com pressão variável (espessura dinâmica), mouse também funciona;
  dedo é ignorado enquanto a caneta está tocando (palm rejection)
- **Ferramentas:** 3 cores (preto/azul/vermelho) · 2 espessuras · borracha · desfazer (Ctrl+Z) · limpar
- **Export:** botões `PNG` / `JPG` baixam `unt_AAAAMMDD_HHmmss.<ext>`

## Checklist de fumaça (v0.1.0)

- [ ] Extensão carrega em `chrome://extensions` sem erros vermelhos
- [ ] Clique no ícone abre o painel; clique de novo fecha
- [ ] Escrever com a caneta: traço aparece sem latência, espessura varia com a pressão
- [ ] Palma/dedo não desenha enquanto a caneta está em contato
- [ ] Cores e espessuras trocam; borracha apaga; Desfazer volta um traço; Ctrl+Z funciona
- [ ] Limpar esvazia e Ctrl+Z restaura
- [ ] PNG e JPG baixam com conteúdo visível (fundo branco)
- [ ] Redimensionar a largura do painel preserva o desenho (canto superior esquerdo)
- [ ] Fechar/reabrir o painel mantém o desenho (mesma sessão do Chrome)

## Estrutura

```
manifest.json    # MV3 — permissions: ["sidePanel"] (única)
background.js    # SW mínimo — openPanelOnActionClick (toggle pelo ícone)
sidepanel.html   # editor
sidepanel.css
sidepanel.js     # canvas + Pointer Events + undo + export
icons/           # 16/32/48/128
```

## Roadmap (fase 2 — decidido com o dono)

1. Modo aba em tela cheia (mesmo HTML — mais área para a caneta)
2. Export TXT (caixa de texto) + PDF (jsPDF local, MIT)
3. OCR manuscrito → texto (Tesseract.js **empacotado**, `workerBlobURL:false`, CSP
   `wasm-unsafe-eval`; rodar na página da extensão — nunca em content script)
4. Salvar rascunhos (`chrome.storage.local`)
5. Opcional: Handwriting Recognition API nativa (feature detection)

## Limitações conhecidas (v0.1)

- Sem histórico/persistência entre sessões (por decisão da v1)
- Ao redimensionar o painel, o desenho é preservado no canto superior esquerdo sem distorção
  (áreas novas ficam em branco)
- Qualidade de OCR manuscrito é **incerta** [INCERTO] — validar com escrita real antes de prometer
