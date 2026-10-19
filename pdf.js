(function (raiz, fabrica) {
  if (typeof module === "object" && module.exports) module.exports = fabrica();
  else raiz.UNT_PDF = fabrica();
})(typeof self !== "undefined" ? self : this, function () {
  const encoder = new TextEncoder();

  function texto(t) {
    return encoder.encode(t);
  }

  function juntar(partes) {
    let total = 0;
    for (const parte of partes) total += parte.length;
    const saida = new Uint8Array(total);
    let deslocamento = 0;
    for (const parte of partes) {
      saida.set(parte, deslocamento);
      deslocamento += parte.length;
    }
    return saida;
  }

  function numero(n) {
    const arredondado = Math.round(n * 100) / 100;
    return Number.isInteger(arredondado) ? String(arredondado) : arredondado.toFixed(2);
  }

  function gerarPdfJpeg(jpeg, larguraPx, alturaPx, larguraPt, alturaPt) {
    if (!(jpeg instanceof Uint8Array) || jpeg.length === 0) {
      throw new Error("JPEG vazio");
    }
    if (!(larguraPx > 0) || !(alturaPx > 0) || !(larguraPt > 0) || !(alturaPt > 0)) {
      throw new Error("Dimensões inválidas");
    }

    const w = numero(larguraPt);
    const h = numero(alturaPt);
    const conteudo = texto(`q\n${w} 0 0 ${h} 0 0 cm\n/Im0 Do\nQ\n`);

    const corpos = [
      null,
      texto("<< /Type /Catalog /Pages 2 0 R >>"),
      texto("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),
      texto(
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] ` +
          "/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>"
      ),
      juntar([
        texto(
          `<< /Type /XObject /Subtype /Image /Width ${larguraPx} /Height ${alturaPx} ` +
            `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`
        ),
        jpeg,
        texto("\nendstream"),
      ]),
      juntar([texto(`<< /Length ${conteudo.length} >>\nstream\n`), conteudo, texto("endstream")]),
    ];

    const partes = [];
    let tamanho = 0;
    const anotar = (bytes) => {
      partes.push(bytes);
      tamanho += bytes.length;
    };

    anotar(texto("%PDF-1.4\n"));
    anotar(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]));

    const deslocamentos = [];
    for (let i = 1; i < corpos.length; i++) {
      deslocamentos[i] = tamanho;
      anotar(texto(`${i} 0 obj\n`));
      anotar(corpos[i]);
      anotar(texto("\nendobj\n"));
    }

    const inicioXref = tamanho;
    let xref = `xref\n0 ${corpos.length}\n0000000000 65535 f \n`;
    for (let i = 1; i < corpos.length; i++) {
      xref += `${String(deslocamentos[i]).padStart(10, "0")} 00000 n \n`;
    }
    xref += `trailer\n<< /Size ${corpos.length} /Root 1 0 R >>\nstartxref\n${inicioXref}\n%%EOF\n`;
    anotar(texto(xref));

    return juntar(partes);
  }

  return { gerarPdfJpeg };
});
