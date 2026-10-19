"use strict";

const test = require("node:test");
const assert = require("node:assert");
const { gerarPdfJpeg } = require("../pdf.js");

const JPEG_FALSO = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0xff, 0xd9]);

function latin1(bytes) {
  return Buffer.from(bytes).toString("latin1");
}

test("gera um PDF válido com cabeçalho, trailer e EOF", () => {
  const pdf = gerarPdfJpeg(JPEG_FALSO, 800, 600, 600, 450);
  const bruto = latin1(pdf);

  assert.ok(pdf instanceof Uint8Array);
  assert.ok(bruto.startsWith("%PDF-1.4\n"));
  assert.ok(bruto.endsWith("%%EOF\n"));
  assert.ok(bruto.includes("/Subtype /Image"));
  assert.ok(bruto.includes("/Filter /DCTDecode"));
  assert.ok(bruto.includes("/MediaBox [0 0 600 450]"));
  assert.ok(bruto.includes("/Width 800 /Height 600"));
  assert.ok(bruto.includes(`/Length ${JPEG_FALSO.length} >>\nstream\n`));
});

test("embute os bytes JPEG sem alteração", () => {
  const pdf = gerarPdfJpeg(JPEG_FALSO, 10, 10, 7.5, 7.5);
  const inicio = pdf.findIndex(
    (_, i) =>
      pdf[i] === 0xff &&
      pdf[i + 1] === 0xd8 &&
      pdf[i + 2] === 0xff &&
      pdf[i + 3] === 0xe0
  );
  assert.ok(inicio > 0);
  assert.deepStrictEqual(Array.from(pdf.slice(inicio, inicio + JPEG_FALSO.length)), Array.from(JPEG_FALSO));
});

test("startxref aponta para a tabela xref", () => {
  const pdf = gerarPdfJpeg(JPEG_FALSO, 100, 100, 75, 75);
  const bruto = latin1(pdf);
  const referencia = bruto.match(/startxref\n(\d+)\n%%EOF/);
  assert.ok(referencia, "startxref ausente");
  const offset = Number(referencia[1]);
  assert.strictEqual(bruto.slice(offset, offset + 4), "xref");
});

test("cada entrada xref aponta para o início do objeto correspondente", () => {
  const pdf = gerarPdfJpeg(JPEG_FALSO, 100, 100, 75, 75);
  const bruto = latin1(pdf);
  const offsetXref = Number(bruto.match(/startxref\n(\d+)/)[1]);
  const tabela = bruto.slice(offsetXref).split("\n");
  const total = Number(tabela[1].split(" ")[1]);

  for (let i = 1; i < total; i++) {
    const offset = Number(tabela[2 + i].slice(0, 10));
    assert.strictEqual(bruto.slice(offset, offset + `${i} 0 obj`.length), `${i} 0 obj`, `objeto ${i}`);
  }
});

test("rejeita JPEG vazio e dimensões inválidas", () => {
  assert.throws(() => gerarPdfJpeg(new Uint8Array(0), 10, 10, 7.5, 7.5), /JPEG vazio/);
  assert.throws(() => gerarPdfJpeg(JPEG_FALSO, 0, 10, 7.5, 7.5), /Dimensões inválidas/);
  assert.throws(() => gerarPdfJpeg(JPEG_FALSO, 10, 10, 0, 7.5), /Dimensões inválidas/);
});
