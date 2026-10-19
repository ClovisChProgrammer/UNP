"use strict";

const ehPainel = window.location.pathname.endsWith("sidepanel.html");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha: false });
const statusEl = document.getElementById("status");
const indicadorEl = document.getElementById("indicador");
const textoEl = document.getElementById("texto");
const btnTexto = document.getElementById("btn-texto");

const estado = {
  cor: "#1b1b1b",
  espessura: 2.2,
  borracha: false,
  acoes: [], // {tipo:'traco', cor, espessura, pontos:[{x,y,p}]} | {tipo:'limpar'}
  traçoAtual: null,
  desenhando: false,
  ponteiroAtual: null,
  penAtivos: 0,
};

let dpr = window.devicePixelRatio || 1;

function setStatus(texto) {
  statusEl.textContent = texto;
}

function atualizarIndicador() {
  const esp = estado.espessura === 2.2 ? "fina" : "grossa";
  indicadorEl.textContent = estado.borracha ? `Borracha · ${esp}` : `Lápis ${estado.cor} · ${esp}`;
}

/* ---------- Canvas / resize ---------- */

function dimensionar() {
  const area = canvas.parentElement;
  const cssW = Math.max(1, area.clientWidth);
  const cssH = Math.max(1, area.clientHeight);
  const novoDpr = window.devicePixelRatio || 1;

  let snapshot = null;
  if (canvas.width > 0 && canvas.height > 0 && (cssW * novoDpr !== canvas.width || cssH * novoDpr !== canvas.height)) {
    snapshot = document.createElement("canvas");
    snapshot.width = canvas.width;
    snapshot.height = canvas.height;
    snapshot.getContext("2d").drawImage(canvas, 0, 0);
  }

  dpr = novoDpr;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cssW, cssH);

  if (snapshot) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(snapshot, 0, 0);
    ctx.restore();
  }
}

function refazerTudo() {
  const cssW = canvas.width / dpr;
  const cssH = canvas.height / dpr;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cssW, cssH);
  for (const acao of estado.acoes) {
    if (acao.tipo === "limpar") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cssW, cssH);
    } else {
      desenharTraco(acao);
    }
  }
}

function desenharTraco(acao) {
  const pts = acao.pontos;
  if (pts.length === 1) {
    const p = pts[0];
    ctx.beginPath();
    ctx.fillStyle = acao.cor;
    const r = (acao.espessura * (acao.borracha ? 3 : 1)) / 2;
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  for (let i = 1; i < pts.length; i++) {
    desenharSegmento(acao, pts[i - 1], pts[i]);
  }
}

function desenharSegmento(acao, a, b) {
  const base = acao.espessura * (acao.borracha ? 3 : 1);
  const fator = acao.pointerType === "pen" ? 0.45 + 1.1 * ((a.p + b.p) / 2) : 1;
  ctx.beginPath();
  ctx.strokeStyle = acao.cor;
  ctx.lineWidth = Math.max(0.8, base * fator);
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

/* ---------- Pointer ---------- */

function pontoDoEvento(e) {
  const r = canvas.getBoundingClientRect();
  return {
    x: e.clientX - r.left,
    y: e.clientY - r.top,
    p: e.pointerType === "pen" ? e.pressure : 0,
  };
}

canvas.addEventListener("pointerdown", (e) => {
  if (e.button !== 0 && e.pointerType === "mouse") return;
  if (e.pointerType === "touch" && estado.penAtivos > 0) return; // palm rejection
  if (estado.desenhando) return; // um traço por vez

  estado.penAtivos += e.pointerType === "pen" ? 1 : 0;
  estado.desenhando = true;
  estado.ponteiroAtual = e.pointerId;
  canvas.setPointerCapture(e.pointerId);

  estado.traçoAtual = {
    tipo: "traco",
    cor: estado.borracha ? "#ffffff" : estado.cor,
    espessura: estado.espessura,
    borracha: estado.borracha,
    pointerType: e.pointerType,
    pontos: [pontoDoEvento(e)],
  };

  desenharTraco(estado.traçoAtual);
  setStatus("Escrevendo…");
});

canvas.addEventListener("pointermove", (e) => {
  if (!estado.desenhando || e.pointerId !== estado.ponteiroAtual) return;

  const eventos = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  const traco = estado.traçoAtual;
  for (const ev of eventos) {
    const p = pontoDoEvento(ev);
    const anterior = traco.pontos[traco.pontos.length - 1];
    if (Math.abs(anterior.x - p.x) < 0.3 && Math.abs(anterior.y - p.y) < 0.3) continue;
    traco.pontos.push(p);
    desenharSegmento(traco, anterior, p);
  }
});

function encerrarTraco(e) {
  if (!estado.desenhando || e.pointerId !== estado.ponteiroAtual) return;
  if (e.pointerType === "pen") estado.penAtivos = Math.max(0, estado.penAtivos - 1);

  const traco = estado.traçoAtual;
  estado.desenhando = false;
  estado.ponteiroAtual = null;
  estado.traçoAtual = null;

  if (traco && traco.pontos.length > 0) {
    estado.acoes.push(traco);
  }
  setStatus("Pronto — escreva com a caneta");
}

canvas.addEventListener("pointerup", encerrarTraco);
canvas.addEventListener("pointercancel", encerrarTraco);

/* ---------- Ferramentas ---------- */

document.querySelectorAll(".cor").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cor").forEach((b) => b.classList.remove("ativa"));
    btn.classList.add("ativa");
    estado.cor = btn.dataset.cor;
    if (estado.borracha) alternarBorracha(false);
    atualizarIndicador();
  });
});

