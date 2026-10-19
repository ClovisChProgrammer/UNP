const comportarPainel = () => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
};

chrome.runtime.onInstalled.addListener(comportarPainel);
chrome.runtime.onStartup.addListener(comportarPainel);
