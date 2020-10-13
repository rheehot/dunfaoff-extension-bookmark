chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ bookmark: { items: [] } })
  chrome.storage.sync.set({ recent: { items: [] } })
})