document.querySelectorAll(".espessura").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".espessura").forEach((b) => b.classList.remove("ativa"));
    btn.classList.add("ativa");
    estado.espessura = parseFloat(btn.dataset.esp);
    atualizarIndicador();
  });
});

function alternarBorracha(forcar) {
  const btn = document.getElementById("btn-borracha");
  estado.borracha = typeof forcar === "boolean" ? forcar : !estado.borracha;
  btn.classList.toggle("ativa", estado.borracha);
  atualizarIndicador();
}

document.getElementById("btn-borracha").addEventListener("click", () => alternarBorracha());

function desfazer() {
  const acao = estado.acoes.pop();
  if (!acao) {
    setStatus("Nada para desfazer");
    return;
  }
  refazerTudo();
  setStatus("Desfeito");
}

document.getElementById("btn-desfazer").addEventListener("click", desfazer);

document.getElementById("btn-limpar").addEventListener("click", () => {
  if (estado.acoes.length === 0) return;
  estado.acoes.push({ tipo: "limpar" });
  refazerTudo();
  setStatus("Limpo — Ctrl+Z desfaz");
});

window.addEventListener("keydown", (e) => {
  const alvo = e.target;
  if (alvo instanceof HTMLElement && (alvo.tagName === "TEXTAREA" || alvo.tagName === "INPUT")) return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
    e.preventDefault();
    desfazer();
  }
});

/* ---------- Export ---------- */

function carimbo() {
  const agora = new Date();
  return (
    agora.getFullYear() +
    String(agora.getMonth() + 1).padStart(2, "0") +
    String(agora.getDate()).padStart(2, "0") +
    "_" +
    String(agora.getHours()).padStart(2, "0") +
    String(agora.getMinutes()).padStart(2, "0") +
    String(agora.getSeconds()).padStart(2, "0")
  );
}

function baixarBlob(blob, nome) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  setStatus(`Baixado: ${nome}`);
}

function baixar(extensao, mime, qualidade) {
  if (estado.acoes.length === 0) {
    setStatus("Nada para exportar");
    return;
  }
  canvas.toBlob(
    (blob) => {
      if (!blob) {
        setStatus("Falha ao gerar imagem");
        return;
      }
      baixarBlob(blob, `unt_${carimbo()}.${extensao}`);
    },
    mime,
    qualidade
  );
}

