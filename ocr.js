(function (raiz, fabrica) {
  if (typeof module === "object" && module.exports) module.exports = fabrica();
  else raiz.UNT_OCR = fabrica();
})(typeof self !== "undefined" ? self : this, function () {
  const INK = 200; // limiar: pixel abaixo disso é considerado tinta

  function ehTinta(r, g, b, a) {
    if (a < 24) return false;
    return 0.299 * r + 0.587 * g + 0.114 * b < INK;
  }

  function limitesDeTinta(dados, largura, altura) {
    let minX = largura;
    let minY = altura;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < altura; y++) {
      for (let x = 0; x < largura; x++) {
        const i = (y * largura + x) * 4;
        if (ehTinta(dados[i], dados[i + 1], dados[i + 2], dados[i + 3])) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return null;
    return { minX, minY, maxX, maxY };
  }

  function prepararImagem(canvasOrigem, opcoes) {
    const opt = opcoes || {};
    const escala = Math.max(1, opt.escala || 2);
    const margem = Math.max(0, opt.margem == null ? 24 : opt.margem);

    const largura = canvasOrigem.width;
    const altura = canvasOrigem.height;
    if (largura < 2 || altura < 2) return { canvas: canvasOrigem, vazio: true, caixa: null };

    const ctxOrigem = canvasOrigem.getContext("2d", { willReadFrequently: true });
    let origem;
    try {
      origem = ctxOrigem.getImageData(0, 0, largura, altura);
    } catch {
      return { canvas: canvasOrigem, vazio: true, caixa: null };
    }

    const caixa = limitesDeTinta(origem.data, largura, altura);
    if (!caixa) return { canvas: canvasOrigem, vazio: true, caixa: null };

    const origemLargura = caixa.maxX - caixa.minX + 1;
    const origemAltura = caixa.maxY - caixa.minY + 1;
    const destinoLargura = Math.round(origemLargura * escala) + margem * 2;
    const destinoAltura = Math.round(origemAltura * escala) + margem * 2;
    const limite = 4096;
    const fatorLimite = Math.min(1, limite / destinoLargura, limite / destinoAltura);
    const escalaFinal = escala * fatorLimite;

    const destino = document.createElement("canvas");
    destino.width = Math.round(origemLargura * escalaFinal) + margem * 2;
    destino.height = Math.round(origemAltura * escalaFinal) + margem * 2;
    const ctxDestino = destino.getContext("2d", { willReadFrequently: true });
    ctxDestino.fillStyle = "#ffffff";
    ctxDestino.fillRect(0, 0, destino.width, destino.height);
    ctxDestino.imageSmoothingEnabled = true;
    ctxDestino.imageSmoothingQuality = "high";
    ctxDestino.drawImage(
      canvasOrigem,
      caixa.minX,
      caixa.minY,
      origemLargura,
      origemAltura,
      margem,
      margem,
      Math.round(origemLargura * escalaFinal),
      Math.round(origemAltura * escalaFinal)
    );

    const dados = ctxDestino.getImageData(0, 0, destino.width, destino.height);
    const px = dados.data;
    for (let i = 0; i < px.length; i += 4) {
      const nivel = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
      const v = nivel < INK ? 0 : 255;
      px[i] = v;
      px[i + 1] = v;
      px[i + 2] = v;
      px[i + 3] = 255;
    }
    ctxDestino.putImageData(dados, 0, 0);

    return { canvas: destino, vazio: false, caixa };
  }

  return { prepararImagem, limitesDeTinta, ehTinta, INK };
});
