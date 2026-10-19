const ABA_PATH = "editor.html";

let abrindoAba = false;

const comportarPainel = () => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
};

chrome.runtime.onInstalled.addListener(comportarPainel);
chrome.runtime.onStartup.addListener(comportarPainel);

async function pedirEstadoAoPainel() {
  try {
    const resposta = await Promise.race([
      chrome.runtime.sendMessage({ tipo: "unt-pedir-estado" }),
      new Promise((_, rejeitar) => setTimeout(() => rejeitar(new Error("timeout")), 300)),
    ]);
    return resposta && Array.isArray(resposta.acoes) ? resposta.acoes : null;
  } catch {
    return null; // painel fechado ou sem desenho
  }
}

async function abrirAbaEditor() {
  if (abrindoAba) return;
  abrindoAba = true;
  try {
    const acoes = await pedirEstadoAoPainel();
    if (acoes && acoes.length > 0) {
      await chrome.storage.session.set({ "unt-estado-transferido": acoes });
    }

    const dados = await chrome.storage.session.get("unt-aba-tab-id");
    if (dados["unt-aba-tab-id"]) {
      try {
        const aba = await chrome.tabs.get(dados["unt-aba-tab-id"]);
        await chrome.tabs.update(aba.id, { active: true });
        chrome.windows.update(aba.windowId, { focused: true }).catch(() => {});
        return;
      } catch {
        await chrome.storage.session.remove("unt-aba-tab-id");
      }
    }

    const aba = await chrome.tabs.create({ url: chrome.runtime.getURL(ABA_PATH) });
    await chrome.storage.session.set({ "unt-aba-tab-id": aba.id });
  } finally {
    abrindoAba = false;
  }
}

chrome.runtime.onMessage.addListener((mensagem, remetente) => {
  if (mensagem?.tipo === "unt-aba-viva" && remetente.tab?.id) {
    chrome.storage.session.set({ "unt-aba-tab-id": remetente.tab.id }).catch(() => {});
  }
  if (mensagem?.tipo === "unt-abrir-aba") {
    abrirAbaEditor();
  }
});

chrome.commands.onCommand.addListener((comando) => {
  if (comando === "abrir-aba") abrirAbaEditor();
});
