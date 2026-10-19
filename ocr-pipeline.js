"use strict";

const caminhosOcr = {
  workerPath: chrome.runtime.getURL("vendor/tesseract/worker.min.js"),
  corePath: chrome.runtime.getURL("vendor/core"),
  langPath: chrome.runtime.getURL("vendor/lang"),
};

let workerOcr = null;
let carregando = null;

async function obterWorker(idiomas, aoProgresso) {
  if (workerOcr) return workerOcr;
  if (carregando) return carregando;

  carregando = (async () => {
    const worker = await Tesseract.createWorker(idiomas, 1, {
      workerPath: caminhosOcr.workerPath,
      corePath: caminhosOcr.corePath,
      langPath: caminhosOcr.langPath,
      workerBlobURL: false,
      gzip: true,
      logger: (m) => {
        if (typeof aoProgresso === "function") aoProgresso(m);
      },
    });
    workerOcr = worker;
    carregando = null;
    return worker;
  })().catch((erro) => {
    carregando = null;
    throw erro;
  });

  return carregando;
}

async function reconhecer(canvasOrigem, idiomas, aoProgresso) {
  const preparada = UNT_OCR.prepararImagem(canvasOrigem, { escala: 2, margem: 24 });
  if (preparada.vazio) {
    return { vazio: true, texto: "" };
  }
  const worker = await obterWorker(idiomas, aoProgresso);
  const resultado = await worker.recognize(preparada.canvas);
  return {
    vazio: false,
    texto: (resultado?.data?.text || "").trim(),
    confianca: resultado?.data?.confidence ?? null,
  };
}

async function encerrarOcr() {
  if (workerOcr) {
    try {
      await workerOcr.terminate();
    } catch {
      /* ignora */
    }
    workerOcr = null;
  }
}

window.UNT_OCR_PIPELINE = { reconhecer, encerrarOcr };