function baixarTxt() {
  const conteudo = textoEl.value.replace(/\s+$/, "");
  if (!conteudo.trim()) {
    setStatus("Caixa de texto vazia — nada para exportar em TXT");
    return;
  }
  baixarBlob(new Blob(["\uFEFF" + conteudo], { type: "text/plain;charset=utf-8" }), `unt_${carimbo()}.txt`);
}

function baixarPdf() {
  if (estado.acoes.length === 0) {
    setStatus("Nada para exportar");
    return;
  }
  canvas.toBlob(
    async (blob) => {
      if (!blob) {
        setStatus("Falha ao gerar imagem");
        return;
      }
      try {
        const jpeg = new Uint8Array(await blob.arrayBuffer());
        const larguraPt = (canvas.width / dpr) * 0.75;
        const alturaPt = (canvas.height / dpr) * 0.75;
        const pdf = UNT_PDF.gerarPdfJpeg(jpeg, canvas.width, canvas.height, larguraPt, alturaPt);
        baixarBlob(new Blob([pdf], { type: "application/pdf" }), `unt_${carimbo()}.pdf`);
      } catch (erro) {
        console.error(erro);
        setStatus("Falha ao gerar PDF");
      }
    },
    "image/jpeg",
    0.95
  );
}

function alternarTexto(mostrar) {
  const visivel = typeof mostrar === "boolean" ? mostrar : textoEl.classList.contains("oculto");
  textoEl.classList.toggle("oculto", !visivel);
  btnTexto.classList.toggle("ativa", visivel);
  if (visivel) textoEl.focus();
  setStatus(visivel ? "Digite o texto — exporte com TXT" : "Caixa de texto oculta");
}

btnTexto.addEventListener("click", () => alternarTexto());

document.getElementById("btn-txt").addEventListener("click", baixarTxt);
document.getElementById("btn-png").addEventListener("click", () => baixar("png", "image/png"));
document.getElementById("btn-jpg").addEventListener("click", () => baixar("jpg", "image/jpeg", 0.92));
document.getElementById("btn-pdf").addEventListener("click", baixarPdf);

/* ---------- Painel ↔ aba (etapa 1) ---------- */

if (ehPainel) {
  chrome.runtime.onMessage.addListener((mensagem, _remetente, responder) => {
    if (mensagem?.tipo === "unt-pedir-estado") {
      responder({ acoes: estado.acoes, texto: textoEl.value });
      return true;
    }
  });

  const btnAba = document.getElementById("btn-aba");
  if (btnAba) {
    btnAba.addEventListener("click", () => {
      chrome.runtime.sendMessage({ tipo: "unt-abrir-aba" }).catch(() => {});
    });
  }
} else {
  chrome.runtime.sendMessage({ tipo: "unt-aba-viva" }).catch(() => {});
  chrome.storage.session
    .get("unt-estado-transferido")
    .then((dados) => {
      const bruto = dados["unt-estado-transferido"];
      if (!bruto) return;
      const transferido = Array.isArray(bruto) ? { acoes: bruto, texto: "" } : bruto;
      let copiou = false;
      if (Array.isArray(transferido.acoes) && transferido.acoes.length > 0) {
        estado.acoes = transferido.acoes;
        refazerTudo();
        copiou = true;
      }
      if (typeof transferido.texto === "string" && transferido.texto.trim()) {
        textoEl.value = transferido.texto;
        alternarTexto(true);
        copiou = true;
      }
      if (copiou) {
        setStatus("Rascunho copiado do painel — painel e aba seguem independentes");
      }
      return chrome.storage.session.remove("unt-estado-transferido");
    })
    .catch(() => {});
}

/* ---------- Início ---------- */

new ResizeObserver(() => dimensionar()).observe(canvas.parentElement);
dimensionar();
atualizarIndicador();
