"use strict";

const test = require("node:test");
const assert = require("node:assert");
const { limitesDeTinta, ehTinta } = require("../ocr.js");

function imagemBranca(largura, altura) {
  const dados = new Uint8ClampedArray(largura * altura * 4);
  for (let i = 0; i < dados.length; i += 4) {
    dados[i] = 255;
    dados[i + 1] = 255;
    dados[i + 2] = 255;
    dados[i + 3] = 255;
  }
  return dados;
}

function pintar(dados, largura, x, y, cor) {
  const i = (y * largura + x) * 4;
  dados[i] = cor[0];
  dados[i + 1] = cor[1];
  dados[i + 2] = cor[2];
  dados[i + 3] = cor[3];
}

test("ehTinta reconhece pixels escuros opacos", () => {
  assert.strictEqual(ehTinta(0, 0, 0, 255), true);
  assert.strictEqual(ehTinta(255, 255, 255, 255), false);
  assert.strictEqual(ehTinta(0, 0, 0, 0), false, "transparente não é tinta");
  assert.strictEqual(ehTinta(21, 101, 192, 255), true, "azul escuro é tinta");
});

test("limitesDeTinta retorna null para canvas em branco", () => {
  const dados = imagemBranca(20, 20);
  assert.strictEqual(limitesDeTinta(dados, 20, 20), null);
});

test("limitesDeTinta enquadra a caixa exata do conteúdo", () => {
  const largura = 20;
  const altura = 20;
  const dados = imagemBranca(largura, altura);
  pintar(dados, largura, 5, 8, [0, 0, 0, 255]);
  pintar(dados, largura, 12, 8, [0, 0, 0, 255]);
  pintar(dados, largura, 5, 14, [0, 0, 0, 255]);

  const caixa = limitesDeTinta(dados, largura, altura);
  assert.deepStrictEqual(caixa, { minX: 5, minY: 8, maxX: 12, maxY: 14 });
});

test("limitesDeTinta ignora pixels transparentes claros", () => {
  const largura = 10;
  const altura = 10;
  const dados = imagemBranca(largura, altura);
  pintar(dados, largura, 3, 3, [255, 255, 255, 0]);
  pintar(dados, largura, 7, 7, [10, 10, 10, 255]);

  const caixa = limitesDeTinta(dados, largura, altura);
  assert.deepStrictEqual(caixa, { minX: 7, minY: 7, maxX: 7, maxY: 7 });
});
